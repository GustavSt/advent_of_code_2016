"use strict";

var fetch = require('../base/dataFetch');
var _ = require('underscore');

fetch(9).then(data => {
  data = data.replace('\n', '');
  var totalLength = decompress(data);
  console.log(totalLength);
});



function decompress(text) {
  var marker;
  var length = 0;
  for(let i = 0; i < text.length; i++){
    if(text[i] === '('){
      marker = getMarker(text, i);
      length += getDecompressedSequenceLength(
          text.slice(marker.sequenceStart, marker.sequenceStart + marker.noCharacters),
          marker.noRepeat);
      i = marker.sequenceStart + marker.noCharacters - 1;
    } else {
      length++;
    }
  }
  return length
}

function getDecompressedSequenceLength(text, noRepeat) {
  var decompressed = getDecompressedSequence(text, {sequenceStart: 0, noCharacters: text.length, noRepeat: noRepeat});
  return decompress(decompressed);
}

function getDecompressedSequence(text, marker) {
  var sequence = '';
  var decompressedSequence = '';
  for(let i = marker.sequenceStart; i < marker.noCharacters + marker.sequenceStart; i++){
    sequence += text[i];
  }
  for (let i = 0; i < marker.noRepeat; i++ ){
    decompressedSequence += sequence;
  }
  return decompressedSequence;
}

function getMarker(text, index) {
  var i = index + 1;
  var noCharacters = '';
  var noRepeat = '';
  while(text[i] !== 'x'){
    noCharacters += text[i];
    i++;
  }
  i++;
  while(text[i] !== ')'){
    noRepeat += text[i];
    i++;
  }
  i++;
  return {
    noCharacters : parseInt(noCharacters),
    noRepeat: parseInt(noRepeat),
    sequenceStart: i,
  };
}
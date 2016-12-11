"use strict";

var fetch = require('../base/dataFetch');
var _ = require('underscore');

fetch(9).then(data => {
  console.log(data);
  console.log(data.length);
  data = data.replace('\n', '');
  console.log('compressed length', data.length);
  var decompressed = decompress(data);
  console.log('decompressed length: ', decompressed.length);
});

function decompress(text) {
  var decompressed = '';
  var marker;
  for(let i = 0; i < text.length; i++){
    if(text[i] === '('){
      marker = getMarker(text, i);
      decompressed += getDecompressedSequence(text, marker);
      i = marker.sequenceStart + marker.noCharacters - 1;
    } else {
      decompressed += text[i];
    }
  }
  return decompressed;
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
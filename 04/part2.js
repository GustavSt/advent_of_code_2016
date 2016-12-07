"use strict";
var fetch = require('../base/dataFetch');
var letterInAlphabet = require('./letterInAlphabet');
var _ = require('underscore');
fetch(4).then(data => {
  data = formatData(data);
  var roomToFind;
  roomToFind = _.find(data, room => {
    var decryptedName;
    if (isReal(room)) {
      decryptedName = decryptName(room);
      room.decryptedName = decryptedName;
      if(decryptedName.indexOf('north') > -1){
        return true;
      }
    }
    return false;
  });
  console.log(roomToFind);
});

function decryptName(room) {
  var decrypted = '';
  for(let i = 0; i < room.encoding.length; i++){
    if(room.encoding[i] === '-'){
      decrypted += ' ';
    } else {
      decrypted += getDecryptLetter(room.encoding[i], room.sectorId);
    }
  }
  return decrypted;
}

function getDecryptLetter(letter, steps) {
  var start = letterInAlphabet[letter];
  var endLetter = start + (steps % 26);
  if(endLetter > 26){
    endLetter -= 26;
  }
  return letterInAlphabet[endLetter];
}

function isReal(room) {
  var expectedCheckSum = findCheckSum(room.encoding);
  return expectedCheckSum === room.checksum;
}

function findCheckSum(encoding) {
  var checkSum = '';
  var checkSumCount = {};
  var checkSumArr = [];
  for (let i = 0; i < encoding.length; i++) {
    let currLetter = encoding[i];
    if(currLetter === '-'){
      continue;
    }
    if (checkSumCount[currLetter]) {
      checkSumCount[currLetter]++;
    } else {
      checkSumCount[currLetter] = 1;
    }
  }
  for (let prop in checkSumCount) {
    if (checkSumCount.hasOwnProperty(prop)) {
      checkSumArr.push({letter: prop, value: checkSumCount[prop]});
    }
  }

  checkSumArr.sort((a, b) => {
    if (a.value > b.value) {
      return -1;
    } else if (a.value < b.value) {
      return 1;
    } else {
      if (a.letter < b.letter) {
        return -1;
      } else if (a.letter > b.letter) {
        return 1;
      }
    }
  });
  for (let i = 0; i < 5; i++) {
    checkSum += checkSumArr[i].letter;
  }
  return checkSum;
}

function formatData(data) {
  var newData = data.split('\n');
  newData = newData.slice(0, newData.length - 1);
  newData = _.map(newData, room => {
    var encoding = room.split(/-\d+/g, 1)[0];
    var sectorId = room.replace(/[^0-9]/g, '');
    sectorId = parseInt(sectorId);
    var checksum = room.split('[')[1];
    checksum = checksum.slice(0, checksum.length - 1);
    return {
      encoding: encoding,
      sectorId: sectorId,
      checksum: checksum,
    };
  });
  return newData;
}
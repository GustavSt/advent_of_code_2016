"use strict";

var fetch = require('../base/dataFetch');

fetch(2).then(data =>{
  data = data.split('\n');
  var currentDigit = 5;
  var finalCode = '';
  data.forEach(function (directions) {
    if(directions.length){
      currentDigit = getDigit(currentDigit, directions);
      finalCode += currentDigit;
    }
  });
  console.log(finalCode);
});

function getDigit(start, directions) {
  var finalDigit = start;
  for(let i = 0; i < directions.length; i++){
    finalDigit = move(finalDigit, directions[i]);
  }
  return finalDigit;
}

function move(from, dir) {
  if(dir === 'R'){
    if(from === 3 || from === 6 || from === 9){
      return from;
    } else {
      return from + 1;
    }
  } else if(dir === 'L'){
    if(from === 1 || from === 4 || from === 7){
      return from;
    } else {
      return from - 1;
    }
  } else if(dir === 'U'){
    if(from === 1 || from === 2 || from === 3){
      return from;
    } else {
      return from - 3;
    }
  } else if(dir === 'D'){
    if(from === 7 || from === 8 || from === 9){
      return from;
    } else {
      return from + 3;
    }
  } else {
    return from;
  }
}
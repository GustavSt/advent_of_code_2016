"use strict";

var fetch = require('../base/dataFetch');

fetch(2).then(data => {
  data = data.split('\n');
  var currentDigit = 5;
  var finalCode = '';
  data.forEach(function (directions) {
    if(directions.length) {
      currentDigit = getDigit(currentDigit, directions);
      finalCode += currentDigit;
    }
  });
  console.log(finalCode);
});

function getDigit(start, directions) {
  var finalDigit = start;
  for (let i = 0; i < directions.length; i++) {
    finalDigit = move(finalDigit, directions[i]);
  }
  return finalDigit;
}

function move(from, dir) {
  switch (dir) {
    case 'R':
      return moveRight(from);
    case 'L':
      return moveLeft(from);
    case 'U':
      return moveUp(from);
    case 'D':
      return moveDown(from);
    default:
      return from;
      break;
  }
}

function moveRight(start) {
  if (start === 1 || start === 4 || start === 9 || start === 'C' || start === 'D') {
    return start;
  }
  if (typeof start === 'number') {
    return start + 1;
  }
  switch (start) {
    case 'A':
      return 'B';
    case 'B':
      return 'C';
  }
  return start;
}

function moveLeft(start) {
  if (start === 1 || start === 2 || start === 5 || start === 'A' || start === 'D') {
    return start;
  }
  if (typeof start === 'number') {
    return start - 1;
  }
  switch (start) {
    case 'C':
      return 'B';
    case 'B':
      return 'A';
  }
  return start;
}

function moveUp(start) {
  if (start === 1 || start === 2 || start === 4 || start === 5 || start === 9) {
    return start;
  }
  if (typeof start === 'number') {
    if (start === 3) {
      return start - 2;
    } else {
      return start - 4;
    }
  }
  switch (start) {
    case 'A':
      return 6;
    case 'B':
      return 7;
    case 'C':
      return 8;
    case 'D':
      return 'B';
  }
  return start;
}

function moveDown(start) {
  var tmp;
  if (start === 5 || start === 9 || start === 'A' || start === 'D' || start === 'C') {
    return start;
  }
  if (typeof start === 'number') {
    if (start === 1) {
      return start + 2;
    } else {
      tmp = start + 4;
      if (tmp < 10) {
        return tmp;
      } else{
        switch (tmp) {
          case 10:
            return 'A';
          case 11:
            return 'B';
          case 12:
            return 'C';
        }
      }
    }
  }

  switch (start) {
    case 'B':
      return 'D';
  }
  return start;
}
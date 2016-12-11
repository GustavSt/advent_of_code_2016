"use strict";

var fetch = require('../base/dataFetch');
var _ = require('underscore');

fetch(8).then(data => {
  data = data.split('\n');
  data = data.slice(0, data.length - 1);
  var display = createDisplay();
  data.forEach(action => {
    display = doAction(action, display);
  });
  var pixelsOn = 0;
  display.forEach(row =>{
    row.forEach(pixel => {
      if(pixel){
        pixelsOn++;
      }
    });
  });
  console.log('no of pixels On', pixelsOn);
  console.log(stringifyDisplay(display));
});

function doAction(action, display) {
  var newDisplayState;
  if (action.indexOf('rect') === 0) {
    newDisplayState = doRect(action, display);
  } else if (action.indexOf('rotate row') === 0) {
    newDisplayState = doRotateRow(action, display);
  } else if (action.indexOf('rotate column') === 0) {
    newDisplayState = doRotateColumn(action, display);
  }
  return newDisplayState;
}

function doRect(action, display) {
  var newDisplay = copyDisplay(display);
  var rect = getRect(action);
  for(let i = 0; i < rect.tall; i++){
    for(let y = rect.wide - 1; y >= 0; y--){
      newDisplay[i][y] = true;
    }
  }
  return newDisplay;
}

function getRect(action) {
  var rect = {
    wide: '',
    tall: '',
  };
  var indexOfX = action.indexOf('x');
  for (let i = 0; i < indexOfX - 5; i++) {
    rect.wide += action[5 + i];
  }
  rect.tall = parseInt(action[indexOfX + 1]);
  rect.wide = parseInt(rect.wide);
  rect.tall = parseInt(rect.tall);
  return rect;
}

function doRotateRow(action, display) {
  var newDisplay = copyDisplay(display);
  var rowRotate = getRowRotate(action);
  newDisplay[rowRotate.row] = rotateRow(newDisplay[rowRotate.row], rowRotate.rotateBy);
  return newDisplay;
}

function rotateRow(startRow, rotateBy) {
  var newRow = [];

  startRow.forEach( (pixel, index) =>{
    var newIndex = index + rotateBy;
    if(newIndex > startRow.length - 1){
      newIndex = newIndex - startRow.length;
    }
    newRow[newIndex] = pixel;
  });
  return newRow;
}

function getRowRotate(action) {
  var rowRotate = {
    row: 0,
    rotateBy: '',
  };

  rowRotate.row = parseInt(action[action.indexOf('=') + 1]);
  var byStart = action.indexOf('by') + 3;
  for (let i = 0; i < action.length - byStart; i++) {
    rowRotate.rotateBy += action[byStart + i];
  }
  rowRotate.rotateBy = parseInt(rowRotate.rotateBy);
  return rowRotate;
}

function doRotateColumn(action, display) {
  var newDisplay = copyDisplay(display);
  var columnRotate = getColumnRotate(action);
  var currentCol = getColumn(newDisplay, columnRotate.col);
  var col = rotateCol(currentCol, columnRotate.rotateBy);
  col.forEach((pixel, index) =>{
    newDisplay[index][columnRotate.col] = pixel;
  });
  return newDisplay;
}

function rotateCol(startCol, rotateBy) {
  var newCol = [];
  startCol.forEach((pixel, index) => {
    var newIndex = index + rotateBy;
    if(newIndex > startCol.length - 1){
      newIndex = newIndex - startCol.length;
    }
    newCol[newIndex] = pixel;
  });
  return newCol;
}

function getColumn(display, colIndex) {
  var col = [];
  display.forEach(row =>{
    col.push(row[colIndex]);
  });
  return col;
}

function getColumnRotate(action) {
  var columnRotate = {
    col: '',
    rotateBy: 0,
  };

  var colStart = action.indexOf('=') + 1;
  for (let i = 0; action[colStart + i] !== ' '; i++) {
    columnRotate.col += action[colStart + i];
  }
  columnRotate.rotateBy = parseInt(action[action.indexOf('by') + 3]);
  columnRotate.col = parseInt(columnRotate.col);
  return columnRotate;
}

function createDisplay() {
  var display = [];
  for (let i = 0; i < 6; i++) {
    display[i] = [];
    for (let x = 0; x < 50; x++) {
      display[i].push(false);
    }
  }
  return display;
}

function copyDisplay(display) {
  return _.map(display, row => {
    return row.slice(0);
  });
}

function stringifyDisplay(display) {
  var displayString = '';
  display.forEach(row =>{
    row.forEach(col =>{
      if(col){
        displayString += '#';
      } else {
        displayString += '.';
      }
    });
    displayString += '\n';
  });
  return displayString;
}
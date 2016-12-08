"use strict";
var fetch = require('../base/dataFetch');
fetch(6).then(data =>{
  var letterCount = getLetterCount(data);

  var message = getMessage(letterCount);
  console.log(message);
});

function getMessage(count) {
  var mess = '';
  count.forEach(c => {
    var countArr = [];
    for(let prop in c){
      if(c.hasOwnProperty(prop)){
        countArr.push({letter: prop, value: c[prop]});
      }
    }
    countArr.sort((a, b) =>{
      return b.value - a.value;
    });
    mess += countArr[0].letter;
  });
  return mess;
}

function getLetterCount(data) {
  var newData = data.split('\n');
  newData = newData.slice(0, newData.length - 1);
  var cols = ['', '', '', '', '', '', '', ''];
  var letterCount = [{}, {}, {}, {}, {}, {}, {}, {}];
  newData.forEach(d =>{
    cols[0] += d[0];
    cols[1] += d[1];
    cols[2] += d[2];
    cols[3] += d[3];
    cols[4] += d[4];
    cols[5] += d[5];
    cols[6] += d[6];
    cols[7] += d[7];
  });
  for(let i = 0; i < cols[0].length; i++){
    countLetter(i, cols[0], letterCount[0]);
    countLetter(i, cols[1], letterCount[1]);
    countLetter(i, cols[2], letterCount[2]);
    countLetter(i, cols[3], letterCount[3]);
    countLetter(i, cols[4], letterCount[4]);
    countLetter(i, cols[5], letterCount[5]);
    countLetter(i, cols[6], letterCount[6]);
    countLetter(i, cols[7], letterCount[7]);
  }

  return letterCount;
}

function countLetter(index, column, counter) {
  var letter = column[index];
  if(counter[letter]){
    counter[letter]++;
  } else {
    counter[letter] = 1;
  }
}
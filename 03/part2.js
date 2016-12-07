"use strict";

"use strict";

var fetch = require('../base/dataFetch');
var _ = require('underscore');

fetch(3).then(data=> {
  data = formatData(data);
  var noOfValid = 0;
  console.log(data.length);
  data.forEach(triangle => {
    if(isTriangle(triangle)){
      noOfValid++;
    }
  });
  console.log(noOfValid);
});

function isTriangle(triangle) {
  if(triangle[0] >= triangle[1] + triangle[2]){
    return false;
  }
  if(triangle[1] >= triangle[0] + triangle[2]){
    return false;
  }
  if(triangle[2] >= triangle[0] + triangle[1]){
    return false;
  }
  return true;
}

function formatData(data) {
  var newData = data.split('\n');
  newData = _.map(newData, triangle => {
    return triangle
      .split(' ')
      .filter(s => {
        return s !== '';
      })
      .map(s => {
        return parseInt(s);
      });
  });
  newData.splice(newData.length - 1);
  var tmp1, tmp2, tmp3;
  for(let i = 0; i < newData.length; i = i + 3){
    tmp1 = [];
    tmp2 = [];
    tmp3 = [];
    tmp1.push(newData[i][0], newData[i + 1][0], newData[i + 2][0]);
    tmp2.push(newData[i][1], newData[i + 1][1], newData[i + 2][1]);
    tmp3.push(newData[i][2], newData[i + 1][2], newData[i + 2][2]);
    newData[i] = tmp1.slice(0);
    newData[i + 1] = tmp2.slice(0);
    newData[i + 2] = tmp3.slice(0);
  }
  return newData;
}
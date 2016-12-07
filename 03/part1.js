"use strict";

"use strict";

var fetch = require('../base/dataFetch');
var _ = require('underscore');

fetch(3).then(data=> {
  data = formatData(data);
  // console.log(data);
  var noOfValid = 0;
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
  // console.log(newData.length);
  return newData;
}
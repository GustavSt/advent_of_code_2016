"use strict";

var fetch = require('../base/dataFetch');
var _ = require('underscore');

fetch(7).then(data => {
  data = data.split('\n');
  data = data.slice(0, data.length -1);
  var noOfTLSSupport = 0;
  data.forEach( ip =>{
    if(supportTLS(ip)){
      noOfTLSSupport++;
    }
  });
  console.log(noOfTLSSupport);
});

function supportTLS(ip) {
  var formattedIP = formatIp(ip);
  var textHasAbba = _.any(formattedIP.texts, text =>{
    return hasAbba(text);
  });
  var bracketsHaveAbba = _.any(formattedIP.brackets, text =>{
    return hasAbba(text);
  });
  return textHasAbba && !bracketsHaveAbba;
}

function formatIp(ip) {
  var formated = {
    texts: [],
    brackets: [],
  };
  var isText = true;
  var textIndex = 0;
  var bracketsIndex = 0;
  for(let i = 0; i < ip.length; i++){
    if(ip[i] === '['){
      isText = false;
      textIndex++;
      continue;
    } else if( ip[i] === ']'){
      isText = true;
      bracketsIndex++;
      continue;
    }
    if(isText){
      if(!formated.texts[textIndex]){
        formated.texts[textIndex] = ip[i];
      } else {
        formated.texts[textIndex] += ip[i];
      }
    } else {
      if(!formated.brackets[bracketsIndex]){
        formated.brackets[bracketsIndex] = ip[i];
      } else {
        formated.brackets[bracketsIndex] += ip[i];
      }
    }
  }
  return formated;
}

function hasAbba(text) {
  for(let i = 0; i < text.length - 3; i++){
    if(
        text[i] === text [i + 3] &&
        text[i + 1] === text[i + 2] &&
        text[i] !== text[i + 1]){
      return true;
    }
  }
  return false;
}
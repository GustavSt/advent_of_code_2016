"use strict";

var fetch = require('../base/dataFetch');
var _ = require('underscore');

fetch(7).then(data => {
  data = data.split('\n');
  data = data.slice(0, data.length - 1);
  var noOfTLSSupport = 0;
  data.forEach(ip => {
    if (supportSSL(ip)) {
      noOfTLSSupport++;
    }
  });
  console.log(noOfTLSSupport);
});

function supportSSL(ip) {
  var formattedIP = formatIp(ip);
  var allABA = getABA(formattedIP.texts);
  return hasCorrespondingBAB(formattedIP.brackets, allABA);
}

function getABA(texts) {
  var abas = [];
  texts.forEach(text =>{
    for(let i = 0; i < text.length - 2; i++){
      if(text[i] === text[i + 2] && text[i] !== text[i + 1]){
        abas.push(text[i] + text[i + 1] + text[i + 2]);
      }
    }
  });
  return abas;
}

function hasCorrespondingBAB(texts, ABAs) {
  return _.any(texts, text => {
    return _.any(ABAs, ABA => {
      for (let i = 0; i < text.length - 2; i++) {
        if (text[i] === ABA[1] &&
            text[i + 1] === ABA[0] &&
            text[i + 2] === ABA[1]) {
          return true;
        }
      }
      return false;
    });
  });
}

function formatIp(ip) {
  var formated = {
    texts: [],
    brackets: [],
  };
  var isText = true;
  var textIndex = 0;
  var bracketsIndex = 0;
  for (let i = 0; i < ip.length; i++) {
    if (ip[i] === '[') {
      isText = false;
      textIndex++;
      continue;
    } else if (ip[i] === ']') {
      isText = true;
      bracketsIndex++;
      continue;
    }
    if (isText) {
      if (!formated.texts[textIndex]) {
        formated.texts[textIndex] = ip[i];
      } else {
        formated.texts[textIndex] += ip[i];
      }
    } else {
      if (!formated.brackets[bracketsIndex]) {
        formated.brackets[bracketsIndex] = ip[i];
      } else {
        formated.brackets[bracketsIndex] += ip[i];
      }
    }
  }
  return formated;
}
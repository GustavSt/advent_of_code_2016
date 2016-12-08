"use strict";
var fetch = require('../base/dataFetch');
var _ = require('underscore');
var cryptoJs = require('crypto-js');

fetch(5).then(data => {
  var password = [null, null, null, null, null, null, null, null];
  var index = 0;
  data = data.replace('\n', '');
  while (passwordIsIncomplete(password)) {
    let doorIdToHash = data + index;
    let hash = cryptoJs.MD5(doorIdToHash).toString();
    if (startsWith0s(hash) && isValid(hash, password)) {
      password[hash[5]] = hash[6];
      console.log(password);
    }
    index++;
  }
  console.log('password found: ');
});

function isValid(hash, password) {
  var index = parseInt(hash[5]);
  if (typeof index === 'number' && index < 8) {
    return password[index] === null;
  }
  return false;
}

function startsWith0s(hash) {
  return !!(hash[0] === '0' && hash[1] === '0' && hash[2] === '0' && hash[3] === '0' && hash[4] === '0');
}

function passwordIsIncomplete(password) {
  for(let i = 0; i < password.length; i++){
    if(password[i] === null){
      return true;
    }
  }
  return false;
}
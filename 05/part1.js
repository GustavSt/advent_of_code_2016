"use strict";
var fetch = require('../base/dataFetch');
var _ = require('underscore');
var cryptoJs = require('crypto-js');

fetch(5).then(data =>{
  var password = '';
  var index = 0;
  data = data.replace('\n', '');
  while (password.length < 8){
    let doorIdToHash = data + index;
    let hash = cryptoJs.MD5(doorIdToHash).toString();
    if(startsWith0s(hash)){
      password += hash[5];
      console.log(password);
    }
    index++;
  }
  console.log('password found: ');
});

function startsWith0s(hash) {
  return !!(hash[0] === '0' && hash[1] === '0' && hash[2] === '0' && hash[3] === '0' && hash[4] === '0');
}
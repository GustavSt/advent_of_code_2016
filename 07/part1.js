"use strict";

var fetch = require('../base/dataFetch');
var _ = require('underscore');

fetch(7).then(data => {
  data = data.split('\n');
  data = data.slice(0, data.length -1);
  data.forEach( ip =>{

  });
});

function isValid(ip) {
  for(let i = 0; i < ip.length; i++){
    
  }
}
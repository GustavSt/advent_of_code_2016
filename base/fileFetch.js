"use strict";
var fs = require('fs');
var _ = require('underscore');
module.exports = function (filePath) {
  return new Promise((resolve, reject)=> {
    fs.readFile(filePath, 'utf8',(err, data)=>{
      if(err){
        console.log(err);
        return reject(err);
      }
      data = data.split('\n');
      data = _.map(data, d =>{
        return d.replace('\r', '');
      });
      resolve(data);
    });
  });
};
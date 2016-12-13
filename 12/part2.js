"use strict";

var fileFetch = require('../base/fileFetch');
var fetch = require('../base/dataFetch');
var _ = require('underscore');

fetch(12).then(data => {
  data = data.split('\n');
  data = data.slice(0, data.length - 1);
  var registers = {
    a: 0,
    b: 0,
    c: 1,
    d: 0,
  };
  for (let i = 0; i < data.length; i++) {
    let parsedInstruction = parseInstruction(data[i]);
    let val;
    switch (parsedInstruction.action) {
      case 'dec':
        registers[parsedInstruction.register]--;
        break;
      case 'inc':
        registers[parsedInstruction.register]++;
        break;
      case 'cpy':
        val = parseInt(parsedInstruction.value);
        if (isNaN(val)) {
          registers[parsedInstruction.register] = registers[parsedInstruction.value];
        } else {
          registers[parsedInstruction.register] = val;
        }
        break;
      case 'jnz':
        let cond = parseInt(parsedInstruction.condition);
        if (isNaN(cond)) {
          cond = registers[parsedInstruction.condition];
        }
        val = parseInt(parsedInstruction.value);
        if(isNaN(val)){
          val = registers[parsedInstruction.value];
        }
        if (cond) {
          i += val;
          i--;
        }
        break;
    }
  }
  console.log(registers);
});

function parseInstruction(instruction) {
  var parsed = {};
  parsed.action = instruction.substr(0, 3);

  if (parsed.action === 'dec' || parsed.action === 'inc') {
    parsed.register = instruction.substr(4, 1);
  } else if (parsed.action === 'cpy') {
    let matcher = /cpy ([0-9a-z]{1,2}) ([a-z])/g.exec(instruction);
    parsed.register = matcher[2];
    parsed.value = matcher[1];
  } else if (parsed.action === 'jnz') {
    let matcher = /jnz ([0-9a-z]{1,2}) (-?[0-9a-z]{1,2})/g.exec(instruction);
    parsed.value = matcher[2];
    parsed.condition = matcher[1];
  }
  return parsed;
}
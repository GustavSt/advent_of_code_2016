"use strict";

var fileFetch = require('../base/fileFetch');
var fetch = require('../base/dataFetch');
var _ = require('underscore');

fetch(10).then(data => {
  data = data.split('\n');
  data = data.slice(0, data.length - 1);
  var instructions = formatData(data);
  var bots = [];
  var outputs = [];
  instructions.initial.forEach(instruction => {
    if (bots[instruction.botNumber]) {
      bots[instruction.botNumber].microShips.push(instruction.microShipId);
      bots[instruction.botNumber].microShips.sort(sort);
    } else {
      bots[instruction.botNumber] = {
        microShips: [instruction.microShipId],
      };
    }
  });
  var botToFind = 'couldn\'t find bot';
  // console.log(bots);
  instructions.subsequent.forEach(instruction => {
    var giverBot = bots[instruction.giverBotId];
    if (giverBot.microShips[0] === 17 && giverBot.microShips[1] === 61) {
      botToFind = instruction.giverBotId;
    }
    switch (instruction.lowDestEntity) {
      case 'bot':
        if (bots[instruction.lowDestId]) {
          bots[instruction.lowDestId].microShips.push(giverBot.microShips.shift());
          bots[instruction.lowDestId].microShips.sort(sort);
        } else {
          bots[instruction.lowDestId] = {
            microShips: [giverBot.microShips.shift()],
          }
        }
        break;
      case 'output':
        if (outputs[instruction.lowDestId]) {
          outputs[instruction.lowDestId].microShips.push(giverBot.microShips.shift());
          outputs[instruction.lowDestId].microShips.sort(sort);
        } else {
          outputs[instruction.lowDestId] = {
            microShips: [giverBot.microShips.shift()],
          }
        }
        break;
    }
    switch (instruction.highDestEntity) {
      case 'bot':
        if (bots[instruction.highDestId]) {
          bots[instruction.highDestId].microShips.push(giverBot.microShips.shift());
          bots[instruction.highDestId].microShips.sort(sort);
        } else {
          bots[instruction.highDestId] = {
            microShips: [giverBot.microShips.shift()],
          }
        }
        break;
      case 'output':
        if (outputs[instruction.highDestId]) {
          outputs[instruction.highDestId].microShips.push(giverBot.microShips.shift());
        } else {
          outputs[instruction.highDestId] = {
            microShips: giverBot.microShips.shift(),
          }
        }
        break;
    }
  });

  console.log(botToFind);
});

function sort(a, b) {
  return a - b;
}

function formatData(data) {
  var instructions = {
    initial: [],
    subsequent: [],
  };
  // console.log(data);

  data.forEach(inst => {
    if (inst.indexOf('value') === 0) {
      instructions.initial.push(getInitial(inst));
    } else {
      instructions.subsequent.push(getInstruction(inst));
    }
  });
  return instructions;
}

function getInitial(instruction) {
  var value = '';
  for (let i = 6; instruction[i] !== ' '; i++) {
    value += instruction[i];
  }
  var botNumberIndex = instruction.indexOf('bot') + 4;
  var botNumber = '';
  for (let i = botNumberIndex; i < instruction.length; i++) {
    botNumber += instruction[i];
  }
  return {
    botNumber: parseInt(botNumber),
    microShipId: parseInt(value),
  };
}

function getInstruction(instruction) {
  var giverBotId = '';
  for (let i = 4; instruction[i] !== ' '; i++) {
    giverBotId += instruction[i];
  }
  var lowDestEntity;
  var lowDestId = '';
  var lowDestIndexStart;
  if (instruction.indexOf('gives low to bot') !== -1) {
    lowDestEntity = 'bot';
    lowDestIndexStart = instruction.indexOf('gives low to bot') + 17;
  } else if (instruction.indexOf('gives low to output') !== -1) {
    lowDestEntity = 'output';
    lowDestIndexStart = instruction.indexOf('gives low to output') + 20;
  }

  for (let i = lowDestIndexStart; instruction[i] !== ' '; i++) {
    lowDestId += instruction[i];
  }

  var highDestEntity;
  var highDestIndexStart;
  var highDestId = '';
  if (instruction.indexOf('high to bot') !== -1) {
    highDestEntity = 'bot';
    highDestIndexStart = instruction.indexOf('high to bot') + 12;
  } else if (instruction.indexOf('high to output') !== -1) {
    highDestEntity = 'output';
    highDestIndexStart = instruction.indexOf('high to output') + 15;
  }

  for (let i = highDestIndexStart; i < instruction.length; i++) {
    highDestId += instruction[i];
  }

  return {
    giverBotId: parseInt(giverBotId),
    lowDestEntity: lowDestEntity,
    lowDestId: parseInt(lowDestId),
    highDestEntity: highDestEntity,
    highDestId: parseInt(highDestId),
  };
}
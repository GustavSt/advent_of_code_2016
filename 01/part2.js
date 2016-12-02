"use strict";
var fetcher = require('../base/dataFetch');
var _ = require('underscore');

var XPOS = 0;
var XNEG = 1;
var YPOS = 2;
var YNEG = 3;
fetcher(1).then((res)=> {
  var data = res.split(', ');
  var currPosition = {
    x: 0,
    y: 0
  };
  var l = XNEG;
  var r = XPOS;
  var visited = [
    {x: 0, y: 0},
  ];
  var finalPos;
  // console.log(data);
  _.find(data, (action)=> {
    var dir = action[0];
    var steps = parseInt(action.substr(1));
    var oldPos = _.clone(currPosition);
    if (dir === 'L') {
      switch (l) {
        case XPOS:
          currPosition.x += steps;
          l = YPOS;
          r = YNEG;
          break;
        case XNEG:
          currPosition.x -= steps;
          l = YNEG;
          r = YPOS;
          break;
        case YPOS:
          currPosition.y += steps;
          l = XNEG;
          r = XPOS;
          break;
        case YNEG:
          currPosition.y -= steps;
          l = XPOS;
          r = XNEG;
          break;
      }
    } else if (dir === 'R') {
      switch (r) {
        case XPOS:
          currPosition.x += steps;
          r = YNEG;
          l = YPOS;
          break;
        case XNEG:
          currPosition.x -= steps;
          r = YPOS;
          l = YNEG;
          break;
        case YPOS:
          currPosition.y += steps;
          r = XPOS;
          l = XNEG;
          break;
        case YNEG:
          currPosition.y -= steps;
          r = XNEG;
          l = XPOS;
          break;
      }
    }
    var tmpVisit = [];
    if (oldPos.x !== currPosition.x) {
      if (oldPos.x < currPosition.x) {
        for (let i = oldPos.x + 1; i <= currPosition.x; i++) {
          tmpVisit.push({y: oldPos.y, x: i});
        }
      } else {
        for (let i = oldPos.x - 1; i >= currPosition.x; i--) {
          tmpVisit.push({y: oldPos.y, x: i});
        }
      }
    } else if (oldPos.y !== currPosition.y) {
      if (oldPos.y < currPosition.y) {
        for (let i = oldPos.y + 1; i <= currPosition.y; i++) {
          tmpVisit.push({x: oldPos.x, y: i});
        }
      } else {
        for (let i = oldPos.y - 1; i >= currPosition.y; i--) {
          tmpVisit.push({x: oldPos.x, y: i});
        }
      }
    }
    var exist = _.find(tmpVisit, tmp => {
      return _.find(visited, v => {
        return tmp.x === v.x && tmp.y === v.y;
      });
    });
    if (!exist) {
      visited = visited.concat(tmpVisit);
      return false;
    } else {
      finalPos = exist;
      return true;
    }
  });
  console.log(currPosition);
  console.log(finalPos);
  var shortestPath = Math.abs(finalPos.x) + Math.abs(finalPos.y);
  console.log(shortestPath);
}, (err)=> {
  console.log('an error occured');
  console.log(err);
});

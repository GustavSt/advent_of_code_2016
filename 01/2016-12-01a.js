var fetcher = require('../base/dataFetch');
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

  data.forEach((action)=> {
    var dir = action[0];
    var steps = parseInt(action.substr(1));
    if(dir === 'L'){
      switch (l){
        case XPOS: currPosition.x += steps;
          l = YPOS;
          r = YNEG;
          break;
        case XNEG: currPosition.x -= steps;
          l = YNEG;
          r = YPOS;
          break;
        case YPOS: currPosition.y += steps;
          l = XNEG;
          r = XPOS;
          break;
        case YNEG:  currPosition.y -= steps;
          l = XPOS;
          r = XNEG;
          break;
      }
    } else if(dir === 'R'){
      switch (r){
        case XPOS: currPosition.x += steps;
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
  });
  console.log(currPosition);
  var shortestPath = Math.abs(currPosition.x) + Math.abs(currPosition.y);
  console.log(shortestPath);
}, (err)=> {
  console.log('an error occured');
  console.log(err);
});

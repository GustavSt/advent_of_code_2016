"use strict";

var _ = require('underscore');

var input = 1352;
class Node {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.open = this._getOpen();
    this.value = Infinity;
    this.parent = null;
    this.adjacentNodes = [];
    this.visited = false;
  }

  _getOpen() {
    var val = (this.x * this.x) + (3 * this.x) + (2 * this.x * this.y) + this.y + (this.y * this.y) + input;
    var bitValue = val.toString(2);
    var numberOfOnes = bitValue.match(/1/g).length;
    return numberOfOnes % 2 === 0;
  }

  addAdjacentNodes(nodes) {
    var adjacent = nodes.filter(node => {
      if (node.x === this.x) {
        if (node.y === this.y - 1) {
          return true;
        }
        if (node.y === this.y + 1) {
          return true;
        }
      } else if (node.y === this.y) {
        if (node.x === this.x - 1) {
          return true;
        }
        if (node.x === this.x + 1) {
          return true;
        }
      }
      return false;
    }).filter(node => {
      return node.open;
    });
    this.adjacentNodes.push.apply(this.adjacentNodes, adjacent);
  }

  setAdjacentValues() {
    this.adjacentNodes.forEach(node => {
      if (node.value > this.value + 1 && !node.visited) {
        node.value = this.value + 1;
        node.parent = this;
      }
    });
  }
}

function program(roomSizeX, roomSizeY) {
  var nodes = createAllNodes(roomSizeX, roomSizeY);
  var nonVisitedNodes = nodes.filter(node => {
    return node.open;
  });
  nodes.forEach(node => {
    node.addAdjacentNodes(nodes);
  });
  var startNode = _.findWhere(nonVisitedNodes, {x: 1, y: 1});
  var currentNode = startNode;
  startNode.value = 0;
  while (currentNode) {
    currentNode.setAdjacentValues();
    currentNode.visited = true;
    removeFromList(currentNode, nonVisitedNodes);
    currentNode = getNextNode(nonVisitedNodes);
  }
  console.log('finished');
  var dest = _.findWhere(nodes, {x: 31, y: 39});
  console.log('part1', dest.value);
  var visited = nodes.filter(node =>{
    return node.value <= 50;
  }).length;
  console.log('part2: ', visited);
}

function getNextNode(nodes) {
  var node = _.reduce(nodes, (prevNode, curNode) => {
    if (curNode.value < prevNode.value) {
      return curNode;
    }
    return prevNode;
  });
  if (node.value === Infinity) {
    return null;
  }
  return node;
}

function removeFromList(node, nodes) {
  var i = nodes.indexOf(node);
  nodes.splice(i, 1);
}

function createAllNodes(x, y) {
  var nodes = [];
  for (let i = 0; i < x; i++) {
    for (let l = 0; l < y; l++) {
      nodes.push(new Node(l, i));
    }
  }
  return nodes;
}

function printOffice(nodes) {
  var office = '';
  for (let i = 0; i < nodes.length; i++) {
    if (nodes[i].open) {
      office += '.';
    } else {
      office += '#';
    }
    if (i + 1 < nodes.length) {
      var nextNode = nodes[i + 1];
      if (nextNode.y > nodes[i].y) {
        office += '\n';
      }
    }
  }
  return office;
}

program(100, 100);
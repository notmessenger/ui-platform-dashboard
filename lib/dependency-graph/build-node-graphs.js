const DepGraph = require('dependency-graph').DepGraph
const command = require('./commands')
const graph = require('./utilities')

const dependencyGraph = new DepGraph()

graph.initialize(dependencyGraph)

console.log(command.interface(dependencyGraph))

#!/usr/bin/env node

const DependencyGraph = require('./dependency-graph')
const graph = new DependencyGraph()

console.log(graph.getAll())
//console.log(graph.getDependantsOf('ember-frost-sort'))
//console.log(graph.getDependenciesOf('ember-frost-date-picker'))
//console.log(graph.getStartingAt('ember-frost-date-picker'))
//console.log(graph.hasNode('ember-frost-date-picker'))

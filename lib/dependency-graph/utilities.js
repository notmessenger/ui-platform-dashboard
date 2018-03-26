const fs = require('fs')
const nodes = JSON.parse(fs.readFileSync(`${__dirname}/../../data/nodes-all.json`))

function addDependencies (graph) {
    nodes.forEach((node) => {
        node.dependencies.forEach((dependency) => {
            graph.addDependency(node.name, dependency)
        })
    })
}

function addNodes (graph) {
    nodes.forEach((node) => {
        graph.addNode(node.name, node.description)
    })
}

function initialize (graph) {
    addNodes(graph)
    addDependencies(graph)
}

module.exports = {
    addDependencies,
    addNodes,
    initialize
}

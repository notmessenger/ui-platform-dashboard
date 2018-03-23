import DepGraph from 'dependency-graph'
import nodes from '../../data/node-data'
import process from 'process'

const addDependencies = () => {
    nodes.forEach((node) => {
        node.dependencies.forEach((dependency) => {
            graph.addDependency(node.name, dependency)
        })
    })
}

const addNodes = () => {
    nodes.forEach((node) => {
        graph.addNode(node.name, node.description)
    })
}

const graph = new DepGraph.DepGraph()

console.log(process)


addNodes()
addDependencies()


console.log(graph.size())

// https://stackoverflow.com/questions/4224606/how-to-check-whether-a-script-is-running-under-node-js

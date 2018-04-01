'use strict'

module.exports = class DependencyGraph {

  /**
   * Generate dependency graph for all nodes or just Frost Foundation ones
   *
   * @param {Boolean} allNodes Whether all nodes or just Frost Foundation nodes are included in graph
   * @returns {undefined}
   */
  constructor (allNodes = true) {
    const DepGraph = require('dependency-graph').DepGraph
    const fs = require('fs')

    this.dependencyGraph = new DepGraph()
    this.nodes = JSON.parse(fs.readFileSync(`${__dirname}/../../data/nodes-${allNodes ? 'all' : 'foundation'}.json`))

    this._addNodes()
    this._addDependencies()
  }

  /**
   * Get the overall processing order for the dependency graph as JSON
   *
   * @returns {Object} JSON
   */
  getAll() {
    return this._retrieveOutput('_all')
  }

  /**
   * Get an array containing the nodes that depend on the specified node (transitively) as JSON
   *
   * @param {String} node - specified node
   * @returns {Object} JSON
   */
  getDependantsOf (node) {
    return this._retrieveOutput('_dependantsOf', node)
  }

  /**
   * Get an array containing the nodes that the specified node depends on (transitively) as JSON
   *
   * @param {String} node - specified node
   * @returns {Object} JSON
   */
  getDependenciesOf (node) {
    return this._retrieveOutput('_dependenciesOf', node)
  }

  /**
   * Returns graph tree starting at specified node or error message
   *
   * @param {String} node specified node
   * @returns {Object} JSON
   */
  getStartingAt (node) {
    let output = {}

    try {
      const dependants = JSON.parse(this.getDependantsOf(node)).data
      const fullList = JSON.parse(this.getAll()).data

      const bisectedList = fullList.slice(fullList.indexOf(node)+1, fullList.length)

      output.data = bisectedList.filter((item) => dependants.includes(item))
    }
    catch (e) {
      output.error = e.message
    }

    return JSON.stringify(output, null, '  ')
  }

  /**
   * Whether specified node exists in the graph as JSON
   *
   * @param {String} node - specified node
   * @returns {Boolean}
   */
  hasNode (node) {
    return this._retrieveOutput('_hasNode', node)
  }

  /**
   * Add a dependency between two nodes
   *
   * @returns {undefined}
   */
  _addDependencies () {
    this.nodes.forEach((node) => {
      node.dependencies.forEach((dependency) => {
        this.dependencyGraph.addDependency(node.name, dependency)
      })
    })
  }

  /**
   * Add nodes to the graph
   *
   * @returns {undefined}
   */
  _addNodes () {
    this.nodes.forEach((node) => {
      this.dependencyGraph.addNode(node.name, node.description)
    })
  }

  /**
   * Get the overall processing order for the dependency graph
   *
   * @returns {Array}
   */
  _all () {
    return this.dependencyGraph.overallOrder()
  }

  /**
   * Get an array containing the nodes that depend on the specified node (transitively)
   *
   * @param {String} node - specified node
   * @returns {Object} JSON
   */
  _dependantsOf (node) {
    return this.dependencyGraph.dependantsOf(node)
  }

  /**
   * Get an array containing the nodes that the specified node depends on (transitively)
   *
   * @param {String} node - specified node
   * @returns {Object} JSON
   */
  _dependenciesOf (node) {
    return this.dependencyGraph.dependenciesOf(node)
  }

  /**
   * Whether specified node exists in the graph
   *
   * @param {String} node - specified node
   * @returns {Boolean}
   */
  _hasNode (node) {
    return this.dependencyGraph.hasNode(node)
  }

  /**
   * Return requested data or error message
   *
   * @param {String} method method to call to retrieve data
   * @param {String} node specified node
   * @returns {Object} JSON
   */
  _retrieveOutput (method, node) {
    let output = {}

    try {
      output.data = this[method](node)
    }
    catch (e) {
      output.error = e.message
    }

    return JSON.stringify(output, null, '  ')
  }
}

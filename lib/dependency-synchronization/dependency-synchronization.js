'use strict'

module.exports = class DependencySynchronization {

  /**
   *
   *
   * @param {Boolean} allNodes Whether synchronization data for all nodes or just Frost Foundation nodes is evaluated
   * @returns {undefined}
   */
  constructor (allNodes = true) {
    const fs = require('fs')

    this.nodes = JSON.parse(fs.readFileSync(`${__dirname}/../../data/nodes-${allNodes ? 'all' : 'foundation'}.json`))
  }
}

'use strict'

module.exports = class Repositories {

  constructor () {
    const fs = require('fs')
    this.repositories = JSON.parse(fs.readFileSync(`${__dirname}/../../data/repositories.json`))
  }

  get allRepositories() {
    return this.repositories
  }

  get allRepositoriesWithIcons() {
    return this.getRepositoriesFilteredByProperties({
      providesIcons: true
    }).filter((organization) => {
      return organization.repositories.length > 0
    })
  }

  get foundationRepositories() {
    return this.getRepositoriesFilteredByProperties({
      includedInFoundation: true
    }).filter((organization) => {
      return organization.repositories.length > 0
    })
  }

  get foundationRepositoriesWithIcons() {
    return this.getRepositoriesFilteredByProperties({
      includedInFoundation: true,
      providesIcons: true
    }).filter((organization) => {
      return organization.repositories.length > 0
    })
  }

  getRepositoriesFilteredByProperties(property = {}) {
    return this.repositories.map((organization) => {
      organization.repositories = organization.repositories.map((repository) => {
        let propertiesMatch = true

        for (let key in property) {
          if (repository[key] !== property[key]) {
            propertiesMatch = false
            break
          }
        }

        if (propertiesMatch) {
          return repository
        }
      }).filter((repository) => {
        return repository !== undefined
      })

      return organization
    })
  }
}

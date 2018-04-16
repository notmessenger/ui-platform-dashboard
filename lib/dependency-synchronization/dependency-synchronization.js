'use strict'

const Repositories = require('../repositories')
const util = require('util')

module.exports = class DependencySynchronization {

  constructor (all = true, dependencies = true) {
    this.allRepositories = all
    this.whichDependencies = dependencies ? 'dependencies' : 'devDependencies'

    this.repositories = new Repositories()
  }

  generateMatrix() {
    return this.getPackageJsonFiles().then(files => {
      let packages = {}

      for (let entry in files) {
        for (let dependency in files[entry][this.whichDependencies]) {
          let graph = (!packages[dependency]) ? {} : packages[dependency]
          graph[files[entry].name] = files[entry][this.whichDependencies][dependency]
          packages[dependency] = graph
        }
      }

      return packages
    })
  }

  getPackageJsonFiles() {
    const rp = require('request-promise')

    let requests = []

    this.buildUrls().forEach((url) => {
      requests.push(rp({uri: url, simple: false}))
    })

    return Promise.all(requests)
      .then(responses => {

        let files = []

        responses.forEach(response => {
          try {
           const file = JSON.parse(response)

           files[file.name] = file
          }
          catch (error) {}
        })

        return files
      })
      .catch(err => {
        console.log(err)
      })
  }

  buildUrls() {
    const organizations = this.allRepositories ? this.repositories.allRepositories : this.repositories.foundationRepositories

    let urls = []

    organizations.forEach((repositories) => {
      repositories.repositories.forEach((repository) => {
        urls.push(`${util.format(repositories.urls.raw, repository.name)}package.json`)
      })
    })

    return urls
  }
}

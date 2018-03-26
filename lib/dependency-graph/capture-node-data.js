#!/usr/bin/env node

const fs = require('fs')
const rp = require('request-promise')
const util = require('util')

/**
 * Path to data directory
 *
 * @type {String}
 */
const dataDirectory = `${__dirname}/../../data`

/**
 * Information for all repositories, including:
 *  - name
 *  - description
 *  - dependencies which are published by Ciena
 *
 * @type {Array}
 */
let allRepositoriesGraphData = []

/**
 * Information for Frost Foundation repositories, including:
 *  - name
 *  - description
 *  - dependencies which are published by Ciena
 *
 * @type {Array}
 */
let foundationRepositoriesGraphData = []

/**
 * @typedef repositories
 * @type {Object}
 * @property {String} name - name of the repository
 * @property {String} includedInFoundation - whether is a Frost Foundation repository
 */

/**
 * @typedef urls
 * @type {Object}
 * @property {String} provider - base url of GitHub (Enterprise) organization
 * @property {String} raw - url to access raw version of files
 */

/**
 * @typedef organizations
 * @type {Object}
 * @property {String} organization - name of the GitHub (Enterprise) organization
 * @property {repositories[]} repos - repositories to build graphs for
 * @property {urls} urls - GitHub (Enterprise) urls to access information
 */

/**
 * Repositories published by Ciena
 *
 * @type {organizations[]}
 */
const repositories = JSON.parse(fs.readFileSync(`${dataDirectory}/repositories.json`))

/**
 * Used to only graph dependencies published by Ciena
 *
 * @type {Array}
 */
let repositoriesPublishedByCiena = []

/**
 * Promise requests to retrieve package.json files for each repository
 *
 * @type {rp[]}
 */
let requests = []

// Prepare requests to retrieve package.json files for each repository
repositories.forEach((repository) => {
    repository.repositories.forEach((entry) => {
        let url = `${util.format(repository.urls.raw, entry.name)}package.json`
        requests.push(rp({uri: url, simple: false}))

        // Populate list of repositories published by Ciena
        repositoriesPublishedByCiena.push({
            name: entry.name,
            includedInFoundation: entry.includedInFoundation
        })
    })
})

Promise
    .all(requests)
    .then(responses => {
        responses.forEach(response => {
            try {
                const file = JSON.parse(response)

                const info = {
                    name: file.name,
                    description: file.description,
                    dependencies: []
                }

                for (let dependency in file.dependencies) {
                    if (repositoriesPublishedByCiena.map(repository => repository.name).includes(dependency)) {
                        info.dependencies.push(dependency)
                    }
                }

                allRepositoriesGraphData.push(info)

                if (repositoriesPublishedByCiena.find(repository => repository.name === info.name).includedInFoundation) {
                    foundationRepositoriesGraphData.push(info)
                }
            }
            catch (error) {
                console.log(error)
                console.log(response)
            }
        })

        fs.writeFileSync(`${dataDirectory}/nodes-all.json`, JSON.stringify(allRepositoriesGraphData, null, '  '))
        fs.writeFileSync(`${dataDirectory}/nodes-foundation.json`, JSON.stringify(foundationRepositoriesGraphData, null, '  '))
    })
    .catch(err => {
        console.log(err)
        console.log(responses)
    })

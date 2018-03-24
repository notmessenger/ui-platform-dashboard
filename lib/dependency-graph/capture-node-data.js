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
 * Repository information, including:
 *  - name
 *  - description
 *  - dependencies which are managed by Ciena
 *
 * @type {Array}
 */
let graphData = []

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
 * @property {String[]} repos - name of the repositories to build graphs for
 * @property {urls} urls - GitHub (Enterprise) urls to access information
 */

/**
 * Repositories managed by Ciena
 *
 * @type {organizations[]}
 */
const repositories = JSON.parse(fs.readFileSync(`${dataDirectory}/repositories.json`))

/**
 * Used to only graph dependencies managed by Ciena
 *
 * @type {Array}
 */
let repositoriesManagedByCiena = []

/**
 * Promise requests to retrieve package.json files for each repository
 *
 * @type {rp[]}
 */
let requests = []

// Prepare requests to retrieve package.json files for each repository
repositories.forEach((repository) => {
    repository.repositories.forEach((entry) => {
        let url = `${util.format(repository.urls.raw, entry)}package.json`

        requests.push(rp({uri: url, simple: false}))

        // Populate list of repositories managed by Ciena
        repositoriesManagedByCiena.push(entry)
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
                    if (repositoriesManagedByCiena.includes(dependency)) {
                        info.dependencies.push(dependency)
                    }
                }

                graphData.push(info)
            }
            catch (error) {
                console.log(error)
                console.log(responses)
            }
        })

        fs.writeFileSync(`${dataDirectory}/nodes.json`, JSON.stringify(graphData, null, '  '))
    })
    .catch(err => {
        console.log(err)
    })

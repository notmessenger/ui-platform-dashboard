#!/usr/bin/env node

const fs = require('fs')
const repositories = require('../repositories')
const rp = require('request-promise')
const util = require('util')

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

                for (dependency in file.dependencies) {
                    if (repositoriesManagedByCiena.includes(dependency)) {
                        info.dependencies.push(dependency)
                    }
                }

                graphData.push(info)
            }
            catch (error) {}
        })

        const fileContents = `const nodes = ${JSON.stringify(graphData, null, '  ')}\n\nmodule.exports = nodes\n`
        fs.writeFileSync(`${__dirname}/../../data/dependency-graph.js`, fileContents)
    })
    .catch(err => {
        console.log(err)
    })

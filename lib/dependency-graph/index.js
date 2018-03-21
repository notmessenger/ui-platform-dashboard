const chalk = require('chalk')
const {intersect} = require('semver-intersect')
const Promise = require('promise')
const rp = require('request-promise')
const util = require('util')

const writeFile = Promise.denodeify(fs.writeFile)

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
 * Repositories to build dependency graph(s) for
 *
 * @type {organizations[]}
 */
const repositories = [
    {
        organization: 'ciena-blueplanet',
        repositories: [
            'ciena-devops',
            'ember-bunsen-core',
            'ember-graphlib',
            'ember-lodash-shim',
            'ember-mock-socket',
            'ember-pikaday-shim',
            'ember-pollboy',
            'ember-prop-types',
            'ember-seamless-immutable-shim',
            'ember-spread',
            'ember-test-utils',
            'ember-validator-shim',
            'ember-z-schema',
            'eslint-plugin-ember-standard',
            'eslint-plugin-ocd',
            'pr-bumper'
        ],
        urls: {
            provider: 'https://github.com/',
            raw: 'https://raw.githubusercontent.com/ciena-blueplanet/%s/master/'
        }
    },
    {
        organization: 'ciena-frost',
        repositories: [
            'ember-cli-frost-blueprints',
            'ember-frost-action-bar',
            'ember-frost-bunsen',
            'ember-frost-chart',
            'ember-frost-cookbook',
            'ember-frost-core',
            'ember-frost-date-picker',
            'ember-frost-demo-components',
            'ember-frost-fields',
            'ember-frost-file-picker',
            'ember-frost-info-bar',
            'ember-frost-list',
            'ember-frost-modal',
            'ember-frost-navigation',
            'ember-frost-notifier',
            'ember-frost-object-browser',
            'ember-frost-object-details',
            'ember-frost-pick-list',
            'ember-frost-popover',
            'ember-frost-sidebar',
            'ember-frost-sort',
            'ember-frost-table',
            'ember-frost-tabs',
            'ember-frost-test',
            'eslint-config-frost-standard'
        ],
        urls: {
            provider: 'https://github.com/',
            raw: 'https://raw.githubusercontent.com/ciena-frost/%s/master/'
        }
    },
    {
        organization: 'Frost',
        repositories: [
            'ciena-comet',
            'ciena-ui-foundation'
        ],
        urls: {
            provider: 'https://github.cyanoptics.com',
            raw: 'https://github.cyanoptics.com/raw/Frost/%s/master/'
        }
    },
    {
        organization: 'BP_FROST',
        repositories: [
            'ciena-icons',
            'frost-app-bar',
            'frost-authentication',
            'frost-login'
        ],
        urls: {
            provider: 'https://bitbucket.ciena.com',
            raw: 'https://bitbucket.ciena.com/projects/BP_FROST/repos/%s/raw/'
        }
    }
]

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

console.log(graphData)

        this.writeFile('../data/jeremy', JSON.stringify(graphData, null, '  '))
            .then(() => {})
            .catch((error) => {})
    })
    .catch(err => {
        console.log(err)
    })

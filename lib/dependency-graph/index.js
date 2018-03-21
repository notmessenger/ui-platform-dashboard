/**
 * Whether to display the dependency graph data
 */
const DISPLAY_PACKAGE_GRAPH = false

/**
 * Whether to display the dependency data
 */
const DISPLAY_DEPENDENCY_DATA = true



const urls = [

    // https://github.com/ciena-blueplanet
    'https://raw.githubusercontent.com/ciena-blueplanet/ciena-devops/master/',
    'https://raw.githubusercontent.com/ciena-blueplanet/ember-bunsen-core/master/',
    'https://raw.githubusercontent.com/ciena-blueplanet/ember-dagre/master/',
    'https://raw.githubusercontent.com/ciena-blueplanet/ember-graphlib/master/',
    'https://raw.githubusercontent.com/ciena-blueplanet/ember-lodash-shim/master/',
    'https://raw.githubusercontent.com/ciena-blueplanet/ember-mock-socket/master/',
    'https://raw.githubusercontent.com/ciena-blueplanet/ember-pikaday-shim/master/',
    'https://raw.githubusercontent.com/ciena-blueplanet/ember-pollboy/master/',
    'https://raw.githubusercontent.com/ciena-blueplanet/ember-prop-types/master/',
    'https://raw.githubusercontent.com/ciena-blueplanet/ember-seamless-immutable-shim/master/',
    'https://raw.githubusercontent.com/ciena-blueplanet/ember-spread/master/',
    'https://raw.githubusercontent.com/ciena-blueplanet/ember-test-utils/master/',
    'https://raw.githubusercontent.com/ciena-blueplanet/ember-validator-shim/master/',
    'https://raw.githubusercontent.com/ciena-blueplanet/ember-z-schema/master/',
    'https://raw.githubusercontent.com/ciena-blueplanet/eslint-plugin-ember-standard/master/',
    'https://raw.githubusercontent.com/ciena-blueplanet/eslint-plugin-ocd/master/',

    // https://github.com/ciena-frost
    'https://raw.githubusercontent.com/ciena-frost/ember-cli-frost-blueprints/master/',
    'https://raw.githubusercontent.com/ciena-frost/ember-frost-action-bar/master/',
    'https://raw.githubusercontent.com/ciena-frost/ember-frost-bunsen/master/',
    'https://raw.githubusercontent.com/ciena-frost/ember-frost-chart/master/',
    // 'https://raw.githubusercontent.com/ciena-frost/ember-frost-cookbook/master/',
    'https://raw.githubusercontent.com/ciena-frost/ember-frost-core/master/',
    'https://raw.githubusercontent.com/ciena-frost/ember-frost-date-picker/master/',
    'https://raw.githubusercontent.com/ciena-frost/ember-frost-demo-components/master/',
    'https://raw.githubusercontent.com/ciena-frost/ember-frost-fields/master/',
    'https://raw.githubusercontent.com/ciena-frost/ember-frost-file-picker/master/',
    'https://raw.githubusercontent.com/ciena-frost/ember-frost-info-bar/master/',
    'https://raw.githubusercontent.com/ciena-frost/ember-frost-list/master/',
    'https://raw.githubusercontent.com/ciena-frost/ember-frost-modal/master/',
    'https://raw.githubusercontent.com/ciena-frost/ember-frost-navigation/master/',
    'https://raw.githubusercontent.com/ciena-frost/ember-frost-notifier/master/',
    'https://raw.githubusercontent.com/ciena-frost/ember-frost-object-browser/master/',
    'https://raw.githubusercontent.com/ciena-frost/ember-frost-object-details/master/',
    'https://raw.githubusercontent.com/ciena-frost/ember-frost-pick-list/master/',
    'https://raw.githubusercontent.com/ciena-frost/ember-frost-popover/master/',
    'https://raw.githubusercontent.com/ciena-frost/ember-frost-sidebar/master/',
    'https://raw.githubusercontent.com/ciena-frost/ember-frost-sort/master/',
    'https://raw.githubusercontent.com/ciena-frost/ember-frost-table/master/',
    'https://raw.githubusercontent.com/ciena-frost/ember-frost-tabs/master/',
    'https://raw.githubusercontent.com/ciena-frost/ember-frost-test/master/',
    'https://raw.githubusercontent.com/ciena-frost/eslint-config-frost-standard/master/',

    // https://github.cyanoptics.com/Frost

    'https://github.cyanoptics.com/raw/Frost/ciena-ui-foundation/master/',

    // https://bitbucket.ciena.com/projects/BP_FROST
    'https://bitbucket.ciena.com/projects/BP_FROST/repos/alarms-common/raw/',
    'https://bitbucket.ciena.com/projects/BP_FROST/repos/ciena-comet/raw/',
    'https://bitbucket.ciena.com/projects/BP_FROST/repos/ciena-detail-pods/raw/',
    'https://bitbucket.ciena.com/projects/BP_FROST/repos/ciena-icons/raw/',
    'https://bitbucket.ciena.com/projects/BP_FROST/repos/frost-app-bar/raw/',
    'https://bitbucket.ciena.com/projects/BP_FROST/repos/frost-authentication/raw/',
    'https://bitbucket.ciena.com/projects/BP_FROST/repos/frost-login/raw/'
]

// Imports
const chalk = require('chalk')
const {intersect} = require('semver-intersect')
const rp = require('request-promise')

let requests = []
let packages = {}

urls.forEach((entry) => {
    let url = `${entry}package.json`

    requests.push(rp({uri: url, simple: false}))
})


Promise
    .all(requests)
    .then(responses => {

        // Build dependencies and/or devDependencies graph data
        responses.forEach(response => {
            try {
                const file = JSON.parse(response)

                for (dependency in file.dependencies) {
                    let graph = (!packages[dependency]) ? {} : packages[dependency]
                    graph[file.name] = file.dependencies[dependency]
                    packages[dependency] = graph
                }
            }
            catch (error) {}
        })

console.log(packages)
    })
    .catch(err => {
        console.log(err)
    })



/*
Promise.all(requests)
    .then(responses => {

        // Build dependencies and/or devDependencies graph data
        responses.forEach(response => {
            try {
                const file = JSON.parse(response)

                for (dependency in file.dependencies) {
                    let graph = (!packages[dependency]) ? {} : packages[dependency]
                    graph[file.name] = file.dependencies[dependency]
                    packages[dependency] = graph
                }
            }
            catch (error) {}
        })

        // display dependencies and/or devDependencies graph data
        if (DISPLAY_PACKAGE_GRAPH) {
            console.log(packages)
        }

        const packageGraph = {}

        // build version list of dependencies
        for (package in packages) {
            let versions = []

            for (subPackage in packages[package]) {
                versions.push(packages[package][subPackage])

                let graph = (!packageGraph[subPackage]) ? {} : packageGraph[subPackage]
                graph[package] = packages[package][subPackage]
                packageGraph[subPackage] = graph
            }

            if (versions.length === 1) {
                if (DISPLAY_DEPENDENCY_DATA) {
                    console.log(chalk.green(`${package}: ${versions[0]}`))
                }
            } else {
                const unique = [...new Set(versions)]

                if (unique.length === 1) {
                    if (DISPLAY_DEPENDENCY_DATA) {
                        console.log(chalk.green(`${package}: ${unique[0]}`))
                    }
                } else {
                    if (DISPLAY_DEPENDENCY_DATA) {
                        console.log('\n')
                        console.log(chalk.red(`${package} (depended on by: at version)`))
                    }

                    try {
                        if (DISPLAY_DEPENDENCY_DATA) {
                            const intersection = intersect(versions.join(' '))
                            console.log(chalk.yellow(`Required version: ${intersection}`))
                        }

                        for (subPackage in packages[package]) {
                            if (intersection === packages[package][subPackage]) {
                                if (DISPLAY_DEPENDENCY_DATA) {
                                    console.log(`${subPackage}: `, chalk.green(packages[package][subPackage]))
                                }
                            } else {
                                if (DISPLAY_DEPENDENCY_DATA) {
                                    console.log(`${subPackage}: `, chalk.red(packages[package][subPackage]))
                                }
                           }
                        }
                    }
                    catch(e) {
                        if (DISPLAY_DEPENDENCY_DATA) {
                            console.log(chalk.red(e.message))
                        }

                        for (subPackage in packages[package]) {
                            if (DISPLAY_DEPENDENCY_DATA) {
                                console.log(chalk.red(`${subPackage}: ${packages[package][subPackage]}`))
                            }
                        }
                    }

                    if (DISPLAY_DEPENDENCY_DATA) {
                        console.log('\n')
                    }
                }
            }
        }

//console.log(packageGraph)

    })
    .catch(err => {
        console.log(err)
    })
*/

/*

// Example data structure

packages = {
    'broccoli-funnel': {
        'ember-dagre': '^1.0.6'
    },
    'broccoli-merge-trees': {
        'ember-bunsen-core': '^1.0.0',
        'ember-dagre': '^1.1.4'
    },
    'bunsen-core': {
        'ember-bunsen-core: '^2.0.0'
    },
    'ember-cli-babel': {
        'ember-bunsen-core': '^5.1.7',
        'ember-dagre': '^5.1.7'
    },
    'ember-z-schema': {
        'ember-bunsen-core: '^2.4.0'
    },
    'npm-install-security-check: {
        'ember-dagre': '^1.0.2'
    }
}
*/

const argument = process.argv[2]
const banner = require('./banner')
const chalk = require('chalk')
const EOL = require('os').EOL
const fs = require('fs')

/**
 * Path to data directory
 *
 * @type {String}
 */
const dataDirectory = `${__dirname}/../../data`

/**
 * Nodes
 *
 * @type {Object}
 */
const nodes = JSON.parse(fs.readFileSync(`${dataDirectory}/nodes-all.json`))

function all (graph) {
    return graph.overallOrder()
}

function help () {
    return banner.generate()
}

function dependenciesOf (graph) {
    return graph.dependenciesOf(argument.split('=')[1])
}

function dependantsOf (graph) {
    return graph.dependantsOf(argument.split('=')[1])
}

function hasNode (graph) {
    return graph.hasNode(argument.split('=')[1])
}

function interface (graph) {
    let output

    try {
        if (argument === undefined) {
            output = all(graph)

        } else {
            // --flag or --flag=value
            if (!/^--[a-z\-]*(\=[a-z0-9\-]+)?$/.test(argument)) {
                output = 'Invalid argument.  Use --help for assistance.'

            } else if (argument === '--help') {
                output = help()

            } else if (/^--starting-at\=/.test(argument)) {
                output = startingAt(graph)

            } else if (/^--dependencies-of\=/.test(argument)) {
                output = dependenciesOf(graph)

            } else if (/^--dependants-of\=/.test(argument)) {
                output = dependantsOf(graph)

            } else if (argument === '--list-nodes') {
                output = listNodes()

            } else if (/^--has-node\=/.test(argument)) {
                output = hasNode(graph)

            } else {
                output = 'Invalid argument.  Use --help for assistance.'
            }
        }

        if (Array.isArray(output)) {
            output = output.join(EOL)
        }
    }
    catch (e) {
        output = chalk.red(e.message)
    }

    return output
}

function listNodes () {
    let organizations = []
    let output

    nodes.forEach((node) => {
        organizations.push(node.organization)
    })

    organizations = [...new Set(organizations)]

    organizations.forEach((organization) => {
        output = chalk`${output}

{cyan ${organization}}`

        nodes.forEach((node) => {
            if (node.organization === organization) {
                output = chalk`${output}

  {yellow ${node.name}}
    ${(node.description) ? node.description : '(no description)'}`
            }
        })
    })

    return output
}

function startingAt (graph) {
    const startingNode = argument.split('=')[1]
    const dependants = graph.dependantsOf(startingNode)
    const fullList = graph.overallOrder()

    const bisectedList = fullList.slice(fullList.indexOf(startingNode)+1, fullList.length)

    return bisectedList.filter((item) => dependants.includes(item))
}

module.exports = {
    all,
    dependantsOf,
    dependenciesOf,
    help,
    listNodes,
    hasNode,
    interface
}

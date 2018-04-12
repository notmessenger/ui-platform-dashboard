#!/usr/bin/env node

const argument = process.argv[2]
const chalk = require('chalk')
const DependencyGraph = require('./dependency-graph')
const EOL = require('os').EOL
const prompt = require('prompt')

/**
 * Prompt for whether to interrogate nodes for Frost Foundation or All
 * @type {Object}
 */
const nodeProperty = {
  name: 'allfrost',
  message: 'Do you wish to interrogate nodes for just the Frost Foundation ("frost") or All ("all") dependencies?',
  validator: /^frost$|^all$/,
  warning: 'Must respond "frost" or "all"',
  default: 'frost'
}

/**
 * @typedef option
 * @type {Object}
 * @property {String} name - name of the option
 * @property {String} parameter - type and value of argument to pass to option
 * @property {String} description - description of the option
 */

/**
 * Supported options that can be passed to this script, displayed by the --help option
 *
 * @type {option[]}
 */
const options = [
  {
    name: 'dependencies-of',
    parameter: '(String) <node name>',
    description: 'The un-ordered list of nodes that the specified node depends on (transitively)'
  },
  {
    name: 'dependants-of',
    parameter: '(String) <node name>',
    description: 'The un-ordered list of nodes that depend on the specified node (transitively)'
  },
  {
    name: 'has-node',
    parameter: '(String) <node name>',
    description: 'Check if a node exists in the graph'
  },
  {
    name: 'help',
    description: 'This information currently being displayed'
  },
  {
    name: 'starting-at',
    parameter: '(String) <node name>',
    description: 'The overall processing order for nodes in the dependency graph beginning with the one specified'
  }
]

/**
 * Generates banner to display for --help option
 *
 * @param {option[]} options Supported options that can be passed to this script
 * @returns {String} Banner to display
 */
function generateBanner (options) {
  let content = chalk`
This program allows for the inter-connected dependencies of the github.com/ciena-blueplanet,
github.com/ciena-frost, and github.cyanoptics.com/Frost Ember CLI addons to be interrogated
to determine the order updates need to be performed amongst them.

When no arguments are provided the overall processing order for {bold *ALL*} nodes in the dependency
graph is listed.

Use the arguments listed below to perform additional specific queries, in the format of either

  --list-nodes

  or

  --has-node=<value>


{cyan default (no arguments)}
The overall processing order for {bold *ALL*} nodes in the dependency graph

`

  options.forEach((argument) => {
    content = chalk`${content}{cyan --${argument.name}} {yellow ${(argument.parameter) ? argument.parameter : ''}}
${argument.description}

`
  })

  return content
}

/**
 * Content to display when --help option is passed
 *
 * @return {String} Help banner
 */
function help () {
  return generateBanner(options)
}

// BEGIN: CLI interaction

prompt.colors = false
prompt.message = null
prompt.start()

prompt.get(nodeProperty, function (err, result) {
  const graph = new DependencyGraph(result.allfrost === 'all' ? true : false)

  /**
   * Whether the output to display is JSON so know whether to parse it
   *
   * @type {Boolean} [true]
   */
  let isJsonResponse = true

  /**
   * Data or error message to display
   *
   * @type {String}
   */
  let output

  try {
    if (argument === undefined) {
      output = graph.getAll()

    } else {
      const node = argument.split('=')[1]

      // --flag or --flag=value
      if (!/^--[a-z\-]*(\=[a-z0-9\-]+)?$/.test(argument)) {
        output = 'Invalid argument.  Use --help for assistance.'
        isJsonResponse = false

      } else if (argument === '--help') {
        output = help()
        isJsonResponse = false

      } else if (/^--starting-at\=/.test(argument)) {
        output = graph.getStartingAt(node)

      } else if (/^--dependencies-of\=/.test(argument)) {
        output = graph.getDependenciesOf(node)

      } else if (/^--dependants-of\=/.test(argument)) {
        output = graph.getDependantsOf(node)

      } else if (/^--has-node\=/.test(argument)) {
        output = graph.hasNode(node)

      } else {
        output = 'Invalid argument.  Use --help for assistance.'
        isJsonResponse = false
      }
    }

    if (isJsonResponse) {
      output = JSON.parse(output)

      if (Array.isArray(output.data)) {
        output = output.data.join(EOL)
      }
    }
  }
  catch (e) {
    output = chalk.red(e.message)
  }

  console.log(EOL)
  console.log(output)
  console.log(EOL)
})

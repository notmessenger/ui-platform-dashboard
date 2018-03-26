const chalk = require('chalk')
const supportedArguments = require('./arguments')

function generate () {
    let content = chalk`
This program allows for the inter-connected dependencies of the github.com/ciena-blueplanet,
github.cyanoptics.com/Frost, and bitbucket.ciena.com/projects/BP_FROST Ember CLI addons to be
interrogated to determine the order updates need to be performed amongst them.

When no arguments are provided the overall processing order for {bold *ALL*} nodes in the dependency
graph is listed.

Use the arguments listed below to perform additional specific queries, in the format of either

  --list-nodes

  or

  --has-node=<value>


{cyan default (no arguments)}
The overall processing order for {bold *ALL*} nodes in the dependency graph

`

    supportedArguments.forEach((argument) => {
      content = chalk`${content}{cyan --${argument.name}} {yellow ${(argument.parameter) ? argument.parameter : ''}}
${argument.description}

`
    })

    return content
}

module.exports = {
  generate
}

const arguments = [
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
        name: 'list-nodes',
        description: 'Un-ordered list of all the nodes contained in the graph'
    },
    {
        name: 'starting-at',
        parameter: '(String) <node name>',
        description: 'The overall processing order for nodes in the dependency graph beginning with the one specified'
    }
]

module.exports = arguments

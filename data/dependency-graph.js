const nodes = [
  {
    "name": "ciena-devops",
    "description": "A collection of scripts and configurations used by the Ciena organization in their DevOps",
    "dependencies": []
  },
  {
    "name": "ember-bunsen-core",
    "description": "Core bunsen library for Ember apps",
    "dependencies": [
      "ember-lodash-shim",
      "ember-seamless-immutable-shim",
      "ember-validator-shim",
      "ember-z-schema"
    ]
  },
  {
    "name": "ember-graphlib",
    "description": "The default blueprint for ember-cli addons.",
    "dependencies": []
  },
  {
    "name": "ember-lodash-shim",
    "description": "Lodash for Ember apps",
    "dependencies": []
  },
  {
    "name": "ember-mock-socket",
    "description": "Ember shim for mock-socket",
    "dependencies": []
  },
  {
    "name": "ember-pikaday-shim",
    "description": "pikaday for Ember apps",
    "dependencies": []
  },
  {
    "name": "ember-pollboy",
    "description": "Ember polling service.",
    "dependencies": []
  },
  {
    "name": "ember-prop-types",
    "description": "This addon provides React-like property management for components.",
    "dependencies": []
  },
  {
    "name": "ember-seamless-immutable-shim",
    "description": "Immutable data structures for Ember apps",
    "dependencies": []
  },
  {
    "name": "ember-spread",
    "description": "Dynamic options for dynamic components",
    "dependencies": [
      "ember-prop-types"
    ]
  },
  {
    "name": "ember-test-utils",
    "description": "Utilities to assist with testing ember apps/addons",
    "dependencies": [
      "eslint-config-frost-standard"
    ]
  },
  {
    "name": "ember-validator-shim",
    "description": "String validators and sanitizers for Ember apps",
    "dependencies": []
  },
  {
    "name": "ember-z-schema",
    "description": "JSON Schema validator for Ember apps",
    "dependencies": [
      "ember-lodash-shim",
      "ember-validator-shim"
    ]
  },
  {
    "name": "eslint-plugin-ember-standard",
    "description": "ESLint rules for Ember projects.",
    "dependencies": []
  },
  {
    "name": "eslint-plugin-ocd",
    "description": "Obsessive compulsive ESLint rules for Javascript projects.",
    "dependencies": []
  },
  {
    "name": "pr-bumper",
    "description": "Bump the version of a package based on a GitHub Pull Request",
    "dependencies": []
  },
  {
    "name": "ember-cli-frost-blueprints",
    "description": "The place for all the frosty blueprints",
    "dependencies": []
  },
  {
    "name": "ember-frost-action-bar",
    "description": "The default blueprint for ember-cli addons.",
    "dependencies": [
      "ember-frost-core",
      "ember-prop-types"
    ]
  },
  {
    "name": "ember-frost-bunsen",
    "description": "Create UI's from JSON configurations.",
    "dependencies": [
      "ember-bunsen-core",
      "ember-frost-core",
      "ember-frost-date-picker",
      "ember-frost-fields",
      "ember-frost-popover",
      "ember-frost-table",
      "ember-frost-tabs",
      "ember-lodash-shim",
      "ember-prop-types",
      "ember-spread"
    ]
  },
  {
    "name": "ember-frost-chart",
    "description": "Composable charts with decoupled axes / plots and some extra pizzazz",
    "dependencies": [
      "ember-frost-core",
      "ember-prop-types"
    ]
  },
  {
    "name": "ember-frost-core",
    "description": "The library of core frost components",
    "dependencies": [
      "ember-prop-types",
      "ember-spread"
    ]
  },
  {
    "name": "ember-frost-date-picker",
    "description": "",
    "dependencies": [
      "ember-frost-core",
      "ember-pikaday-shim",
      "ember-prop-types"
    ]
  },
  {
    "name": "ember-frost-demo-components",
    "description": "A collection of components and blueprints for showcasing frost components",
    "dependencies": [
      "ember-frost-core",
      "ember-frost-popover",
      "ember-prop-types"
    ]
  },
  {
    "name": "ember-frost-fields",
    "description": "",
    "dependencies": [
      "ember-frost-core",
      "ember-prop-types"
    ]
  },
  {
    "name": "ember-frost-file-picker",
    "description": "File picker component",
    "dependencies": [
      "ember-frost-core",
      "ember-prop-types"
    ]
  },
  {
    "name": "ember-frost-info-bar",
    "description": "",
    "dependencies": [
      "ember-frost-core"
    ]
  },
  {
    "name": "ember-frost-list",
    "description": "The default blueprint for ember-cli addons.",
    "dependencies": [
      "ember-frost-core",
      "ember-prop-types"
    ]
  },
  {
    "name": "ember-frost-modal",
    "description": "Modals for what ails you",
    "dependencies": [
      "ember-frost-core",
      "ember-prop-types"
    ]
  },
  {
    "name": "ember-frost-navigation",
    "description": "A modal navigation menu component",
    "dependencies": [
      "ember-frost-core",
      "ember-prop-types"
    ]
  },
  {
    "name": "ember-frost-notifier",
    "description": "An ember service and component for managing application notifications",
    "dependencies": [
      "ember-frost-core"
    ]
  },
  {
    "name": "ember-frost-object-browser",
    "description": "Object browser addon for ember apps.",
    "dependencies": [
      "ember-frost-core",
      "ember-frost-popover",
      "ember-prop-types"
    ]
  },
  {
    "name": "ember-frost-object-details",
    "description": "The default blueprint for ember-cli addons.",
    "dependencies": [
      "ember-frost-core",
      "ember-prop-types"
    ]
  },
  {
    "name": "ember-frost-pick-list",
    "description": "The default blueprint for ember-cli addons.",
    "dependencies": [
      "ember-frost-core",
      "ember-frost-sort",
      "ember-frost-table",
      "ember-prop-types"
    ]
  },
  {
    "name": "ember-frost-popover",
    "description": "Popping over stuff.",
    "dependencies": [
      "ember-frost-core",
      "ember-prop-types"
    ]
  },
  {
    "name": "ember-frost-sidebar",
    "description": "The default blueprint for ember-cli addons.",
    "dependencies": [
      "ember-frost-core",
      "ember-prop-types"
    ]
  },
  {
    "name": "ember-frost-sort",
    "description": "A sorting component to sort collections",
    "dependencies": [
      "ember-frost-core",
      "ember-prop-types"
    ]
  },
  {
    "name": "ember-frost-table",
    "description": "A simple table component",
    "dependencies": [
      "ember-frost-core",
      "ember-prop-types"
    ]
  },
  {
    "name": "ember-frost-tabs",
    "description": "A tabs addon.",
    "dependencies": [
      "ember-frost-core",
      "ember-prop-types"
    ]
  },
  {
    "name": "ember-frost-test",
    "description": "The place for all the frosty testing things",
    "dependencies": []
  },
  {
    "name": "eslint-config-frost-standard",
    "description": "Standard ESLint rules for Frost projects",
    "dependencies": [
      "eslint-plugin-ember-standard",
      "eslint-plugin-ocd"
    ]
  },
  {
    "name": "ciena-comet",
    "description": "Ember addon for kafkacomet",
    "dependencies": [
      "ember-mock-socket"
    ]
  },
  {
    "name": "ciena-ui-foundation",
    "description": "The foundation for building Ciena User Interfaces",
    "dependencies": [
      "ember-frost-action-bar",
      "ember-frost-bunsen",
      "ember-frost-chart",
      "ember-frost-core",
      "ember-frost-date-picker",
      "ember-frost-fields",
      "ember-frost-file-picker",
      "ember-frost-info-bar",
      "ember-frost-list",
      "ember-frost-modal",
      "ember-frost-navigation",
      "ember-frost-notifier",
      "ember-frost-object-browser",
      "ember-frost-object-details",
      "ember-frost-pick-list",
      "ember-frost-popover",
      "ember-frost-sidebar",
      "ember-frost-sort",
      "ember-frost-table",
      "ember-frost-tabs",
      "ember-prop-types",
      "ember-spread",
      "frost-authentication"
    ]
  },
  {
    "name": "ciena-icons",
    "description": "The default blueprint for ember-cli addons.",
    "dependencies": [
      "ember-frost-core"
    ]
  },
  {
    "name": "frost-app-bar",
    "description": "An app-bar component wired in with blueplanet APIs to fetch links dynamically from installed apps",
    "dependencies": [
      "ember-frost-bunsen",
      "ember-frost-core",
      "ember-frost-modal",
      "ember-frost-notifier",
      "ember-frost-popover",
      "ember-prop-types"
    ]
  },
  {
    "name": "frost-authentication",
    "description": "Addon to add Tron authentication integration to an app.",
    "dependencies": [
      "ember-frost-core",
      "ember-frost-modal",
      "frost-login"
    ]
  },
  {
    "name": "frost-login",
    "description": "The default blueprint for ember-cli addons.",
    "dependencies": [
      "ember-frost-bunsen",
      "ember-frost-core"
    ]
  }
]

module.exports = nodes

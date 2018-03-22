/* eslint-env node */
'use strict'

const path = require('path')
const Funnel = require('broccoli-funnel')

function initOptions (options) {
  options.babel = options.babel || {}
  options.babel.optional = options.babel.optional || []
}

module.exports = {
  name: 'add-paths-to-babel',

  _getAddonOptions: function () {
    return (this.parent && this.parent.options) || (this.app && this.app.options) || {}
  },

  init: function () {
    if (this._super.init) {
      this._super.init.apply(this, arguments)
    }

    this.options = this.options || {}
    initOptions(this.options)

    if (this.options.babel.optional.indexOf('es7.decorators') === -1) {
      this.options.babel.optional.push('es7.decorators')
    }
  },

  included: function (app) {
    // Addons - see: https://github.com/ember-cli/ember-cli/issues/3718
    if (typeof app.import !== 'function' && app.app) {
      this.app = app = app.app
    }

    this._super.included.apply(this, app)

    if (app) {
      app.import(path.join('vendor', 'jeremy.js'))
    }
  },

  isDevelopingAddon: function() {
    return true
  },

  treeForVendor: function () {
    let tree = new Funnel(path.join(this.project.root, 'lib'), {
      files: ['jeremy.mjs'],

      getDestinationPath: function(relativePath) {
        if (relativePath === 'jeremy.mjs') {
          return 'jeremy.js'
        }

        return relativePath
      }
    })

    const addonOptions = this._getAddonOptions()

    if (addonOptions && addonOptions.babel) {
        const BabelTranspiler = require('broccoli-babel-transpiler')
        tree = new BabelTranspiler(tree, addonOptions.babel)
    }

    return tree
  }
}

(function() {
  function vendorModule() {
    'use strict'

    return { 'default': self['repositories'] }
  }

  define('repositories', [], vendorModule)
})()

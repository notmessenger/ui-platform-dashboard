import Ember from 'ember';

export default Ember.Route.extend({
  model () {
    // fetch('https://raw.githubusercontent.com/notmessenger/ui-platform-dashboard/master/data/repositories.json')
    //   .then(function(response) {
    //     return response.json()
    //   }).then(function(json) {
    //     console.log('parsed json', json)
    //   }).catch(function(ex) {
    //     console.log('parsing failed', ex)
    //   })

    return [
      {
        dependency: 'broccoli-funnel',
        packages: [
          {
            name: 'ember-dagre',
            version: '^1.1.4',
            stringMatch: false,
            semverMatch: false
          }
        ]
      },
      {
        dependency: 'broccoli-merge-trees',
        packages: [
          {
            name: 'ember-bunsen-core',
            version: '^1.0.0',
            stringMatch: false,
            semverMatch: true
          },
          {
            name: 'ember-dagre',
            version: '^1.1.4',
            stringMatch: true,
            semverMatch: true
          }
        ]
      }
    ]
  }
})

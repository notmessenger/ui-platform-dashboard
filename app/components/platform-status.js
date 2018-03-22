import Ember from 'ember'
import repositories from 'jeremy'

export default Ember.Component.extend({
    init() {
        this._super(...arguments)

        console.log(repositories)
    }
})

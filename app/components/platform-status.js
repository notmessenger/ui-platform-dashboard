import Ember from 'ember';
import repositories from '../lib/repositories'

export default Ember.Component.extend({
    init() {
        this._super(...arguments)

        console.log(repositories)
    }
})

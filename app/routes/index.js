import Ember from 'ember';

export default Ember.Route.extend({
  model: function () {
    return this.store.find('list');
  },
  afterModel: function (model) {
    if (model.get('firstObject')) {
      this.transitionTo('lists.show', model.get('firstObject.id'));
    } else {
      return this.store.createRecord('list', { name: 'Default' })
        .save()
        .then( newList => this.transitionTo('lists.show', newList) );
    }
  }
});

import Ember from 'ember';
import moment from 'moment';

export default Ember.Component.extend({
  tagName: 'new-todo',

  // internal bindings
  name: null,
  dueDate: Ember.computed.oneWay('tomorrow'),
  tomorrow: function () {
    return moment().add(1, 'day').startOf('hour').format();
  }.property(),

  actions: {
    createNew: function () {
      this.sendAction('action', this.get('name'), this.get('dueDate'));
      this.setProperties({
        name: null,
        dueDate: this.get('tomorrow')
      });
    }
  }
});

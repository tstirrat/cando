import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  createdDate: DS.attr('utcdate'),
  dueDate: DS.attr('utcdate'),
  completedDate: DS.attr('utcdate'),
  list: DS.belongsTo('list'),

  isCompleted: Ember.computed.bool('completedDate')
});

import Ember from 'ember';
import moment from 'moment';

export default Ember.Component.extend({
  tagName: 'span',
  classNames: 'remaining-days',
  classNameBindings: ['warningLevel'],

  // public bindings
  dueDate: null,

  now: function () {
    return new Date();
  },

  remainingDaysExact: function () {
    var dueDate = this.get('dueDate');
    if (dueDate instanceof Date || moment.isMoment(dueDate)) {
      return moment(dueDate).diff(this.now(), 'days');
    }
    return 0;
  }.property('dueDate'),

  remainingDays: function () {
    var dueDate = this.get('dueDate');
    if (dueDate instanceof Date || moment.isMoment(dueDate)) {
      return moment(dueDate).startOf('day').diff(moment().startOf('day'), 'days');
    }
    return 0;
  }.property('dueDate'),

  warningLevel: function () {
    var remaining = this.get('remainingDays');

    if (remaining <= 1) {
      return 'danger';
    }

    if (remaining <= 3) {
      return 'warning';
    }

    return null;
  }.property('remainingDays')
});

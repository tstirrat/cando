import Ember from 'ember';
import moment from 'moment';

export default Ember.Handlebars.makeBoundHelper(function(value, options) {
  return moment(value).fromNow();
});

import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.resource('lists', function () {
    this.route('show', { path: '/show/:list_id' });
  });
});

export default Router;

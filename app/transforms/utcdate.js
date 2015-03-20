import DS from 'ember-data';
import moment from 'moment';

export default DS.Transform.extend({
  serialize: function (date) {
    if (!date) {
      return null;
    }
    return moment(date).utc().valueOf();
  },
  deserialize: function(serialized) {
    return moment.utc(serialized).local();
  }
});

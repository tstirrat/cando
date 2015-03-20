import Ember from 'ember';
import moment from 'moment';

export default Ember.Controller.extend({

  // todoClicked: function () {

  // }.observes('model.todos.@each.completed'),

  actions: {
    completeTodo: function (todo) {
      todo.set('completedDate', new Date()).save();
    },

    uncompleteTodo: function (todo) {
      todo.set('completedDate', null).save();
    },

    createTodo: function (name, dueDate) {

      if (!dueDate) {
        dueDate = new Date();
      }

      if (typeof dueDate === 'string') {
        try {
          dueDate = moment(dueDate).toDate();
        } catch (e) {
          dueDate = null;
        }
      }

      if (!(dueDate instanceof Date)) {
        console.error('invalid date'); // TODO: add alerts to UI
        return;
      }

      var list = this.get('model');

      var todo = this.store.createRecord('todo', {
        list: list,
        name: name,
        createdDate: new Date(),
        dueDate: dueDate
      });

      todo.save().then(function () {
        list.get('todos').pushObject(todo);
        list.save();
      });
    }
  }
});

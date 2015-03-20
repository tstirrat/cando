import {
  moduleForComponent,
  test
} from 'ember-qunit';

import moment from 'moment';

moduleForComponent('remaining-days', {
  // specify the other units that are required for this test
  // needs: ['component:foo', 'helper:bar']
});

function diffDatesFrom(date) {
  return function () {
    return date;
  };
}

function addDays(date, days) {
  return moment(date).add(days, 'days').toDate();
}

var now = new Date();

test('it renders', function(assert) {
  assert.expect(2);

  // creates the component instance
  var component = this.subject();
  assert.equal(component._state, 'preRender');

  // renders the component to the page
  this.render();
  assert.equal(component._state, 'inDOM');
});

test('it shows 0 when less than 1 day remaining', function(assert) {
  assert.expect(1);

  // creates the component instance
  var component = this.subject({
    now: diffDatesFrom(now),
    dueDate: now + 12
  });

  assert.equal(component.get('remainingDays'), 0);
});

test('it shows 1 when exactly 1 day remaining', function(assert) {
  assert.expect(1);

  var component = this.subject({
    now: diffDatesFrom(now),
    dueDate: addDays(now, 1)
  });

  assert.equal(component.get('remainingDays'), 1);
});

test('it shows 12 when any partial time less than 13 days is remaining', function(assert) {
  assert.expect(1);

  var component = this.subject({
    now: diffDatesFrom(now),
    dueDate: moment(addDays(now, 12)).add(23, 'hours')
  });

  assert.equal(component.get('remainingDays'), 12);
});

test('it shows negative numbers when the due date has passed', function(assert) {
  assert.expect(1);

  var component = this.subject({
    now: diffDatesFrom(now),
    dueDate: addDays(now, -6)
  });

  assert.equal(component.get('remainingDays'), -6);
});

test('it has a `danger` warning level when 0 days are remaining', function(assert) {
  assert.expect(1);

  var component = this.subject({
    now: diffDatesFrom(now),
    dueDate: now
  });

  assert.equal(component.get('warningLevel'), 'danger');
});

test('it has a `danger` warning level when the due date has passed', function(assert) {
  assert.expect(1);

  var component = this.subject({
    now: diffDatesFrom(now),
    dueDate: moment(now).add(-3, 'days')
  });

  assert.equal(component.get('warningLevel'), 'danger');
});

test('it has a `danger` warning level when less than 1 day is remaining', function(assert) {
  assert.expect(1);

  var component = this.subject({
    now: diffDatesFrom(now),
    dueDate: addDays(now, 1)
  });

  assert.equal(component.get('warningLevel'), 'danger');
});

test('it has a `warning` warning level when less than 3 days are remaining', function(assert) {
  assert.expect(1);

  var component = this.subject({
    now: diffDatesFrom(now),
    dueDate: addDays(now, 2)
  });

  assert.equal(component.get('warningLevel'), 'warning');
});

test('it has no warning level when more than 3 days are remaining', function(assert) {
  assert.expect(1);

  var component = this.subject({
    now: diffDatesFrom(now),
    dueDate: addDays(now, 4)
  });

  assert.equal(component.get('warningLevel'), null);
});

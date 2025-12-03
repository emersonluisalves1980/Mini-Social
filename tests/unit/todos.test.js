// test/unit/todos.test.js
const { expect } = require('chai');
const { markCompleted, toggle } = require('../../src/todos');

describe('Todos module - unit', () => {
  it('markCompleted should set completed to true', () => {
    const todo = { id: 1, title: 'x', completed: false };
    const result = markCompleted(todo);
    expect(result.completed).to.be.true;
  });

  it('toggle should invert completed', () => {
    const todo = { id: 1, completed: false };
    const toggled = toggle(todo);
    expect(toggled.completed).to.be.true;
  });

  it('markCompleted should throw on invalid input', () => {
    expect(() => markCompleted(null)).to.throw();
  });
});

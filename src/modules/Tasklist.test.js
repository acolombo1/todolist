const Tasklist = require('./Tasklist.js');

const tasklist1 = new Tasklist();

describe('Add 1 item test', () => {
  test('Add one new item to the list', () => {
    document.body.innerHTML = '<div class="listcontainer">'
      + '<ul class="mainlist">'
      + '<li>Today\'s To Do</li>'
      + '<li class="addli"><div class="addmsg">Add to your list...</div></li>'
      + '<li><div class="divfinal">Clear all completed</div></li>'
      + '</ul>'
      + '</div>';
    const divfinal = document.querySelector('.divfinal');
    tasklist1.createli('description', false, 1, divfinal);
    const list = document.querySelector('.mainlist');
    expect(list.children).toHaveLength(4);
  });
});

describe('Delete 1 item test', () => {
  test('Delete one existing item from the list', () => {
    document.body.innerHTML = '<div class="listcontainer">'
      + '<ul class="mainlist">'
      + '<li>Today\'s To Do</li>'
      + '<li class="addli"><div class="addmsg">Add to your list...</div></li>'
      + '<li id="li0"><input type="checkbox"><textarea class="description tachado" rows="1" style="height: 15px;">Go to the Grocer\'s</textarea></li>'
      + '<li><div class="divfinal">Clear all completed</div></li>'
      + '</ul>'
      + '</div>';
    tasklist1.deleteitem();
    const list = document.querySelector('.mainlist');
    expect(list.children).toHaveLength(3);
  });
});
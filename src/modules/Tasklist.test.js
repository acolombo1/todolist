import Tasklist from './Tasklist.js';

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

  test('Add another new item to the list', () => {
    document.body.innerHTML = '<div class="listcontainer">'
      + '<ul class="mainlist">'
      + '<li>Today\'s To Do</li>'
      + '<li class="addli"><div class="addmsg">Add to your list...</div></li>'
      + '<li id="li0"><input type="checkbox"><textarea class="description tachado" rows="1" style="height: 15px;">Go to the Grocer\'s</textarea></li>'
      + '<li><div class="divfinal">Clear all completed</div></li>'
      + '</ul>'
      + '</div>';
    const divfinal = document.querySelector('.divfinal');
    tasklist1.createli('description', false, 1, divfinal);
    const list = document.querySelector('.mainlist');
    expect(list.children).toHaveLength(5);
  });
});

describe('Testing event mockup', () => {
  test('Deleted 1 item from 2 in mainlist', () => {
    tasklist1.tasks = [{ description: 'sth', completed: false, index: 1 }, { description: 'any', completed: false, index: 2 }];
    document.body.innerHTML = '<div class="listcontainer">'
      + '<ul class="mainlist">'
      + '<li>Today\'s To Do</li>'
      + '<li class="addli"><div class="addmsg">Add to your list...</div></li>'
      + '<li id="li0"><input type="checkbox"><textarea class="description tachado" rows="1" style="height: 15px;">Go to the Grocer\'s</textarea></li>'
      + '<li id="li1"><input type="checkbox"><textarea class="description tachado" rows="1" style="height: 15px;">Go to the Grocer\'s</textarea></li>'
      + '<li><div class="divfinal">Clear all completed</div></li>'
      + '</ul>'
      + '</div>';
    document.querySelector('textarea').focus();
    setTimeout(() => {
      document.querySelector('.recyclebin').mousedown();
      const list = document.querySelector('.mainlist');
      expect(list.children).toHaveLength(4);
    }, 1000);
  });
  test('Deleted only item from mainlist', () => {
    tasklist1.tasks = [{ description: 'sth', completed: false, index: 1 }];
    document.body.innerHTML = '<div class="listcontainer">'
      + '<ul class="mainlist">'
      + '<li>Today\'s To Do</li>'
      + '<li class="addli"><div class="addmsg">Add to your list...</div></li>'
      + '<li id="li0"><input type="checkbox"><textarea class="description tachado" rows="1" style="height: 15px;">Go to the Grocer\'s</textarea></li>'
      + '<li><div class="divfinal">Clear all completed</div></li>'
      + '</ul>'
      + '</div>';
    document.querySelector('textarea').focus();
    setTimeout(() => {
      document.querySelector('.recyclebin').mousedown();
      const list = document.querySelector('.mainlist');
      expect(list.children).toHaveLength(3);
    }, 1000);
  });
});

import Tasklist from './Tasklist.js';

const tasklist2 = new Tasklist();

describe('test input text', () =>{
  test('Updates input text', () => {
    tasklist2.tasks = [{ description: 'sth', completed: true, index: 1 }, { description: 'any', completed: false, index: 2 }];
    document.body.innerHTML = '<div class="listcontainer">'
      + '<ul class="mainlist">'
      + '<li>Today\'s To Do</li>'
      + '<li class="addli"><div class="addmsg">Add to your list...</div></li>'
      + '<li id="li0"><input type="checkbox"><textarea class="description tachado" rows="1" style="height: 15px;">Go to the Grocer\'s</textarea></li>'
      + '<li id="li1"><input type="checkbox"><textarea class="description" rows="1" style="height: 15px;">Go to the Grocer\'s</textarea></li>'
      + '<li><div class="divfinal">Clear all completed</div></li>'
      + '</ul>'
      + '</div>';
    const divfinal = document.querySelector('.divfinal');
    tasklist2.createli('sth more', false, 2, divfinal);
    tasklist2.tasks = [{ description: 'sth', completed: true, index: 1 }, { description: 'any', completed: false, index: 2 }, { description: 'sth more', completed: false, index: 3 }];
    const list = document.querySelector('.mainlist');
    expect(list.children).toHaveLength(6);
    const input = document.querySelectorAll('textarea')[2];
    input.focus();
    input.dispatchEvent(new KeyboardEvent('keypress', { key: 'abcd' }));
    input.dispatchEvent(new KeyboardEvent('keypress', { key: 'Enter' }));
    input.value = 'abcd';
    input.dispatchEvent(new InputEvent('change'));
    expect(input.value).toBe('abcd');
    expect(tasklist2.tasks[2].description).toBe('abcd');
  });
});
describe('test change checked', () =>{
  test('test change check 1', () => {
    tasklist2.tasks = [{ description: 'sth', completed: true, index: 1 }, { description: 'any', completed: false, index: 2 }];
    document.body.innerHTML = '<div class="listcontainer">'
      + '<ul class="mainlist">'
      + '<li>Today\'s To Do</li>'
      + '<li class="addli"><div class="addmsg">Add to your list...</div></li>'
      + '<li id="li0"><input type="checkbox"><textarea class="description tachado" rows="1" style="height: 15px;">Go to the Grocer\'s</textarea></li>'
      + '<li id="li1"><input type="checkbox"><textarea class="description" rows="1" style="height: 15px;">Go to the Grocer\'s</textarea></li>'
      + '<li><div class="divfinal">Clear all completed</div></li>'
      + '</ul>'
      + '</div>';
    const divfinal = document.querySelector('.divfinal');
    tasklist2.createli('sth more', false, 2, divfinal);
    tasklist2.tasks = [{ description: 'sth', completed: true, index: 1 }, { description: 'any', completed: false, index: 2 }, { description: 'sth more', completed: false, index: 3 }];
    const list = document.querySelector('.mainlist');

    expect(tasklist2.tasks[2].completed).toBeFalsy();

    const checkbox = document.querySelectorAll('input')[2];
    checkbox.checked = true;
    checkbox.dispatchEvent(new InputEvent('change'));
    expect(tasklist2.tasks[2].completed).toBeTruthy();
  });
});

describe('test clearcompleted', () =>{
  test('test clearcompleted 1', () => {
    tasklist2.tasks = [{ description: 'sth', completed: true, index: 1 }, { description: 'any', completed: false, index: 2 }];
    document.body.innerHTML = '<div class="listcontainer">'
      + '<ul class="mainlist">'
      + '<li>Today\'s To Do</li>'
      + '<li class="addli"><div class="addmsg">Add to your list...</div></li>'
      + '<li id="li0"><input type="checkbox"><textarea class="description tachado" rows="1" style="height: 15px;">Go to the Grocer\'s</textarea></li>'
      + '<li id="li1"><input type="checkbox"><textarea class="description" rows="1" style="height: 15px;">Go to the Grocer\'s</textarea></li>'
      + '<li><div class="divfinal">Clear all completed</div></li>'
      + '</ul>'
      + '</div>';
    const divfinal = document.querySelector('.divfinal');
    tasklist2.createli('sth more', false, 2, divfinal);
    tasklist2.tasks = [{ description: 'sth', completed: true, index: 1 }, { description: 'any', completed: false, index: 2 }, { description: 'sth more', completed: false, index: 3 }];
    const list = document.querySelector('.mainlist');

    expect(list.children).toHaveLength(6);

    tasklist2.clearlist();
    tasklist2.renderTasks();
    tasklist2.clearcompleted();
    expect(list.children).toHaveLength(5);
  });
});
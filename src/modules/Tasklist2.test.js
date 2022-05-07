import Tasklist from './Tasklist.js';

const htmlinner = '<div class="listcontainer">'
+ '<ul class="mainlist">'
+ '<li>Today\'s To Do</li>'
+ '<li class="addli"><div class="addmsg">Add to your list...</div></li>'
+ '<li id="li0"><input type="checkbox"><textarea class="description tachado" rows="1" style="height: 15px;">Go to the Grocer\'s</textarea></li>'
+ '<li id="li1"><input type="checkbox"><textarea class="description" rows="1" style="height: 15px;">Go to the Grocer\'s</textarea></li>'
+ '<li><div class="divfinal">Clear all completed</div></li>'
+ '</ul>'
+ '</div>';
const tasklist2 = new Tasklist();

describe('test input text', () => {
  test('Updates input text', () => {
    document.body.innerHTML = htmlinner;
    const divfinal = document.querySelector('.divfinal');
    tasklist2.createli('sth more', false, 2, divfinal);
    tasklist2.tasks = [{ description: 'sth', completed: true, index: 1 }, { description: 'any', completed: false, index: 2 }, { description: 'sth more', completed: false, index: 3 }];
    const list = document.querySelector('.mainlist');
    expect(list.children).toHaveLength(6);
    const input = document.querySelectorAll('textarea')[2];
    input.value = 'abcd';
    input.dispatchEvent(new InputEvent('change'));
    expect(input.value).toBe('abcd');
    expect(tasklist2.tasks[2].description).toBe('abcd');
  });
});

describe('test change checked', () => {
  test('test change F to T', () => {
    document.body.innerHTML = htmlinner;
    const divfinal = document.querySelector('.divfinal');
    tasklist2.createli('sth more', false, 2, divfinal);
    tasklist2.tasks = [{ description: 'sth', completed: true, index: 1 }, { description: 'any', completed: false, index: 2 }, { description: 'sth more', completed: false, index: 3 }];

    expect(tasklist2.tasks[2].completed).toBeFalsy();

    const checkbox = document.querySelectorAll('input')[2];
    checkbox.checked = true;
    checkbox.dispatchEvent(new InputEvent('change'));
    expect(tasklist2.tasks[2].completed).toBeTruthy();
  });

  test('test change T to F', () => {
    document.body.innerHTML = htmlinner;
    const divfinal = document.querySelector('.divfinal');
    tasklist2.createli('sth more', true, 2, divfinal);
    tasklist2.tasks = [{ description: 'sth', completed: true, index: 1 }, { description: 'any', completed: false, index: 2 }, { description: 'sth more', completed: true, index: 3 }];

    expect(tasklist2.tasks[2].completed).toBeTruthy();

    const checkbox = document.querySelectorAll('input')[2];
    checkbox.checked = false;
    checkbox.dispatchEvent(new InputEvent('change'));
    expect(tasklist2.tasks[2].completed).toBeFalsy();
  });
});

describe('test clearcompleted', () => {
  test('test clearcompleted 1', () => {
    document.body.innerHTML = htmlinner;
    const divfinal = document.querySelector('.divfinal');
    tasklist2.createli('sth more', false, 2, divfinal);
    tasklist2.tasks = [{ description: 'sth', completed: true, index: 1 }, { description: 'any', completed: false, index: 2 }, { description: 'sth more', completed: false, index: 3 }];
    const list = document.querySelector('.mainlist');

    expect(list.children).toHaveLength(6);

    tasklist2.clearcompleted();
    expect(list.children).toHaveLength(5);
  });

  test('test clearcompleted more than 1', () => {
    document.body.innerHTML = htmlinner;
    const divfinal = document.querySelector('.divfinal');
    tasklist2.createli('sth more', true, 2, divfinal);
    tasklist2.tasks = [{ description: 'sth', completed: true, index: 1 }, { description: 'any', completed: false, index: 2 }, { description: 'sth more', completed: true, index: 3 }];
    const list = document.querySelector('.mainlist');

    expect(list.children).toHaveLength(6);

    tasklist2.clearcompleted();
    expect(list.children).toHaveLength(4);
  });

  test('test clearcompleted works without items', () => {
    document.body.innerHTML = '<div class="listcontainer">'
      + '<ul class="mainlist">'
      + '<li>Today\'s To Do</li>'
      + '<li class="addli"><div class="addmsg">Add to your list...</div></li>'
      + '<li><div class="divfinal">Clear all completed</div></li>'
      + '</ul>'
      + '</div>';
    tasklist2.tasks = [];
    const list = document.querySelector('.mainlist');
    expect(list.children).toHaveLength(3);
    tasklist2.clearcompleted();
    expect(list.children).toHaveLength(3);
  });
});

const { internalIP } = require('webpack-dev-server');
const Tasklist = require('./Tasklist.js');

const tasklist1 = new Tasklist();

deleteitem = (item) => {
  const thisindex = parseInt(item.parentNode.id.substring(2), 10);
  console.log(tasklist1.tasks.length);
  tasklist1.tasks.splice(thisindex, 1);
  console.log(tasklist1.tasks.length);
  for (let i = thisindex; i < tasklist1.tasks.length; i += 1) {
    tasklist1.tasks[i].index -= 1;
  }
  tasklist1.saveTasksToLocalStorage();
  console.log(tasklist1.tasks.length);
  tasklist1.clearlist();
  tasklist1.renderTasks();
};


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
  })
});

describe('Testing event mockup', () => {
  test('Deleted 1 item from mainlist', () => {
    document.body.innerHTML = '<div class="listcontainer">'
      + '<ul class="mainlist">'
      + '<li>Today\'s To Do</li>'
      + '<li class="addli"><div class="addmsg">Add to your list...</div></li>'
      + '<li id="li0"><input type="checkbox"><textarea class="description tachado" rows="1" style="height: 15px;">Go to the Grocer\'s</textarea></li>'
      + '<li id="li1"><input type="checkbox"><textarea class="description tachado" rows="1" style="height: 15px;">Go to the Grocer\'s</textarea></li>'
      + '<li><div class="divfinal">Clear all completed</div></li>'
      + '</ul>'
      + '</div>';
    const textArea = document.querySelector('.description');
    deleteitem(textArea);
    const list = document.querySelector('.mainlist');
    expect(list.children).toHaveLength(4);
  });
});

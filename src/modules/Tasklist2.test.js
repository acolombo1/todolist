import Tasklist from './Tasklist.js';

const tasklist2 = new Tasklist();

test('Updates input text', () => {
  tasklist2.tasks = [{ description: 'sth', completed: false, index: 1 }, { description: 'any', completed: false, index: 2 }];
  document.body.innerHTML = '<div class="listcontainer">'
    + '<ul class="mainlist">'
    + '<li>Today\'s To Do</li>'
    + '<li class="addli"><div class="addmsg">Add to your list...</div></li>'
    + '<li id="li0"><input type="checkbox"><textarea class="description tachado" rows="1" style="height: 15px;">Go to the Grocer\'s</textarea></li>'
    + '<li id="li1"><input type="checkbox"><textarea class="description tachado" rows="1" style="height: 15px;">Go to the Grocer\'s</textarea></li>'
    + '<li><div class="divfinal">Clear all completed</div></li>'
    + '</ul>'
    + '</div>';
  const input = document.querySelector('textarea');
  // document.querySelector('textarea').focus();
  input.click();

  // setTimeout(() => {
  window.dispatchEvent(new KeyboardEvent('keydown', {
    'key': 'a',
  }));
  window.dispatchEvent(new KeyboardEvent('keydown', {
    'key': 'Enter',
  }));
  expect(input.value).toBe('a');
  // }, 1000);
  console.log(input.value)
});

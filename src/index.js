import './style.css';

const tasks = [{
  description: 'Take a nap',
  completed: true,
  index: 0,
}, {
  description: 'Finish this project',
  completed: false,
  index: 1,
}, {
  description: 'Wash the dishes',
  completed: false,
  index: 2,
}];

const mainlist = document.querySelector('.mainlist');
for (let i = 0; i < tasks.length; i += 1) {
  const { description, completed } = tasks[i];

  const checkbox = document.createElement('input');
  checkbox.setAttribute('type', 'checkbox');
  if (completed) { checkbox.checked = true; }
  const li = document.createElement('li');
  const div = document.createElement('div');
  div.innerHTML = description;
  div.classList.add('description');
  if (completed) { div.classList.add('tachado'); }
  li.appendChild(checkbox);
  li.appendChild(div);
  mainlist.appendChild(li);
}
const divfinal = document.createElement('div');
divfinal.innerHTML = 'Clear All Completed';
divfinal.classList.add('divfinal');
const li = document.createElement('li');
li.appendChild(divfinal);
mainlist.appendChild(li);

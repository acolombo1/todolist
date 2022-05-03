import './style.css';
import Tasklist from './modules/Tasklist.js';

window.addEventListener('load', () => {
  const tasklist1 = new Tasklist();
  tasklist1.retrieveTasksFromLocalStorage();
  tasklist1.renderTasks();
  const addItemli = document.querySelector('.addli');
  addItemli.addEventListener('click', tasklist1.addItemliClick);
});

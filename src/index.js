import './style.css';
import Tasklist from './modules/Tasklist.js';

window.addEventListener('load', () => {
  const tasklist1 = new Tasklist();
  tasklist1.retrievedata();

  tasklist1.renderdata();

  const addli = document.querySelector('.addli');
  addli.addEventListener('click', tasklist1.addliclick);
});

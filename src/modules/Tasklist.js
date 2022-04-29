import recyclebinimg from '../img/recyclebin.svg';
import returnimg from '../img/return.svg';

export default class Tasklist {
  constructor() {
    this.clickedonenter = false;
    this.tasks = [];
  }

  retrievedata = () => {
    if (localStorage.getItem('todolist') != null) {
      this.tasks = JSON.parse(localStorage.getItem('todolist'));
    }
  };

  savedata = () => {
    localStorage.setItem('todolist', JSON.stringify(this.tasks));
  };

  #checkchange = (event) => {
    const mytext = event.target.nextSibling;
    const thisid = event.target.parentNode.id.substring(2);
    if (event.target.checked) {
      if (!mytext.classList.contains('tachado')) mytext.classList.add('tachado');
      this.tasks[thisid].completed = true;
    } else {
      if (mytext.classList.contains('tachado')) mytext.classList.remove('tachado');
      this.tasks[thisid].completed = false;
    }
    this.savedata();
  };

  #textinput = (event) => {
    event.target.style.height = '15px';
    event.target.style.height = `${event.target.scrollHeight}px`;
  };

  #textinput2 = (textarea) => {
    textarea.style.height = '15px';
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  #checkenter = (event) => {
    if (event.key === 'Enter') {
      // Cancel the default action
      event.preventDefault();
      event.target.blur();
    }
  };

  #newitem = () => {
    const input = document.querySelector('.inplaceedit');
    const mainlist = document.querySelector('.mainlist');

    const i = this.tasks.length;
    this.tasks[i] = { description: input.value, completed: false, index: i + 1 };

    this.savedata();

    const checkbox = document.createElement('input');
    checkbox.setAttribute('type', 'checkbox');
    const li = document.createElement('li');
    li.id = `li${i}`;
    const textarea = document.createElement('textarea');
    textarea.innerHTML = input.value;
    textarea.classList.add('description');
    textarea.rows = 1;
    li.appendChild(checkbox);
    li.appendChild(textarea);
    const divfinal = document.querySelector('.divfinal');
    mainlist.insertBefore(li, divfinal.parentNode);
    checkbox.addEventListener('change', this.#checkchange);
    this.#textinput2(textarea);
    textarea.addEventListener('input', this.#textinput, false);
    textarea.addEventListener('keypress', this.#checkenter);
    textarea.addEventListener('change', this.#textchanged);
    textarea.addEventListener('focus', this.#focused);

    input.remove();
    document.querySelector('.enterimg').remove();
    document.querySelector('.addmsg').innerHTML = 'Add to your list...';
  };

  #inputkey = (event) => {
    if (event.key === 'Enter') {
      // Cancel the default action, if needed
      event.preventDefault();
      if (event.target.value !== '') { this.#newitem(); }
    }
  };

  #inputchange = (event) => {
    const addmsg = document.querySelector('.addmsg');
    const addli = document.querySelector('.addli');
    let enterimg = document.querySelector('.enterimg');
    if (event.target.value === '') {
      addmsg.innerHTML = 'Add to your list...';
      if (enterimg !== null) {
        addli.removeChild(enterimg);
      }
    } else {
      addmsg.innerHTML = '&nbsp;';
      if (enterimg === null) {
        enterimg = document.createElement('img');
        enterimg.classList.add('enterimg');
        enterimg.src = returnimg;
        enterimg.height = '15';
        enterimg.width = '15';
        addli.appendChild(enterimg);
        enterimg.addEventListener('click', () => {
          this.clickedonenter = true;
          this.#newitem();
        });
      }
    }
  };

  addliclick = () => {
    if (this.clickedonenter) {
      this.clickedonenter = false;
    } else {
      const addli = document.querySelector('.addli');
      if (addli.querySelector('input') === null) {
        const input = document.createElement('input');
        input.classList.add('inplaceedit');
        addli.appendChild(input);
        input.focus();
        input.addEventListener('input', this.#inputchange);
        input.addEventListener('keypress', this.#inputkey);
      }
    }
  };

  #clearlist = () => {
    const mainlist = document.querySelector('.mainlist');
    const toremove = mainlist.children.length - 3;
    for (let i = 0; i < toremove; i += 1) {
      document.getElementById(`li${i}`).remove();
    }
    mainlist.lastChild.remove();
  };

  renderdata = () => {
    const mainlist = document.querySelector('.mainlist');
    for (let i = 0; i < this.tasks.length; i += 1) {
      const { description, completed } = this.tasks[i];
      const checkbox = document.createElement('input');
      checkbox.setAttribute('type', 'checkbox');
      if (completed) {
        checkbox.checked = true;
      } else {
        checkbox.checked = false;
      }
      const li = document.createElement('li');
      li.id = `li${i}`;
      const textarea = document.createElement('textarea');
      textarea.innerHTML = description;
      textarea.classList.add('description');
      textarea.rows = 1;
      if (completed) { textarea.classList.add('tachado'); }
      li.appendChild(checkbox);
      li.appendChild(textarea);
      mainlist.appendChild(li);
      checkbox.addEventListener('change', this.#checkchange);
      this.#textinput2(textarea);
      textarea.addEventListener('input', this.#textinput, false);
      textarea.addEventListener('keypress', this.#checkenter);
      textarea.addEventListener('change', this.#textchanged);
      textarea.addEventListener('focus', this.#focused);
    }
    const divfinal = document.createElement('div');
    divfinal.innerHTML = 'Clear All Completed';
    divfinal.classList.add('divfinal');
    const li = document.createElement('li');
    li.appendChild(divfinal);
    mainlist.appendChild(li);
    divfinal.addEventListener('click', this.#clearcompleted);
  };

  #clearcompleted = () => {
    const result = this.tasks.filter((task) => task.completed === false);
    this.tasks = [...result];
    for (let i = 0; i < this.tasks.length; i += 1) {
      this.tasks[i].index = i + 1;
    }
    this.savedata();
    this.#clearlist();
    this.renderdata();
  };

  #textchanged = (event) => {
    const thisid = parseInt(event.target.parentNode.id.substring(2), 10);
    this.tasks[thisid].description = event.target.value;
    if (event.target.value === '') {
      this.tasks.splice(thisid, 1);
      for (let i = thisid; i < this.tasks.length; i += 1) {
        this.tasks[i].index -= 1;
      }
    }
    this.savedata();
    this.#clearlist();
    this.renderdata();
  };

  #deleteitem = (event) => {
    const thisid = parseInt(event.target.parentNode.id.substring(2), 10);
    this.tasks.splice(thisid, 1);
    for (let i = thisid; i < this.tasks.length; i += 1) {
      this.tasks[i].index -= 1;
    }
    this.savedata();
    this.#clearlist();
    this.renderdata();
  };

  #blurred = (event) => {
    const parentli = event.target.parentNode;
    const recyclebin = parentli.querySelector('.recyclebin');
    if (recyclebin !== null) recyclebin.remove();
    if (parentli.classList.contains('colorbg')) parentli.classList.remove('colorbg');
    if (event.target.classList.contains('colorbg')) event.target.classList.remove('colorbg');
  };

  #focused = (event) => {
    const parentli = event.target.parentNode;
    if (parentli.querySelector('.recyclebin') === null) {
      const recyclebin = document.createElement('img');
      recyclebin.classList.add('recyclebin');
      recyclebin.src = recyclebinimg;
      recyclebin.height = '15';
      recyclebin.width = '15';
      parentli.appendChild(recyclebin);
      recyclebin.addEventListener('mousedown', this.#deleteitem);
      parentli.querySelector('textarea').addEventListener('blur', this.#blurred);
    }
    if (!parentli.classList.contains('colorbg')) parentli.classList.add('colorbg');
    if (!event.target.classList.contains('colorbg')) event.target.classList.add('colorbg');
  };
}

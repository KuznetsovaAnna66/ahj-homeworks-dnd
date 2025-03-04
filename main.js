/******/ (() => { // webpackBootstrap
/******/ 	"use strict";

;// ./src/components/card/Card.js


/* <ul class="cards">
<li class="cards__item">
<span class="cards__text"></span>
<span class="remove-btn hidden"></span>
</li>
</ul> */

class Card {
  constructor(message) {
    this.element = document.createElement("li");
    this.element.classList.add("cards__item");
    this.text = document.createElement("span");
    this.text.classList.add("cards__text");
    this.text.textContent = message;
    this.removeButton = document.createElement("span");
    this.removeButton.classList.add("remove-btn", "hidden");
    this.element.append(this.text, this.removeButton);
    this.onMouseenterHandler = this.onMouseenter.bind(this);
    this.onClickRemoveHandler = this.clickOnRemoveButton.bind(this);
    this.onMouseleaveHandler = this.onMouseleave.bind(this);
    this.addEventListeners();
  }
  addCard(parentSelector) {
    const parentElement = document.querySelector(parentSelector);
    parentElement.append(this.element);
  }
  addEventListeners() {
    this.element.addEventListener("mouseenter", this.onMouseenterHandler);
    this.element.addEventListener("click", this.onClickRemoveHandler);
    this.element.addEventListener("mouseleave", this.onMouseleaveHandler);
  }
  removeListeners() {
    this.element.removeEventListener("mouseenter", this.onMouseenterHandler);
    this.element.removeEventListener("click", this.onClickRemoveHandler);
    this.element.removeEventListener("mouseleave", this.onMouseleaveHandler);
  }
  onMouseenter() {
    this.removeButton.classList.remove("hidden");
  }
  onMouseleave() {
    this.removeButton.classList.add("hidden");
  }
  clickOnRemoveButton() {
    this.removeListeners();
    this.element.remove();
  }
}
;// ./src/components/form/Form.js


/* <form class="form hidden">
            <label class="visually-hidden">Enter your task</label>
            <textarea class="form__textarea" id="add-card" placeholder="Enter your task here..."></textarea>
          </form> */

class Form {
  constructor() {
    this.element = document.createElement("form");
    this.element.classList.add("form", "hidden");
    this.label = document.createElement("label");
    this.label.classList.add("visually-hidden");
    this.label.for = "add-card";
    this.label.textContent = "Enter a title for this card";
    this.textarea = document.createElement("textarea");
    this.textarea.classList.add("form__textarea");
    this.textarea.id = "add-card";
    this.textarea.placeholder = "Enter your task here...";
    this.tooltip = document.createElement("div");
    this.tooltip.classList.add("tooltip", "hidden");
    this.footer = document.createElement("div");
    this.footer.classList.add("form__footer");
    this.buttons = document.createElement("div");
    this.buttons.classList.add("form__buttons");
    this.addButton = document.createElement("button");
    this.addButton.classList.add("form__add");
    this.addButton.type = "submit";
    this.addButton.textContent = "Add Card";
    this.closeButton = document.createElement("div");
    this.closeButton.classList.add("form__close");
    this.buttons.append(this.addButton, this.closeButton);
    this.footer.append(this.buttons);
    this.element.append(this.label, this.textarea, this.tooltip, this.footer);
    this.addEventListeners();
  }
  addEventListeners() {
    this.closeButton.addEventListener("click", this.clickOnCloseForm.bind(this));
    this.element.addEventListener("submit", this.clickOnSubmitForm.bind(this));
    this.textarea.addEventListener("input", this.onInput.bind(this));
    this.textarea.addEventListener("focus", () => {
      console.log("Textarea focused");
    });
  }
  render(previousSelector) {
    const previousElement = document.querySelector(previousSelector);
    previousElement.after(this.element);
  }
  hideTooltip() {
    this.tooltip.classList.add("hidden");
  }
  showTooltip() {
    this.tooltip.classList.remove("hidden");
  }
  showForm() {
    this.element.classList.remove("hidden");
  }
  closeForm() {
    this.textarea.value = "";
    this.element.classList.add("hidden");
    const button = this.element.nextElementSibling;
    button.classList.remove("hidden");
    this.hideTooltip();
  }
  clickOnSubmitForm(event) {
    event.preventDefault();
    const message = this.textarea.value;
    if (!message) {
      this.tooltip.textContent = "Введите текст или закройте окно";
      this.showTooltip();
      return;
    }
    const cardList = [...document.querySelectorAll(".cards__item")];
    const beforeAddedCard = cardList.some(card => card.textContent === message);
    if (beforeAddedCard) {
      this.tooltip.textContent = "Такая задача уже есть!";
      this.showTooltip();
    } else {
      const card = new Card(message);
      const column = this.element.closest(".column");
      const attribute = column.dataset.title;
      card.addCard(`[data-title="${attribute}"] .cards`);
      this.closeForm();
    }
  }
  clickOnCloseForm() {
    this.closeForm();
  }
  onInput() {
    this.hideTooltip();
  }
}
;// ./src/components/column/Column.js




/* <div class="column" data-title="todo">
          <header class="header">
            <h3 class="header__title"></h3>
          </header>
          <ul class="cards">
            <li class="cards__item">
              <span class="cards__text"></span>
              <span class="remove-btn hidden"></span>
            </li>
          </ul>
          <form class="form hidden">
            <label class="visually-hidden">Enter your task</label>
            <textarea class="form__textarea" id="add-card" placeholder="Enter your task here..."></textarea>
          </form>
          <div class="form__buttons>">
            <button class="form__add" type="submit">Add a task</button>
            <div class="form__close"></div>
          </div>
        </div> */

class Column {
  constructor(title, dataAttribute) {
    this.element = document.createElement("div");
    this.element.classList.add("column");
    this.element.dataset.title = dataAttribute;
    this.header = document.createElement("header");
    this.header.classList.add("header");
    this.title = document.createElement("h3");
    this.header.classList.add("header__title");
    this.title.textContent = title;
    this.header.append(this.title);
    this.list = document.createElement("ul");
    this.list.classList.add("cards");
    this.button = document.createElement("button");
    this.button.classList.add("column__button");
    this.button.type = "button";
    this.button.textContent = "+ Add another task";
    this.element.append(this.header, this.header, this.list, this.button);
    this.addEventListeners();
  }
  render(parentSelector, data) {
    this.parentElement = document.querySelector(parentSelector);
    this.parentElement.append(this.element);
    const attribute = this.element.dataset.title;
    const messages = data[attribute];
    for (let i = 0; i < messages.length; i += 1) {
      const card = new Card(messages[i]);
      card.addCard(`[data-title="${attribute}"] .cards`);
    }
    this.form = new Form();
    this.form.render(`[data-title="${attribute}"] .cards`);
  }
  clickOnForm() {
    this.button.classList.add("hidden");
    this.form.showForm();
  }
  addEventListeners() {
    this.button.addEventListener("click", this.clickOnForm.bind(this));
  }
}
;// ./src/components/container/Container.js

class Container {
  constructor() {
    this.element = document.createElement("div");
    this.element.classList.add("container");
  }
}
;// ./src/js/cardsBase.js
const cardsBase = {
  todo: ["Назначить встречу с командой для обсуждения спринта", "Составить план работы на следующую неделю", "Подготовить отчет о прогрессе проекта для клиента", "Обсудить приоритеты задач с руководством"],
  inprogress: ["Координировать работу подразделений над общим проектом", "Мониторить прогресс выполнения задач", "Решать возникающие проблемы в коммуникации", "Утвердить бюджет для следующего этапа"],
  done: ["Завершить планирование текущего спринта", "Провести успешную встречу с клиентом", "Документировать решения, принятые на последнем совещании", "Успешно завершить обучение новой команды"]
};
/* harmony default export */ const js_cardsBase = (cardsBase);
;// ./src/js/Storage.js

class Storage {
  constructor() {
    // localStorage.clear(); // чтобы снова отрисовать все сообщения из заготовки
    this.formData = {};
    this.getStorage();
    window.addEventListener("beforeunload", this.setStorage.bind(this)); // перед закрытием страницы
  }

  // чтение данных из localStorage:
  getStorage() {
    if (!localStorage.getItem("formdata")) {
      this.formData = structuredClone(js_cardsBase);
    } else {
      const json = localStorage.getItem("formdata");
      try {
        this.formData = JSON.parse(json) || {};
      } catch (error) {
        this.formData = {};
      }
    }
  }

  // запись данных в localStorage:
  setStorage() {
    const columns = document.querySelectorAll(".column");
    columns.forEach(column => {
      const key = column.dataset.title;
      const value = [];
      const cardList = column.querySelectorAll(".cards__item");
      cardList.forEach(card => {
        value.push(card.textContent);
      });
      this.formData[key] = value;
    });
    localStorage.setItem("formdata", JSON.stringify(this.formData));
  }
}
;// ./src/js/DragandDrop.js
class DragandDrop {
  constructor() {
    this.grabbedCard = null;
    this.clone = null;
    this.mouseX = null;
    this.mouseY = null;
    this.onMouseDownHandler = this.onMouseDown.bind(this);
    this.onMouseMoveHandler = this.onMouseMove.bind(this);
    this.onMouseUpHandler = this.onMouseUp.bind(this);
    document.addEventListener("mousedown", this.onMouseDownHandler);
  }
  cloneCard() {
    this.clone = document.createElement("li");
    this.clone.classList.add("cards__item", "cards__item_cloned");
    this.clone.style.width = `${this.grabbedCard.clientWidth}px`;
    this.clone.style.height = `${this.grabbedCard.clientHeight}px`;
  }
  onMouseDown(event) {
    this.grabbedCard = event.target.closest(".cards__item");
    if (!this.grabbedCard || event.target.classList.contains("remove-btn")) {
      return;
    }
    event.preventDefault();
    const width = this.grabbedCard.clientWidth;
    const height = this.grabbedCard.clientHeight;
    const {
      top,
      left
    } = this.grabbedCard.getBoundingClientRect();
    this.mouseX = event.clientX - left;
    this.mouseY = event.clientY - top;
    this.cloneCard();
    this.grabbedCard.before(this.clone);
    this.grabbedCard.classList.add("cards__item_dragged");
    this.grabbedCard.style.width = `${width}px`;
    this.grabbedCard.style.height = `${height}px`;
    this.grabbedCard.style.top = `${top}px`;
    this.grabbedCard.style.left = `${left}px`;
    document.addEventListener("mousemove", this.onMouseMoveHandler);
    document.addEventListener("mouseup", this.onMouseUpHandler);
  }
  onMouseMove(event) {
    event.preventDefault();
    this.grabbedCard.style.top = `${event.pageY - this.mouseY}px`;
    this.grabbedCard.style.left = `${event.pageX - this.mouseX}px`;
    const belowElement = document.elementFromPoint(event.pageX, event.pageY);
    if (!belowElement) {
      return;
    }
    const currentColumn = belowElement.closest(".column");
    if (currentColumn) {
      const currentUL = currentColumn.querySelector(".cards");
      if (!currentUL.children.length) {
        currentUL.append(this.clone);
        return;
      }
      if (currentUL.children.length === 1) {
        currentUL.append(this.clone);
        return;
      }
    }
    const target = belowElement.closest(".cards__item");
    if (target) {
      const {
        top,
        bottom
      } = target.getBoundingClientRect();
      if (event.clientY > top && event.clientY < top + target.offsetHeight / 2) {
        target.before(this.clone);
      } else if (event.clientY < bottom && event.clientY > top + target.offsetHeight / 2) {
        target.after(this.clone);
      }
    }
  }
  onMouseUp() {
    this.clone.before(this.grabbedCard);
    this.clearController();
  }
  clearController() {
    this.grabbedCard.style.width = "100%";
    this.grabbedCard.style.height = "100%";
    this.grabbedCard.classList.remove("cards__item_dragged");
    this.clone.remove();
    this.clone = null;
    this.grabbedCard = null;
    this.mouseX = null;
    this.mouseY = null;
    document.removeEventListener("mousemove", this.onMouseMoveHandler);
    document.removeEventListener("mouseup", this.onMouseUpHandler);
  }
}
;// ./src/js/App.js




class App {
  constructor() {
    this.wrapper = document.querySelector(".wrapper");
    this.container = new Container();
    this.columnTodo = new Column("todo", "todo");
    this.columnProgress = new Column("in progress", "inprogress");
    this.columnDone = new Column("done", "done");
    this.dragAndDrop = new DragandDrop();
    this.storage = new Storage();
  }
  init() {
    this.render();
  }
  render() {
    this.wrapper.append(this.container.element);
    const data = this.storage.formData;
    this.columnTodo.render(".container", data);
    this.columnProgress.render(".container", data);
    this.columnDone.render(".container", data);
  }
}
;// ./src/index.js


document.addEventListener("DOMContentLoaded", () => {
  new App().init();
});
/******/ })()
;
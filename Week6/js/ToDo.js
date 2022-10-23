import { getToDo, saveToDo } from './ls.js';
import { getElement, setElement, createElement, addEvent } from './utilities.js';

class ToDo {
    constructor() {
        this.newToDo = null;
        this.key = "toDoList";
        this.toDoList = getToDo(this.key);
        this.filter = "all";
        this.filterMap = {
            all: () => true,
            active: (element) => !element.completed,
            completed: (element) => element.completed
        };
        this.taskLeft = this.countActiveTask();
        this.addToDo = this.addToDo.bind(this);
        this.removeToDo = this.removeToDo.bind(this);
        this.changeInput = this.changeInput.bind(this);
        this.listToDo = this.listToDo.bind(this);
    }

    addToDo() {
        if (this.newToDo) {
            const today = new Date();
            const newTask = {id: today.toString(), content: this.newToDo, completed: false};
            this.toDoList = this.toDoList ? [...this.toDoList, newTask] : [newTask];
            saveToDo(this.key, this.toDoList);
            this.renderToDo(newTask, "li");
            this.newToDo = '';
            getElement("new-task").value = '';
            this.countActiveTask();
        } else return;
    }

    renderEverything() {
        const filterKeys = Object.keys(this.filterMap);

        addEvent('add-todo', 'click', this.addToDo);
        addEvent('new-task', 'change', this.changeInput);

        for (const [key, value] of Object.entries(this.filterMap)) {
            addEvent(key, 'click', () => this.listToDo(value));
            addEvent(key, 'click', () => this.toggleFocus(filterKeys, key));
        }
        this.listToDo(this.filterMap.all);
        this.countActiveTask();
    }

    renderToDo(item, element) {
        const toDo = (
            `<form>
                <input type="checkbox" name="${item.id}" id="${item.id}" default>
                <label for="${item.id}">${item.content}</label>
            </form>
            <button id="button${item.id}">x</button>`
        );
        const toDoNode = createElement("todo-list", toDo, element);
        getElement("todo-list").appendChild(toDoNode);
        getElement(item.id).checked = item.completed;
        addEvent(`button${item.id}`, 'click', () => this.removeToDo(item, toDoNode));
        addEvent(item.id, 'change', () => this.toggleTaskCompleted(item));
    }

    renderToDoList(list, element) {
        list.forEach(item => {
            this.renderToDo(item, element)
        });
    }

    changeInput(event) {
        this.newToDo = event.target.value;
    }

    listToDo(value) {
        if (this.toDoList) {
            getElement("todo-list").textContent = '';
            const listToRender = this.filterToDo(value);
            this.renderToDoList(listToRender, "li");
        } else return;
    }

    toggleTaskCompleted(item) {
        this.toDoList = this.toDoList.map(element => {
            if (element.id === item.id) {
                return {...element, completed: !element.completed}
            }
            return element;
        });
        saveToDo(this.key, this.toDoList);
        this.countActiveTask();
    }

    removeToDo(item, node) {
        this.toDoList = this.toDoList.filter(element => 
            element.id !== item.id
        );
        saveToDo(this.key, this.toDoList);
        getElement("todo-list").removeChild(node);
        this.countActiveTask();
    }

    filterToDo(callback) {
        return this.toDoList.filter(callback);
    }

    toggleFocus(list, key) {
        this.filter = key;
        list.forEach( filter => {
            if (filter === this.filter){
                getElement(filter).setAttribute('aria-pressed', true);
            } else {
                getElement(filter).setAttribute('aria-pressed', false);
                console.log('false');
            }
            console.log(getElement(filter));
        });
    }

    countActiveTask() {
        let count = 0;
        if (this.toDoList) {
            this.toDoList.forEach((item) => {
                if(item.completed === false) {
                    count++;
                }
            });
        }
        this.taskLeft = count;
        setElement('task-left', `${this.taskLeft} ${this.taskLeft < 2 ? 'task' : 'tasks'}`);
    }
}

export default ToDo;
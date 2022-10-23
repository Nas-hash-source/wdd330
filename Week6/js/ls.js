
// save to the localStorage
function saveToDo(key, task) {
    localStorage.setItem(key, JSON.stringify(task));
}

// retrieve the toDoList from the localStorage
function getToDo(key) {
    return JSON.parse(localStorage.getItem(key));
}

export {saveToDo, getToDo};
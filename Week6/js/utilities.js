
function addEvent(id, eventName, callback) {
    document.getElementById(id).addEventListener(eventName, callback);
}

function getElement(id) {
    return document.getElementById(id);
}

function setElement(id, value) {
    getElement(id).textContent = value;
}

function createElement(id, value, element) {
    const userElement = document.createElement(element);
    userElement.innerHTML = value;
    return userElement;
}

export {createElement, getElement, setElement, addEvent};

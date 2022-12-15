function $(selector) {
    return document.querySelector(selector);
}

function $all(selector) {
    return document.querySelectorAll(selector);
}

function  addEvent(event, element, callback) {
    element.addEventListener(event, callback, false);
}

function capitalize(text) {
    return text[0].toUpperCase() + text.slice(1);
}

// helper
   
function toggleHighlight(listNode, targetElement) {
    const list = Array.from(listNode);
    list.forEach(node => {
        if (node === targetElement) {
            highlight(node);
        } else {
            node.classList.remove("active");
        }
    })
}

function highlight(targetElement) {
    targetElement.classList.add("active");
}


export {$, $all, addEvent, capitalize, toggleHighlight, highlight};
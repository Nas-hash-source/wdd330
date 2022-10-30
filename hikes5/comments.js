const newComment = {
    name: hikeName,
    date: new Date(),
    content: comment
}

export default class Comments{

    constructor(type) {
        this.type = type;
    }

    getAllCommments() {
        return localStorage.getItem(this.type);
    }

    showCommentList(hikeName) {
        if (this.getAllCommments()) {
            const parentElement = document.getElementById(hikeName);
            const childContentList = this.filterCommentsByName(hikeName);
            parentElement.appendChild(renderCommentList(childContentList));
        }
    }

    filterCommentsByName(hikeName) {
        if (this.getAllCommments()) {
            return this.getAllCommments().filter(comments => {
                comments.name === hikeName;
            })
        }
    }
}

// end of class Component, 
function renderCommentList(CommentList) {
    const listElement = document.createElement('ul');
    listElement.innerHTML = (`
        <div class="comment">
            <input type="text" placeholder="Your comment">
            <button>Submit</button>
        </div> 
    `)
    CommentList.forEach(comment => {
        let index = 1;
        renderOneCommentLight(comment, index);
        index++;
    });
}

function renderOneCommentLight(comment, index) { 
    const item = document.createElement('li');
    item.innerHTML = ` 
        <div>
            <h2>Comment N*^${index}</h2>
            <p>${comment.comment}</p>
            <p>${comment.date.toString()}</p>
        </div>
    `;
  return item;
}
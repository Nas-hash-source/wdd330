


export default class CommentView {
    rendercommentList(commentList, post) {
        return (`
                    <form class="post-comment-form">
                        <input 
                            type="text" 
                            placeholder="Enter your comment..." 
                            name="comment" 
                            id="comment-form-${post.id}" 
                            autocomplete="off"
                            autofocus="true"
                        >
                        <button id="comment-submit-${post.id}" class="comment-submit">Add</button>
                    </form>
                    <ul id="comment-list-${post.id}" class="comment-list">
                        ${!commentList ? "" : commentList.map(comment => {
                            return this.renderComment(comment);
                        })
                        .join("")}
                    </ul>
            `);
    }

    renderComment(comment) {
        return `<li class="comment-list-item">
                    <div class="comment-list-item-content">
                        <div class="fa fa-user"></div>
                        <p>${comment.body}</p>
                    </div>
                    <button id="remove-comment${comment.id}">x</button>
                </li>`;
    }

    createCommentToAppend(comment) {
        const commentElement = document.createElement("li");
        commentElement.classList.add("comment-list-item");
        commentElement.innerHTML = 
            `
            <div class="comment-list-item-content">
                <div class="fa fa-user"></div>
                <p>${comment.body}</p>
            </div>
            <button id="remove-comment${comment.id}">x</button>
            `;
        return commentElement;
    }
}

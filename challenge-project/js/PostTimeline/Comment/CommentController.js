import { $, $all, addEvent} from '../../utils.js';

import CommentView from './CommentView.js';
import CommentModel from './CommentModel.js';

export default class CommentController {

    constructor() {
        this.commentView = new CommentView();
        this.commentModel = new CommentModel();
    }

    showCommentList(post) {
        const postElement = document.createElement("div");
        postElement.classList.add("comment-list");
        const commentList = this.commentModel.getCommentListByPost(post);
        postElement.innerHTML = this.commentView.rendercommentList(commentList, post);
        document.getElementById(`${post.id}`).appendChild(postElement);
        this.addCommentSubmitListener(post);


        if(commentList)  commentList.forEach(comment => {
            this.addRemoveCommentListener(comment, post);
        });
    }

    handleSubmit(post) {
        const commentValue = $(`#comment-form-${post.id}`);
        const commentId = this.commentModel.getCommentListByPost(post);

        if (commentValue.value) {
            const newComment = {name: "user", body: commentValue.value, id: commentId ? commentId.length : 0};
            this.commentModel.addComment(newComment, post);
            this.appendOneComment(newComment, post);
            this.addRemoveCommentListener(newComment, post);
            commentValue.value = "";
        } else return;
    }

    appendOneComment(comment, post) {
        const commentElement = this.commentView.createCommentToAppend(comment);
        $(`#comment-list-${post.id}`)
          .appendChild(commentElement);
        this.showCommentLength(post);
    }


    addCommentSubmitListener(post) {
        addEvent("click", $(`#comment-submit-${post.id}`), (e) => {
            e.preventDefault();
            this.handleSubmit(post);
        });
    }

    removeComment(e, comment, post) {
        $(`#comment-list-${post.id}`).removeChild(
            e.target.parentNode
        );
        this.commentModel.removeComment(comment.id, post);
        this.showCommentLength(post);
        
    } 

    addRemoveCommentListener(comment, post) {
        addEvent("click", $(`#remove-comment${comment.id}`), (e) => {
            this.removeComment(e, comment, post)
        });
    }

    showCommentLength(post) {
        const commentList = this.commentModel.getCommentListByPost(post);
        const commentLength = commentList ? commentList.length : 0;
        $(`#comment-${post.id} span`).textContent = 
            `${commentLength} ${commentLength > 1 ? "comments" : "comment"}`;
    }
}
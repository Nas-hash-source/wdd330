// PostService dealing with database
import Service from '../../Service.js';

/*const commentList = {
     comment: [
            {
                id: "user",
                body: "What an interesting fact"
            }
        ]
}*/


export default class CommentModel {

    constructor() {
        this.key =  null;
        this.commentList = [];
    }

    getCommentListByPost(post) {
        this.key = `post-comment-${post.id}`;
        this.commentList = Service.getDataByKey(this.key);
        return this.commentList ? this.commentList.data : null;
    }

    addComment(comment, post) {
        let newCommentList;
        if (this.getCommentListByPost(post)) {
            newCommentList = {data: [...this.getCommentListByPost(post), comment]};
        } else newCommentList = {data: [comment]};
        Service.saveData(this.key, newCommentList);
    }

    removeComment(commentID, post) {
        const updatedList = this.getCommentListByPost(post).filter(comment => 
            comment.id !== commentID
        );
        Service.saveData(this.key, {data: updatedList});
    }
}
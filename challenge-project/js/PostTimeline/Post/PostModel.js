// PostService dealing with database
import Service from '../../Service.js';

/*const postList = [
    {
        id: 0,
        title: "javascript",
        description: "test zero",
        tag: ["oen", "oen", "oen"],
        comment: [
            {
                name: "user",
                body: "What an interesting fact"
            }
        ]
    },
    {
        id: 1,
        title: "javascript",
        description: "test zero"
    },
    {
        id: 2,
        title: "javascript",
        description: "test zero"
    },
    {
        id: 3,
        title: "javascript",
        description: "test zero"
    },
    {
        id: 4,
        title: "javascript",
        description: "test zero"
    },
    {
        id: 5,
        title: "javascript",
        description: "test zero"
    }
]*/


export default class postModel {
    constructor() {
        this.type = "book";
        this._postList = Service.getDataByKey(this.type);
        //this._postList = PostService.getPostList(this.postType);
    }

    getPostList() {
        return this._postList;
    }

    getPostbyId(postId) {
        return this.getPostList().find(post => post.id === postId);
    }


    getPostListByTagList(callback, tagList){
       const filteredPost = this.getPostList().filter(post => {
            // get the tagList in a post
            const postTagList = callback(post);
            if(postTagList) {
                for (let n of tagList) {
                    if (postTagList.includes(n)) {
                        return true;
                    }
                }
            }
        });

        return filteredPost;
    }

    getPostListByKeyword(callback, keyword) {
        if (this.getPostList()){
            const filteredPost = this.getPostList().filter(post => {
                const keywordSearch = keyword.toLowerCase();
                if (post.title.toLowerCase().includes(keywordSearch) || 
                    post.description.toLowerCase().includes(keywordSearch)){
                    return true;
                }

                const postTagList = callback(post);
                if(postTagList) {
                    for (let tag of postTagList){
                        if(tag.toLowerCase().includes(keywordSearch)) {
                            return true;
                        }
                    };
                }
            });

            return filteredPost;
        } else return null;
    }

    getOverallTag() {
        this.overallTag = Service.getDataByKey("overallTag");
        return this.overallTag ? this.overallTag.data : null;
    }

    addPost(postId, postTitle, postDescription) {
        const newPost = {id: postId, title: postTitle, description: postDescription};
        let newPostList;
        if (this.getPostList()) {
            newPostList = [...this.getPostList(), newPost];
        } else {
            newPostList = [newPost];
        }
        this._postList = newPostList;
        Service.saveData(this.type, this._postList);
    }
    
}
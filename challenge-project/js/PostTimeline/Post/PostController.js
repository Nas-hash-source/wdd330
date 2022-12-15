// helper functions
import { $, $all, addEvent, capitalize} from '../../utils.js';

// import Post model and view
import PostModel from './PostModel.js';
import PostView from './PostView.js';

// Dependency Injection
import TagController from  '../Tag/TagController.js';
import CommentController from '../Comment/CommentController.js';
import BookViewController from '../../PostCreation/BookView/BookController.js';



export default class PostController {
    constructor(parent) {
        this.$el = {
            parent: $(parent),
            navigation: $("#navigation"),
            newBook: null,
            toggleButton: $("#toggle-button")
        }

        this.postList = null;

        this.postModel = new PostModel();
        this.postView = new PostView();

        this.tag = new TagController();
        this.comment = new CommentController();

        this.bookViewController = new BookViewController(parent);

        // binding this to any event method 
        this.handlePostSubmit = this.handlePostSubmit.bind(this);
        this.handlePostSearch = this.handlePostSearch.bind(this);
        this.showPostListWithTagFilter = this.showPostListWithTagFilter.bind(this);
        this.addCheckBoxListener = this.addCheckBoxListener.bind(this);
    }

    load() {
        this.postList = this.postModel.getPostList();
        this.showNavigation();
        this.showToggleButton();
        this.showPostList(this.postList, this.$el.parent);
        this.addSearchListener();
       
    }

    showNavigation() {
        this.$el.navigation.innerHTML = this.postView.renderNavigation();
        this.addNewBookButtonListener();
    }

    showToggleButton() {
        this.$el.toggleButton.innerHTML = this.postView.renderToggleButton();
        this.addToggleButtonListener();
    }

    // show post list while loading
    showPostList(postList, element) {
        
        if(!postList) {
            this.$el.parent.innerHTML = 
                `<div class="post-title">
                    <h2>No Book</h2>
                </div>`;
            return;
        } 

        this.postView.renderPostList(postList, element);

        postList.forEach(post => {
            this.addListener(post);
            this.tag.showTagLength(post);
            this.comment.showCommentLength(post);
        });
    }

    showNewForm() {
        this.$el.parent.innerHTML = this.postView.renderNewPostForm();
        this.buildBackButton(this.$el.toggleButton);
        $("#newTitle").focus();
        addEvent("click", $("#post-submit"), this.handlePostSubmit);
    }

    // new book button redirected to a new post form
    addNewBookButtonListener() {
        this.$el.newBook = $("#new-book");
        addEvent("click", this.$el.newBook, this.showNewForm.bind(this));
    }

    // 
    showFullPost(post) {
        this.$el.parent.innerHTML = this.postView.renderLightPost(post);
        this.comment.showCommentList(post);
        this.addListener(post);
        this.tag.showTagLength(post);
        this.comment.showCommentLength(post);
        this.buildBackButton(this.$el.toggleButton);
        $(`#comment-form-${post.id}`).focus();
    }

    addSearchListener() {
        addEvent("click", $("#search button"), 
            this.handlePostSearch
        );
    }

    handlePostSearch(e) {
        e.preventDefault();
        const input = e.target.previousElementSibling;
        if (!input.value) {
            return;
        } else {
            const postListBySearch = this.postModel.getPostListByKeyword(
                this.tag.tagModel.getTagListByPost.bind(this)
                , input.value
            );
            if (postListBySearch && postListBySearch.length > 0 ) {
                this.showPostList(postListBySearch, this.$el.parent);
            } else {
                this.$el.parent.innerHTML = 
                    `<div class="post-title">
                        <h2>No Result Found</h2>
                    </div>`;
            }

        }
    }

    // submit the form for getting a new post
    handlePostSubmit(e) {
        e.preventDefault();
        const id = this.postList ? this.postList.length : 0;
        const title = $("#newTitle").value;
        const description = $("#newDescription").value;


        if(title && description) {
            this.postModel.addPost(id, capitalize(title), description);
            this.bookViewController.init(this.postModel.getPostbyId(id));
            this.buildBackButton(this.$el.toggleButton);
        } else {
            $("#submitError").classList.remove("hidden");
        }
        
        
    }

    addToggleButtonListener() {
        addEvent("click", $("#myBooks"), () => {
            this.showPostList(this.postList, this.$el.parent);
            $("#myTags").classList.remove("toggle-button-active");
            $("#myBooks").classList.add("toggle-button-active");            
        });

        addEvent("click", $("#myTags"), this.showPostListWithTagFilter);
    }

    showPostListWithTagFilter() {
        $("#myTags").classList.add("toggle-button-active");
        $("#myBooks").classList.remove("toggle-button-active");
        const tagList = this.tag.tagModel.getOverallTagList();
        if(tagList && tagList.length > 0) {
            this.$el.parent.innerHTML = this.postView.renderTagOptions(tagList);

            const checkboxListNode = $all(".post-tag li input");
            checkboxListNode.forEach(tagNode => {
                addEvent("change", tagNode, () => {
                    this.addCheckBoxListener(checkboxListNode);
                });
            });
        } else {
            this.$el.parent.innerHTML = (
                `<div class="post-title">
                    <h2>No Tag</h2>
                </div>`
            );
        }    
    }

    addCheckBoxListener(checkboxListNode) {
        let checkBoxList = [];
        checkboxListNode.forEach( tag => {
            if (tag.checked) {
                checkBoxList.push(tag.value);
            }
        });

        const postList = 
            this.postModel.getPostListByTagList(
                this.tag.tagModel.getTagListByPost.bind(this),
                checkBoxList
            );
        this.showPostList(postList, $("#filteredPost"));
    }

    // assemble all the event listeners in a post
    addListener(post) {
        this.tag.showTagList(post);
        this.addTagListener(post);
        this.addPostListener(post);
        this.addCommentListener(post);
    }

    addPostListener(post) {
        addEvent("click", $(`#body-${post.id}`), () => {
            this.bookViewController.init(post);
            this.buildBackButton(this.$el.toggleButton);
            $("#searchInput").classList.add("hidden");
        });
    }

    addTagListener(post) {
        addEvent("click", $(`#tag-${post.id}`), () => {
            const tagInput = prompt("Enter your tag");
            if (tagInput) {
                this.tag.showTag(tagInput, post);
                this.tag.showTagLength(post);
            } else return;
        });
    }


    addCommentListener(post) {
        addEvent("click", $(`#comment-${post.id}`), () => {
            this.showFullPost(post);
        });
    }

    buildBackButton(toggleButton) {
        toggleButton.classList.add("backbutton");
        $("#backbutton").classList.remove("hidden");
        $("#myBooks").classList.add("hidden");
        $("#myTags").classList.add("hidden");
        addEvent("click", $("#backbutton"), () => {
            $("#searchInput").classList.remove("hidden");
            $("#backbutton").classList.add("hidden");
            $("#myBooks").classList.remove("hidden");
            $("#myTags").classList.remove("hidden");
            toggleButton.classList.remove("backbutton");
            this.load();
        });
    }
}


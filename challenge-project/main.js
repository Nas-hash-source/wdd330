import PostController from './js/PostTimeline/Post/PostController.js';
//import BookController from './js/PostCreation/BookController.js';
//import RichTextController from './js/PostCreation/RichTextController.js';
//import RichTextPluginController from './js/PostCreation/RichTextPlugin/RichTextPluginController.js';



const myPostController = new PostController('#root');
myPostController.load();


//new RichTextPluginController("#editor");
/*
const post = {
    id : 0
}

const myBookController = new BookController('#editor');
myBookController.init(post);*/

//const myRichText = new RichTextController('#editor');
//myRichText.init();

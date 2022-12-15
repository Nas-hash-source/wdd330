import { $, $all, addEvent, toggleHighlight, highlight} from '../../utils.js';


import BookView from './BookView.js';
import BookModel from './BookModel.js';


import RichTextPluginController from '../BookCreator/RichTextPluginController.js';


export default class BookController {
    constructor(selector) {
        this.$el = {
            parent : $(selector),
            nav : $("#navigation"),
            main : $("#root"),
            newPage : null,
            save: null
        }

        this.bookView = new BookView();
        this.bookModel = new BookModel();

        this.richTextPluginController = new RichTextPluginController("#root");
    }

    init(post) {
        this.showBook(post);
    }
    
    showBook(post) {
        //initialization, 
        const book = this.bookModel.getBook(post);
        const firstPage = book.pageList[0];
        this.showNavigation(book);
        this.addNavigationListListener(post);
        this.toggleDownNavigationList();

        //first showPage, doesn't need initialization
        this.showPage(post, book, firstPage.editable, firstPage.content, firstPage.id, firstPage.title);
        highlight($(".navigation-item"));

        this.addNewPageListener(post);
    }

    showNavigation(book) {
        this.$el.nav.innerHTML = this.bookView.renderNavigation(book);
    }

    showPage(post, book, editable, content, id, title) {
        if(editable) {
            this.richTextPluginController.init(id, content, title);
            this.addSaveListener(post, book);
        } else {
            this.$el.main.innerHTML = 
                this.bookView.renderPageEdit(id) + content;
            this.addEditListener(post);
            this.addDeleteListener(book, post);
        }
    }

    addNavigationListListener(post) {
        // refresh book
        const book = this.bookModel.getBook(post);
        book.pageList.forEach(page => {
            addEvent("click", $(`#page-${page.title}-${page.id}`), () => {
                this.showPage(post, book, page.editable, page.content, page.id, page.title);
                toggleHighlight($all(".toggledown"), $(`#page-${page.title}-${page.id}`));
            });
        });
    }

    toggleDownNavigationList() {
        addEvent("click", $("#bc-book-title"), () => {
            Array.from($all(".toggledown")).forEach(node => {
                node.classList.toggle("navigation-menu");
            });
        });
    }

    addNewPageListener(post) {
        this.$el.newPage = $("#new-page");
        addEvent("click", this.$el.newPage, () => {
            // refresh book
            const book = this.bookModel.getBook(post);
            const index = book.pageList.length;
            const newPage = {
                id: index,
                title: `Page${index+1}`,
                content: "",
                editable: true
            }
            this.showPage(post, book, newPage.editable, newPage.content, newPage.id, newPage.title);
            this.bookModel.addPage(newPage, book);
            this.appendOneNavItem(newPage.title, newPage.id);
            this.addNavigationListListener(post);
            toggleHighlight($all(".toggledown"), $(`#page-${newPage.title}-${newPage.id}`));
        });
    }

    addEditListener(post) {
        const book = this.bookModel.getBook(post);
        addEvent("click", $("#bc-edit-page"), (e) => {
            // id reference of the page in the screen
            const id = Number(e.target.dataset.page);
            // Make the editable true
            this.bookModel.makePageEditable(id, book);
            // refresh
            const page = this.bookModel.getPageById(id, book);
            this.showPage(post, book, true, page.content, id, page.title);
            this.addNavigationListListener(post);
        });
    }

    addDeleteListener(book, post) {
        addEvent("click", $("#bc-delete-page"), (e)=> {
            // id reference of the page in the screen
            const id = Number(e.target.dataset.page);
            this.bookModel.deletePageById(id, book);   
            // refresh book;
            const newBook = this.bookModel.getBook(post);
            this.showNavigation(newBook);
            this.addNavigationListListener(post);

            const firstPage = newBook.pageList[0];
    
            //then show again firstpage
            this.showPage(post, book, firstPage.editable, firstPage.content, firstPage.id, firstPage.title);
            highlight($(".navigation-item"));
        });
    }

    // save the page
    addSaveListener(post, book) {
        this.$el.save = $("#Save");
        addEvent("click", this.$el.save, () => {
            const id = Number($("#tool-bar").dataset.page);
            const textInput = $("#text-input").innerHTML;
            const title = $("#bc-page-title").value;

            //checkpoint
            this.bookModel.addContentInPage(id, textInput, post, title);
            const newBook = this.bookModel.getBook(post);
            this.showNavigation(newBook);
            this.addNewPageListener(post);
            this.addNavigationListListener(post);
            highlight($(`#page-${title}-${id}`));
            // the editable becomes false
            this.showPage(post, book, false, textInput, id, title);
        });
    }

    appendOneNavItem(title, pageId) {
        $("#navigation-item").appendChild(
            this.bookView.createNavigationItem(title, pageId)
        );
    }

}
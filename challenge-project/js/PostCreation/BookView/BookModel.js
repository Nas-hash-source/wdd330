import Service from '../../Service.js';

/*const bookModel = {
    id: 0,
    title: example,
    pageList: [
        {
            title: 1,
            content: "lorem"
        },

        {
            title: "Karoty",
            content: "ludo"
        }
    ]
} */

export default class BookModel {

    constructor() {
        this.key = null;
        this.book = null;
    }

    getBook(post) {
        this.key = `book-${post.id}`;
        this.book = Service.getDataByKey(this.key);
        if (!this.book) {
            this.initializeBook(post);
            this.book = Service.getDataByKey(this.key);
        }
        return this.book;
    }

    initializeBook(post) {
        Service.saveData(this.key, {
            id: post.id,
            title: post.title,
            pageList: [
                {
                    id: 0,
                    title: `Page1`,
                    content: "",
                    editable: true
                }
            ]
        });
    }

    getPageById(id, book) {
        return book.pageList.find(page => 
                page.id === id
                );
    }

    deletePageById(id, book) {
        const updatedBook = book.pageList.filter(page =>
            page.id !== id
        );

        Service.saveData(this.key, {
            ...book, pageList: updatedBook
        });
    }

    addPage(newPage, book) {
        Service.saveData(this.key, {
            ...book, pageList: [...book.pageList, newPage]
        });
    }

    addContentInPage(pageId, pageContent, post, title) {
        const updatedBook = this.getBook(post).pageList.map(page => {
            if (page.id === pageId) {
                return {
                    ...page,
                    title,
                    content: pageContent, 
                    editable: false
                }
            }
            return page;
        });

        Service.saveData(this.key, {
            ...this.getBook(post), pageList: updatedBook
        });
    }

    makePageEditable(id, book) {
        const updatedBook = book.pageList.map(page => {
            if (page.id === id) {
                return {
                    ...page, 
                    editable: true
                }
            }
            return page;
        });

        Service.saveData(this.key, {
            ...book, pageList: updatedBook
        });
    }
} 
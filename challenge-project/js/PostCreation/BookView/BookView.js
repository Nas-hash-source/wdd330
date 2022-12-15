export default class BookView {

    renderPageEdit(id) {
        return( `
            <div class="page-edit">
                <Button class="fa fa-edit" id="bc-edit-page" data-page="${id}">
                </Button>
                <Button class="fa fa-trash" id="bc-delete-page" data-page="${id}">
                </Button>
            </div>`
        );
    }

    renderNavigation(book) {
        return (` 
                <ul class="navigation-list">
                    <!--Book Title-->
                    <li class="book-title" id="bc-book-title">
                        <h2>${book.title}</h2>
                        <i class ="dropdown-menu fa fa-angle-down"></i>
                    </li>
                    <li class="navigation-menu toggledown">
                        <Button class="new-work" id="new-page">
                            <span>New Page</span>
                        </Button>
                    </li>
                    <li>
                        <ul class="pagelist" id="navigation-item" id="bc-page-list">
                        ${book.pageList.map(page => {
                            return this.renderNavigationItem(page.title, page.id);
                        }).join("")}
                        </ul>
                    </li>
                </ul>
        `);
    }

    renderNavigationItem(pageTitle, pageId) {
        return( `
            <li>
                <Button class="navigation-item navigation-menu toggledown" id="page-${pageTitle}-${pageId}">
                    ${pageTitle}
                </Button>
            </li>
            `);
    }

    createNavigationItem(pageTitle) {
        const navItemElement = document.createElement("li");
        navItemElement.innerHTML =
            (
                `<Button class="navigation-item toggledown" id="page-${pageTitle}">
                    ${pageTitle}
                </Button>`
            );
        return navItemElement;
    }
}
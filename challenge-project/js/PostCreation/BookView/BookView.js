export default class BookView {

    renderPageEdit(id) {
        return( `
            <div class="page-edit">
                <Button type="button" class="fa fa-edit" id="bc-edit-page" data-page="${id}">
                </Button>
                <Button type="button" class="fa fa-trash" id="bc-delete-page" data-page="${id}">
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
                        <Button type="button" class="new-work" id="new-page">
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
                <Button type="button" class="navigation-item navigation-menu toggledown" id="bc-pageitem-${pageId}">
                    ${pageTitle}
                </Button>
            </li>
            `);
    }

    createNavigationItem(pageTitle, pageId) {
        const navItemElement = document.createElement("li");
        navItemElement.innerHTML =
            (
                `<Button type="button" class="navigation-item toggledown" id="bc-pageitem-${pageId}">
                    ${pageTitle}
                </Button>`
            );
        return navItemElement;
    }
}
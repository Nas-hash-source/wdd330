export default class PostView {
    renderNavigation(){
        return (
            `<ul id="recentList">
                <li>
                    <Button type="button" class="new-work" id="new-book">
                        <span>New Book</span><i class="plus fa fa-plus"></i>
                    </Button>
                </li>
            </ul>`
        );
    }

    renderToggleButton(){
        return (
            `<button id="backbutton" type="button" class="hidden fa fa-arrow-left"></button>
            <button class="toggle-button-item type="button" toggle-button-active" id="myBooks">My Books</button>
            <button class="toggle-button-item" type="button" id="myTags">My Tags</button>`
        );
    }

    renderPostList(postList, listElement) {
        listElement.innerHTML = postList
            .map(post => {
                return this.renderLightPost(post);
            })
            .join("");
    }

    renderLightPost(post) {
        return (
          ` <article class="post-container" id="${post.id}">
                <div class="post-title">
                    <box-icon class="fa fa-book"></box-icon>${post.title}</h2>
                </div>                
                <section class="post-body" id="body-${post.id}">
                    <div class="post-content">
                        ${post.description}
                    </div>
                </section>
                <div class="post-button" id="post-button-${post.id}">
                    <button
                        type="button"
                        class="tag-button"
                        id="tag-${post.id}"
                    >
                        <span> </span>
                        <i class="fa fa-tag"></i>
                    </button>
                    <button
                        type="button" 
                        class="comment-button" 
                        id="comment-${post.id}"
                    >
                        <span> </span>
                        <i class="fa fa-comment"></i>
                    </button>
                </div>
            </article>`
            );   
    }

    renderNewPostForm() {
        return (`
            <form>
                <label for="newTitle">Book Title:</label>
                <input type="text" id="newTitle" autocomplete="off">

                <label for="newDescription">Book Description:</label>
                <textarea id="newDescription"></textarea>
                <div class="error hidden" id="submitError">The title or the description should not be empty</div>
                <button type="submit" id="post-submit">Submit</button>
            </form>
        `);
    }

    renderTagOptions(tagList) {
        return (`
            <ul class="post-tag">
                ${tagList.map((tag, index) => {
                    return (
                        `<li>
                            <input type="checkbox" id="filter-tag-${index}" value="${tag}">
                            <label for="filter-tag-${index}">${tag}</label>
                        </li>`
                        );
                }).join("")}
            </ul>
            <div id="filteredPost">
            </div>
        `);
    }
}
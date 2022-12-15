export default
    class TagView {

        renderTagList(tagList) {
            return (`
                    ${tagList.map((tag, index) => {
                        return this.renderTag(tag, index);
                    })
                    .join("")}
            `);
        }

        renderTag(tag, index) {
            return (
                `<li>
                    ${tag}
                    <button data-key="${index}">x</button> 
                </li>`
            );
        }

        createTagToAppend(tag, index) {
            const tagElement = document.createElement("li");
            tagElement.innerHTML = 
                `                   
                    ${tag}
                    <button data-key="${index}">x</button> 
                `;
            return tagElement;
        }
    }
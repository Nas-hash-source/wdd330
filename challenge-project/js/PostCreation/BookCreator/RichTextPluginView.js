export default 
    class RichTextPluginView {
        renderWorkSpace(menuList, id, content, title) {
            return (`
                <div class="toolbar" id="tool-bar" data-page="${id}">
                    <ul class="menu-list" id="menu-list">
                        ${this.renderMenuList(menuList)}
                    </ul/>

                    <div class="tool-list" id="tool-list">
                    </div> 
                </div>
                <input type="text" value="${title}" placeholder="change your page title..." id="bc-page-title">
                <div id="text-input" contenteditable="true">
                    ${content}
                </div> 

            `);
        }

        renderMenuList(menuList) {
            return menuList.map(menu => 
                `<li><button id="${menu}">${menu}</button></li>
                `).join("");
        }

        renderToolList(toolList) {
            return toolList.map(tool => {
                switch (tool.type) {
                    case "icon":
                        return (`
                            <button id="${tool.label}" class="${tool.className}">
                                <i class="${tool.icon}"></i>
                            </button>
                        `);
                    case "link":
                        return (`
                            <button id="${tool.label}" class="${tool.className}">
                                <i class="${tool.icon}"></i>
                            </button>
                        `);
                    case "color":
                        return (`
                            <div class="input-wrapper">
                                <input type="color" name="" id="${tool.label}" class="adv-option-button">
                                <label for="${tool.label}">${tool.value}</label>
                            </div>
                        `);
                    
                    case "image":
                        return (`
                            <div>
                                <input type="file" style="display:none" name="" id="${tool.label}" class="adv-option-button">
                                <label for="${tool.label}" class="${tool.icon}"></label>
                            </div>
                        `);
                    case "dropdown":
                        return (`
                            <select id="${tool.label}">
                                ${tool.optionList.map(choice => {
                                    return `<option value="${choice}">
                                                ${choice}
                                            </option>`;
                                })}
                            </select>
                        `);
                    default: 
                        return (`
                            <button id="${tool.label}" class="${tool.className}">
                                ${tool.label}
                            </button>
                        `)
                    
                }
            }).join("");   
        }
    }
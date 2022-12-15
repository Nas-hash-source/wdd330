import { $, $all, addEvent, toggleHighlight, highlight} from '../../utils.js';

import RichTextPluginView from './RichTextPluginView.js';
import RichTextPluginModel from './RichTextPluginModel.js';

export default
    class RichTextPluginController {
        constructor(selector){
            this.$el = {
                parent: $(selector),
                tool: null,
                content: null,
            }
            this.richTextPluginView = new RichTextPluginView();
            this.richTextPluginModel = new RichTextPluginModel();
        }

        init(id, content, title){
            this.showEditor(id, content, title);
        }

        showEditor(id, content, title) {
            const command = this.richTextPluginModel.getCommand();
            const menuList = Object.keys(command);
            this.$el.parent.innerHTML = this.richTextPluginView.renderWorkSpace(menuList, id, content, title);
            menuList.forEach(menu => {
                this.addMenuListener(menu, command);
            });
            this.showToolList("Menu", command);
            highlight($("#menu-list button"));
        }

        showToolList(menu, command) {
            this.$el.tool = $("#tool-list");
            this.$el.tool.innerHTML = 
                        this.richTextPluginView.renderToolList(command[menu].list);
            this.addToolListener(menu, command);
        }

        addMenuListener(menu, command) {
            if (menu === "Save") return;
            addEvent("click", $(`#${menu}`), (e) => {
                this.showToolList(menu, command);
                toggleHighlight($all("#menu-list button"), e.target);
            }); 
        }

        // using execCommand, it is deprecated but we need more time for changing it from scratch
        modifyText(tool, value) {
            document.execCommand(tool.label, false, value);
        }

        addToolListener(menuOption, command) {
            command[menuOption].list.forEach(tool => {
                const toolEl = $(`#${tool.label}`);
                    switch(tool.type) {
                        case "icon":
                            addEvent("click", toolEl, () => {
                                this.modifyText(tool, null);
                            });
                            break;
                        case "dropdown":
                            addEvent("change", toolEl, () => {
                                this.modifyText(tool, toolEl.value);
                            });
                            break;
                        
                        case "color":
                            addEvent("change", toolEl, () => {
                                this.modifyText(tool, toolEl.value);
                            });
                            break;
                        
                        case "link":
                            addEvent("click", toolEl, () => {
                                let userLink = prompt("Enter a URL");
                            // if Link has http then pass directly else add https
                                if (userLink) {
                                    if (userLink && /https?/i.test(userLink)) {
                                        this.modifyText(tool, userLink);
                                    } else {
                                        userLink = "https://" + userLink;
                                        this.modifyText(tool, userLink);
                                    }
                                }
                            });
                            break;

                        /*case "image":
                            document.querySelector(`#${tool.label}`).addEventListener("change", () => {
                                const typeValue = document.querySelector(`#${tool.label}`).value;
                                document.execCommand(tool.label, true, typeValue);
                            });
                            break;*/
    
                        default:
                            addEvent("click", toolEl, () => {
                                this.modifyText(tool, null);
                            });
                            break;
                    }
                });
        }
    }

    // end of richTextPlugin class
    
const command =  {
    Menu: {
        list: [
            {
                label: "justifyLeft",
                icon: "fa fa-align-left",
                className: "option-button align",
                type: "icon"
            },

            {
                label: "justifyCenter",
                icon: "fa fa-align-center",
                className: "option-button align",
                type: "icon"
            },

            {
                label: "justifyRight",
                icon: "fa fa-align-right",
                className: "option-button align",
                type: "icon"
            },

            {
                label: "justifyFull",
                icon: "fa fa-align-justify",
                className: "option-button align",
                type: "icon"
            },

            {
                label: "bold",
                icon: "fa fa-bold",
                className: "option-button format",
                type: "icon"
            },

            {
                label: "italic",
                icon: "fa fa-italic",
                className: "option-button format",
                type: "icon"
            },

            {
                label: "underline",
                icon: "fa fa-underline",
                className: "option-button format",
                type: "icon"
            },

            {
                label: "superscript",
                icon: "fa fa-superscript",
                className: "option-button script",
                type: "icon"
            },

            {
                label: "subscript",
                icon: "fa fa-subscript",
                className: "option-button script",
                type: "icon"
            },

            {
                label: "undo",
                icon: "fa fa-rotate-left",
                className: "option-button",
                type: "icon"
            },

            {
                label: "redo",
                icon: "fa fa-rotate-right",
                className: "option-button",
                type: "icon"
            }
        ],
        type: "moreOption"
    },

    Add: {
        list: [
            {
                label: "insertOrderedList",
                icon: "fa fa-list-ol",
                className: "option-button list",
                type: "icon"
            },

            {
                label: "insertUnorderedList",
                icon: "fa fa-list",
                className: "option- list",
                type: "icon"
            },

            {
                label: "formatBlock",
                optionList: ["H1", "H2", "H3", "H4", "H5"],
                className: "adv-option-button",
                type: "dropdown"
            },

            {
                label: "foreColor",
                value: "Text Color",
                type: "color",
                className: "adv-option-button"
            },

            {
                label: "backColor",
                value: "Highlight",
                type: "color",
                className: "adv-option-button"
            },

            {
                label: "fontSize",
                optionList: ["1", "2", "3", "4", "5", "6", "7"],
                className: "adv-option-button",
                type: "dropdown"
            },

            {
                label: "fontName",
                optionList: ["Arial", "Veradana", "Times New Roman", "Garamond", "Georgia", "Courier New", "Cursive"],
                className: "adv-option-button",
                type: "dropdown"
            }
        ],
        type: "moreOption"
    },

    Insert: {
        list: [
            {
                label: "createLink",
                class: "adv-option-button",
                icon: "fa fa-link",
                type: "link"
            },

            {
                label: "unlink",
                class: "option-button",
                icon: "fa fa-unlink",
                type: "icon"
            },

            {
                label: "insertHorizontalRule",
                class: "option-button",
                icon: "fa fa-minus",
                type: "icon"
            }/*,

            {
                label: "insertImage",
                type: "image",
                icon: "fa fa-image",
                class: 'adv-option-button'
            }*/
        ],
        type: "moreOption"
    },

    Save: null
}

export default
    class RichTextPluginModel {
        getCommand() {
            return command;
        }
    }
import { $, $all, addEvent} from '../../utils.js';

import TagView from './TagView.js';
import TagModel from './TagModel.js';



export default class TagController {
    constructor() {
        this.tagView = new TagView();
        this.tagModel = new TagModel();
        this.removeTag = this.removeTag.bind(this);
    }

    //show individual tag list
    showTagList(post) {
        const tagList = this.tagModel.getTagListByPost(post);

        if (tagList && tagList.length > 0) {
            const parentElement = document.getElementById(`${post.id}`);
            const postButtonElement = $(`#post-button-${post.id}`);
            let tagListElement = $(`#post-tag-${post.id}`);

            if (!tagListElement){
                tagListElement = document.createElement('ul');
                tagListElement.id = `post-tag-${post.id}`;
                tagListElement.classList.add('post-tag');
            }

            tagListElement.innerHTML = this.tagView.renderTagList(tagList);
            parentElement.insertBefore(tagListElement, postButtonElement);
            this.addRemoveTagListener(post);
        } else {
            return;
        }
    }

    // show just the newtag, make a better user experience
    showTag(tagInput, post) {
        const tagList = this.tagModel.getTagListByPost(post);

        if (tagList && tagList.length > 0) {
            const index = this.tagModel.getTagListByPost(post).length;
            this.tagModel.addTag(tagInput, post);
            const tagElement = this.tagView.createTagToAppend(tagInput, index);

            Array.from(tagElement.children).forEach(child => {
                addEvent("click", child, (e) => {
                    this.removeTag(e, post)
                });
            });

            $(`#post-tag-${post.id}`).appendChild(tagElement);
        } else {
            this.tagModel.addTag(tagInput, post);
            this.showTagList(post);
        }

        this.tagModel.addOverallTag(tagInput);
    }

    removeTag(event, post){
        const index = event.target.dataset.key;
        const parentNode = event.target.parentNode;
        $(`#post-tag-${post.id}`).removeChild(parentNode);
        this.tagModel.removeOverallTagItem(index, post);
        this.tagModel.removeTag(index, post);
        this.showTagLength(post);

    }

    addRemoveTagListener(post) {
        const tagListButton = Array.from($all(`#post-tag-${post.id} li button`));
        tagListButton.forEach(tag => {
            addEvent("click", tag, (e) => {
                this.removeTag(e, post)
            });
        })   
    }

    showTagLength(post) {
        const tagList = this.tagModel.getTagListByPost(post);
        const tagLength = tagList ? tagList.length : 0;
        $(`#tag-${post.id} span`).textContent = tagLength;
    }
}
// PostService dealing with database
import Service from '../../Service.js';

/*const tagList = {
    data: ["Karoty", "Hena"] 
}*/

export default class TagModel {
    constructor() {
        this.key = null;
        this.tagList = null;
        this.overallTag = null;
        this.getTagListByPost = this.getTagListByPost.bind(this);
    }

    getTagListByPost(post) {
        this.key = `post-tag-${post.id}`;
        this.tagList = Service.getDataByKey(this.key);
        return this.tagList ? this.tagList.data : null;
    }

    getOverallTagList() {
        this.overallTag = Service.getDataByKey("overallTag");
        return this.overallTag ? this.overallTag.data : null;
    }

    addTag(tag, post) {
        addTagItem(this.key, tag, this.getTagListByPost(post));
    }

    removeTag(index, post) {
        const tagList = this.getTagListByPost(post);
        tagList.splice(index, 1);

        const newTagList = {data: [...tagList]};
        Service.saveData(this.key, newTagList);
    }

    addOverallTag(tag) {
        addTagItem("overallTag", tag, this.getOverallTagList());
    }

    removeOverallTagItem(index, post) {
        const removeTag = this.getTagListByPost(post)[index];
        const updatedTag = this.getOverallTagList().filter(tag => {
            return !(tag === removeTag);
        });
        Service.saveData("overallTag", {data: updatedTag});
    }
}

function addTagItem(key, tag, tagList) {
    Service.saveData(key, {
        data: tagList ? [...new Set([...tagList, tag])] : [tag]
    });
}
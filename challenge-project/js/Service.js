// usually it deals with the apis through the server programming
// here we use localStorage

export default class PostService {
    static getDataByKey(key) {
        return JSON.parse(
              localStorage.getItem(key)
            );
    }

    static saveData(key, data) {
        localStorage.setItem(key, JSON.stringify(data));
    }
}
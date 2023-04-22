import axios from "axios";

class Backend {
    async getNameAndImage(id) {
        const book = await axios.get(`http://127.0.0.1:8080/id?id=${id}`);
        return book.data;
    }
}

const backend = new Backend();
export default backend;
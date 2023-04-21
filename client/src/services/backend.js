import axios from "axios";

class Backend {
    async getNameAndImage(id) {
        const books = await axios.get('localhost:8080/?id=' + id);
        console.log(books);
    }
}

const backend = new Backend();
export default backend;
import axios from "axios";

class Backend {
    async getNameAndImage(id) {
        const book = await axios.get(`http://127.0.0.1:8080/id?id=${id}`);
        return book.data;
    }

    async getLocation(id) {
        const location = await axios.get(`http://127.0.0.1:8080/loc?id=${id}`);
        return location.data;
    }

    async getAuthentication(username, password ) {
        const auth = await axios.get(`http://127.0.0.1:8080/auth?username=${username}&password=${password}`);
        return auth.data;
    }
}

const backend = new Backend();
export default backend;
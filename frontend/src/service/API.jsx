import axios from "axios";

/*************** BOOK APIs ***************/
/*** list all books ***/
class API {
    getBooks = async () => {
        let response = false;
        await axios
            .get("/books")
            .then((res) => {
            response = res;
            })
            .catch((err) => {
            console.log("books-list-err:", err);
            if (err.response) {
                response = err.response.data;
            }
        });
        return response;
    };
}

export default new API();

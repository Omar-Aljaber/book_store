/*************** HELPER ***************/

import { MESSAGES } from "../constants/Language_de";

class Helper {    
    
    setHyphenBetweenWords(name){
        const originalName = name.replace(/ /g, "-");
        return originalName;
    };

    removeHyphenFormNames(name){
        const originalName = name.replace(/-/g, " ");
        return originalName;
    };

    searchFunction(searchTerm, data, setData, setMessage, setMessageType){
        if (!searchTerm) {
            const searchedBook = data.books.filter(book => book);
            setData(searchedBook);
        } else {
            const lowerCaseSearchTerm = searchTerm.toLowerCase();
            const searchedBook = data.books.filter(book => book.title.toLowerCase().includes(lowerCaseSearchTerm));
            console.log(searchedBook.length)
            if(searchedBook.length){
                setData(searchedBook);
            }
            else {
                setMessageType(MESSAGES.TYPE.NOT_FOUND)
                setMessage(MESSAGES.TEXT.NOT_FOUND)
            }
        };
    };

    resetSearch(data, setData){
        const searchedBook = data.books.filter(book => book);
        setData(searchedBook);

    };
}

export default new Helper();
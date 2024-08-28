/*************** HELPER ***************/

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
            return false;
        } else {
            const lowerCaseSearchTerm = searchTerm.toLowerCase();
            const searchedBook = data.books.filter(book => book.title.toLowerCase().includes(lowerCaseSearchTerm));
            console.log(searchedBook.length)
            if(searchedBook.length){
                setData(searchedBook);
            }
            else {
                setMessageType("notFound")
                setMessage("Sorry, There is no Book with this Title!")
            }
        };
    };

    resetSearch(data, setData){
        const searchedBook = data.books.filter(book => book);
        setData(searchedBook);

    };
}

export default new Helper();
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

    reviewStars(count, reviewStar, defaultStar){
        let stars = [];
        for( let i = 0; i < count; i++){
            stars.push(<img src={reviewStar} width={15} alt="" key={i} />)
        }
        if(stars.length < 5){
            for( let i = stars.length; i < 5; i++){
                stars.push(<img src={defaultStar} width={15} alt="" key={i} />)
            }
        }
        return stars
    }

    addBook(bookCount, setBookCount){
        let addCount = bookCount + 1;
        setBookCount(addCount);
    };
    
    reduceBook(bookCount, setBookCount){
        if(bookCount > 1) {
            let reduceCount = bookCount - 1;
            setBookCount(reduceCount);
        }
    };
}

export default new Helper();
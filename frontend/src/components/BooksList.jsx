import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import defaultFavorite from "../style/imgs/default-favorite.png";
// import favorite from "../style/imgs/favorite.png";
import bookIcon from "../style/imgs/book-solid.svg";
// import cart from "../style/imgs/cart.png";
import defaultCart from "../style/imgs/default-cart.png";
import reviewStar from "../style/imgs/star.ico";
import defaultStar from "../style/imgs/default-star.ico";
import helper from "../service/helper";
import { 
    IMGS_TITLE,
    BUTTONS_TITLE, 
    MESSAGES
} from "../constants/Language_de";

/**
 * Function lists all available books
 * 
 * @param props data, setMessage, setMessageType, title
 * @returns list of all available books
 */
export default function BooksList(props) {
    const {data, setMessage, setMessageType, title} = props;
     
    const history = useHistory();
    const {category, publisher} = useParams();

    const [books, setBooks] = useState();
    const [selectedBook, setSelectedBook] = useState();
    const [bookCount, setBookCount] = useState(1);
    const [bookHover, setBookHover] = useState(false);
    const [bookIndex, setBookIndex] = useState();
    const [showAboutBook, setShowAboutBook] = useState(false);

    useEffect(() => {
        setBooks(data);
    }, [data]);
   
    useEffect(() => {
        booksFilter();
        window.scrollTo({top: 0, left: 0, behavior: "smooth"});
    }, [category, publisher]);
  
    /**
     * Filter books by category or publisher
     */
    const booksFilter = () => {
        if((publisher === "all" && category === "all")|| history.location.pathname === "/"){
            setBooks(data[0].books);
        } else if (category !== "all") {
            const modifiedCategory = helper.removeHyphenFormNames(category);
            const filterResult = data && data[0].books.filter((book) => book.category === modifiedCategory);
            setBooks(filterResult);
        } else {
            const modifiedPublisher = helper.removeHyphenFormNames(publisher);
            const filterResult = data && data[0].books.filter((book) => book.publisher === modifiedPublisher);
            setBooks(filterResult);
        }
    };

    /**
     * Switches to the books view and lists all available books
     * 
     * @param e 
     */
    const seeAllBooks = (e) => {
        e.preventDefault();
        history.replace(`/books/category=all&publisher=all`);
    };

    /**
     * Trim the title if it exceeds 15 characters
     * 
     * @param title 
     * @returns modified title, truncated if it exceeds 15 characters.
     */
    const bookTitle = (title) => {
        const titleLength = title && title.length;
        if (titleLength > 22) {
          const shortTitle = title.slice(0, 16) + "...";
          return shortTitle;
        }
        return title;
    };

    /**
     * Displays a window with detailed information about the selected book
     * 
     * @param e 
     */
    const aboutBook = (e) => {
        setShowAboutBook(true);
        const selectedBook = books.filter((book, index) => index == e.target.name);
        setSelectedBook(selectedBook);
        setBookHover(false);
    };

    /**
     * Displays a confirmation message when a book is added to the favorites list 
     */
    const addToFavirote = () => {
        setMessage(MESSAGES.TEXT.ADDED_TO_FAVIROTE);
        setMessageType(MESSAGES.TYPE.CONFIRM);
    };

    /**
     * Displays a confirmation message when a book is added to the cart list 
     */
    const addToCart = () => {
        setMessage(MESSAGES.TEXT.ADDED_TO_CART);
        setMessageType(MESSAGES.TYPE.CONFIRM);
    };

    /**
     * Creates an HTML book list
     *
     * @returns list of books with title, price, image, and review
     */
    const booksList = () => {
        return (
            books && books.map((book, index) => {
                const image_path = book.image != null ? `/books_image/${book.image}` : "/books_image/defaulte_image.png";
            return (
                <div className="books" name={index} key={index} onMouseMove={(e) => onBookHover(e, index)} onMouseLeave={onBookLeave}>
                        {((!selectedBook && bookHover) && (index === bookIndex)) && (
                            <div className="onHoverPart">
                                <img 
                                    src={defaultFavorite} width={28} alt="Favorite" 
                                    title={IMGS_TITLE.FAVIROTE} 
                                    onClick={addToFavirote} 
                                />
                                <img 
                                    src={bookIcon} name={index} width={25} 
                                    alt="Book" title={IMGS_TITLE.BOOK} 
                                    onClick={(e) => aboutBook(e)} 
                                />
                                <img 
                                    src={defaultCart} width={28} alt="Cart" 
                                    title={IMGS_TITLE.CART} 
                                    onClick={addToCart} 
                                />
                            </div>
                        )}
                        {showAboutBook && aboutBookRender()}
                        <img src={image_path} className="bookPhoto" width={150} alt="BOOK" />
                        <div className="book-title">{bookTitle(book.title)}</div>
                        <div className="review">
                            {helper.reviewStars(book.review.stars, reviewStar, defaultStar)}
                            <div className="reviews">
                                {book.review.count} reviews
                            </div>
                        </div>
                        <div className="price">{book.description.price}$</div>
                    </div>
                )
            })
        )
    }
    
    const onBookHover = (e, index) => {
        setBookHover(true); 
        setBookIndex(index);
    };

    const onBookLeave = () => {
        setBookHover(false); 
    };

    const onAddToCart = () => {
        setShowAboutBook(false);
        setSelectedBook(null);
    };
  
    const onGoShopping = () => {
        setShowAboutBook(false);
        setSelectedBook(null);
        setBookCount(1);
    };

    /**
     * Displays the details of a selected book.
     *
     * @returns window with the book's details.
     */
    const aboutBookRender = () => {
        return (
            <div className="read-book">
                <div className="wrapper">
                    <div className="upper-part">
                        <img src="/books_image/defaulte_image.png" className="bookPhoto" alt="BOOK" />
                        <div className="about-book">
                            <div className="title">{selectedBook[0].title}</div>
                            <div className="author">{selectedBook[0].description.author}</div>
                            <div className="description">{selectedBook[0].description.content}</div>
                        </div>
                    </div>
                    <div className="down-part">
                        <div className="price">{selectedBook[0].description.price}$</div>
                        <div className="review"> 
                            {helper.reviewStars(selectedBook[0].review.stars, reviewStar, defaultStar)}
                            <div className="reviews">
                                {selectedBook[0].review.count} reviews
                            </div>
                        </div>
                        <div className="count">
                            <div className="minus" onClick={() => helper.reduceBook(bookCount, setBookCount)}>-</div>
                            <div className="number">{bookCount}</div>
                            <div className="plus" onClick={() => helper.addBook(bookCount, setBookCount)}>+</div>
                        </div>
                        <div>
                            <button className="button" onClick={onGoShopping}>{BUTTONS_TITLE.SHOPPING}</button>
                            <button className="button" onClick={onAddToCart}>{BUTTONS_TITLE.ADD_TO_CART}</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    // const buttonTitle = () => {
    //     switch(title) {
    //         case "home":
    //           return BUTTONS_TITLE.ALL_BOOKS;
    //         case "books":
    //           return BUTTONS_TITLE.MORE_BOOKS;
    //         default:
    //       }
    // }

    return (
        <div className="books-section">
            <section>
                {booksList()}
                {/* <button className="see-all" onClick={(e) => {seeAllBooks(e)}} >{buttonTitle()}</button> */}
            </section>
            {title && <button className="see-all" onClick={(e) => {seeAllBooks(e)}} >{BUTTONS_TITLE.ALL_BOOKS}</button>}
        </div>
    )
};

import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import defaultFavorite from "../style/imgs/default-favorite.png";
// import favorite from "../style/imgs/favorite.png";
import bookIcon from "../style/imgs/book-solid.svg";
import defaultPhoto from "../style/imgs/book.png";
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

export default function BooksList(props) {
    const {data} = props; 
    const history = useHistory();
    const { category, publisher } = useParams();

    const [books, setBooks] = useState();
    const [selectedBook, setSelectedBook] = useState();
    const [bookCount, setBookCount] = useState(1);
    const [bookHover, setBookHover] = useState(false);
    const [bookIndex, setBookIndex] = useState();
    const [showAboutBook, setShowAboutBook] = useState(false);

    useEffect(() => {
        booksFilter();
        window.scrollTo({top: 0, left: 0, behavior: "smooth"});
    }, [category, publisher]);
  
    const booksFilter = () => {
        if((publisher === "all" && category === "all")|| history.location.pathname === "/"){
            setBooks(data[0].books);
        } else if (category !== "all") {
            const modifiedCategory = helper.removeHyphenFormNames(category);
            const filterResult = data[0].books.filter((book) => book.category === modifiedCategory);
            setBooks(filterResult);
        } else {
            const modifiedPublisher = helper.removeHyphenFormNames(publisher);
            const filterResult = data[0].books.filter((book) => book.publisher === modifiedPublisher);
            setBooks(filterResult);
        }
    };

    const seeAllBooks = (e) => {
        e.preventDefault();
        history.replace(`/books/category=all&publisher=all`);
    };

    const bookTitle = (title) => {
        const titleLength = title && title.length;
        if (titleLength > 22) {
          const shortTitle = title.slice(0, 16) + "...";
          return shortTitle;
        }
        return title;
    };

    const aboutBook = (e) => {
        setShowAboutBook(true);
        const selectedBook = books.filter((book, index) => index == e.target.name);
        setSelectedBook(selectedBook);
        setBookHover(false);
    };

    const reviewStars = (count) => {
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

    const addToFavirote = () => {
        props.setMessage(MESSAGES.TEXT.ADDED_TO_FAVIROTE);
        props.setMessageType(MESSAGES.TYPE.CONFIRM);
    };

    const addToCart = () => {
        props.setMessage(MESSAGES.TEXT.ADDED_TO_CART);
        props.setMessageType(MESSAGES.TYPE.CONFIRM);
    };

    const booksList = () => {
        return (
            books && books.map((book, index) => {
                const bookImage = book.image != null ? book.image : defaultPhoto;
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
                        <img src={bookImage} className="bookPhoto" width={150} alt="BOOK" />
                        <div className="book-title">{bookTitle(book.title)}</div>
                        <div className="review">
                            {reviewStars(book.review.stars)}
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

    const addBook = () => {
        let addCount = bookCount + 1;
        setBookCount(addCount);
    };
    
    const reduceBook = () => {
        if(bookCount > 1) {
            let reduceCount = bookCount - 1;
            setBookCount(reduceCount);
        }
    };

    const aboutBookRender = () => {
        return (
            <div className="read-book">
                <div className="wrapper">
                    <div className="upper-part">
                        <img src={defaultPhoto} className="bookPhoto" alt="BOOK" />
                        <div className="about-book">
                            <div className="title">{selectedBook[0].title}</div>
                            <div className="author">{selectedBook[0].description.author}</div>
                            <div className="description">{selectedBook[0].description.content}</div>
                        </div>
                    </div>
                    <div className="down-part">
                        <div className="price">{selectedBook[0].description.price}$</div>
                        <div className="review"> 
                            {reviewStars(selectedBook[0].review.stars)}
                            <div className="reviews">
                                {selectedBook[0].review.count} reviews
                            </div>
                        </div>
                        <div className="count">
                            <div className="minus" onClick={reduceBook}>-</div>
                            <div className="number">{bookCount}</div>
                            <div className="plus" onClick={addBook}>+</div>
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
    //     switch(props.title) {
    //         case "home":
    //           return BUTTONS_TITLE.ALL_BOOKS;
    //         case "books":
    //           return BUTTONS_TITLE.MORE_BOOKS;
    //         default:
    //       }
    // }

    return (
        <section className="books-section">
            {booksList()}
            {/* <button className="see-all" onClick={(e) => {seeAllBooks(e)}} >{buttonTitle()}</button> */}
            {props.title && <button className="see-all" onClick={(e) => {seeAllBooks(e)}} >{BUTTONS_TITLE.ALL_BOOKS}</button>}
        </section>
    )
};

import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import favorite from "../style/imgs/favorite.svg";
import bookIcon from "../style/imgs/book-solid.svg";
import defaultPhoto from "../style/imgs/book.png";
import cart from "../style/imgs/cart.png";
import star from "../style/imgs/star.ico";
import { 
    IMGS_TITLE, 
    DESCRIPTION_PART, 
    BUTTONS_TITLE 
} from "../constants/Language_de";

export default function BooksList(props) {
    const { data } = props; 
    const history = useHistory();
    const [ bookHover, setBookHover ] = useState(false);
    const [ bookIndex, setBookIndex ] = useState();
    const [ readBook, setReadBook ] = useState(false);

    const seeAllBooks = (e) => {
        e.preventDefault();
        history.replace(`/books/category=all-books&publisher=all-books`);
    };

    const bookTitle = (title) => {
        const titleLength = title && title.length;
        if (titleLength > 22) {
          const shortTitle = title.slice(0, 16) + "...";
          return shortTitle;
        }
        return title;
    };

    const booksList = () => {
        return (
            data && data.map((book, index) => {
                // const bookPhoto = book.photo != null ? book.photo : defaultPhoto;
            return (
                <div className="books" key={index} onMouseMove={() => onBookHover(index)} onMouseLeave={onBookLeave}>
                        {(bookHover && index === bookIndex) && (
                            <div className="onHoverPart">
                                <img src={favorite} width={28} alt="Favirote" title={IMGS_TITLE.FAVIROTE} />
                                <img src={bookIcon} width={25} alt="Book" title={IMGS_TITLE.BOOK} onClick={() => {setReadBook(true)}} />
                                <img src={cart} width={34} alt="Cart" title={IMGS_TITLE.CART} />
                            </div>
                        )}
                        {readBook && aboutBook()}
                        <img src={defaultPhoto} className="bookPhoto" width={150} alt="BOOK" />
                        <div className="book-title">{bookTitle(book.title)}</div>
                        <div className="review"> 
                            <img src={star} width={15} alt="" />
                            <img src={star} width={15} alt="" />
                            <img src={star} width={15} alt="" />
                            <img src={star} width={15} alt="" />
                            <img src={star} width={15} alt="" />
                            <div>{book.review} reviews</div>
                        </div>
                        <div className="price">{book.description[0].price}$</div>
                    </div>
                )
            })
        )
    }
    
    const onBookHover = (index) => {
        setBookHover(true); 
        setBookIndex(index);
    };

    const onBookLeave = () => {
        setBookHover(false); 
    };

    const aboutBook = () => {
        return (
            <div className="read-book">
                <div className="wrapper">
                    <div className="upper-part">
                        <img src={defaultPhoto} className="bookPhoto" alt="BOOK" />
                        <div className="about-book">
                            <div className="title">Title</div>
                            <div className="author">Author</div>
                            <div className="description">{DESCRIPTION_PART.TEXT}</div>
                        </div>
                    </div>
                    <div className="down-part">
                        <div className="price">$23.55</div>
                        <div className="review"> 
                            <img src={star} width={20} alt="" />
                            <img src={star} width={20} alt="" />
                            <img src={star} width={20} alt="" />
                            <img src={star} width={20} alt="" />
                            <img src={star} width={20} alt="" />
                            <div>325 reviews</div>
                        </div>
                        <div className="count">
                            <div className="minus">-</div>
                            <div className="number">5</div>
                            <div className="plus">+</div>
                        </div>
                        <div>
                            <button className="button" onClick={() => {setReadBook(false)}}>{BUTTONS_TITLE.SHOPPING}</button>
                            <button className="button" onClick={() => {setReadBook(false)}}>{BUTTONS_TITLE.ADD_TO_CART}</button>
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

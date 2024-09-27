import React, { useState } from "react";
import Delete from "../style/imgs/delete.ico";
import reviewStar from "../style/imgs/star.ico";
import defaultStar from "../style/imgs/default-star.ico";
import helper from "../service/helper";
import defaultPhoto from "../style/imgs/book.png";
import redArrow from "../style/imgs/red-arrow.png";
import greenArrow from "../style/imgs/green-arrow.png";
import data from "../data/cartListBooks.json";
import Message from "./Message";
import { TITLES, BUTTONS_TITLE, FAVIROTE_LIST, MESSAGES } from "../constants/Language_de";

export default function CartList(props) {
    
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("");
    const [bookCounts, setBookCounts] = useState(data.books.map(() => 1));

    const onReduceBook = (e, index) => {
        setBookCounts(prevCounts => {
            const updatedCounts = [...prevCounts];
            if (updatedCounts[index] > 1) {
                updatedCounts[index]--;
            }
            return updatedCounts;
        });
    };
    
    const onAddBook = (e, index) => {
        setBookCounts(prevCounts => {
            const updatedCounts = [...prevCounts];
            updatedCounts[index]++;
            return updatedCounts;
        });
    };
    

    const deleteBook = () => {
        setMessage(MESSAGES.TEXT.DELETED_FROM_LIST);
        setMessageType(MESSAGES.TYPE.REMOVED);
    };

    const bookPart = (data, category) => {
        return (
            data.map((book, index) => {
                const bookPhoto = book.description.photo != null ? book.description.photo : defaultPhoto;
                return (
                    <div key={index} className="book-section">
                        <div className="book-part">
                            <img src={bookPhoto} className="bookPhoto" width={80} alt="BOOK" />
                            <div className="title-review">
                                <h4 className="book-title">{book.title}</h4>
                                <div className="review"> 
                                    {helper.reviewStars(book.review.stars, reviewStar, defaultStar)}
                                    <div className="reviews">
                                        {book.review.count} reviews
                                    </div>
                                </div>
                            </div>
                        </div>
                        <h4 className="quantity">
                            <img name={book.title} src={redArrow} onClick={(e) => onReduceBook(e, index)} width={25} height={25}/>
                            <h3>{bookCounts[index]}</h3>
                            <img name={index} src={greenArrow} onClick={(e) => onAddBook(e, index)} width={25} height={25}/>
                        </h4>
                        <h2 className="price">{book.description.price}$</h2>
                        <h2 className="total">{book.description.price * bookCounts[index]}$</h2>
                        <img src={Delete} onClick={deleteBook} width={25} height={25}/>
                    </div>
                );
            })
        );
    };

    const goToBayment = (e) => {
        e.preventDefault();
        props.showCartList(false);
    };
  
    const continueShopping = (e) => {
        e.preventDefault();
        props.showCartList(false);
    };

    return (
        <div>
            {message && <Message type={messageType} text={message} setMessage={setMessage} />}
            <div className="cart-list">
                <form>
                    <div className="title">
                        <div>{TITLES.SHOPPING_LIST}</div>
                    </div>
                    <div className="list-info">
                        <div className="column-title">
                            <div className="project">{FAVIROTE_LIST.PROJECT}</div>
                            <div className="quantity">{FAVIROTE_LIST.QUANTITY}</div>
                            <div className="price">{FAVIROTE_LIST.PRICE}</div>
                            <div>{FAVIROTE_LIST.TOTAL}</div>
                            <div>{FAVIROTE_LIST.DELETE}</div>
                        </div>
                        {bookPart(data.books)}
                    </div>
                    <div>
                        <button onClick={(e) => {goToBayment(e)}}>{BUTTONS_TITLE.PAYMENT}</button>
                        <button className="shopping" onClick={(e) => {continueShopping(e)}}>{BUTTONS_TITLE.SHOPPING}</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
import React, { useState } from "react";
import Delete from "../style/imgs/delete.ico";
import cart from "../style/imgs/cart.png";
import defaultPhoto from "../style/imgs/book.png";
import reviewStar from "../style/imgs/star.ico";
import defaultStar from "../style/imgs/default-star.ico";
import helper from "../service/helper";
import data from "../data/faviroteBooks.json";
import Message from "./Message";
import { TITLES, BUTTONS_TITLE, FAVIROTE_LIST, MESSAGES } from "../constants/Language_de";

export default function FaviroteList(props) {

    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("");

    const addToCart = () => {
        setMessage(MESSAGES.TEXT.ADDED_TO_CART);
        setMessageType(MESSAGES.TYPE.CONFIRM);
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
                        <h2 className="price">{book.description.price}$</h2>
                        <img className="cartIcon" src={cart} onClick={addToCart} width={25} height={25}/>
                        <img className="deleteIcon" src={Delete} onClick={deleteBook} width={25} height={25}/>
                    </div>
                )
            })
        )
    };

    const goToCart = (e) => {
        e.preventDefault();
        props.showFavoriteList(false);
        props.showCartList(true);
    };
  
    const continueShopping = (e) => {
        e.preventDefault();
        props.showFavoriteList(false);
    };

    return (
        <div>
            {message && <Message type={messageType} text={message} setMessage={setMessage} />}
            <div className="favorite-list">
                <form>
                    <div className="title">
                        <div>{TITLES.MY_VAVIROTE}</div>
                    </div>
                    <div className="list-info">
                        <div className="column-title">
                            <div className="project">{FAVIROTE_LIST.PROJECT}</div>
                            <div className="price">{FAVIROTE_LIST.PRICE}</div>
                            <div>{FAVIROTE_LIST.ADD_TO_CART}</div>
                            <div>{FAVIROTE_LIST.DELETE}</div>
                        </div>
                        {bookPart(data.books)}
                    </div>
                    <div>
                        <button onClick={(e) => {goToCart(e)}}>{BUTTONS_TITLE.GO_TO_CART}</button>
                        <button className="shopping" onClick={(e) => {continueShopping(e)}}>{BUTTONS_TITLE.SHOPPING}</button>
                    </div>
                </form>
            </div>
        </div>
            
    );
}
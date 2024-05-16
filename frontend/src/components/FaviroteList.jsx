import React from "react";
import redArrow from "../style/imgs/red-arrow.png";
import greenArrow from "../style/imgs/green-arrow.png";
import Delete from "../style/imgs/delete.ico";
import cart from "../style/imgs/cart.png";
import star from "../style/imgs/star.ico";
import defaultPhoto from "../style/imgs/book.png";
import data from "../data/homeBooks.json";
import { TITLES, BUTTONS_TITLE, FAVIROTE_LIST } from "../constants/Language_de";

export default function FaviroteList(props) {

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
                                    <img src={star} width={15} />
                                    <img src={star} width={15} />
                                    <img src={star} width={15} />
                                    <img src={star} width={15} />
                                    <img src={star} width={15} />
                                    <div>325 reviews</div>
                                </div>
                            </div>
                        </div>
                        <h4 className="quantity">
                            <img src={redArrow} width={25} height={25}/>
                            <h3>5</h3>
                            <img src={greenArrow} width={25} height={25}/>
                        </h4>
                        <h2 className="price">{book.description.price}$</h2>
                        <h2 className="total">{book.description.price}$</h2>
                        <img src={cart} width={25} height={25}/>
                        <img src={Delete} width={25} height={25}/>
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
        <div className="favorite-list">
            <form>
                <div className="title">
                    <div>{TITLES.MY_VAVIROTE}</div>
                </div>
                <div className="list-info">
                    <div className="column-title">
                        <div className="project">{FAVIROTE_LIST.PROJECT}</div>
                        <div className="quantity">{FAVIROTE_LIST.QUANTITY}</div>
                        <div className="price">{FAVIROTE_LIST.PRICE}</div>
                        <div>{FAVIROTE_LIST.TOTAL}</div>
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
    );
}
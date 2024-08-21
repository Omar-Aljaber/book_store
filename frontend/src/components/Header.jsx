import React, { useState } from "react";
import logo from "../style/imgs/logo.png";
import cart from "../style/imgs/default-cart.png";
import user from "../style/imgs/user.svg";
import favorite from "../style/imgs/favorite.svg";
import whatsapp from "../style/imgs/icons/whatsapp.png";
import Navbar from "./Navbar";
import { HEADER, IMGS_TITLE, TITLES, BUTTONS_TITLE } from "../constants/Language_de";
import { WHATSAPP_URL } from "../constants/Constants";
import FaviroteList from "./FaviroteList";
import CartList from "./CartList";


export default function Header() {

    const [registered, setRegistered] = useState(false);
    const [showLogin, setShowLogin] = useState(false);
    const [favoriteList, setFavoriteList] = useState(false);
    const [cartList, setCartList] = useState(false);

    const login = () => {
        return (
            <div className="login">
                <form>
                    <div className="title">{registered ? TITLES.LOGIN : TITLES.REGISTER}</div>
                    {!registered && <input type="text" placeholder="Name..." required={true} />}
                    <input type="email" placeholder="Email..." required={true} />
                    <input type="password" placeholder="Password..." required={true} />
                    <div>
                        <button>{registered ? TITLES.LOGIN : TITLES.SINGUP}</button>
                        <button onClick={() => {setShowLogin(false)}}>{BUTTONS_TITLE.CANCLE}</button>
                    </div>
                    <a href="">{!registered ? BUTTONS_TITLE.login : BUTTONS_TITLE.register}</a>
                </form>
            </div>
        );
    };
    
    return (
        <div className="header">
            {showLogin && login()}
            {favoriteList && <FaviroteList showFavoriteList={setFavoriteList} showCartList={setCartList}/>}
            {cartList && <CartList showCartList={setCartList}/>}
            <main>
                <div className="logo">
                    <img src={logo} width={150} alt="" />
                </div>
                <form>
                    <input placeholder={HEADER.SEARCH_PLACEHOLDER}/>
                    <button>{HEADER.SEARCH}</button>
                </form>
                <aside>
                    <div className="cart">
                        <img 
                            src={cart} 
                            alt="cart" 
                            width={30} 
                            title={IMGS_TITLE.MY_CART}
                            onClick={() => {setCartList(true)}}/>
                    </div>
                    <div className="favorite">
                        <img 
                            src={favorite} 
                            alt="favorite" 
                            width={28} 
                            title={IMGS_TITLE.MY_FAVIROTE} 
                            onClick={() => {setFavoriteList(true)}}/>
                    </div>
                    <div className="user">
                        <img 
                            src={user} alt="user" 
                            onClick={() => setShowLogin(true)}
                            width={28}
                            title={IMGS_TITLE.SIGNUP}/>   
                    </div>
                    <div className="whatsapp">
                        <a href={WHATSAPP_URL} target="_blank">
                            <img src={whatsapp} alt="whatsapp" width={32} title={IMGS_TITLE.CONTACT} />
                        </a>
                    </div>
                </aside>
            </main>
            <Navbar />
        </div>
    );
};

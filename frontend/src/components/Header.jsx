import React, { useState } from "react";
import logo from "../style/imgs/logo.png";
import cart from "../style/imgs/default-cart.png";
import user from "../style/imgs/user.svg";
import favorite from "../style/imgs/favorite.svg";
import whatsapp from "../style/imgs/icons/whatsapp.png";
import Navbar from "./Navbar";
import { HEADER, IMGS_TITLE, TITLES, BUTTONS_TITLE, MESSAGES } from "../constants/Language_de";
import { WHATSAPP_URL } from "../constants/Constants";
import FaviroteList from "./FaviroteList";
import CartList from "./CartList";


export default function Header(props) {
    const [register, setRegister] = useState(true);
    const [login, setLogin] = useState(false);
    const [showUserDialog, setShowUserDialog] = useState(false);
    const [favoriteList, setFavoriteList] = useState(false);
    const [cartList, setCartList] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [userName, setUserName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const onSubmit = (e) => {
        e.preventDefault();
        const messageType = register ? MESSAGES.TYPE.REGISTERED : MESSAGES.TYPE.LOGINED; 
        const messageText = register ? MESSAGES.TEXT.REGISTERED : MESSAGES.TEXT.LOGINED; 
        props.message(messageText);
        props.messageType(messageType);
        if(login) {
            //axios function
        } else {
            //axios function
            setUserName();
        }
        setEmail();
        setPassword();
        setShowUserDialog(false);
    };

    const onLogin = (e) => {
        e.preventDefault();
        setLogin(false);
        setRegister(true);
    };
    const onRegister = (e) => {
        e.preventDefault();
        setRegister(false);
        setLogin(true);
    };

    const userDialog = () => {
        return (
            <div className="user-dialog">
                <form onSubmit={(e) => {onSubmit(e)}}>
                    <div className="title">{register ? TITLES.REGISTER : TITLES.LOGIN}</div>
                    {register && <input type="text" value={userName} placeholder="Name..." required/>}
                    <input type="email" value={email} placeholder="Email..." required/>
                    <input type="password" value={password} placeholder="Password..." required/>
                    <div>
                        <button>{register ? TITLES.SINGUP : TITLES.LOGIN}</button>
                        <button onClick={() => {setShowUserDialog(false)}}>{BUTTONS_TITLE.CANCLE}</button>
                    </div>
                    <a href="" onClick={(e) => {register ? onRegister(e) : onLogin(e)}}>{register ? BUTTONS_TITLE.register : BUTTONS_TITLE.login}</a>
                </form>
            </div>
        );
    };

    const onSearch = (e) => {
        e.preventDefault();
        props.search(searchTerm);
    };
   
    const onReset = (e) => {
        e.preventDefault();
        setSearchTerm("");
        props.resetSearch();
    };

    return (
        <div className="header">
            {showUserDialog && userDialog()}
            {favoriteList && <FaviroteList showFavoriteList={setFavoriteList} showCartList={setCartList}/>}
            {cartList && <CartList showCartList={setCartList}/>}
            <main>
                <div className="logo">
                    <img src={logo} width={150} alt="" />
                </div>
                <form >
                    <button className={!searchTerm ? "disabled" : "enable"} onClick={(e) => onSearch(e)}>{HEADER.SEARCH}</button>
                    <input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder={HEADER.SEARCH_PLACEHOLDER}/>
                    <button className={!searchTerm ? "disabled" : "enable"} onClick={(e) => onReset(e)}>{HEADER.RESET}</button>
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
                            onClick={() => setShowUserDialog(true)}
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

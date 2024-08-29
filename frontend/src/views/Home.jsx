import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Header from "../components/Header";
import Slideshow from "../components/Slideshow";
import children from "../style/imgs/children.jpg"
import academic from "../style/imgs/academic.jpg"
import historyImg from "../style/imgs/history.jpg";
import religion from "../style/imgs/religion.jpg";
import scince from "../style/imgs/scince.jpg";
import Footer from "../components/Footer";
import BooksList from "../components/BooksList";
import StayWithUs from "../components/StayWithUs";
import homeBooks from "../data/homeBooks.json";
import Message from "../components/Message";
import helper from "../service/helper";
import API from "../service/API";
import { 
    BUTTONS_TITLE, 
    CATEGORY,
    TITLES 
} from "../constants/Language_de";


export default function Home() {

    const history = useHistory();
    const [data, setData] = useState([homeBooks]);
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("");

    // useEffect(async () => {
    //     const response = await API.getBooks();
    //     setData(response.data);
    // }, []);

    const seeAllCategory = (e) => {
        e.preventDefault();
        history.replace(`/books/category=all&publisher=all`);
    };

    const displayCategory = (e) => {
        e.preventDefault();
        console.log(e.target.alt)
        history.replace(`/books/category=${e.target.alt}&publisher=all`);
    };

    const onSearch = (searchTerm) => {
        helper.searchFunction(searchTerm, homeBooks, setData, setMessage, setMessageType);
        window.scrollTo({top: 800, left: 0, behavior: "smooth"});
    };
    
    const onResetSearch = () => {
        helper.resetSearch(homeBooks, setData);
        window.scrollTo({top: 0, left: 0, behavior: "smooth"});
    };

    const categoryPart = (category) => {
        return (
            <div>
                <div className="title">{TITLES.CATEGORIES}</div>
                <div className="right-part">
                    <div>
                        <h3>{CATEGORY.HISTORY}</h3>
                        <img 
                            src={historyImg} 
                            className="" 
                            width={530} 
                            alt="History" 
                            title="History"
                            onClick={e => displayCategory(e)} 
                        />
                    </div>
                    <div>
                        <h3>{CATEGORY.RELIGION}</h3>
                        <img 
                            src={religion} 
                            className="religion" 
                            width={530} 
                            alt="Religion" 
                            title="Religion"
                            onClick={e => displayCategory(e)}
                        />
                    </div>
                </div>
                <div className="left-part">
                    <div>
                        <h3>{CATEGORY.ACADEMIC}</h3>
                        <img 
                            src={academic} 
                            className="" 
                            width={350} 
                            alt="Academic" 
                            title="Academic"
                            onClick={e => displayCategory(e)} 
                        />
                    </div>
                    <div>
                        <h3>{CATEGORY.CHILDREN}</h3>
                        <img 
                            src={children} 
                            className="children" 
                            width={350} 
                            alt="Children" 
                            title="Children"
                            onClick={e => displayCategory(e)}
                        />
                    </div>
                    <div>
                        <h3>{CATEGORY.SCINCE}</h3>
                        <img 
                            src={scince} 
                            className="" 
                            width={350} 
                            alt="Scince" 
                            title="Scince"
                            onClick={e => displayCategory(e)}
                        />
                    </div>
                </div>
                <button onClick={seeAllCategory}>{BUTTONS_TITLE.ALL_CATEGORIES}</button>
            </div>
        )
    };
   
    return (
        <main className="home-view">
            <Header search={onSearch} resetSearch={onResetSearch} messageType={setMessageType} message={setMessage} />
            {message && <Message type={messageType} text={message} setMessage={setMessage} />}
            <Slideshow />
            <div className="wrapper">
                <div className="new-title">{TITLES.NEW_BOOKS}</div>
                {<BooksList data={data && data} title="home" setMessage={setMessage} setMessageType={setMessageType} />}
            </div>
            <StayWithUs setMessage={setMessage} setMessageType={setMessageType} />
            <section className="category-part">
                {categoryPart()}
            </section>
            <Footer />
        </main>
    )
};

import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { ALL_BOOKS, ALL_PUBLISHERS, NAVBAR } from "../constants/Language_de";
import data from "../data/allBooks.json";
import helper from "../service/helper";

export default function Navbar(props) {

    const history = useHistory();
    const [showCategories, setShowCategories] = useState(false);
    const [showPublisher, setShowPublisher] = useState(false);
    const [categories, setCategories] = useState([]);
    const [publishers, setPublishers] = useState([]);

    useEffect(() => {
        const getAllCategory = [...new Set(data.books.map((book) => book.category))];
        const getAllPublisher = [...new Set(data.books.map((book) => book.publisher))];
        setCategories(getAllCategory);
        setPublishers(getAllPublisher);
    }, []);

    const onSelectCategory = (category) => {
        setShowCategories(false);
        const modifiedCategory =  helper.setHyphenBetweenWords(category);
        history.replace(`/books/category=${modifiedCategory}&publisher=all`);
    };

    const categoriesList = () => {
        return (
            <div className="options-list books">
                <button 
                    key={"all-categories"}
                    className="buttons" 
                    onClick={e => onSelectCategory("all")}
                >
                    {ALL_BOOKS}
                </button>
                {categories && categories.map((category, index) => (
                    <button 
                        key={index}
                        className="buttons"
                        onClick={e => onSelectCategory(e.target.innerText)}
                    >
                        {category}
                    </button>
                ))}
            </div>
        )
    };

    const onSelectPublisher = (publisher) => {
        setShowPublisher(false);
        const modifiedPublisher = helper.setHyphenBetweenWords(publisher);
        history.replace(`/books/category=all&publisher=${modifiedPublisher}`);
    };

    const publishersList = () => {
        return (
            <div className="options-list publishers">
                <button 
                    key={"all-publisher"}
                    className="buttons"
                    onClick={e => onSelectPublisher("all")}
                >
                    {ALL_PUBLISHERS}
                    </button>
                {publishers && publishers.map((publisher, index) => (
                    <button 
                        key={index}
                        className="buttons"
                        onClick={e => onSelectPublisher(e.target.innerText)}    
                    >
                        {publisher}
                    </button>
                ))}
            </div>
        )
    };

    const displayContactView = (publisher) => {
        history.replace("/contact");
    };

    return (
        <nav>
            <button className="home"
                key={"home"}
                onClick={() => {history.replace("/")}}
            >
                {NAVBAR.HOME}
            </button>
            <button className="books"
                key={"books"}
                onMouseOver={() => {setShowCategories(true)}}
                onMouseLeave={() => {setShowCategories(false)}}
            >
                {NAVBAR.BOOKS}
                {showCategories && categoriesList()}
            </button>
            <button className="publisher"
                key={"publisher"}
                onMouseOver={() => {setShowPublisher(true)}}
                onMouseLeave={() => {setShowPublisher(false)}}
            >
                {NAVBAR.PUBLISHERS}
                {showPublisher && publishersList()}
            </button>
            <button 
                key={"content"}
                className="contact"
                onClick={displayContactView}
            >
                {NAVBAR.CONTACT}
            </button>
        </nav>
    )
}










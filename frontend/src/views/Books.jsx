import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import BooksList from "../components/BooksList";
import StayWithUs from "../components/StayWithUs";
import { BOOKS_SITE } from "../constants/Language_de";
import allBooks from "../data/allBooks.json";
import Message from "../components/Message";
import helper from "../service/helper";
// import API from "../service/API";

export default function Books() {
    const history = useHistory();

    const [data, setData] = useState([allBooks]);
    const [categories, setCategories] = useState([]);
    const [publishers, setPublishers] = useState([]);
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("");


    useEffect(() => {
        const getAllCategory = [...new Set(allBooks.books.map((book) => book.category))];
        const getAllPublisher = [...new Set(allBooks.books.map((book) => book.publisher))];
        setCategories(getAllCategory);
        setPublishers(getAllPublisher);
    }, []);

    /* useEffect(() => {
        setSelectedCategory(category);
        setSelectedPublisher(publisher);
        
        const fetchData = async () => {
            //get all books from database.
            const response = await API.getBooks();
            if(category !== "all"){
                const modifiedCategory = category.replace(/-/g, " ");
                const booksfromselectedCategory = [...new Set(response.data.filter((book) => book.category === modifiedCategory))];
                setData(booksfromselectedCategory);
            } else if (publisher !== "all") {
                const modifiedPublisher = publisher.replace(/-/g, " ");
                const booksfromselectedPublisher = [...new Set(response.data.filter((book) => book.publisher === modifiedPublisher))];
                setData(booksfromselectedPublisher);
            } else {
                setData(response.data);
            }

            //get all categories to display on the left side.
            const getAllCategory = [...new Set(response.data.map((book) => book.category))];
            setCategories(getAllCategory);
            //get all publishers to display on the left side.
            const getAllPublisher = [...new Set(response.data.map((book) => book.publisher))];
            setPublishers(getAllPublisher);
        }
        fetchData();

    }, [category, publisher]); */

    //get all books from the selected category.
    const onSelectedCategory = async (category) => {
        const modifiedCategory = helper.setHyphenBetweenWords(category);
        history.replace(`/books/category=${modifiedCategory}&publisher=all`);
    };
    
    const onSelectedPublisher = async (publisher) => {
        const modifiedPublisher = helper.setHyphenBetweenWords(publisher);
        history.replace(`/books/category=all&publisher=${modifiedPublisher}`);
    };

    const resetFilter = async () => {
        history.replace(`/books/category=all&publisher=all`);
    };

    const onSearch = (searchTerm) => {
        helper.searchFunction(searchTerm, allBooks, setData, setMessage, setMessageType);
    };
    
    const onResetSearch = () => {
        helper.resetSearch(allBooks, setData);
    };

    // the left side, which displays the categories and publishers.
    const leftSide = () => {
        return (
            <div className="left-side">
                <section>
                    <div className="shop-by">{BOOKS_SITE.BY_CATEGORY}</div>
                    <button className="category" onClick={resetFilter}>All Categories</button>
                    {categories && categories.map((category, index) => (
                        <button 
                            key={index}
                            className="category" 
                            onClick={e => onSelectedCategory(e.target.innerText)}
                        >
                            {category}
                        </button>
                    ))}
                </section>
                <section>
                    <div className="shop-by">{BOOKS_SITE.BY_PUBLISHER}</div>
                    <button className="category" onClick={resetFilter}>All Publischers</button>
                    {publishers && publishers.map((publisher, index) => (
                        <button 
                            key={index}
                            className="publisher" 
                            onClick={e => onSelectedPublisher(e.target.innerText)}
                        >
                            {publisher}
                        </button>
                    ))}
                </section>
            </div>
        );
    };

    return (
        <main className="books-view">
            <Header search={onSearch} resetSearch={onResetSearch} />
            {message && <Message type={messageType} text={message} setMessage={setMessage} />}
            <div className="books-part">
                {leftSide()}
                <BooksList 
                    data={data && data} 
                    // title="books"
                    setMessage={setMessage} 
                    setMessageType={setMessageType} 
                />
            </div>
            <div className="under-part">
                <StayWithUs setMessage={setMessage} setMessageType={setMessageType} />
                <Footer />
            </div>
        </main>
    )
};

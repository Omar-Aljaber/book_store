import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import BooksList from "../components/BooksList";
import StayWithUs from "../components/StayWithUs";
import { BOOKS_SITE } from "../constants/Language_de";
import API from "../service/API";
// import allBooks from "../data/allBooks.json";

export default function Books() {
    const history = useHistory();
    //get selected category und publisher
    const { category, publisher } = useParams();
    const [data, setData] = useState([]);
    const [categories, setCategories] = useState([]);
    const [publishers, setPublishers] = useState([]);
    const [/*selectedCategory*/, setSelectedCategory] = useState(category);
    const [/*selectedPublisher*/, setSelectedPublisher] = useState(publisher);

    useEffect(() => {
        setSelectedCategory(category);
        setSelectedPublisher(publisher);
        
        const fetchData = async () => {
            //get all books from database.
            const response = await API.getBooks();
            if(category !== "all-books"){
                const modifiedCategory = category.replace(/-/g, " ");
                const booksfromselectedCategory = [...new Set(response.data.filter((book) => book.category === modifiedCategory))];
                setData(booksfromselectedCategory);
            } else if (publisher !== "all-books") {
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


    }, [category, publisher]);

    //get all books from the selected category.
    const onSelectedCategory = async (category) => {
        const modifiedCategory = category.replace(/ /g, "-");
        history.replace(`/books/category=${modifiedCategory}&publisher=all-books`);
        setSelectedCategory(category);
    };
    
    //get all books from the selected publisher.
    const onSelectedPublisher = async (publisher) => {
        setSelectedPublisher(publisher);
        const modifiedPublisher = publisher.replace(/ /g, "-");
        history.replace(`/books/category=all-books&publisher=${modifiedPublisher}`);
    };

    //reset all books
    const resetAllBooks = async () => {
        history.replace(`/books/category=all-books&publisher=all-books`);
    };

    // the left side, which displays the categories and publishers.
    const leftSide = () => {
        return (
            <div className="left-side">
                <section>
                    <div className="by-with">{BOOKS_SITE.BY_CATEGORY}</div>
                    <button className="category" onClick={resetAllBooks}>All Books</button>
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
                    <div className="by-with">{BOOKS_SITE.BY_PUBLISHER}</div>
                    <button className="category" onClick={resetAllBooks}>All Books</button>
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
        <main>
            <Header />
            <div className="books-view">
                {leftSide()}
                <BooksList data={data.length && data} /*title="books"*/ />
            </div>
            <div className="under-part">
                <StayWithUs />
                <Footer />
            </div>
        </main>
    )
};

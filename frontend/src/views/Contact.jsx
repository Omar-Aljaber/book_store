import React, { useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { BUTTONS_TITLE, LABEL, TITLES } from "../constants/Language_de";


export default function Contact() {

    useEffect(() => {
        window.scrollTo({top: 0, left: 0, behavior: "smooth"});
    }, []);

    return (
        <main>
            <Header/>
            <div className="contact-view">
                <div className="title">{TITLES.CONTACT_US}</div>
                <form>
                    <div className="inputs">
                        <div>
                            <label>{LABEL.NAME}</label>
                            <input type="text" required/>
                        </div>
                        <div>
                            <label>{LABEL.EMAIL}</label>
                            <input type="email" required/>
                        </div>
                    </div>
                    <div className="message-text">
                        <label>{LABEL.MESSAGE}</label>
                        <textarea required></textarea>
                    </div>
                    <button>{BUTTONS_TITLE.SUBMIT}</button>
                </form>
            </div>
            <Footer />
        </main>
    )
}



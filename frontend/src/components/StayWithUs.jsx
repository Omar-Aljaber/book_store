import React from "react";
import subscribePhoto from "../style/imgs/books.png";
import { BUTTONS_TITLE, SUBSCRIBE_PART } from "../constants/Language_de";


export default function StayWithUs(props){

    return (
        <section className="stay-with-us">
            <div className="left-part">
                <img src={subscribePhoto} alt="SUBSCRIBE PHOTO" width={450}/>
            </div>
            <div className="right-part">
                <div className="title">{SUBSCRIBE_PART.TITLE}</div>
                <div className="description">{SUBSCRIBE_PART.TEXT}</div>
                <form action="">
                    <input type="email" placeholder="Enter Your Email Address"/>
                    <button>{BUTTONS_TITLE.SUBSCRIBE}</button>
                </form>
            </div>
        </section>
    );
};

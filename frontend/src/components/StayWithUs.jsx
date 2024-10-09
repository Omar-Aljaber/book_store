import React, { useState } from "react";
import subscribePhoto from "../style/imgs/books.png";
import { BUTTONS_TITLE, MESSAGES, SUBSCRIBE_PART } from "../constants/Language_de";

/**
 * Creates a section for newsletter subscriptions.
 *
 * @returns StayWithUs section.
 */
export default function StayWithUs(props){

    const [subscribeEmail, setSubscribeEmail] = useState();

    const onSubscribe = (e) => {
        e.preventDefault();
        props.setMessage(MESSAGES.TEXT.SUBSCRIBE);
        props.setMessageType(MESSAGES.TYPE.CONFIRM);
        setSubscribeEmail("");
    };

    return (
        <section className="stay-with-us">
            <div className="left-part">
                <img src={subscribePhoto} alt="SUBSCRIBE PHOTO" width={500}/>
            </div>
            <div className="right-part">
                <div className="title">{SUBSCRIBE_PART.TITLE}</div>
                <div className="description">{SUBSCRIBE_PART.TEXT}</div>
                <form onSubmit={(e) => {onSubscribe(e)}}>
                    <input type="email" value={subscribeEmail} placeholder="Enter Your Email Address" required/>
                    <button>{BUTTONS_TITLE.SUBSCRIBE}</button>
                </form>
            </div>
        </section>
    );
};

import React from "react";

/**
 * Creates a window that displays a message for the user
 *
 * @param props type, text, setMessage: function to set the message
 * @returns user message window.
 */
export default function Message(props) {
    
    let color;
    let title;
    switch(props.type) {
        case "confirm":
            color = "green";
            title = "Successfully";
            break;
        case "info":
            color = "gray";
            title = "Information";
            break;
        case "error":
            color = "red";
            title = "Error";
            break;
        case "notFound":
            color = "red";
            title = "Book not found!";
            break;
        case "removed":
            color = "red";
            title = "Book removed!";
            break;
        default:
            color = "green";
            title = "Successfully";
    };

    setTimeout(() => {
        if(props.text) {
            props.setMessage("");
        }
    }, [3000]);

    return (
        <div className="message">
            <div className={color}>
                <div className="title">
                    {title}
                </div>
                <div className="text">
                    {props.text}
                </div>
            </div>
        </div>
    );
};

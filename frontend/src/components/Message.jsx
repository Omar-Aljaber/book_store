import React from "react";

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

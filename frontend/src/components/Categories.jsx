import React from "react";
import { CATEGORY } from "../constants/Language_de";

export default function Categories() {

    return (
        <div className="books-button-hover">
            <div>{CATEGORY.ACADEMIC}</div>
            <div>{CATEGORY.ARTS}</div>
            <div>{CATEGORY.BIOGRAPHY}</div>
            <div>{CATEGORY.CHILDREN}</div>
            <div>{CATEGORY.COOKING}</div>
            <div>{CATEGORY.FANTASY}</div>
            <div>{CATEGORY.HISTORY}</div>
            <div>{CATEGORY.NOVEL}</div>
            <div>{CATEGORY.POLITICAL}</div>
            <div>{CATEGORY.RELIGION}</div>
            <div>{CATEGORY.SCINCE}</div>
            <div>{CATEGORY.SPORTS}</div>
            <div>{CATEGORY.COMICS}</div>
        </div>
    )
};

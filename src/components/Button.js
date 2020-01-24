import React from "react";

export const Button = props => {
    return <button
    onClick={()=> {console.log("hi")}}>
        {props.title}</button>;
};
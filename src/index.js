import "babel-polyfill";
import React from "react";
import ReactDom from "react-dom";
import "./index.css"
import Basic from "./route/basic/basic"

ReactDom.render(
    <Basic/>,
    document.getElementById("root")
)
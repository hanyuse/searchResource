import React from "react";
import Logo from "../../components/logo/logo"
import img from "../../asset/imgs/logo.jpg";
import Search from "../../components/search/search";

import css from "./basic.css";

export default class Basic extends React.PureComponent{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div className={css.container}>
                <div className={css.logo}>
                    <Logo src={img}></Logo>
                </div>
                <Search></Search>
            </div>
        )
    }
}
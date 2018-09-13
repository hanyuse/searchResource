import React from "react";
import Search from "../../components/search/search";
import css from "./basic.css";

export default class Basic extends React.PureComponent{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div className={css.container}>
                <Search/>
            </div>
        )
    }
}
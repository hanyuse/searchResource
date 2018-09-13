import React from "react";
import css from "./logo.css"
/**
 * logo图片
 */
export default class Logo extends React.PureComponent{
    constructor(props){
        super(props);
    }

    render(){
        return <img className={css.img} src={this.props.src}/>
    }
}
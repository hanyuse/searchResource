import React from "react";
import css from "./searchButton.css"

/**
 * 按钮
 * 高度100%；宽度根据文本内容确认
 * 点击事件由父组件通过props传递
 */
export default class SearchButton extends React.PureComponent{
    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    //按钮点击事件，调用父组件的点击方法
    handleClick(e){
        e.preventDefault();
        this.props.click&&this.props.click();
    }

    render(){
        return (
            <button className={css.search} onClick = {this.handleClick}>{this.props.children}</button>
        )
    }
}
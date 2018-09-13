import React from "react";
import css from "./input.css";

/**
 * 搜索框，使用受控组件，change事件除了更改自身的state，也要调用上级传入的props中的change事件方法以改动上级的state
 * 高度100%，宽度拉伸至剩余空间，所以具体长宽有props确定
 */
export default class Input extends React.PureComponent{
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this)
    }

    //change事件发生后父组件是否需要更新状态，根据传入的props确定
    handleChange(e){
        e.preventDefault();
        const {value} = e.target;
        this.props.changeShow&&this.props.changeShow(value);
    }

    render(){
        return (
            <input className={css.search}  value={this.props.value} onChange={this.handleChange} placeholder="输入关键字，比如怪物、装备以及想问的问题" maxLength="20"/> 
        )

    }
}
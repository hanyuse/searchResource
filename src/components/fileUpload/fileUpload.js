import React from "react";
import css from "./fileUpload.css";


export default class File extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            txt:null
        }
        this.handleChange =  this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e){
        e.preventDefault();
        let obj = e.target;
        let txt = obj.previousSibling
        let file = obj.nextSibling
        this.setState({
            txt
        })
        file.click();

    }

    handleChange(e){
        let obj = e.target;
        let txt = this.state.txt;
        txt.value = obj.value
    }


    render(){
        return (
            <div className={css.container}>
                <input name={this.props.idx}   readOnly/><button onClick={this.handleClick}>添加文件</button>/>
            </div>
        )
    }
}
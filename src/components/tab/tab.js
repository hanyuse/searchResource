import React from "react";
import css from "./tab.css";
import Nav from "../pagination/pagination";

export default class Tab extends React.PureComponent{
    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e){
        e.preventDefault();
        const obj = e.target;
        const index = obj.getAttribute("idx");
        const {question,answer,id} = this.props.arr[index];
        this.props.click(index,question,answer,id);
    }
    render(){
        let body = this.props.arr.map((obj,index)=>{
            let answer = obj.answer;
            if(answer){
                answer = answer.length>15?answer.substr(0,15)+"..." : answer;
            }
            return (
                <tr key={index}>
                    <td>
                        <div>{index+1}</div>
                    </td>
                    <td>
                        <div>{obj.question}</div>
                    </td>
                    <td>
                        <div>{answer}</div>
                    </td>
                    <td>
                        <button idx={index} className={css.btn} onClick={this.handleClick}>编辑</button>
                    </td>
                </tr>
            )
        })
        return (
            <table className={css.tab} cellPadding="0" cellSpacing="0">
                <thead>
                    <tr>
                        <td style={{width:"10%"}}>
                            序号
                        </td>
                        <td style={{width:"25%"}}>
                            问题
                        </td>
                        <td style={{width:"50%"}}>
                            答案
                        </td>
                        <td  style={{width:"15%"}}>
                            操作
                        </td>
                    </tr>
                </thead>
                <tbody>
                    {body}
                </tbody>
                <tfoot style={{display:this.props.states.foot?"":"none"}}>
                    <tr>
                        <td colSpan="4">
                            <Nav states={this.props.states} handler={this.props.handler}/>
                        </td>
                    </tr>
                </tfoot>
            </table>
        )
    }
}
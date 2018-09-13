import React from "react";
import css from "./tab.css";

export default class Tab extends React.PureComponent{
    constructor(props){
        super(props);
        this.state = {
            arr:[{name:"1n1ihaoma",value:"1我很好啊"},{name:"2nihaoma",value:"2我很好啊"},{name:"3nihaoma",value:"4我很好啊"}]
        }
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e){
        e.preventDefault();
        const obj = e.target;
        const index = obj.getAttribute("idx");
        const {name,value} = this.state.arr[index];
        this.props.click(index,name,value);
    }
    render(){
        let body = this.state.arr.map((obj,index)=>{
            return (
                <tr key={index}>
                    <td>
                        <div>{index+1}</div>
                    </td>
                    <td>
                        <div>{obj.name}</div>
                    </td>
                    <td>
                        <div>{obj.value}</div>
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
                        <td style={{width:"20%"}}>
                            问题
                        </td>
                        <td style={{width:"60%"}}>
                            答案
                        </td>
                        <td  style={{width:"10%"}}>
                            操作
                        </td>
                    </tr>
                </thead>
                <tbody>
                    {body}
                </tbody>
            </table>
        )
    }
}
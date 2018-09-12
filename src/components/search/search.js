import React from "react";
import className from "classnames";
import styles from "./search.css";
console.log(styles);
export default class SearchInput extends React.PureComponent{
    constructor(props){
        super(props);
        this.state = {
            show:false,
            value:"",
            hintArray:[]
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleChange(e){
        this.setState({
            hintArray:[]
        })
        const value = e.target.value;
        let show ;
        let arr = [];
        if(value.trim()!=""){
            show = true;
            fetch("http://www.baidu.com",{
                method:"POST",
                mode: "no-cors"
            }).then((res)=>{
                arr = [1,2,3,4,5,6,7,8,9,90,0,1,2,3,4,34,23,423,4,324,23,423,4,23,423,4,32,423,4,23,423,423,4,23,423,4]
                this.setState({
                    hintArray:arr
                })
            })
        }else{
            show = false;
        }
        
       


        this.setState({
            show,
            value
        })
    }

    handleClick(e){
        const obj = e.target;
        this.setState({
            value:obj.getAttribute("val"),
            show:false
        })
    }

    render(){
        const style = className(styles.box_border,styles.box,this.state.show?styles.show:styles.hidden);
        const list = this.state.hintArray.map((val,index)=>{
            return <li key={index} onClick={this.handleClick} val={val}>名称：{val}</li>
        })
        return (
            <div className={styles.container}>
                <div className={styles.box}>
                    <input value={this.state.value} onChange={this.handleChange} className={styles.input} placeholder="输入关键字，比如怪物、装备以及想问的问题"/>
                    <button className={styles.search}>搜 索</button>
                   
                </div>
                <div className={style} >
                    <div className={styles.hint}>
                        <ul>
                            {list}
                        </ul>
                    </div>
                </div>
                <div className={styles.box}>
                    123123123123
                </div>
            </div>
        )
    }
}
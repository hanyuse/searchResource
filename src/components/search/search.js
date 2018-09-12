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
            hintArray:[],
            answer:""
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleChange(e){
        const value = e.target.value;
        let show ;
        let arr = [];
        if(value.trim()!=""){
            show = true;
            fetch("http://www.baidu.com",{
                method:"POST",
                mode: "no-cors"
            }).then((res)=>{
                arr = [
                    {name:"倚天屠龙记",answer:"fshakhfksda\/nhkfhsdakfhkadshfksahkdf"},
                    {name:"倚天屠龙记",answer:"fshakhfksdahkfhsdakfhkadshfksahkdf"},
                    {name:"倚天屠龙记",answer:"fshakhfksdahkfhsdakfhkadshfksahkdf"},
                    {name:"倚天屠龙记",answer:"fshakhfksdahkfhsdakfhkadshfksahkdf"},
                    {name:"倚天屠龙记",answer:"fshakhfksdahkfhsdakfhkadshfksahkdf"},
                    {name:"倚天屠龙记",answer:"fshakhfksdahkfhsdakfhkadshfksahkdf"}
                ]
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
        const idx =  obj.getAttribute("idx")
        const {answer} = this.state.hintArray[idx]
        this.setState({
            value:obj.getAttribute("val"),
            show:false,
            answer
        })
    }

    render(){
        const style = className(styles.box_border,styles.box,this.state.show?styles.show:styles.hidden);
        const list = this.state.hintArray.map((val,index)=>{
            return <li key={index} onClick={this.handleClick} val={val.name} idx={index}>名称：{val.name}</li>
        })
        return (
            <div className={styles.container}>
                <div className={styles.box}>
                    <input maxLength="20" value={this.state.value} onChange={this.handleChange} className={styles.input} placeholder="输入关键字，比如怪物、装备以及想问的问题"/>
                    <button className={styles.search}>搜 索</button>
                </div>
                <div className={style} >
                    <div className={styles.hint}>
                        <ul>
                            {list}
                        </ul>
                    </div>
                </div>
                <div className={styles.answer}>
                    {this.state.answer}
                </div>
            </div>
        )
    }
}
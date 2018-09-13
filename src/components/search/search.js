import React from "react";
import className from "classnames";
import css from "./search.css";
import Logo from "../logo/logo";
import img from "../../asset/imgs/logo.jpg";
import Input from "../input/input";
import SearchButton from "../searchButton/searchButton";
import ListItem from "../listItem/listItem";

export default class SearchInput extends React.PureComponent{
    constructor(props){
        super(props);
        this.state = {
            show:false,    //控制提示框是否展示
            value:"",//输入框值（问题）
            hintArray:[],//提示框数据
            result:""//答案
        }
        // this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.changeShow = this.changeShow.bind(this);
        this.searchResult = this.searchResult.bind(this);
    }

    //设置show状态，控制提示框是否展示
    changeShow(val){
        //输入框值变更后将答案清空，并同步value值
        this.setState({
            value:val,
            result:""
        })
        //根据关键字搜索，未搜索到则不出提示框
        if(val&&val.trim()!=""){
            fetch("https://www.baidu.com",{
                mode: "no-cors"
            }).then((res)=>{
                this.setState({
                    show:true,
                    hintArray:[{name:"测试数据1",value:"lalalal"},{name:"测试数据2",value:"sssfdfsdafs"}]
                })
            })
        }else{
            this.setState({
                show:false
            })
        }
        //修改input的值

        
    }

    /**
     * 处理提示框点击事件
     */
    handleClick(e){
        this.setState({
            show:false
        })
        e.preventDefault();
        const obj = e.target;
        const idx =  obj.getAttribute("idx")
        const {name,value} = this.state.hintArray[idx]
        this.setState({
            value:name,
            result:value
        })
    } 

    searchResult(){
        //点击搜索，先隐藏提示框,并且清空答案区域
        this.setState({
            show:false,
            result:""
        })
        const {value} = this.state;
        //输入框有值，则发送请求查询答案
        if(value&&value.trim()!=""){
            this.setState({
                result:"lalalalalalalalallaalallala"
            })
        }else{
            this.setState({
                result:<font color='red'>请先输入您要查询的问题！</font>
            })
        }
    }

    
    render(){
        
        const list = this.state.hintArray.map((obj,index)=>{
            return <li key={index}  val={obj.name} idx={index}>名称：{obj.name}</li>
        })
        const hintbox = <div className={css.box}><ListItem click={this.handleClick}>{list}</ListItem></div>
        return (
            <div className={css.container}>
                {/* logo */}
                <div className={css.logo}>
                    <Logo src={img}/>
                </div>
                {/* 搜索框 */}
                <div className={css.search}>
                    <Input value={this.state.value} changeShow={this.changeShow}/>
                    <SearchButton click={this.searchResult}>搜 索</SearchButton>
                </div>
                {/* 提示框,根据input的value值来判断显示还是影藏 */}
                <div className={css.hint}>
                    {this.state.show && hintbox}
                </div>
                {/* 答案展示区域 */}
                <div className={css.result}>
                    <div>
                        {this.state.result}
                    </div>
                </div>
            </div>
        )
    }
}
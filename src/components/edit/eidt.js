import React from "react";
import css from "./edit.css";
import Logo from "../logo/logo";
import img from "../../asset/imgs/logo.jpg";
import Input from "../input/input";
import SearchButton from "../searchButton/searchButton";
import ListItem from "../listItem/listItem";
import Tab from "../tab/tab";

export default class Edit extends React.PureComponent{
    constructor(props){
        super(props);
        this.state ={
            value:"",
            show:false,
            hintArray:[],
            editShow:false,    //控制编辑框显示隐藏
            editQuestion:"",
            editAnswer:""
        }
        this.handleClick = this.handleClick.bind(this);
        this.changeShow = this.changeShow.bind(this);
        this.searchResult = this.searchResult.bind(this);
        this.handleEditClick = this.handleEditClick.bind(this);
        this.save = this.save.bind(this);
        this.delete = this.delete.bind(this);
        this.editAnswer = this.editAnswer.bind(this);
        this.editQuestion = this.editQuestion.bind(this);
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

    searchResult(){
        //点击搜索，先隐藏提示框,并且清空答案区域
        this.setState({
            show:false,
        })
        const {value} = this.state;
        //输入框有值，则发送请求查询答案
        if(value&&value.trim()!=""){
            /* this.setState({
                result:"lalalalalalalalallaalallala"
            }) */
        }else{
            /* this.setState({
                result:<font color='red'>请先输入您要查询的问题！</font>
            }) */
        }
    }

    /**
     * 列表点击事件
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
        })
    }

    //点击编辑按钮
    handleEditClick(index,name,value){
        this.setState({
            editShow:true,
            editQuestion:name,
            editAnswer:value
        })
    }
    //保存
    save(e){
        e.preventDefault();
        this.setState({
            editShow:false
        })
    }

    delete(e){
        e.preventDefault();
        this.setState({
            editShow:false
        }) 
    }

    editQuestion(e){
        e.preventDefault();
        this.setState({
            editQuestion:e.target.value
        }) 
    }

    editAnswer(e){
        e.preventDefault();
        this.setState({
            editAnswer:e.target.value
        }) 
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
                   {/*  <Logo src={img}/> */}
                </div>
                {/* 搜索框 */}
                <div className={css.search}>
                    <Input value={this.state.value} changeShow={this.changeShow}/>
                    <SearchButton click={this.searchResult}>搜 索</SearchButton>
                </div>
                {/* 提示框 */}
                <div className={css.hint}>
                    {this.state.show && hintbox}
                </div>
                {/* 编辑框展示数据 */}
                <div className={css.table}>
                    <Tab click={this.handleEditClick}/>
                    {/* 编辑框容器 */}
                    {this.state.editShow && (<div className={css.edit}>
                        <div className={css.input_box}>
                            <input value={this.state.editQuestion} className={css.edit_input} onChange={this.editQuestion}/>
                        </div>
                        <div className={css.text_box}>
                            <textarea value={this.state.editAnswer} className={css.edit_area} onChange={this.editAnswer}></textarea>
                        </div>
                        <div className={css.btn_box}>
                            <button onClick={this.save}>
                                保存
                            </button>
                            <button onClick={this.delete}>
                                删除
                            </button>
                        </div>
                    </div>)}
                </div>
            </div>
        )
    }
}
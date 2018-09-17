import React from "react";
import css from "./edit.css";
import Logo from "../logo/logo";
import img from "../../asset/imgs/logo.png";
import Input from "../input/input";
import SearchButton from "../searchButton/searchButton";
import ListItem from "../listItem/listItem";
import Tab from "../tab/tab";
import Add from "../add/add";
import Importent from "../importTab/importTab";
import request,{baseUrl,updateArray} from "../tool/Tool";

export default class Edit extends React.PureComponent{
    constructor(props){
        super(props);
        this.state ={
            value:"",
            show:false, //暂时隐藏提示框功能
            hintArray:[],
            data:[],//列表展示数据
            editShow:false,    //控制编辑框显示隐藏
            editQuestion:"",
            editAnswer:"",
            editId:"",
            add:false,  //是否为增加，默认否 
            pagination:{}, //分页使用
            foot:false, //是否展示分页按钮
            importTab:false //是否展示导入页面
        }
        this.handleClick = this.handleClick.bind(this);
        this.changeShow = this.changeShow.bind(this);
        this.searchResult = this.searchResult.bind(this);
        this.handleEditClick = this.handleEditClick.bind(this);
        this.add = this.add.bind(this);
        this.save = this.save.bind(this);
        this.delete = this.delete.bind(this);
        this.cancel = this.cancel.bind(this);
        this.editAnswer = this.editAnswer.bind(this);
        this.editQuestion = this.editQuestion.bind(this);
        this.updateState = this.updateState.bind(this);
    }

      //设置show状态，控制提示框是否展示
      changeShow(val){
        //输入框值变更后将答案清空，并同步value值
        this.setState({
            value:val,
            result:"",
            foot:false,
            importTab:false
        })
        //根据关键字搜索，未搜索到则不出提示框
        if(val&&val.trim()!=""){
            const url = `${baseUrl}/questions/search?wd=${val.trim()}`;
            request(url,{}).then((data)=>{
                if(Array.isArray(data)){
                    let newArray = []
                   newArray = data.length>20?data.slice(0,20):data; 
                   this.setState({
                        //show:true,
                        data:newArray
                    })
                }
            })    
        /*     fetch("https://www.baidu.com",{
                mode: "no-cors"
            }).then((res)=>{
                this.setState({
                    //show:true, //暂时屏蔽提示框功能
                    hintArray:[{name:"测试数据1",value:"lalalal"},{name:"测试数据2",value:"sssfdfsdafs"}]
                })
            }) */
        }else{
            this.setState({
                //show:true,
                data:[]
            })  
        }
        //修改input的值
    }

    //传入子组件供修改
    updateState(obj){
        this.setState({
            ...this.state,
            ...obj
        })
    }

    searchResult(){
        //点击搜索，先隐藏提示框,并且清空答案区域
        this.setState({
            //show:false,
            editShow:false,
            foot:true
        })
        const url = `${baseUrl}/questions?pageNum=1&pageSize=15`;
        request(url,{
            method:"GET"
        }).then((data)=>{
            this.setState({
                pagination:data,
                data:data.list
            })
        })
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
    handleEditClick(index,editQuestion,editAnswer,editId){
        this.setState({
            editShow:true,
            editQuestion,
            editAnswer,
            editId
        })
    }
    //增加
    add(e){
        e.preventDefault();
        if(this.state.editQuestion.trim()==""||this.state.editAnswer.trim()==""){
            return;
        }
        let url = `${baseUrl}/questions`;
        request(url,{
            method:"POST",
            body:{
                question:this.state.editQuestion,
                answer:this.state.editAnswer
            }
        }).then((data)=>{
            if(data!=-1){
                this.setState({
                    foot:false,
                    editQuestion:"",
                    editAnswer:"",
                    data:[{...data}],
                    add:false,
                    editShow:false
                })
            }
        })

    }
    //修改后保存
    save(e){
        e.preventDefault();
        let url = `${baseUrl}/questions/${this.state.editId}`;
        request(url,{
            method:"PUT",
            body:{
                question:this.state.editQuestion,
                answer:this.state.editAnswer
            }
        }).then((data)=>{
            if(data!=-1){
                alert("modify")
                //保存后清空编辑的三个数据项
                this.setState({
                    data:updateArray({...data},this.state.data,"UPDATE"),
                    editShow:false,
                    editAnswer:"",
                    editQuestion:"",
                    editId:""
                })
            }
        })
    }

    delete(e){
        e.preventDefault();
        this.setState({
            editShow:false
        })
        let url = `${baseUrl}/questions/${this.state.editId}`;
        request(url,{
            method:"DELETE",
        }).then(res=>{
            if(res!=-1){
                alert("删除成功");
                //保存后清空编辑的三个数据项
                let {foot,data,editId} = this.state;
                let arr = [];
                if(foot){
                    //分页进入的
                    let {pageNum} = this.state.pagination;
                    const url = `${baseUrl}/questions?pageNum=${pageNum}&pageSize=15`;
                    request(url,{
                        method:"GET"
                    }).then((data)=>{
                        this.setState({
                            pagination:data,
                            data:data.list,
                            editShow:false,
                            editAnswer:"",
                            editQuestion:"",
                            editId:""
                        })
                    })
                }else{
                    arr = data.filter((obj)=>{
                        return obj.id != editId
                    })
                    this.setState({
                        data:arr,
                        editShow:false,
                        editAnswer:"",
                        editQuestion:"",
                        editId:""
                    })
                }
            }
        })

    }
    //取消编辑
    cancel(e){
        e.preventDefault();
        this.setState({
            editShow:false,
            editAnswer:"",
            editQuestion:"",
            editId:"",
            add:false
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

    //点击增加后弹出增加编辑框
    addTabClick(){
        this.setState({
            add:true,
            editShow:true
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
                    <Logo  src={img}/>
                </div>
                {/* 搜索框 */}
                <div className={css.search}>
                    <Input value={this.state.value} changeShow={this.changeShow}/>
                    <SearchButton click={this.searchResult}>查看所有</SearchButton>
                </div>
                {/* 提示框 
                <div className={css.hint}>
                    {this.state.show && hintbox}
                </div>*/}
                {/* 增加和导入按钮 */}
                <div className={css.add}>
                    <Add addClick={this.addTabClick.bind(this)} handler={this.updateState}></Add>
                </div>
                {/* 编辑框展示数据 */}
                <div className={css.table}>
                    <Tab states = {this.state} handler={this.updateState} arr={this.state.data} click={this.handleEditClick}/>
                    {/* 编辑框容器 */}
                    {this.state.editShow && (<div className={css.edit}>
                        <div className={css.input_box}>
                            <input value={this.state.editQuestion} className={css.edit_input} onChange={this.editQuestion}/>
                        </div>
                        <div className={css.text_box}>
                            <textarea value={this.state.editAnswer} className={css.edit_area} onChange={this.editAnswer}></textarea>
                        </div>
                        <div className={css.btn_box}>
                            <button className={css.bt} onClick={this.add} style={{display:this.state.add?"":"none"}}>
                                确定
                            </button>
                            <button className={css.bt} onClick={this.save} style={{display:this.state.add?"none":""}}>
                                保存
                            </button>
                            <button className={css.bt} onClick={this.delete} style={{display:this.state.add?"none":""}}>
                                删除
                            </button> 
                            <button className={css.bt} onClick={this.cancel} >
                                取消
                            </button>
                        </div>
                    </div>)}

                    {/* 导入窗口 */}
                    {this.state.importTab && <Importent states = {this.state} handler={this.updateState}/> }           

                </div>

            </div>
        )
    }
}
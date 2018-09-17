import React from "react";
import css from "./importTab.css";

import request,{baseUrl}  from "../tool/Tool";

export default class Importent extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            data:[], 
            load:false //是否已经上传过文件
        }
        this.handleChange =  this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.importData = this.importData.bind(this);
        this.close = this.close.bind(this);
        this.delete = this.delete.bind(this);
    }


    
    handleClick(e){
        e.preventDefault();
        let file = document.getElementById("fileUp");
        let {data,load} = this.state;
        console.log()
        if(load){
            this.setState({
                data:[],
                load:false  
            })
        }
        file.click();
    }

    handleChange(e){
        e.preventDefault();
        let obj = document.getElementById("fileUp");
        let value = e.target.value
        if(value!=""){
            let index = value.lastIndexOf("\\");
            value = index==-1?value:value.substring(index+1);
            if (!/\.txt$/.test(value)) {
                alert("只支持txt文本格式");
                return;
            }    

            let item = {
                name:value,
                file:obj.files[0],
                result:""
            }
            let {data} = this.state;
            data.push(item);
            this.setState({
                data
            })
        }
    }
    //上传附件
    importData(e){
        let url = `${baseUrl}/questions/import`;
        let data = this.state.data;
        if(data.length<1){
            alert("请先选择上传文件");
        }
        for(let i=0;i<data.length;i++){
            let file = data[i].file;
            let form = new FormData();
            form.append("file",file);
            request(url,{
                method:"POST",
                body:form
            }).then(res=>{
                if(res!=-1){
                    data[i] = {
                       ...data[i],
                       file:"",
                       result:"上传成功"
                    }
                }else{
                    data[i] = {
                        ...data[i],
                        file:"",
                        result:"上传失败"
                     }
                }
                this.setState({
                    data,
                    load:true
                })
            })
        } 
     /*   request(url,{
            method:"POST",
            body:this.state.appendFile
        }).then(data=>{
            console.log(data);
        }) */
        
    }

    //关闭页面
    close(e){
        e.preventDefault();
        this.props.handler({importTab:false});
    }

    //删除单个上传文件
    delete(e){
        e.preventDefault();
        let obj = e.target;
        let idx  = obj.getAttribute("idx");
        let arr = this.state.data.filter((value,index)=>{
            return index!=idx; 
        })
        this.setState({
            data:arr
        })
    }
    render(){
        const list = this.state.data.map((obj,index)=>{
            return ( <li className={css.li} key={index}>
                        <span>{obj.name}</span>
                        {obj.result==""?<span idx={index} className={css.close} onClick={this.delete}>×</span>:<font color="red">{obj.result}</font>}
                     </li> )
        });
        return (
            <div className={css.container}>
                <div>
                    <button onClick={this.handleClick}>添加文件</button>
                    <input id="fileUp" onChange={this.handleChange} type='file' style={{display:"none"}}/>
                </div>
                <div className={css.file}>
                    <ul>
                       {list}
                    </ul>
                </div>
                <div className={css.foot}>
                    <button onClick={this.importData}>导入</button> <button onClick={this.close}>关闭</button>
                </div>
            </div>
        )
    }
}
import React from "react";
import css from "./pagination.css";
import request,{baseUrl,updateArray} from "../tool/Tool";
//分页组件
//父组件传入数据，以及父组件修改state方法  props={states,handler}
export default class Nav extends React.Component{
    constructor(props){
        super(props);
        this.requestData = this.requestData.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e){
        e.preventDefault();
        var obj = e.target;
        let num = obj.getAttribute("num");
        if(num<1)return;
        this.requestData(num);
    }

    requestData(pageNum){
        let url = `${baseUrl}/questions?pageNum=${pageNum}&pageSize=15`
        request(url,{
            method:"GET"
        }).then((data)=>{
            if(data!=-1){
                let obj = {
                    data:data.list,
                    pagination:data
                }
                this.props.handler(obj);
            }
        })
    }

    render(){
        const {prePage,pages,total,pageSize,pageNum,nextPage,navigateLastPage,navigateFirstPage} = this.props.states.pagination
        return (
            <div className={css.container}>
                <div>共{total}条信息，当前第{pageNum}页，共{pages}页</div>
                <div className={css.btn}>
                    <button onClick={this.handleClick} num={navigateFirstPage}>首页</button>
                    <button onClick={this.handleClick} num={prePage}>上一页</button>
                    <button onClick={this.handleClick} num={nextPage}>下一页</button>
                    <button onClick={this.handleClick} num={navigateLastPage}>尾页</button>
                </div>
            </div>
        )
    }
}
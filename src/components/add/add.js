import React from "react";
import css from "./add.css";


export default class  Add extends React.PureComponent{
    constructor(props){
        super(props);
        this.open = this.open.bind(this);
    }

    open(e){
        e.preventDefault();
        this.props.handler({importTab:true});
    }

    render(){
        return (
            <div className={css.container}>
                <button onClick={this.props.addClick} className={css.bt}>增加</button>
                <div>
                    {/* <input type="file"/> */}<button className={css.bt} onClick = {this.open}>导入</button>
                </div>
            </div>
        )

    }
}
import React from "react";
import css from "./listItem.css";

/**
 * 列表展示项
 * 由于列表具体按什么规则来展示，取哪个字段等无法确定，交由父级组件确认
 */
export default class ListItem extends React.PureComponent{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div className={css.container}>
                <ul onClick={this.props.click}>
                    {this.props.children}
                </ul>
            </div>
        )
    }
}

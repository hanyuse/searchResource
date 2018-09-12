import React from "react";

/**
 * logo图片
 */
export default class Logo extends React.PureComponent{
    constructor(props){
        super(props);
    }

    render(){
        return <img src={this.props.src}/>
    }
}
import React from "react";
import Edit from "../../components/edit/eidt";
import css from "../basic/basic.css";

export default class EditPanel extends React.PureComponent{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div className={css.container}>
               <Edit/>
            </div>
            
        )
    }
}
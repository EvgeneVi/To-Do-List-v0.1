import React, {Component} from "react";
import "./todo-list-item.css"
export default class TodoListItem extends Component{

    render(){
        const {item, deleteItem, primaryItem, doneItem} = this.props;
        const btnImportandIs = (!item.done)&&(
            <button 
                type="button" 
                className={`btn btn-outline-primary todo-item-btn btn-high ${item.important && "active"}`} 
                onClick={primaryItem}>
                    <i className="fas fa-exclamation"></i>
            </button>
        )
        return(
            <span className="todo-list-item">
                <span className='todo-item-name' onClick={doneItem}>{item.name}</span>

                <button type="button" className="btn btn-outline-danger todo-item-btn btn-del" onClick={deleteItem}>
                    <i className="fas fa-trash-alt"></i>
                </button>
                {btnImportandIs}
            </span>
        )
    }
}
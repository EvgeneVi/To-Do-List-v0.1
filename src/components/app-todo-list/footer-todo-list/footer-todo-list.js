import React, {Component} from 'react';
import "./footer-todo-list.css"

export default class FooterTodoList extends Component{
    constructor(){
        super();

        this.buttons=[{name:"All"},{name:"Active"},{name:"Done"},{name:"Important"}];


        this.setLabel=({target:{value}})=>{ this.props.onSearchItem(value)}

    }
    
    render(){
        
        const {onFilterItem, onPageItem, filter} = this.props;

        const buttons = this.buttons.map(({name})=>{
            const clazz = (name === filter) ? 'btn-primary' : 'btn-outline-primary';
            return( <button 
                    key={name} 
                    type="button" 
                    className={`btn-filter-tasks btn-filter-tasks btn ${clazz}`}
                    onClick={()=>{onPageItem(null); onFilterItem(name)}}>{name}</button>
                    )
        })
        return(
            
            <form className="form-filter-task">
                <input className="input-filter-task form-control" onChange={(e)=>{onPageItem(null); this.setLabel(e)} }></input>
                {buttons}
            </form>
    
        )
    }
}
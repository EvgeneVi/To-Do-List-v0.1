import React, {Component} from 'react';
import TodoListItem from './todo-list-item';
import NoTasksMessage from './no-task-message'
import "./body-todo-list.css"


export default class BodyTodoList extends Component{  
    render(){
        const {
            visibleItems,
            toDoItems,
            allItems,
            onPageItem,
            onActiveFocus,
            numberPage,
            deleteItem,
            primaryItem,
            doneItem
        } = this.props;
            const item = visibleItems.map((item)=>{
                const clazz = (item.done)?'done':(item.important)?'focus-item-li':''
                return(
                    <li key={item.id} className={`task-item-li list-group-item ${clazz}`}> 
                        <TodoListItem item={item}
                            doneItem={()=>doneItem(item.id)}
                            deleteItem={()=>deleteItem(item.id)}
                            primaryItem={()=>primaryItem(item.id)}
                        />
                    </li>)
            });
            const noTasksMessage = (toDoItems.length<=0)?<NoTasksMessage onActiveFocus={onActiveFocus}/>:null
            
            const buttons = allItems.map((taskList,key)=>{
                const Btn = (props)=>{
                    const clef = props.clef;
                    const currentPage = (numberPage===null)?
                        (allItems.length === clef)&&'active'
                        :(numberPage===clef)&&"active"
                    return(
                    <button 
                        onClick={()=>onPageItem(clef)}
                        className={`btn-page btn btn-outline-primary ${currentPage}`} >{clef}
                    </button>)
                };
            
                switch (key) {
                    case 0:return null
                    case 1:return(
                            <React.Fragment key={key}>
                                <Btn key={key} clef={key}/>
                                <Btn key={key+1} clef={key+1}/>
                            </React.Fragment>
                            )    
                    default:return(<Btn key={key+1} clef={key+1}/>)
                };
            })
     
    
        return(
            <div className="body-todo-list">  
                 <ul className="list-group">
                    {item}
                    {noTasksMessage}
                </ul>
                
                {allItems.length>=2&&<div className="buttons-pages">{buttons}</div> }

            </div>
            )
    }
}
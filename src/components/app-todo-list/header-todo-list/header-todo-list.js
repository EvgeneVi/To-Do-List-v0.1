import React, {Component} from 'react';
import "./header-todo-list.css"

export default class HeaderTodoList extends Component {
    constructor(){
        super()
        this.state={
            label:''
        }
        
        this.setLabel=(e)=>{
            this.setState({
                label:e.target.value
            })
        }
        this.textInput = React.createRef();///хранилище ссылок на компоненты DOM
       
    }
    // componentDidMount = () => console.log("компонент на странице") //компонент на странице
    
    componentDidUpdate = () => (this.props.activeLabel) && this.textInput.current.focus() //компонент обновлен
    render(){
        const{nameUser,addItem, onExit}=this.props;
        
        return(
            <div className="header">
                <ul className="userPanel">
                    <li className="exit">
                        <i className="fas fa-sign-out-alt iconicon icon" onClick={onExit}></i>
                    </li>
                    <li className="user-info navBar-item">
                        <i className="fas fa-user-tie icon"></i>
                        <span>{nameUser}</span>
                    </li>
                    <li className="navBar-item">
                        <i className="fas fa-tasks icon "></i>
                        <span>Progress</span>
                    </li>
                </ul>
                <form className="form-create-task">
                    <input className="input-create-task form-control" onChange={this.setLabel} ref={this.textInput} ></input>
                    <button type="button" className="btn-create-tasks btn btn-primary" onClick={()=>addItem(this.state.label)}>Add</button>
                </form>
            </div>
        )
    }
}
import React, {Component} from "react";

import AppAuthorPanel from "../components/app-author-panel"
import AppToDoList from "../components/app-todo-list";
import Loader from "../components/app-author-panel/loader"

import "./app.css"
import "./util.css"

export default class App extends Component {
    constructor(props){
        super(props);
        this.state={
            loader:false,
            storage:null //хранилище (информация о пользователе и его задачи)
        }
        this.updateStorage=(user, toDoItems = null)=>this.setState({storage:{user, toDoItems}})//внесение данных в хранилилще (о пользователе и его задач)
        this.setDataStorage=(name,data)=>localStorage.setItem(name,JSON.stringify(data));//внесение данных в локальное хранилище браузера
        this.getOfStorage = data => JSON.parse(localStorage.getItem(data));//получение данных из хранилища
        this.updateLoader=loader=>this.setState({loader})//загрузчик
        this.onExit=()=>{
            // this.setState({loader:true});
            this.setState({storage:null});
            localStorage.removeItem("User")
        }//выход
        
    }
    componentDidMount(){ 
            const user = this.getOfStorage("User");
            const name = user ? user.name : "";
            const toDoItems = this.getOfStorage(`tasks_${name}`);
            (user) 
                ?(toDoItems) 
                    ? this.updateStorage(user, toDoItems)
                    : this.updateStorage(user)
            :this.setState({storage:null})        
    }
    
    render=()=>{
        const {loader, storage}=this.state;

        const appAuthorPanel = <AppAuthorPanel
            getOfStorage={this.getOfStorage}
            updateStorage={this.updateStorage}
            updateLoader={this.updateLoader}
            setDataStorage={this.setDataStorage}/>

        const content = 
        (loader)?
            <Loader updateLoader={this.updateLoader}/>
        :(storage)?
            storage.user.name && storage.user.password ?  
                <AppToDoList 
                    storage={storage}
                    updateLoader={this.updateLoader}
                    setDataStorage={this.setDataStorage}
                    onExit={this.onExit}
                    />
                : appAuthorPanel
            : appAuthorPanel

        return(
           <div className="limiter">
                <div className="container-wrapper">
                    <div className="wrap-content p-l-55 p-r-55 p-t-65 p-b-50">
                        {content}
                    </div>
                </div>
            </div>            
        )}
    }

import React, {Component} from 'react';
import HeaderTodoList from './header-todo-list';
import BodyTodoList from './body-todo-list';
import FooterTodoList from './footer-todo-list';

import "./app-todo-list.css";



export default class Interface extends Component {
    constructor(){
        super();
        this.state = {
            toDoItems:[],
            numberPage:null,
            searchItem:'',
            filter:'',
            activeLabel: false
        } 
        this.indexItem=(array,key)=>array.findIndex(el=>el.id === key)///функция возвращающая индекс элемента массива с указанным ключем
        this.arrayPartitioning=(arr)=>{//разделение массива на подмассивы
            const newArray = [];
            const dataLength = Math.ceil(arr.length / 7);
            for (let i = 0; i <= dataLength - 1; i++) {
                const index = i * 7;
                newArray.push(arr.slice(index, index + 7));
            }
            return newArray
        }

        this.addItem=(label)=>{////////добавление задачи
            if(label.trim()!==''){this.setState(({toDoItems})=>{
                    const newItem = {name:label, important:false, done:false, id:toDoItems.length+1}
                    return{
                        numberPage:null,
                        toDoItems: [...toDoItems, newItem]
                    } ///добаввление новой задачи в массив задач (существ. массив + новая задача)
                })  
            }
        }
        this.primaryItem=(key)=>{/////выделение задачи
            this.setState(({toDoItems})=>{
                const copyArr = [...toDoItems];///копируем массив
                const id = this.indexItem(copyArr, key) ///находим нужный объект из массива по ключу
                const copyObj = {...toDoItems[id], important: !toDoItems[id].important};///создаем копию найденого объекта и с помощью spread оператора заменяем свойство 
                copyArr[id] = copyObj 
                return{
                    toDoItems:copyArr
                }
            })

        }
        this.doneItem=(key)=>{////Выполнение задачи
           this.setState(({toDoItems})=>{
                const copyArr = [...toDoItems];///копируем массив
                const id = this.indexItem(copyArr, key) ///находим нужный объект из массива по ключу
                const copyObj = {...toDoItems[id], done: !toDoItems[id].done, important: false};///создаем копию найденого объекта и с помощью spread оператора заменяем свойство 
                copyArr[id] = copyObj 
                return{
                    toDoItems:copyArr
                }
            })
        }
        this.deleteItem=(key)=>{ ///удаление задачи
            this.setState(({toDoItems})=>{
                const arr = [...toDoItems.slice(this.indexItem(toDoItems, key) + 1)]
                arr.map((item)=>item.id = item.id-1)
                return{
                    toDoItems:[
                        ...toDoItems.slice(0, this.indexItem(toDoItems, key)),
                        ...arr
                    ]
                }
            })
        }
        this.onSearchItem=(label)=>this.setState({searchItem:label})///определение искомой задачи
        this.onFilterItem=(label)=>this.setState({filter:label})//определение фильтра
        this.onPageItem=(number)=>this.setState({numberPage:number})//определение страницы
        this.onActiveFocus=(boolean)=>this.setState({activeLabel:boolean})
        
        this.search=(allItems, label)=>/// Поиск задачи в главном массиве задач
            (label.trim().length <= 0)?allItems:allItems.filter(({name})=>name.toLowerCase().indexOf(label.toLowerCase())>-1)
        
        this.filterItems=(items,filter)=>{/// сортировка по статусу задачи
            
            switch (filter) {
                case "All":
                    return items
                case "Important":
                     return items.filter(({important})=>important)
                case "Active":
                    return items.filter(({done})=>!done)
                case "Done":
                    return items.filter(({done})=>done)
                default:
                    return items
            }
        }
        this.pageTaskList=(items,number)=>
            (items.length>0)?
                (number===null||number>items.length)?items[items.length-1]:items[number-1]
            :[]
    }
    componentDidMount(){
       
        const {storage:{toDoItems}} = this.props;
        (toDoItems)&&this.setState({toDoItems})
    }
    render=()=>{
        const{toDoItems, searchItem, filter, numberPage, activeLabel} = this.state;
        const {storage:{user:{name}}, updateLoader, setDataStorage, onExit} = this.props;

        (toDoItems.length > 0) ?setDataStorage(`tasks_${name}`, toDoItems): localStorage.removeItem("tasks")
        const filtres = this.filterItems(this.search(toDoItems, searchItem),filter);
        const array = this.arrayPartitioning(filtres);
        const visibleItems=this.pageTaskList(array,numberPage)


        return(

            <div className="app-todo-list">
                <HeaderTodoList 
                    addItem={this.addItem}//функция добаввления задач
                    nameUser={name}
                    onExit={onExit}
                    updateLoader={updateLoader}
                    activeLabel={activeLabel}
                />
                <BodyTodoList 
                    visibleItems={visibleItems}//видимые задачи
                    allItems={array}//все подмасссивы задач соответсвующим фильтрам
                    toDoItems={toDoItems}//все задачи
                    numberPage={numberPage}///номер страницы
                    onPageItem={this.onPageItem}//функция установления номера страницы
                    deleteItem={this.deleteItem}///функция удаления
                    primaryItem={this.primaryItem}///функция выделения 
                    doneItem={this.doneItem}///функция выполнения
                    onActiveFocus={this.onActiveFocus}//активация фокуса на добавлении задач
                />
                <FooterTodoList
                    onPageItem={this.onPageItem}
                    onSearchItem={this.onSearchItem}
                    onFilterItem={this.onFilterItem}
                    filter={filter}
                />
            </div>
        )
    }
}



import React from 'react';
import "./no-task-message.css"

export default (props)=>
    <li className="item-message">
        <div className="img-noTask"></div>
        <div className="text-noTask">
            <span>For add first task click here:</span>
            <button onClick={()=>{
               
                props.onActiveFocus(true)
                }}>Add task</button>
        </div>
    </li>
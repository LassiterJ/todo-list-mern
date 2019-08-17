import React from "react";
import { BrowserRouter as Link } from "react-router-dom";


class TodoList extends React.Component{
    render(){
        return(
            <div>
                <h2>Todo List Header</h2>
                <ul>
                    <li>Test</li>
                    <li>Test</li>
                    <li>Test</li>
                    <li>Test</li>
                </ul>
                <Link to="/create">Create Todo</Link>
            </div>
        )
    }
}

export default TodoList;
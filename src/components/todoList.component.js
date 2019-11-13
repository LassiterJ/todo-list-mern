import React from "react";


export const TodoList = (props) =>{
  
  // Props required: modal, createTodoClick, list
    return (
      <div className="container">
        <h2>Todo List Header</h2>
        <div className="contain-table">
          <table className="striped-table">
            <thead>
              <tr>
                <th>Description</th>
                <th>Responsibility</th>
                <th>Priority</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>{props.list}</tbody>
          </table>
        </div>
        <button onClick={props.createTodo}>Create New Todo</button>
        {props.modal}
      </div>
    );
  }



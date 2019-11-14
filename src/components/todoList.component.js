import React from "react";
import PropTypes from "prop-types";
import Modal from "../components/modal.component"

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
TodoList.propTypes = {
  list: PropTypes.array,
  createTodo: PropTypes.func,
  modal: PropTypes.instanceOf(Modal)
}


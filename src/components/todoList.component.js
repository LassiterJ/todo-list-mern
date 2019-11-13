import React from "react";
export default class TodoList extends React.Component {
  
  // RENDER--------------------------------------------------------------------
  // Props required modal, createTodoClick, list
  render() {
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
            <tbody>{this.props.list}</tbody>
          </table>
        </div>
        <button onClick={this.props.createTodo}>Create New Todo</button>
        {this.props.modal}
      </div>
    );
  }
}


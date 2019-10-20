import React from "react";


// import { Link } from "react-router-dom";

class Todo extends React.Component {
  editOnClick = () => {
    this.props.editClick(this.props.todo)
  }
  deleteOnClick = () => {
    this.props.delete(this.props.todo._id)
  }

  render() {
    
    return (
      <tr>
        <td className={this.props.todo.todoCompleted ? "completed" : ""}>
          {this.props.todo.todoDescription}
        </td>
        <td className={this.props.todo.todoCompleted ? "completed" : ""}>
          {this.props.todo.todoResponsibility}
        </td>
        <td className={this.props.todo.todoCompleted ? "completed" : ""}>
          {this.props.todo.todoPriority}
        </td>
        <td>
               
          <button onClick={this.editOnClick}>Edit</button>
          <button onClick={this.deleteOnClick}>
            Delete
          </button>
          
        </td>
      </tr>
    );
  }
}

export default Todo;
import React from "react";


class Todo extends React.Component {
  editOnClick = () => {
    this.props.editClick(this.props.todo)
  }
  deleteOnClick = () => {
    this.props.delete(this.props.todo._id)
  }
   
  render() {
    const isCompleted = this.props.todo.todoCompleted ? "completed" : "";
    return (
      <tr>
        <td className={isCompleted}>
          {this.props.todo.todoDescription}
        </td>
        <td className={isCompleted}>
          {this.props.todo.todoResponsibility}
        </td>
        <td className={isCompleted}>
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
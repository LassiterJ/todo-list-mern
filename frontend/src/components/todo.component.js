import React from "react";
import { Link } from "react-router-dom";
//eslint-disable-next-line


class Todo extends React.Component {
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
          <Link to={"/edit/" + this.props.todo._id}>Edit</Link>
          <button onClick={()=>this.props.delete(this.props.todo._id)}>Delete</button>
        </td>
      </tr>
    );
  }
}

export default Todo;

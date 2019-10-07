import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
// Use import * as $ from 'axios' in order to do your API calls with the standard $.get(url)

const Todo = props => (
  <tr>
    <td>{props.todo.todoDescription}</td>
    <td>{props.todo.todoResponsibility}</td>
    <td>{props.todo.todoPriority}</td>
    <td>
      <Link to={"/edit/" + props.todo._id}>Edit</Link>
    </td>
  </tr>
);

class TodoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { todos: [] };
  }
  componentDidMount() {
    //Only use the full URL if you are calling an external API. For ones used with your application, just do axios.get(/todos/)
    //axios should automatically use the base url from the application or from the browser
    //If you were to push this in a production environment, this API call would not work. The other way is dynamic.
    axios
      .get("http://localhost:4000/todos/")
      .then(response => {
        this.setState({ todos: response.data });
      })
      .catch(function(error) {
        console.log(error);
      });
  }
  todoList() {
    //wrap this in an if(this.state.todos.length > 0){then map} . If you try to map an undefined variable then you will get an error.
    return this.state.todos.map(function(currentTodo, i) {
      return <Todo todo={currentTodo} key={i} />;
    });
  }

  render() {
    return (
      <div className='container'>
        <h2>Todo List Header</h2>
        <div className="contain-table">
          <table className="striped-table">
            <thead>
              <tr>
                <th>Description</th>
                <th>Responsibility</th>
                <th>Priority</th>
                <th>Completed</th>
              </tr>
            </thead>
            <tbody>{this.todoList()}</tbody>
          </table>
        </div>

        {<Link to="/create">Create Todo</Link>}
      </div>
    )
  }
}

export default TodoList;

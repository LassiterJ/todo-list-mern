import React from "react";
import * as $ from "axios";


// Thinking I may have to lift the state...

class EditTodo extends React.Component {
  constructor(props) {
    super(props);

    this.onChangeTodoDescription = this.onChangeTodoDescription.bind(this);
    this.onChangeTodoResponsibility = this.onChangeTodoResponsibility.bind(this);
    this.onChangeTodoPriority = this.onChangeTodoPriority.bind(this);
    this.onChangeTodoCompleted = this.onChangeTodoCompleted.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      todoDescription: this.props.currentTodo.todo.todoDescription,
      todoResponsibility: this.props.currentTodo.todo.todoResponsibility,
      todoPriority: this.props.currentTodo.todo.todoPriority,
      todoCompleted: this.props.currentTodo.todo.todoCompleted

    };
    console.log("this.props.todo editTodo: ", this.props.todo)
  }
  
  onSubmit = (event) => {
    event.preventDefault();
    const obj = {
        todoDescription: this.state.todoDescription,
        todoResponsibility: this.state.todoResponsibility,
        todoPriority: this.state.todoPriority,
        todoCompleted: this.state.todoCompleted
    };
    // have in server.js that the update api call is a post not put. look into this later
    $.put('http://localhost:4000/todos/update/'+this.props.currentTodo.todo._id, obj)
        .then(res => 
          {console.log("editTodo onSubmit update response: ",res.data);
          this.props.submitEdit(this.props.currentTodo.todo._id);
      });
    // )
}

  onChangeTodoDescription(event) {
    this.setState({
      todoDescription: event.target.value
    });
  }

  onChangeTodoResponsibility(event) {
    this.setState({
      todoResponsibility: event.target.value
    });
  }
  onChangeTodoPriority(event) {
    this.setState({
      todoPriority: event.target.value
    });
  }

  onChangeTodoCompleted() {
    this.setState({
      todoCompleted: !this.state.todoCompleted
    });
  }

  render() {
    return (
      <div>
        <h3>Update Todo</h3>
        <form onSubmit={this.onSubmit}>
          <label>
            Description
            <textarea
              value={this.state.todoDescription ||  ''}
              onChange={this.onChangeTodoDescription}
              placeholder="describe your todo here "
            />
          </label>
          <label>
            Responsibility
            <input
              value={this.state.todoResponsibility || ''}
              type="text"
              name="todoResponsibility"
              placeholder="Who's task is it?"
              onChange={this.onChangeTodoResponsibility}
            />
          </label>
          <label>
            Priority
            <select
              value={this.state.todoPriority || ''}
              onChange={this.onChangeTodoPriority}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="top">Top</option>
            </select>
          </label>
          <label>
              Completed
              <input type='checkbox' onChange={this.onChangeTodoCompleted} checked={this.state.todoCompleted} value={this.state.todoCompleted}/>
          </label>
          <input type="submit" value="Update Todo" />
        </form>
      </div>
    );
  }
}

export default EditTodo;
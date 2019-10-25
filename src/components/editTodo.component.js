import React from "react";
import * as $ from "axios";


// Thinking I may have to lift the state...

class EditTodo extends React.Component {
  constructor(props) {
    super(props);

    
    this.onChangeTodoCompleted = this.onChangeTodoCompleted.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      todoDescription: this.props.currentTodo.todo.todoDescription,
      todoResponsibility: this.props.currentTodo.todo.todoResponsibility,
      todoPriority: this.props.currentTodo.todo.todoPriority,
      todoCompleted: this.props.currentTodo.todo.todoCompleted

    };
    
  }
  onChange = (event) =>{
      this.setState({
        [event.target.name]:event.target.value
      });
  }
  onChangeTodoCompleted() {
    this.setState({
      todoCompleted: !this.state.todoCompleted
    });
  }

  onSubmit = (event) => {
    event.preventDefault();
    const obj = {
        todoDescription: this.state.todoDescription,
        todoResponsibility: this.state.todoResponsibility,
        todoPriority: this.state.todoPriority,
        todoCompleted: this.state.todoCompleted
    };
   
    $.post('http://localhost:4000/todos/update/'+this.props.currentTodo.todo._id, obj)
        .then(res => 
          {console.log("editTodo onSubmit update response: ",res.data);
          this.props.submitEdit(this.props.currentTodo.todo._id);
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
              name="todoDescription"
              value={this.state.todoDescription ||  ''}
              onChange={this.onChange}
              placeholder="describe your todo here "
            />
          </label>
          <label>
            Responsibility
            <input
              name="todoResponsibility"
              value={this.state.todoResponsibility || ''}
              type="text"
              placeholder="Who's task is it?"
              onChange={this.onChange}
            />
          </label>
          <label>
            Priority
            <select
              name="todoPriority"
              value={this.state.todoPriority || ''}
              onChange={this.onChange}
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
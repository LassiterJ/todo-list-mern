import React from "react";
import * as $ from "axios";

class CreateTodo extends React.Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      todoTitle: "",
      todoDescription: "",
      todoResponsibility: "",
      todoPriority: "low",
      todoCompleted: false,
      
      // future feature edit-history versioning
      // settings (how long until completed todo dissapears?)
    };
  }

  onChange = (event)=>{
    this.setState({
      [event.target.name]:event.target.value
    })
  }
  
  onSubmit(event) {
    event.preventDefault();

    const newTodo = {
      todoDescription: this.state.todoDescription,
      todoResponsibility: this.state.todoResponsibility,
      todoPriority: this.state.todoPriority,
      todoCompleted: this.state.todoCompleted,
      
    };
    $.post("http://localhost:4000/todos/add", newTodo)
      .then(res => {
        this.props.onSubmitNew();
        
      }).then(this.setState({
        todoDescription: "",
        todoResponsibility: "",
        todoPriority: "",
        todoCompleted: false,
        
      })
      );
  }
  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <h2>Create a New Todo</h2>
          <label>
            Description
            <textarea
              name= 'todoDescription'
              value={this.state.todoDescription}
              onChange={this.onChange}
              placeholder="describe your todo here "
            />
          </label>
          <label>
            Responsibility
            <input
              name= 'todoResponsibility'
              value={this.state.todoResponsibility}
              type="text"
              placeholder="Who's task is it?"
              onChange={this.onChange}
            />
          </label>
          <label>
            Priority
            <select
              name= 'todoPriority'
              value={this.state.todoPriority}
              onChange={this.onChange}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="top">Top</option>
            </select>
          </label>
          <input name= 'submit' type="submit" value="Create Todo" />
        </form>
      </div>
    );
  }
}

export default CreateTodo;
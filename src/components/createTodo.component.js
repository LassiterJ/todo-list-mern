import React from "react";
import axios from "axios";

class CreateTodo extends React.Component {
  constructor(props) {
    super(props);

    this.onChangeTodoDescription = this.onChangeTodoDescription.bind(this);
    this.onChangeTodoResponsibility = this.onChangeTodoResponsibility.bind(
      this
    );
    this.onChangeTodoPriority = this.onChangeTodoPriority.bind(this);
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
  onSubmit(event) {
    event.preventDefault();

    console.log("Form Submitted");
    console.log(`New Todo Description: ${this.state.todoDescription}`);
    console.log(`New Todo Responsibility: ${this.state.todoResponsibility}`);
    console.log(`New Todo Priority: ${this.state.todoPriority}`);

    const newTodo = {
      todoDescription: this.state.todoDescription,
      todoResponsibility: this.state.todoResponsibility,
      todoPriority: this.state.todoPriority,
      todoCompleted: this.state.todoCompleted,
      
    };
    axios
      .post("http://localhost:4000/todos/add", newTodo)
      .then(res => {
        this.props.onSubmitNew();
        
      });
      

    this.setState({
      todoDescription: "",
      todoResponsibility: "",
      todoPriority: "",
      todoCompleted: false,
      
    });
  }
  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <h2>Create a New Todo</h2>
          <label>
            Description
            <textarea
              value={this.state.todoDescription}
              onChange={this.onChangeTodoDescription}
              placeholder="describe your todo here "
            />
          </label>
          <label>
            Responsibility
            <input
              value={this.state.todoResponsibility}
              type="text"
              placeholder="Who's task is it?"
              onChange={this.onChangeTodoResponsibility}
            />
          </label>
          <label>
            Priority
            <select
              value={this.state.todoPriority}
              onChange={this.onChangeTodoPriority}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="top">Top</option>
            </select>
          </label>
          <input type="submit" value="Create Todo" />
        </form>
      </div>
    );
  }
}

export default CreateTodo;
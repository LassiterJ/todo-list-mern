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
      todoCompleted: false
      // future feature edit-history versioning
      // settings (how long until completed todo dissapears?)
    };
  }
  //Supply names to your input events so that you can handle all of your onChange events with one function
  //Your logic is correct and on the right track, but the driving point of React is creating reusable components
  //Also, using arrow functions changes the meaning of keyword this, meaning you don't have to use .bind
  onChange=(event)=>{
    console.log(event)
    //React can be tricky, depending on the situatuion you may have to use event.currentTarget.value and event.currentTarget.name
    //instead of event.target.value
    // check the console and see where your click events are registering
    // The bracket notation will look for the name of your click event in your state, meaning you only need one function to handle them all
    this.setState({
      [event.target.name]:event.target.value
    })
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
    // Console loggin form submitted here is misleading, you are logging this before the API call is made. Log this in the .then function
    console.log(`New Todo Description: ${this.state.todoDescription}`);
    console.log(`New Todo Responsibility: ${this.state.todoResponsibility}`);
    console.log(`New Todo Priority: ${this.state.todoPriority}`);
    

    const newTodo = {
      todoDescription: this.state.todoDescription,
      todoResponsibility: this.state.todoResponsibility,
      todoPriority: this.state.todoPriority,
      todoCompleted: this.state.todoCompleted
    };
    axios
      .post("http://localhost:4000/todos/add", newTodo)
      .then(res => console.log(res.data));


     //Wrap this in .then as well, you don't want to clear the values unless the request was successful 
    this.setState({
      todoDescription: "",
      todoResponsibility: "",
      todoPriority: "",
      todoCompleted: false
    });
  }
  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <h2>This is the Create Todo Component</h2>
          <label>
            Description
            <textarea
            //supply a name= property and have it match the name in state
              value={this.state.todoDescription}
              onChange={this.onChangeTodoDescription}
              placeholder="describe your todo here "
            />
          </label>
          <label>
            Responsibility
            <input
            //supply a name= property and have it match the name in state
              value={this.state.todoResponsibility}
              type="text"
              placeholder="Who's task is it?"
              onChange={this.onChangeTodoResponsibility}
            />
          </label>
          <label>
            Priority
            <select
            //supply a name= property and have it match the name in state
              value={this.state.todoPriority}
              onChange={this.onChangeTodoPriority}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="top">Top</option>
            </select>
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default CreateTodo;

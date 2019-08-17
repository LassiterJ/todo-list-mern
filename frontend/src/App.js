import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import CreateTodo from "./components/createTodo.component";
import EditTodo from "./components/editTodo.component";
import TodoList from "./components/todoList.component";

class App extends React.Component {
  render() {
    return (
      <Router>
        <div className="container">
          <h2>Todo-List App using the MERN-stack</h2>
        </div>
        <Route path="/" exact component={TodoList} />
        <Route path="/edit/:id" component={EditTodo} />
        <Route path="/create" component={CreateTodo} />
        
      </Router>
    );
  }
}
export default App;

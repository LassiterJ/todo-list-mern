import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import TodoList from "../src/components/todoList.component";

class App extends React.Component {
  render() {
    return (
      <Router>
        <div className="container">
          <h2>Todo-List App using the MERN-stack</h2>
        </div>
        <Route path="/" exact component={TodoList} />
        
      </Router>
    );
  }
}
export default App;

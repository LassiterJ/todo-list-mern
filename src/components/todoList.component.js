import React from "react";
import Todo from "../components/todo.component";
import axios from "axios";
import Modal from "../components/modal.component";
import CreateTodo from "./createTodo.component";
import EditTodo from "./editTodo.component";

class TodoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { todos: [], modalData: {} };
  }
  
  componentDidMount() {
    axios
      .get("http://localhost:4000/todos/")
      .then(res => {
        this.setState({ todos: res.data });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  // CREATE -------------------------------------------------------------------
  createTodoClick = () => {
    this.setState({
      modalData: { todo: "new" }
    });
  };
  onCreateNewTodoSubmitClick = () => {
    axios.get("http://localhost:4000/todos/").then(res => {
      console.log("db response: ", res.data);
      this.setState({
        todos: res.data,
        modalData: {}
      });
    });
  };

  // END CREATE ---------------------------------------------------------------

  // EDIT----------------------------------------------------------------------
  editOnClick = currentTodo => {
    console.log("EditOnClick triggered");

    // set state of modal
    this.setState({
      modalData: { todo: currentTodo }
    });
  };

  editOnSubmit = todoId => {
    console.log("Beginning of editOnSubmit in todoList component");
    axios.get("http://localhost:4000/todos/" + todoId).then(res => {
      const updatedTodo = res.data;
      console.log("db response: ", res.data);
      const arrayCopy = this.state.todos.map(currentTodo => {
        console.log("updatedTodo: ", updatedTodo);
        if (updatedTodo._id === currentTodo._id) {
          return updatedTodo;
        }
        return currentTodo;
      });
      console.log("arrayCopy: ", arrayCopy);
      this.setState({
        todos: arrayCopy,
        modalData: {}
      });
    });

    console.log("END of todoList's editOnSubmit function");
  };
  // END EDIT -------------------------------------------------------------------
  delete = todoId => {
    const arrayCopy = this.state.todos.filter(todo => todo._id !== todoId);

    axios.delete("http://localhost:4000/todos/" + todoId).catch(error => {
      console.log(error);
    });

    this.setState({
      todos: arrayCopy
    });
  };
  // MODAL ----------------------------------------------------------------------
  modalClose = () => {
    // closes modal
    this.setState({
      modalData: {}
    });
  };
  // END MODAL ------------------------------------------------------------------
  render() {
    const modalData = this.state.modalData;
    console.log("modalData: ", modalData);
    let modal;

    if (this.state.modalData.todo === "new") {
      modal = (
        <Modal
          handleClose={this.modalClose}
          submitClick={this.createTodoSubmit}
        >
          <CreateTodo onSubmitNew={this.onCreateNewTodoSubmitClick} />
        </Modal>
      );
    } else if (this.state.modalData.todo) {
      modal = (
        <Modal handleClose={this.modalClose}>
          {<EditTodo currentTodo={modalData} submitEdit={this.editOnSubmit} />}
        </Modal>
      );
    }
    const list = this.state.todos.map((currentTodo, i) => {
      return (
        <Todo
          delete={this.delete}
          editClick={this.editOnClick}
          todo={currentTodo}
          key={i}
        />
      );
    });

    return (
      <div className="container">
        <h2>Todo List Header</h2>
        <div className="contain-table">
          <table className="striped-table">
            <thead>
              <tr>
                <th>Description</th>
                <th>Responsibility</th>
                <th>Priority</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>{list}</tbody>
          </table>
        </div>
        <button onClick={this.createTodoClick}>Create New Todo</button>
        {modal}
      </div>
    );
  }
}

export default TodoList;
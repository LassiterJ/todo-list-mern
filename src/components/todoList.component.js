import React from "react";
import Todo from "../components/todo.component";
import * as $ from "axios";
import Modal from "../components/modal.component";
import CreateTodo from "./createTodo.component";
import EditTodo from "./editTodo.component";

class TodoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { todos: [], modalData: {} };
  }
  
  // Josh, I can't seem to get the relative path to work instead of the direct link. Any ideas?)
  componentDidMount() {
    $.get('http://localhost:4000/todos')
      .then(res => {
        this.setState({ todos: res.data });
      })
      .catch(function(error) {
        console.log(error);
      });
  }
// SET STATE
  setTheState = (data)=>{
    console.log("MADE IT TO SET STATE")
    if (Array.isArray(data)){
      data.forEach(obj => {
        this.setState({
          [obj.name] : obj.value
        })
      });
    }else{
      console.log("SET STATE DATA NOT AN ARRAY OF OBJECTS")
    }
    
  }
// END SET STATE
  // CREATE -------------------------------------------------------------------
  createTodoClick = () => {
    const modalData = [{name: 'modalData',
                      value: {todo:'new'}}];
    this.setTheState(modalData);
  };

  onCreateNewTodoSubmitClick = () => {
    $.get("http://localhost:4000/todos/").then(res => {
      const submitData = [{name: 'todos', value: res.data},{name:'modalData', value: {}}]
      this.setTheState(submitData);
    });
  };

  // END CREATE ---------------------------------------------------------------

  // EDIT----------------------------------------------------------------------
  editOnClick = currentTodo => {
    // Set the state of Modal
    const stateModalData = [{name: 'modalData', value: {todo: currentTodo}}]
    this.setTheState(stateModalData);
  };

  editOnSubmit = todoId => {
    
    $.get("http://localhost:4000/todos/" + todoId).then(res => {
      const updatedTodo = res.data;
      const arrayCopy = this.state.todos.map(currentTodo => {
        if (updatedTodo._id === currentTodo._id) {
          return updatedTodo;
        }
        return currentTodo;
      });
      const stateData = [{name:"todos", value: arrayCopy}, {name:"modalData", value:{}}]
      console.log("stateData editOnSubmit: ", stateData);
      this.setTheState(stateData);
    });

    console.log("END of todoList's editOnSubmit function");
  };
  // END EDIT -------------------------------------------------------------------
  delete = todoId => {
    const arrayCopy = this.state.todos.filter(todo => todo._id !== todoId);

    $.delete("http://localhost:4000/todos/" + todoId).catch(error => {
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
    const list = this.state.todos.length > 0 ? this.state.todos.map((currentTodo, i) => {
      return (
        <Todo
          delete={this.delete}
          editClick={this.editOnClick}
          todo={currentTodo}
          key={i}
        />
      );
    }):"No Todos Found!";

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
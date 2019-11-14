import React from "react";
import * as $ from "axios";

import { TodoList } from "../components/todoList.component";
import Todo from "../components/todo.component";
import Modal from "../components/modal.component";
import CreateTodo from "../components/createTodo.component";
import EditTodo from "../components/editTodo.component";

class TodoListContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { todos: [], modalData: {} };
  }

  componentDidMount() {
    $.get("http://localhost:4000/todos/")
      .then(res => {
        this.setState({ todos: res.data });
      })
      .catch(function(error) {
        console.log("ComponentDidMount ERROR: ", error);
      });
  }

  // SET STATE ----------------------------------------------------------------
  setTheState = data => {
    if (Array.isArray(data)) {
      data.forEach(obj => {
        this.setState({
          [obj.name]: obj.value
        });
      });
    } else {
      console.log("SET STATE DATA NOT AN ARRAY OF OBJECTS");
    }
  };

  // CREATE -------------------------------------------------------------------

  createTodoClick = () => {
    const modalData = [{ name: "modalData", value: { todo: "new" } }];
    this.setTheState(modalData);
  };

  onCreateNewTodoSubmitClick = () => {
    $.get("http://localhost:4000/todos/").then(res => {
      const submitData = [
        { name: "todos", value: res.data },
        { name: "modalData", value: {} }
      ];
      this.setTheState(submitData);
    });
  };

  //  -------------------------------------------------------------------------

  // EDIT----------------------------------------------------------------------

  editOnClick = currentTodo => {
    // Set the state of Modal
    const stateModalData = [
      { name: "modalData", value: { todo: currentTodo } }
    ];
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
      const stateData = [
        { name: "todos", value: arrayCopy },
        { name: "modalData", value: {} }
      ];
      console.log("stateData editOnSubmit: ", stateData);
      this.setTheState(stateData);
    });

    console.log("END of todoList's editOnSubmit function");
  };
  // END EDIT -----------------------------------------------------------------
  delete = todoId => {
    const arrayCopy = this.state.todos.filter(todo => todo._id !== todoId);

    $.delete("http://localhost:4000/todos/" + todoId).catch(error => {
      console.log(error);
    });

    this.setState({
      todos: arrayCopy
    });
  };

  // MODAL --------------------------------------------------------------------
  modalClose = () => {
    // closes modal
    this.setState({
      modalData: {}
    });
  };
  
  // RENDER--------------------------------------------------------------------
  render() {
    // ************************************************************************
    //   I would like to clean up this render function. Currently researching best methods.
    // ************************************************************************
    
    const modalData = this.state.modalData;
    let modal;

    if (modalData.todo === "new") {
      modal = (
        <Modal
          handleClose={this.modalClose}
          submitClick={this.createTodoSubmit}
        >
          <CreateTodo onSubmitNew={this.onCreateNewTodoSubmitClick} />
        </Modal>
      );
    } else if (modalData.todo) {
      modal = (
        <Modal handleClose={this.modalClose}>
          {<EditTodo currentTodo={modalData} submitEdit={this.editOnSubmit} />}
        </Modal>
      );
    }
   
    const list =
      this.state.todos.length > 0
        ? this.state.todos.map((currentTodo, i) => {
            return (
              <Todo
                delete={this.delete}
                editClick={this.editOnClick}
                todo={currentTodo}
                key={i}
              />
            );
          })
        : null;
          
    return (
     <TodoList modal={modal} list={list} createTodo={this.createTodoClick}/>
    );
  }
}

export default TodoListContainer;

import React from "react";

class CreateTodo extends React.Component{
    constructor(props){
        super(props);

        this.onChangeTodoDescription = this.onChangeTodoDescription.bind(this);
        this.onChangeTodoResponsibility = this.onChangeTodoResponsibility.bind(this);
        this.onChangeTodoPriority = this.onChangeTodoPriority.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state ={
            todoTitle:'',
            todoDescription:'',
            todoResponsibility:'',
            todoPriority:'low',
            todoCompleted:false,
            // future feature edit-history versioning
        }

    }
    onChangeTodoDescription(event){
        this.setState({
            todoDescription: event.target.value
        });
    }
    onChangeTodoResponsibility(event){
        this.setState({
            todoResponsibility: event.target.value
        });
    }
    onChangeTodoPriority(event){
        this.setState({
            todoPriority: event.target.value
    });
}
    onSubmit(event){
        

        console.log('Form Submitted');
        console.log(`New Todo Description: ${this.state.todoDescription}`);
        console.log(`New Todo Responsibility: ${this.state.todoResponsibility}`);
        console.log(`New Todo Priority: ${this.state.todoPriority}`);
        event.preventDefault();

        this.setState({
            todoDescription:'',
            todoResponsibility:'',
            todoPriority:'',
            todoCompleted:false
        })
    }
    render(){
        return(
            <div>
              <form onSubmit={this.onSubmit}>
                <h2>This is the Create Todo Component</h2>
                <label>
                    Description
                    <textarea value= {this.state.todoDescription} onChange= {this.onChangeTodoDescription} placeholder='describe your todo here '></textarea>
                </label>
                <label>
                    Responsibility
                    <input value= {this.state.todoResponsibility} type='text' placeholder="Who's task is it?" onChange={this.onChangeTodoResponsibility}></input>
                </label>
                <label>
                    Priority
                    <select value={this.state.todoPriority} onChange={this.onChangeTodoPriority}>
                        <option value='low'>Low</option>
                        <option value = 'medium'>Medium</option>
                        <option value = 'high'>High</option>
                        <option value= 'top'>Top</option>
                    </select>
                </label>
                <input type= 'submit' value ='Submit'></input>
            </form>  
            </div>
            
                
            
        )
    }
}


export default CreateTodo;
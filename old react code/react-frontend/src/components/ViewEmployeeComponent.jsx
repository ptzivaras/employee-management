import React, { Component } from 'react'
import EmployeeService from '../services/EmployeeService'
import TaskService from '../services/TaskService'

class ViewEmployeeComponent extends Component {
    constructor(props) {
        super(props)
        
        this.state = {
            id: this.props.match.params.id,
            employee: {},
            tasks: [],
            taskTitle: ""
        }

        this.saveTask = this.saveTask.bind(this);
        this.deleteTask= this.deleteTask.bind(this);
        // this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        EmployeeService.getEmployeeById( this.state.id ).then( res => {
            this.setState({employee: res.data});
        })

        EmployeeService.getTasksByEmployeeId( this.state.id ).then( res => {
            this.setState({tasks: res.data});
        })
    }

    
    handleClick = (e) => {
        this.props.history.push('/employees');
    }
      

    changeTaskTitleHandler= (event) => {
        this.setState({taskTitle: event.target.value});
    }

    saveTask = (e) => {
        e.preventDefault();
        
        TaskService.createTask( this.state.taskTitle, this.state.employee.id ).then(res =>{

            // Update the list.
            EmployeeService.getTasksByEmployeeId( this.state.id ).then( res => {
                this.setState({tasks: res.data});
            })

            // Clear the data.
            this.state.taskTitle = "";
        });
    }

    deleteTask= (id) => {
        TaskService.deleteTask( id ).then(res =>{
            EmployeeService.getTasksByEmployeeId( this.state.id ).then( res => {
                this.setState({tasks: res.data});
            })
        });
    }

    // deleteTask= (e) => {
    
    //     TaskService.deleteTask( this.state.taskTitle, this.state.employee.id ).then(res =>{

    //         // Update the list.
    //         EmployeeService.getTasksByEmployeeId( this.state.id ).then( res => {
    //             this.setState({tasks: res.data});
    //         })

    //         // Clear the data.
    //         this.state.taskTitle = "";
    //     });
    // }

    render() {
        return (
            <div>
                <br></br>
             
                {/* EMPLOYEE DETAILS */}
                <div className = "card col-md-6 offset-md-3">
                    <button className="btn" onClick={this.handleClick}>
                        ← Back
                    </button>
                </div>
<br />
                <div className = "card col-md-6 offset-md-3">
                    <div className="card-header">
                        <span className="text-left">
                            <div>
                                <strong>Employee Details</strong>
                            </div>
                        </span>
                    </div>
                
                    <div className = "card-body">
                        <table cellPadding='7'>
                           <tbody>
                           <tr>
                                <th>Firstname</th>
                                <td> { this.state.employee.firstName }</td>
                            </tr>
                            <tr>
                                <th>Lastname</th>
                                <td> { this.state.employee.lastName }</td>
                            </tr>
                            <tr>
                                <th>Email</th>
                                <td> { this.state.employee.emailId }</td>
                            </tr>
                           </tbody>
                        </table>
                    </div>
                </div>

                {/* EMPLOYEE TASKS */}
                <div className = "card col-md-6 offset-md-3">
                    <div className="card-header">
                        <span className = "text-left">
                            <strong>Employee Tasks</strong>
                        </span>
                    </div>
                    <div className = "card-body">
                        <div className="row">
                            <div className="col">
                                <input value={this.state.taskTitle} onChange={this.changeTaskTitleHandler} name="taskTitle" className="form-control" placeholder="Task title.."/>
                            </div>
                            <div className="col">
                                <button className="btn btn-success" onClick={this.saveTask}>Save</button>
                            </div>
                        </div>

                        <div className='scrollTasks'>
                            <ul>
                                {
                                    this.state.tasks.map((task) =>
                                        <div key={task.id} className="row">
                                            <div className="col">
                                                <li key={task.id}>{task.taskName}</li>
                                            </div>
                                            <div className="col text-right">
                                                {/* <button className="btn btn-danger" onClick={this.deleteTask}>Delete</button>  */}

                                                <button className="btn btn-danger" onClick={() => this.deleteTask(task.id)}>Delete</button>
                                            </div>
                                        </div>
                                    )
                                }
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ViewEmployeeComponent
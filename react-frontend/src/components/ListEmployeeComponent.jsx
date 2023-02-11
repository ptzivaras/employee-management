// use react snippets to quickly create react component
//2 types of component a) stateless functional component b) state full class component

import React, { Component } from 'react';
import EmployeeService from '../services/EmployeeService';

class ListEmployeeComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            employees: []
        }
        this.addEmployee = this.addEmployee.bind(this);//bind add button
        this.addTask = this.addTask.bind(this);//bind add button

        this.editEmployee = this.editEmployee.bind(this);
        this.deleteEmployee = this.deleteEmployee.bind(this);
    }

    deleteEmployee(id){
        EmployeeService.deleteEmployee(id).then( res => {
            this.setState({employees: this.state.employees.filter(employee => employee.id !== id)});
        }).catch(function( e) {
            alert("Warning: You can not delete an empoyee that has active tasks."|);
        });
    }
    viewEmployee(id){
        this.props.history.push(`/view-employee/${id}`);
    }
    editEmployee(id){
        this.props.history.push(`/add-employee/${id}`);
    }

    componentDidMount(){
        EmployeeService.getEmployees().then((res) => {
            this.setState({ employees: res.data});
        });
    }

    addEmployee(){
        this.props.history.push('/add-employee/_add');
    }

    addTask(){
        this.props.history.push('/add-task/_add');
    }

    render() {
        return (
            <div> <br />
                 <div className = "row">
                    <div className="col">
                        <button className="btn btn-primary mr-2" onClick={this.addEmployee}> Add Employee</button>
                    </div>
                 </div>
                 <br></br>
                 <div className = "row">
                    <div className = "scrollTable">
                        <table className = "table table-striped table-bordered">
                            <thead>
                                <tr>
                                    <th>Firstname</th>
                                    <th>Lastname</th>
                                    <th>Email</th>
                                    <th>Company</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.employees.map(
                                        employee => 
                                        <tr key = {employee.id}>
                                            <td> {employee.firstName} </td>   
                                            <td> {employee.lastName}</td>
                                            <td> {employee.emailId}</td>
                                            <td> {employee.companyName}</td>
                                            <td>
                                                <button onClick={ () => this.viewEmployee(employee.id)} className="btn btn-info">View </button>
                                                <button onClick={ () => this.editEmployee(employee.id)} className="btn btn-info mx-1">Update </button>
                                                <button onClick={ () => this.deleteEmployee(employee.id)} className="btn btn-danger">Delete </button>
                                            </td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>
                    </div>
                 </div>

            </div>
        )
    }
}

export default ListEmployeeComponent;
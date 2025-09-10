import React, { Component } from 'react';
import EmployeeService from '../services/EmployeeService';
import CompanyService from '../services/CompanyService';
import Select from 'react-select'

class CreateEmployeeComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            // step 2
            id: this.props.match.params.id,
            firstName: 'Panos',
            lastName: 'Tzivaras',
            emailId: 'ptzivaras@gmail.com',
            compId: 0
        }

        this.getAllCompanies(this);
        this.changeFirstNameHandler = this.changeFirstNameHandler.bind(this);
        this.changeLastNameHandler = this.changeLastNameHandler.bind(this);
        this.saveOrUpdateEmployee = this.saveOrUpdateEmployee.bind(this);
    }

    // Get all data for companies dropdown.
    getAllCompanies() {

        CompanyService.getCompanies().then( (res) =>{
            console.log("All Companies: ", res.data);

            let companyDropdownList = [];

            res.data.forEach(company => {
                companyDropdownList.push({
                    value: company.id,
                    label: company.companyName
                })
            });

        });
    }

    // step 3
    componentDidMount(){

        // step 4
        if(this.state.id === '_add'){
            return;
        }else{
            EmployeeService.getEmployeeById(this.state.id).then( (res) =>{
                this.setState({
                    firstName: res.data.firstName,
                    lastName: res.data.lastName,
                    emailId : res.data.emailId,
                    compId: res.data.compId
                });
            });           
        }        
    }
    saveOrUpdateEmployee = (e) => {
        e.preventDefault();
        
        if( this.state.compId <= 0 ) {
            alert("Please select a company.");
            return;
        }
    
        let employee = {
            firstName: this.state.firstName, 
            lastName: this.state.lastName, 
            emailId: this.state.emailId,
            compId: this.state.compId
        };
    
        if(this.state.id === '_add'){
            EmployeeService.createEmployee(employee).then(res =>{
                this.props.history.push('/employees');
            });
        }else{
            EmployeeService.updateEmployee(employee, this.state.id).then( res => {
                this.props.history.push('/employees');
            });
        }
    }
    
    handleChange= (event) => {
        this.setState({compId: event.target.value});
    }
    
    changeCompanyHandler= (event) => {
        this.setState({compId: event.target.value});
    }

    changeFirstNameHandler= (event) => {
        this.setState({firstName: event.target.value});
    }

    changeLastNameHandler= (event) => {
        this.setState({lastName: event.target.value});
    }

    changeEmailHandler= (event) => {
        this.setState({emailId: event.target.value});
    }

    cancel(){
        this.props.history.push('/employees');
    }

    getTitle(){
        if(this.state.id === '_add'){
            return <h3 className="text-center">Add Employee</h3>
        }else{
            return <h3 className="text-center">Update Employee</h3>
        }
    }
    render() {
        return (
            <div>
                <br></br>
                   <div className = "container">
                        <div className = "row">
                            <div className = "card col-md-6 offset-md-3 offset-md-3">
                                {
                                    this.getTitle()
                                }
                                <div className = "card-body">
                                    <form>
                                        <div className = "form-group">
                                            <label> First Name: </label>
                                            <input placeholder="First Name" name="firstName" className="form-control" 
                                                value={this.state.firstName} onChange={this.changeFirstNameHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Last Name: </label>
                                            <input placeholder="Last Name" name="lastName" className="form-control" 
                                                value={this.state.lastName} onChange={this.changeLastNameHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Email Id: </label>
                                            <input placeholder="Email Address" name="emailId" className="form-control" 
                                                value={this.state.emailId} onChange={this.changeEmailHandler}/>
                                        </div>

                                        <div className = "form-group">
                                            <label> Company </label>

                                            <select className="form-control" onChange={this.changeCompanyHandler} value={this.state.compId}>
                                                <option value="0">-- Select an option --</option>
                                                <option value="1">Microsoft</option>
                                                <option value="2">Corsair</option>
                                                <option value="3">Nintendo</option>
                                                <option value="4">Bungie</option>
                                                <option value="5">Valve</option>
                                            </select>
                                       </div>

                                        <button className="btn btn-success" onClick={this.saveOrUpdateEmployee}>Save</button>
                                        <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft: "10px"}}>Cancel</button>
                                    </form>
                                </div>
                            </div>
                        </div>

                   </div>
            </div>
        )
    }
}

export default CreateEmployeeComponent;
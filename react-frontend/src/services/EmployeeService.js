import axios from 'axios';

const EMPLOYEE_API_BASE_URL = "http://localhost:8080/api/v1/employees2";

class EmployeeService {

    getEmployees(){
        return axios.get(EMPLOYEE_API_BASE_URL);
    }

    createEmployee(employee){
        return axios.post(EMPLOYEE_API_BASE_URL, employee);
    }

    getEmployeeById(employeeId){
        return axios.get(EMPLOYEE_API_BASE_URL + '/' + employeeId);
    }

    updateEmployee(employee, employeeId){
        return axios.put(EMPLOYEE_API_BASE_URL + '/' + employeeId, employee);
    }

    deleteEmployee(employeeId){

        return axios.delete(EMPLOYEE_API_BASE_URL + '/' + employeeId);
    }

    getTasksByEmployeeId( employeeId ) {
        console.log( "Delete ", employeeId);

        return axios.get('http://localhost:8080/api/v1/employees/' + employeeId + '/tasks');
    }
}

export default new EmployeeService()
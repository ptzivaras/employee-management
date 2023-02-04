import axios from 'axios';

const COMPANY_API_BASE_URL = "http://localhost:8080/api/v1/companies";

class CompanyService {
    getCompanies(){
        return axios.get(COMPANY_API_BASE_URL);
    }

    // createEmployee(employee){
    //     return axios.post(COMPANY_API_BASE_URL, employee);
    // }

    // getEmployeeById(employeeId){
    //     return axios.get(COMPANY_API_BASE_URL + '/' + employeeId);
    // }

    // updateEmployee(employee, employeeId){
    //     return axios.put(COMPANY_API_BASE_URL + '/' + employeeId, employee);
    // }

    // deleteEmployee(employeeId){
    //     return axios.delete(COMPANY_API_BASE_URL + '/' + employeeId);
    // }
}

export default new CompanyService()
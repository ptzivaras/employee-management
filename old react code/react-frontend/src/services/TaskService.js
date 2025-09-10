import axios from 'axios';

const EMPLOYEE_API_BASE_URL = "http://localhost:8080/api/v1/tasks";

class TaskService {
    createTask( taskTitle, employeeId ) {
        return axios.post( EMPLOYEE_API_BASE_URL, {
            emp_id: employeeId,
            price: 0,
            taskName: taskTitle,
        } );
    }

    deleteTask( taskId ) {
        console.log( "Delete ", taskId);

        return axios.delete( EMPLOYEE_API_BASE_URL + "/" + taskId );
    }
}

export default new TaskService()
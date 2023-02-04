package net.javaguides.springbootbackend.controller;


import net.javaguides.springbootbackend.exception.ResourceNotFoundException;
import net.javaguides.springbootbackend.model.Employee;
import net.javaguides.springbootbackend.model.Person;
import net.javaguides.springbootbackend.model.Tasks;
import net.javaguides.springbootbackend.repository.EmployeeRepository;
import net.javaguides.springbootbackend.repository.TasksRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

//RestApi, koita ligo to 3000
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/")
public class EmployeeController {

    @Autowired
    private EmployeeRepository employeeRepository;//inject repository here by spring container

    @Autowired
    private TasksRepository tasksRepository;//inject repository here by spring container

    @PostMapping("/tasks")
    public Tasks createTask(@RequestBody Tasks tasks) {
        return tasksRepository.save(tasks);
    }

@DeleteMapping("/tasks/{id}")
public ResponseEntity<Void> deleteTask(@PathVariable Long id) {
    Tasks task = tasksRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Task not exist with id :" + id));
    tasksRepository.deleteById(id);
    System.out.println("taskid: "+id);
    return ResponseEntity.ok().build();
}



    // tutorial sql
    @GetMapping("/employees2")
    public List<Person> getAllEmployeesDetails(){
        List<Person> models = new ArrayList<>();
        List<Object[]> mylist = employeeRepository.findSomeEmployees();

        for (Object[] item : mylist) {
            models.add(new Person((Long) item[0], (String) item[1], (String) item[2], (String) item[3], (String) item[4]));
        }

        return models;
    }

    // create employee rest api
    @PostMapping("/employees2")
    public Employee createEmployee(@RequestBody Employee employee){
        return employeeRepository.save(employee);
    }

    // get employee by id rest api
    @GetMapping("/employees2/{id}")
    public ResponseEntity<Employee> getEmployeeById(@PathVariable Long id) {
        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not exist with id :" + id));
        return ResponseEntity.ok(employee);
    }

    // get tasks of specific employee_id
    @GetMapping("/employees/{id}/tasks")
    public ResponseEntity<List<Tasks>> getTasksByEmployeeId(@PathVariable Long id) {
        return ResponseEntity.ok(tasksRepository.getRelatedTasks( id ));
    }

    // update employee rest api
    @PutMapping("/employees2/{id}")
    public ResponseEntity<Employee> updateEmployee(@PathVariable Long id, @RequestBody Employee employeeDetails){
        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not exist with id :" + id));

        employee.setFirstName(employeeDetails.getFirstName());
        employee.setLastName(employeeDetails.getLastName());
        employee.setEmailId(employeeDetails.getEmailId());
        employee.setCompId( employeeDetails.getCompId());

        Employee updatedEmployee = employeeRepository.save(employee);
        return ResponseEntity.ok(updatedEmployee);
    }

    // delete employee rest api
    @DeleteMapping("/employees2/{id}")
    public ResponseEntity<Map<String, Boolean>> deleteEmployee(@PathVariable Long id){
        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not exist with id :" + id));

        employeeRepository.delete(employee);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }


}

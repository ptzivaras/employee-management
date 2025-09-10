package net.javaguides.springbootbackend.controller;

import jakarta.validation.Valid;
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
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/")
public class EmployeeController {

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private TasksRepository tasksRepository;

    // Task create/delete remain here for now (use clean /tasks)
    @PostMapping("/tasks")
    public Tasks createTask(@Valid @RequestBody Tasks tasks) {
        return tasksRepository.save(tasks);
    }

    @DeleteMapping("/tasks/{id}")
    public ResponseEntity<Void> deleteTask(@PathVariable Long id) {
        Tasks task = tasksRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Task not exist with id :" + id));
        tasksRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }

    // ===== Employees (legacy + clean paths) =====

    // List employees with company info (legacy projection) — keep /employees2 and add /employees
    @GetMapping({"/employees2", "/employees"})
    public List<Person> getAllEmployeesDetails(){
        List<Person> models = new ArrayList<>();
        List<Object[]> mylist = employeeRepository.findSomeEmployees();
        for (Object[] item : mylist) {
            models.add(new Person((Long) item[0], (String) item[1], (String) item[2], (String) item[3], (String) item[4]));
        }
        return models;
    }

    // Create employee (map both /employees2 and /employees)
    @PostMapping({"/employees2", "/employees"})
    public Employee createEmployee(@Valid @RequestBody Employee employee){
        return employeeRepository.save(employee);
    }

    // Get by id (both paths)
    @GetMapping({"/employees2/{id}", "/employees/{id}"})
    public ResponseEntity<Employee> getEmployeeById(@PathVariable Long id) {
        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not exist with id :" + id));
        return ResponseEntity.ok(employee);
    }

    // Get tasks for employee (already clean path)
    @GetMapping("/employees/{id}/tasks")
    public ResponseEntity<List<Tasks>> getTasksByEmployeeId(@PathVariable Long id) {
        return ResponseEntity.ok(tasksRepository.getRelatedTasks(id));
    }

    // Update (both paths)
    @PutMapping({"/employees2/{id}", "/employees/{id}"})
    public ResponseEntity<Employee> updateEmployee(@PathVariable Long id, @Valid @RequestBody Employee employeeDetails){
        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not exist with id :" + id));

        employee.setFirstName(employeeDetails.getFirstName());
        employee.setLastName(employeeDetails.getLastName());
        employee.setEmailId(employeeDetails.getEmailId());
        employee.setCompId(employeeDetails.getCompId());

        Employee updatedEmployee = employeeRepository.save(employee);
        return ResponseEntity.ok(updatedEmployee);
    }

    // Delete (both paths)
    @DeleteMapping({"/employees2/{id}", "/employees/{id}"})
    public ResponseEntity<Void> deleteEmployee(@PathVariable Long id){
        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not exist with id :" + id));
        employeeRepository.delete(employee);
        return ResponseEntity.ok().build();
    }
}

package net.javaguides.springbootbackend.controller;

import jakarta.validation.Valid;
import net.javaguides.springbootbackend.dto.*;
import net.javaguides.springbootbackend.exception.ResourceNotFoundException;
import net.javaguides.springbootbackend.mapper.EmployeeMapper;
import net.javaguides.springbootbackend.mapper.TaskMapper;
import net.javaguides.springbootbackend.model.Employee;
import net.javaguides.springbootbackend.model.Tasks;
import net.javaguides.springbootbackend.repository.EmployeeRepository;
import net.javaguides.springbootbackend.repository.TasksRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/")
public class EmployeeController {

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private TasksRepository tasksRepository;

    // ===== Tasks (create/delete use DTOs) =====

    @PostMapping("/tasks")
    public TaskDto createTask(@Valid @RequestBody TaskCreateRequest body) {
        Tasks saved = tasksRepository.save(TaskMapper.fromCreate(body));
        return TaskMapper.toDto(saved);
    }

    @DeleteMapping("/tasks/{id}")
    public ResponseEntity<Void> deleteTask(@PathVariable Long id) {
        Tasks task = tasksRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Task not exist with id :" + id));
        tasksRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }

    // ===== Employees (legacy + clean paths) =====

    // List employees with company info (legacy projection) — now returns DTO
    @GetMapping({"/employees2", "/employees"})
    public List<EmployeeSummaryDto> getAllEmployeesDetails(){
        List<EmployeeSummaryDto> models = new ArrayList<>();
        List<Object[]> mylist = employeeRepository.findSomeEmployees();
        for (Object[] item : mylist) {
            // SELECT e.id, e.emailId, e.firstName, e.lastName, c.companyName
            Long id = (Long) item[0];
            String email = (String) item[1];
            String first = (String) item[2];
            String last = (String) item[3];
            String company = (String) item[4];
            models.add(new EmployeeSummaryDto(id, first, last, email, company));
        }
        return models;
    }

    // Create employee — accepts DTO, returns DTO (both paths)
    @PostMapping({"/employees2", "/employees"})
    public EmployeeDto createEmployee(@Valid @RequestBody EmployeeCreateRequest body){
        Employee saved = employeeRepository.save(EmployeeMapper.fromCreate(body));
        return EmployeeMapper.toDto(saved);
    }

    // Get by id — returns DTO (both paths)
    @GetMapping({"/employees2/{id}", "/employees/{id}"})
    public ResponseEntity<EmployeeDto> getEmployeeById(@PathVariable Long id) {
        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not exist with id :" + id));
        return ResponseEntity.ok(EmployeeMapper.toDto(employee));
    }

    // Get tasks for employee — returns TaskDto list (already clean path)
    @GetMapping("/employees/{id}/tasks")
    public ResponseEntity<List<TaskDto>> getTasksByEmployeeId(@PathVariable Long id) {
        List<Tasks> tasks = tasksRepository.getRelatedTasks(id);
        List<TaskDto> dtos = tasks.stream().map(TaskMapper::toDto).collect(Collectors.toList());
        return ResponseEntity.ok(dtos);
    }

    // Update — accepts DTO, returns DTO (both paths)
    @PutMapping({"/employees2/{id}", "/employees/{id}"})
    public ResponseEntity<EmployeeDto> updateEmployee(@PathVariable Long id, @Valid @RequestBody EmployeeUpdateRequest body){
        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not exist with id :" + id));
        EmployeeMapper.applyUpdate(employee, body);
        Employee updated = employeeRepository.save(employee);
        return ResponseEntity.ok(EmployeeMapper.toDto(updated));
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

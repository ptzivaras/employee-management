package net.javaguides.springbootbackend.controller;

import net.javaguides.springbootbackend.dto.TaskCreateRequest;
import net.javaguides.springbootbackend.dto.TaskResponse;
import net.javaguides.springbootbackend.dto.TaskUpdateRequest;
import net.javaguides.springbootbackend.exception.ResourceNotFoundException;
import net.javaguides.springbootbackend.mapper.TaskMapper;
import net.javaguides.springbootbackend.model.Tasks;
import net.javaguides.springbootbackend.repository.TasksRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.*;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

//@CrossOrigin(origins = "http://localhost:5173")
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/")
@Validated
public class TasksController {

    @Autowired
    private TasksRepository tasksRepository;

    // GET /tasks?page=0&size=10&sort=id,desc&empId=123
    @GetMapping("/tasks")
    public Page<TaskResponse> listTasks(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "id,asc") String sort,
            @RequestParam(required = false) Integer empId
    ) {
        Sort sortSpec = parseSort(sort);
        Pageable pageable = PageRequest.of(page, size, sortSpec);
        Page<Tasks> p = (empId == null)
                ? tasksRepository.findAll(pageable)
                : tasksRepository.findByEmpId(empId, pageable);
        return p.map(TaskMapper::toResponse);
    }

    @PostMapping("/tasks")
    public ResponseEntity<TaskResponse> createTask(@RequestBody @Validated TaskCreateRequest req) {
        Tasks t = new Tasks();
        t.setEmpId(req.getEmpId());
        t.setTaskName(req.getTaskName());
        Tasks saved = tasksRepository.save(t);
        return ResponseEntity.ok(TaskMapper.toResponse(saved));
    }

    @PutMapping("/tasks/{id}")
    public ResponseEntity<TaskResponse> updateTask(@PathVariable Long id, @RequestBody @Validated TaskUpdateRequest req) {
        Tasks t = tasksRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Task not exist with id: " + id));
        t.setTaskName(req.getTaskName());
        Tasks saved = tasksRepository.save(t);
        return ResponseEntity.ok(TaskMapper.toResponse(saved));
    }

    @DeleteMapping("/tasks/{id}")
    public ResponseEntity<Void> deleteTask(@PathVariable Long id) {
        Tasks t = tasksRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Task not exist with id: " + id));
        tasksRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    private static Sort parseSort(String sort) {
        String[] parts = sort.split(",", 2);
        String field = parts[0].trim();
        String dir = parts.length > 1 ? parts[1].trim().toLowerCase() : "asc";
        return "desc".equals(dir) ? Sort.by(field).descending() : Sort.by(field).ascending();
    }
}

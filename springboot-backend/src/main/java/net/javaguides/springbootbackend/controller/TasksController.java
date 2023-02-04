package net.javaguides.springbootbackend.controller;

import net.javaguides.springbootbackend.exception.ResourceNotFoundException;
import net.javaguides.springbootbackend.model.Employee;
import net.javaguides.springbootbackend.model.Tasks;
import net.javaguides.springbootbackend.repository.CompaniesRepository;
import net.javaguides.springbootbackend.repository.TasksRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/")
public class TasksController {
    @Autowired
    private TasksRepository tasksRepository;

    @GetMapping("/Tasks")
    public List<Tasks> getAllTasks(){
        return tasksRepository.findAll(); // return all emploees to client
    }

}

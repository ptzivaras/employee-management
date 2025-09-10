package net.javaguides.springbootbackend.controller;

import net.javaguides.springbootbackend.model.Tasks;
import net.javaguides.springbootbackend.repository.TasksRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/")
public class TasksController {

    @Autowired
    private TasksRepository tasksRepository;

    // Add clean route /tasks while keeping legacy /Tasks
    @GetMapping({"/Tasks", "/tasks"})
    public List<Tasks> getAllTasks(){
        return tasksRepository.findAll();
    }
}

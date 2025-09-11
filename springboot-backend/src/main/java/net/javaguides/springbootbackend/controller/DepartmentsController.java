package net.javaguides.springbootbackend.controller;

import net.javaguides.springbootbackend.dto.DepartmentDto;
import net.javaguides.springbootbackend.mapper.DepartmentMapper;
import net.javaguides.springbootbackend.model.Department;
import net.javaguides.springbootbackend.repository.DepartmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
//@CrossOrigin(origins = "http://localhost:5173")
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/")
public class DepartmentsController {

    @Autowired
    private DepartmentRepository departmentRepository;

    // New & legacy routes both work
    @GetMapping({"/departments", "/companies"})
    public List<DepartmentDto> getAllDepartments() {
        return departmentRepository.findAll()
                .stream()
                .map(DepartmentMapper::toDto)
                .toList();
    }
}

package net.javaguides.springbootbackend.controller;

import net.javaguides.springbootbackend.dto.DepartmentDto;
import net.javaguides.springbootbackend.exception.ResourceNotFoundException;
import net.javaguides.springbootbackend.mapper.DepartmentMapper;
import net.javaguides.springbootbackend.model.Department;
import net.javaguides.springbootbackend.repository.DepartmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/v1")
@Validated
public class DepartmentsController {

    @Autowired
    private DepartmentRepository departmentRepository;

    // Keep legacy "/companies" for old UI; new path is "/departments"
    @GetMapping({"/departments", "/companies"})
    public List<DepartmentDto> getAllDepartments() {
        return departmentRepository.findAll()
                .stream()
                .map(DepartmentMapper::toDto)
                .toList();
    }

    // Create department: { "name": "Engineering" }
    @PostMapping("/departments")
    public ResponseEntity<?> create(@RequestBody DepartmentDto dto) {
        String name = dto.getName() == null ? "" : dto.getName().trim();
        if (name.isEmpty()) {
            return ResponseEntity.unprocessableEntity().body("Department name is required");
        }
        if (departmentRepository.existsByNameIgnoreCase(name)) {
            return ResponseEntity.unprocessableEntity().body("Department already exists: " + name);
        }

        Department toSave = new Department();
        toSave.setName(name);
        Department saved = departmentRepository.save(toSave);

        DepartmentDto body = DepartmentMapper.toDto(saved);
        return ResponseEntity.created(URI.create("/api/v1/departments/" + saved.getId())).body(body);
    }

    // Delete department
    @DeleteMapping("/departments/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        Department d = departmentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Department not exist with id: " + id));

        // If employees reference this department, delete may fail due to FK; handle that as you prefer.
        departmentRepository.delete(d);
        return ResponseEntity.noContent().build();
    }
}

package net.javaguides.springbootbackend.controller;

import net.javaguides.springbootbackend.dto.EmployeeCreateRequest;
import net.javaguides.springbootbackend.dto.EmployeeResponse;
import net.javaguides.springbootbackend.dto.EmployeeUpdateRequest;
import net.javaguides.springbootbackend.exception.ResourceNotFoundException;
import net.javaguides.springbootbackend.mapper.EmployeeMapper;
import net.javaguides.springbootbackend.model.Department;
import net.javaguides.springbootbackend.model.Employee;
import net.javaguides.springbootbackend.repository.DepartmentRepository;
import net.javaguides.springbootbackend.repository.EmployeeRepository;
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
public class EmployeeController {

    @Autowired private EmployeeRepository employeeRepository;
    @Autowired private DepartmentRepository departmentRepository;

    // ---- List & search with pagination ----
    // GET /employees?page=0&size=10&sort=lastName,asc&q=john
    @GetMapping({"/employees", "/employees2"}) // keep legacy path alive
    public Page<EmployeeResponse> listEmployees(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "lastName,asc") String sort,
            @RequestParam(required = false) String q
    ) {
        Sort sortSpec = parseSort(sort);
        Pageable pageable = PageRequest.of(page, size, sortSpec);

        Page<EmployeeRepository.EmployeeSummary> result =
                (q == null || q.isBlank())
                        ? employeeRepository.findAllSummaries(pageable)
                        : employeeRepository.searchSummaries(q.trim(), pageable);

        return result.map(s -> EmployeeMapper.toResponse(
                toEmployeeStub(s), s.getDepartmentName()));
    }

    // ---- Get by id ----
    @GetMapping("/employees/{id}")
    public ResponseEntity<EmployeeResponse> getEmployeeById(@PathVariable Long id) {
        Employee e = employeeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not exist with id: " + id));
        String deptName = departmentRepository.findById(e.getCompId().longValue())
                .map(Department::getName).orElse(null);
        return ResponseEntity.ok(EmployeeMapper.toResponse(e, deptName));
    }

    // ---- Create ----
    @PostMapping({"/employees", "/employees2"})
    public ResponseEntity<EmployeeResponse> createEmployee(@RequestBody @Validated EmployeeCreateRequest req) {
        if (employeeRepository.existsByEmailIdIgnoreCase(req.getEmailId())) {
            throw new IllegalArgumentException("Email already exists: " + req.getEmailId());
        }
        Department d = departmentRepository.findById((long) req.getCompId())
                .orElseThrow(() -> new ResourceNotFoundException("Department not exist with id: " + req.getCompId()));

        Employee e = new Employee(req.getFirstName(), req.getLastName(), req.getEmailId(), req.getCompId());
        Employee saved = employeeRepository.save(e);
        return ResponseEntity.ok(EmployeeMapper.toResponse(saved, d.getName()));
    }

    // ---- Update ----
    @PutMapping({"/employees/{id}", "/employees2/{id}"})
    public ResponseEntity<EmployeeResponse> updateEmployee(@PathVariable Long id,
                                                           @RequestBody @Validated EmployeeUpdateRequest req) {
        Employee e = employeeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not exist with id: " + id));
        Department d = departmentRepository.findById((long) req.getCompId())
                .orElseThrow(() -> new ResourceNotFoundException("Department not exist with id: " + req.getCompId()));

        if (!e.getEmailId().equalsIgnoreCase(req.getEmailId())
                && employeeRepository.existsByEmailIdIgnoreCase(req.getEmailId())) {
            throw new IllegalArgumentException("Email already exists: " + req.getEmailId());
        }

        e.setFirstName(req.getFirstName());
        e.setLastName(req.getLastName());
        e.setEmailId(req.getEmailId());
        e.setCompId(req.getCompId());
        Employee saved = employeeRepository.save(e);

        return ResponseEntity.ok(EmployeeMapper.toResponse(saved, d.getName()));
    }

    // ---- Delete ----
    @DeleteMapping({"/employees/{id}", "/employees2/{id}"})
    public ResponseEntity<Void> deleteEmployee(@PathVariable Long id) {
        Employee e = employeeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not exist with id: " + id));
        employeeRepository.delete(e);
        return ResponseEntity.noContent().build();
    }

    // util
    private static Sort parseSort(String sort) {
        String[] parts = sort.split(",", 2);
        String field = parts[0].trim();
        String dir = parts.length > 1 ? parts[1].trim().toLowerCase() : "asc";
        return "desc".equals(dir) ? Sort.by(field).descending() : Sort.by(field).ascending();
    }

    private static Employee toEmployeeStub(EmployeeRepository.EmployeeSummary s) {
        Employee e = new Employee();
        e.setId(s.getId());
        e.setFirstName(s.getFirstName());
        e.setLastName(s.getLastName());
        e.setEmailId(s.getEmailId());
        e.setCompId(s.getCompId());
        return e;
    }
}

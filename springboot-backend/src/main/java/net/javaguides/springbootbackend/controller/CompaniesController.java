package net.javaguides.springbootbackend.controller;

import net.javaguides.springbootbackend.dto.DepartmentDto;
import net.javaguides.springbootbackend.mapper.DepartmentMapper;
import net.javaguides.springbootbackend.model.Companies;
import net.javaguides.springbootbackend.repository.CompaniesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/")
public class CompaniesController {

    @Autowired
    private CompaniesRepository companiesRepository;

    // New clean route /departments kept alongside legacy /companies
    @GetMapping({"/companies", "/departments"})
    public List<DepartmentDto> getAllCompaniesOrDepartments() {
        List<Companies> rows = companiesRepository.findAll();
        return rows.stream().map(DepartmentMapper::toDto).collect(Collectors.toList());
    }
}

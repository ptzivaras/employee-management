package net.javaguides.springbootbackend.controller;

import net.javaguides.springbootbackend.model.Companies;
import net.javaguides.springbootbackend.repository.CompaniesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/")
public class CompaniesController {

    @Autowired
    private CompaniesRepository companiesRepository;

    // New clean route /departments kept alongside legacy /companies
    @GetMapping({"/companies", "/departments"})
    public List<Companies> getAllCompaniesOrDepartments() {
        return companiesRepository.findAll();
    }
}

package net.javaguides.springbootbackend.controller;

import net.javaguides.springbootbackend.exception.ResourceNotFoundException;
import net.javaguides.springbootbackend.model.Companies;
import net.javaguides.springbootbackend.model.Employee;
import net.javaguides.springbootbackend.repository.CompaniesRepository;
import net.javaguides.springbootbackend.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Query;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/")
public class CompaniesController {
    @Autowired
    private CompaniesRepository companiesRepository;

    @GetMapping("/companies")

    public List<Companies> getAllCompanies(){
        return companiesRepository.findAll(); // return all Companies to client
    }



}

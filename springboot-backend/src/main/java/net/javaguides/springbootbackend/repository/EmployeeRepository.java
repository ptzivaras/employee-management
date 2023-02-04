package net.javaguides.springbootbackend.repository;

import net.javaguides.springbootbackend.model.Companies;
import net.javaguides.springbootbackend.model.Employee;
import net.javaguides.springbootbackend.model.Person;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.List;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long> {
    @Query(
            value ="SELECT e.id, e.emailId, e.firstName, e.lastName, c.companyName FROM Employee e JOIN Companies c ON e.compId = c.id"
    )
    List findSomeEmployees();
}
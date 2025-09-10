package net.javaguides.springbootbackend.repository;

import net.javaguides.springbootbackend.model.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long> {

    // SELECT e.id, e.emailId, e.firstName, e.lastName, d.name
    @Query("""
           SELECT e.id, e.emailId, e.firstName, e.lastName, d.name
           FROM Employee e
           JOIN Department d ON e.compId = d.id
           """)
    List<Object[]> findSomeEmployees();
}

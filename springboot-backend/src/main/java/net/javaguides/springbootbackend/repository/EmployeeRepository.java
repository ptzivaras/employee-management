package net.javaguides.springbootbackend.repository;

import net.javaguides.springbootbackend.model.Employee;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long> {

    interface EmployeeSummary {
        Long getId();
        String getEmailId();
        String getFirstName();
        String getLastName();
        String getDepartmentName();
        Integer getCompId();
    }

    @Query("""
           SELECT e.id AS id,
                  e.emailId AS emailId,
                  e.firstName AS firstName,
                  e.lastName AS lastName,
                  d.name AS departmentName,
                  e.compId AS compId
           FROM Employee e
           JOIN Department d ON e.compId = d.id
           """)
    Page<EmployeeSummary> findAllSummaries(Pageable pageable);

    @Query("""
           SELECT e.id AS id,
                  e.emailId AS emailId,
                  e.firstName AS firstName,
                  e.lastName AS lastName,
                  d.name AS departmentName,
                  e.compId AS compId
           FROM Employee e
           JOIN Department d ON e.compId = d.id
           WHERE lower(e.firstName) LIKE lower(concat('%', :q, '%'))
              OR lower(e.lastName) LIKE lower(concat('%', :q, '%'))
              OR lower(e.emailId) LIKE lower(concat('%', :q, '%'))
              OR lower(d.name) LIKE lower(concat('%', :q, '%'))
           """)
    Page<EmployeeSummary> searchSummaries(@Param("q") String q, Pageable pageable);

    boolean existsByEmailIdIgnoreCase(String emailId);
}

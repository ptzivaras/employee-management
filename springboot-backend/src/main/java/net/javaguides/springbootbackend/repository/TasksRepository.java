package net.javaguides.springbootbackend.repository;

import net.javaguides.springbootbackend.model.Tasks;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TasksRepository extends JpaRepository<Tasks, Long> {
    Page<Tasks> findByEmpId(Integer empId, Pageable pageable);
}

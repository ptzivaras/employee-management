package net.javaguides.springbootbackend.repository;

import net.javaguides.springbootbackend.model.Tasks;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TasksRepository extends JpaRepository<Tasks, Long> {
    @Query(
            value ="SELECT t FROM Tasks t JOIN Employee e ON t.emp_id = e.id WHERE e.id = :id"
    )
    List<Tasks> getRelatedTasks(@Param("id") Long id);
}

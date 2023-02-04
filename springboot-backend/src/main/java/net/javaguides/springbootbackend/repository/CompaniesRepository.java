package net.javaguides.springbootbackend.repository;

import net.javaguides.springbootbackend.model.Companies;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CompaniesRepository extends JpaRepository<Companies, Long> {
}

package net.javaguides.springbootbackend.mapper;

import net.javaguides.springbootbackend.dto.EmployeeResponse;
import net.javaguides.springbootbackend.model.Employee;

public class EmployeeMapper {
    public static EmployeeResponse toResponse(Employee e, String departmentName) {
        if (e == null) return null;
        return new EmployeeResponse(
                e.getId(),
                e.getFirstName(),
                e.getLastName(),
                e.getEmailId(),
                e.getCompId(),
                departmentName
        );
    }
}

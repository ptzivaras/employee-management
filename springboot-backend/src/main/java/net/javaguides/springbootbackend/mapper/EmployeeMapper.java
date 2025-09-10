package net.javaguides.springbootbackend.mapper;

import net.javaguides.springbootbackend.dto.EmployeeDto;
import net.javaguides.springbootbackend.dto.EmployeeCreateRequest;
import net.javaguides.springbootbackend.dto.EmployeeUpdateRequest;
import net.javaguides.springbootbackend.model.Employee;

public class EmployeeMapper {

    public static EmployeeDto toDto(Employee e) {
        if (e == null) return null;
        return new EmployeeDto(e.getId(), e.getFirstName(), e.getLastName(), e.getEmailId(), e.getCompId());
    }

    public static Employee fromCreate(EmployeeCreateRequest r) {
        Employee e = new Employee();
        e.setFirstName(r.getFirstName());
        e.setLastName(r.getLastName());
        e.setEmailId(r.getEmailId());
        e.setCompId(r.getCompId());
        return e;
    }

    public static void applyUpdate(Employee e, EmployeeUpdateRequest r) {
        e.setFirstName(r.getFirstName());
        e.setLastName(r.getLastName());
        e.setEmailId(r.getEmailId());
        e.setCompId(r.getCompId());
    }
}

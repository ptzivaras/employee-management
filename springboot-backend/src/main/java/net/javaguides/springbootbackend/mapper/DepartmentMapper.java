package net.javaguides.springbootbackend.mapper;

import net.javaguides.springbootbackend.dto.DepartmentDto;
import net.javaguides.springbootbackend.model.Department;

public class DepartmentMapper {
    public static DepartmentDto toDto(Department d) {
        if (d == null) return null;
        return new DepartmentDto(d.getId(), d.getName());
    }
}

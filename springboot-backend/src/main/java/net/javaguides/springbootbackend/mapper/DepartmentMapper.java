package net.javaguides.springbootbackend.mapper;

import net.javaguides.springbootbackend.dto.DepartmentDto;
import net.javaguides.springbootbackend.model.Companies;

public class DepartmentMapper {
    public static DepartmentDto toDto(Companies c) {
        if (c == null) return null;
        return new DepartmentDto(c.getId(), c.getCompanyName());
    }
}

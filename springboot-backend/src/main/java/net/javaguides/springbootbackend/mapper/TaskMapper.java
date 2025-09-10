package net.javaguides.springbootbackend.mapper;

import net.javaguides.springbootbackend.dto.TaskResponse;
import net.javaguides.springbootbackend.model.Tasks;

public class TaskMapper {
    public static TaskResponse toResponse(Tasks t) {
        if (t == null) return null;
        return new TaskResponse(t.getId(), t.getEmpId(), t.getTaskName());
    }
}

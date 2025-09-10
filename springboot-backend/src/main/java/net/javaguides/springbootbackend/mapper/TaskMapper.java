package net.javaguides.springbootbackend.mapper;

import net.javaguides.springbootbackend.dto.TaskCreateRequest;
import net.javaguides.springbootbackend.dto.TaskDto;
import net.javaguides.springbootbackend.model.Tasks;

public class TaskMapper {

    public static TaskDto toDto(Tasks t) {
        if (t == null) return null;
        return new TaskDto(t.getId(), t.getEmpId(), t.getTaskName());
    }

    public static Tasks fromCreate(TaskCreateRequest r) {
        Tasks t = new Tasks();
        t.setEmpId(r.getEmpId());
        t.setTaskName(r.getTaskName());
        return t;
    }
}

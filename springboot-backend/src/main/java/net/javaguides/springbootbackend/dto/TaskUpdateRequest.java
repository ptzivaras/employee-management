package net.javaguides.springbootbackend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class TaskUpdateRequest {
    @NotBlank @Size(max = 120)
    private String taskName;

    public String getTaskName() { return taskName; }
    public void setTaskName(String taskName) { this.taskName = taskName; }
}

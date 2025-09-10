package net.javaguides.springbootbackend.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public class TaskDto {
    private long id;

    @JsonProperty("emp_id")
    private Integer empId;

    private String taskName;

    public TaskDto() {}

    public TaskDto(long id, Integer empId, String taskName) {
        this.id = id;
        this.empId = empId;
        this.taskName = taskName;
    }

    public long getId() { return id; }
    public void setId(long id) { this.id = id; }
    public Integer getEmpId() { return empId; }
    public void setEmpId(Integer empId) { this.empId = empId; }
    public String getTaskName() { return taskName; }
    public void setTaskName(String taskName) { this.taskName = taskName; }
}

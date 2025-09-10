package net.javaguides.springbootbackend.dto;

public class TaskResponse {
    private Long id;
    private Integer empId;
    private String taskName;

    public TaskResponse() {}

    public TaskResponse(Long id, Integer empId, String taskName) {
        this.id = id;
        this.empId = empId;
        this.taskName = taskName;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Integer getEmpId() { return empId; }
    public void setEmpId(Integer empId) { this.empId = empId; }

    public String getTaskName() { return taskName; }
    public void setTaskName(String taskName) { this.taskName = taskName; }
}

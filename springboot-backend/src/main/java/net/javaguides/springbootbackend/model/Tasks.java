package net.javaguides.springbootbackend.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "tasks")
public class Tasks {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @NotNull
    @Column(name = "emp_id", nullable = false)
    private Integer empId;

    @NotBlank
    @Size(max = 120)
    @Column(name = "task_name", nullable = false)
    private String taskName;

    public Tasks() {}

    public Tasks(int id, int empId, String taskName) {
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

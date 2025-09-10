package net.javaguides.springbootbackend.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "tasks") // normalized table name
public class Tasks {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @NotNull
    @Column(name = "emp_id")
    private Integer emp_id;

    @NotBlank
    @Size(max = 120)
    @Column(name = "task_name")
    private String taskName;

    public Tasks() {}

    public Tasks(int id, int emp_id, String taskName) {
        this.id = id;
        this.emp_id = emp_id;
        this.taskName = taskName;
    }

    public long getId() { return id; }
    public void setId(long id) { this.id = id; }

    @JsonProperty("emp_id")
    public Integer getEmpId() { return emp_id; }

    @JsonProperty("emp_id")
    public void setEmpId(Integer empId) { this.emp_id = empId; }

    public String getTaskName() { return taskName; }
    public void setTaskName(String taskName) { this.taskName = taskName; }
}

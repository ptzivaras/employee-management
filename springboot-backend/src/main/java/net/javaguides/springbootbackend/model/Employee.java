package net.javaguides.springbootbackend.model;

import java.io.Serializable;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "employees")
public class Employee implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @NotBlank
    @Size(max = 50)
    @Column(name = "first_name")
    private String firstName;

    @NotBlank
    @Size(max = 50)
    @Column(name = "last_name")
    private String lastName;

    @NotBlank
    @Email
    @Size(max = 255)
    @Column(name = "email_id")
    private String emailId;

    @NotNull
    @Column(name = "comp_id")
    private Integer compId;

    public Employee() {}

    public Employee(String firstName, String lastName, String emailId, Integer compId) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.emailId = emailId;
        this.compId = compId;
    }

    public long getId() { return id; }
    public void setId(long id) { this.id = id; }

    public String getFirstName() { return firstName; }
    public void setFirstName(String firstName) { this.firstName = firstName; }

    public String getLastName() { return lastName; }
    public void setLastName(String lastName) { this.lastName = lastName; }

    public String getEmailId() { return emailId; }
    public void setEmailId(String emailId) { this.emailId = emailId; }

    public Integer getCompId() { return compId; }
    public void setCompId(Integer compId) { this.compId = compId; }
}

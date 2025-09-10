package net.javaguides.springbootbackend.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class EmployeeUpdateRequest {
    @NotBlank @Size(min = 2, max = 60)
    private String firstName;

    @NotBlank @Size(min = 2, max = 60)
    private String lastName;

    @NotBlank @Email @Size(max = 190)
    private String emailId;

    @Min(1)
    private int compId;

    public String getFirstName() { return firstName; }
    public void setFirstName(String firstName) { this.firstName = firstName; }

    public String getLastName() { return lastName; }
    public void setLastName(String lastName) { this.lastName = lastName; }

    public String getEmailId() { return emailId; }
    public void setEmailId(String emailId) { this.emailId = emailId; }

    public int getCompId() { return compId; }
    public void setCompId(int compId) { this.compId = compId; }
}

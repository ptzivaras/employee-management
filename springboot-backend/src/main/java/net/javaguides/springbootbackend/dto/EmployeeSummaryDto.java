package net.javaguides.springbootbackend.dto;

public class EmployeeSummaryDto {
    private Long id;
    private String firstName;
    private String lastName;
    private String emailId;
    private String companyName;

    public EmployeeSummaryDto() {}

    public EmployeeSummaryDto(Long id, String firstName, String lastName, String emailId, String companyName) {
        this.id = id; this.firstName = firstName; this.lastName = lastName;
        this.emailId = emailId; this.companyName = companyName;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getFirstName() { return firstName; }
    public void setFirstName(String firstName) { this.firstName = firstName; }
    public String getLastName() { return lastName; }
    public void setLastName(String lastName) { this.lastName = lastName; }
    public String getEmailId() { return emailId; }
    public void setEmailId(String emailId) { this.emailId = emailId; }
    public String getCompanyName() { return companyName; }
    public void setCompanyName(String companyName) { this.companyName = companyName; }
}

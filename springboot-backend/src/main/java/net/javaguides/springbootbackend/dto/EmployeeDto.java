package net.javaguides.springbootbackend.dto;

public class EmployeeDto {
    private long id;
    private String firstName;
    private String lastName;
    private String emailId;
    private Integer compId;

    public EmployeeDto() {}

    public EmployeeDto(long id, String firstName, String lastName, String emailId, Integer compId) {
        this.id = id;
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

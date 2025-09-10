package net.javaguides.springbootbackend.dto;

public class EmployeeResponse {
    private Long id;
    private String firstName;
    private String lastName;
    private String emailId;
    private Integer compId;
    private String departmentName;

    public EmployeeResponse() {}

    public EmployeeResponse(Long id, String firstName, String lastName,
                            String emailId, Integer compId, String departmentName) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.emailId = emailId;
        this.compId = compId;
        this.departmentName = departmentName;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getFirstName() { return firstName; }
    public void setFirstName(String firstName) { this.firstName = firstName; }

    public String getLastName() { return lastName; }
    public void setLastName(String lastName) { this.lastName = lastName; }

    public String getEmailId() { return emailId; }
    public void setEmailId(String emailId) { this.emailId = emailId; }

    public Integer getCompId() { return compId; }
    public void setCompId(Integer compId) { this.compId = compId; }

    public String getDepartmentName() { return departmentName; }
    public void setDepartmentName(String departmentName) { this.departmentName = departmentName; }
}

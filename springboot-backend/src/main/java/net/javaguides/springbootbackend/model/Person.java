package net.javaguides.springbootbackend.model;

// Not a JPA entity; simple projection/DTO for the legacy /employees2 endpoint
public class Person {

    private Long id;
    private String firstName;
    private String lastName;
    private String emailId;
    private String companyName;

    public Person(Long id, String emailId, String firstName, String lastName, String companyName) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.emailId = emailId;
        this.companyName = companyName;
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

package net.javaguides.springbootbackend.model;

import java.io.Serializable;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "companies")
public class Companies implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @NotBlank
    @Size(min = 2, max = 100)
    @Column(name = "company_name")
    private String companyName;

    public Companies() {}

    public Companies(String companyName) {
        this.companyName = companyName;
    }

    public long getId() { return id; }
    public void setId(long id) { this.id = id; }

    public String getCompanyName() { return companyName; }
    public void setCompanyName(String companyName) { this.companyName = companyName; }
}

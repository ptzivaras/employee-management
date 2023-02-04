package net.javaguides.springbootbackend.model;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "companies")
public class Companies implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "company_name")
    private String companyName;

    public Companies() {

    }

    public Companies(String companyName) {
        super();
        this.companyName = companyName;
    }

    public long getId() {
        return id;
    }
    public void setId(long id) {
        this.id = id;
    }

    public String getCompanyName() {
        return companyName;
    }
    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

}

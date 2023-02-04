package net.javaguides.springbootbackend.model;

import javax.persistence.*;

@Entity
@Table(name = "Tasks")
public class Tasks {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "emp_id")
    private int emp_id;

    @Column(name = "task_name")
    private String taskName;

//    @Column(name = "price")
//    private int price;

    public Tasks() {

    }
    public Tasks(int id, int emp_id, String taskName) {
        super();
        this.id = id;
        this.emp_id = emp_id;
        this.taskName = taskName;
        //this.price = price;
    }

    public long getId() {
        return id;
    }
    public void setId(long id) {
        this.id = id;
    }

    public long getemp_id() {
        return emp_id;
    }
    public void setemp_id(String emp_id) {
        this.emp_id = Integer.parseInt(emp_id);
    }

    public String gettaskName() {
        return taskName;
    }
    public void settaskName(String taskName) {
        this.taskName = taskName;
    }

//    public int price() {
//        return price;
//    }
//    public void price(int price) {
//        this.price = price;
//    }
}

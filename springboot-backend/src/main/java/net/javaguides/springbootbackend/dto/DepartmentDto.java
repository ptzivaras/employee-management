package net.javaguides.springbootbackend.dto;

public class DepartmentDto {
    private long id;
    private String name;

    public DepartmentDto() {}
    public DepartmentDto(long id, String name) {
        this.id = id; this.name = name;
    }

    public long getId() { return id; }
    public void setId(long id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
}

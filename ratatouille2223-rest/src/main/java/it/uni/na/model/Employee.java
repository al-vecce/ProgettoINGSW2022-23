package it.uni.na.model;

import io.quarkus.hibernate.orm.panache.PanacheEntity;
import io.quarkus.hibernate.orm.panache.PanacheEntityBase;
import io.quarkus.hibernate.orm.panache.PanacheQuery;
import io.quarkus.panache.common.Parameters;
import jakarta.persistence.*;
import jakarta.transaction.Transactional;

import java.sql.Date;
import java.time.LocalDate;

@Entity
@NamedQueries({
        @NamedQuery(name = "Employee.getEmployeeByName", query = "SELECT c FROM Employee c WHERE c.username = :username"),
        @NamedQuery(name = "Employee.getAllEmployeesOrderedByName", query = "SELECT c.username, c.password, c.employee_role, c.last_modified, c.first_login FROM Employee c ORDER BY c.username"),
        @NamedQuery(name = "Employee.getAllEmployeesOrderedByEmployeeRole", query = "SELECT c.username, c.password, c.employee_role, c.last_modified, c.first_login FROM Employee c ORDER BY c.employee_role, c.username"),
        @NamedQuery(name = "Employee.getAllEmployeesOrderedByLastModified", query = "SELECT c.username, c.password, c.employee_role, c.last_modified, c.first_login FROM Employee c ORDER BY c.last_modified, c.username"),
        @NamedQuery(name = "Employee.getSignInRecord", query = "SELECT c.username, c.password FROM Employee c ORDER BY c.username"),
        @NamedQuery(name = "Employee.getFirstLoginStatus", query = "SELECT c.username, c.first_login FROM Employee c WHERE ( c.username = :username AND c.first_login = :first_login )")})
public class Employee extends PanacheEntityBase {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "Employee_SEQ")
    @SequenceGenerator(name = "Employee_SEQ")
    @Column(name = "id", nullable = false)
    private Long id;
    @Column(name = "username", nullable = false, unique = true)
    private String username;
    @Column(name = "password", nullable = false, length = 20)
    private String password;
    @Enumerated(EnumType.STRING)
    @Column(name = "employee_role", nullable = false)
    private Account employee_role;
    @Column(name = "last_modified")
    private Date last_modified;
    @Column(name = "first_login", nullable = false)
    private Boolean first_login;

    @Transient
    private static String json_authentication_key;

    @ManyToOne(cascade = CascadeType.REMOVE, optional = false)
    @JoinColumn(name = "business_id", nullable = false)
    private Business business;

    public Employee() {}
    public Employee(String username, String password, Account account, Business business) {
        this.username = username;
        this.password = password;
        this.employee_role = account;
        this.last_modified = Date.valueOf(LocalDate.now());
        this.first_login = false;
        this.business = business;
    }

    public Business getBusiness() {
        return business;
    }

    public void setBusiness(Business business) {
        this.business = business;
    }

    public String getJson_authentication_key() {
        return json_authentication_key;
    }

    public Boolean getFirst_login() {
        return first_login;
    }

    public void setFirst_login(Boolean first_login) {
        this.first_login = first_login;
    }

    public Date getLast_modified() {
        return last_modified;
    }

    public void setLast_modified(Date last_modified) {
        this.last_modified = last_modified;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public Account getAccount() {
        return employee_role;
    }

    public void setAccount(Account account) {
        this.employee_role = account;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    @Transactional
    public static Boolean signIn(String username, String password) {
        Object employee = Employee.find("#Employee.getSignInRecord").firstResult();
        if(employee != null) {
            return true;
        }
        else {
            return false;
        }
    }
    /*@Transactional
    public Boolean signUp(String username, String password) {

    }*/
    @Transactional
    public static Employee findEmployeeByUsername(String username) {
        return Employee.find("#Employee.getEmployeeByName", Parameters.with("username", username)).firstResult();
    }
    @Transactional
    public static PanacheQuery<PanacheEntity> findAllEmployeesOrderedByUsername() {
        return Employee.find("#Employee.getAllEmployeesOrderedByName");
    }
    @Transactional
    public static PanacheQuery<PanacheEntity> findAllEmployeesOrderedByEmployeeRole() {
        return Employee.find("#Employee.getAllEmployeesOrderedByEmployeeRole");
    }
    @Transactional
    public static PanacheQuery<PanacheEntity> findAllEmployeesOrderedByLastModified() {
        return Employee.find("#Employee.getAllEmployeesOrderedByLastModified");
    }
    @Transactional
    public static Boolean isFirstLogin(String username) {
        Object employee = Employee.find("#Employee.getFirstLoginStatus", Parameters.with("username", username).and("first_login", true)).firstResult();
        if(employee != null) {
            return true;
        }
        else {
            return false;
        }
    }
}
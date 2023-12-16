package it.uni.na.model;

import io.quarkus.hibernate.orm.panache.PanacheEntityBase;
import io.quarkus.panache.common.Page;
import io.quarkus.panache.common.Sort;
import it.uni.na.constats.AccountEnum;
import jakarta.persistence.*;
import jakarta.transaction.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Entity
public class Employee extends PanacheEntityBase {

    public static final int PAGES = 10;

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
    private AccountEnum employee_role;
    @Column(name = "last_modified")
    private LocalDateTime last_modified;
    @Column(name = "first_login", nullable = false)
    private Boolean first_login;

    @Transient
    private static String json_authentication_key;

    @ManyToOne(cascade = CascadeType.PERSIST, optional = false)
    @JoinColumn(name = "business_id", nullable = false)
    private Business business;

    public Employee() {}
    public Employee(String username, String password, AccountEnum accountEnum) {
        this.username = username;
        this.password = password;
        this.employee_role = accountEnum;
        this.last_modified = LocalDateTime.now();
        this.first_login = false;
        this.business = Business.find("SELECT b FROM Business b WHERE id = 1").firstResult();
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

    public LocalDateTime getLast_modified() {
        return last_modified;
    }

    public void setLast_modified(LocalDateTime last_modified) {
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

    public AccountEnum getAccount() {
        return employee_role;
    }

    public void setAccount(AccountEnum accountEnum) {
        this.employee_role = accountEnum;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    @Transactional
    public static Boolean signIn(String username, String password) {
        Object employee = Employee.find("SELECT c FROM Employee c WHERE c.username = ?1 AND c.password = ?2"
                , username, password).firstResult();
        return employee != null;
    }
    /*@Transactional
    public Boolean signUp(String username, String password) {

    }*/
    // TODO sostituire 10 con una costante
    @Transactional
    public static Employee findEmployeeByUsername(String username) {
        return Employee.find("SELECT e FROM Employee e WHERE e.username = ?1", username).firstResult();
    }
    @Transactional
    public static List<Employee> findAllEmployeesOrderedBy(Integer page, String order) {
        return Employee.find("SELECT e FROM Employee e", Sort.by(order)).page(Page.of(page,PAGES)).list();
    }
    @Transactional
    public static Integer findEmployeesPages() {
        return Employee.find("SELECT e FROM Employee e").page(Page.ofSize(PAGES)).pageCount();
    }
    @Transactional
    public static Boolean isFirstLogin(String username) {
        Object employee = Employee.find("SELECT c.username, c.first_login FROM Employee c WHERE ( c.username = ?1 AND c.first_login = ?2 )"
                , username, true).firstResult();
        return employee != null;
    }

    @Override
    public String toString() {
        return "{\n" +
                "\t\"username\": \"" + username + "\",\n" +
                "\t\"employee_role\": \"" + employee_role + "\",\n" +
                "\t\"password\": \"" + password + "\",\n" +
                "\t\"last_modified\": \"" + last_modified + "\"\n" +
                '}';
    }
}
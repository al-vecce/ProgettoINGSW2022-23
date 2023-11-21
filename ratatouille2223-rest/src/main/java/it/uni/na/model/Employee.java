package it.uni.na.model;

import io.quarkus.hibernate.orm.panache.PanacheEntity;
import io.quarkus.hibernate.orm.panache.PanacheEntityBase;
import io.quarkus.hibernate.orm.panache.PanacheQuery;
import jakarta.persistence.*;
import jakarta.transaction.Transactional;
import jakarta.validation.constraints.Digits;
import jakarta.validation.constraints.NotNull;

import java.sql.Date;
import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "user")
@NamedQueries({
        @NamedQuery(name = "User.getAllUsersOrderedByName", query = "select c from user c order by c.name")
})
public class User extends PanacheEntityBase {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "User_SEQ")
    @SequenceGenerator(name = "User_SEQ")
    @Column(name = "id", nullable = false)
    private Long id;
    @Column(name = "username", nullable = false, unique = true)
    private String username;
    @Column(name = "password", nullable = false, length = 20)
    private String password;
    @Enumerated(EnumType.STRING)
    @Column(name = "employeerole", nullable = false)
    private Account employee_role;
    @Column(name = "lastmodified")
    private Date last_modified;
    @Column(name = "firstlogin", nullable = false)
    private Boolean first_login;

    @Transient
    private static String json_authentication_key;

    @ManyToOne(cascade = CascadeType.REMOVE, optional = false)
    @JoinColumn(name = "businessid", nullable = false)
    private Business business;

    public User() {}
    public User(String username, String password, Account account, Business business) {
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
    public Boolean signIn(String username, String password) {
        User user = User.find("name = ?1 and password = ?2", username, password).firstResult();
        if(user != null) {
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
    public static PanacheQuery<PanacheEntity> findAllUsersOrderedByUsername() {
        return User.find("#getAllUsersOrderedByUsername");
    }
    /*@Transactional
    public List<User> findAllUsersOrderedByUsername() {

    }
    @Transactional
    public List<User> findAllUsersOrderedByUsername() {

    }
    @Transactional
    public Boolean isFirstLogin() {

    }*/
}
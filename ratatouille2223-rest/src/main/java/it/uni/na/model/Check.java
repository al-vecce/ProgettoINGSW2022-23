package it.uni.na.model;

import io.quarkus.hibernate.orm.panache.PanacheEntityBase;
import jakarta.persistence.*;
import jakarta.validation.constraints.PositiveOrZero;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Check extends PanacheEntityBase {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "Check_GEN")
    @SequenceGenerator(name = "Check_GEN", sequenceName = "Check_SEQ")
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "check_status", nullable = false)
    private Boolean check_status = false;

    @Column(name = "check_total")
    private Float check_total;

    @Column(name = "closing_date_time")
    private LocalDateTime closing_date_time;

    @Column(name = "opening_date_time", nullable = false)
    private LocalDateTime opening_date_time;

    @PositiveOrZero
    @Column(name = "check_table", nullable = false)
    private Integer check_table;

    @OneToMany(mappedBy = "check", cascade = CascadeType.REMOVE, orphanRemoval = true)
    private List<Order> orders = new ArrayList<>();

    public List<Order> getOrders() {
        return orders;
    }

    public void setOrders(List<Order> orders) {
        this.orders = orders;
    }

    public Integer getCheck_table() {
        return check_table;
    }

    public void setCheck_table(Integer check_table) {
        this.check_table = check_table;
    }

    public LocalDateTime getOpening_date_time() {
        return opening_date_time;
    }

    public void setOpening_date_time(LocalDateTime opening_date_time) {
        this.opening_date_time = opening_date_time;
    }

    public LocalDateTime getClosing_date_time() {
        return closing_date_time;
    }

    public void setClosing_date_time(LocalDateTime closing_date_time) {
        this.closing_date_time = closing_date_time;
    }

    public Float getCheck_total() {
        return check_total;
    }

    public void setCheck_total(Float check_total) {
        this.check_total = check_total;
    }

    public Boolean getCheck_status() {
        return check_status;
    }

    public void setCheck_status(Boolean check_status) {
        this.check_status = check_status;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    @Override
    public String toString() {
        return "{\n" +
                "\t\"check_id\":            \"" + id + "\",\n" +
                "\t\"check_status\":        \"" + check_status + "\",\n" +
                "\t\"check_total\":         \"" + check_table + "\",\n" +
                "\t\"closing_date_time\":   \"" + closing_date_time + "\",\n" +
                "\t\"opening_date_time\":   \"" + opening_date_time + "\",\n" +
                "\t\"check_table\":         \"" + check_total + "\"\n" +
                "}";
    }
}

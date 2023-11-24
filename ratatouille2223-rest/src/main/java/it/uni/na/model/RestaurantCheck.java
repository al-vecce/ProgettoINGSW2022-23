package it.uni.na.model;

import io.quarkus.hibernate.orm.panache.PanacheEntityBase;
import io.quarkus.panache.common.Page;
import jakarta.persistence.*;
import jakarta.transaction.Transactional;
import jakarta.validation.constraints.PositiveOrZero;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
public class RestaurantCheck extends PanacheEntityBase {
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

    @OneToMany(mappedBy = "restaurantCheck", cascade = CascadeType.REMOVE, orphanRemoval = true)
    private List<RestaurantOrder> restaurantOrders = new ArrayList<>();

    public List<RestaurantOrder> getOrders() {
        return restaurantOrders;
    }

    public void setOrders(List<RestaurantOrder> restaurantOrders) {
        this.restaurantOrders = restaurantOrders;
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

    @Transactional
    public static RestaurantCheck findCheckById(Long checkid) {
        return RestaurantCheck.find("SELECT c FROM RestaurantCheck c WHERE c.id = ?1", checkid).firstResult();
    }
    @Transactional
    public static List<RestaurantCheck> findAllChecksOrderedById(Integer page, Boolean checkstatus) {
        return RestaurantCheck.find("SELECT c FROM RestaurantCheck c WHERE check_status = ?1 ORDER BY c.id", checkstatus).page(Page.of(page,10)).list();
    }
    @Transactional
    public static List<RestaurantCheck> findAllChecksOrderedByTable(Integer page, Boolean checkstatus) {
        return RestaurantCheck.find("SELECT c FROM RestaurantCheck c WHERE check_status = ?1 ORDER BY c.check_table", checkstatus).page(Page.of(page,10)).list();
    }
    @Transactional
    public static List<RestaurantCheck> findAllChecksOrderedByClosingTime(Integer page, Boolean checkstatus) {
        return RestaurantCheck.find("SELECT c FROM RestaurantCheck c WHERE check_status = ?1 ORDER BY c.closing_date_time", checkstatus).page(Page.of(page,10)).list();
    }
    @Transactional
    public static List<RestaurantCheck> findAllChecksOrderedByOpeningTime(Integer page, Boolean checkstatus) {
        return RestaurantCheck.find("SELECT c FROM RestaurantCheck c WHERE check_status = ?1 ORDER BY c.opening_date_time", checkstatus).page(Page.of(page,10)).list();
    }
    @Transactional
    public static List<RestaurantCheck> findAllChecksOrderedByTotal(Integer page, Boolean checkstatus) {
        return RestaurantCheck.find("SELECT c FROM RestaurantCheck c WHERE check_status = ?1 ORDER BY c.check_total", checkstatus).page(Page.of(page,10)).list();
    }

    @Transactional
    public static List<RestaurantCheck> findAllChecksFilteredOrderedById(Integer page, LocalDateTime filterstart, LocalDateTime filterend, Boolean checkstatus) {
        return RestaurantCheck.find("SELECT c FROM RestaurantCheck c WHERE check_status = ?1 AND opening_date_time >= ?2 AND opening_date_time <= ?3 ORDER BY c.id",
                checkstatus, filterstart, filterend).page(Page.of(page,10)).list();
    }
    @Transactional
    public static List<RestaurantCheck> findAllChecksFilteredOrderedByTable(Integer page, LocalDateTime filterstart, LocalDateTime filterend, Boolean checkstatus) {
        return RestaurantCheck.find("SELECT c FROM RestaurantCheck c WHERE check_status = ?1 AND opening_date_time >= ?2 AND opening_date_time <= ?3 ORDER BY c.check_table",
                checkstatus, filterstart, filterend).page(Page.of(page,10)).list();
    }
    @Transactional
    public static List<RestaurantCheck> findAllChecksFilteredOrderedByClosingTime(Integer page, LocalDateTime filterstart, LocalDateTime filterend, Boolean checkstatus) {
        return RestaurantCheck.find("SELECT c FROM RestaurantCheck c WHERE check_status = ?1 AND opening_date_time >= ?2 AND opening_date_time <= ?3 ORDER BY c.closing_date_time",
                checkstatus, filterstart, filterend).page(Page.of(page,10)).list();
    }
    @Transactional
    public static List<RestaurantCheck> findAllChecksFilteredOrderedByOpeningTime(Integer page, LocalDateTime filterstart, LocalDateTime filterend, Boolean checkstatus) {
        return RestaurantCheck.find("SELECT c FROM RestaurantCheck c WHERE check_status = ?1 AND opening_date_time >= ?2 AND opening_date_time <= ?3 ORDER BY c.opening_date_time",
                checkstatus, filterstart, filterend).page(Page.of(page,10)).list();
    }
    @Transactional
    public static List<RestaurantCheck> findAllChecksFilteredOrderedByTotal(Integer page, LocalDateTime filterstart, LocalDateTime filterend, Boolean checkstatus) {
        return RestaurantCheck.find("SELECT c FROM RestaurantCheck c WHERE check_status = ?1 AND opening_date_time >= ?2 AND opening_date_time <= ?3 ORDER BY c.check_total",
                checkstatus, filterstart, filterend).page(Page.of(page,10)).list();
    }
    @Transactional
    public static Integer findChecksPages(Boolean checkstatus) {
        return RestaurantCheck.find("SELECT c FROM RestaurantCheck c WHERE check_status = ?1", checkstatus).page(Page.ofSize(10)).pageCount();
    }

    @PostLoad
    public void postLoad() {
        for(RestaurantOrder o: this.restaurantOrders) {
            this.setCheck_total(this.getCheck_total() + o.getOrder_total());
        }
        this.persist();
    }
    @PrePersist
    public void postPersist() {
        for(RestaurantOrder o: this.restaurantOrders) {
            this.setCheck_total(this.getCheck_total() + o.getOrder_total());
        }
    }
    @PreUpdate
    public void preUpdate() {
        for(RestaurantOrder o: this.restaurantOrders) {
            this.setCheck_total(this.getCheck_total() + o.getOrder_total());
        }
    }
}

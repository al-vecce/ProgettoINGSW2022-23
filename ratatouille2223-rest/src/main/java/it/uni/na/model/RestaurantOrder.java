package it.uni.na.model;

import io.quarkus.hibernate.orm.panache.PanacheEntityBase;
import jakarta.persistence.*;
import jakarta.transaction.Transactional;

import java.util.List;

@Entity
public class RestaurantOrder extends PanacheEntityBase {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "Order_GEN")
    @SequenceGenerator(name = "Order_GEN", sequenceName = "Order_SEQ")
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "quantity", nullable = false)
    private Integer quantity;

    @Column(name = "description")
    private String description;

    @Column(name = "order_total")
    private Float order_total;

    @ManyToOne(optional = false)
    @JoinColumn(name = "check_id", nullable = false)
    private RestaurantCheck restaurantCheck;

    @ManyToOne(optional = false)
    @JoinColumn(name = "menu_element_id", nullable = false)
    private MenuElement menuElement;

    @Column(name = "current_price")
    private Float current_price;

    public Float getCurrent_price() {
        return current_price;
    }

    public void setCurrent_price(Float current_price) {
        this.current_price = current_price;
    }

    public MenuElement getMenuElement() {
        return menuElement;
    }

    public void setMenuElement(MenuElement menuElement) {
        this.menuElement = menuElement;
    }

    public RestaurantCheck getCheck() {
        return restaurantCheck;
    }

    public void setCheck(RestaurantCheck restaurantCheck) {
        this.restaurantCheck = restaurantCheck;
    }

    public Float getOrder_total() {
        return order_total;
    }

    public void setOrder_total(Float order_total) {
        this.order_total = order_total;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
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
                "\t\"order_id\":            \"" + id + "\",\n" +
                "\t\"quantity\":            \"" + quantity + "\",\n" +
                "\t\"order_total\":         \"" + order_total + "\",\n" +
                "\t\"current_price\":       \"" + current_price + "\",\n" +
                "\t\"description\":         \"" + description + "\"\n" +
                "}";
    }

    @Transactional
    public static RestaurantOrder findOrderById(Long orderid) {
        return RestaurantOrder.find("SELECT o FROM RestaurantOrder o WHERE id = ?1", orderid).firstResult();
    }
    @Transactional
    public static List<RestaurantOrder> findAllOrdersForCheckIdOrderBy(Long checkid, String order) {
        return RestaurantOrder.find("SELECT o FROM RestaurantOrder o WHERE o.check_id = ?1 ORDER BY order"
                , order).list();
    }

    @PostLoad
    public void PostLoad() {
        this.setOrder_total(quantity * current_price);
        this.persist();
    }
    @PrePersist
    public void PostPersist() {
        this.setOrder_total(quantity * current_price);
    }
    @PreUpdate
    public void preUpdate() {
        if(this.quantity <= 0) {
            this.delete();
        } else {
            this.setOrder_total(quantity * current_price);
        }
    }
}

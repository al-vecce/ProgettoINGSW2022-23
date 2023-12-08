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

    @ManyToOne(cascade = CascadeType.PERSIST, optional = false)
    @JoinColumn(name = "restaurantCheck", nullable = false)
    private RestaurantCheck restaurantCheck;

    @ManyToOne(optional = true)
    @JoinColumn(name = "menu_element_id")
    private MenuElement menuElement;

    @Column(name = "current_price")
    private Float current_price;

    public RestaurantCheck getRestaurantCheck() {
        return restaurantCheck;
    }

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
        String return_string = "{\n" +
                "\t\"order_id\":            \"" + id + "\",\n";
        if(menuElement != null) {
            return_string = return_string + "\t\"element_name\":        \"" + menuElement.getName() + "\",\n";
        }
        return_string = return_string + "\t\"quantity\":            \"" + quantity + "\",\n" +
                "\t\"order_total\":         \"" + order_total + "\",\n" +
                "\t\"current_price\":       \"" + current_price + "\",\n" +
                "\t\"description\":         \"" + description + "\"\n" +
                "}";
        return return_string;
    }

    @Transactional
    public static RestaurantOrder findOrderById(Long orderid) {
        return RestaurantOrder.find("SELECT o FROM RestaurantOrder o WHERE id = ?1", orderid).firstResult();
    }
    @Transactional
    public static List<RestaurantOrder> findAllOrdersForCheckIdOrderBy(Long checkid, String order) {
        return RestaurantOrder.find("SELECT o FROM RestaurantOrder o WHERE o.restaurantCheck.id = ?1 ORDER BY ?2"
                ,checkid, order).list();
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
    public RestaurantOrder() {}
    public RestaurantOrder(Integer quantity, Float current_price) {
        this.quantity = quantity;
        this.current_price = current_price;
    }
    public RestaurantOrder(Integer quantity, Float current_price, String description) {
        this.quantity = quantity;
        this.current_price = current_price;
        this.description = description;
    }
}

package it.uni.na.model;

import jakarta.persistence.*;

@Entity
public class Order {
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
    private Check check;

    @ManyToOne(optional = false)
    @JoinColumn(name = "menu_element_id", nullable = false)
    private MenuElement menuElement;

    public MenuElement getMenuElement() {
        return menuElement;
    }

    public void setMenuElement(MenuElement menuElement) {
        this.menuElement = menuElement;
    }

    public Check getCheck() {
        return check;
    }

    public void setCheck(Check check) {
        this.check = check;
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
}

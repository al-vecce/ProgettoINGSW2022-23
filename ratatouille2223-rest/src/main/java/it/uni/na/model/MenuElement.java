package it.uni.na.model;

import io.quarkus.hibernate.orm.panache.PanacheEntityBase;
import jakarta.persistence.*;

import java.util.LinkedHashSet;
import java.util.Set;

@Entity
public class MenuElement extends PanacheEntityBase {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "MenuElement_GEN")
    @SequenceGenerator(name = "MenuElement_GEN", sequenceName = "MenuElement_SEQ")
    @Column(name = "id", nullable = false)
    private Long id;

    @OneToMany(mappedBy = "menuElement")
    private Set<RestaurantOrder> restaurantOrders = new LinkedHashSet<>();

    @ManyToOne(optional = false)
    @JoinColumn(name = "menu_category_id", nullable = false)
    private MenuCategory menuCategory;

    public MenuCategory getMenuCategory() {
        return menuCategory;
    }

    public void setMenuCategory(MenuCategory menuCategory) {
        this.menuCategory = menuCategory;
    }

    public Set<RestaurantOrder> getOrders() {
        return restaurantOrders;
    }

    public void setOrders(Set<RestaurantOrder> restaurantOrders) {
        this.restaurantOrders = restaurantOrders;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}

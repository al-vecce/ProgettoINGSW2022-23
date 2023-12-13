package it.uni.na.model;

import io.quarkus.hibernate.orm.panache.PanacheEntityBase;
import io.quarkus.panache.common.Page;
import io.quarkus.panache.common.Sort;
import jakarta.inject.Inject;
import jakarta.persistence.*;
import jakarta.transaction.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;

@Entity
public class MenuElement extends PanacheEntityBase {

    public static final int PAGES = 10;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "MenuElement_GEN")
    @SequenceGenerator(name = "MenuElement_GEN", sequenceName = "MenuElement_SEQ")
    @Column(name = "id", nullable = false)
    private Long id;

    //@OneToMany(mappedBy = "menuElement")
    //private Set<RestaurantOrder> restaurantOrders = new LinkedHashSet<>();

    @ManyToOne(optional = false)
    @JoinColumn(name = "menu_category_id", nullable = false)
    private MenuCategory menuCategory;

    @Column(name = "price", nullable = false)
    private Float price;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "ingredients", length = 1000)
    private String ingredients;

    @Column(name = "allergens", length = 1000)
    private String allergens;

    @Column(name = "second_name")
    private String second_name;

    @Column(name = "second_ingredients", length = 1000)
    private String second_ingredients;

    @Column(name = "openfoodfacts", nullable = false)
    private Boolean openfoodfacts = false;

    @Column(name = "openfoodfacts_identifier")
    private String openfoodfacts_identifier;

    @Column(name = "last_modified")
    private LocalDateTime last_modified;

    @OneToMany(mappedBy = "menuElement")
    private List<RestaurantOrder> restaurantOrders = new ArrayList<>();

    @Column(name = "priority")
    private Integer priority;

    public Integer getPriority() {
        return priority;
    }

    public void setPriority(Integer priority) {
        this.priority = priority;
    }

    public List<RestaurantOrder> getRestaurantOrders() {
        return restaurantOrders;
    }

    public void setRestaurantOrders(List<RestaurantOrder> restaurantOrders) {
        this.restaurantOrders = restaurantOrders;
    }

    public LocalDateTime getLast_modified() {
        return last_modified;
    }

    public void setLast_modified(LocalDateTime last_modified) {
        this.last_modified = last_modified;
    }

    public String getOpenfoodfacts_identifier() {
        return openfoodfacts_identifier;
    }

    public void setOpenfoodfacts_identifier(String openfoodfacts_identifier) {
        this.openfoodfacts_identifier = openfoodfacts_identifier;
    }

    public Boolean getOpenfoodfacts() {
        return openfoodfacts;
    }

    public void setOpenfoodfacts(Boolean openfoodfacts) {
        this.openfoodfacts = openfoodfacts;
    }

    public String getSecond_ingredients() {
        return second_ingredients;
    }

    public void setSecond_ingredients(String second_ingredients) {
        this.second_ingredients = second_ingredients;
    }

    public String getSecond_name() {
        return second_name;
    }

    public void setSecond_name(String second_name) {
        this.second_name = second_name;
    }

    public String getAllergens() {
        return allergens;
    }

    public void setAllergens(String allergens) {
        this.allergens = allergens;
    }

    public String getIngredients() {
        return ingredients;
    }

    public void setIngredients(String ingredients) {
        this.ingredients = ingredients;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Float getPrice() {
        return price;
    }

    public void setPrice(Float price) {
        this.price = price;
    }

    public MenuCategory getMenuCategory() {
        return menuCategory;
    }

    public void setMenuCategory(MenuCategory menuCategory) {
        this.menuCategory = menuCategory;
    }

    public List<RestaurantOrder> getOrders() {
        return restaurantOrders;
    }

    public void setOrders(List<RestaurantOrder> restaurantOrders) {
        this.restaurantOrders = restaurantOrders;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public MenuElement() {}
    public MenuElement(String name, Float price, Boolean openfoodfacts, String openfoodfacts_identifier, LocalDateTime last_modified) {
        this.name = name;
        this.price = price;
        this.openfoodfacts = openfoodfacts;
        this.openfoodfacts_identifier = openfoodfacts_identifier;
        this.last_modified = last_modified;
    }
    public MenuElement(String name, Float price, String ingredients, String allergens, String second_name, String second_ingredients,
                       Boolean openfoodfacts, String openfoodfacts_identifier, LocalDateTime last_modified) {
        this.name = name;
        this.price = price;
        this.ingredients = ingredients;
        this.allergens = allergens;
        this.second_name = second_name;
        this.second_ingredients = second_ingredients;
        this.openfoodfacts = openfoodfacts;
        this.openfoodfacts_identifier = openfoodfacts_identifier;
        this.last_modified = last_modified;
    }

    @Override
    public String toString() {
        return "{\n" +
                "\t\"priority\": \"" + priority + "\",\n" +
                "\t\"name\": \"" + name + "\",\n" +
                "\t\"last_modified\": \"" + last_modified + "\",\n" +
                "\t\"price\": \"" + price + "\",\n" +
                "\t\"ingredients\": \"" + ingredients + "\",\n" +
                "\t\"allergens\": \"" + allergens + "\",\n" +
                "\t\"second_name\": \"" + second_name + "\",\n" +
                "\t\"second_ingredients\": \"" + second_ingredients + "\",\n" +
                "\t\"openfoodfacts\": \"" + openfoodfacts + "\",\n" +
                "\t\"openfoodfacts_identifier\": \"" + openfoodfacts_identifier + "\"\n" +
                "}";
    }
    @Transactional
    public static MenuElement findElementByName(String name) {
        return MenuElement.find("SELECT e FROM MenuElement e WHERE e.name = ?1",
                name).firstResult();
    }
    @Transactional
    public static List<MenuElement> findAllElementsOrderedBy(MenuCategory category, Integer page, String order) {
        int min, max, i = 0;
        List<MenuElement> list1 = MenuElement.findAll(Sort.by(order)).list();
        List<MenuElement> list2 = new ArrayList<>();
        for(MenuElement e: list1) {
            if(e.getMenuCategory().getId().equals(category.getId())) {
                list2.add(e);
            }
        }
        list1 = new ArrayList<>();
        min = PAGES*page;
        max = min + 9;
        for (MenuElement e : list2) {
            if(i < min){
                i++;
            } else if (i >= min && i <= max) {
                list1.add(e);
                i++;
            } else { break; }
        }
        return list1;
    }
    @Transactional
    public static Integer findElementPages(Long categoryid) {
        MenuCategory c = MenuCategory.find("SELECT c FROM MenuCategory c WHERE c.id = ?1", categoryid).firstResult();
        if(c.getElement_number() <= PAGES) {
            return 1;
        }
        return (int) Math.ceil( ((double)c.getElement_number()) / 10);
    }


    @PreRemove
    public void preRemove() {
        for(RestaurantOrder o: this.restaurantOrders) {
            o.setMenuElement(null);
            o.persist();
        }
    }
}

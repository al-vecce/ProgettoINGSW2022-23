package it.uni.na.model;

import io.quarkus.hibernate.orm.panache.PanacheEntityBase;
import io.quarkus.panache.common.Page;
import jakarta.persistence.*;
import jakarta.transaction.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
public class MenuCategory extends PanacheEntityBase {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "MenuCategory_GEN")
    @SequenceGenerator(name = "MenuCategory_GEN", sequenceName = "MenuCategory_SEQ")
    @Column(name = "id", nullable = false)
    private Long id;

    @OneToMany(mappedBy = "menuCategory", cascade = CascadeType.REMOVE, orphanRemoval = true)
    private List<MenuElement> menuElements = new ArrayList<>();

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "last_modified")
    private LocalDateTime last_modified;

    @Column(name = "average_cost")
    private Float average_cost;

    @Column(name = "element_number")
    private Integer element_number;

    @Column(name = "priority")
    private Integer priority;

    public Integer getPriority() {
        return priority;
    }

    public void setPriority(Integer priority) {
        this.priority = priority;
    }

    public Integer getElement_number() {
        return element_number;
    }

    public void setElement_number(Integer element_number) {
        this.element_number = element_number;
    }

    public Float getAverage_cost() {
        return average_cost;
    }

    public void setAverage_cost(Float average_cost) {
        this.average_cost = average_cost;
    }

    public LocalDateTime getLast_modified() {
        return last_modified;
    }

    public void setLast_modified(LocalDateTime last_modified) {
        this.last_modified = last_modified;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<MenuElement> getMenuElements() {
        return menuElements;
    }

    public void setMenuElements(List<MenuElement> menuElements) {
        this.menuElements = menuElements;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    @PostLoad
    public void postLoad() {
        int temp = 0;
        float temp_avg = 0;
        for(MenuElement o: this.menuElements) {
            temp++;
            temp_avg = temp_avg + o.getPrice();
        }
        this.setElement_number(temp);
        this.setAverage_cost(temp_avg/temp);
        this.persist();
    }

    @PrePersist
    public void prePersist() {
        int temp = 0;
        float temp_avg = 0;
        for(MenuElement o: this.menuElements) {
            temp++;
            temp_avg = temp_avg + o.getPrice();
        }
        this.setElement_number(temp);
        this.setAverage_cost(temp_avg/temp);
    }

    @PreUpdate
    public void preUpdate() {
        int temp = 0;
        float temp_avg = 0;
        for(MenuElement o: this.menuElements) {
            temp++;
            temp_avg = temp_avg + o.getPrice();
        }
        this.setElement_number(temp);
        this.setAverage_cost(temp_avg/temp);
    }

    @Override
    public String toString() {
        return "{\n" +
                "\t\"priority\": \"" + priority + "\",\n" +
                "\t\"name\": \"" + name + "\",\n" +
                "\t\"last_modified\": \"" + last_modified + "\",\n" +
                "\t\"average_cost\": \"" + average_cost + "\",\n" +
                "\t\"element_number\": \"" + element_number + "\"\n" +
                "}";
    }
    @Transactional
    public static MenuCategory findCategoryByName(String name) {
        return MenuCategory.find("SELECT c FROM MenuCategory c WHERE c.name = ?1",
                name).firstResult();
    }
    @Transactional
    public static List<MenuCategory> findAllCategoriesOrderedBy(Integer page, String order) {
        return MenuCategory.find("SELECT c FROM MenuCategory c ORDER BY ?1",
                order).page(Page.of(page,10)).list();
    }
    @Transactional
    public static Integer findCategoryPages() {
        return RestaurantCheck.find("SELECT c FROM MenuCategory c").page(Page.ofSize(10)).pageCount();
    }

    public MenuCategory() {}
    public MenuCategory(String name, LocalDateTime lastmodified) {
        this.name = name;
        last_modified = lastmodified;
    }
}

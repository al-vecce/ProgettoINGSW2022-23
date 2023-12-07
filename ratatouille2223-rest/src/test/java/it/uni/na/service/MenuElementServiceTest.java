package it.uni.na.service;

import io.quarkus.panache.mock.PanacheMock;
import io.quarkus.test.InjectMock;
import io.quarkus.test.junit.QuarkusTest;
import it.uni.na.model.MenuCategory;
import it.uni.na.model.MenuElement;
import org.hibernate.Session;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.wildfly.common.Assert;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;

@QuarkusTest
class MenuElementServiceTest {

    private MenuElement element1;
    private MenuElement element2;
    private MenuCategory category;
    private String mode;
    private Integer page;

    @BeforeEach
    void setUp() {
        PanacheMock.mock(MenuElement.class);
        PanacheMock.mock(MenuCategory.class);
        element1 = Mockito.mock(MenuElement.class);
        element2 = Mockito.mock(MenuElement.class);
        category = new MenuCategory();

        category.setId(1l);
        category.setName("Primi");

        Mockito.when(MenuCategory.findCategoryByName(anyString())).thenReturn(category);
        Mockito.when(MenuElement.findAllElementsOrderedBy(any(MenuCategory.class), any(Integer.class), anyString())).thenReturn(new ArrayList<>());
    }

    @Test
    void invalidMode() {
        mode = "BYID";
        page = 0;
        assertTrue(MenuElementService.findAllElementsOrderedByModeService(category.getName(), mode, page).isEmpty());
    }
    @Test
    void validMode() {
        List<MenuElement> list = new ArrayList<>();
        list.add(element1);
        list.add(element2);
        Mockito.when(MenuElement.findAllElementsOrderedBy(any(MenuCategory.class), any(Integer.class), anyString()))
                .thenReturn(list);

        mode = "BYNAME";
        page = 0;
        assertFalse(MenuElementService.findAllElementsOrderedByModeService(category.getName(), mode, page).isEmpty());
    }
    @Test
    void anyInteger() {
        mode = "BYNAME";
        page = -46;
        Assert.assertNotNull(MenuElementService.findAllElementsOrderedByModeService(category.getName(), mode, page));
    }
}
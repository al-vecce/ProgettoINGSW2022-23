package it.uni.na.resource;

import io.quarkus.panache.mock.PanacheMock;
import io.quarkus.test.InjectMock;
import io.quarkus.test.common.http.TestHTTPEndpoint;
import io.quarkus.test.junit.QuarkusTest;
import io.restassured.http.ContentType;
import it.uni.na.model.*;
import org.hibernate.Session;
import org.hibernate.query.Query;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import static io.restassured.RestAssured.given;
import static org.mockito.ArgumentMatchers.*;

@QuarkusTest
@TestHTTPEndpoint(HomepageResource.class)
class HomepageResourceTest {

    @InjectMock
    Session session;

    private String json_request;
    private Long orderid;
    private float orderid_float;
    private RestaurantOrder order;

    @BeforeEach
    void setUp() {
        PanacheMock.mock(RestaurantOrder.class);
        order = Mockito.mock(RestaurantOrder.class);
        Query mockQuery = Mockito.mock(Query.class);
        order.setId(1L);
        order.setQuantity(6);
        order.setCheck(new RestaurantCheck());
        order.setMenuElement(new MenuElement());

        Mockito.when(RestaurantOrder.findOrderById(anyLong())).thenReturn(order);
        Mockito.doNothing().when(session).persist(Mockito.any());
        Mockito.doNothing().when(session).delete(Mockito.any());
        Mockito.when(session.createQuery(Mockito.anyString())).thenReturn(mockQuery);
        Mockito.when(mockQuery.getSingleResult()).thenReturn(0l);
    }

    @Test
    void invalidTypeOrderTest() {
        json_request = "{\"quantityoffset\": \"" + 6 + "\" }";
        orderid_float = 1f;

        given()
                .contentType(ContentType.JSON).body(json_request)
                .pathParam("order", orderid_float)
                .when().post("orders/{order}")
                .then()
                .statusCode(404);
    }
    @Test
    void correctOrderTest() {
        json_request = "{\"quantityoffset\": \"" + 6 + "\" }";
        orderid = 1L;

        given()
                .contentType(ContentType.JSON).body(json_request)
                .pathParam("order", orderid)
                .when().post("orders/{order}")
                .then()
                .statusCode(200);
    }
    @Test
    void notJsonBodyTest() {
        json_request = "{\"quantityoffset\": \"" + 6 + "\" }";
        orderid = 1L;

        given()
                .contentType(ContentType.TEXT).body(json_request)
                .pathParam("order", orderid)
                .when().post("orders/{order}")
                .then()
                .statusCode(415);
    }
    @Test
    void blankBodyTest() {
        json_request = "";
        orderid = 1L;

        given()
                .contentType(ContentType.JSON).body(json_request)
                .pathParam("order", orderid)
                .when().post("orders/{order}")
                .then()
                .statusCode(400);
    }
    @Test
    void invalidFormattingBodyTest() {
        json_request = "{\"quantityoffset\" == \"" + 6 + "\" }";
        orderid = 1L;

        given()
                .contentType(ContentType.JSON).body(json_request)
                .pathParam("order", orderid)
                .when().post("orders/{order}")
                .then()
                .statusCode(400);
    }
    @Test
    void validFormattingBodyTest() {
        json_request = "{\"quantityoffset\": \"" + 6 + "\" }";
        orderid = 1L;

        given()
                .contentType(ContentType.JSON).body(json_request)
                .pathParam("order", orderid)
                .when().post("orders/{order}")
                .then()
                .statusCode(200);
    }
}
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

import java.util.ArrayList;

import static io.restassured.RestAssured.given;
import static org.mockito.ArgumentMatchers.*;

@QuarkusTest
@TestHTTPEndpoint(CheckHistoryResource.class)
class CheckHistoryResourceTest {


    private RestaurantCheck check;
    private String mode;
    private String filterstart;
    private String filterend;
    private Integer page;

    @BeforeEach
    void setUp() {
        PanacheMock.mock(RestaurantCheck.class);
        check = Mockito.mock(RestaurantCheck.class);

        Mockito.when(RestaurantCheck.findAllChecksOrderedBy(anyInt(), anyBoolean(), anyString())).thenReturn(new ArrayList<>());
    }

    @Test
    void blankModeTest() {
        mode = "";
        filterstart = "2022-04-04T00:00:00.0000";
        filterend = "2022-04-05T00:00:00.0000";
        page = 0;

        given()
                .queryParam("mode", mode)
                .queryParam("filterstart", filterstart)
                .queryParam("filterend", filterend)
                .queryParam("page", page)
                .when().get("/filter")
                .then()
                .statusCode(400);
    }
    @Test
    void validModeTest() {
        mode = "BYTABLE";
        filterstart = "2022-04-04T00:00:00.0000";
        filterend = "2022-04-05T00:00:00.0000";
        page = 0;

        given()
                .queryParam("mode", mode)
                .queryParam("filterstart", filterstart)
                .queryParam("filterend", filterend)
                .queryParam("page", page)
                .when().get("/filter")
                .then()
                .statusCode(200);
    }
    @Test
    void blankFilterstartTest() {
        mode = "BYTABLE";
        filterstart = "";
        filterend = "2022-04-05T00:00:00.0000";
        page = 0;

        given()
                .queryParam("mode", mode)
                .queryParam("filterstart", filterstart)
                .queryParam("filterend", filterend)
                .queryParam("page", page)
                .when().get("/filter")
                .then()
                .statusCode(400);
    }
    @Test
    void validFilterstartTest() {
        mode = "BYTABLE";
        filterstart = "2022-04-04T00:00:00.0000";
        filterend = "2022-04-05T00:00:00.0000";
        page = 0;

        given()
                .queryParam("mode", mode)
                .queryParam("filterstart", filterstart)
                .queryParam("filterend", filterend)
                .queryParam("page", page)
                .when().get("/filter")
                .then()
                .statusCode(200);
    }
    @Test
    void blankFilterendTest() {
        mode = "BYTABLE";
        filterstart = "2022-04-04T00:00:00.0000";
        filterend = "";
        page = 0;

        given()
                .queryParam("mode", mode)
                .queryParam("filterstart", filterstart)
                .queryParam("filterend", filterend)
                .queryParam("page", page)
                .when().get("/filter")
                .then()
                .statusCode(400);
    }
    @Test
    void validFilterendTest() {
        mode = "BYTABLE";
        filterstart = "2022-04-04T00:00:00.0000";
        filterend = "2022-04-05T00:00:00.0000";
        page = 0;

        given()
                .queryParam("mode", mode)
                .queryParam("filterstart", filterstart)
                .queryParam("filterend", filterend)
                .queryParam("page", page)
                .when().get("/filter")
                .then()
                .statusCode(200);
    }
}
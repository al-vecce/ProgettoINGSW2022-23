package it.uni.na.resource;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.quarkus.hibernate.orm.panache.PanacheEntity;
import it.uni.na.service.EmployeeService;
import it.uni.na.service.LoginService;
import jakarta.inject.Inject;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.WebApplicationException;
import jakarta.ws.rs.core.Response;

import java.util.List;

@Path("/employees")
public class EmployeeResource {

    @Inject
    ObjectMapper objectMapper;

    @GET
    @Path("?mode={mode}&page={page}")
    public Response getEmployees(@PathParam("mode") String mode, @PathParam("page") Integer page) {
        List<PanacheEntity> list = EmployeeService.findAllOrderedBy(mode, page);
        JsonNode json_node = null;
        String newString = null;
        try {
            json_node = objectMapper.createObjectNode();
            newString = "{\"employees\": \"" + list + "\" }";
            json_node = objectMapper.readTree(newString);
        }
        catch (JsonMappingException ex1){
            throw new WebApplicationException("JSON Mapping Error for LOGIN Encountered.", 500);
        }
        catch (JsonProcessingException ex2){
            throw new WebApplicationException("JSON Parsing Error for LOGIN Encountered.", 500);
        }
        return Response.ok(json_node.toPrettyString()).build();
    }
    @GET
    @Path("/pages")
    public Response getPages() {
        Integer value = EmployeeService.findNumberPagesOfEmployees();
        return Response.ok(value).build();
    }
}

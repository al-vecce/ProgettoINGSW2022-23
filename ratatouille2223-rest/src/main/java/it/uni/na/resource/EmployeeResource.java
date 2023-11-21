package it.uni.na.resource;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import it.uni.na.service.ChangePasswordService;
import it.uni.na.service.EmployeeService;
import it.uni.na.service.FieldCheckService;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.Response;

import java.util.List;

// TODO LOGGER
@Path("/employees")
public class EmployeeResource {

    @Inject
    ObjectMapper objectMapper;

    @GET
    //@Path("?mode={mode}&page={page}")
    public Response getAllEmployeesOrderedByMode(@QueryParam("mode") String mode, @QueryParam("page") Integer page) {
        List<String> list = EmployeeService.findAllEmployeesOrderedByModeService(mode, page);
        JsonNode json_node;
        String newString;
        try {
            newString = "{ \"employees\": [";
            for (String s: list) {
                newString = newString + s + ",";
            }
            newString = newString.substring(0, newString.length() - 1) + "]}";
            json_node = objectMapper.readTree(newString);
        }
        catch (JsonMappingException ex1){
            throw new WebApplicationException("JSON Mapping Error for EMPLOYEES/GET Encountered.", 500);
        }
        catch (JsonProcessingException ex2){
            throw new WebApplicationException("JSON Parsing Error for EMPLOYEES/GET Encountered.", 500);
        }
        return Response.ok(json_node.toPrettyString()).build();
    }
    @GET
    @Path("/pages")
    public Response getNumberOfPages() {
        Integer value = EmployeeService.findNumberOfPagesOfEmployeesService();
        return Response.ok(value).build();
    }
    @POST
    public Response postUpdateEmployeeByUsername(String json_request) {
        JsonNode json_node, temp_node;
        String newString, oldusername, employeerole, username, password, confirmation;
        Boolean result;
        try {
            json_node = objectMapper.readTree(json_request);
            temp_node = json_node.get("oldusername");
            if(temp_node == null) { throw new WebApplicationException("Not enough arguments in UPDATEMPLOYEE encountered.", 400); }
            oldusername = temp_node.asText();
            temp_node = json_node.get("username");
            if(temp_node == null) { throw new WebApplicationException("Not enough arguments in UPDATEMPLOYEE encountered.", 400); }
            username = temp_node.asText();
            temp_node = json_node.get("employeerole");
            if(temp_node == null) { throw new WebApplicationException("Not enough arguments in UPDATEMPLOYEE encountered.", 400); }
            employeerole = temp_node.asText();
            temp_node = json_node.get("password");
            if(temp_node == null) { throw new WebApplicationException("Not enough arguments in UPDATEMPLOYEE encountered.", 400); }
            password = temp_node.asText();
            temp_node = json_node.get("confirmation");
            if(temp_node == null) { throw new WebApplicationException("Not enough arguments in UPDATEMPLOYEE encountered.", 400); }
            confirmation = temp_node.asText();
            result = EmployeeService.evaluateUpdateEmployeeService(oldusername, username, employeerole, password, confirmation);
            newString = "{\"result\": \"" + result + "\" }";
            json_node = objectMapper.readTree(newString);
            return Response.ok(json_node.toPrettyString()).build();
        }
        catch (JsonMappingException ex1){
            throw new WebApplicationException("JSON Mapping Error for UPDATEMPLOYEE encountered.", 500);
        }
        catch (JsonProcessingException ex2){
            throw new WebApplicationException("JSON Parsing Error for UPDATEMPLOYEE encountered.", 500);
        }
    }
    @PUT
    public Response putEmployeeByUsername(String json_request) {
        JsonNode json_node, temp_node;
        String newString, employeerole, username, password;
        Boolean result;
        try {
            json_node = objectMapper.readTree(json_request);
            temp_node = json_node.get("username");
            if(temp_node == null) { throw new WebApplicationException("Not enough arguments in UPDATEMPLOYEE encountered.", 400); }
            username = temp_node.asText();
            temp_node = json_node.get("employeerole");
            if(temp_node == null) { throw new WebApplicationException("Not enough arguments in UPDATEMPLOYEE encountered.", 400); }
            employeerole = temp_node.asText();
            temp_node = json_node.get("password");
            if(temp_node == null) { throw new WebApplicationException("Not enough arguments in UPDATEMPLOYEE encountered.", 400); }
            password = temp_node.asText();
            result = EmployeeService.evaluateCreateEmployeeService(username, employeerole, password);
            newString = "{\"result\": \"" + result + "\" }";
            json_node = objectMapper.readTree(newString);
            return Response.ok(json_node.toPrettyString()).build();
        }
        catch (JsonMappingException ex1){
            throw new WebApplicationException("JSON Mapping Error for UPDATEMPLOYEE encountered.", 500);
        }
        catch (JsonProcessingException ex2){
            throw new WebApplicationException("JSON Parsing Error for UPDATEMPLOYEE encountered.", 500);
        }
    }
    @DELETE
    public Response deleteEmployeeByUsername(String json_request) {
        JsonNode json_node, temp_node;
        String newString, username;
        Boolean result;
        try {
            json_node = objectMapper.readTree(json_request);
            temp_node = json_node.get("username");
            if(temp_node == null) { throw new WebApplicationException("Not enough arguments in UPDATEMPLOYEE encountered.", 400); }
            username = temp_node.asText();
            result = EmployeeService.evaluateDeleteEmployeeService(username);
            newString = "{\"result\": \"" + result + "\" }";
            json_node = objectMapper.readTree(newString);
            return Response.ok(json_node.toPrettyString()).build();
        }
        catch (JsonMappingException ex1){
            throw new WebApplicationException("JSON Mapping Error for UPDATEMPLOYEE encountered.", 500);
        }
        catch (JsonProcessingException ex2){
            throw new WebApplicationException("JSON Parsing Error for UPDATEMPLOYEE encountered.", 500);
        }
    }
}

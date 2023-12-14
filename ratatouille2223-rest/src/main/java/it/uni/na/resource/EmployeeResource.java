package it.uni.na.resource;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import it.uni.na.service.EmployeeService;
import jakarta.annotation.security.RolesAllowed;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.Response;

import java.util.List;

// TODO LOGGER
@Path("/employees")
//TODO @RolesAllowed("AMMINISTRATORE")
public class EmployeeResource {

    @Inject
    ObjectMapper objectMapper;

    /*@GET
    @Produces("application/json")
    public Response getAllEmployees() {

        List<String> list = EmployeeService.findAllEmployeesOrderedByModeService("BYUSERNAME", 0);

        if(list.isEmpty()) {
            return Response.ok("{ \"employees\": \"null\" }").build();
        }

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
            return Response.ok("JSON Mapping Error for EMPLOYEES/GET Encountered.").status(500).build();
        }
        catch (JsonProcessingException ex2){
            return Response.ok("JSON Parsing Error for EMPLOYEES/GET Encountered.").status(500).build();
        }
        return Response.ok(json_node.toPrettyString()).build();
    }*/
    @GET
    @Produces("application/json")
    public Response getAllEmployeesOrderedByMode(@QueryParam("mode") String mode, @QueryParam("page") Integer page) {

        List<String> list = EmployeeService.findAllEmployeesOrderedByModeService(mode, page);

        if(list.isEmpty()) {
            return Response.ok("{ \"employees\": \"null\" }").build();
        }

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
            return Response.ok("JSON Mapping Error for EMPLOYEES/GET Encountered.").status(500).build();
        }
        catch (JsonProcessingException ex2){
            return Response.ok("JSON Parsing Error for EMPLOYEES/GET Encountered.").status(500).build();
        }
        return Response.ok(json_node.toPrettyString()).build();
    }
    @GET
    @Path("/pages")
    @Produces("application/json")
    public Response getNumberOfPages() {
        Integer value = EmployeeService.findNumberOfPagesOfEmployeesService();
        return Response.ok(value).build();
    }
    @POST
    @Consumes("application/json")
    @Produces("application/json")
    public Response postUpdateEmployeeByUsername(String json_request) {
        JsonNode json_node, temp_node;
        String newString, oldusername, employeerole, username, password, confirmation;
        Boolean result;
        try {
            json_node = objectMapper.readTree(json_request);
            temp_node = json_node.get("oldusername");
            if(temp_node == null) { return Response.ok("Inaccurate arguments in EMPLOYEES/UPDATE encountered.").status(400).build(); }
            oldusername = temp_node.asText();
            temp_node = json_node.get("username");
            if(temp_node == null) { return Response.ok("Inaccurate arguments in EMPLOYEES/UPDATE encountered.").status(400).build(); }
            username = temp_node.asText();
            temp_node = json_node.get("employeerole");
            if(temp_node == null) { return Response.ok("Inaccurate arguments in EMPLOYEES/UPDATE encountered.").status(400).build(); }
            employeerole = temp_node.asText();
            temp_node = json_node.get("password");
            if(temp_node == null) { return Response.ok("Inaccurate arguments in EMPLOYEES/UPDATE encountered.").status(400).build(); }
            password = temp_node.asText();
            temp_node = json_node.get("confirmation");
            if(temp_node == null) { return Response.ok("Inaccurate arguments in EMPLOYEES/UPDATE encountered.").status(400).build(); }
            confirmation = temp_node.asText();
            result = EmployeeService.evaluateUpdateEmployeeService(oldusername, username, employeerole, password, confirmation);
            newString = "{\"result\": \"" + result + "\" }";
            json_node = objectMapper.readTree(newString);
            return Response.ok(json_node.toPrettyString()).build();
        }
        catch (JsonMappingException ex1){
            return Response.ok("JSON Mapping Error for EMPLOYEES/UPDATE encountered.").status(500).build();
        }
        catch (JsonProcessingException ex2){
            return Response.ok("JSON Parsing Error for EMPLOYEES/UPDATE encountered.").status(500).build();
        }
    }
    @PUT
    @Consumes("application/json")
    @Produces("application/json")
    public Response putEmployeeByUsername(String json_request) {
        JsonNode json_node, temp_node;
        String newString, employeerole, username, password;
        Boolean result;
        try {
            json_node = objectMapper.readTree(json_request);
            temp_node = json_node.get("username");
            if(temp_node == null) { return Response.ok("Inaccurate arguments in EMPLOYEES/CREATE encountered.").status(400).build(); }
            username = temp_node.asText();
            temp_node = json_node.get("employeerole");
            if(temp_node == null) { return Response.ok("Inaccurate arguments in EMPLOYEES/CREATE encountered.").status(400).build(); }
            employeerole = temp_node.asText();
            temp_node = json_node.get("password");
            if(temp_node == null) { return Response.ok("Inaccurate arguments in EMPLOYEES/CREATE encountered.").status(400).build(); }
            password = temp_node.asText();
            result = EmployeeService.evaluateCreateEmployeeService(username, employeerole, password);
            newString = "{\"result\": \"" + result + "\" }";
            json_node = objectMapper.readTree(newString);
            return Response.ok(json_node.toPrettyString()).build();
        }
        catch (JsonMappingException ex1){
            return Response.ok("JSON Mapping Error for EMPLOYEES/CREATE encountered.").status(500).build();
        }
        catch (JsonProcessingException ex2){
            return Response.ok("JSON Parsing Error for EMPLOYEES/CREATE encountered.").status(500).build();
        }
    }
    @DELETE
    @Consumes("application/json")
    @Produces("application/json")
    public Response deleteEmployeeByUsername(String json_request) {
        JsonNode json_node, temp_node;
        String newString, username;
        Boolean result;
        try {
            json_node = objectMapper.readTree(json_request);
            temp_node = json_node.get("username");
            if(temp_node == null) { return Response.ok("Inaccurate arguments in EMPLOYEES/DELETE encountered.").status(400).build(); }
            username = temp_node.asText();
            result = EmployeeService.evaluateDeleteEmployeeService(username);
            newString = "{\"result\": \"" + result + "\" }";
            json_node = objectMapper.readTree(newString);
            return Response.ok(json_node.toPrettyString()).build();
        }
        catch (JsonMappingException ex1){
            return Response.ok("JSON Mapping Error for EMPLOYEES/DELETE encountered.").status(500).build();
        }
        catch (JsonProcessingException ex2){
            return Response.ok("JSON Parsing Error for EMPLOYEES/DELETE encountered.").status(500).build();
        }
    }
}

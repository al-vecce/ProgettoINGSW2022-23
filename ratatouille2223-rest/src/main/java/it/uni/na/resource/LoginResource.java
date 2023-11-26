package it.uni.na.resource;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import it.uni.na.service.FieldCheckService;
import it.uni.na.service.LoginService;
import jakarta.annotation.security.PermitAll;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.Response;

// TODO LOGGER
@Path("/login")
@PermitAll
public class LoginResource {

    @Inject
    ObjectMapper objectMapper;

    @POST
    @Produces("application/json")
    @Consumes("application/json")
    public Response postLogin(String json_request) {
        JsonNode json_node, temp_node;
        String newString, username, password;
        String result;
        try {
            json_node = objectMapper.readTree(json_request);
            temp_node = json_node.get("username");
            if(temp_node == null) { return Response.ok("Inaccurate arguments in LOGIN/POST encountered.").status(400).build(); }
            username = temp_node.asText();
            temp_node = json_node.get("password");
            if(temp_node == null) { return Response.ok("Inaccurate arguments in LOGIN/POST encountered.").status(400).build(); }
            password = temp_node.asText();

            result = LoginService.evaluateLoginFormService(username, password);
            newString = "{\"JWT Authentication Code\": \"" + result + "\", " +
                        "\"firstlogin\": \"" + LoginService.checkFirstLoginStatus(username) + "\" }";
            json_node = objectMapper.readTree(newString);
            return Response.ok(json_node.toPrettyString()).build();
        }
        catch (JsonMappingException ex1){
            return Response.ok("JSON Mapping Error for LOGIN encountered.").status(400).build();
        }
        catch (JsonProcessingException ex2){
            return Response.ok("JSON Parsing Error for LOGIN encountered.").status(400).build();
        }
    }
    @POST
    @Produces("application/json")
    @Consumes("application/json")
    @Path("/username")
    public Response postUsername(String json_request) {
        JsonNode json_node, temp_node;
        String newString, username, result;
        try {
            json_node = objectMapper.readTree(json_request);
            temp_node = json_node.get("username");
            if(temp_node == null) { return Response.ok("Inaccurate arguments in LOGIN/USERNAME encountered.").status(400).build(); }
            username = temp_node.asText();

            result = FieldCheckService.checkUsernameValidityService(username);
            newString = "{\"username\": \"" + result + "\" }";
            json_node = objectMapper.readTree(newString);
            return Response.ok(json_node.toPrettyString()).build();
        }
        catch (JsonMappingException ex1){
            return Response.ok("JSON Mapping Error for LOGIN/USERNAME Encountered.").status(400).build();
        }
        catch (JsonProcessingException ex2){
            return Response.ok("JSON Parsing Error for LOGIN/USERNAME Encountered.").status(400).build();
        }
    }
    @POST
    @Produces("application/json")
    @Consumes("application/json")
    @Path("/password")
    public Response postPassword(String json_request) {
        JsonNode json_node, temp_node;
        String newString, password, result;
        try {
            json_node = objectMapper.readTree(json_request);
            temp_node = json_node.get("password");
            if(temp_node == null) { return Response.ok("Inaccurate arguments in LOGIN/PASSWORD encountered.").status(400).build(); }
            password = temp_node.asText();
            result = FieldCheckService.checkPasswordValidityService(password);
            newString = "{\"password\": \"" + result + "\" }";
            json_node = objectMapper.readTree(newString);
            return Response.ok(json_node.toPrettyString()).build();
        }
        catch (JsonMappingException ex1){
            return Response.ok("JSON Mapping Error for LOGIN/PASSWORD Encountered.").status(400).build();
        }
        catch (JsonProcessingException ex2){
            return Response.ok("JSON Parsing Error for LOGIN/PASSWORD Encountered.").status(400).build();
        }
    }
}

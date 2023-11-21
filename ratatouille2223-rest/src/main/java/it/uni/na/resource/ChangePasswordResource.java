package it.uni.na.resource;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import it.uni.na.service.ChangePasswordService;
import it.uni.na.service.LoginService;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.Response;

@Path("/login/first-login")
public class ChangePasswordResource {

    @Inject
    ObjectMapper objectMapper;

    @POST
    @Produces("application/json")
    @Consumes("application/json")
    public Response postChangePassword(String json_request) {
        JsonNode json_node = null, temp_node = null;
        String newString = null, username, password, confirmation;
        Boolean result;
        try {
            json_node = objectMapper.readTree(json_request);
            temp_node = json_node.get("username");
            if(temp_node == null) { throw new WebApplicationException("Not enough arguments in FIRSTLOGIN encountered.", 400); }
            username = temp_node.asText();
            temp_node = json_node.get("password");
            if(temp_node == null) { throw new WebApplicationException("Not enough arguments in FIRSTLOGIN encountered.", 400); }
            password = temp_node.asText();
            temp_node = json_node.get("confirmation");
            if(temp_node == null) { throw new WebApplicationException("Not enough arguments in FIRSTLOGIN encountered.", 400); }
            confirmation = temp_node.asText();
            result = ChangePasswordService.evaluateChangePasswordFormService(username, password, confirmation);
            //json_node = objectMapper.createObjectNode();
            newString = "{\"result\": \"" + result + "\" }";
            json_node = objectMapper.readTree(newString);
            return Response.ok(json_node.toPrettyString()).build();
        }
        catch (JsonMappingException ex1){
            throw new WebApplicationException("JSON Mapping Error for FIRSTLOGIN encountered.", 500);
        }
        catch (JsonProcessingException ex2){
            throw new WebApplicationException("JSON Parsing Error for FIRSTLOGIN encountered.", 500);
        }
    }
    @POST
    @Produces("application/json")
    @Consumes("application/json")
    @Path("/password")
    public Response postPassword(String json_request) {
        JsonNode json_node = null, temp_node;
        String newString = null, password, result;
        try {
            json_node = objectMapper.readTree(json_request);
            temp_node = json_node.get("password");
            if(temp_node == null) { throw new WebApplicationException("Not enough arguments in FIRSTLOGIN/PASSWORD encountered.", 400); }
            password = temp_node.asText();
            result = LoginService.checkPasswordValidityService(password);
            //json_node = objectMapper.createObjectNode();
            newString = "{\"password\": \"" + result + "\" }";
            json_node = objectMapper.readTree(newString);
            return Response.ok(json_node.toPrettyString()).build();
        }
        catch (JsonMappingException ex1){
            throw new WebApplicationException("JSON Mapping Error for FIRSTLOGIN/PASSWORD Encountered.", 500);
        }
        catch (JsonProcessingException ex2){
            throw new WebApplicationException("JSON Parsing Error for FIRSTLOGIN/PASSWORD Encountered.", 500);
        }
    }
    @POST
    @Produces("application/json")
    @Consumes("application/json")
    @Path("/confirmation")
    public Response postconfirmation(String json_request) {
        JsonNode json_node = null, temp_node;
        String newString = null, password, result;
        try {
            json_node = objectMapper.readTree(json_request);
            temp_node = json_node.get("confirmation");
            if(temp_node == null) { throw new WebApplicationException("Not enough arguments in FIRSTLOGIN/CONFIRMATION encountered.", 400); }
            password = temp_node.asText();
            result = LoginService.checkPasswordValidityService(password);
            //json_node = objectMapper.createObjectNode();
            newString = "{\"confirmation\": \"" + result + "\" }";
            json_node = objectMapper.readTree(newString);
            return Response.ok(json_node.toPrettyString()).build();
        }
        catch (JsonMappingException ex1){
            throw new WebApplicationException("JSON Mapping Error for FIRSTLOGIN/CONFIRMATION Encountered.", 500);
        }
        catch (JsonProcessingException ex2){
            throw new WebApplicationException("JSON Parsing Error for FIRSTLOGIN/CONFIRMATION Encountered.", 500);
        }
    }
}

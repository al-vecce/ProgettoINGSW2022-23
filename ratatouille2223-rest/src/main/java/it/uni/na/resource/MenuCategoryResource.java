package it.uni.na.resource;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import it.uni.na.service.MenuCategoryService;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.Response;

import java.util.List;

@Path("/menu/category")
//TODO @RolesAllowed({"SUPERVISORE", "AMMINISTRATORE"})
public class MenuCategoryResource {

    @Inject
    ObjectMapper objectMapper;

    @GET
    @Produces("application/json")
    public Response getAllCategories() {
        List<String> list = MenuCategoryService.findAllCategoriesOrderedByModeService("BYNAME", 0);
        if(list.isEmpty()) {
            return Response.ok("{ \"categories\": \"null\" }").build();
        }

        JsonNode json_node;
        String newString;
        try {
            newString = "{ \"categories\": [";
            for (String s: list) {
                newString = newString + s + ",";
            }
            newString = newString.substring(0, newString.length() - 1) + "]}";
            json_node = objectMapper.readTree(newString);
        }
        catch (JsonMappingException ex1){
            return Response.ok("JSON Mapping Error for MENU/CATEGORY/GETALL Encountered.").status(500).build();
        }
        catch (JsonProcessingException ex2){
            return Response.ok("JSON Parsing Error for MENU/CATEGORY/GETALL Encountered.").status(500).build();
        }
        return Response.ok(json_node.toPrettyString()).build();
    }

    @GET
    @Produces("application/json")
    public Response getAllCategoriesOrderedByMode(@QueryParam("mode") String mode, @QueryParam("page") Integer page) {
        if(mode == null || page == null) {
            return Response.ok("Inaccurate arguments in MENU/CATEGORY/GETALLORDERED encountered.").status(400).build();
        }

        List<String> list = MenuCategoryService.findAllCategoriesOrderedByModeService(mode, page);
        if(list.isEmpty()) {
            return Response.ok("{ \"categories\": \"null\" }").build();
        }

        JsonNode json_node;
        String newString;
        try {
            newString = "{ \"categories\": [";
            for (String s: list) {
                newString = newString + s + ",";
            }
            newString = newString.substring(0, newString.length() - 1) + "]}";
            json_node = objectMapper.readTree(newString);
        }
        catch (JsonMappingException ex1){
            return Response.ok("JSON Mapping Error for MENU/CATEGORY/GETALLORDERED Encountered.").status(500).build();
        }
        catch (JsonProcessingException ex2){
            return Response.ok("JSON Parsing Error for MENU/CATEGORY/GETALLORDERED Encountered.").status(500).build();
        }
        return Response.ok(json_node.toPrettyString()).build();
    }

    @GET
    @Produces("application/json")
    @Path("/pages")
    public Response getNumberOfPages() {
        JsonNode json_node;
        String newString;
        Integer result;
        try {
            result = MenuCategoryService.findNumberOfPages();
            newString = "{\"pages\": \"" + result + "\" }";
            json_node = objectMapper.readTree(newString);
            return Response.ok(json_node.toPrettyString()).build();
        }
        catch (JsonMappingException ex1){
            return Response.ok("JSON Mapping Error for MENU/CATEGORY/POSTUPDATE encountered.").status(500).build();
        }
        catch (JsonProcessingException ex2){
            return Response.ok("JSON Parsing Error for MENU/CATEGORY/POSTUPDATE encountered.").status(500).build();
        }
    }

    @POST
    @Path("/name")
    @Produces("application/json")
    @Consumes("application/json")
    public Response postCategoryName(String json_request) {
        if(json_request == null || json_request.isBlank()) {
            return Response.ok("Inaccurate arguments in MENU/CATEGORY/POSTUPDATE encountered.").status(400).build();
        }
        JsonNode json_node,temp_node;
        String newString, name, result;
        try {
            json_node = objectMapper.readTree(json_request);
            temp_node = json_node.get("name");
            if(temp_node == null) { return Response.ok("Inaccurate arguments in MENU/CATEGORY/POSTUPDATE encountered.").status(400).build(); }
            name = temp_node.asText();

            result = MenuCategoryService.checkCategoryNameValidityService(name);
            newString = "{\"result\": \"" + result + "\" }";
            json_node = objectMapper.readTree(newString);
            return Response.ok(json_node.toPrettyString()).build();
        }
        catch (JsonMappingException ex1){
            return Response.ok("JSON Mapping Error for MENU/CATEGORY/POSTUPDATE encountered.").status(500).build();
        }
        catch (JsonProcessingException ex2){
            return Response.ok("JSON Parsing Error for MENU/CATEGORY/POSTUPDATE encountered.").status(500).build();
        }
    }

    @POST
    @Path("{oldname}")
    @Produces("application/json")
    @Consumes("application/json")
    public Response postUpdateCategoryByName(@PathParam("oldname") String oldname, String json_request) {
        if(oldname == null || oldname.isBlank() || json_request == null || json_request.isBlank()) {
            return Response.ok("Inaccurate arguments in MENU/CATEGORY/POSTUPDATE encountered.").status(400).build();
        }
        JsonNode json_node,temp_node;
        String newString, name;
        Boolean result;
        try {
            json_node = objectMapper.readTree(json_request);
            temp_node = json_node.get("name");
            if(temp_node == null) { return Response.ok("Inaccurate arguments in MENU/CATEGORY/POSTUPDATE encountered.").status(400).build(); }
            name = temp_node.asText();

            result = MenuCategoryService.evaluateUpdateCategoryService(oldname, name);
            newString = "{\"result\": \"" + result + "\" }";
            json_node = objectMapper.readTree(newString);
            return Response.ok(json_node.toPrettyString()).build();
        }
        catch (JsonMappingException ex1){
            return Response.ok("JSON Mapping Error for MENU/CATEGORY/POSTUPDATE encountered.").status(500).build();
        }
        catch (JsonProcessingException ex2){
            return Response.ok("JSON Parsing Error for MENU/CATEGORY/POSTUPDATE encountered.").status(500).build();
        }
    }

    @DELETE
    @Path("{name}")
    public Response deleteCategoryByName(@PathParam("name") String name) {
        if(name == null || name.isBlank()) {
            return Response.ok("Inaccurate arguments in MENU/CATEGORY/DELETE encountered.").status(400).build();
        }
        JsonNode json_node;
        String newString;
        Boolean result;
        try {
            result = MenuCategoryService.evaluateDeleteCategoryService(name);
            newString = "{\"result\": \"" + result + "\" }";
            json_node = objectMapper.readTree(newString);
            return Response.ok(json_node.toPrettyString()).build();
        }
        catch (JsonMappingException ex1){
            return Response.ok("JSON Mapping Error for MENU/CATEGORY/DELETE encountered.").status(500).build();
        }
        catch (JsonProcessingException ex2){
            return Response.ok("JSON Parsing Error for MENU/CATEGORY/DELETE encountered.").status(500).build();
        }
    }

    @PUT
    @Path("{name}")
    public Response putCategoriesByName(@PathParam("name") String name) {
        if(name == null || name.isBlank()) {
            return Response.ok("Inaccurate arguments in MENU/CATEGORY/PUT encountered.").status(400).build();
        }
        JsonNode json_node;
        String newString;
        Boolean result;
        try {
            result = MenuCategoryService.evaluateCreateCategoryService(name);
            newString = "{\"result\": \"" + result + "\" }";
            json_node = objectMapper.readTree(newString);
            return Response.ok(json_node.toPrettyString()).build();
        }
        catch (JsonMappingException ex1){
            return Response.ok("JSON Mapping Error for MENU/CATEGORY/PUT encountered.").status(500).build();
        }
        catch (JsonProcessingException ex2){
            return Response.ok("JSON Parsing Error for MENU/CATEGORY/PUT encountered.").status(500).build();
        }

    }
}

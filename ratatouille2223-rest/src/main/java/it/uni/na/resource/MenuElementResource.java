package it.uni.na.resource;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import it.uni.na.service.MenuElementService;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.Response;

import java.util.List;

@Path("/menu/categories")
//
//TODO @RolesAllowed({"SUPERVISORE", "AMMINISTRATORE"})
public class MenuElementResource {

    @Inject
    ObjectMapper objectMapper;

    @GET
    @Produces("application/json")
    public Response getAllElementsOrderedByMode(@QueryParam("mode") String mode, @QueryParam("page") Integer page) {
        if(mode == null || mode.isEmpty() || page == null) {
            return Response.ok("Inaccurate arguments in MENU/ELEMENTS/GETALLORDERED encountered.").status(400).build();
        }

        List<String> list = MenuElementService.findAllElementsOrderedByModeService(mode, page);
        if(list.isEmpty()) {
            return Response.ok("{ \"elements\": \"null\" }").build();
        }

        JsonNode json_node;
        String newString;
        try {
            newString = "{ \"elements\": [";
            for (String s: list) {
                newString = newString + s + ",";
            }
            newString = newString.substring(0, newString.length() - 1) + "]}";
            json_node = objectMapper.readTree(newString);
        }
        catch (JsonMappingException ex1){
            return Response.ok("JSON Mapping Error for MENU/ELEMENTS/GETALLORDERED Encountered.").status(400).build();
        }
        catch (JsonProcessingException ex2){
            return Response.ok("JSON Parsing Error for MENU/ELEMENTS/GETALLORDERED Encountered.").status(400).build();
        }
        return Response.ok(json_node.toPrettyString()).build();
    }

    @GET
    @Produces("application/json")
    @Path("/{category}/pages")
    public Response getNumberOfPages(@PathParam("category") String category) {
        if(category == null || category.isEmpty()) {
            return Response.ok("Inaccurate arguments in MENU/ELEMENTS/GETPAGES encountered.").status(400).build();
        }
        JsonNode json_node;
        String newString;
        Integer result;
        try {
            result = MenuElementService.findNumberOfPagesOfElementsService(category);
            newString = "{\"pages\": \"" + result + "\" }";
            json_node = objectMapper.readTree(newString);
            return Response.ok(json_node.toPrettyString()).build();
        }
        catch (JsonMappingException ex1){
            return Response.ok("JSON Mapping Error for MENU/ELEMENTS/GETPAGES encountered.").status(500).build();
        }
        catch (JsonProcessingException ex2){
            return Response.ok("JSON Parsing Error for MENU/ELEMENTS/GETPAGES encountered.").status(500).build();
        }
    }

    @POST
    @Path("/elements/name")
    @Produces("application/json")
    @Consumes("application/json")
    public Response postName(@PathParam("category") String category,
                             String json_request) {
        if(json_request == null || json_request.isBlank() ||
                category == null || category.isEmpty()) {
            return Response.ok("Inaccurate arguments in MENU/ELEMENTS/POSTNAME encountered.").status(400).build();
        }
        JsonNode json_node,temp_node;
        String newString, name, result;
        try {
            json_node = objectMapper.readTree(json_request);
            temp_node = json_node.get("name");
            if(temp_node == null) { return Response.ok("Inaccurate arguments in MENU/ELEMENTS/POSTNAME encountered.").status(400).build(); }
            name = temp_node.asText();

            result = MenuElementService.checkElementNameValidityService(name);
            newString = "{\"result\": \"" + result + "\" }";
            json_node = objectMapper.readTree(newString);
            return Response.ok(json_node.toPrettyString()).build();
        }
        catch (JsonMappingException ex1){
            return Response.ok("JSON Mapping Error for MENU/ELEMENTS/POSTNAME encountered.").status(400).build();
        }
        catch (JsonProcessingException ex2){
            return Response.ok("JSON Parsing Error for MENU/ELEMENTS/POSTNAME encountered.").status(400).build();
        }
    }
    @POST
    @Path("/elements/ingredients")
    @Produces("application/json")
    @Consumes("application/json")
    public Response postIngredients(@PathParam("category") String category,
                             String json_request) {
        if(json_request == null || json_request.isBlank() ||
                category == null || category.isEmpty()) {
            return Response.ok("Inaccurate arguments in MENU/ELEMENTS/POSTINGREDIENTS encountered.").status(400).build();
        }
        JsonNode json_node,temp_node;
        String newString, ingredients, result;
        try {
            json_node = objectMapper.readTree(json_request);
            temp_node = json_node.get("ingredients");
            if(temp_node == null) { return Response.ok("Inaccurate arguments in MENU/ELEMENTS/POSTINGREDIENTS encountered.").status(400).build(); }
            ingredients = temp_node.asText();

            result = MenuElementService.checkIngredientsValidityService(ingredients);
            newString = "{\"result\": \"" + result + "\" }";
            json_node = objectMapper.readTree(newString);
            return Response.ok(json_node.toPrettyString()).build();
        }
        catch (JsonMappingException ex1){
            return Response.ok("JSON Mapping Error for MENU/ELEMENTS/POSTINGREDIENTS encountered.").status(400).build();
        }
        catch (JsonProcessingException ex2){
            return Response.ok("JSON Parsing Error for MENU/ELEMENTS/POSTINGREDIENTS encountered.").status(400).build();
        }
    }
    @POST
    @Path("/elements/allergens")
    @Produces("application/json")
    @Consumes("application/json")
    public Response postAllergens(@PathParam("category") String category,
                                    String json_request) {
        if(json_request == null || json_request.isBlank() ||
                category == null || category.isEmpty()) {
            return Response.ok("Inaccurate arguments in MENU/ELEMENTS/POSTALLERGENS encountered.").status(400).build();
        }
        JsonNode json_node,temp_node;
        String newString, allergens, result;
        try {
            json_node = objectMapper.readTree(json_request);
            temp_node = json_node.get("ingredients");
            if(temp_node == null) { return Response.ok("Inaccurate arguments in MENU/ELEMENTS/POSTALLERGENS encountered.").status(400).build(); }
            allergens = temp_node.asText();

            result = MenuElementService.checkAllergensValidityService(allergens);
            newString = "{\"result\": \"" + result + "\" }";
            json_node = objectMapper.readTree(newString);
            return Response.ok(json_node.toPrettyString()).build();
        }
        catch (JsonMappingException ex1){
            return Response.ok("JSON Mapping Error for MENU/ELEMENTS/POSTALLERGENS encountered.").status(400).build();
        }
        catch (JsonProcessingException ex2){
            return Response.ok("JSON Parsing Error for MENU/ELEMENTS/POSTALLERGENS encountered.").status(400).build();
        }
    }

    @POST
    @Path("/{category}/{oldname}")
    @Produces("application/json")
    @Consumes("application/json")
    public Response postUpdateCategoryByName(@PathParam("category") String category,
                                             @PathParam("oldname") String oldname,
                                             String json_request) {
        if(oldname == null || oldname.isBlank() || json_request == null || json_request.isBlank() ||
            category == null || category.isEmpty()) {
            return Response.ok("Inaccurate arguments in MENU/ELEMENTS/POSTUPDATE encountered.").status(400).build();
        }
        if(!MenuElementService.isElementOfCategory(category, oldname)) {
            return Response.ok("Category does not exist.").status(400).build();
        }
        JsonNode json_node,temp_node;
        String newString, name, ingredients, allergens, second_name, second_ingredients, openfoodfacts_identifier;
        float price;
        boolean result, openfoodfacts;
        try {
            json_node = objectMapper.readTree(json_request);
            temp_node = json_node.get("name");
            if(temp_node == null) { return Response.ok("Inaccurate arguments in MENU/ELEMENTS/POSTUPDATE encountered.").status(400).build(); }
            name = temp_node.asText();
            temp_node = json_node.get("price");
            if(temp_node == null) { return Response.ok("Inaccurate arguments in MENU/ELEMENTS/POSTUPDATE encountered.").status(400).build(); }
            newString = temp_node.asText();
            if(newString == null || newString.isEmpty()) { return Response.ok("Inaccurate arguments in MENU/ELEMENTS/POSTUPDATE encountered.").status(400).build(); }
            price = Float.parseFloat(newString);
            temp_node = json_node.get("ingredients");
            if(temp_node == null) { return Response.ok("Inaccurate arguments in MENU/ELEMENTS/POSTUPDATE encountered.").status(400).build(); }
            ingredients = temp_node.asText();
            temp_node = json_node.get("allergens");
            if(temp_node == null) { return Response.ok("Inaccurate arguments in MENU/ELEMENTS/POSTUPDATE encountered.").status(400).build(); }
            allergens = temp_node.asText();
            temp_node = json_node.get("second_name");
            if(temp_node == null) { return Response.ok("Inaccurate arguments in MENU/ELEMENTS/POSTUPDATE encountered.").status(400).build(); }
            second_name = temp_node.asText();
            temp_node = json_node.get("second_ingredients");
            if(temp_node == null) { return Response.ok("Inaccurate arguments in MENU/ELEMENTS/POSTUPDATE encountered.").status(400).build(); }
            second_ingredients = temp_node.asText();
            temp_node = json_node.get("openfoodfacts");
            if(temp_node == null) { return Response.ok("Inaccurate arguments in MENU/ELEMENTS/POSTUPDATE encountered.").status(400).build(); }
            openfoodfacts = temp_node.asBoolean();
            temp_node = json_node.get("openfoodfacts_identifier");
            if(temp_node == null) { return Response.ok("Inaccurate arguments in MENU/ELEMENTS/POSTUPDATE encountered.").status(400).build(); }
            openfoodfacts_identifier = temp_node.asText();

            result = MenuElementService.evaluateUpdateElementService(oldname, name, price, ingredients, allergens,
                    second_name, second_ingredients, openfoodfacts, openfoodfacts_identifier);
            newString = "{\"result\": \"" + result + "\" }";
            json_node = objectMapper.readTree(newString);
            return Response.ok(json_node.toPrettyString()).build();
        }
        catch (JsonMappingException ex1){
            return Response.ok("JSON Mapping Error for MENU/ELEMENTS/POSTUPDATE encountered.").status(400).build();
        }
        catch (JsonProcessingException ex2){
            return Response.ok("JSON Parsing Error for MENU/ELEMENTS/POSTUPDATE encountered.").status(400).build();
        }
    }

    @DELETE
    @Path("/{category}/{name}")
    public Response deleteCategoryByName(@PathParam("category") String category,
                                         @PathParam("name") String name) {
        if(name == null || name.isBlank() || category == null || category.isEmpty()) {
            return Response.ok("Inaccurate arguments in MENU/ELEMENTS/DELETE encountered.").status(400).build();
        }
        if(!MenuElementService.isElementOfCategory(category, name)) {
            return Response.ok("Category does not exist.").status(400).build();
        }
        JsonNode json_node;
        String newString;
        boolean result;
        try {
            result = MenuElementService.evaluateDeleteElementService(name);
            newString = "{\"result\": \"" + result + "\" }";
            json_node = objectMapper.readTree(newString);
            return Response.ok(json_node.toPrettyString()).build();
        }
        catch (JsonMappingException ex1){
            return Response.ok("JSON Mapping Error for MENU/ELEMENTS/DELETE encountered.").status(400).build();
        }
        catch (JsonProcessingException ex2){
            return Response.ok("JSON Parsing Error for MENU/ELEMENTS/DELETE encountered.").status(400).build();
        }
    }

    @PUT
    @Path("/{category}/{name}")
    public Response putCategoriesByName(@PathParam("category") String category,
                                        @PathParam("name") String name,
                                        String json_request) {
        if(name == null || name.isBlank() || category == null || category.isEmpty() || json_request == null || json_request.isEmpty()) {
            return Response.ok("Inaccurate arguments in MENU/ELEMENTS/PUT encountered.").status(400).build();
        }
        if(MenuElementService.isElementOfCategory(category, name)) {
            return Response.ok("Category already exists").status(400).build();
        }
        JsonNode json_node, temp_node;
        String newString, ingredients, allergens, second_name, second_ingredients, openfoodfacts_identifier;
        float price;
        boolean result, openfoodfacts;
        try {
            json_node = objectMapper.readTree(json_request);
            temp_node = json_node.get("price");
            if(temp_node == null) { return Response.ok("Inaccurate arguments in MENU/ELEMENTS/PUT encountered.").status(400).build(); }
            price = Float.parseFloat(temp_node.asText());
            temp_node = json_node.get("ingredients");
            if(temp_node == null) { return Response.ok("Inaccurate arguments in MENU/ELEMENTS/PUT encountered.").status(400).build(); }
            ingredients = temp_node.asText();
            temp_node = json_node.get("allergens");
            if(temp_node == null) { return Response.ok("Inaccurate arguments in MENU/ELEMENTS/PUT encountered.").status(400).build(); }
            allergens = temp_node.asText();
            temp_node = json_node.get("second_name");
            if(temp_node == null) { return Response.ok("Inaccurate arguments in MENU/ELEMENTS/PUT encountered.").status(400).build(); }
            second_name = temp_node.asText();
            temp_node = json_node.get("second_ingredients");
            if(temp_node == null) { return Response.ok("Inaccurate arguments in MENU/ELEMENTS/PUT encountered.").status(400).build(); }
            second_ingredients = temp_node.asText();
            temp_node = json_node.get("openfoodfacts");
            if(temp_node == null) { return Response.ok("Inaccurate arguments in MENU/ELEMENTS/PUT encountered.").status(400).build(); }
            openfoodfacts = temp_node.asBoolean();
            temp_node = json_node.get("openfoodfacts_identifier");
            if(temp_node == null) { return Response.ok("Inaccurate arguments in MENU/ELEMENTS/PUT encountered.").status(400).build(); }
            openfoodfacts_identifier = temp_node.asText();

            result = MenuElementService.evaluateCreateElementService(name, price, ingredients, allergens,
                    second_name, second_ingredients, openfoodfacts, openfoodfacts_identifier);
            newString = "{\"result\": \"" + result + "\" }";
            json_node = objectMapper.readTree(newString);
            return Response.ok(json_node.toPrettyString()).build();
        }
        catch (JsonMappingException ex1){
            return Response.ok("JSON Mapping Error for MENU/ELEMENTS/PUT encountered.").status(400).build();
        }
        catch (JsonProcessingException ex2){
            return Response.ok("JSON Parsing Error for MENU/ELEMENTS/PUT encountered.").status(400).build();
        }

    }
}

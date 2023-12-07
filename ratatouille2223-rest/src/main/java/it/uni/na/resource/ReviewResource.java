package it.uni.na.resource;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import it.uni.na.model.RestaurantCheck;
import it.uni.na.service.*;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.Response;

import java.util.ArrayList;
import java.util.List;

@Path("/review")
//TODO @RolesAllowed("ADDETTOSALA")
public class ReviewResource {

    @Inject
    ObjectMapper objectMapper;

    @GET
    @Produces("application/json")
    @Path("/business")
    public Response getBusinessInformation() {
        String result = ReviewService.findBusinessInformationService();
        if(result == null) {
            return Response.ok("Non esiste alcuna Attività.").status(404).build();
        }
        return Response.ok(result).build();
    }

    @GET
    @Produces("application/json")
    @Path("/categories")
    public Response getAllCategories() {
        List<String> list = new ArrayList<>();
        int pages = MenuCategoryService.findNumberOfPages();
        if(pages == 0) {
            return Response.ok("{ \"categories\": \"null\" }").build();
        }
        pages--;
        for(int i = 0; i <= pages; i++) {
            list.addAll(MenuCategoryService.findAllCategoriesOrderedByModeService("BYNAME", i));
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
            return Response.ok("JSON Mapping Error for REVIEW/CATEGORY/GETALL Encountered.").status(400).build();
        }
        catch (JsonProcessingException ex2){
            return Response.ok("JSON Parsing Error for MENU/CATEGORY/GETALL Encountered.").status(400).build();
        }
        return Response.ok(json_node.toPrettyString()).build();
    }

    @GET
    @Produces("application/json")
    @Path("/categories/{category}/elements")
    public Response getAllElements(@PathParam("category") String category) {
        if(category == null || category.isEmpty()) {
            return Response.ok("Inaccurate arguments in REVIEW/CATEGORY/GETALL encountered.").status(400).build();
        }

        List<String> list = new ArrayList<>();
        int pages = MenuElementService.findNumberOfPagesOfElementsService(category);
        if(pages == 0) {
            return Response.ok("{ \"categories\": \"null\" }").build();
        }
        pages--;
        for(int i = 0; i <= pages; i++) {
            list.addAll(MenuElementService.findAllElementsOrderedByModeService(category, "BYNAME", i));
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
            return Response.ok("JSON Mapping Error for REVIEW/CATEGORY/ELEMENTS/GETALL Encountered.").status(400).build();
        }
        catch (JsonProcessingException ex2){
            return Response.ok("JSON Parsing Error for REVIEW/CATEGORY/ELEMENTS/GETALL Encountered.").status(400).build();
        }
        return Response.ok(json_node.toPrettyString()).build();
    }

    @GET
    @Produces("application/json")
    @Path("/checks/{check}")
    public Response getOpenCheck(@PathParam("check") Long checkid) {
        if(checkid == null) {
            return Response.ok("Inaccurate arguments in REVIEW/CATEGORY/GETALL encountered.").status(400).build();
        }
        String newString = ReviewService.findOpenCheckById(checkid);
        if(newString.isEmpty()) {
            return Response.ok("{ \"categories\": \"null\" }").build();
        }
        JsonNode json_node;
        try {
            json_node = objectMapper.readTree(newString);
        }
        catch (JsonMappingException ex1){
            return Response.ok("JSON Mapping Error for REVIEW/CHECK/GET Encountered.").status(400).build();
        }
        catch (JsonProcessingException ex2){
            return Response.ok("JSON Parsing Error for REVIEW/CHECK/GET Encountered.").status(400).build();
        }
        return Response.ok(json_node.toPrettyString()).build();
    }

    @POST
    @Produces("application/json")
    @Consumes("application/json")
    @Path("/checks/{check}")
    public Response postUpdateOpenCheck(@PathParam("check") Long checkid, String json_request) {
        if(checkid == null || json_request == null || json_request.isBlank()) {
            return Response.ok("Inaccurate arguments in REVIEW/CHECK/UPDATE encountered.").status(400).build();
        }
        String newString = ReviewService.findOpenCheckById(checkid);
        if(newString.isEmpty()) {
            return Response.ok("No OpenCheck for specified ID.").status(400).build();
        }

        JsonNode json_node, request_tree, array_node;
        String element_name = "", quantity = "", current_price = "", description = "", result;

        List<List<String>> orders_array = new ArrayList<>();
        List<String> temp_list;

        try {
            json_node = objectMapper.readTree(json_request);
            request_tree = json_node.get("orders");
            if(request_tree == null) { return Response.ok("Inaccurate arguments of Orders in REVIEW/CHECK/UPDATE encountered.").status(400).build(); }

            for(JsonNode array_elem: request_tree){
                array_node = array_elem.get("element_name");
                if(array_node == null) { return Response.ok("Inaccurate arguments of Orders in REVIEW/CHECK/UPDATE encountered.").status(400).build(); }
                element_name = array_node.asText();
                array_node = array_elem.get("quantity");
                if(array_node == null) { return Response.ok("Inaccurate arguments of Orders in REVIEW/CHECK/UPDATE encountered.").status(400).build(); }
                quantity = array_node.asText();
                array_node = array_elem.get("current_price");
                if(array_node == null) { return Response.ok("Inaccurate arguments of Orders in REVIEW/CHECK/UPDATE encountered.").status(400).build(); }
                current_price = array_node.asText();
                array_node = array_elem.get("description");
                if(array_node == null) { return Response.ok("Inaccurate arguments of Orders in REVIEW/CHECK/UPDATE encountered.").status(400).build(); }
                description = array_node.asText();

                temp_list = new ArrayList<>();
                temp_list.add(element_name);
                temp_list.add(quantity);
                temp_list.add(current_price);
                temp_list.add(description);
                orders_array.add(temp_list);
            }
            if(element_name.isEmpty() || quantity.isEmpty() || current_price.isEmpty() || description.isEmpty()) {
                return Response.ok("Inaccurate arguments of Orders in REVIEW/CHECK/UPDATE encountered.").status(400).build();
            }

            result = ReviewService.evaluateUpdateOpenCheck(checkid, orders_array);

            newString = "{\"result\": \"" + result + "\" }";
            json_node = objectMapper.readTree(newString);
            return Response.ok(json_node.toPrettyString()).build();
        }
        catch (JsonMappingException ex1){
            return Response.ok("JSON Mapping Error for REVIEW/CHECK/UPDATE encountered.").status(400).build();
        }
        catch (JsonProcessingException ex2){
            return Response.ok("JSON Parsing Error for REVIEW/CHECK/UPDATE encountered.").status(400).build();
        }
        catch (NumberFormatException ex3){
            return Response.ok("One of the fields in REVIEW/CHECK/CREATE should be a number.").status(400).build();
        }
    }

    @PUT
    @Produces("application/json")
    @Consumes("application/json")
    @Path("/checks")
    public Response putCreateOpenCheck(String json_request) {
        if(json_request == null || json_request.isBlank()) {
            return Response.ok("Inaccurate arguments in REVIEW/CHECK/CREATE encountered.").status(400).build();
        }

        JsonNode request_tree, orders_array_node, tmp_node;
        String newString, table, element_name = "", quantity = "", current_price = "", description = "", result;

        List<List<String>> orders_array = new ArrayList<>();
        List<String> temp_list;

        try {
            request_tree = objectMapper.readTree(json_request);
            orders_array_node = request_tree.get("table");
            if(orders_array_node == null) { return Response.ok("Inaccurate arguments of Orders in REVIEW/CHECK/CREATE encountered.").status(400).build(); }
            table = orders_array_node.asText();
            orders_array_node = request_tree.get("orders");
            if(orders_array_node == null) { return Response.ok("Inaccurate arguments of Orders in REVIEW/CHECK/CREATE encountered.").status(400).build(); }

            for(JsonNode array_elem: orders_array_node){
                tmp_node = array_elem.get("element_name");
                if(tmp_node == null) { return Response.ok("Inaccurate arguments of Orders in REVIEW/CHECK/CREATE encountered.").status(400).build(); }
                element_name = tmp_node.asText();
                tmp_node = array_elem.get("quantity");
                if(tmp_node == null) { return Response.ok("Inaccurate arguments of Orders in REVIEW/CHECK/CREATE encountered.").status(400).build(); }
                quantity = tmp_node.asText();
                tmp_node = array_elem.get("current_price");
                if(tmp_node == null) { return Response.ok("Inaccurate arguments of Orders in REVIEW/CHECK/CREATE encountered.").status(400).build(); }
                current_price = tmp_node.asText();
                tmp_node = array_elem.get("description");
                if(tmp_node == null) { return Response.ok("Inaccurate arguments of Orders in REVIEW/CHECK/CREATE encountered.").status(400).build(); }
                description = tmp_node.asText();

                temp_list = new ArrayList<>();
                temp_list.add(element_name);
                temp_list.add(quantity);
                temp_list.add(current_price);
                temp_list.add(description);
                orders_array.add(temp_list);
            }
            if(element_name.isEmpty() || quantity.isEmpty() || current_price.isEmpty() || description.isEmpty()) {
                return Response.ok("Inaccurate arguments of Orders in REVIEW/CHECK/CREATE encountered.").status(400).build();
            }


            if(!ReviewService.checkTable(table)) {
                return Response.ok("Inaccurate table in REVIEW/CHECK/CREATE encountered.").status(400).build();
            }
            Long checkid = ReviewService.persistOpenCheck(Integer.parseInt(table));
            result = ReviewService.evaluateCreateOpenCheck(checkid, table, orders_array);

            newString = "{\"result\": \"" + result + "\" }";
            request_tree = objectMapper.readTree(newString);
            return Response.ok(request_tree.toPrettyString()).build();
        }
        catch (JsonMappingException ex1){
            return Response.ok("JSON Mapping Error for REVIEW/CHECK/CREATE encountered.").status(400).build();
        }
        catch (JsonProcessingException ex2){
            return Response.ok("JSON Parsing Error for REVIEW/CHECK/CREATE encountered.").status(400).build();
        }
        catch (NumberFormatException ex3){
            return Response.ok("One of the fields in REVIEW/CHECK/CREATE should be a number.").status(400).build();
        }
    }

}

package it.uni.na.resource;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import it.uni.na.service.MenuCategoryService;
import it.uni.na.service.MenuElementService;
import it.uni.na.service.OnlineMenuService;
import it.uni.na.service.ReviewService;
import jakarta.inject.Inject;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.Response;

import java.util.ArrayList;
import java.util.List;

@Path("/menu")
//TODO @PermitAll
public class OnlineMenuResource {

    @Inject
    ObjectMapper objectMapper;

    @GET
    @Produces("application/json")
    @Path("/business")
    public Response getBusinessInformation() {
        String result = OnlineMenuService.findBusinessInformationService();
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
    @Path("/categories/{category}")
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
}

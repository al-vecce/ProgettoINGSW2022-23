package it.uni.na.resource;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import it.uni.na.service.CheckHistoryService;
import it.uni.na.service.HomepageService;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.Response;

import java.util.List;

@Path("/homepage")
//TODO @RolesAllowed({"SUPERVISORE", "AMMINISTRATORE"})
public class HomepageResource {

    @Inject
    ObjectMapper objectMapper;

    @GET
    @Produces("application/json")
    //@Path("?mode={mode}&page={page}")
    public Response getAllOpenChecksOrderedByMode(@QueryParam("mode") String mode,
                                                  @QueryParam("page") Integer page) {
        if(mode == null || mode.isEmpty() || page == null) {
            return Response.ok("Inaccurate arguments in HOMEPAGE/GETCHECKS encountered.").status(400).build();
        }

        List<String> list = HomepageService.findAllOpenChecksOrderedByModeService(mode, page);
        if(list.isEmpty()) {
            return Response.ok("{ \"openchecks\": \"null\" }").build();
        }

        JsonNode json_node;
        String newString;
        try {
            newString = "{ \"openchecks\": [";
            for (String s: list) {
                newString = newString + s + ",";
            }
            newString = newString.substring(0, newString.length() - 1) + "]}";
            json_node = objectMapper.readTree(newString);
        }
        catch (JsonMappingException ex1){
            return Response.ok("JSON Mapping Error for HOMEPAGE/GETCHECKS Encountered.").status(500).build();
        }
        catch (JsonProcessingException ex2){
            return Response.ok("JSON Parsing Error for HOMEPAGE/GETCHECKS Encountered.").status(500).build();
        }
        return Response.ok(json_node.toPrettyString()).build();
    }
    @GET
    @Produces("application/json")
    @Path("/filter")
    public Response getAllOpenChecksFilteredOrderedByMode(@QueryParam("mode") String mode,
                                                          @QueryParam("filterstart") String filterstart,
                                                          @QueryParam("filterend") String filterend,
                                                          @QueryParam("page") Integer page) {
        if(mode == null || mode.isEmpty() || page == null || filterstart == null || filterstart.isEmpty() || filterend == null || filterend.isEmpty()) {
            return Response.ok("Inaccurate arguments in HOMEPAGE/GETORDERS encountered.").status(400).build();
        }

        List<String> list = HomepageService.findAllOpenChecksFilteredOrderedByModeService(mode, filterstart, filterend, page);

        if(list.isEmpty()) {
            return Response.ok("{ \"openchecks\": \"null\" }").build();
        }

        JsonNode json_node;
        String newString;
        try {
            newString = "{ \"openchecks\": [";
            for (String s: list) {
                newString = newString + s + ",";
            }
            newString = newString.substring(0, newString.length() - 1) + "]}";
            json_node = objectMapper.readTree(newString);
        }
        catch (JsonMappingException ex1){
            return Response.ok("JSON Mapping Error for HOMEPAGE/GETCHECKSFILTERED Encountered.").status(500).build();
        }
        catch (JsonProcessingException ex2){
            return Response.ok("JSON Parsing Error for HOMEPAGE/GETCHECKSFILTERED Encountered.").status(500).build();
        }
        return Response.ok(json_node.toPrettyString()).build();
    }
    @GET
    @Produces("application/json")
    @Path("/{check}/orders")
    public Response getAllOpenChecksOrdersOrderedByMode(@QueryParam("mode") String mode,
                                                        @PathParam("check") Long checkid) {
        if(mode == null || mode.isEmpty() || checkid == null) {
            return Response.ok("Inaccurate arguments in HOMEPAGE/GETORDERS encountered.").status(400).build();
        }

        List<String> list = HomepageService.findAllOrdersOrderedByModeService(mode, checkid);

        if(list.isEmpty()) {
            return Response.ok("{ \"orders\": \"null\" }").build();
        }

        JsonNode json_node;
        String newString;
        try {
            newString = "{ \"orders\": [";
            for (String s: list) {
                newString = newString + s + ",";
            }
            newString = newString.substring(0, newString.length() - 1) + "]}";
            json_node = objectMapper.readTree(newString);
        }
        catch (JsonMappingException ex1){
            return Response.ok("JSON Mapping Error for HOMEPAGE/GETORDERS Encountered.").status(500).build();
        }
        catch (JsonProcessingException ex2){
            return Response.ok("JSON Parsing Error for HOMEPAGE/GETORDERS Encountered.").status(500).build();
        }
        return Response.ok(json_node.toPrettyString()).build();
    }
    @GET
    @Produces("application/json")
    @Path("/pages")
    public Response getNumberOfPages() {
        Integer value = HomepageService.findNumberOfPagesOfOpenChecksService();
        return Response.ok(value).build();
    }
    @GET
    @Produces("application/json")
    @Path("/pages")
    public Response getNumberOfPagesFiltered(@QueryParam("filterstart") String filterstart, @QueryParam("filterend") String filterend) {
        if(filterstart == null || filterstart.isBlank() || filterend == null || filterend.isBlank()) {
            return Response.ok("Inaccurate arguments in HOMEPAGE/GETFILTEREDPAGES encountered.").status(400).build();
        }
        Integer value = HomepageService.findNumberOfPagesOfOpenChecksServiceFiltered(filterstart, filterend);
        return Response.ok(value).build();
    }

    @POST
    @Produces("application/json")
    @Consumes("application/json")
    @Path("/orders/{order}")
    public Response postUpdateOrderWithOrderId(@PathParam("order") Long orderid,
                                               String json_request) {
        if(orderid == null || json_request == null || json_request.isBlank()) {
            return Response.ok("Inaccurate arguments in HOMEPAGE/UPDATEORDER encountered.").status(400).build();
        }

        JsonNode json_node, temp_node;
        String newString;
        int quantityoffset;
        boolean result;
        try {
            json_node = objectMapper.readTree(json_request);
            temp_node = json_node.get("quantityoffset");
            if(temp_node == null) { return Response.ok("Inaccurate arguments in MENU/CATEGORY/POSTUPDATE encountered.").status(400).build(); }
            quantityoffset = temp_node.asInt();

            result = HomepageService.evaluateOrderModificationService(orderid, quantityoffset);
            newString = "{\"result\": \"" + result + "\" }";
            json_node = objectMapper.readTree(newString);
            return Response.ok(json_node.toPrettyString()).build();
        }
        catch (JsonMappingException ex1){
            return Response.ok("JSON Mapping Error for HOMEPAGE/UPDATEORDER encountered.").status(400).build();
        }
        catch (JsonProcessingException ex2){
            return Response.ok("JSON Parsing Error for HOMEPAGE/UPDATEORDER encountered.").status(400).build();
        }
    }
    @POST
    @Produces("application/json")
    @Consumes("application/json")
    @Path("{check}")
    public Response postCloseOpenCheckById(@PathParam("check") Long checkid) {
        if(checkid == null) {
            return Response.ok("Inaccurate arguments in HOMEPAGE/CLOSECHECK encountered.").status(400).build();
        }

        JsonNode json_node;
        String newString;
        Boolean result;
        try {
            result = HomepageService.evaluateCloseOpenCheckService(checkid);
            newString = "{\"result\": \"" + result + "\" }";
            json_node = objectMapper.readTree(newString);
            return Response.ok(json_node.toPrettyString()).build();
        }
        catch (JsonMappingException ex1){
            return Response.ok("JSON Mapping Error for HOMEPAGE/CLOSECHECK encountered.").status(500).build();
        }
        catch (JsonProcessingException ex2){
            return Response.ok("JSON Parsing Error for HOMEPAGE/CLOSECHECK encountered.").status(500).build();
        }
    }
}

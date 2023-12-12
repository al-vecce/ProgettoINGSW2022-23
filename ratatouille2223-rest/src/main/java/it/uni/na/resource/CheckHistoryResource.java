package it.uni.na.resource;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import it.uni.na.service.CheckHistoryService;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.Response;

import java.util.List;

@Path("/history")
//TODO @RolesAllowed({"SUPERVISORE", "AMMINISTRATORE"})
public class CheckHistoryResource {

    @Inject
    ObjectMapper objectMapper;

    /*@GET
    @Produces("application/json")
    public Response getAllClosedChecks() {

        List<String> list = CheckHistoryService.findAllClosedChecksOrderedByModeService("BYID", 0);
        if(list.isEmpty()) {
            return Response.ok("{ \"closedchecks\": \"null\" }").build();
        }

        JsonNode json_node;
        String newString;
        try {
            newString = "{ \"closedchecks\": [";
            for (String s: list) {
                newString = newString + s + ",";
            }
            newString = newString.substring(0, newString.length() - 1) + "]}";
            json_node = objectMapper.readTree(newString);
        }
        catch (JsonMappingException ex1){
            return Response.ok("JSON Mapping Error for HISTORY/GETCHECKS Encountered.").status(500).build();
        }
        catch (JsonProcessingException ex2){
            return Response.ok("JSON Parsing Error for HISTORY/GETCHECKS Encountered.").status(500).build();
        }
        return Response.ok(json_node.toPrettyString()).build();
    }*/

    @GET
    @Produces("application/json")
    public Response getAllClosedChecksOrderedByMode(@QueryParam("mode") String mode,
                                                    @QueryParam("page") Integer page) {
        if(mode == null || mode.isBlank() || page == null) {
            return Response.ok("Inaccurate arguments in HISTORY/GETCHECKS encountered.").status(400).build();
        }

        List<String> list = CheckHistoryService.findAllClosedChecksOrderedByModeService(mode, page);
        if(list.isEmpty()) {
            return Response.ok("{ \"closedchecks\": \"null\" }").build();
        }

        JsonNode json_node;
        String newString;
        try {
            newString = "{ \"closedchecks\": [";
            for (String s: list) {
                newString = newString + s + ",";
            }
            newString = newString.substring(0, newString.length() - 1) + "]}";
            json_node = objectMapper.readTree(newString);
        }
        catch (JsonMappingException ex1){
            return Response.ok("JSON Mapping Error for HISTORY/GETCHECKS Encountered.").status(500).build();
        }
        catch (JsonProcessingException ex2){
            return Response.ok("JSON Parsing Error for HISTORY/GETCHECKS Encountered.").status(500).build();
        }
        return Response.ok(json_node.toPrettyString()).build();
    }
    @GET
    @Produces("application/json")
    @Path("/filter")
    public Response getAllClosedChecksFilteredOrderedByMode(@QueryParam("mode") String mode,
                                                            @QueryParam("filterstart") String filterstart,
                                                            @QueryParam("filterend") String filterend,
                                                            @QueryParam("page") Integer page) {
        if(mode == null || page == null || filterstart == null || filterend == null ||
                mode.isBlank() || filterstart.isBlank() || filterend.isBlank()) {
            return Response.ok("Inaccurate arguments in HOMEPAGE/GETORDERS encountered.").status(400).build();
        }

        List<String> list = CheckHistoryService.findAllClosedChecksFilteredOrderedByModeService(mode, filterstart, filterend, page);

        if(list.isEmpty()) {
            return Response.ok("{ \"closedchecks\": \"null\" }").build();
        }

        JsonNode json_node;
        String newString;
        try {
            newString = "{ \"closedchecks\": [";
            for (String s: list) {
                newString = newString + s + ",";
            }
            newString = newString.substring(0, newString.length() - 1) + "]}";
            json_node = objectMapper.readTree(newString);
        }
        catch (JsonMappingException ex1){
            return Response.ok("JSON Mapping Error for HISTORY/GETCHECKSFILTERED Encountered.").status(500).build();
        }
        catch (JsonProcessingException ex2){
            return Response.ok("JSON Parsing Error for HISTORY/GETCHECKSFILTERED Encountered.").status(500).build();
        }
        return Response.ok(json_node.toPrettyString()).build();
    }

    @GET
    @Produces("application/json")
    @Path("/{check}/orders")
    public Response getAllClosedChecksOrdersOrderedByMode(@QueryParam("mode") String mode,
                                                          @PathParam("check") Long checkid) {
        if(mode == null || mode.isBlank() || checkid == null) {
            return Response.ok("Inaccurate arguments in HISTORY/GETORDERS encountered.").status(400).build();
        }

        List<String> list = CheckHistoryService.findAllOrdersOrderedByModeService(mode, checkid);

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
            return Response.ok("JSON Mapping Error for HISTORY/GETORDERS Encountered.").status(500).build();
        }
        catch (JsonProcessingException ex2){
            return Response.ok("JSON Parsing Error for HISTORY/GETORDERS Encountered.").status(500).build();
        }
        return Response.ok(json_node.toPrettyString()).build();
    }
    @GET
    @Produces("application/json")
    @Path("/pages")
    public Response getNumberOfPages() {
        Integer value = CheckHistoryService.findNumberOfPagesOfClosedChecksService();
        return Response.ok(value).build();
    }
    @GET
    @Produces("application/json")
    @Path("/pages/filter")
    public Response getNumberOfPagesFiltered(@QueryParam("filterstart") String filterstart, @QueryParam("filterend") String filterend) {
        if(filterstart == null || filterstart.isBlank() || filterend == null || filterend.isBlank()) {
            return Response.ok("Inaccurate arguments in HISTORY/GETFILTEREDPAGES encountered.").status(400).build();
        }
        Integer value = CheckHistoryService.findNumberOfPagesOfClosedChecksServiceFiltered(filterstart, filterend);
        return Response.ok(value).build();
    }

    @DELETE
    @Produces("application/json")
    @Consumes("application/json")
    @Path("{check}")
    public Response deleteClosedCheckById(@PathParam("check") Long checkid) {
        if(checkid == null) {
            return Response.ok("Inaccurate arguments in HISTORY/CLOSECHECK encountered.").status(400).build();
        }

        JsonNode json_node;
        String newString;
        Boolean result;
        try {
            result = CheckHistoryService.evaluateDeleteClosedCheckService(checkid);
            newString = "{\"result\": \"" + result + "\" }";
            json_node = objectMapper.readTree(newString);
            return Response.ok(json_node.toPrettyString()).build();
        }
        catch (JsonMappingException ex1){
            return Response.ok("JSON Mapping Error for HISTORY/CLOSECHECK encountered.").status(500).build();
        }
        catch (JsonProcessingException ex2){
            return Response.ok("JSON Parsing Error for HISTORY/CLOSECHECK encountered.").status(500).build();
        }
    }
}

package it.uni.na.resource;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import it.uni.na.service.CheckHistoryService;
import it.uni.na.service.HomepageCheckService;
import jakarta.annotation.security.RolesAllowed;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.Response;

import java.util.List;

@Path("/history")
@RolesAllowed({"SUPERVISORE", "AMMINISTRATORE"})
public class CheckHistoryResource {
    @Inject
    ObjectMapper objectMapper;

    @GET
    @Produces("application/json")
    //@Path("?mode={mode}&page={page}")
    public Response getAllClosedChecksOrderedByMode(@QueryParam("mode") String mode,
                                                  @QueryParam("page") Integer page) {
        if(mode == null || page == null) {
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
            throw new WebApplicationException("JSON Mapping Error for HISTORY/GETCHECKS Encountered.", 500);
        }
        catch (JsonProcessingException ex2){
            throw new WebApplicationException("JSON Parsing Error for HISTORY/GETCHECKS Encountered.", 500);
        }
        return Response.ok(json_node.toPrettyString()).build();
    }
    @GET
    @Produces("application/json")
    @Path("/filter")
    //@Path("?mode={mode}&filterstart={filterstart}&filterend={filterend}&page={page}")
    public Response getAllClosedChecksFilteredOrderedByMode(@QueryParam("mode") String mode,
                                                          @QueryParam("filterstart") String filterstart,
                                                          @QueryParam("filterend") String filterend,
                                                          @QueryParam("page") Integer page) {
        if(mode == null || page == null || filterstart == null || filterend == null) {
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
            throw new WebApplicationException("JSON Mapping Error for HISTORY/GETCHECKSFILTERED Encountered.", 500);
        }
        catch (JsonProcessingException ex2){
            throw new WebApplicationException("JSON Parsing Error for HISTORY/GETCHECKSFILTERED Encountered.", 500);
        }
        return Response.ok(json_node.toPrettyString()).build();
    }
    @GET
    @Produces("application/json")
    @Path("/orders")
    //@Path("?mode={mode}&page={page}")
    public Response getAllClosedChecksOrdersOrderedByMode(@QueryParam("mode") String mode,
                                                        @QueryParam("checkid") Long checkid) {
        if(mode == null || checkid == null) {
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
            throw new WebApplicationException("JSON Mapping Error for HISTORY/GETORDERS Encountered.", 500);
        }
        catch (JsonProcessingException ex2){
            throw new WebApplicationException("JSON Parsing Error for HISTORY/GETORDERS Encountered.", 500);
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
    @DELETE
    @Produces("application/json")
    @Consumes("application/json")
    @Path("/closeorder")
    public Response deleteCloseOpenCheckById(@QueryParam("check") Long checkid) {
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
            throw new WebApplicationException("JSON Mapping Error for HISTORY/CLOSECHECK encountered.", 500);
        }
        catch (JsonProcessingException ex2){
            throw new WebApplicationException("JSON Parsing Error for HISTORY/CLOSECHECK encountered.", 500);
        }
    }
}

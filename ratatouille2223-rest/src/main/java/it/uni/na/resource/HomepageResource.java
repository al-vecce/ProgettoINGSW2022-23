package it.uni.na.resource;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import it.uni.na.service.EmployeeService;
import it.uni.na.service.HomepageCheckService;
import it.uni.na.service.HomepageOrderService;
import jakarta.annotation.security.RolesAllowed;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.Response;

import java.util.List;

@Path("/homepage")
//@RolesAllowed({"SUPERVISORE", "AMMINISTRATORE"})
public class HomepageResource {

    @Inject
    ObjectMapper objectMapper;

    @GET
    @Produces("application/json")
    //@Path("?mode={mode}&page={page}")
    public Response getAllOpenChecksOrderedByMode(@QueryParam("mode") String mode,
                                                  @QueryParam("page") Integer page) {
        if(mode == null || page == null) {
            return Response.ok("Inaccurate arguments in HOMEPAGE/GETORDERS encountered.").status(400).build();
        }

        List<String> list = HomepageCheckService.findAllOpenChecksOrderedByModeService(mode, page);
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
            throw new WebApplicationException("JSON Mapping Error for HOMEPAGE/GETCHECKS Encountered.", 500);
        }
        catch (JsonProcessingException ex2){
            throw new WebApplicationException("JSON Parsing Error for HOMEPAGE/GETCHECKS Encountered.", 500);
        }
        return Response.ok(json_node.toPrettyString()).build();
    }
    @GET
    @Produces("application/json")
    @Path("/filter")
    //@Path("?mode={mode}&filterstart={filterstart}&filterend={filterend}&page={page}")
    public Response getAllOpenChecksFilteredOrderedByMode(@QueryParam("mode") String mode,
                                                          @QueryParam("filterstart") String filterstart,
                                                          @QueryParam("filterend") String filterend,
                                                          @QueryParam("page") Integer page) {
        if(mode == null || page == null || filterstart == null || filterend == null) {
            return Response.ok("Inaccurate arguments in HOMEPAGE/GETORDERS encountered.").status(400).build();
        }

        List<String> list = HomepageCheckService.findAllOpenChecksFilteredOrderedByModeService(mode, filterstart, filterend, page);

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
            throw new WebApplicationException("JSON Mapping Error for HOMEPAGE/GETCHECKSFILTERED Encountered.", 500);
        }
        catch (JsonProcessingException ex2){
            throw new WebApplicationException("JSON Parsing Error for HOMEPAGE/GETCHECKSFILTERED Encountered.", 500);
        }
        return Response.ok(json_node.toPrettyString()).build();
    }
    @GET
    @Produces("application/json")
    @Path("/orders")
    //@Path("?mode={mode}&page={page}")
    public Response getAllOpenChecksOrdersOrderedByMode(@QueryParam("mode") String mode,
                                                        @QueryParam("checkid") Long checkid) {
        if(mode == null || checkid == null) {
            return Response.ok("Inaccurate arguments in HOMEPAGE/GETORDERS encountered.").status(400).build();
        }

        List<String> list = HomepageOrderService.findAllOrdersOrderedByModeService(mode, checkid);

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
            throw new WebApplicationException("JSON Mapping Error for HOMEPAGE/GETORDERS Encountered.", 500);
        }
        catch (JsonProcessingException ex2){
            throw new WebApplicationException("JSON Parsing Error for HOMEPAGE/GETORDERS Encountered.", 500);
        }
        return Response.ok(json_node.toPrettyString()).build();
    }
    @GET
    @Produces("application/json")
    @Path("/pages")
    public Response getNumberOfPages() {
        Integer value = HomepageCheckService.findNumberOfPagesOfOpenChecksService();
        return Response.ok(value).build();
    }
    @POST
    @Produces("application/json")
    @Consumes("application/json")
    @Path("/updateorder")
    //@Path("?check={check}&order={order}&value={value}")
    public Response postUpdateOrderWithOrderId(@QueryParam("order") Long orderid,
                                               @QueryParam("value") Integer quantityoffset) {
        if(orderid == null || quantityoffset == null) {
            return Response.ok("Inaccurate arguments in HOMEPAGE/UPDATEORDER encountered.").status(400).build();
        }

        JsonNode json_node;
        String newString;
        Boolean result;
        try {
            result = HomepageOrderService.evaluateOrderModificationService(orderid, quantityoffset);
            newString = "{\"result\": \"" + result + "\" }";
            json_node = objectMapper.readTree(newString);
            return Response.ok(json_node.toPrettyString()).build();
        }
        catch (JsonMappingException ex1){
            throw new WebApplicationException("JSON Mapping Error for HOMEPAGE/UPDATEORDER encountered.", 500);
        }
        catch (JsonProcessingException ex2){
            throw new WebApplicationException("JSON Parsing Error for HOMEPAGE/UPDATEORDER encountered.", 500);
        }
    }
    @POST
    @Produces("application/json")
    @Consumes("application/json")
    @Path("/closeorder")
    public Response postCloseOpenCheckById(@QueryParam("check") Long checkid) {
        if(checkid == null) {
            return Response.ok("Inaccurate arguments in HOMEPAGE/CLOSECHECK encountered.").status(400).build();
        }

        JsonNode json_node;
        String newString;
        Boolean result;
        try {
            result = HomepageCheckService.evaluateCloseOpenCheckService(checkid);
            newString = "{\"result\": \"" + result + "\" }";
            json_node = objectMapper.readTree(newString);
            return Response.ok(json_node.toPrettyString()).build();
        }
        catch (JsonMappingException ex1){
            throw new WebApplicationException("JSON Mapping Error for HOMEPAGE/CLOSECHECK encountered.", 500);
        }
        catch (JsonProcessingException ex2){
            throw new WebApplicationException("JSON Parsing Error for HOMEPAGE/CLOSECHECK encountered.", 500);
        }
    }
}

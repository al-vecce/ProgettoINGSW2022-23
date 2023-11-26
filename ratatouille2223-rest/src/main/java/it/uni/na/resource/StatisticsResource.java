package it.uni.na.resource;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import it.uni.na.service.MenuElementService;
import it.uni.na.service.StatisticsService;
import jakarta.inject.Inject;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.QueryParam;
import jakarta.ws.rs.core.Response;

import java.util.ArrayList;
import java.util.List;

@Path("/statistics")
//TODO @RolesAllowed({"AMMINISTRATORE"})
public class StatisticsResource {

    @Inject
    ObjectMapper objectMapper;

    @GET
    @Produces("application/json")
    public Response getStatisticsBy(@QueryParam("mode") String mode, @QueryParam("scope") String scope) {
        if(mode == null || mode.isEmpty() || scope == null || scope.isEmpty()) {
            return Response.ok("Inaccurate arguments in STATISTICS/GETALL encountered.").status(400).build();
        }

        List<String> list = StatisticsService.findStatisticsBy(mode, scope);
        if(list.isEmpty()) {
            return Response.ok("{ \"statistics\": \"null\" }").build();
        }

        JsonNode json_node;
        String newString;
        try {
            newString = "{ \"statistics\": [";
            for (String s: list) {
                newString = newString + s + ",";
            }
            newString = newString.substring(0, newString.length() - 1) + "]}";
            json_node = objectMapper.readTree(newString);
        }
        catch (JsonMappingException ex1){
            return Response.ok("JSON Mapping Error for STATISTICS/GETALL Encountered.").status(400).build();
        }
        catch (JsonProcessingException ex2){
            return Response.ok("JSON Parsing Error for STATISTICS/GETALL Encountered.").status(400).build();
        }
        return Response.ok(json_node.toPrettyString()).build();
    }
    @GET
    @Produces("application/json")
    @Path("/filtered")
    public Response getFilteredStatisticsBy(@QueryParam("mode") String mode,
                                            @QueryParam("scope") String scope,
                                            @QueryParam("filterstart") String filterstart,
                                            @QueryParam("filterend") String filterend) {
        if(mode == null || mode.isEmpty() || scope == null || scope.isEmpty() || filterstart == null
                || filterstart.isEmpty() || filterend == null || filterend.isEmpty()) {
            return Response.ok("Inaccurate arguments in STATISTICS/GETALL encountered.").status(400).build();
        }

        List<String> list = StatisticsService.findFilteredStatisticsBy(mode, scope, filterstart, filterend);
        if(list.isEmpty()) {
            return Response.ok("{ \"statistics\": \"null\" }").build();
        }

        JsonNode json_node;
        String newString;
        try {
            newString = "{ \"statistics\": [";
            for (String s: list) {
                newString = newString + s + ",";
            }
            newString = newString.substring(0, newString.length() - 1) + "]}";
            json_node = objectMapper.readTree(newString);
        }
        catch (JsonMappingException ex1){
            return Response.ok("JSON Mapping Error for STATISTICS/GETALL Encountered.").status(400).build();
        }
        catch (JsonProcessingException ex2){
            return Response.ok("JSON Parsing Error for STATISTICS/GETALL Encountered.").status(400).build();
        }
        return Response.ok(json_node.toPrettyString()).build();
    }
}

package it.uni.na.resource;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import it.uni.na.service.MenuElementService;
import it.uni.na.service.QRGenerationService;
import it.uni.na.service.TableSelectorService;
import jakarta.annotation.security.RolesAllowed;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.Response;
import org.eclipse.microprofile.openapi.annotations.media.Content;
import org.eclipse.microprofile.openapi.annotations.media.ExampleObject;
import org.eclipse.microprofile.openapi.annotations.media.Schema;
import org.eclipse.microprofile.openapi.annotations.parameters.RequestBody;
import org.eclipse.microprofile.openapi.annotations.responses.APIResponse;
import org.eclipse.microprofile.openapi.annotations.responses.APIResponses;

import java.util.List;

import static jakarta.ws.rs.core.MediaType.APPLICATION_JSON;

@Path("/table-selector")
@RolesAllowed("ADDETTOSALA")
public class TableSelectorResource {

    @Inject
    ObjectMapper objectMapper;

    @GET
    @Produces("application/json")
    @Path("/business")
    public Response getBusinessInformation() {
        String result = TableSelectorService.findBusinessInformationService();
        if(result == null) {
            return Response.ok("Non esiste alcuna Attività.").status(404).build();
        }
        return Response.ok(result).build();
    }
    @POST
    @Consumes("application/json")
    @Produces("application/json")
    @Path("/{table}")
    public Response postVerifyTableStatus(@PathParam("table") Integer table) {
        if (table == null || table <= 0) {
            return Response.ok("Inaccurate arguments in TABLE-SELECTOR/POSTSTATUS encountered.").status(400).build();
        }

        String newString = TableSelectorService.findOpenCheckByTableService(table);
        if (newString.isEmpty()) {
            return Response.ok("{ \"table\": \"empty\" }").build();
        }

        JsonNode json_node;
        try {
            json_node = objectMapper.readTree(newString);
        } catch (JsonMappingException ex1) {
            return Response.ok("JSON Mapping Error for TABLE-SELECTOR/POSTSTATUS Encountered.").status(400).build();
        } catch (JsonProcessingException ex2) {
            return Response.ok("JSON Parsing Error for TABLE-SELECTOR/POSTSTATUS Encountered.").status(400).build();
        }
        return Response.ok(json_node.toPrettyString()).build();
    }

}

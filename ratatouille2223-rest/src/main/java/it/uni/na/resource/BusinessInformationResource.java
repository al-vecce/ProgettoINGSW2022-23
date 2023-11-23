package it.uni.na.resource;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import it.uni.na.service.BusinessInformationService;
import it.uni.na.service.ChangePasswordService;
import it.uni.na.service.FieldCheckService;
import jakarta.annotation.security.RolesAllowed;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.Response;

// TODO LOGGER
@Path("/business-information")
@RolesAllowed("AMMINISTRATORE")
public class BusinessInformationResource {

    // TODO

    @Inject
    ObjectMapper objectMapper;

    @GET
    @Produces("application/json")
    public Response getBusinessInformation() {
        String result = BusinessInformationService.findBusinessWithID(1);

        if(result == null) {
            return Response.ok("Non esiste alcuna Attività.").status(404).build();
        } else if (result.isEmpty() || result.isBlank()) {
            return Response.ok("L'Attività non dispone di alcuna informazione.").status(404).build();
        }

        return Response.ok(result).build();
    }

    @POST
    @Produces("application/json")
    @Consumes("application/json")
    public Response postUpdateBusinessInformation(String json_request) {
        JsonNode json_node, temp_node;
        String newString, businessname, businessphonenumber, businessaddress, businesslogoencoded, businesslogotype, businesslogoname;
        Boolean result;
        try {
            json_node = objectMapper.readTree(json_request);
            temp_node = json_node.get("businessname");
            if(temp_node == null) { return Response.ok("Inaccurate arguments in BUSINESS/POST encountered.").status(400).build(); }
            businessname = temp_node.asText();
            temp_node = json_node.get("businessphonenumber");
            if(temp_node == null) { return Response.ok("Inaccurate arguments in BUSINESS/POST encountered.").status(400).build(); }
            businessphonenumber = temp_node.asText();
            temp_node = json_node.get("businessaddress");
            if(temp_node == null) { return Response.ok("Inaccurate arguments in BUSINESS/POST encountered.").status(400).build(); }
            businessaddress = temp_node.asText();
            temp_node = json_node.get("businesslogoencoded");
            if(temp_node == null) { return Response.ok("Inaccurate arguments in BUSINESS/POST encountered.").status(400).build(); }
            businesslogoencoded = temp_node.asText();
            temp_node = json_node.get("businesslogotype");
            if(temp_node == null) { return Response.ok("Inaccurate arguments in BUSINESS/POST encountered.").status(400).build(); }
            businesslogotype = temp_node.asText();
            temp_node = json_node.get("businesslogoname");
            if(temp_node == null) { return Response.ok("Inaccurate arguments in BUSINESS/POST encountered.").status(400).build(); }
            businesslogoname = temp_node.asText();

            result = BusinessInformationService.evaluateBusinessInformationFormService(businessname, businessphonenumber, businessaddress, businesslogoencoded,businesslogotype, businesslogoname);
            newString = "{\"result\": \"" + result + "\" }";
            json_node = objectMapper.readTree(newString);
            return Response.ok(json_node.toPrettyString()).build();
        }
        catch (JsonMappingException ex1){
            throw new WebApplicationException("JSON Mapping Error for BUSINESS/POST encountered.", 500);
        }
        catch (JsonProcessingException ex2){
            throw new WebApplicationException("JSON Parsing Error for BUSINESS/POST encountered.", 500);
        }
    }

    @POST
    @Produces("application/json")
    @Consumes("application/json")
    @Path("/logo")
    public Response postLogo(String json_request) {
        JsonNode json_node, temp_node;
        String newString, businesslogoencoded,businesslogotype,businesslogoname, result;
        try {
            json_node = objectMapper.readTree(json_request);
            temp_node = json_node.get("businesslogoencoded");
            if(temp_node == null) { return Response.ok("Inaccurate arguments in BUSINESS/LOGO encountered.").status(400).build(); }
            businesslogoencoded = temp_node.asText();
            temp_node = json_node.get("businesslogotype");
            if(temp_node == null) { return Response.ok("Inaccurate arguments in BUSINESS/LOGO encountered.").status(400).build(); }
            businesslogotype = temp_node.asText();
            temp_node = json_node.get("businesslogoname");
            if(temp_node == null) { return Response.ok("Inaccurate arguments in BUSINESS/LOGO encountered.").status(400).build(); }
            businesslogoname = temp_node.asText();

            result = BusinessInformationService.checkBusinesslogoValidityService(businesslogoencoded, businesslogotype, businesslogoname);
            //json_node = objectMapper.createObjectNode();
            newString = "{\"result\": \"" + result + "\" }";
            json_node = objectMapper.readTree(newString);
            return Response.ok(json_node.toPrettyString()).build();
        }
        catch (JsonMappingException ex1){
            throw new WebApplicationException("JSON Mapping Error for BUSINESS/LOGO Encountered.", 500);
        }
        catch (JsonProcessingException ex2){
            throw new WebApplicationException("JSON Parsing Error for BUSINESS/LOGO Encountered.", 500);
        }
    }
}

package it.uni.na.resource;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import it.uni.na.service.QRGenerationService;
import jakarta.annotation.security.RolesAllowed;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.Response;

@Path("/business-information/qr-generation")
@RolesAllowed("AMMINISTRATORE")
public class QRGenerationResource {

    @Inject
    ObjectMapper objectMapper;

    // TODO Non funziona, non restituisce nulla
    @GET
    @Produces("application/json")
    public Response getQRBusinessInformation() {
        String result = QRGenerationService.findQRBusinessInformationService();
        if(result == null) {
            return Response.ok("Non esiste alcuna Attività.").status(404).build();
        }
        return Response.ok(result).build();
    }

    @POST
    @Consumes("application/json")
    @Produces("application/json")
    public Response postGenerateQRCode(String json_request) {
        JsonNode json_node, temp_node;
        String newString, menuaddress;
        Boolean result;
        try {
            json_node = objectMapper.readTree(json_request);
            temp_node = json_node.get("menuaddress");
            if(temp_node == null) { return Response.ok("Inaccurate arguments in BUSINESS-INFORMATION/QR-GENERATION/POST encountered.").status(404).build(); }
            menuaddress = temp_node.asText();
            result = QRGenerationService.generateQRCodeService(menuaddress);
            newString = "{\"result\": \"" + result + "\" }";
            return Response.ok(newString).build();
        }
        catch (JsonMappingException ex1){
            throw new WebApplicationException("JSON Mapping Error for BUSINESS-INFORMATION/QR-GENERATION/POST Encountered.", 500);
        }
        catch (JsonProcessingException ex2){
            throw new WebApplicationException("JSON Parsing Error for BUSINESS-INFORMATION/QR-GENERATION/POST Encountered.", 500);
        }
    }
}
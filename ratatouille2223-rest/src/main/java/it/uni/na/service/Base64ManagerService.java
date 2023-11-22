package it.uni.na.service;

import java.util.Base64;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class Base64ManagerService {
    private Base64ManagerService(){}

    public static final String NOTBASE64ENCODABLE = "NOTBASE64ENCODABLE";
    public static String encodeToStringService(byte[] imagebyte) {
        return Base64.getEncoder().encodeToString(imagebyte);
    }
    public static byte[] decodeToByteArrayService(String base64String) {
        return Base64.getDecoder().decode(base64String);
    }
    public static String checkBusinesslogoencodedValidityService(String businesslogoencoded) {
        String result = "businesslogoencoded-";
        if(businesslogoencoded == null || businesslogoencoded.contains("null")) {
            result = result.concat(FieldCheckService.NULLVALUE);
        } else if (businesslogoencoded.isBlank()) {
            result = result.concat(FieldCheckService.BLANKVALUE);
        } else if (businesslogoencoded.isEmpty()) {
            result = result.concat(FieldCheckService.EMPTYVALUE);
        } else {
            Pattern base64encodable = Pattern.compile("[^a-zA-Z0-9+/=]");

            Matcher isBase64Encodable = base64encodable.matcher(businesslogoencoded);

            if (isBase64Encodable.find()) {
                result = result.concat(NOTBASE64ENCODABLE);
            } else result = FieldCheckService.CORRECT;
        }
        return result;
    }
}

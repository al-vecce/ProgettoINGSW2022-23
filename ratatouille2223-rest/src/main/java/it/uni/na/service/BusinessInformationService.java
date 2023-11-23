package it.uni.na.service;

import it.uni.na.model.Business;
import it.uni.na.model.Employee;
import jakarta.transaction.Transactional;

import java.time.LocalDateTime;

public class BusinessInformationService {
    private BusinessInformationService() {}
    @Transactional
    public static String findBusinessWithID(Integer id) {
        Business b = Business.findPrimaryBusiness();
        if(b!=null){
            if(b.getBusiness_logo() != null) {
                b.setBusiness_logo_encoded(Base64ManagerService.encodeToStringService(b.getBusiness_logo()));
            }
            return b.toString();
        }
        return null;
    }

    public static Boolean evaluateBusinessInformationFormService(String businessname, String businessphonenumber, String businessaddress, String businesslogoencoded, String businesslogotype, String businesslogoname) {
        String tempString1;
        tempString1 = FieldCheckService.checkBusinessnameValidityService(businessname);
        if(!tempString1.contains(FieldCheckService.CORRECT)) {
            return false;
        }
        tempString1 = FieldCheckService.checkBusinessaddressValidityService(businessaddress);
        if(!tempString1.contains(FieldCheckService.CORRECT)) {
            return false;
        }
        tempString1 = FieldCheckService.checkBusinessphonenumberValidityService(businessphonenumber);
        if(!tempString1.contains(FieldCheckService.CORRECT)) {
            return false;
        }
        if(businesslogoencoded != null && !(businesslogoencoded.contains("null"))) {
            tempString1 = checkBusinesslogoValidityService(businesslogoencoded, businesslogotype, businesslogoname);
            if(!tempString1.contains(FieldCheckService.CORRECT)) {
                return false;
            }
        }
        Business business = Business.findPrimaryBusiness();
        if(business == null) {
            return false;
        }
        business.setBusiness_name(businessname);
        business.setBusiness_address(businessaddress);
        business.setBusiness_phone_number(businessphonenumber);
        if(businesslogoencoded != null && !(businesslogoencoded.contains("null"))) {
            business.setBusiness_logo(Base64ManagerService.decodeToByteArrayService(businesslogoencoded));
            business.setBusiness_logo_type(businesslogotype);
            business.setBusiness_logo_name(businesslogoname);
        }
        business.persist();
        return true;
    }

    public static String checkBusinesslogoValidityService(String businesslogoencoded, String businesslogotype, String businesslogoname) {
        String tempString1;
        tempString1 = Base64ManagerService.checkBusinesslogoencodedValidityService(businesslogoencoded);
        if(!tempString1.contains(FieldCheckService.CORRECT)) {
            return tempString1;
        }
        tempString1 = FieldCheckService.checkBusinesslogotypeValidityService(businesslogotype);
        if(!tempString1.contains(FieldCheckService.CORRECT)) {
            return tempString1;
        }
        tempString1 = FieldCheckService.checkBusinesslogonameValidityService(businesslogoname);
        if(!tempString1.contains(FieldCheckService.CORRECT)) {
            return tempString1;
        }
        return tempString1;
    }
}

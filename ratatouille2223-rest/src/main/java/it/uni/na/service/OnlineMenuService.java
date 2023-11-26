package it.uni.na.service;

import it.uni.na.model.Business;

public class OnlineMenuService {
    public static String findBusinessInformationService() {
        Business b = Business.findPrimaryBusiness();
        if (b != null) {
            if (b.getBusiness_logo() != null) {
                b.setBusiness_logo_encoded(Base64ManagerService.encodeToStringService(b.getBusiness_logo()));
                b.persist();
            }
            return b.toString();
        } else {
            return null;
        }
    }
}

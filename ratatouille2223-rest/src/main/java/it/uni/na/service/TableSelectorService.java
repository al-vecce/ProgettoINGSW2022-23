package it.uni.na.service;

import it.uni.na.constats.ModeConstants;
import it.uni.na.model.Business;
import it.uni.na.model.MenuElement;
import it.uni.na.model.RestaurantCheck;

import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;
import java.util.Objects;

public class TableSelectorService {
    private TableSelectorService() {}

    public static String findBusinessInformationService() {
        Business b = Business.findPrimaryBusiness();
        if(b!=null){
            if(b.getBusiness_logo() != null) {
                b.setBusiness_logo_encoded(Base64ManagerService.encodeToStringService(b.getBusiness_logo()));
                b.persist();
            }
            return b.toString();
        } else { return null; }
    }

    public static String findOpenCheckByTableService(Integer table) {
        List<RestaurantCheck> return_list;
        String return_string_list = "";

        return_list = RestaurantCheck.findAllChecksUnpaged(true);
        for (RestaurantCheck c: return_list) {
            if(table.equals(c.getCheck_table())) {
                return_string_list = c.toString();
            }
        }
        return return_string_list;
    }
}

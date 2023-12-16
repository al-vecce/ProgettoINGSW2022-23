package it.uni.na.service;

import it.uni.na.constats.ModeConstants;
import it.uni.na.model.Business;
import it.uni.na.model.MenuElement;
import it.uni.na.model.RestaurantCheck;
import it.uni.na.model.RestaurantOrder;

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
        List<RestaurantOrder> return_list_orders;
        String return_string_list = "";

        return_list = RestaurantCheck.findAllChecksUnpaged(true);
        for (RestaurantCheck c: return_list) {
            if(table.equals(c.getCheck_table())) {
                return_string_list = c.toString();
                return_string_list = return_string_list.substring(0, return_string_list.length() - 2);
                return_string_list = return_string_list + ",\n\t\"orders\": [\n";
                return_list_orders = RestaurantOrder.findAllOrdersForCheckIdOrderBy(c.getId(), "id");
                for(RestaurantOrder o: return_list_orders){
                    return_string_list = return_string_list + o.toString() + ",\n";
                }
                return_string_list = return_string_list.substring(0, return_string_list.length() - 2);
                return_string_list = return_string_list + "\n\t]\n}";
                break;
            }
        }
        return return_string_list;
    }
}

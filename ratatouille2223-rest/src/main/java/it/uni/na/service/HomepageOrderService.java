package it.uni.na.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.JsonNode;
import it.uni.na.constats.AccountEnum;
import it.uni.na.constats.ModeConstants;
import it.uni.na.model.Employee;
import it.uni.na.model.RestaurantCheck;
import it.uni.na.model.RestaurantOrder;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.Response;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;

public class HomepageOrderService {
    private HomepageOrderService(){}

    public static List<String> findAllOrdersOrderedByModeService(String mode, Long checkid) {
        List<RestaurantOrder> return_list;
        List<String> return_string_list = new LinkedList<>();
        switch (mode) {
            case ModeConstants.BYID:
                return_list = RestaurantOrder.findAllOrdersForCheckIdOrderById(checkid);
                break;
            case ModeConstants.BYPRICE:
                return_list = RestaurantOrder.findAllOrdersForCheckIdOrderByCurrentPrice(checkid);
                break;
            case ModeConstants.BYQUANTITY:
                return_list = RestaurantOrder.findAllOrdersForCheckIdOrderByQuantity(checkid);
                break;
            case ModeConstants.BYTOTALCOST:
                return_list = RestaurantOrder.findAllOrdersForCheckIdOrderByOrderTotal(checkid);
                break;
            default:
                return_list = new ArrayList<>();
        }
        for (RestaurantOrder e: return_list) {
            return_string_list.add(e.toString());
        }
        return return_string_list;
    }
    @Transactional
    public static Boolean evaluateOrderModificationService(Long orderid, Integer quantityoffset) {
        int temp;
        RestaurantOrder order = RestaurantOrder.findOrderById(orderid);
        if(order == null) {
            return false;
        }
        temp = order.getQuantity() - quantityoffset;
        if(temp <= 0) {
            order.setQuantity(0);
        } else {
            order.setQuantity(quantityoffset);
        }
        order.persist();
        return true;
    }
}

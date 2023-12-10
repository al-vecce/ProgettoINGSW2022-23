package it.uni.na.service;

import it.uni.na.constats.ModeConstants;
import it.uni.na.model.RestaurantCheck;
import it.uni.na.model.RestaurantOrder;
import jakarta.transaction.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;

public class HomepageService {
    //private HomepageService() {}
    public static List<String> findAllOpenChecksOrderedByModeService(String mode, Integer page) {
        List<RestaurantCheck> return_list;
        List<String> return_string_list = new LinkedList<>();
        if(page == null || page < 0) {
            page = 0;
        }
        switch (mode) {
            case ModeConstants.BYID:
                return_list = RestaurantCheck.findAllChecksOrderedBy(page, true, "id");
                break;
            case ModeConstants.BYTABLE:
                return_list = RestaurantCheck.findAllChecksOrderedBy(page, true, "check_table");
                break;
            case ModeConstants.BYOPENINGDATE:
                return_list = RestaurantCheck.findAllChecksOrderedBy(page, true, "opening_date_time");
                break;
            case ModeConstants.BYCLOSINGDATE:
                return_list = RestaurantCheck.findAllChecksOrderedBy(page, true, "closing_date_time");
                break;
            case ModeConstants.BYTOTALCOST:
                return_list = RestaurantCheck.findAllChecksOrderedBy(page, true, "check_total");
                break;
            default:
                return_list = new ArrayList<>();
        }
        for (RestaurantCheck e: return_list) {
            return_string_list.add(e.toString());
        }
        return return_string_list;
    }

    public static List<String> findAllOpenChecksFilteredOrderedByModeService(String mode, String filterstart, String filterend, Integer page) {
        List<RestaurantCheck> return_list;
        List<String> return_string_list = new LinkedList<>();
        LocalDateTime start, end;
        if(page == null || page < 0) {
            page = 0;
        }
        if(filterstart == null || filterstart.contains("null") || filterstart.isBlank()) {
            filterstart = LocalDateTime.MIN.toString();
        }
        start = LocalDateTime.parse(filterstart);
        if(filterend == null || filterend.contains("null") || filterend.isBlank()) {
            filterend = LocalDateTime.now().toString();
        }end = LocalDateTime.parse(filterend);

        if(filterstart.compareTo(filterend) >= 0) {
            mode = "invalid, don't return anything";
        }
        switch (mode) {
            case ModeConstants.BYID:
                return_list = RestaurantCheck.findAllChecksFilteredOrderedBy(page, start, end, true, "id");
                break;
            case ModeConstants.BYTABLE:
                return_list = RestaurantCheck.findAllChecksFilteredOrderedBy(page, start, end, true, "check_table");
                break;
            case ModeConstants.BYOPENINGDATE:
                return_list = RestaurantCheck.findAllChecksFilteredOrderedBy(page, start, end, true, "opening_date_time");
                break;
            case ModeConstants.BYCLOSINGDATE:
                return_list = RestaurantCheck.findAllChecksFilteredOrderedBy(page, start, end, true, "closing_date_time");
                break;
            case ModeConstants.BYTOTALCOST:
                return_list = RestaurantCheck.findAllChecksFilteredOrderedBy(page, start, end, true, "check_total");
                break;
            default:
                return_list = new ArrayList<>();
        }
        for (RestaurantCheck e: return_list) {
            return_string_list.add(e.toString());
        }
        return return_string_list;
    }
    public static Integer findNumberOfPagesOfOpenChecksService() {
        return RestaurantCheck.findChecksPages(true);
    }
    public static Integer findNumberOfPagesOfOpenChecksServiceFiltered(String filterstart, String filterend) {
        LocalDateTime start, end;
        if(filterstart == null || filterstart.contains("null") || filterstart.isBlank()) {
            filterstart = LocalDateTime.MIN.toString();
        }
        start = LocalDateTime.parse(filterstart);
        if(filterend == null || filterend.contains("null") || filterend.isBlank()) {
            filterend = LocalDateTime.now().toString();
        }
        end = LocalDateTime.parse(filterend);

        if(filterstart.compareTo(filterend) >= 0) {
            filterstart = LocalDateTime.MIN.toString();
            filterend = LocalDateTime.now().toString();
            start = LocalDateTime.parse(filterstart);
            end = LocalDateTime.parse(filterend);
        }
        return RestaurantCheck.findChecksPagesFiltered(true, start, end);
    }

    @Transactional
    public static Boolean evaluateCloseOpenCheckService(Long checkid) {
        RestaurantCheck check = RestaurantCheck.findCheckById(checkid);
        if(check == null) {
            return false;
        }
        check.setCheck_status(false);
        check.setClosing_date_time(LocalDateTime.now());
        check.persist();
        return true;
    }

    public static List<String> findAllOrdersOrderedByModeService(String mode, Long checkid) {
        List<RestaurantOrder> return_list;
        List<String> return_string_list = new LinkedList<>();
        switch (mode) {
            case ModeConstants.BYID:
                return_list = RestaurantOrder.findAllOrdersForCheckIdOrderBy(checkid, "id");
                break;
            case ModeConstants.BYPRICE:
                return_list = RestaurantOrder.findAllOrdersForCheckIdOrderBy(checkid, "current_price");
                break;
            case ModeConstants.BYQUANTITY:
                return_list = RestaurantOrder.findAllOrdersForCheckIdOrderBy(checkid, "quantity");
                break;
            case ModeConstants.BYTOTALCOST:
                return_list = RestaurantOrder.findAllOrdersForCheckIdOrderBy(checkid, "order_total");
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
        temp = order.getQuantity() + quantityoffset;
        order.setQuantity(Math.max(temp, 0));
        if(order.getQuantity() == 0) {
            order.delete();
        }
        else { order.persist(); }
        return true;
    }
}

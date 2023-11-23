package it.uni.na.service;

import it.uni.na.constats.ModeConstants;
import it.uni.na.model.RestaurantCheck;
import it.uni.na.model.RestaurantOrder;
import jakarta.transaction.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;

public class CheckHistoryService {
    public static List<String> findAllClosedChecksOrderedByModeService(String mode, Integer page) {
        List<RestaurantCheck> return_list;
        List<String> return_string_list = new LinkedList<>();
        if(page == null || page < 0) {
            page = 0;
        }
        switch (mode) {
            case ModeConstants.BYID:
                return_list = RestaurantCheck.findAllChecksOrderedById(page, false);
                break;
            case ModeConstants.BYTABLE:
                return_list = RestaurantCheck.findAllChecksOrderedByTable(page, false);
                break;
            case ModeConstants.BYOPENINGDATE:
                return_list = RestaurantCheck.findAllChecksOrderedByOpeningTime(page, false);
                break;
            case ModeConstants.BYCLOSINGDATE:
                return_list = RestaurantCheck.findAllChecksOrderedByClosingTime(page, false);
                break;
            case ModeConstants.BYTOTALCOST:
                return_list = RestaurantCheck.findAllChecksOrderedByTotal(page, false);
                break;
            default:
                return_list = new ArrayList<>();
        }
        for (RestaurantCheck e: return_list) {
            return_string_list.add(e.toString());
        }
        return return_string_list;
    }

    public static List<String> findAllClosedChecksFilteredOrderedByModeService(String mode, String filterstart, String filterend, Integer page) {
        List<RestaurantCheck> return_list;
        List<String> return_string_list = new LinkedList<>();
        LocalDateTime start, end;
        if(page == null || page < 0) {
            page = 0;
        }
        if(filterstart == null || filterstart.contains("null") || filterstart.isBlank()) {
            filterstart = LocalDateTime.now().toString();
        }
        start = LocalDateTime.parse(filterstart);
        if(filterend == null || filterend.contains("null") || filterend.isBlank()) {
            filterend = LocalDateTime.now().toString();
        }
        end = LocalDateTime.parse(filterend);
        if(filterstart.compareTo(filterend) >= 0) {
            mode = "invalid, don't return anything";
        }
        switch (mode) {
            case ModeConstants.BYID:
                return_list = RestaurantCheck.findAllChecksFilteredOrderedById(page, start, end, false);
                break;
            case ModeConstants.BYTABLE:
                return_list = RestaurantCheck.findAllChecksFilteredOrderedByTable(page, start, end, false);
                break;
            case ModeConstants.BYOPENINGDATE:
                return_list = RestaurantCheck.findAllChecksFilteredOrderedByOpeningTime(page, start, end, false);
                break;
            case ModeConstants.BYCLOSINGDATE:
                return_list = RestaurantCheck.findAllChecksFilteredOrderedByClosingTime(page, start, end, false);
                break;
            case ModeConstants.BYTOTALCOST:
                return_list = RestaurantCheck.findAllChecksFilteredOrderedByTotal(page, start, end, false);
                break;
            default:
                return_list = new ArrayList<>();
        }
        for (RestaurantCheck e: return_list) {
            return_string_list.add(e.toString());
        }
        return return_string_list;
    }
    public static Integer findNumberOfPagesOfClosedChecksService() {
        return RestaurantCheck.findChecksPages(false);
    }

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
    public static Boolean evaluateDeleteClosedCheckService(Long checkid) {
        RestaurantCheck check = RestaurantCheck.findCheckById(checkid);
        if(check == null) {
            return false;
        }
        check.delete();
        return true;
    }
}

package it.uni.na.service;

import it.uni.na.constats.ModeConstants;
import it.uni.na.model.RestaurantCheck;
import it.uni.na.model.RestaurantOrder;
import jakarta.transaction.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;

public class HomepageCheckService {
    private HomepageCheckService() {}
    public static List<String> findAllOpenChecksOrderedByModeService(String mode, Integer page) {
        List<RestaurantCheck> return_list;
        List<String> return_string_list = new LinkedList<>();
        if(page == null || page < 0) {
            page = 0;
        }
        switch (mode) {
            case ModeConstants.BYID:
                return_list = RestaurantCheck.findAllChecksOrderedById(page, true);
                break;
            case ModeConstants.BYTABLE:
                return_list = RestaurantCheck.findAllChecksOrderedByTable(page, true);
                break;
            case ModeConstants.BYOPENINGDATE:
                return_list = RestaurantCheck.findAllChecksOrderedByOpeningTime(page, true);
                break;
            case ModeConstants.BYCLOSINGDATE:
                return_list = RestaurantCheck.findAllChecksOrderedByClosingTime(page, true);
                break;
            case ModeConstants.BYTOTALCOST:
                return_list = RestaurantCheck.findAllChecksOrderedByTotal(page, true);
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
        start = LocalDateTime.parse(filterstart);
        end = LocalDateTime.parse(filterend);
        if(page == null || page < 0) {
            page = 0;
        }
        if(filterstart == null || filterstart.contains("null") || filterstart.isBlank()) {
            filterstart = LocalDateTime.now().toString();
        }
        if(filterend == null || filterend.contains("null") || filterend.isBlank()) {
            filterend = LocalDateTime.now().toString();
        }
        if(filterstart.compareTo(filterend) >= 0) {
            mode = "invalid, don't return anything";
        }
        switch (mode) {
            case ModeConstants.BYID:
                return_list = RestaurantCheck.findAllChecksFilteredOrderedById(page, start, end, true);
                break;
            case ModeConstants.BYTABLE:
                return_list = RestaurantCheck.findAllChecksFilteredOrderedByTable(page, start, end, true);
                break;
            case ModeConstants.BYOPENINGDATE:
                return_list = RestaurantCheck.findAllChecksFilteredOrderedByOpeningTime(page, start, end, true);
                break;
            case ModeConstants.BYCLOSINGDATE:
                return_list = RestaurantCheck.findAllChecksFilteredOrderedByClosingTime(page, start, end, true);
                break;
            case ModeConstants.BYTOTALCOST:
                return_list = RestaurantCheck.findAllChecksFilteredOrderedByTotal(page, start, end, true);
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
}

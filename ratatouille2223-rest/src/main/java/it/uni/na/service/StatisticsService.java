package it.uni.na.service;

import it.uni.na.constats.StatisticsConstants;
import it.uni.na.model.RestaurantCheck;
import it.uni.na.model.RestaurantOrder;
import jakarta.persistence.criteria.Order;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;

public class StatisticsService {
    private StatisticsService() {}

    public static List<String> findStatisticsBy(String mode, String scope) {
        List<RestaurantCheck> check_list = RestaurantCheck.findAllChecksUnpaged(false);;
        List<String> return_string_list = new LinkedList<>();
        List<Float> results;
        String newString;
        Map<LocalDateTime, List<RestaurantCheck>> checkMap;

        LocalDateTime curr_time;
        Float curr_float;

        if(check_list == null) {
            mode = "No closed checks, ignore.";
            scope = "No closed checks, ignore.";
        }

        switch (scope) {
            case StatisticsConstants.DAILY:
                checkMap = generateDailyMap(check_list);
                break;
            case StatisticsConstants.WEEKLY:
                checkMap = generateWeeklyMap(check_list);
                break;
            case StatisticsConstants.MONTHLY:
                checkMap = generateMonthlyMap(check_list);
                break;
            case StatisticsConstants.YEARLY:
                checkMap = generateYearlyMap(check_list);
                break;
            default:
                return return_string_list;
        }
        switch (mode) {
            case StatisticsConstants.BYTOTALPROFIT:
                results = calculateTotalProfit(checkMap);
                break;
            case StatisticsConstants.BYAVERAGEPROFIT:
                results = calculateAverageProfit(checkMap);
                break;
            case StatisticsConstants.BYAVERAGEVALUE:
                results = calculateAverageValue(checkMap);
                break;
            default:
                return return_string_list;
        }

        Iterator<LocalDateTime> it1 = checkMap.keySet().iterator();
        Iterator<Float> it2 = results.iterator();
        while(it1.hasNext() && it2.hasNext()) {
            curr_time = it1.next();
            curr_float = it2.next();
            newString = "{\n" +
                        "\t\"";
            switch (scope) {
                case StatisticsConstants.DAILY, StatisticsConstants.WEEKLY:
                    newString = newString + curr_time.getYear() + "/" + curr_time.getMonth().getValue() + "/" + curr_time.getDayOfMonth();
                    break;
                case StatisticsConstants.MONTHLY:
                    newString = newString + curr_time.getYear() + "/" + curr_time.getMonth().getValue();
                    break;
                case StatisticsConstants.YEARLY:
                    newString = newString + curr_time.getYear();
                    break;

            }
            newString = newString + "\": " + curr_float + "\n" +
                        "}";
            return_string_list.add(newString);
        }

        return return_string_list;
    }

    public static List<String> findFilteredStatisticsBy(String mode, String scope, String filterstart, String filterend) {
        List<String> return_string_list = new LinkedList<>();
        List<Float> results;
        String newString;
        Map<LocalDateTime, List<RestaurantCheck>> checkMap;

        LocalDateTime curr_time, start, end;
        Float curr_float;

        if(filterstart == null || filterstart.contains("null") || filterstart.isBlank()) {
            filterstart = LocalDateTime.now().toString();
        }
        start = LocalDateTime.parse(filterstart, DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss"));
        if(filterend == null || filterend.contains("null") || filterend.isBlank()) {
            filterend = LocalDateTime.now().toString();
        }
        end = LocalDateTime.parse(filterend);

        if(filterstart.compareTo(filterend) >= 0) {
            mode = "invalid, don't return anything";
        }

        List<RestaurantCheck> check_list = RestaurantCheck.findAllFilteredChecksUnpaged(start, end, false);;
        if(check_list.isEmpty()) {
            mode = "No closed checks, ignore.";
            scope = "No closed checks, ignore.";
        }

        switch (scope) {
            case StatisticsConstants.DAILY:
                checkMap = generateDailyMap(check_list);
                break;
            case StatisticsConstants.WEEKLY:
                checkMap = generateWeeklyMap(check_list);
                break;
            case StatisticsConstants.MONTHLY:
                checkMap = generateMonthlyMap(check_list);
                break;
            case StatisticsConstants.YEARLY:
                checkMap = generateYearlyMap(check_list);
                break;
            default:
                return return_string_list;
        }
        switch (mode) {
            case StatisticsConstants.BYTOTALPROFIT:
                results = calculateTotalProfit(checkMap);
                break;
            case StatisticsConstants.BYAVERAGEPROFIT:
                results = calculateAverageProfit(checkMap);
                break;
            case StatisticsConstants.BYAVERAGEVALUE:
                results = calculateAverageValue(checkMap);
                break;
            default:
                return return_string_list;
        }

        Iterator<LocalDateTime> it1 = checkMap.keySet().iterator();
        Iterator<Float> it2 = results.iterator();
        while(it1.hasNext() && it2.hasNext()) {
            curr_time = it1.next();
            curr_float = it2.next();
            newString = "{\n\t\"key\": \"";
            switch (scope) {
                case StatisticsConstants.DAILY, StatisticsConstants.WEEKLY:
                    newString = newString + curr_time.getYear() + "/" + curr_time.getMonth().getValue() + "/" + curr_time.getDayOfMonth();
                    break;
                case StatisticsConstants.MONTHLY:
                    newString = newString + curr_time.getYear() + "/" + curr_time.getMonth().getValue();
                    break;
                case StatisticsConstants.YEARLY:
                    newString = newString + curr_time.getYear();
                    break;

            }
            newString = newString + "\",\n\t\"value\": \"" + curr_float + "\"\n}";
            return_string_list.add(newString);
        }

        return return_string_list;
    }

    public static List<Float> calculateTotalProfit(Map<LocalDateTime, List<RestaurantCheck>> checkmap) {
        float temp_value = Float.parseFloat("0");
        List<Float> return_list = new ArrayList<>();
        for(List<RestaurantCheck> check_list: checkmap.values()) {
            for(RestaurantCheck check: check_list) {
                temp_value = temp_value + check.getCheck_total();
            }
            return_list.add(temp_value);
        }
        return return_list;
    }
    public static List<Float> calculateAverageProfit(Map<LocalDateTime, List<RestaurantCheck>> checkmap) {
        float temp_value;
        int counter = 0;
        List<Float> return_list = new ArrayList<>();
        for(List<RestaurantCheck> check_list: checkmap.values()) {
            counter = 0;
            temp_value = Float.parseFloat("0");
            for(RestaurantCheck check: check_list) {
                counter++;
                temp_value = temp_value + check.getCheck_total();
            }
            temp_value = temp_value / counter;
            return_list.add(temp_value);
        }
        return return_list;
    }
    public static List<Float> calculateAverageValue(Map<LocalDateTime, List<RestaurantCheck>> checkmap) {
        float temp_value;
        int counter = 0;
        List<Float> return_list = new ArrayList<>();

        for(List<RestaurantCheck> check_list: checkmap.values()) {
            counter = 0;
            temp_value = Float.parseFloat("0");
            for(RestaurantCheck check: check_list) {
                counter++;
                temp_value = temp_value + check.getCheck_average();
            }
            temp_value = temp_value / counter;
            return_list.add(temp_value);
        }
        return return_list;
    }
    public static Map<LocalDateTime, List<RestaurantCheck>> generateDailyMap(List<RestaurantCheck> inputlist) {
        TreeMap<LocalDateTime, List<RestaurantCheck>> checkMap = new TreeMap<>();
        ArrayList<RestaurantCheck> map_list = new ArrayList<>();
        LocalDateTime last_map_time, current_time;

        map_list.add(inputlist.get(0));
        last_map_time = map_list.get(0).getClosing_date_time();

        checkMap.put(last_map_time, map_list);

        inputlist.remove(0);

        for(RestaurantCheck c: inputlist) {
            current_time = c.getClosing_date_time();
            if(last_map_time.getYear() == current_time.getYear() && last_map_time.getMonth().equals(current_time.getMonth())
                    && last_map_time.getDayOfYear() == current_time.getDayOfYear()){
                checkMap.get(last_map_time).add(c);
            } else {
                map_list = new ArrayList<>();
                map_list.add(c);
                checkMap.put(current_time, map_list);
                last_map_time = current_time;
            }
        }
        return checkMap;
    }
    public static Map<LocalDateTime, List<RestaurantCheck>> generateWeeklyMap(List<RestaurantCheck> inputlist) {
        TreeMap<LocalDateTime, List<RestaurantCheck>> checkMap = new TreeMap<>();
        ArrayList<RestaurantCheck> map_list = new ArrayList<>();
        LocalDateTime last_map_time, current_time;

        int last_map_week, current_week;

        map_list.add(inputlist.get(0));
        last_map_time = map_list.get(0).getClosing_date_time();

        checkMap.put(last_map_time, map_list);

        inputlist.remove(0);

        for(RestaurantCheck c: inputlist) {
            current_time = c.getClosing_date_time();
            last_map_week = (last_map_time.getDayOfYear()%7)+1;
            current_week = (current_time.getDayOfYear()%7)+1;
            if(last_map_time.getYear() == current_time.getYear() && last_map_time.getMonth().equals(current_time.getMonth())
                    && last_map_week == current_week){
                checkMap.get(last_map_time).add(c);
            } else {
                map_list = new ArrayList<>();
                map_list.add(c);
                checkMap.put(current_time, map_list);
                last_map_time = current_time;
            }
        }
        return checkMap;
    }
    public static Map<LocalDateTime, List<RestaurantCheck>> generateMonthlyMap(List<RestaurantCheck> inputlist) {
        TreeMap<LocalDateTime, List<RestaurantCheck>> checkMap = new TreeMap<>();
        ArrayList<RestaurantCheck> map_list = new ArrayList<>();
        LocalDateTime last_map_time, current_time;

        map_list.add(inputlist.get(0));
        last_map_time = map_list.get(0).getClosing_date_time();

        checkMap.put(last_map_time, map_list);

        inputlist.remove(0);

        for(RestaurantCheck c: inputlist) {
            current_time = c.getClosing_date_time();
            if(last_map_time.getYear() == current_time.getYear() && last_map_time.getMonth().equals(current_time.getMonth())) {
                checkMap.get(last_map_time).add(c);
            } else {
                map_list = new ArrayList<>();
                map_list.add(c);
                checkMap.put(current_time, map_list);
                last_map_time = current_time;
            }
        }
        return checkMap;
    }
    public static Map<LocalDateTime, List<RestaurantCheck>> generateYearlyMap(List<RestaurantCheck> inputlist) {
        TreeMap<LocalDateTime, List<RestaurantCheck>> checkMap = new TreeMap<>();
        ArrayList<RestaurantCheck> map_list = new ArrayList<>();
        LocalDateTime last_map_time, current_time;

        map_list.add(inputlist.get(0));
        last_map_time = map_list.get(0).getClosing_date_time();

        checkMap.put(last_map_time, map_list);

        inputlist.remove(0);

        for(RestaurantCheck c: inputlist) {
            current_time = c.getClosing_date_time();
            if(last_map_time.getYear() == current_time.getYear()) {
                checkMap.get(last_map_time).add(c);
            } else {
                map_list = new ArrayList<>();
                map_list.add(c);
                checkMap.put(current_time, map_list);
                last_map_time = current_time;
            }
        }
        return checkMap;
    }
}

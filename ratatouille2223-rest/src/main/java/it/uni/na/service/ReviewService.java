package it.uni.na.service;

import it.uni.na.model.Business;
import it.uni.na.model.MenuElement;
import it.uni.na.model.RestaurantCheck;
import it.uni.na.model.RestaurantOrder;
import jakarta.transaction.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

public class ReviewService {
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

    public static String findOpenCheckById(Long checkid) {
        RestaurantCheck check = RestaurantCheck.findCheckById(checkid);
        if (check == null) {
            return "";
        }
        return check.toString();
    }

    @Transactional
    public static String evaluateUpdateOpenCheck(Long checkid, List<List<String>> orders_array) {
        int counter = 0;
        float total;
        boolean error_flag = false;
        StringBuilder return_string = new StringBuilder();
        List<RestaurantOrder> orders = new ArrayList<>();
        RestaurantOrder prepared_order;

        RestaurantCheck check = RestaurantCheck.findCheckById(checkid);

        for (List<String> order_fields_list : orders_array) {
            counter++;
            prepared_order = prepareOrderPersistence(checkid, order_fields_list.get(0), order_fields_list.get(1), order_fields_list.get(2), order_fields_list.get(3));
            if (prepared_order == null) {
                error_flag = true;
                return_string.append("Ordinal[").append(counter).append("] is false. ");
            } else {
                return_string.append("Ordinal[").append(counter).append("] is true. ");
                orders.add(prepared_order);
            }
        }
        if (!error_flag) {
            counter = 0;
            total = 0;
            for (RestaurantOrder o : orders) {
                counter++;
                total += o.getOrder_total();
                o.persist();
            }
            check.setCheck_total(total);
            check.setCheck_average(total / counter);
            check.persist();
        }
        return return_string.toString();
    }

    @Transactional
    public static String evaluateCreateOpenCheck(Long checkid, String table_as_string, List<List<String>> orders_array) {
        int counter = 0, table = Integer.parseInt(table_as_string);
        float total;
        boolean error_flag = false;
        StringBuilder return_string = new StringBuilder();
        List<RestaurantOrder> orders = new ArrayList<>();
        RestaurantOrder prepared_order;
        RestaurantCheck check = RestaurantCheck.findCheckById(checkid);

        for (List<String> order_fields_list : orders_array) {
            counter++;
            prepared_order = prepareOrderPersistence(checkid, order_fields_list.get(0), order_fields_list.get(1), order_fields_list.get(2), order_fields_list.get(3));
            if (prepared_order == null) {
                error_flag = true;
                return_string.append("Ordinal[").append(counter).append("] is false. ");
            } else {
                return_string.append("Ordinal[").append(counter).append("] is true. ");
                orders.add(prepared_order);
            }
        }
        if (!error_flag) {
            counter = 0;
            total = 0;
            for (RestaurantOrder o : orders) {
                counter++;
                total += o.getOrder_total();
                o.persist();
            }
            check.setCheck_total(total);
            check.setCheck_average(total / counter);
            check.persist();
        } else {
            check.delete();
        }
        return return_string.toString();
    }

    @Transactional
    public static RestaurantOrder prepareOrderPersistence(Long checkid, String element_name, String quantity, String current_price, String description) {
        RestaurantCheck check = RestaurantCheck.findCheckById(checkid);
        MenuElement e = MenuElement.findElementByName(element_name);
        RestaurantOrder temp_order = null;
        if (e == null) {
            return null;
        }
        for (RestaurantOrder o : check.getOrders()) {
            if (o.getMenuElement().equals(e)) {
                temp_order = o;
                break;
            }
        }
        if (temp_order != null) {
            temp_order.setQuantity(Integer.parseInt(quantity));
            temp_order.setOrder_total(temp_order.getCurrent_price() * temp_order.getQuantity());
            temp_order.setDescription(description);
        } else {
            temp_order = new RestaurantOrder(Integer.parseInt(quantity), Float.parseFloat(current_price), description);
            temp_order.setMenuElement(e);
            temp_order.setCheck(check);
            temp_order.setQuantity(Integer.parseInt(quantity));
            temp_order.setCurrent_price(Float.parseFloat(current_price));
            temp_order.setOrder_total(temp_order.getCurrent_price() * temp_order.getQuantity());
        }

        return temp_order;
    }

    @Transactional
    public static Long persistOpenCheck(Integer table) {
        RestaurantCheck check = new RestaurantCheck(LocalDateTime.now(), table);
        check.setCheck_status(true);
        check.persistAndFlush();
        return check.getId();
    }
    @Transactional
    public static Boolean checkTable(String table) {
        int tmp = Integer.parseInt(table);
        for (RestaurantCheck c : RestaurantCheck.findAllChecksUnpaged(true)) {
            if (c.getCheck_table().equals(tmp)) {
                return false;
            }
        }
        return true;
    }
}



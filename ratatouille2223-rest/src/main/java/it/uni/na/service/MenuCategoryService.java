package it.uni.na.service;

import it.uni.na.constats.ModeConstants;
import it.uni.na.model.MenuCategory;
import it.uni.na.model.RestaurantCheck;
import jakarta.transaction.Transactional;
import jdk.jfr.Category;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;

public class MenuCategoryService {
    private MenuCategoryService() {}

    public static List<String> findAllCategoriesOrderedByModeService(String mode, Integer page) {
        List<MenuCategory> return_list;
        List<String> return_string_list = new LinkedList<>();
        if(page == null || page < 0) {
            page = 0;
        }
        switch (mode) {
            case ModeConstants.BYNAME:
                return_list = MenuCategory.findAllCategoriesOrderedBy(page, "name");
                break;
            case ModeConstants.BYNUMBEROFELEMENTS:
                return_list = MenuCategory.findAllCategoriesOrderedBy(page, "element_number");
                break;
            case ModeConstants.BYAVERAGECOST:
                return_list = MenuCategory.findAllCategoriesOrderedBy(page, "average_cost");
                break;
            case ModeConstants.BYCLOSINGDATE:
                return_list = MenuCategory.findAllCategoriesOrderedBy(page, "last_modified");
                break;
            default:
                return_list = new ArrayList<>();
        }
        for (MenuCategory e: return_list) {
            return_string_list.add(e.toString());
        }
        return return_string_list;
    }
    public static Integer findNumberOfPages() {
        return MenuCategory.findCategoryPages();
    }
    @Transactional
    public static Boolean evaluateUpdateCategoryService(String oldname, String name) {
        if(!checkCategoryNameValidityService(name).contains(FieldCheckService.CORRECT)) {
            return false;
        }
        MenuCategory category = MenuCategory.findCategoryByName(oldname);
        if(category == null) {
            return false;
        }
        category.setName(name);
        category.setLast_modified(LocalDateTime.now());
        category.persist();
        return true;
    }
    @Transactional
    public static Boolean evaluateDeleteCategoryService(String name) {
        MenuCategory category = MenuCategory.findCategoryByName(name);
        if(category == null) {
            return false;
        }
        category.delete();
        return true;
    }
    @Transactional
    public static Boolean evaluateCreateCategoryService(String name) {
        if(!checkCategoryNameValidityService(name).contains(FieldCheckService.CORRECT)) {
            return false;
        }
        MenuCategory category = MenuCategory.findCategoryByName(name);
        if(category != null) {
            return false;
        }
        category = new MenuCategory();
        category.setName(name);
        category.setLast_modified(LocalDateTime.now());
        category.persist();
        return true;
    }
    public static String checkCategoryNameValidityService(String name) {
        String result;
        if(name == null || name.contains("null")) {
            result = FieldCheckService.NULLVALUE;
        } else if (name.isBlank()) {
            result = FieldCheckService.BLANKVALUE;
        } else if (name.isEmpty()) {
            result = FieldCheckService.EMPTYVALUE;
        } else if (!name.matches("\\A\\p{ASCII}*\\z")) {
            result = FieldCheckService.NOTASCII;
        } else if(name.length() > 100) {
            result = FieldCheckService.TOOBIG;
        } else if(name.length() < 4) {
            result = FieldCheckService.TOOSMALL;
        } else result = FieldCheckService.CORRECT;
        return result;
    }
}

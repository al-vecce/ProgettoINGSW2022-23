package it.uni.na.service;

import it.uni.na.constats.AllergenEnum;
import it.uni.na.constats.ModeConstants;
import it.uni.na.model.MenuCategory;
import it.uni.na.model.MenuElement;
import it.uni.na.model.RestaurantOrder;
import jakarta.transaction.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;

public class MenuElementService {
    private MenuElementService() {}

    public static final String UNKNOWNALLERGEN = "UNKNOWNALLERGEN";
    public static List<String> findAllElementsOrderedByModeService(String category, String mode, Integer page) {
        MenuCategory c = MenuCategory.findCategoryByName(category);
        if(c == null) {
            mode = "Ignore, please skip";
        }
        List<MenuElement> return_list;
        List<String> return_string_list = new LinkedList<>();
        if(page == null || page < 0) {
            page = 0;
        }
        switch (mode) {
            case ModeConstants.BYNAME:
                return_list = MenuElement.findAllElementsOrderedBy(c, page, "name");
                break;
            case ModeConstants.BYPRICE:
                return_list = MenuElement.findAllElementsOrderedBy(c, page, "price");
                break;
            case ModeConstants.BYCLOSINGDATE:
                return_list = MenuElement.findAllElementsOrderedBy(c, page, "last_modified");
                break;
            default:
                return_list = new ArrayList<>();
        }
        for (MenuElement e: return_list) {
            return_string_list.add(e.toString());
        }
        return return_string_list;
    }
    public static Integer findNumberOfPagesOfElementsService(String category) {
        MenuCategory c = MenuCategory.findCategoryByName(category);
        if(c == null) {
            return 0;
        }
        Long categoryid = c.getId();
        return MenuElement.findElementPages(categoryid);
    }
    @Transactional
    public static Boolean evaluateUpdateElementService(String oldname, String name, Float price,
                                                       String ingredients, String allergens,
                                                       String second_name, String second_ingredients,
                                                       Boolean openfoodfacts, String openfoodfacts_identifier) {
        if(openfoodfacts){
            if(checkElementNameValidityService(name).equals(FieldCheckService.CORRECT) && checkIngredientsValidityService(ingredients).equals(FieldCheckService.CORRECT) &&
                    checkElementNameValidityService(second_name).equals(FieldCheckService.CORRECT) && checkIngredientsValidityService(allergens).equals(FieldCheckService.CORRECT)) {
                MenuElement element = MenuElement.findElementByName(oldname);
                if(element == null) {
                    return false;
                }
                element.setName(name);
                element.setLast_modified(LocalDateTime.now());
                element.setPrice(price);
                element.setIngredients(ingredients);
                element.setAllergens(allergens);
                element.setSecond_name(second_name);
                element.setSecond_ingredients(second_ingredients);
                element.setOpenfoodfacts(openfoodfacts);
                element.setOpenfoodfacts_identifier(openfoodfacts_identifier);
                element.persist();
                return true;
            }
        }
        else {
            if(checkElementNameValidityService(name).equals(FieldCheckService.CORRECT) && checkIngredientsValidityService(ingredients).equals(FieldCheckService.CORRECT) &&
                        checkElementNameValidityService(second_name).equals(FieldCheckService.CORRECT) && checkIngredientsValidityService(second_ingredients).equals(FieldCheckService.CORRECT) &&
                        checkAllergensValidityService(allergens).equals(FieldCheckService.CORRECT)) {
                MenuElement element = MenuElement.findElementByName(oldname);
                if(element == null) {
                    return false;
                }
                element.setName(name);
                element.setLast_modified(LocalDateTime.now());
                element.setPrice(price);
                element.setIngredients(ingredients);
                element.setAllergens(allergens);
                element.setSecond_name(second_name);
                element.setSecond_ingredients(second_ingredients);
                element.setOpenfoodfacts(openfoodfacts);
                element.setOpenfoodfacts_identifier(openfoodfacts_identifier);
                element.persist();
                return true;
            }
        }
        return false;

    }
    @Transactional
    public static Boolean evaluateDeleteElementService(String name) {
        MenuElement category = MenuElement.findElementByName(name);
        if(category == null) {
            return false;
        }
        category.delete();
        return true;
    }
    @Transactional
    public static Boolean evaluateCreateElementService(String name, Float price,
                                                       String ingredients, String allergens,
                                                       String second_name, String second_ingredients,
                                                       Boolean openfoodfacts, String openfoodfacts_identifier) {
        if(openfoodfacts){
            if(checkElementNameValidityService(name).equals(FieldCheckService.CORRECT) && checkIngredientsValidityService(ingredients).equals(FieldCheckService.CORRECT) &&
                    checkElementNameValidityService(second_name).equals(FieldCheckService.CORRECT) && checkIngredientsValidityService(allergens).equals(FieldCheckService.CORRECT)) {
                MenuElement element = MenuElement.findElementByName(name);
                if(element != null) {
                    return false;
                }
                element = new MenuElement();
                element.setName(name);
                element.setLast_modified(LocalDateTime.now());
                element.setPrice(price);
                element.setIngredients(ingredients);
                element.setAllergens(allergens);
                element.setSecond_name(second_name);
                element.setSecond_ingredients(second_ingredients);
                element.setOpenfoodfacts(openfoodfacts);
                element.setOpenfoodfacts_identifier(openfoodfacts_identifier);
                element.persist();
                return true;
            }
        }
        else {
            if(checkElementNameValidityService(name).equals(FieldCheckService.CORRECT) && checkIngredientsValidityService(ingredients).equals(FieldCheckService.CORRECT) &&
                    checkElementNameValidityService(second_name).equals(FieldCheckService.CORRECT) && checkIngredientsValidityService(second_ingredients).equals(FieldCheckService.CORRECT) &&
                    checkAllergensValidityService(allergens).equals(FieldCheckService.CORRECT)) {
                MenuElement element = MenuElement.findElementByName(name);
                if(element != null) {
                    return false;
                }
                element = new MenuElement();
                element.setName(name);
                element.setLast_modified(LocalDateTime.now());
                element.setPrice(price);
                element.setIngredients(ingredients);
                element.setAllergens(allergens);
                element.setSecond_name(second_name);
                element.setSecond_ingredients(second_ingredients);
                element.setOpenfoodfacts(openfoodfacts);
                element.setOpenfoodfacts_identifier(openfoodfacts_identifier);
                element.persist();
                return true;
            }
        }
        return false;
    }
    public static String checkElementNameValidityService(String name) {
        String result;
        if(name == null || name.contains("null")) {
            result = FieldCheckService.NULLVALUE;
        } else if (name.isBlank()) {
            result = FieldCheckService.BLANKVALUE;
        } else if (name.isEmpty()) {
            result = FieldCheckService.EMPTYVALUE;
        } /*else if (!name.matches("\\A\\p{ASCII}*\\z")) {
            result = FieldCheckService.NOTASCII;
        } */else if(name.length() > 255) {
            result = FieldCheckService.TOOBIG;
        } else result = FieldCheckService.CORRECT;
        return result;
    }
    public static String checkIngredientsValidityService(String ingredients) {
        int counter = 0, counter2 = 0;
        String result = "";
        String[] list = ingredients.split(",");
        for(String s: list) {
            result = result.concat("Ordinal[" + counter + "] is ");
            if(s.contains("null")) {
                result = result.concat(FieldCheckService.NULLVALUE);
            } else if (s.isBlank()) {
                result = result.concat(FieldCheckService.BLANKVALUE);
            } else if (s.isEmpty()) {
                result = result.concat(FieldCheckService.EMPTYVALUE);
            } else if(s.length() > 20) {
                result = result.concat(FieldCheckService.TOOBIG);
            } else if(s.length() < 2) {
                result = result.concat(FieldCheckService.TOOSMALL);
            } else {
                result = result.concat(FieldCheckService.CORRECT);
                counter2++;
            }
            counter++;
            result = result.concat(", ");
        }
        if(result.isEmpty()) {
            return FieldCheckService.CORRECT;
        }
        if(counter2 == counter) {
            return FieldCheckService.CORRECT;
        }
        result = result.substring(0, result.length() - 2);
        return result;
    }
    public static String checkAllergensValidityService(String allergens) {
        int counter = 0, counter2 = 0;
        String result = "";
        String[] list = allergens.split(",");
        for(String s: list) {
            result = result.concat("Ordinal[" + counter + "] is ");
            if(s.contains("null")) {
                result = result.concat(FieldCheckService.NULLVALUE);
            } else if (s.isBlank()) {
                result = result.concat(FieldCheckService.BLANKVALUE);
            } else if (s.isEmpty()) {
                result = result.concat(FieldCheckService.EMPTYVALUE);
            } else if(s.length() > 20) {
                result = result.concat(FieldCheckService.TOOBIG);
            } else if(s.length() < 2) {
                result = result.concat(FieldCheckService.TOOSMALL);
            } else {
                s = s.toUpperCase();
                try {
                    AllergenEnum.valueOf(s);
                    result = result.concat(FieldCheckService.CORRECT);
                    counter2++;
                } catch (IllegalArgumentException e) {
                    result = result.concat(UNKNOWNALLERGEN);
                }
            }
            counter++;
            result = result.concat(", ");
        }
        if(result.isEmpty()) {
            return FieldCheckService.CORRECT;
        }
        if(counter2 == counter) {
            return FieldCheckService.CORRECT;
        }
        result = result.substring(0, result.length() - 2);
        return result;
    }

    public static Boolean isElementOfCategory(String category, String element) {
        MenuCategory c = MenuCategory.findCategoryByName(category);
        if(c == null) {
            return false;
        }
        MenuElement e = MenuElement.findElementByName(element);
        if(e == null) {
            return false;
        }
        return e.getMenuCategory().getId().equals(c.getId());
    }
}

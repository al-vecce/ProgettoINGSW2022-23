package it.uni.na.service;

import it.uni.na.model.Employee;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;

import java.sql.Date;
import java.time.LocalDate;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class ChangePasswordService {

    @Inject

    @Transactional
    public static Boolean evaluateChangePasswordFormService(String username, String password, String confirmation) {
        String tempString1, tempString2;
        tempString1 = ChangePasswordService.checkPasswordValidityService(password);
        if(!tempString1.contains("correct")) {
            return false;
        }
        tempString2 = ChangePasswordService.checkPasswordValidityService(confirmation);
        if(!tempString2.contains("correct")) {
            return false;
        } else if (!tempString1.equals(tempString2)) {
            return false;
        }
        Employee employee = Employee.findEmployeeByUsername(username);
        if(employee.getPassword().equals(password)) {
            return false;
        }
        employee.setPassword(password);
        employee.setLast_modified(java.sql.Date.valueOf(LocalDate.now()));
        employee.setFirst_login(false);
        employee.persist();
        return true;
    }

    //TODO sostituire con costanti
    //TODO valutare se spostare in una libreria indipendente o interfaccia funzionale
    public static String checkPasswordValidityService(String password) {
        String result;
        if(password == null) {
            result = "nullvalue";
        } else if (password.isBlank()) {
            result = "blankvalue";
        } else if (password.isEmpty()) {
            result = "emptyvalue";
        } else if (!password.matches("\\A\\p{ASCII}*\\z")) {
            result = "notascii";
        } else if(password.length() < 8) {
            result = "toosmall";
        }
        else if(password.length() >= 8) {
            Pattern letter = Pattern.compile("[a-z]");
            Pattern uppercase = Pattern.compile("[A-Z]");
            Pattern digit = Pattern.compile("[0-9]");
            Pattern special = Pattern.compile ("[!@#$%&*()_+=|<>?{}\\[\\]~-]");


            Matcher hasLetter = letter.matcher(password);
            Matcher hasUppercase = uppercase.matcher(password);
            Matcher hasDigit = digit.matcher(password);
            Matcher hasSpecial = special.matcher(password);

            if(!hasLetter.find()) {
                result = "atleastoneletter";
            } else if (!hasUppercase.find()) {
                result = "atleastoneuppercase";
            } else if (!hasDigit.find()) {
                result = "atleastonedigit";
            } else if (!hasSpecial.find()) {
                result = "atleastonespecial";
            }
            else result = "correct";
        }
        else result = "correct";
        return result;
    }
}

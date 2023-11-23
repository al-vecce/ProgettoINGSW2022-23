package it.uni.na.service;

import it.uni.na.model.Employee;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;

public class ChangePasswordService {

    @Inject

    @Transactional
    public static Boolean evaluateChangePasswordFormService(String username, String password, String confirmation) {
        String tempString1, tempString2;
        tempString1 = FieldCheckService.checkPasswordValidityService(password);
        if(!tempString1.contains(FieldCheckService.CORRECT)) {
            return false;
        }
        tempString2 = FieldCheckService.checkPasswordValidityService(confirmation);
        if(!tempString2.contains(FieldCheckService.CORRECT)) {
            return false;
        } else if (!tempString1.equals(tempString2)) {
            return false;
        }
        Employee employee = Employee.findEmployeeByUsername(username);
        if(employee == null) {
            return false;
        }
        if(employee.getPassword().equals(password)) {
            return false;
        }
        employee.setPassword(password);
        employee.setLast_modified(LocalDateTime.now());
        employee.setFirst_login(false);
        employee.persist();
        return true;
    }
}

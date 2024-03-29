package it.uni.na.service;

import it.uni.na.constats.AccountEnum;
import it.uni.na.constats.ModeConstants;
import it.uni.na.model.Employee;
import jakarta.transaction.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;

public class EmployeeService {
    private EmployeeService() {}
    public static List<String> findAllEmployeesOrderedByModeService(String mode, Integer page) {
        List<Employee> return_list;
        List<String> return_string_list = new LinkedList<>();
        if(page == null || page < 0) {
            page = 0;
        }
        switch (mode) {
            case ModeConstants.BYUSERNAME:
                return_list = Employee.findAllEmployeesOrderedBy(page, "username");
                break;
            case ModeConstants.BYEMPLOYEEROLE:
                return_list = Employee.findAllEmployeesOrderedBy(page, "employee_role");
                break;
            case ModeConstants.BYLASTMODIFIED:
                return_list = Employee.findAllEmployeesOrderedBy(page, "last_modified");
                break;
            default:
                return_list = new ArrayList<>();
        }
        for (Employee e: return_list) {
            return_string_list.add(e.toString());
        }
        return return_string_list;
    }
    public static Integer findNumberOfPagesOfEmployeesService() {
        return Employee.findEmployeesPages();
    }

    @Transactional
    public static Boolean evaluateUpdateEmployeeService(String oldusername, String username, String employeerole, String password, String confirmation) {
        String tempString1, tempString2;
        tempString1 = FieldCheckService.checkUsernameValidityService(username);
        if(!tempString1.contains(FieldCheckService.CORRECT)) {
            return false;
        }
        tempString1 = FieldCheckService.checkEmployeeRoleValidityService(employeerole);
        if(!tempString1.contains(FieldCheckService.CORRECT)) {
            return false;
        }
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

        Employee employee = Employee.findEmployeeByUsername(oldusername);
        if(employee == null) {
            return false;
        }
        employee.setUsername(username);
        employee.setPassword(password);
        employee.setAccount(AccountEnum.valueOf(employeerole));
        employee.setLast_modified(LocalDateTime.now());
        employee.persist();
        return true;
    }
    @Transactional
    public static Boolean evaluateDeleteEmployeeService(String username) {
        String tempString1;
        tempString1 = FieldCheckService.checkUsernameValidityService(username);
        if(!tempString1.contains(FieldCheckService.CORRECT)) {
            return false;
        }

        Employee employee = Employee.findEmployeeByUsername(username);
        if(employee == null) {
            return false;
        }
        employee.delete();
        return true;
    }
    @Transactional
    public static Boolean evaluateCreateEmployeeService(String username, String employeerole, String password) {
        String tempString1;
        tempString1 = FieldCheckService.checkUsernameValidityService(username);
        if(!tempString1.contains(FieldCheckService.CORRECT)) {
            return false;
        }
        tempString1 = FieldCheckService.checkEmployeeRoleValidityService(employeerole);
        if(!tempString1.contains(FieldCheckService.CORRECT)) {
            return false;
        }
        tempString1 = FieldCheckService.checkPasswordValidityService(password);
        if(!tempString1.contains(FieldCheckService.CORRECT)) {
            return false;
        }
        Employee employee = Employee.findEmployeeByUsername(username);
        if(employee != null) {
            return false;
        }
        employee = new Employee(username, password, AccountEnum.valueOf(employeerole));
        employee.persist();
        return true;
    }
}

package it.uni.na.service;

import it.uni.na.model.Employee;

import java.util.regex.Matcher;
import java.util.regex.Pattern;


public class LoginService {
    private LoginService() {}
    public static Boolean evaluateLoginFormService(String username, String password) {
        if(username == null || password == null) {
            return false;
        }
        return Employee.signIn(username, password);
    }
    public static Boolean checkFirstLoginStatus(String username) {
        if(username == null) {
            return false;
        }
        return Employee.isFirstLogin(username);
    }
}

package it.uni.na.service;

import io.smallrye.jwt.build.Jwt;
import it.uni.na.model.Employee;

import java.util.Arrays;
import java.util.HashSet;


public class LoginService {
    private LoginService() {}
    public static String evaluateLoginFormService(String username, String password) {
        String token;
        if(username == null || password == null) {
            return "null";
        }
        if(Employee.signIn(username, password)) {
            Employee e = Employee.findEmployeeByUsername(username);
            token = Jwt.issuer("https://example.com/issuer")
                        .upn(username)
                        .groups(new HashSet<>(Arrays.asList(e.getAccount().toString())))
                        .sign();
            return token;
        }
        return "null";
    }
    public static Boolean checkFirstLoginStatus(String username) {
        if(username == null) {
            return false;
        }
        return Employee.isFirstLogin(username);
    }
}

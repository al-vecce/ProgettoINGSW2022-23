package it.uni.na.service;

import it.uni.na.constats.Account;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class FieldCheckService {
    private FieldCheckService() { }  // Prevents instantiation

    public static final String NULLVALUE            = "NULLVALUE";
    public static final String BLANKVALUE           = "BLANKVALUE";
    public static final String EMPTYVALUE           = "EMPTYVALUE";

    public static final String NOTASCII             = "NOTASCII";
    public static final String TOOBIG               = "TOOBIG";
    public static final String TOOSMALL             = "TOOSMALL";

    public static final String ATLEASTONELOWERCASE  = "ATLEASTONELETTER";
    public static final String ATLEASTONEUPPERCASE  = "ATLEASTONEUPPERCASE";
    public static final String ATLEASTONEDIGIT      = "ATLEASTONEDIGIT";
    public static final String ATLEASTONESPECIAL    = "ATLEASTONESPECIAL";

    public static final String INVALIDROLE          = "INVALIDROLE";

    public static final String CORRECT              = "CORRECT";

    public static String checkUsernameValidityService(String username) {
        String result;
        if(username == null) {
            result = NULLVALUE;
        } else if (username.isBlank()) {
            result = BLANKVALUE;
        } else if (username.isEmpty()) {
            result = EMPTYVALUE;
        } else if (!username.matches("\\A\\p{ASCII}*\\z")) {
            result = NOTASCII;
        } else if(username.length() > 40) {
            result = TOOBIG;
        } else if(username.length() < 4) {
            result = TOOSMALL;
        } else result = CORRECT;
        return result;
    }
    public static String checkEmployeeRoleValidityService(String employeerole) {
        String result = INVALIDROLE;
        for(Account a: Account.values()) {
            if(a.name().equals(employeerole)) {
                result = CORRECT;
            }
        }
        return result;
    }
    public static String checkPasswordValidityService(String password) {
        String result;
        if(password == null) {
            result = NULLVALUE;
        } else if (password.isBlank()) {
            result = BLANKVALUE;
        } else if (password.isEmpty()) {
            result = EMPTYVALUE;
        } else if (!password.matches("\\A\\p{ASCII}*\\z")) {
            result = NOTASCII;
        } else if(password.length() < 8) {
            result = TOOSMALL;
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
                result = ATLEASTONELOWERCASE;
            } else if (!hasUppercase.find()) {
                result = ATLEASTONEUPPERCASE;
            } else if (!hasDigit.find()) {
                result = ATLEASTONEDIGIT;
            } else if (!hasSpecial.find()) {
                result = ATLEASTONESPECIAL;
            }
            else result = CORRECT;
        }
        else result = CORRECT;
        return result;
    }
}

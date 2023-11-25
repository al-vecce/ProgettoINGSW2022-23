package it.uni.na.service;

import it.uni.na.constats.AccountEnum;

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

    public static final String ATLEASTONELETTER     = "ATLEASTONELETTER";
    public static final String ATLEASTONELOWERCASE  = "ATLEASTONELOWERCASE";
    public static final String ATLEASTONEUPPERCASE  = "ATLEASTONEUPPERCASE";
    public static final String ATLEASTONEDIGIT      = "ATLEASTONEDIGIT";
    public static final String ATLEASTONESPECIAL    = "ATLEASTONESPECIAL";

    public static final String INVALIDFILEEXTENSION = "INVALIDFILEEXTENSION";
    public static final String NOTALPHANUMERIC      = "NOTALPHANUMERIC";

    public static final String REMOVELOWERCASE      = "REMOVELOWERCASE";
    public static final String REMOVEUPPERCASE      = "REMOVEUPPERCASE";
    public static final String REMOVEDIGIT          = "REMOVEDIGIT";
    public static final String REMOVESPECIAL        = "REMOVESPECIAL";
    public static final String INVALIDROLE          = "INVALIDROLE";

    public static final String CORRECT              = "CORRECT";

    public static String checkUsernameValidityService(String username) {
        String result;
        if(username == null || username.contains("null")) {
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
        for(AccountEnum a: AccountEnum.values()) {
            if (a.name().equals(employeerole)) {
                result = CORRECT;
                break;
            }
        }
        return result;
    }
    public static String checkPasswordValidityService(String password) {
        String result;
        if(password == null || password.contains("null")) {
            result = NULLVALUE;
        } else if (password.isBlank()) {
            result = BLANKVALUE;
        } else if (password.isEmpty()) {
            result = EMPTYVALUE;
        } else if (!password.matches("\\A\\p{ASCII}*\\z")) {
            result = NOTASCII;
        } else if(password.length() < 8) {
            result = TOOSMALL;
        } else {
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
        return result;
    }
    public static String checkBusinessnameValidityService(String businessname) {
        String result;
        if(businessname == null || businessname.contains("null")) {
            result = CORRECT;
        } else if (businessname.isBlank()) {
            result = CORRECT;
        } else if (businessname.isEmpty()) {
            result = CORRECT;
        } else if (!businessname.matches("\\A\\p{ASCII}*\\z")) {
            result = NOTASCII;
        } else if(businessname.length() > 100) {
            result = TOOBIG;
        } else if(businessname.length() < 4) {
            result = TOOSMALL;
        } else result = CORRECT;
        return result;
    }
    public static String checkBusinessaddressValidityService(String businessaddress) {
        String result;
        if(businessaddress == null || businessaddress.contains("null")) {
            result = CORRECT;
        } else if (businessaddress.isBlank()) {
            result = CORRECT;
        } else if (businessaddress.isEmpty()) {
            result = CORRECT;
        } else if (!businessaddress.matches("\\A\\p{ASCII}*\\z")) {
            result = NOTASCII;
        } else if(businessaddress.length() > 200) {
            result = TOOBIG;
        } else if(businessaddress.length() < 4) {
            result = TOOSMALL;
        } else result = CORRECT;
        return result;
    }
    public static String checkBusinessphonenumberValidityService(String businessphonenumber) {
        String result;
        if(businessphonenumber == null || businessphonenumber.contains("null")) {
            result = CORRECT;
        } else if (businessphonenumber.isBlank()) {
            result = CORRECT;
        } else if (businessphonenumber.isEmpty()) {
            result = CORRECT;
        } else if (!businessphonenumber.matches("\\A\\p{ASCII}*\\z")) {
            result = NOTASCII;
        } else if(businessphonenumber.length() > 200) {
            result = TOOBIG;
        } else if(businessphonenumber.length() < 4) {
            result = TOOSMALL;
        } else {
            Pattern letter = Pattern.compile("[a-z]");
            Pattern uppercase = Pattern.compile("[A-Z]");
            Pattern special = Pattern.compile ("[!@#$%&*()_+=|<>?{}\\[\\]~-]");


            Matcher hasLetter = letter.matcher(businessphonenumber);
            Matcher hasUppercase = uppercase.matcher(businessphonenumber);
            Matcher hasSpecial = special.matcher(businessphonenumber);

            if(hasLetter.find()) {
                result = REMOVELOWERCASE;
            } else if (hasUppercase.find()) {
                result = REMOVEUPPERCASE;
            } else if (hasSpecial.find()) {
                result = REMOVESPECIAL;
            }
            else result = CORRECT;
        }
        return result;
    }
    public static String checkBusinesslogotypeValidityService(String businesslogotype) {
        String result = "businesslogotype-";
        if(businesslogotype == null || businesslogotype.contains("null")) {
            result = result.concat(NULLVALUE);
        } else if (businesslogotype.isBlank()) {
            result = result.concat(BLANKVALUE);
        } else if (businesslogotype.isEmpty()) {
            result = result.concat(EMPTYVALUE);
        } else if (!businesslogotype.matches("\\A\\p{ASCII}*\\z")) {
            result = result.concat(NOTASCII);
        } else if(businesslogotype.length() > 200) {
            result = result.concat(TOOBIG);
        } else if(businesslogotype.length() < 4) {
            result = result.concat(TOOSMALL);
        } else {
            Pattern special = Pattern.compile ("^.*\\.(jpg|JPG|jpeg|JPEG|png|PNG|svg|SVG)$");

            Matcher hasSpecial = special.matcher(businesslogotype);

            if(!hasSpecial.find()) {
                result = result.concat(INVALIDFILEEXTENSION);
            }
            else result = CORRECT;
        }
        return result;
    }
    public static String checkBusinesslogonameValidityService(String businesslogoname) {
        String result = "businesslogoname-";
        if(businesslogoname == null || businesslogoname.contains("null")) {
            result = result.concat(NULLVALUE);
        } else if (businesslogoname.isBlank()) {
            result = result.concat(BLANKVALUE);
        } else if (businesslogoname.isEmpty()) {
            result = result.concat(EMPTYVALUE);
        } else if (!businesslogoname.matches("\\A\\p{ASCII}*\\z")) {
            result = result.concat(NOTASCII);
        } else if(businesslogoname.length() > 100) {
            result = result.concat(TOOBIG);
        } else if(businesslogoname.length() < 4) {
            result = result.concat(TOOSMALL);
        } else {
            Pattern alphaNumeric = Pattern.compile("^[a-zA-Z0-9]{4,100}$");

            Matcher hasAlphaNumeric = alphaNumeric.matcher(businesslogoname);

            if (!hasAlphaNumeric.find()) {
                result = result.concat(NOTALPHANUMERIC);
            } else result = CORRECT;
        }
        return result;
    }
}

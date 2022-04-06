package com.bigdata.buur.customException;

public class UserValidateException extends RuntimeException{

    public UserValidateException(String message) {
        super(message);
    }
}

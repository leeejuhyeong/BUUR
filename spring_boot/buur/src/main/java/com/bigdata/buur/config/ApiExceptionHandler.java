package com.bigdata.buur.config;

import com.bigdata.buur.customException.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.io.IOException;
import java.net.ConnectException;
import java.time.LocalDateTime;
import java.util.NoSuchElementException;

@RestControllerAdvice
public class ApiExceptionHandler {

    @ExceptionHandler(value = IllegalArgumentException.class)
    public ResponseEntity<ApiException> handlerIllegalArgumentException(IllegalArgumentException e) {
        ApiException responseBody = new ApiException("필요한 정보를 정확히 입력하세요.", LocalDateTime.now());
        return ResponseEntity.badRequest().body(responseBody);
    }

    @ExceptionHandler(value = EntitySaveException.class)
    public ResponseEntity<ApiException> handlerEntitySaveException(EntitySaveException e) {
        ApiException responseBody = new ApiException("저장에 실패했습니다.", LocalDateTime.now());
        return ResponseEntity.internalServerError().body(responseBody);
    }
    
    @ExceptionHandler(value = IOException.class)
    public ResponseEntity<ApiException> handlerIOException(IOException e) {
        ApiException responseBody = new ApiException("사진 처리에 실패했습니다.", LocalDateTime.now());
        return ResponseEntity.internalServerError().body(responseBody);
    }

    @ExceptionHandler(value = UserAuthExpiredException.class)
    public ResponseEntity<ApiException> handlerUserAuthExpiredException(UserAuthExpiredException e) {
        ApiException responseBody = new ApiException("유저 인증 정보가 만료되었습니다.", LocalDateTime.now());
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(responseBody);
    }

    @ExceptionHandler(value = UserNotFoundException.class)
    public ResponseEntity<ApiException> handlerUserNotFoundException(UserNotFoundException e) {
        ApiException responseBody = new ApiException("유저 정보가 존재하지 않습니다.", LocalDateTime.now());
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(responseBody);
    }

    @ExceptionHandler(value = UserPasswordMismatchException.class)
    public ResponseEntity<ApiException> handlerUserPasswordMismatchException(UserPasswordMismatchException e) {
        ApiException responseBody = new ApiException("비밀번호가 일치하지 않습니다.", LocalDateTime.now());
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(responseBody);
    }

    @ExceptionHandler(value = NoSuchElementException.class)
    public ResponseEntity<ApiException> handlerNoSuchElementException(NoSuchElementException e) {
        ApiException responseBody = new ApiException("조회정보가 존재하지 않습니다.", LocalDateTime.now());
        return ResponseEntity.badRequest().body(responseBody);
    }

    @ExceptionHandler(value = EntityRemoveException.class)
    public ResponseEntity<ApiException> handlerEntityRemoveException(EntityRemoveException e) {
        ApiException responseBody = new ApiException("삭제에 실패했습니다.", LocalDateTime.now());
        return ResponseEntity.internalServerError().body(responseBody);
    }

    @ExceptionHandler(value = ConnectException.class)
    public ResponseEntity<ApiException> handlerConnectException(ConnectException e) {
        ApiException responseBody = new ApiException("서버와의 연결에 실패했습니다.", LocalDateTime.now());
        return ResponseEntity.internalServerError().body(responseBody);
    }

    @ExceptionHandler(value = UserValidateException.class)
    public ResponseEntity<ApiException> handlerUserValidateException(UserValidateException e) {
        ApiException responseBody = new ApiException(e.getMessage(), LocalDateTime.now());
        return ResponseEntity.badRequest().body(responseBody);
    }

}

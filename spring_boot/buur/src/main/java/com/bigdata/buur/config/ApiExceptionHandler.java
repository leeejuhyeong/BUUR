package com.bigdata.buur.config;

import com.bigdata.buur.customException.EntitySaveException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.LocalDateTime;
import java.time.ZonedDateTime;

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
        return ResponseEntity.ok().body(responseBody);
    }



}

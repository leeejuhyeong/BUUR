package com.bigdata.buur.config;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDateTime;

@AllArgsConstructor
@Getter
public class ApiException {
    private final String message;
    private final LocalDateTime errorOccurrenceTime;
}

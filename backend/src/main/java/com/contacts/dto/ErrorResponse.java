package com.contacts.dto;

import io.micronaut.serde.annotation.Serdeable;

@Serdeable
public record ErrorResponse(
        String message,
        int status
) {}
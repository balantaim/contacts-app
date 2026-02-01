package com.contacts.dto;


import io.micronaut.serde.annotation.Serdeable;

@Serdeable
public record ContactDto(
        Long id,
        String firstName,
        String lastName,
        String phoneNumber,
        String email) {
}

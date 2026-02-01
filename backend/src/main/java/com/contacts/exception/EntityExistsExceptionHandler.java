package com.contacts.exception;

import com.contacts.dto.ErrorResponse;
import io.micronaut.http.HttpRequest;
import io.micronaut.http.HttpResponse;
import io.micronaut.http.HttpStatus;
import io.micronaut.http.annotation.Produces;
import jakarta.inject.Singleton;
import jakarta.persistence.EntityExistsException;
import io.micronaut.http.server.exceptions.ExceptionHandler;

@Produces
@Singleton
public class EntityExistsExceptionHandler implements ExceptionHandler<EntityExistsException, HttpResponse<ErrorResponse>> {

    @Override
    public HttpResponse<ErrorResponse> handle(HttpRequest request,
            EntityExistsException exception) {
        ErrorResponse error = new ErrorResponse(
                exception.getMessage(),
                HttpStatus.CONFLICT.getCode()
        );

        return HttpResponse.status(HttpStatus.CONFLICT).body(error);
    }

}
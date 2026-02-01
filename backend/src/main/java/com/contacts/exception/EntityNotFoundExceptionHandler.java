package com.contacts.exception;

import com.contacts.dto.ErrorResponse;
import io.micronaut.http.HttpRequest;
import io.micronaut.http.HttpResponse;
import io.micronaut.http.HttpStatus;
import io.micronaut.http.annotation.Produces;
import io.micronaut.http.server.exceptions.ExceptionHandler;
import jakarta.inject.Singleton;
import jakarta.persistence.EntityNotFoundException;

@Produces
@Singleton
public class EntityNotFoundExceptionHandler implements ExceptionHandler<EntityNotFoundException, HttpResponse<ErrorResponse>> {

    @Override
    public HttpResponse<ErrorResponse> handle(HttpRequest request,
            EntityNotFoundException exception) {

        ErrorResponse error = new ErrorResponse(
                exception.getMessage(),
                HttpStatus.NOT_FOUND.getCode()
        );

        return HttpResponse.status(HttpStatus.NOT_FOUND).body(error);
    }
}

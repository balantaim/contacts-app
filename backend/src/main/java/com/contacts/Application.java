package com.contacts;

import io.micronaut.runtime.Micronaut;
import io.swagger.v3.oas.annotations.*;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeType;
import io.swagger.v3.oas.annotations.info.*;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.security.SecurityScheme;


@SecurityScheme(
        name = "basicAuth", // can be set to anything
        type = SecuritySchemeType.HTTP,
        scheme = "basic"
)
@OpenAPIDefinition(
    info = @Info(
            title = "contacts-app",
            version = "1.0",
            description = "Backend application with CRUD functionality",
            contact = @Contact(name = "Martin Atanasov")
    ),
        security = @SecurityRequirement(name = "basicAuth")
)

public class Application {

    public static void main(final String[] args) {
        Micronaut.run(Application.class, args);
    }

}
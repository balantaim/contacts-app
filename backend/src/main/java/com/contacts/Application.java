package com.contacts;

import io.micronaut.runtime.Micronaut;
import io.swagger.v3.oas.annotations.*;
import io.swagger.v3.oas.annotations.info.*;

@OpenAPIDefinition(
    info = @Info(
            title = "contacts-app",
            version = "1.0",
            description = "Backend application with CRUD functionality",
            contact = @Contact(
                    name = "Martin Atanasov"
            )
    )
)

public class Application {

    public static void main(String[] args) {
        Micronaut.run(Application.class, args);
    }

}
package com.contacts.controller;

import io.micronaut.http.MediaType;
import io.micronaut.http.annotation.Controller;
import io.micronaut.http.annotation.Get;
import io.micronaut.security.annotation.Secured;
import io.micronaut.security.rules.SecurityRule;

import java.util.HashMap;
import java.util.Map;

@Secured(SecurityRule.IS_ANONYMOUS)
@Controller("/login")
public class LoginAuthController {

    @Get("/authFailed")
    public Map<String, Object> authFailed() {
        Map<String, Object> model = new HashMap<>();
        model.put("errors", true);
        return model;
    }

    @Secured("isAuthenticated()")
    @Get(uri = "/authSuccess", produces = MediaType.TEXT_PLAIN)
    public String authSuccess() {
        return "Authentication Success";
    }
}

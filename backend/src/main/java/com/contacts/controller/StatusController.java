package com.contacts.controller;

import io.micronaut.core.annotation.Nullable;
import io.micronaut.core.util.CollectionUtils;
import io.micronaut.http.MediaType;
import io.micronaut.http.annotation.Controller;
import io.micronaut.http.annotation.Get;
import io.micronaut.http.annotation.Produces;
import io.micronaut.security.annotation.Secured;

import java.security.Principal;
import java.util.Collections;
import java.util.Map;

@Controller("/status")
public class StatusController {

//    @Operation(summary = "Get login status", description = "Check if the user is logged in the system")
//    @ApiResponse(responseCode = "200", description = "OK")

    @Secured("isAnonymous()")
    @Get("/info")
    public Map myinfo(@Nullable Principal principal) {
        if (principal == null) {
            return Collections.singletonMap("isLoggedIn", false);
        }
        return CollectionUtils.mapOf("isLoggedIn", true, "username", principal.getName());
    }

//    @Operation(summary = "Get user name", description = "Check the user name for authenticated user only")
//    @ApiResponse(responseCode = "200", description = "OK")
//    @ApiResponse(responseCode = "400", description = "User is not authenticated")

    @Secured("isAuthenticated()")
    @Produces(MediaType.TEXT_PLAIN)
    @Get("/get-user")
    String getUserName(Principal principal) {
        return principal.getName();
    }

}

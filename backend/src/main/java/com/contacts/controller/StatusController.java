package com.contacts.controller;

import io.micronaut.core.annotation.Nullable;
import io.micronaut.core.util.CollectionUtils;
import io.micronaut.http.annotation.Controller;
import io.micronaut.http.annotation.Get;
import io.micronaut.security.annotation.Secured;
import io.micronaut.security.rules.SecurityRule;

import java.security.Principal;
import java.util.Collections;
import java.util.Map;

@Secured(SecurityRule.IS_ANONYMOUS)
@Controller("/status")
public class StatusController {

//    @Operation(summary = "Get login status", description = "Check if the user is logged in the system")
//    @ApiResponse(responseCode = "200", description = "OK")

    @Secured("isAnonymous()")
    @Get("/info")
    public Map myInfo(@Nullable Principal principal) {
        if (principal == null) {
            return Collections.singletonMap("isLoggedIn", false);
        }
        return CollectionUtils.mapOf("isLoggedIn", true, "username", principal.getName());
    }

}

package com.contacts.security;


import io.micronaut.context.annotation.Value;
import io.micronaut.core.async.annotation.SingleResult;
import io.micronaut.http.HttpRequest;
import io.micronaut.security.authentication.AuthenticationFailureReason;
import io.micronaut.security.authentication.AuthenticationRequest;
import io.micronaut.security.authentication.AuthenticationResponse;
import io.micronaut.security.authentication.provider.HttpRequestReactiveAuthenticationProvider;
import jakarta.inject.Singleton;
import org.reactivestreams.Publisher;
import reactor.core.publisher.Mono;



@Singleton
class CustomAuthenticationProvider<B> implements HttpRequestReactiveAuthenticationProvider<B> {

    @Value(value = "${user.login.name}")
    private String USER_NAME;
    @Value(value = "${user.login.pass}")
    private String USER_PASS;

    @Override
    @SingleResult
    public Publisher<AuthenticationResponse> authenticate(HttpRequest<B> requestContext, AuthenticationRequest<String, String> authRequest) {
        AuthenticationResponse rsp = authRequest.getIdentity().equals(USER_NAME) && authRequest.getSecret().equals(USER_PASS)
                ? AuthenticationResponse.success(USER_NAME)
                : AuthenticationResponse.failure(AuthenticationFailureReason.CREDENTIALS_DO_NOT_MATCH);
        return Mono.create(emitter -> {
            emitter.success(rsp);
        });
    }
}

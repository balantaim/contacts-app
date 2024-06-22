package com.contacts;

import io.micronaut.runtime.EmbeddedApplication;
import io.micronaut.test.extensions.junit5.annotation.MicronautTest;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.Assertions;

import jakarta.inject.Inject;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

@MicronautTest
class ContactsAppTest {

    @Inject
    EmbeddedApplication<?> application;

    @Test
    void testItWorks() {
        Assertions.assertTrue(application.isRunning());
    }

    @Test
    void testEmailValidationPositive(){
        String email = "^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,150})$";

        //Valid email
        String testEmail = "abv@abv.bg";

        Pattern pattern = Pattern.compile(email, Pattern.CASE_INSENSITIVE);
        Matcher matcher = pattern.matcher(testEmail);
        //Check if the email is Valid
        Assertions.assertTrue(matcher.matches());
    }

    @Test
    void testEmailValidationNegative(){
        String email = "^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,150})$";

        //Invalid email
        String testEmailInvalid = "5435435";

        Pattern pattern = Pattern.compile(email, Pattern.CASE_INSENSITIVE);
        Matcher matcher = pattern.matcher(testEmailInvalid);
        //Check if the email is Invalid
        Assertions.assertFalse(matcher.matches());
    }


}

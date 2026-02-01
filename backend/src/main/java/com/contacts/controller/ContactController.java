package com.contacts.controller;

import com.contacts.dto.ContactDto;
import com.contacts.service.ContactService;
import io.micronaut.core.annotation.Nullable;
import io.micronaut.http.HttpResponse;
import io.micronaut.http.annotation.*;
import io.micronaut.security.annotation.Secured;
import io.micronaut.security.rules.SecurityRule;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.inject.Inject;
import lombok.extern.slf4j.Slf4j;

import java.util.List;
import java.util.Optional;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

@Slf4j
@Secured(SecurityRule.IS_AUTHENTICATED)
//Swagger Tag Name
@Tag(name = "Contact Controller CRUD")
@Controller
public class ContactController {

    //Use jakarta @Inject for dependency injection (field should not be final)
    @Inject
    private ContactService contactService;

    //Get all Contacts and filter it by 'filter' if is given
    @Operation(summary = "Get all contacts", description = "Get all Contacts and filter it by 'filter' if is given")
    @ApiResponse(responseCode = "200", description = "OK")
    @ApiResponse(responseCode = "401", description = "Unauthorized")

    @Get
    public HttpResponse<List<ContactDto>> getAllContacts(@Nullable @QueryValue final String filter) {
        List<ContactDto> data;
        if (filter == null) {
            //Get all contacts
            data = contactService.getAllContacts();
        } else {
            //Get all contacts and Search the date for keywords
            data = contactService.getAllContacts()
                    .stream()
                    .filter(n ->
                            n.firstName().toLowerCase().contains(filter.toLowerCase()) ||
                                    n.lastName().toLowerCase().contains(filter.toLowerCase()) ||
                                    n.phoneNumber().toLowerCase().contains(filter.toLowerCase()) ||
                                    n.email().toLowerCase().contains(filter.toLowerCase()))
                    .collect(Collectors.toList());
        }
        //Get some information for debugging
        StringBuilder output = new StringBuilder();
        if (data != null) {
            for (ContactDto c : data) {
                output.append(c).append(";\n");
            }
        } else {
            log.info("There are no contacts!");
        }
        log.info(output.toString());
        return HttpResponse.ok(data);
    }

    //Find contact by ID
    @Operation(summary = "Get contact by ID", description = "Provide contact data")
    @ApiResponse(responseCode = "200", description = "OK")
    @ApiResponse(responseCode = "401", description = "Unauthorized")
    @ApiResponse(responseCode = "404", description = "Contact not found")

    @Get("/find/{id}")
    public HttpResponse<ContactDto> findById(@PathVariable final Long id) {
        return contactService.getContactById(id)
                .map(HttpResponse::ok)
                .orElseGet(HttpResponse::notFound);
    }

    //Add a new Contact
    @Operation(summary = "Add a new Contact", description = "Create new contact")
    @ApiResponse(responseCode = "201", description = "New contact created")
    @ApiResponse(responseCode = "400", description = "Invalid Contact's data")
    @ApiResponse(responseCode = "401", description = "Unauthorized")

    @Post(uri = "/add")
    public HttpResponse<ContactDto> addContact(@Body ContactDto contactDto) {
        //Validate record's data
        if (validateContact(contactDto)) {
            //Save the contact to the DB
            Optional<ContactDto> newContact = contactService.createContact(
                    new ContactDto(0L,
                            contactDto.firstName(),
                            contactDto.lastName(),
                            contactDto.phoneNumber(),
                            contactDto.email()));
            log.info("New contact is created!");

            if (newContact.isPresent()) {
                return HttpResponse.created(newContact.get());
            }
        }
        return HttpResponse.badRequest();
    }

    //Update existing Contact
    @Operation(summary = "Update contact", description = "Update contact's data")
    @ApiResponse(content = @Content(mediaType = "text/plain", schema = @Schema(type = "string")))
    @ApiResponse(responseCode = "200", description = "Update OK")
    @ApiResponse(responseCode = "400", description = "Invalid contact's data")
    @ApiResponse(responseCode = "401", description = "Unauthorized")
    @ApiResponse(responseCode = "404", description = "Contact not found")

    @Put(uri = "/update", produces = "text/plain")
    public HttpResponse<Void> updateContact(@Body final ContactDto contactDto) {
        //Check if contact exist in the DB
        Optional<ContactDto> searchForContact = contactService.getContactById(contactDto.id());
        if (searchForContact.isPresent()) {
            //Validate record's data
            if (validateContact(contactDto)) {
                //Update the Contact
                contactService.updateContact(contactDto);

                log.info("Contact updated: ID = {}", contactDto.id());
                return HttpResponse.ok();
            } else {
                return HttpResponse.badRequest();
            }
            //return HttpResponse.noContent().header(HttpHeaders.LOCATION, "FAFA");
        }
        return HttpResponse.notFound();
    }

    //Delete existing Contact
    @Operation(summary = "Delete contact", description = "Delete a existing contact")
    @ApiResponse(responseCode = "200", description = "Contact deleted")
    @ApiResponse(responseCode = "401", description = "Unauthorized")
    @ApiResponse(responseCode = "404", description = "Contact not found")

    @Delete(uri = "/delete/{id}")
    public HttpResponse<Void> deleteContact(final Long id) {
        //Check if contact exist in the DB
        Optional<ContactDto> searchForContact = contactService.getContactById(id);
        if (searchForContact.isPresent()) {
            //Delete the Contact
            contactService.deleteContact(searchForContact.get());
            log.info("Contact deleted: ID = {}", id);
            return HttpResponse.ok();
        }
        log.info("Contact not found: ID = {}", id);
        return HttpResponse.notFound();
    }

    //Validate user's data
    private boolean validateContact(ContactDto contactDto) {
        final String name = "^[0-9A-Za-z]{3,50}$",
                phone = "^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\\s\\./0-9]*$",
                email = "^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,150})$";

        Pattern pName, pPhone, pEmail;
        Matcher mFirstName, mLastName, mPhone, mEmail;
        boolean result = false;

        pName = Pattern.compile(name, Pattern.CASE_INSENSITIVE);
        mFirstName = pName.matcher(contactDto.firstName());
        mLastName = pName.matcher(contactDto.lastName());

        pPhone = Pattern.compile(phone, Pattern.CASE_INSENSITIVE);
        mPhone = pPhone.matcher(contactDto.phoneNumber());

        pEmail = Pattern.compile(email, Pattern.CASE_INSENSITIVE);
        mEmail = pEmail.matcher(contactDto.email());

        if (mFirstName.matches() && mLastName.matches() && mPhone.matches() && mEmail.matches()) {
            log.info("Validation OK!");
            result = true;
        }
        log.error("Validation failed!");
        return result;
    }

}
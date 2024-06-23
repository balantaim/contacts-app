package com.contacts.controller;

import com.contacts.entity.Contact;
import com.contacts.dto.ContactRepository;
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
@Tag(name = "Contact Controller CRUD")
@Controller("/")
public class ContactController {

    //Entry point for Swagger: http://localhost:5000/swagger-ui

    //Use jakarta @Inject for dependency injection (field should not be final)
    @Inject
    private ContactRepository repository;

    //Get all Contacts and filter it by 'filter' if is given
    @Operation(summary = "Get all contacts", description = "Get all Contacts and filter it by 'filter' if is given")
    @ApiResponse(responseCode = "200", description = "OK")
    @ApiResponse(responseCode = "401", description = "Unauthorized")

    @Get(uri="/")
    public List<Contact> getAllContacts(@Nullable @QueryValue final String filter) {
        List<Contact> data = null;
        if(filter == null){
            //Get all contacts
            data = repository.findAll();
        }else{
            //Get all contacts and Search the date for keywords
            data = repository.findAll()
                    .stream()
                    .filter(n ->
                            n.getFirstName().toLowerCase().contains(filter.toLowerCase()) ||
                                    n.getLastName().toLowerCase().contains(filter.toLowerCase()) ||
                                    n.getPhoneNumber().toLowerCase().contains(filter.toLowerCase()) ||
                                    n.getEmail().toLowerCase().contains(filter.toLowerCase()))
                    .collect(Collectors.toList());
        }
        //Get some information for debugging
        StringBuilder output = new StringBuilder();
        if(data != null){
            for(Contact c: data){
                output.append(c).append(";\n");
            }
        }else{
            log.info("There are no contacts!");
        }
        log.info(output.toString());
        return data;
    }

    //Find contact by ID
    @Operation(summary = "Get contact by ID", description = "Provide contact data")
    @ApiResponse(responseCode = "200", description = "OK")
    @ApiResponse(responseCode = "401", description = "Unauthorized")
    @ApiResponse(responseCode = "404", description = "Contact not found")

    @Get("/find/{id}")
    public HttpResponse<Contact> findById(@PathVariable final Long id) {
        return repository.findById(id)
                .map(HttpResponse::ok)
                .orElseGet(HttpResponse::notFound);
    }

    //Add a new Contact
    @Operation(summary = "Add a new Contact", description = "Create new contact")
    @ApiResponse(responseCode = "201", description = "New contact created")
    @ApiResponse(responseCode = "400", description = "Invalid Contact's data")
    @ApiResponse(responseCode = "401", description = "Unauthorized")

    @Post(uri="/add")
    public HttpResponse<Contact> addContact(@Body Contact contact) {
        //Set ID to 0 to force creation of new Contact
        contact.setId(0L);

        //Validate record's data
        boolean validity = validateContact(contact);
        if(validity){
            //Save the contact to the DB
            repository.save(contact);
            log.info("New contact is created!");

            return HttpResponse.created(contact);
        }
        return HttpResponse.badRequest();
    }

    //Update existing Contact
    @Operation(summary = "Update contact", description = "Update contact's data")
    @ApiResponse(content = @Content(mediaType = "text/plain", schema = @Schema(type="string")))
    @ApiResponse(responseCode = "200", description = "Update OK")
    @ApiResponse(responseCode = "400", description = "Invalid contact's data")
    @ApiResponse(responseCode = "401", description = "Unauthorized")
    @ApiResponse(responseCode = "404", description = "Contact not found")

    @Put(uri="/update", produces="text/plain")
    public HttpResponse updateContact(@Body final Contact contact){
        //Check if contact exist in the DB
        Optional<Contact> searchForContact = repository.findById(contact.getId());
        if(searchForContact.isPresent()){
            //Validate record's data
            boolean validity = validateContact(contact);
            if(validity){
                //Update the Contact
                repository.update(contact);

                log.info("Contact updated: ID = " + contact.getId());
                return HttpResponse.ok();
            }else{
                return HttpResponse.badRequest();
            }
            //return HttpResponse.noContent().header(HttpHeaders.LOCATION, "FAFA");
        }
        return HttpResponse.notFound(contact.getId());
    }

    //Delete existing Contact
    //@Delete(uri="/delete/{id}", produces="text/plain")
    @Operation(summary = "Delete contact", description = "Delete a existing contact")
    @ApiResponse(responseCode = "200", description = "Contact deleted")
    @ApiResponse(responseCode = "401", description = "Unauthorized")
    @ApiResponse(responseCode = "404", description = "Contact not found")

    @Delete(uri="/delete/{id}")
    public HttpResponse deleteContact(final Long id){
        //Check if contact exist in the DB
        Optional<Contact> searchForContact = repository.findById(id);
        if(searchForContact.isPresent()){
            //Delete the Contact
            repository.delete(searchForContact.get());

            log.info("Contact deleted: ID = " + id);
            return HttpResponse.ok();
        }
        log.info("Contact not found: ID = " + id);
        return HttpResponse.notFound();
    }

    //Validate user's data
    private boolean validateContact(final Contact contact){
        final String name = "^[0-9A-Za-z]{3,50}$",
                phone = "^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\\s\\./0-9]*$",
                email = "^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,150})$";

        Pattern pName, pPhone, pEmail = null;
        Matcher mFirstName, mLastName, mPhone, mEmail = null;
        boolean result = false;

        pName = Pattern.compile(name, Pattern.CASE_INSENSITIVE);
        mFirstName = pName.matcher(contact.getFirstName());
        mLastName= pName.matcher(contact.getLastName());

        pPhone = Pattern.compile(phone, Pattern.CASE_INSENSITIVE);
        mPhone = pPhone.matcher(contact.getPhoneNumber());

        pEmail = Pattern.compile(email, Pattern.CASE_INSENSITIVE);
        mEmail = pEmail.matcher(contact.getEmail());

        if(mFirstName.matches() && mLastName.matches() && mPhone.matches() && mEmail.matches()){
            log.info("Validation OK!");
            result = true;
        }
        log.error("Validation failed!");
        return result;
    }


}
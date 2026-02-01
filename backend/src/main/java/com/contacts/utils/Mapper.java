package com.contacts.utils;

import com.contacts.dto.ContactDto;
import com.contacts.entity.Contact;
import jakarta.inject.Singleton;

@Singleton
public class Mapper {

    public ContactDto contactToDto(Contact contact) {
        return new ContactDto(contact.getId(),
                contact.getFirstName(),
                contact.getLastName(),
                contact.getPhoneNumber(),
                contact.getEmail());
    }

    public Contact dtoToContact(ContactDto contactDto) {
        return new Contact(contactDto.id(),
                contactDto.firstName(),
                contactDto.lastName(),
                contactDto.phoneNumber(),
                contactDto.email());
    }

}

package com.contacts.service;

import com.contacts.dto.ContactDto;

import java.util.List;
import java.util.Optional;

public interface ContactService {

    Optional<ContactDto> getContactById(Long id);

    Optional<ContactDto> getContactByEmail(String email);

    Optional<ContactDto> createContact(ContactDto contactDto);

    List<ContactDto> getAllContacts();

    Optional<ContactDto> updateContact(ContactDto contactDto);

    void deleteContact(ContactDto contactDto);

}

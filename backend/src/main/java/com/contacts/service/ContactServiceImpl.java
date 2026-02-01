package com.contacts.service;

import com.contacts.dto.ContactDto;
import com.contacts.entity.Contact;
import com.contacts.repository.ContactRepository;
import com.contacts.utils.Mapper;
import io.micronaut.transaction.annotation.Transactional;
import jakarta.inject.Inject;
import jakarta.inject.Singleton;
import jakarta.persistence.EntityExistsException;
import jakarta.persistence.EntityNotFoundException;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

//Scope singleton
@Singleton
public class ContactServiceImpl implements ContactService {

    @Inject
    private ContactRepository repository;

    @Inject
    private Mapper mapper;

    @Override
    public Optional<ContactDto> getContactById(Long id) {
        return repository.findById(id).map(mapper::contactToDto);
    }

    @Override
    public Optional<ContactDto> getContactByEmail(String email) {
        return repository.findByEmail(email).map(mapper::contactToDto);
    }

    @Transactional
    @Override
    public Optional<ContactDto> createContact(ContactDto contactDto) {
        if (repository.findByEmail(contactDto.email()).isPresent()) {
            throw new EntityExistsException("Contact already exist");
        }
        Optional<Contact> contact = Optional.ofNullable(repository.save(mapper.dtoToContact(contactDto)));
        return contact.map(mapper::contactToDto);
    }

    @Override
    public List<ContactDto> getAllContacts() {
        return repository.findAll()
                .stream()
                .map(mapper::contactToDto)
                .collect(Collectors.toList());
    }

    @Transactional
    @Override
    public Optional<ContactDto> updateContact(ContactDto contactDto) {
        Contact existing = repository.findById(contactDto.id())
                .orElseThrow(() -> new EntityNotFoundException("Contact not found"));

        existing.setEmail(contactDto.email());
        existing.setFirstName(contactDto.firstName());
        existing.setLastName(contactDto.lastName());

        Contact updated = repository.update(existing);
        return Optional.ofNullable(mapper.contactToDto(updated));

    }

    @Override
    public void deleteContact(ContactDto contactDto) {
        repository.findById(contactDto.id())
                .orElseThrow(() -> new EntityNotFoundException("Contact not found"));
        repository.delete(mapper.dtoToContact(contactDto));
    }

}

package com.contacts.dto;

import com.contacts.entity.Contact;
import io.micronaut.data.jdbc.annotation.JdbcRepository;
import io.micronaut.data.model.query.builder.sql.Dialect;
import io.micronaut.data.repository.CrudRepository;

import java.util.Optional;


@JdbcRepository(dialect = Dialect.POSTGRES)
public interface ContactRepository extends CrudRepository <Contact, Long> {

    Optional<Contact> findById(Long id);

}

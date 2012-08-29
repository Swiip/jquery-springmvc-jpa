package com.developpez.skillbrowser.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.repository.annotation.RestResource;

import com.developpez.skillbrowser.model.User;

/**
 * Interface for the Data Access Object for the User model. It extends JpaRepository which is part of Spring Data JPA and declares all the commons
 * methods.
 * <link>http://static.springsource.org/spring-data/data-jpa/docs/current/reference/html/#repositories.custom-behaviour-for-all-repositories</link> <br>
 * This interface aims to be automatically implemented by Spring Data JPA:
 * <link>http://static.springsource.org/spring-data/data-jpa/docs/current/reference/html/#repositories.create-instances</link>
 */
@RestResource(exported = true, path = "user")
public interface UserRepository extends JpaRepository<User, Integer> {
    
    /**
     * This query will be automatically implemented by it's name, "findBy" is the key work and "Login" is parsed as the criteria. By parsing the
     * parameters declared, the login match the "Login" from "findBy".
     * 
     * @param login
     *            instance to be the value of the criteria
     * @return a single user matching the login
     */
    User findByLogin(String login);

}

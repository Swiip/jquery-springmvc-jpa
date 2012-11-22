package com.developpez.skillbrowser.repository;

import com.developpez.skillbrowser.model.Skill;
import com.developpez.skillbrowser.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.repository.annotation.RestResource;

/**
 * Interface for the Data Access Object for the Skill model. It extends JpaRepository which is part of Spring Data JPA and declares all the commons
 * methods.
 * <link>http://static.springsource.org/spring-data/data-jpa/docs/current/reference/html/#repositories.custom-behaviour-for-all-repositories</link> <br>
 * This interface aims to be automatically implemented by Spring Data JPA:
 * <link>http://static.springsource.org/spring-data/data-jpa/docs/current/reference/html/#repositories.create-instances</link>
 */
@RestResource(path = "skill")
public interface SkillRepository extends JpaRepository<Skill, Integer> {

  /**
   * This query will be automatically implemented by it's name, "findBy" is the key work and "User" is parsed as the criteria. By parsing the
   * parameters declared, the user match the "User" from "findBy" and the Pageable trigger the automatic pagination support.
   *
   * @param user     instance to be the value of the criteria
   * @param pageable page parameters for pagination
   * @return a page of skill matching the page parameters and the user
   */
  Page<Skill> findByUsers(User user, Pageable pageable);

}

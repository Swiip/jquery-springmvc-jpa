package com.developpez.skillbrowser.model;

import org.codehaus.jackson.annotate.JsonIgnore;
import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.map.annotate.JsonSerialize;
import org.codehaus.jackson.map.annotate.JsonSerialize.Inclusion;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

/**
 * Skill model.<br/>
 * "@Entity" declare the class as an JPA 2 managed bean.<br/>
 * "@JsonIgnoreProperties(ignoreUnknown = true)" is a special JSON marshaling option which able to map JSON data to a Skill even if all parameters are
 * set.<br/>
 * "@JsonSerialize(include = Inclusion.NON_NULL)" indicates to JSON marshaler (Jackson) to ignore null parameters
 */
@Entity
@JsonIgnoreProperties(ignoreUnknown = true)
@JsonSerialize(include = Inclusion.NON_NULL)
public class Skill {

  /**
   * Unique id for the Skill. "@Id" declare the parameter as the primary key "@GeneratedValue" indicates JPA 2 (and behind Hibernate) which strategy
   * to use for creating a new value. "GenerationType.AUTO" value allow JPA implementation to use the better way depending to the RDBMS used.
   */
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Integer id;

  /**
   * Name of the skill. No annotation here, the parameter will be automatically mapped in the table.
   */
  private String name;

  /**
   * Users which has the skill. It's managed as a many to many relationship with User entity. The "@ManyToMany" will trigger creation of a join
   * table which there is no need to map. Annotation parameters allow to specified join behavior: no cascades and lazy fetching (skill list will be
   * requested only when called) and mapped parameter in the user which has to be setted at least in one side.
   */
  @ManyToMany(cascade = {}, fetch = FetchType.LAZY, mappedBy = "skills")
  private Set<User> users = new HashSet<User>(0);

  /**
   * Get id
   *
   * @return id
   */
  public Integer getId() {
    return id;
  }

  /**
   * Set id
   *
   * @param id
   */
  public void setId(Integer id) {
    this.id = id;
  }

  /**
   * Get name
   *
   * @return name
   */
  public String getName() {
    return name;
  }

  /**
   * Set name
   *
   * @param name
   */
  public void setName(String name) {
    this.name = name;
  }

  /**
   * Get users "@JsonIgnore" will remove users list when performing the JSON serialization first because it is not needed but mostly because it's
   * break infinite loop in serialization: User.skills > Skill.users > User.skills...<br/>
   * There is a nice solution manage such loop in Jackson: "The bi-directional references" but here we just don't need it because we don't need the
   * way back of this join in client side.
   *
   * @return users
   */
  @JsonIgnore
  public Set<User> getUsers() {
    return users;
  }

  /**
   * Set users
   *
   * @param users
   */
  public void setUsers(Set<User> users) {
    this.users = users;
  }

}

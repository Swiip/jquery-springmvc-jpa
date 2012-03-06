package com.developpez.skillbrowser.controller;

import javax.servlet.ServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.developpez.skillbrowser.model.User;
import com.developpez.skillbrowser.service.UserService;

/**
 * Spring MVC controller for the user entity.<br/>
 * "@Controller" the Spring MVC controller nature<br/>
 * "@RequestMapping("/user")" map the request mapping of all the methods under "/user"
 */
@Controller
@RequestMapping("/user")
public class UserController {

    /**
     * Autowiring the service implementation needed to do the job
     */
    @Autowired
    private UserService userService;

    /**
     * Request a page of users. RequestMapping is done on the HTTP method GET.
     * 
     * @param pageable
     *            parsed form HTTP GET parameters by the Spring Data JPA PageableArgumentResolver
     * @return page of users serialized in JSON because of "@ResponseBody" which triggered serialization, presence of Jackson library in classpath
     *         which allow JSON serialization and request header which ask for JSON.
     */
    @RequestMapping(method = RequestMethod.GET)
    public @ResponseBody
    Page<User> get(Pageable pageable) {
        return userService.getAll(pageable);
    }

    /**
     * Create or update a user. RequestMapping is done on the HTTP method PUT. Difference between creation or update will be on the presence of id
     * field which will be automatically set by the JSON deserialization.
     * 
     * @param response
     *            ServletResponse parameter is only there to tell Spring MVC to use no view, only what will be written in response output.
     * @param user
     *            With "@RequestBody" annotation, this parameter will contains the deserialized data of the body mapped in a User object. The JSON
     *            nature is determine by the request content type and Jackson is chosen because it's the only JSON parser in the classpath.
     */
    @RequestMapping(method = RequestMethod.PUT)
    public void put(ServletResponse response, @RequestBody User user) {
        userService.save(user);
    }

    /**
     * Delete a user. RequestMapping is done on the HTTP method DELETE.
     * 
     * @param response
     *            ServletResponse parameter is only there to tell Spring MVC to use no view, only what will be written in response output.
     * @param user
     *            With "@RequestBody" annotation, this parameter will contains the deserialized data of the body mapped in a User object. The JSON
     *            nature is determine by the request content type and Jackson is chosen because it's the only JSON parser in the classpath.<br/>
     *            Little trick to notice here, the only parameter defined in the JSON request will be the id but as we annotate the User class with
     *            "@JsonIgnoreProperties(ignoreUnknown = true)", Jackson will not fail to map this only field in an empty User object which will be
     *            enough to call the delete method.
     */
    @RequestMapping(method = RequestMethod.DELETE)
    public void delete(ServletResponse response, @RequestBody User user) {
        userService.delete(user);
    }

}

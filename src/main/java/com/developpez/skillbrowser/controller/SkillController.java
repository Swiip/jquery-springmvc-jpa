package com.developpez.skillbrowser.controller;

import java.util.List;

import javax.servlet.ServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.developpez.skillbrowser.model.Skill;
import com.developpez.skillbrowser.service.SkillService;

/**
 * Spring MVC controller for the skill entity.<br/>
 * "@Controller" the Spring MVC controller nature<br/>
 * "@RequestMapping("/skill")" map the request mapping of all the methods under "/skill"
 */
@Controller
@RequestMapping("/skill")
public class SkillController {

    /**
     * Autowiring the service implementation needed to do the job
     */
    @Autowired
    private SkillService skillService;

    /**
     * Request for all skills. RequestMapping is done on both "/all" and the HTTP method GET.
     * 
     * @return list of users serialized in JSON because of "@ResponseBody" which triggered serialization, presence of Jackson library in classpath
     *         which allow JSON serialization and request header which ask for JSON.
     */
    @RequestMapping(value = "/all", method = RequestMethod.GET)
    public @ResponseBody
    List<Skill> get() {
        return skillService.getAll();
    }

    /**
     * Request a page of skills. RequestMapping is done on the HTTP method GET.
     * 
     * @param pageable
     *            parsed form HTTP GET parameters by the Spring Data JPA PageableArgumentResolver
     * @return page of users serialized in JSON because of "@ResponseBody" which triggered serialization, presence of Jackson library in classpath
     *         which allow JSON serialization and request header which ask for JSON.
     */
    @RequestMapping(method = RequestMethod.GET)
    public @ResponseBody
    Page<Skill> get(Pageable pageable) {
        return skillService.getAll(pageable);
    }

    /**
     * Create or update a skill. RequestMapping is done on the HTTP method PUT. Difference between creation or update will be on the presence of id
     * field which will be automatically set by the JSON deserialization.
     * 
     * @param response
     *            ServletResponse parameter is only there to tell Spring MVC to use no view, only what will be written in response output.
     * @param user
     *            With "@RequestBody" annotation, this parameter will contains the deserialized data of the body mapped in a User object. The JSON
     *            nature is determine by the request content type and Jackson is chosen because it's the only JSON parser in the classpath.
     */
    @RequestMapping(method = RequestMethod.PUT)
    public void put(ServletResponse response, @RequestBody Skill skill) {
        skillService.save(skill);
    }

    /**
     * Delete a skill. RequestMapping is done on the HTTP method DELETE.
     * 
     * @param response
     *            ServletResponse parameter is only there to tell Spring MVC to use no view, only what will be written in response output.
     * @param user
     *            With "@RequestBody" annotation, this parameter will contains the deserialized data of the body mapped in a Skill object. The JSON
     *            nature is determine by the request content type and Jackson is chosen because it's the only JSON parser in the classpath.<br/>
     *            Little trick to notice here, the only parameter defined in the JSON request will be the id but as we annotate the Skill class with
     *            "@JsonIgnoreProperties(ignoreUnknown = true)", Jackson will not fail to map this only field in an empty Skill object which will be
     *            enough to call the delete method.
     */
    @RequestMapping(method = RequestMethod.DELETE)
    public void delete(ServletResponse response, @RequestBody Skill skill) {
        skillService.delete(skill);
    }

}

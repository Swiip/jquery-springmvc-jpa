package com.developpez.skillbrowser.controller;

import java.io.IOException;

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

@Controller
@RequestMapping("/skill")
public class SkillController {

    @Autowired
    private SkillService skillService;

    @RequestMapping(method = RequestMethod.GET)
    public @ResponseBody
    Page<Skill> get(Pageable pageable) {
        return skillService.getAll(pageable);
    }

    @RequestMapping(method = RequestMethod.PUT)
    public void put(ServletResponse response, @RequestBody Skill skill) {
        skillService.save(skill);
    }

    @RequestMapping(method = RequestMethod.DELETE)
    public void delete(ServletResponse response, @RequestBody Skill skill) {
        skillService.delete(skill);
    }
    
    @RequestMapping("/options")
    public void options(ServletResponse response) throws IOException {
        response.getWriter().write("<select>");
        for (Skill skill : skillService.getAll()) {
            response.getWriter().write("<option value='" + skill.getId() + "'>" + skill.getName() + "</option>");
        }
        response.getWriter().write("</select>");
    }

}

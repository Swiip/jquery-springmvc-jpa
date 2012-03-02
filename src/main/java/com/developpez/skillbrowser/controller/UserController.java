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

@Controller
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;

    @RequestMapping(method = RequestMethod.GET)
    public @ResponseBody
    Page<User> get(Pageable pageable) {
        return userService.getAll(pageable);
    }

    @RequestMapping(method = RequestMethod.PUT)
    public void put(ServletResponse response, @RequestBody User user) {
        userService.save(user);
    }
    
    @RequestMapping(method = RequestMethod.DELETE)
    public void delete(ServletResponse response, @RequestBody User user) {
        userService.delete(user);
    }

}

package com.developpez.skillbrowser.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.developpez.skillbrowser.model.User;
import com.developpez.skillbrowser.model.dto.PageRequest;
import com.developpez.skillbrowser.model.dto.PageResponse;
import com.developpez.skillbrowser.service.UserService;

@Controller
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;
    
    @RequestMapping(value = "/")
    public @ResponseBody
    PageResponse admin(@RequestBody PageRequest jqGridPageRequest) {
        Sort sort = new Sort(Direction.fromString(jqGridPageRequest.getSord().toUpperCase()), jqGridPageRequest.getSidx());
        Pageable pageable = new org.springframework.data.domain.PageRequest(jqGridPageRequest.getPage() - 1, jqGridPageRequest.getRows(), sort);
        
        Page<User> users = userService.getAll(pageable);
        
        PageResponse jqGridPage = new PageResponse();
        jqGridPage.setTotal(users.getTotalPages());
        jqGridPage.setPage(users.getNumber() + 1);
        jqGridPage.setRecords(users.getTotalElements());
        jqGridPage.setRows(users.getContent());
        return jqGridPage;
    }

}

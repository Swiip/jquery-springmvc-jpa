package com.developpez.skillbrowser.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.developpez.skillbrowser.model.User;

public interface UserService {
    
    Page<User> getAll(Pageable pageable);

}

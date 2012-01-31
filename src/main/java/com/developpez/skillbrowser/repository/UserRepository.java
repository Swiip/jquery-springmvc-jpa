package com.developpez.skillbrowser.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.developpez.skillbrowser.model.User;

public interface UserRepository extends JpaRepository<User, Long> {
    
    User findByLogin(String login);

}

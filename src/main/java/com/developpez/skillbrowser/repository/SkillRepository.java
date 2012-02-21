package com.developpez.skillbrowser.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.developpez.skillbrowser.model.Skill;
import com.developpez.skillbrowser.model.User;

public interface SkillRepository extends JpaRepository<Skill, Integer> {

    Page<Skill> findByUsers(User user, Pageable pageable);
    
}

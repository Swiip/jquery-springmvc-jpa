package com.developpez.skillbrowser.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.developpez.skillbrowser.model.Skill;
import com.developpez.skillbrowser.model.User;

public interface SkillService {
    
    List<Skill> getAll();
    
    Page<Skill> getAll(Pageable pageable);
    
    Page<Skill> getByUser(User user, Pageable pageable);
    
    Skill get(Integer id);
    
    void save(Skill skill);
    
    void delete(Skill skill);
    
}

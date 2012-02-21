package com.developpez.skillbrowser.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.developpez.skillbrowser.model.Skill;
import com.developpez.skillbrowser.model.User;
import com.developpez.skillbrowser.repository.SkillRepository;
import com.developpez.skillbrowser.service.SkillService;

@Service
@Transactional
public class SkillServiceImpl implements SkillService {

    @Autowired
    private SkillRepository skillRepository;

    public List<Skill> getAll() {
        return skillRepository.findAll();
    }
    
    public Page<Skill> getAll(Pageable pageable) {
        return skillRepository.findAll(pageable);
    }
    
    public Page<Skill> getByUser(User user, Pageable pageable) {
        return skillRepository.findByUsers(user, pageable);
    }
    
    public Skill get(Integer id) {
        return skillRepository.findOne(id);
    }
    
    public void save(Skill skill) {
        skillRepository.save(skill);
    }
    
    public void delete(Skill skill) {
        skillRepository.delete(skill);
    }

}

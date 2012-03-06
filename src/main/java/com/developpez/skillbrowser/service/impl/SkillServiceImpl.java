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

/**
 * Service implementation for the Skill entity. Use the SkillRepository to give standard service about the Skill entity. <br/>
 * "@Service" trigger the Spring bean nature.<br/>
 * "@Transactionnal" trigger the transactionnal nature of all bean methods
 * 
 * @see com.developpez.skillbrowser.service.SkillService
 */
@Service
@Transactional
public class SkillServiceImpl implements SkillService {

    /**
     * Autowiring the repository implementation needed to do the job
     */
    @Autowired
    private SkillRepository skillRepository;

    /**
     * @see com.developpez.skillbrowser.service.SkillService#getAll()
     */
    public List<Skill> getAll() {
        return skillRepository.findAll();
    }

    /**
     * @see com.developpez.skillbrowser.service.SkillService#getAll(org.springframework.data.domain.Pageable)
     */
    public Page<Skill> getAll(Pageable pageable) {
        return skillRepository.findAll(pageable);
    }

    /**
     * @see com.developpez.skillbrowser.service.SkillService#getByUser(com.developpez.skillbrowser.model.User,
     *      org.springframework.data.domain.Pageable)
     */
    public Page<Skill> getByUser(User user, Pageable pageable) {
        return skillRepository.findByUsers(user, pageable);
    }

    /**
     * @see com.developpez.skillbrowser.service.SkillService#get(java.lang.Integer)
     */
    public Skill get(Integer id) {
        return skillRepository.findOne(id);
    }

    /**
     * @see com.developpez.skillbrowser.service.SkillService#save(com.developpez.skillbrowser.model.Skill)
     */
    public void save(Skill skill) {
        skillRepository.save(skill);
    }

    /**
     * @see com.developpez.skillbrowser.service.SkillService#delete(com.developpez.skillbrowser.model.Skill)
     */
    public void delete(Skill skill) {
        skillRepository.delete(skill);
    }

}

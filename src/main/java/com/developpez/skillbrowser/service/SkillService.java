package com.developpez.skillbrowser.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.developpez.skillbrowser.model.Skill;
import com.developpez.skillbrowser.model.User;

/**
 * Interface of the service layer for the Skill entity. This interface offers little business but still exist to maintain the layer model.
 */
public interface SkillService {

    /**
     * Get all skills
     * 
     * @return all skills from data base
     */
    List<Skill> getAll();

    /**
     * Get a page of skills
     * 
     * @param pageable
     *            page parameters
     * @return page of skills
     */
    Page<Skill> getAll(Pageable pageable);

    /**
     * Get a page of skills of a user
     * 
     * @param user
     *            user to get the skills of
     * @param pageable
     *            page parameters
     * @return page of user's skills
     */
    Page<Skill> getByUser(User user, Pageable pageable);

    /**
     * Get a skill by its id
     * 
     * @param id
     *            of the skill requested
     * @return the skill
     */
    Skill get(Integer id);

    /**
     * Save (create or update) skill in data base
     * 
     * @param skill
     *            to save
     */
    void save(Skill skill);

    /**
     * Delete skill in data base
     * 
     * @param skill
     *            to delete
     */
    void delete(Skill skill);

}

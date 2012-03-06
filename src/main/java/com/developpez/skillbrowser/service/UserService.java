package com.developpez.skillbrowser.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.developpez.skillbrowser.model.User;

/**
 * Interface of the service layer for the User entity. This interface offers little business but still exist to maintain the layer model.
 */
public interface UserService {
    
    /**
     * Get a page of users
     * 
     * @param pageable
     *            page parameters
     * @return page of users
     */
    Page<User> getAll(Pageable pageable);
    
    /**
     * Get a user by its id
     * 
     * @param id
     *            of the user requested
     * @return the user
     */
    User get(Integer id);
    
    /**
     * Save (create or update) user in data base
     * 
     * @param user
     *            to save
     */
    void save(User user);
    
    /**
     * Delete user in data base
     * 
     * @param user
     *            to delete
     */
    void delete(User user);

}

package com.developpez.skillbrowser.service.impl;

import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.developpez.skillbrowser.model.User;
import com.developpez.skillbrowser.repository.UserRepository;
import com.developpez.skillbrowser.service.UserService;

@Service
@Transactional
public class UserServiceImpl implements UserService, UserDetailsService, InitializingBean {

    @Autowired
    private UserRepository userRepository;

    public Page<User> getAll(Pageable pageable) {
        return userRepository.findAll(pageable);
    }
    
    public User get(Integer id) {
        return userRepository.findOne(id);
    }
    
    public void save(User user) {
        userRepository.save(user);
    }
    
    public void delete(User user) {
        userRepository.delete(user);
    }
    
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByLogin(username);
        if (user == null) {
            throw new UsernameNotFoundException(username + " n'existe pas");
        } else {
            return user;
        }
    }

    public void afterPropertiesSet() throws Exception {
        if(userRepository.count() == 0) {
            User user = new User();
            user.setFullname("admin");
            user.setLogin("admin");
            user.setPassword("admin");
            userRepository.save(user);
        }
    }

}

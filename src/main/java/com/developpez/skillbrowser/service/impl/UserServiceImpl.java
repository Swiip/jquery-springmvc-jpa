package com.developpez.skillbrowser.service.impl;

import com.developpez.skillbrowser.model.Skill;
import com.developpez.skillbrowser.model.User;
import com.developpez.skillbrowser.repository.SkillRepository;
import com.developpez.skillbrowser.repository.UserRepository;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;

/**
 * Service implementation for the User entity. Use the UserRepository to give standard service about the Skill entity. <br/>
 * "@Service" trigger the Spring bean nature.<br/>
 * "@Transactionnal" trigger the transactionnal nature of all bean methods.<br/>
 * Implements not only the application's UserService but also:<br/>
 * UserDetailsService: to use the service as Spring Security authentication provider.<br/>
 * InitializingBean: to have a callback after Spring loading in order to insert the first user in db if there is none.
 *
 * @see org.springframework.security.core.userdetails.UserDetailsService
 * @see org.springframework.beans.factory.InitializingBean
 */
@Service
// @Transactional
public class UserServiceImpl implements UserDetailsService, InitializingBean {

    /**
     * Autowiring the repository implementation needed to do the job
     */
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private SkillRepository skillRepository;

    /**
     * This is the main (and only) method to implement to be a Spring Security authentication provider. It needs only to return the user corresponding
     * to the login in parameter or launch an exception if not exist. The password checking is fully managed by handling the UserDetails returned.<br/>
     * As the password checking is not our work, the password encoding can be configured in Spring Security. It's not done yet but it can be an
     * evolution of this tutorial.
     */
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByLogin(username);
        if (user == null) {
            throw new UsernameNotFoundException(username + " n'existe pas");
        } else {
            return user;
        }
    }

    /**
     * By implementing InitializingBean in a Spring bean, this method will be launch after Spring wirings are finished.<br/>
     * It's used here to perform a check at the loading of the application on the content of the user table a adding the first user if it's empty. This
     * way, there is no need of SQL initialization script which is so boring to handle (and even more on CloudFoundry)
     */
    public void afterPropertiesSet() throws Exception {
        System.out.println("kikoo");

        Skill skill1 = new Skill();
        skill1.setName("toto 1");
        skillRepository.save(skill1);
        Skill skill2 = new Skill();
        skill2.setName("toto 2");
        skillRepository.save(skill2);
        Skill skill3 = new Skill();
        skill3.setName("toto 3");
        skillRepository.save(skill3);

        Set<Skill> skills = new HashSet<Skill>(Arrays.asList(new Skill[]{skill1, skill2, skill3}));

        if (userRepository.count() == 0) {
            User user = new User();
            user.setFullname("admin");
            user.setLogin("admin");
            user.setPassword("admin");
            user.setSkills(skills);
            userRepository.save(user);
            for (int i = 0; i < 26; i++) {
                user = new User();
                user.setFullname("full name " + i);
                user.setLogin("login " + i);
                user.setPassword("password" + i);
                user.setSkills(skills);
                userRepository.save(user);
            }
        }
    }

}

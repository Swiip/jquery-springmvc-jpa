package com.developpez.skillbrowser.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.developpez.skillbrowser.model.Skill;

public interface SkillRepository extends JpaRepository<Skill, Long> {

}

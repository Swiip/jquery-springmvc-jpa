package com.developpez.skillbrowser;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.FilterType;
import org.springframework.stereotype.Controller;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

/**
 * This class replace the main Spring MVC XML configuration file.
 * "@Configuration" is the main annotation which trigger the class as a Spring configuration
 * "@EnableWebMvc" trigger annotated request mapping in Spring beans
 * "@ComponentScan" trigger Spring scanner to detect annotated beans in the project (filter limit on controllers)
 */
@EnableWebMvc
@Configuration
@ComponentScan(basePackageClasses = WebApplicationConfig.class, includeFilters = {@ComponentScan.Filter(type = FilterType.ANNOTATION, value = Controller.class)})
public class WebApplicationConfig {

}

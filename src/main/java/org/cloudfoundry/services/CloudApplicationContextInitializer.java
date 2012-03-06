package org.cloudfoundry.services;

import org.cloudfoundry.runtime.env.CloudEnvironment;
import org.springframework.context.ApplicationContextInitializer;
import org.springframework.context.ConfigurableApplicationContext;

/**
 * This class has been copied from
 * <link>https://github.com/SpringSource/cloudfoundry-samples/blob/master/hello-spring/src/main/java/org/cloudfoundry/services/CloudApplicationContextInitializer.java</link>
 * It implements ApplicationContextInitializer<ConfigurableApplicationContext> which is the Spring tool to launch task at startup.
 */
public class CloudApplicationContextInitializer implements ApplicationContextInitializer<ConfigurableApplicationContext> {

    /**
     * The task simply initialize a CloudFoundry's CloudEnvironment which will detect if the application run on CloudFoundry or not and put the
     * environment variable for Spring 3.1 profile management.
     */
    public void initialize(ConfigurableApplicationContext applicationContext) {
        CloudEnvironment env = new CloudEnvironment();
        if (env.getInstanceInfo() != null) {
            applicationContext.getEnvironment().setActiveProfiles("cloud");
        } else {
            applicationContext.getEnvironment().setActiveProfiles("default");
        }
    }

}
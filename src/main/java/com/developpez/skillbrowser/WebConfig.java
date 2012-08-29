package com.developpez.skillbrowser;

import javax.servlet.ServletContext;
import javax.servlet.ServletRegistration;

import org.springframework.data.rest.webmvc.RepositoryRestExporterServlet;
import org.springframework.web.WebApplicationInitializer;
import org.springframework.web.context.ContextLoaderListener;
import org.springframework.web.context.support.AnnotationConfigWebApplicationContext;
import org.springframework.web.servlet.DispatcherServlet;

public class WebConfig implements WebApplicationInitializer {

  @Override
  public void onStartup(ServletContext container) {
    // XmlWebApplicationContext appContext = new XmlWebApplicationContext();
    // appContext.setConfigLocation("classpath*:META-INF/applicationContext*.xml");

    // Create the 'root' Spring application context
    AnnotationConfigWebApplicationContext applicationContext = new AnnotationConfigWebApplicationContext();
    applicationContext.register(ApplicationConfig.class);

    // Manage the lifecycle of the root application context
    container.addListener(new ContextLoaderListener(applicationContext));

    // Register and map the dispatcher servlet
    // DispatcherServlet servlet = new RepositoryRestExporterServlet();
    // ServletRegistration.Dynamic dispatcher = container.addServlet("dispatcher", servlet);
    // dispatcher.setLoadOnStartup(1);
    // dispatcher.addMapping("/");

    DispatcherServlet servlet = new RepositoryRestExporterServlet();
    ServletRegistration.Dynamic exporter = container.addServlet("exporter", servlet);
    exporter.setLoadOnStartup(1);
    exporter.addMapping("/data-rest/*");
  }

}

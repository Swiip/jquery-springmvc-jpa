# Tutorial JPA 2, Spring 3.1, jQuery 1.7

This project aims to be the support for a tutorial written in french for the website <http://www.developpez.com/>.
I will add the link to the tutorial page when it will be available.

But this project has also the goal of being the cleanest way to build a simple Java Web application with the most up to date technologies.

My goal is to fully comment the code and the Git repository to explain how the different technologies are integrated.

## Chosen technologies

As described in the main title, the major technologies are [JPA 2][], [Spring][Spring Framework] 3.1 and [jQuery] 1.7 but this is the complete list of architecture choices:

### Java frameworks
- [Hibernate] 4.0 _as JPA 2 implementation_ 
- [JPA 2] _as persistence API_
- [Spring Data JPA] _as DAO layer implementation_
- [Spring Framework] 3.1 _as main IoC container_
- [Spring MVC] 3.1 _as web framework_
- [Jackson] 1.8 _as JSON marshaller_
- [Spring Security] 3.1 _as security framework_

### JavaScript frameworks
- [RequireJS] 1.0 _as JavaScript file and module loader_
- [jQuery] 1.7 _as main JavaScript framework_
- [jQuery UI] 1.8 _as main Web UI framework_
- [jqGrid] 4.3 _as jQuery DataGrid plugin_

### Design patterns and guide lines
- [Single-page application] (even for the login)
- [RESTful] [JSON] API
- [CloudFoundry] compatible

## Key integrations

This sections contains a quick description of the key integration points between all technologies with a link to the file involved.

### Data Source definition

The application has to work on CloudFoundry. CloudFoundry brings useful [Spring tools to set up a data source from a CloudFoundry service](http://start.cloudfoundry.com/frameworks/java/spring/spring.html).

But to be able to test the application without deploy on CloudFoundry every time, we'll need to be able to switch from a standard data source easily. To do that, we use the Spring 3.1 new feature which allow to [define different beans with profiles](http://static.springsource.org/spring/docs/3.1.x/spring-framework-reference/html/new-in-3.1.html#d0e1293).

In the project you will find [applicationContext-ds.xml](/blob/master/src/main/resources/META-INF/applicationContext-ds.xml) which contains the two data sources with a different profile and
[CloudApplicationContextInitializer.java](/blob/master/src/main/java/org/cloudfoundry/services/CloudApplicationContextInitializer.java) class which automatically activate the right profile.

### Standard Spring configuration with JPA, transaction and annotation config

The main Spring configuration file [applicationContext.xml](/blob/master/src/main/resources/META-INF/applicationContext.xml) uses
"context" namespace to declare Spring component scanning and annotation configuration,
"tx" namespace to declare automatic transaction handling and finally
declare a "entityManagerFactory" bean to integrate JPA 2.

This files contains also Spring Data Jpa and Spring Security configuration which will be described bellow.

### Spring Data JPA configuration

Repository layer of the application is fully implemented by [Spring Data JPA][]. The configuration is in the file [applicationContext.xml](/blob/master/src/main/resources/META-INF/applicationContext.xml) with the namespace "jpa".
As you can see, only the root package for repository interfaces is needed.

The Spring Data JPA implement standard JpaRepository interface methods and the specifics defined in the interface. 

### Spring MVC, Jackson and RESTful

### Ajax login with Spring Security

### Spring Data JPA Web pagination

### RequireJS configuration and structure

### jqGrid RESTful mapping

 

[Hibernate]: http://www.hibernate.org/  "Hibernate: Relational Persistence for Java and .NET"
[JPA 2]: http://en.wikipedia.org/wiki/Java_Persistence_API "Java Persistence API"
[Spring Data JPA]: http://www.springsource.org/spring-data/jpa "Spring Data - JPA"
[Spring Framework]: http://www.springsource.org/spring-framework "Spring Framework"
[Spring MVC]: http://static.springsource.org/spring/docs/3.1.x/spring-framework-reference/html/mvc.html "Spring Web MVC framework"
[Jackson]: http://jackson.codehaus.org/ "Jackson: High-performance JSON processor"
[Spring Security]: http://www.springsource.org/spring-security "Spring Security"
[RequireJS]: http://requirejs.org/ "RequireJS: A JavaScript module loader"
[jQuery]: http://jquery.com/ "jQuery: write less, do more"
[jQuery UI]: http://jqueryui.com/ "jQuery user interface"
[jqGrid]: http://www.trirand.com/blog/ "jQuery Grid Plugin"
[Single-page application]: http://en.wikipedia.org/wiki/Single-page_application "Single-page application"
[RESTful]: http://en.wikipedia.org/wiki/RESTful "Representational state transfer"
[JSON]: http://www.json.org/ "JavaScript Object Notation"
[CloudFoundry]: http://www.cloudfoundry.org/ "The open platform as a service project"
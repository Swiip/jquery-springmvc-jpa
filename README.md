# Template JPA 2, Spring 3.1, Backbone JS 0.9

This project aims to be the cleanest and most up to date way to build Web UI on a Java-based server.

Of course, this implies lots of framework and architecture choices which are mine and can be discussed.

This repo is in constant evolution but you can find in branches the major architectures switch. At this time, there is one old branche which is jQuery UI that I replaced by BackboneJS (I know that the two technologies are not the same but I still replaced on by the other).

This version is less ambitious than the previous one as there is only read only features, I apologize but have unfortunatly my own planning constraints.

My goal is to fully comment the code and the Git repository to explain how the different technologies are integrated.

## Chosen technologies

As described in the main title, the major technologies are [JPA 2][], [Spring][Spring Framework] 3.1 and Backbone JS 0.9 but this is the complete list of architecture choices:

### Java frameworks
- [Hibernate] 4.0 _as JPA 2 implementation_ 
- [JPA 2] _as persistence API_
- [Spring Data JPA] 1.1 _as DAO layer implementation_
- [Spring Framework] 3.2 _as main IoC container_
- [Spring MVC] 3.2 _as web framework_
- [Spring Data Rest] 3.2 _as REST exporter_
- [Spring Security] 3.1 _as security framework_

### JavaScript frameworks
- [RequireJS] 2.0 _as JavaScript file and module loader_
- [jQuery] 1.8 _as main JavaScript framework_
- [BackboneJS] 0.9 _as Web UI structure_
- [Twitter Bootstrap] _as front-end framework_

### Design patterns and guide lines
- [Single-page application] (even for the login)
- [RESTful] [JSON] API

## Key integrations

This sections contains a quick description of the key integration points between all technologies with a link to the file involved.

### No XML Spring configuration

Servlet 3.0 and Spring 3.1 adds support of full Java based configuration replacing web.xml and applicationContext.xml. It allows smaller and compiled configurations for building XML free applications.

This application demonstrate this new way of configuration. As I writing this, Spring Security doesn't implement XML free configuration. Security configuration and Maven configuration are the last XML file of the application.

### Spring Data JPA configuration

Repository layer of the application is fully implemented by [Spring Data JPA][]. The configuration is in the file [applicationContext.xml](blob/master/src/main/resources/META-INF/applicationContext.xml) with the namespace "jpa".
As you can see, only the root package for repository interfaces is needed.

The Spring Data JPA implement standard JpaRepository interface methods and the specifics defined in the interface. 

### Spring MVC, Spring Data Rest

Spring Data Rest is very good new idea of Spring Source team and build a bridge from Spring Data to Spring MVC. It allows us to automatically published a Spring Data models.

Spring MVC is used to publish a more specialized service which is the ajax login.
in very standard way. The DispatcherServlet is declared in the [web.xml](blob/master/src/main/webapp/WEB-INF/web.xml).

### Single page application even for login

The web application respect the concept of [Single-page application][] even for the login phase.

In order to do that, all the web application code (HTML, CSS, JS) is not secured but only the JSON RPC calls are. It's the JavaScript application which starts to check user authentication with the server and open a modal popup if needed.

In the Spring Security side, all is configured in [applicationContext.xml](blob/master/src/main/resources/META-INF/applicationContext.xml), the filtering is triggered only on "/rest/*" with an exception on "/rest/login" to be able to log on.
The standard Spring Security's configuration with a automatic form login is also removed and replaced by a simpler "403 Forbidden" handler.

The [LoginController.java](blob/master/src/main/java/com/developpez/skillbrowser/controller/LoginController.java) handles login request mapped with HTTP methods : GET for status, POST for login and DELETE for logout.
This class is a little more tricky because there is sadly no standard "Ajax login" implemented in Spring Security and we have to manage Spring Security context.

Finally, there is the [login.js](blob/master/src/main/webapp/login.js) module which handle login behaviors in the gui. It handles a globally accessible status variable, start with a checking on login status, open the login dialog and publish a logout function.

### RequireJS configuration and structure

The JavaScript application is structured with the [Asynchronous Module Definition (AMD)](https://github.com/amdjs/amdjs-api/wiki/AMD) API.
It structure the code with modules, handles JavaScript files loading and dependencies.

[RequireJS][] is the implementation used to do this. The application's JavaScript bootstrap start in the [index.html](blob/master/src/main/webapp/index.html) with the require.js script and a "data-main" attribute which target the [main.js](blob/master/src/main/webapp/main.js) root script.
This root script configure [RequireJS][], define some dependencies and bootstrap the application including the login module.

### Backbone JS Web UI structure

The Web UI is structured with Backcbone JS. All concepts of Backbone are used in the project : Model with the login status, Collections with the users and skills, View with all components of the interface : login popup and data grids, and finally Router which drive the Url hashtags listening.

All Backbone objects are defined as RequireJS modules with dependencies on js and text files.

### Backbone JS Hateoas models

Hateoas used in Spring Data Rest are structured JSON data which allow to abstract parsing and automatically construct Backbone models and collections to navigate into data.

Data mapping in the project are mostly generic and placed in a special Hateoas Backbone extension which implements this concept.

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
[Spring Data Rest]: http://www.springsource.org/spring-data/rest "easy expose JPA based repositories as RESTful endpoints"
[BackboneJS]: http://backbonejs.org/ "gives structure to web applications"
[Twitter Bootstrap]: http://twitter.github.com/bootstrap/ "Sleek, intuitive, and powerful front-end framework for faster and easier web development"
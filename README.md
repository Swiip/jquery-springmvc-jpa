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

In the project you will find [applicationContext-ds.xml](blob/master/src/main/resources/META-INF/applicationContext-ds.xml) which contains the two data sources with a different profile and
[CloudApplicationContextInitializer.java](blob/master/src/main/java/org/cloudfoundry/services/CloudApplicationContextInitializer.java) class which automatically activate the right profile.

### Standard Spring configuration with JPA, transaction and annotation config

The main Spring configuration file [applicationContext.xml](blob/master/src/main/resources/META-INF/applicationContext.xml) uses
"context" namespace to declare Spring component scanning and annotation configuration,
"tx" namespace to declare automatic transaction handling and finally
declare a "entityManagerFactory" bean to integrate JPA 2.

This files contains also Spring Data Jpa and Spring Security configuration which will be described bellow.

### Spring Data JPA configuration

Repository layer of the application is fully implemented by [Spring Data JPA][]. The configuration is in the file [applicationContext.xml](blob/master/src/main/resources/META-INF/applicationContext.xml) with the namespace "jpa".
As you can see, only the root package for repository interfaces is needed.

The Spring Data JPA implement standard JpaRepository interface methods and the specifics defined in the interface. 

### Spring MVC, Jackson and RESTful

Spring MVC is used in very standard way. The DispatcherServlet is declared in the [web.xml](blob/master/src/main/webapp/WEB-INF/web.xml).
It will load the [spring-servlet.xml](blob/master/src/main/webapp/WEB-INF/spring-servlet.xml) Spring MVC configuration file which declare component scan and annotation configuration for @Controller annotated classes.

The JSON marshalling is automatically triggered by the Jackson dependency in the [pom.xml](blob/master/pom.xml).

The RESTful mapping works with Spring MVC's annotations @RequestMapping with path value and RequestMethod settings like in the [UserController.java](blob/master/src/main/java/com/developpez/skillbrowser/controller/UserController.java).

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

### jqGrid RESTful mapping with Spring Data JPA Web pagination

[jqGrid][] is a very complete data grid component for jQuery UI. It include the handling of exchanges with the server to read and write data with the server.
The default configuration is not the cleanest way I could hope for but it is highly configurable and it's possible to obtain a pretty clean result.

The file [jqgrid.conf.js](blob/master/src/main/webapp/jqgrid.conf.js) contains all jqGrid parameters for the application to convert with the full RESTful server.
For more details, I tried to fully explain the parameters in the file but to sum up, we could notice the method types GET, PUT and DELETE for distinguished operations, the content type "application/json" and the overriding of serialization method to post JSON data instead of form encoded data.

I will just focus on the read serialization which use "page.*" form parameters. It aims to be compatible with the built in Spring Data JPA [Web Pagination](http://static.springsource.org/spring-data/data-jpa/docs/current/reference/html/#web-pagination).
With this mapping, the Spring MVC configuration [spring-servlet.xml](blob/master/src/main/webapp/WEB-INF/spring-servlet.xml) argument resolver will match and automatically be parsed in the Pageable argument of [UserController.java](blob/master/src/main/java/com/developpez/skillbrowser/controller/UserController.java).

In this way, the data grid is fully linked with a RESTful API and the data grid pagination is natively linked with the data base request framework.








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
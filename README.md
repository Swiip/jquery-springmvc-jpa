# Tutorial JPA 2, Spring 3.1, jQuery 1.7

This project aims to be the support for a tutorial written in french for the website <http://www.developpez.com/>.
I will add the link to the tutorial page when it will be available.

But this project has also the goal of being the cleanest way to build a simple Java Web application with the most up to date technologies.

My goal is to fully comment the code and the Git repository to explain how the different technologies are integrated.

## Chosen technologies

As described in the main title, the major technologies are JPA 2, Spring 3.1 and jQuery 1.7 but this is the complete list of architecture choices:

### Java frameworks
- Hibernate 4.0 _as JPA 2 implementation_ 
- JPA 2 _as persistence API_
- Spring Framework 3.1 _as main IoC container_
- Spring MVC 3.1 _as web framework_
- Jackson 1.8 _as JSON marshaller_
- Spring Security 3.1 _as security framework_

### JavaScript frameworks
- RequireJS 1.0 _as JavaScript file and module loader_
- jQuery 1.7 _as main JavaScript framework_
- jQuery UI 1.8 _as main Web UI framework_
- jqGrid 4.3 _as jQuery DataGrid plugin_

### Design patterns and guide lines
- Single page webapp (even for the login)
- RESTful JSON API
- CloudFoundry compatible

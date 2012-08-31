package com.developpez.skillbrowser.controller;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.RememberMeServices;
import org.springframework.security.web.context.HttpSessionSecurityContextRepository;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.developpez.skillbrowser.model.dto.LoginStatus;

/**
 * Spring MVC controller for the login actions.<br/>
 * The Spring Security configuration make this controller the only one reachable without a valid authentication. It's goal is to handle Spring
 * Security context to publish Ajax compatible status, login and logout commands.<br/>
 * "@Controller" the Spring MVC controller nature<br/>
 * "@RequestMapping("/login")" map the request mapping of all the methods under "/login"<br/>
 * 
 * This controller was inspired by the great article and source code provided by Matt Raible:
 * <link>http://raibledesigns.com/rd/entry/implementing_ajax_authentication_using_jquery</link>
 */
@Controller
@RequestMapping("/login")
public class LoginController {

  /**
   * Spring Security center object "authentication manager"
   */
  @Autowired
  @Qualifier("authenticationManager")
  AuthenticationManager authenticationManager;

  /**
   * Spring Security default remember me service which provides direct access to the context from the remember me cookie.
   */
  @Autowired
  private RememberMeServices rememberMeServices;

  /**
   * Get login status request. RequestMapping is done on the HTTP method GET. Check authentication on session and if not found, from remember me
   * cookie.
   * 
   * @param request
   *          HttpServletRequest provided by Spring MVC and needed to use remember me service.
   * @param response
   *          HttpServletResponse provided by Spring MVC and needed to use remember me service.
   * @return LoginStatus instance corresponding to the status found serialized in JSON because of "@ResponseBody" which triggered serialization,
   *         presence of Jackson library in classpath which allow JSON serialization and request header which ask for JSON.
   */
  @RequestMapping(method = RequestMethod.GET)
  @ResponseBody
  public LoginStatus getStatus(HttpServletRequest request, HttpServletResponse response) {
    Authentication authentication = getSessionAuthentication(request);
    if (isAuthenticated(authentication)) {
      return authenticationToLoginStatus(authentication);
    }
    Authentication rememberMeAuthentication = rememberMeServices.autoLogin(request, response);
    if (isAuthenticated(rememberMeAuthentication)) {
      return authenticationToLoginStatus(rememberMeAuthentication);
    }
    return authenticationToLoginStatus(authentication);
  }

  /**
   * Login request. RequestMapping is done on the HTTP method POST. Try to log user with the HTTP parameters. Also trigger remember me cookie if
   * asked.
   * 
   * @param request
   *          HttpServletRequest provided by Spring MVC and needed to use remember me service.
   * @param response
   *          HttpServletResponse provided by Spring MVC and needed to use remember me service.
   * @param username
   *          "j_username" request parameter value (standard Spring Security name) as the username to perform the login
   * @param password
   *          "j_password" request parameter value (standard Spring Security name) as the password to perform the login
   * @param rememberMe
   *          "_spring_security_remember_me" request parameter value (standard Spring Security name) as the trigger for using or not the remember me
   *          cookie
   * @return the new login status after login. The LoginStatus instance is serialized in JSON because of "@ResponseBody" which triggered
   *         serialization, presence of Jackson library in classpath which allow JSON serialization and request header which ask for JSON.
   * 
   * @RequestParam("j_username") String username,
   * @RequestParam("j_password") String password,
   * @RequestParam(value = "_spring_security_remember_me", required = false) String rememberMe
   */
  @RequestMapping(method = { RequestMethod.POST, RequestMethod.PUT })
  @ResponseBody
  public LoginStatus login(HttpServletRequest request, HttpServletResponse response, @RequestBody LoginStatus loginStatus) {
    Authentication authentication = null;
    try {
      UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(loginStatus.getUsername(), loginStatus.getPassword());
      authentication = authenticationManager.authenticate(token);
      setSessionAuthentication(request, authentication);
    } catch (BadCredentialsException e) {
      authentication = SecurityContextHolder.getContext().getAuthentication();
    }
    if (loginStatus.getRememberMe() != null && loginStatus.getRememberMe().equals("on") && isAuthenticated(authentication)) {
      rememberMeServices.loginSuccess(request, response, authentication);
    }
    return authenticationToLoginStatus(authentication);
  }

  /**
   * Logout request. RequestMapping is done on the HTTP method DELETE. Logout the user by removing context in session and calling remember me service.
   * 
   * @param request
   *          HttpServletRequest provided by Spring MVC and needed to use remember me service.
   * @param response
   *          HttpServletResponse provided by Spring MVC and needed to use remember me service.
   * @throws IOException
   *           Can appends when writing the "logged out" message on response stream.
   */
  @RequestMapping(method = RequestMethod.DELETE)
  @ResponseBody
  public void logout(HttpServletRequest request, HttpServletResponse response) throws IOException {
    setSessionAuthentication(request, null);
    rememberMeServices.loginFail(request, response);
    response.getWriter().println("logged out");
  }

  /**
   * Get current session authentication.<br/>
   * As this controller is out of Spring Security filter, the standard way to access Security Context (SecurityContextHolder.getContext()) is not
   * working and we have to do it the old way.
   * 
   * @param request
   *          HttpServletRequest provided by Spring MVC to look for session attributes.
   * @return The current authentication in session or null if there is none.
   */
  private Authentication getSessionAuthentication(HttpServletRequest request) {
    SecurityContext securityContext = (SecurityContext) request.getSession().getAttribute(
        HttpSessionSecurityContextRepository.SPRING_SECURITY_CONTEXT_KEY);
    if (securityContext == null) {
      return null;
    } else {
      return securityContext.getAuthentication();
    }
  }

  /**
   * Set the authentication in session.<br/>
   * As this controller is out of Spring Security filter, the standard way to access Security Context (SecurityContextHolder.getContext()) is not
   * working and we have to do it the old way.
   * 
   * @param request
   *          HttpServletRequest provided by Spring MVC to write session attributes.
   * @param authentication
   *          authentication to set
   */
  private void setSessionAuthentication(HttpServletRequest request, Authentication authentication) {
    SecurityContextHolder.getContext().setAuthentication(authentication);
    request.getSession().setAttribute(HttpSessionSecurityContextRepository.SPRING_SECURITY_CONTEXT_KEY, SecurityContextHolder.getContext());
  }

  /**
   * Check if an authentication is a logged user. As Spring Security handle authentication instances which are not real logged user but can be
   * anonymous authentication for example, this method allow to test it simply.
   * 
   * @param authentication
   *          authentication to test
   * @return true if the authentication is for a real user and false in all other cases
   */
  private boolean isAuthenticated(Authentication authentication) {
    return authentication != null && !authentication.getName().equals("anonymousUser") && authentication.isAuthenticated();
  }

  /**
   * Convert Spring Security authentication to LoginStatus DTO.
   * 
   * @param authentication
   *          authentication to convert
   * @return LoginStatus instance corresponding to the authentication
   */
  private LoginStatus authenticationToLoginStatus(Authentication authentication) {
    LoginStatus loginStatus = new LoginStatus();
    if (isAuthenticated(authentication)) {
      loginStatus.setLoggedIn(true);
      loginStatus.setUsername(authentication.getName());
    } else {
      loginStatus.setLoggedIn(false);
      loginStatus.setUsername(null);
    }
    return loginStatus;
  }

}

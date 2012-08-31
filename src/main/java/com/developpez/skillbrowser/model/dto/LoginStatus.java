package com.developpez.skillbrowser.model.dto;

/**
 * LoginStatus. Simple DTO (Data Transfert Object) used to give a structure to a login status return in the login process
 */
public class LoginStatus {

  /**
   * Boolean logged in current status
   */
  private boolean loggedIn;

  /**
   * Username (or login) currently logged in (or null if not logged in)
   */
  private String username;

  private String password;

  private Boolean rememberMe;

  /**
   * Is logged in
   * 
   * @return loggedIn
   */
  public boolean isLoggedIn() {
    return loggedIn;
  }

  /**
   * Set logged in
   * 
   * @param loggedIn
   */
  public void setLoggedIn(boolean loggedIn) {
    this.loggedIn = loggedIn;
  }

  /**
   * Get username (or login)
   * 
   * @return username
   */
  public String getUsername() {
    return username;
  }

  /**
   * Set username (or login)
   * 
   * @param username
   */
  public void setUsername(String username) {
    this.username = username;
  }

  public String getPassword() {
    return password;
  }

  public void setPassword(String password) {
    this.password = password;
  }

  public Boolean getRememberMe() {
    return rememberMe;
  }

  public void setRememberMe(Boolean rememberMe) {
    this.rememberMe = rememberMe;
  }

}

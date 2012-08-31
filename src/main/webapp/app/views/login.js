define([
  'bootstrap',
  'underscore',
  'backbone',
  'models/login'
], function( $, _, Backbone, LoginStatus ) {

  var LoginView = Backbone.View.extend({
    el: 'div.modal.login',
    events: {
      'click .modal-footer .btn:not(.btn-primary)':  'cancel',
      'click .modal-footer .btn.btn-primary':  'ok'
    },
    initialize: function(callback) {
      this.callback = null;
      $("a.logout").click(this.logout);
      LoginStatus.on('change:loggedIn', this.loggedInChange, this);
      LoginStatus.fetch();
    },
    loggedInChange: function() {
      if (LoginStatus.get('loggedIn')) {
        this.$el.modal('hide');
        if (this.callback) {
          this.callback();
        }
      } else {
        this.$("form input").val(null);
        this.$el.modal('show');
      }
    },
    ok: function() {
      LoginStatus.set({
        username: this.$("#username").val(),
        password: this.$("#password").val(),
        rememberMe: this.$("#rememberMe:checked").length > 0,
      });
      LoginStatus.save();
    },
    cancel: function() {
      this.$el.modal('hide');
    },
    logout: function() {
      LoginStatus.destroy();
      LoginStatus.set({
        loggedIn: false
      });
    }
  });

  return LoginView;

});

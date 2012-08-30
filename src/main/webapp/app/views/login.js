define([
  'bootstrap',
  'underscore',
  'backbone'
], function( $, _, Backbone ) {

  var LoginView = Backbone.View.extend({
    el: 'div.modal.login',
    events: {
      'click .modal-footer .btn:not(.btn-primary)':  'cancel',
      'click .modal-footer .btn.btn-primary':  'ok'
    },
    initialize: function() {
      this.status = null;
      $.ajax({
        url : "rest/login",
        method : "GET",
        success : $.proxy(this.result, this)
      });
    },
    result: function() {
      if (status.loggedIn) {
        this.status = status;
        this.$el.modal('hide');
      } else {
        this.$el.modal('show');
      }
    },
    ok: function() {
      alert("todo");
    },
    cancel: function() {
      this.$el.modal("hide");
    }
  });

  return LoginView;

});

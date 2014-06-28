define([
  'jquery',
  'underscore',
  'backbone',
  'views/modal',
  'text!templates/modalRenameUser.html'
], function($, _, Backbone, ModalView, modalRenameUserTemplate) {
  'use strict';
  var ModalRenameUserView = ModalView.extend({
    className: 'rename-user-modal',
    template: _.template(modalRenameUserTemplate),
    title: 'Modify User',
    okText: 'Save',
    body: function() {
      return this.template(this.model.toJSON());
    },
    onOk: function() {
      var name = this.$('.name input').val();
      var email = this.$('.email input').val();

      if (!name) {
        this.setAlert('danger', 'Name can not be empty.', '.form-group');
        return;
      }
      if (!email) {
        email = null;
      }

      this.setLoading('Modifying user...');
      this.model.save({
        name: name,
        email: email
      }, {
        success: function() {
          this.close(true);
        }.bind(this),
        error: function() {
          this.clearLoading();
          this.setAlert('danger',
            'Failed to modify user, server error occurred.');
        }.bind(this)
      });
    }
  });

  return ModalRenameUserView;
});

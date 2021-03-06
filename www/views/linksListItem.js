define([
  'jquery',
  'underscore',
  'backbone',
  'views/alert',
  'text!templates/linksListItem.html'
], function($, _, Backbone, AlertView, linksListItemTemplate) {
  'use strict';
  var LinksListItemView = Backbone.View.extend({
    className: 'link',
    template: _.template(linksListItemTemplate),
    events: {
      'click .link-title a': 'onSettings',
      'click .link-del': 'onDelete',
      'click .link-restart, .link-start, .link-stop': 'onOperation',
      'click .toggle-hidden': 'onToggleHidden'
    },
    initialize: function() {
    },
    deinitialize: function() {
    },
    render: function() {
      this.$el.html(this.template(this.model.toJSON()));
      this.update();
      return this;
    },
    update: function() {
      this.$('.link-title a').text(this.model.get('name'));
    },
    updateOrgsCount: function() {
      this.orgsCount = this.serverOrgsListView.views.length;
    },
    updateHostsCount: function() {
      this.hostsCount = this.serverHostsListView.views.length;
    },
    onSettings: function() {
      console.log('settings');
    },
    onDelete: function(evt) {
      console.log('delete');
    },
    onOperation: function(evt) {
      var operation;

      if ($(evt.target).hasClass('link-restart')) {
        operation = 'restart';
      }
      else if ($(evt.target).hasClass('link-start')) {
        operation = 'start';
      }
      else if ($(evt.target).hasClass('link-stop')) {
        operation = 'stop';
      }
      if (!operation) {
        return;
      }

      console.log(operation);
    },
    onToggleHidden: function(evt) {
      if (!evt.ctrlKey && !evt.shiftKey) {
        return;
      }
      if (this.$el.hasClass('show-hidden')) {
        this.$('.toggle-hidden').removeClass('label-success');
        this.$('.toggle-hidden').addClass('label-primary');
        this.$el.removeClass('show-hidden');
      }
      else {
        this.$('.toggle-hidden').addClass('label-success');
        this.$('.toggle-hidden').removeClass('label-primary');
        this.$el.addClass('show-hidden');
      }
    }
  });

  return LinksListItemView;
});

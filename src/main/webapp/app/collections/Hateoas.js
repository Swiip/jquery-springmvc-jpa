/**
 * Define Require module with dependencies
 */
define([
  'underscore',
  'backbone'
], function (_, Backbone, HateoasModel) {
  /**
   * Hateoas is a parent object to the Backbone model and collection extensions specialized to handle Hateoas Rest services
   */
  var Hateoas = {
    reference:{}
  };
  /**
   * Hateoas model is an extension of the Backbone's model which detect Hateoas links in the JSON returned
   * to automatically plug Hateoas collections as special property of the model
   */
  Hateoas.Model = Backbone.Model.extend({
    parse:function (data) {
      if (data._links) {
        _.each(data._links, function (link) {
          if (link.rel == 'self') {
            this.url = link.href;
          } else {
            if (!Hateoas.reference[link.href]) {
              var collection = new Hateoas.Collection();
              collection.url = link.href;
              Hateoas.reference[link.href] = collection;
            }
            data[link.rel] = Hateoas.reference[link.href];
          }
        }, this);
        delete data._links;
      }
      return data;
    }
  });
  /**
   * Hateoas collection is an extension of the Backbone's collection which detect Hateoas links in the JSON returned
   * to automatically plug Hateoas model as special elements of the collection
   */
  Hateoas.Collection = Backbone.Collection.extend({
    parse:function (data) {
      if (data._links) {
        var links = data._links;
        data = [];
        _.each(links, function (link) {
          if (!Hateoas.reference[link.href]) {
            var model = new Hateoas.Model();
            model.url = link.href;
            Hateoas.reference[link.href] = model;
          }
          data.push(Hateoas.reference[link.href]);
        }, this);
        delete data._links;
      }
      return data;
    }
  });
  /**
   * Hateoas Pageable Collection is an extension of the Hateoas Collection which add support of requesting and parsing
   * for Pageable Rest services
   */
  Hateoas.PageableCollection = Hateoas.Collection.extend({
    model:Hateoas.Model.extend(),
    initialize:function () {
      this.totalCount = 0;
      this.totalPages = 0;
      this.currentPage = 0;
      this.page = 1;
      this.limit = 10;
      this.sort = null;
      this.dir = null;
    },
    parse:function (data) {
      this.totalCount = data.totalCount;
      this.totalPages = data.totalPages;
      this.currentPage = data.currentPage;
      return data.results;
    },
    fetchPage:function () {
      var data = {
        page:this.page,
        limit:this.limit,
        sort:this.sort
      }
      data[this.sort + '.dir'] = this.dir;
      this.fetch({
        data:data
      });
    }
  });

  // Return the view as the Require module
  return Hateoas;
});

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
      console.log('Model parse', data);
      if (data.links) {
        _.each(data.links, function (link) {
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
        delete data.links;
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
      console.log('Collection parse', data);
      /*var content = data.content;
      if (data.links) {
        var links = data.links;
        //data = [];
        _.each(links, function (link) {
          if (!Hateoas.reference[link.href]) {
            var model = new Hateoas.Model();
            model.url = link.href;
            Hateoas.reference[link.href] = model;
          }
          data.push(Hateoas.reference[link.href]);
        }, this);
        //delete data.links;
      }*/
      return data.content;
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
      this.totalCount = data.page.totalElements;
      this.totalPages = data.page.totalPages;
      this.currentPage = data.page.number;
      //data.content._links = data.links;
      console.log('Hateoas parse', data);
      return data.content;
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

if (typeof FormTarget === 'undefined') {
  FormTarget = {};
}
FormTarget.project = (function($) {

  /*
   * Expected config {
   *   shortNameRequired: boolean
   *   shortNameMofifiable: boolean
   *   statusOptions: array
   * }
   */

  return {
    getSaveUrl: function(project) {
      return project.id ? ('/miso/rest/projects/' + project.id) : '/miso/rest/projects';
    },
    getSaveMethod: function(project) {
      return project.id ? 'PUT' : 'POST';
    },
    getEditUrl: function(project) {
      return '/miso/project/' + project.id;
    },
    getSections: function(config, object) {
      return [{
        title: "Project Information",
        fields: [{
          title: 'Project ID',
          data: 'id',
          type: 'read-only',
          getDisplayValue: function(project) {
            return project.id || 'Unsaved';
          }
        }, {
          title: 'Name',
          data: 'name',
          type: 'read-only',
          getDisplayValue: function(project) {
            return project.name || 'Unsaved';
          }
        }, {
          title: 'Creation Date',
          data: 'creationDate',
          type: 'read-only'
        }, {
          title: 'Alias',
          data: 'alias',
          type: 'text',
          required: true,
          maxLength: 100
        }, {
          title: 'Short Name',
          data: 'shortName',
          type: config.shortNameModifiable ? 'text' : 'read-only',
          required: config.shortNameRequired,
          maxLength: 255
        }, {
          title: 'Description',
          data: 'description',
          type: 'text',
          maxLength: 255
        }, {
          title: 'Status',
          data: 'status',
          type: 'dropdown',
          required: true,
          source: config.statusOptions
        }, {
          title: 'Reference Genome',
          data: 'referenceGenomeId',
          type: 'dropdown',
          required: 'true',
          source: Constants.referenceGenomes,
          sortSource: Utils.sorting.standardSortWithException('alias', 'Unknown', true),
          getItemLabel: function(item) {
            return item.alias;
          },
          getItemValue: function(item) {
            return item.id;
          }
        }, {
          title: 'Default Targeted Sequencing',
          data: 'defaultTargetedSequencingId',
          type: 'dropdown',
          source: Constants.targetedSequencings,
          sortSource: Utils.sorting.standardSort('alias'),
          getItemLabel: function(item) {
            return item.alias;
          },
          getItemValue: function(item) {
            return item.id;
          }
        }, {
          title: 'Clinical',
          data: 'clinical',
          type: 'checkbox'
        }]
      }];
    }
  };

})(jQuery);
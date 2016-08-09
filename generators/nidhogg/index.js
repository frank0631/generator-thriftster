'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var fs = require('fs');
var _ = require('lodash');
var sprintf = require("sprintf-js").sprintf

module.exports = yeoman.Base.extend({

  constructor: function() {
    yeoman.Base.apply(this, arguments);
    this.option('nidhogg');
  },

  prompting: function() {
    console.log('The nidhogg subgenerator for thrift projects');
    var NidhoggGenerator = this
    var prompts = [];

    if (!NidhoggGenerator.options.t_namespace) {
      prompts.push({
        type: 'object',
        name: 'nidhogg',
        message: 'Thrift Project object',
        default: {
          "t_namespace": "com.frank0631",
          "t_project": "Nidhogg",
          "t_objects": []
        }
      })
    }

    return NidhoggGenerator.prompt(prompts).then(function(props) {
      NidhoggGenerator.props = props;
      _(props).forEach(function(value, key) {
        //TODO validate nidhogg option
        NidhoggGenerator.options[key] = value
      });

    }.bind(NidhoggGenerator));
  },

  createObjects: function() {
    var thriftObjs = this.options.t_objects
    var NidhoggGenerator = this

    _(thriftObjs).forEach(function(objs) {
    //TODO validate thrift object option
      var opts = {
        t_namespace: NidhoggGenerator.options.t_namespace,
        t_project: NidhoggGenerator.options.t_project,
        t_object: objs.t_object,
        t_path: objs.t_path
      }

      NidhoggGenerator.composeWith('thriftster:nidhogg-thrift', {
        options: opts
      });
    });
  },

  writing: function() {
    var thriftOptions = {
      t_namespace: this.options.t_namespace,
      t_project: this.options.t_project
    }
    var destinationPathBuild = sprintf("%(t_project)s/build.gradle", thriftOptions)
    var templatePathGradle = this.templatePath('build.gradle')
    this.fs.copyTpl(templatePathGradle, destinationPathBuild, thriftOptions)
  },

});

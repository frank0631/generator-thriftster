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
    this.option('muninn');
  },

  prompting: function() {
    console.log('The muninn subgenerator for thrift projects');
    var MuninnGenerator = this
    var prompts = [];

    if (!MuninnGenerator.options.muninn) {
      prompts.push({
        type: 'object',
        name: 'muninn',
        message: 'Java Client Project object',
        default: {
          "j_namespace": "com.frank0631",
          "j_project": "Muninn",
          "j_application": "MuninnApp"
        }
      })
    }


    return MuninnGenerator.prompt(prompts).then(function(props) {
      MuninnGenerator.props = props;
      _(props).forEach(function(value, key) {
        //TODO validate muninn option
        MuninnGenerator.options[key] = value
      });

    }.bind(MuninnGenerator));
  },

  // //for composewith
  // createObjects: function() {
  //   var MuninnGenerator = this
  //   var opts = {
  //       j_namespace: MuninnGenerator.options.muninn.j_namespace,
  //       j_project: MuninnGenerator.options.muninn.j_project,
  //       j_application: MuninnGenerator.options.muninn.j_application
  //   }
  // },

  writing: function() {
    var MuninnGenerator = this

    var muninnOptions = {
        j_namespace: MuninnGenerator.options.muninn.j_namespace,
        j_project: MuninnGenerator.options.muninn.j_project,
        j_application: MuninnGenerator.options.muninn.j_application,
        j_srcpath: MuninnGenerator.options.muninn.j_namespace.replace('.', '/')
    }

    //build.gradle
    var destinationPathBuild = sprintf("%(j_project)s/build.gradle", muninnOptions)
    var templatePathGradle = this.templatePath('build.gradle')
    this.fs.copyTpl(templatePathGradle, destinationPathBuild, muninnOptions)

    // MuninnApplication.java
    var templateMunApp = this.templatePath('MuninnApplication.java')
    var destPathMunApp = sprintf("%(j_project)s/src/main/java/%(j_srcpath)s/%(j_project)s/%(j_application)s.java", muninnOptions)
    this.fs.copyTpl(templateMunApp, destPathMunApp, muninnOptions)

  },


});

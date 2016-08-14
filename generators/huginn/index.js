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
    this.option('huginn');
    this.option('t_namespace');
    this.option('t_project');
  },

  prompting: function() {
    console.log('The huginn subgenerator for thrift projects');
    var HuginnGenerator = this
    var prompts = [];

    if (!HuginnGenerator.options.huginn) {
      prompts.push({
        type: 'object',
        name: 'huginn',
        message: 'Spring Backend Project object',
        default: {
          "s_namespace": "com.frank0631",
          "s_project": "Huginn",
          "s_application": "HuginnApp",
          "s_entities": []
        }
      })
    }
    
    if (!HuginnGenerator.options.t_namespace) {
      prompts.push({
        type: 'input',
        name: 't_namespace',
        message: 'Thrist Project namespace',
        default: 'com.frank0631'
      })
    }

    if (!HuginnGenerator.options.t_project) {
      prompts.push({
        type: 'input',
        name: 't_project',
        message: 'Thrist Project name',
        default: 'Nidhogg'
      })
    }

    return HuginnGenerator.prompt(prompts).then(function(props) {
      HuginnGenerator.props = props;
      _(props).forEach(function(value, key) {
        //TODO validate huginn option
        HuginnGenerator.options[key] = value
      });

    }.bind(HuginnGenerator));
  },

  createObjects: function() {
    var HuginnGenerator = this
    var sprintEntities = this.options.huginn.s_entities

    _(sprintEntities).forEach(function(objs) {
      //TODO validate spring entity option
      var opts = {
        s_namespace: HuginnGenerator.options.huginn.s_namespace,
        s_project: HuginnGenerator.options.huginn.s_project,
        t_namespace: HuginnGenerator.options.t_namespace,
        t_project: HuginnGenerator.options.t_project,
        s_object: objs.s_object,
        t_object: objs.t_object
      }

      HuginnGenerator.composeWith('thriftster:huginn-entity', {
        options: opts
      });
    });
  },

  writing: function() {

    var springOptions = {
      s_namespace: this.options.huginn.s_namespace,
      s_project: this.options.huginn.s_project,
      s_application: this.options.huginn.s_application,
      s_srcpath: this.options.huginn.s_namespace.replace('.', '/')
    }

    //build.gradle
    var destinationPathBuild = sprintf("%(s_project)s/build.gradle", springOptions)
    var templatePathGradle = this.templatePath('build.gradle')
    this.fs.copyTpl(templatePathGradle, destinationPathBuild, springOptions)

    // /templates/src/main/resources
    // META-INF/orm.xml
    var templateOrm = this.templatePath('orm.xml')
    var destPathOrm = sprintf("%(s_project)s/src/main/resources/META-INF/orm.xml", springOptions)
    this.fs.copy(templateOrm, destPathOrm)

    // application.properties
    var templateAppProp = this.templatePath('application.properties')
    var destPathAppProp = sprintf("%(s_project)s/src/main/resources/application.properties", springOptions)
    this.fs.copy(templateAppProp, destPathAppProp)

    // /src/main/java/com/frank0631/huginn
    // AppConfigMongoDB.java  
    var templateMongoConfig = this.templatePath('AppConfigMongoDB.java')
    var destPathMongoConfig = sprintf("%(s_project)s/src/main/java/%(s_srcpath)s/%(s_project)s/AppConfigMongoDB.java", springOptions)
    this.fs.copyTpl(templateMongoConfig, destPathMongoConfig, springOptions)

    // CORSFilter.java
    var templateCORS = this.templatePath('CORSFilter.java')
    var destPathCORS = sprintf("%(s_project)s/src/main/java/%(s_srcpath)s/%(s_project)s/CORSFilter.java", springOptions)
    this.fs.copyTpl(templateCORS, destPathCORS, springOptions)

    // RestConfiguration.java  TProtocolFactory.java
    var templateREST = this.templatePath('RestConfiguration.java')
    var destPathREST = sprintf("%(s_project)s/src/main/java/%(s_srcpath)s/%(s_project)s/RestConfiguration.java", springOptions)
    this.fs.copyTpl(templateREST, destPathREST, springOptions)

    // TProtocolFactory.java
    var templateTProtocol = this.templatePath('TProtocolFactory.java')
    var destPathTProtocol = sprintf("%(s_project)s/src/main/java/%(s_srcpath)s/%(s_project)s/TProtocolFactory.java", springOptions)
    this.fs.copyTpl(templateTProtocol, destPathTProtocol, springOptions)

    // HuginnApplication.java  RestConfiguration.java  TProtocolFactory.java
    var templateHugApp = this.templatePath('HuginnApplication.java')
    var destPathHugApp = sprintf("%(s_project)s/src/main/java/%(s_srcpath)s/%(s_project)s/%(s_application)s.java", springOptions)
    this.fs.copyTpl(templateHugApp, destPathHugApp, springOptions)

  },


});

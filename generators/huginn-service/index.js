'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var _ = require('lodash');
var sprintf = require("sprintf-js").sprintf

module.exports = yeoman.Base.extend({

  constructor: function() {
    yeoman.Base.apply(this, arguments);
    this.option('s_namespace');
    this.option('s_project');
    this.option('s_service');
    this.option('t_namespace');
    this.option('t_project');
    this.option('t_service');
  },

  prompting: function() {
    console.log('The huginn subgenerator for services');
    var HuginnServiceGenerator = this
    var prompts = [];

    if (!this.options.s_namespace) {
      prompts.push({
        type: 'input',
        name: 's_namespace',
        message: 'Java Project namespace',
        default: 'com.frank0631'
      })
    }

    if (!this.options.s_project) {
      prompts.push({
        type: 'input',
        name: 's_project',
        message: 'Java Project name',
        default: 'huginn'
      })
    }

    if (!this.options.s_service) {
      prompts.push({
        type: 'input',
        name: 's_service',
        message: 'Java Service name',
        default: 'Service'
      })
    }

    if (!this.options.t_namespace) {
      prompts.push({
        type: 'input',
        name: 't_namespace',
        message: 'Thrist Project namespace',
        default: 'com.frank0631'
      })
    }

    if (!this.options.t_project) {
      prompts.push({
        type: 'input',
        name: 't_project',
        message: 'Thrist Project name',
        default: 'nidhogg'
      })
    }

    if (!this.options.t_service) {
      prompts.push({
        type: 'input',
        name: 't_service',
        message: 'Thrist Service name',
        default: 'service'
      })
    }
    
    if (!this.options.t_package) {
      prompts.push({
        type: 'input',
        name: 't_package',
        message: 'Thrift Package name',
        default: 'package'
      })
    }
    
    if (!this.options.s_package) {
      prompts.push({
        type: 'input',
        name: 's_package',
        message: 'Spring package name',
        default: 'package'
      })
    }

    return this.prompt(prompts).then(function(props) {
      this.props = props;
      _(props).forEach(function(value, key) {
        HuginnServiceGenerator.options[key] = value
      });

    }.bind(this));
  },

  writing: function() {

    this.entityOptions = {
      s_namespace: this.options.s_namespace,
      s_project: this.options.s_project,
      s_service: this.options.s_service,
      s_package: this.options.s_package,
      s_srcpath: this.options.s_namespace.replace('.', '/'),
      t_namespace: this.options.t_namespace,
      t_project: this.options.t_project,
      t_service: this.options.t_service,
      t_package: this.options.t_package
    }

    var destPathServlet = sprintf("%(s_project)s/src/main/java/%(s_srcpath)s/%(s_project)s/servlet/%(s_package)sServlet.java", this.entityOptions)
    var templatePathServlet = this.templatePath('ThriftServlet.java')
    this.fs.copyTpl(templatePathServlet, destPathServlet, this.entityOptions);
    
    var destPathService= sprintf("%(s_project)s/src/main/java/%(s_srcpath)s/%(s_project)s/%(s_package)s/%(s_service)s.java", this.entityOptions)
    var templatePathService = this.templatePath('ThriftService.java')
    this.fs.copyTpl(templatePathService, destPathService, this.entityOptions);

    // //Import for RestConfiguration
    // var hook = '#===== yeoman hook import Entity =====#',
    //   destPath = sprintf("%(s_project)s/src/main/java/%(s_srcpath)s/%(s_project)s/RestConfiguration.java", this.entityOptions),
    //   file = this.fs.read(destPath),
    //   insert = sprintf("import %(s_namespace)s.%(s_project)s.%(t_service)s.%(s_service)sEntity;", this.entityOptions);
    // if (file.indexOf(insert) === -1) {
    //   this.write(destPath, file.replace(hook, hook + '\n' + insert));
    // }
    
    // //ExposrIdsFor for RestConfiguration
    // var hook = '#===== yeoman hook exposeIdsFor =====#',
    //   destPath = sprintf("%(s_project)s/src/main/java/%(s_srcpath)s/%(s_project)s/RestConfiguration.java", this.entityOptions),
    //   file = this.fs.read(destPath),
    //   insert = sprintf("\t\tconfig.exposeIdsFor(%(s_service)sEntity.class);", this.entityOptions);
    // if (file.indexOf(insert) === -1) {
    //   this.write(destPath, file.replace(hook, hook + '\n' + insert));
    // }
    
    // //mapped-superclass for orm.xml
    // var hook = '<!--#===== yeoman hook mapped-superclass =====#-->',
    //   destPath = sprintf("%(s_project)s/src/main/resources/META-INF/orm.xml", this.entityOptions)
    //   file = this.fs.read(destPath),
    //   insert = sprintf("\t<mapped-superclass class=\"%(s_namespace)s.%(s_project)s.%(t_service)s.%(s_service)s\"/>", this.entityOptions);
    // if (file.indexOf(insert) === -1) {
    //   this.write(destPath, file.replace(hook, hook + '\n' + insert));
    // }
    
  }

});

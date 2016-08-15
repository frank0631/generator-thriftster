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
    this.option('s_object');
    this.option('t_namespace');
    this.option('t_project');
    this.option('t_object');
  },

  prompting: function() {
    console.log('The huginn subgenerator for entity objects');
    var HuginnEntityGenerator = this
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

    if (!this.options.s_object) {
      prompts.push({
        type: 'input',
        name: 's_object',
        message: 'Java Entity name',
        default: 'Obj'
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

    if (!this.options.t_object) {
      prompts.push({
        type: 'input',
        name: 't_object',
        message: 'Thrist Entity name',
        default: 'obj'
      })
    }

    return this.prompt(prompts).then(function(props) {
      this.props = props;
      _(props).forEach(function(value, key) {
        HuginnEntityGenerator.options[key] = value
      });

    }.bind(this));
  },

  writing: function() {

    this.entityOptions = {
      s_namespace: this.options.s_namespace,
      s_project: this.options.s_project,
      s_object: this.options.s_object,
      s_srcpath: this.options.s_namespace.replace('.', '/'),
      t_namespace: this.options.t_namespace,
      t_project: this.options.t_project,
      t_object: this.options.t_object
    }

    var destPathEntity = sprintf("%(s_project)s/src/main/java/%(s_srcpath)s/%(s_project)s/%(t_object)s/%(s_object)sEntity.java", this.entityOptions)
    var templatePathEntity = this.templatePath('ThriftEntity.java')
    this.fs.copyTpl(templatePathEntity, destPathEntity, this.entityOptions);

    //Import for RestConfiguration
    var hook = '#===== yeoman hook import Entity =====#',
      destPath = sprintf("%(s_project)s/src/main/java/%(s_srcpath)s/%(s_project)s/RestConfiguration.java", this.entityOptions),
      file = this.fs.read(destPath),
      insert = sprintf("import %(s_namespace)s.%(s_project)s.%(t_object)s.%(s_object)s;", this.entityOptions);
    if (file.indexOf(insert) === -1) {
      this.write(destPath, file.replace(hook, hook + '\n' + insert));
    }
    
    //ExposrIdsFor for RestConfiguration
    var hook = '#===== yeoman hook exposeIdsFor =====#',
      destPath = sprintf("%(s_project)s/src/main/java/%(s_srcpath)s/%(s_project)s/RestConfiguration.java", this.entityOptions),
      file = this.fs.read(destPath),
      insert = sprintf("\t\tconfig.exposeIdsFor(%(s_object)sEntity.class);", this.entityOptions);
    if (file.indexOf(insert) === -1) {
      this.write(destPath, file.replace(hook, hook + '\n' + insert));
    }
    
    //mapped-superclass for orm.xml
    var hook = '<!--#===== yeoman hook mapped-superclass =====#-->',
      destPath = sprintf("%(s_project)s/src/main/resources/META-INF/orm.xml", this.entityOptions)
      file = this.fs.read(destPath),
      insert = sprintf("\t<mapped-superclass class=\"%(s_namespace)s.%(s_project)s.%(t_object)s.%(s_object)s\"/>", this.entityOptions);
    if (file.indexOf(insert) === -1) {
      this.write(destPath, file.replace(hook, hook + '\n' + insert));
    }
    
  }

});

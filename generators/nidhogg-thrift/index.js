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
    this.option('t_namespace');
    this.option('t_project');
    this.option('t_object');
    this.option('t_path');
  },

  prompting: function() {
    console.log('The nidhogg subgenerator for thrift objects');
    var NidhoggThriftGenerator = this
    var prompts = [];

    if (!this.options.t_namespace) {
      prompts.push({
        type: 'input',
        name: 't_namespace',
        message: 'Thrift Project namespace',
        default: 'com.frank0631'
      })
    }
    if (!this.options.t_project) {
      prompts.push({
        type: 'input',
        name: 't_project',
        message: 'Thrift Project name',
        default: 'Nidhogg'
      })
    }
    if (!this.options.t_object) {
      prompts.push({
        type: 'input',
        name: 't_object',
        message: 'Thrift object name',
        default: 'thriftname'
      })
    }
    if (!this.options.t_path) {
      prompts.push({
        type: 'input',
        name: 't_path',
        message: 'Thrift object path',
        default: 'echo.thrift'
      })
    }

    return this.prompt(prompts).then(function(props) {
      this.props = props;
      _(props).forEach(function(value, key) {
        NidhoggThriftGenerator.options[key] = value
      });

    }.bind(this));
  },

  writing: function() {
    //TODO add callback, error if file not found, compose if found
    var thriftfileStr = fs.readFileSync(this.options.t_path, 'utf8');
    var thriftOptions = {
      namespace: this.options.t_namespace,
      project: this.options.t_project,
      object: this.options.t_object,
      path: this.options.t_path,
      file: thriftfileStr
    }
    var destinationPathThrift = sprintf("%(project)s/src/main/thrift/%(object)s.thrift", thriftOptions)
    var templatePathThrift = this.templatePath('template.thrift')
    this.fs.copyTpl(templatePathThrift, destinationPathThrift, thriftOptions);
  },

});

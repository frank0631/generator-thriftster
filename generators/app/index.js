'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var fs = require('fs');
var _ = require('lodash');

module.exports = yeoman.Base.extend({

  constructor: function() {
    yeoman.Base.apply(this, arguments);
    this.option('t_project');
    this.option('s_project');
  },

  initializing: function() {
    var thriftster = JSON.parse(fs.readFileSync('thriftster.json', 'utf8'));

    var ThrifsterGenerator = this
    var nidhogg = thriftster["nidhogg"]
    var huginn = thriftster["huginn"]
    var muninn = thriftster["muninn"]
    var ratatoskr = thriftster["ratatoskr"]
    var veorfolnir = thriftster["veorfolnir"]

    this.options["t_project"] = nidhogg.t_project
    ThrifsterGenerator.composeWith('thriftster:nidhogg', {
      options: {
        nidhogg: thriftster.nidhogg
      }
    });

    this.options["s_project"] = huginn.s_project
    ThrifsterGenerator.composeWith('thriftster:huginn', {
      options: {
        huginn: thriftster.huginn,
        t_namespace: nidhogg.t_namespace,
        t_project: nidhogg.t_project
      }
    });

    // console.log("nidhogg", nidhogg);
    // console.log("huginn", huginn);
    // console.log("muninn", muninn);
    // console.log("ratatoskr", ratatoskr);
    // console.log("veorfolnir", veorfolnir);

  },

  writing: function() {
    var hraesvelgrOptions = {
      t_project: this.options.t_project,
      s_project: this.options.s_project
    }
    
    this.fs.copyTpl(this.templatePath('build.gradle'), this.destinationPath('build.gradle'), hraesvelgrOptions)
    this.fs.copyTpl(this.templatePath('settings.gradle'), this.destinationPath('settings.gradle'), hraesvelgrOptions)
    
    this.fs.copy(this.templatePath('thrift.java.gradle'),this.destinationPath('thrift.java.gradle'));
    this.fs.copy(this.templatePath('thrift.js.gradle'),this.destinationPath('thrift.js.gradle'));
    this.fs.copy(this.templatePath('thrift.src.gradle'),this.destinationPath('thrift.src.gradle'));
    this.fs.copy(this.templatePath('README.md'),this.destinationPath('README.md'));
  },

  // install: function () {
  //   this.installDependencies();
  // }

});
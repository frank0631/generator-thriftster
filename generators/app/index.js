'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var fs = require('fs');
var _ = require('lodash');

module.exports = yeoman.Base.extend({

  initializing: function() {
    var thriftster = JSON.parse(fs.readFileSync('thriftster.json', 'utf8'));

    var ThrifsterGenerator = this
    var nidhogg = thriftster["nidhogg"]
    var huginn = thriftster["huginn"]
    var muninn = thriftster["muninn"]
    var ratatoskr = thriftster["ratatoskr"]
    var veorfolnir = thriftster["veorfolnir"]

    ThrifsterGenerator.composeWith('thriftster:nidhogg', {
        options: thriftster.nidhogg
      });
      
    ThrifsterGenerator.composeWith('thriftster:huginn', {
        options: thriftster.huginn
      });
      
    // console.log("nidhogg", nidhogg);
    // console.log("huginn", huginn);
    // console.log("muninn", muninn);
    // console.log("ratatoskr", ratatoskr);
    // console.log("veorfolnir", veorfolnir);

  },

  // prompting: function() {
  //   this.log(yosay(
  //     'Welcome to the primo ' + chalk.red('generator-thriftster') + ' generator!'
  //   ));

  //   var prompts = [{
  //     type: 'confirm',
  //     name: 'someAnswer',
  //     message: 'Would you like to enable this option?',
  //     default: true
  //   }];

  //   return this.prompt(prompts).then(function(props) {
  //     // To access props later use this.props.someAnswer;
  //     this.props = props;
  //   }.bind(this));
  // },

  // writing: function() {
  //   this.fs.copy(
  //     this.templatePath('dummyfile.txt'),
  //     this.destinationPath('dummyfile.txt')
  //   );
  // },

  // install: function () {
  //   this.installDependencies();
  // }

});
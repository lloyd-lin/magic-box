"use strict";

// refer AnyProxy
var fs = require('fs'),
    child_process = require('child_process'),
    path = require('path');

function getUserHome() {
  return process.env.HOME || process.env.USERPROFILE;
}

module.exports.getUserHome = getUserHome;

function getProxyHome() {
  var home = path.join(getUserHome(), '/.magic-box/');

  if (!fs.existsSync(home)) {
    fs.mkdirSync(home);
  }

  return home;
}

module.exports.getProxyHome = getProxyHome;

module.exports.getProxyPath = function (pathName) {
  var home = getProxyHome();
  var targetPath = path.join(home, pathName);

  if (!fs.existsSync(targetPath)) {
    fs.mkdirSync(targetPath);
  }

  return targetPath;
};

module.exports.execScriptSync = function (cmd) {
  var stdout,
      status = 0;

  try {
    stdout = child_process.execSync(cmd);
  } catch (err) {
    stdout = err.stdout;
    status = err.status;
  }

  return {
    stdout: stdout.toString(),
    status: status
  };
};
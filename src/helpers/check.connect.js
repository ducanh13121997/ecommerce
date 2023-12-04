"use strict";

const mongoose = require("mongoose");
const os = require("os");
const process = require("process");
const _SECONDS = 5000;

// count connect
const countConnect = () => {
  const numberConnect = mongoose.connections?.length || 0;
  console.log(`number connect: ${numberConnect}`);
};

//check overload
const checkOverload = () => {
  setInterval(() => {
    const numberConnect = mongoose.connections?.length;
    const numberCores = os.cpus().length;
    const memoryUsage = process.memoryUsage().rss;

    console.log(`Active connections: ${numberConnect}`);
    console.log(`Memory usage: ${memoryUsage / 1024 / 1024} MB`);

    // Example maximum number of connections based on the number of cores
    const maxConnections = numberCores * 5;
    if (numberConnect > maxConnections) {
      //send notify
      console.log(`Overload: ${numberConnect} > ${maxConnections}`);
    }
  }, _SECONDS);
};

module.exports = {
  countConnect,
  checkOverload,
};

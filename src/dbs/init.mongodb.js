"use strict";

const {
  db: { host, port, name },
} = require("../configs/config.mongodb");
const mongoose = require("mongoose");
const connectString = `mongodb://${host}:${port}/${name}`;
console.log("connectString:", connectString);
const { countConnect } = require("../helpers/check.connect");

class Database {
  constructor() {
    this.connect();
  }
  connect(type = "mongodb") {
    if (1 === 1) {
      mongoose.set("debug", true);
      mongoose.set("debug", { color: true });
    }

    mongoose
      .connect(connectString)
      .then((_) => console.log("Connected Mongodb Success!", countConnect()))
      .catch((err) => console.log(err));
  }

  static getInstance() {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }
}

const instanceMongoDB = Database.getInstance();
module.exports = instanceMongoDB;

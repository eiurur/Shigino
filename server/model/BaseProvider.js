const chalk = require('chalk');
const mongoose = require('mongoose');
// let configs  = require('konfig')();

require('dotenv').config();

let uri      = process.env.MONGOLAB_URI || process.env.MONGODB_URI;
let db       = mongoose.connect(uri);

module.exports = class BaseProvider {

  constructor(Model) {
    this.Model = Model;
    console.log(this.Model.modelName);
  }

  find() {
    return new Promise((resolve, reject) => {
      console.log(chalk.green(`BaseProvider ${this.Model.modelName} find`));
      console.time(`${this.Model.modelName} find`);
      return this.Model.find({}, (err, docs) => {
        console.timeEnd(`${this.Model.modelName} find`);
        if (err) { return reject(err); }
        return resolve(docs);
      });
    });
  }

  findByIdAndUpdate(_id, data, options) {
    return new Promise((resolve, reject) => {
      console.log(chalk.green(`BaseProvider ${this.Model.modelName} findByIdAndUpdate`));
      console.log(_id);
      console.log(data);
      console.log(options);
      console.time(`${this.Model.modelName} findByIdAndUpdate`);
      return this.Model.findByIdAndUpdate(_id, data, options, (err, doc) => {
        console.timeEnd(`${this.Model.modelName} findByIdAndUpdate`);
        if (err) { return reject(err); }
        return resolve(doc);
      });
    });
  }

  findOneAndUpdate(query, data, options) {
    return new Promise((resolve, reject) => {
      console.log(chalk.green(`BaseProvider ${this.Model.modelName} findOneAndUpdate`));
      console.log(query);
      console.log(data);
      console.log(options);
      console.time(`${this.Model.modelName} findOneAndUpdate`);
      return this.Model.findOneAndUpdate(query, data, options, (err, doc) => {
        console.timeEnd(`${this.Model.modelName} findOneAndUpdate`);
        if (err) { return reject(err); }
        return resolve(doc);
      });
    });
  }

  save(data) {
    return new Promise((resolve, reject) => {
      console.log(chalk.green(`BaseProvider ${this.Model.modelName} save`));
      console.time(`${this.Model.modelName} save`);
      const model = new this.Model(data);
      return model.save((err, doc) => {
        console.timeEnd(`${this.Model.modelName} save`);
        if (err) { return reject(err); }
        return resolve(doc);
      });
    });
  }

  update(query, data, options) {
    return new Promise((resolve, reject) => {
      console.log(chalk.green(`BaseProvider ${this.Model.modelName} update`));
      console.log(query);
      console.log(data);
      console.log(options);
      console.time(`${this.Model.modelName} update`);
      return this.Model.update(query, data, options, err => {
        console.timeEnd(`${this.Model.modelName} update`);
        if (err) { return reject(err); }
        return resolve('update ok');
      });
    });
  }

  remove(query, data, options) {
    return new Promise((resolve, reject) => {
      console.log(chalk.green(`BaseProvider ${this.Model.modelName} remove`));
      console.log(query);
      console.log(data);
      console.log(options);
      console.time(`${this.Model.modelName} remove`);
      return this.Model.remove(query, err => {
        console.timeEnd(`${this.Model.modelName} remove`);
        if (err) { return reject(err); }
        return resolve('remove ok');
      });
    });
  }
};
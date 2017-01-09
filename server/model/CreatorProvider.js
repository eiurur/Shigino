const mongoose     = require('mongoose');
const BaseProvider = require('./BaseProvider');
let { Schema }     = mongoose;
let { ObjectId }   = Schema;

let CreatorSchema = new Schema({
  id_str: String,
  avater: String,
  fullname: String,
  username: String,
  created_at: {
    type: Date,
    default: Date.now()
  },
  updated_at: {
    type: Date,
    default: Date.now()
  }
});


CreatorSchema.index({id_str: -1, created_at: -1, updated_at: -1});

mongoose.model('Creator', CreatorSchema);

let Creator = mongoose.model('Creator');

module.exports = class CreatorProvider extends BaseProvider {

  constructor() {
    super(Creator);
  }

  findById(params) {
    return new Promise(function(resolve, reject) {
      return Creator.findOne({_id: params.CreatorObjectId})
      .exec(function(err, creator) {
        if (err) { return reject(err); }
        return resolve(creator);
      });
    });
  }

  findByUsername(params) {
    return new Promise(function(resolve, reject) {
      return Creator.findOne({username: params.username})
      .exec(function(err, creator) {
        if (err) { return reject(err); }
        return resolve(creator);
      });
    });
  }

  upsert(params) {
    return new Promise((resolve, reject) => {
      let query = {id_str: params.id_str};
      let data = Object.assign(params, {
        updated_at: Date.now()
      });
      let options = {'new': true, upsert: true};
      return resolve(this.findOneAndUpdate(query, data, options));
    });
  }
};
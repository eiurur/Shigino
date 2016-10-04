const mongoose     = require('mongoose');
const BaseProvider = require('./BaseProvider');
let { Schema }     = mongoose;
let { ObjectId }   = Schema;

let TweetSchema = new Schema({
  moment_id: {
    type: String,
    index: true,
    unique: true
  },
  expanded_url: {
    type: String,
    default: ''
  },
  avater: String,
  fullname: String,
  username: String,
  title: String,
  description: String,
  thumbnail: String,
  count: {
    type: Number,
    default: 0
  },
  created_at: {
    type: Date,
    default: Date.now()
  },
  updated_at: {
    type: Date,
    default: Date.now()
  }
});


TweetSchema.index({moment_id: -1, created_at: -1, updated_at: -1});

mongoose.model('Tweet', TweetSchema);

let Tweet = mongoose.model('Tweet');

module.exports = class TweetProvider extends BaseProvider {

  constructor() {
    super(Tweet);
  }

  find(params) {
    return new Promise(function(resolve, reject) {
      console.log(params);

      const condition = [Object.assign(params.query,
        {
          description: new RegExp(params.word, 'i'),
          title: new RegExp(params.word, 'i')
        }
      )];

      Promise.all([
        Tweet.find({'$or': condition}).limit(params.limit).skip(params.skip).sort(params.sort),
        Tweet.find({'$or': condition}).count().exec()
      ]).then( results => {
        console.log(results);
        return resolve({moments: results[0], count: results[1]});
      });
      // return Tweet.find({'$or': condition})
      // .limit(params.limit)
      // .skip(params.skip)
      // .sort(params.sort)
      // .exec(function(err, tweets) {
      //   if (err) { return reject(err); }
      //   return resolve(tweets);
      // });
    });
  }

  findByUsername(params) {
    return new Promise(function(resolve, reject) {

      Promise.all([
        Tweet.find({username: params.username}).limit(params.limit).skip(params.skip).sort(params.sort),
        Tweet.find({username: params.username}).count().exec()
      ]).then( results => {
        console.log(results);
        return resolve({moments: results[0], count: results[1]});
      });
      // return Tweet.find({username: params.username})
      // .limit(params.limit)
      // .skip(params.skip)
      // .sort(params.sort)
      // .exec(function(err, tweet) {
      //   if (err) { return reject(err); }
      //   return resolve(tweet);
      // });
    });
  }

  findByUrl(params) {
    return new Promise(function(resolve, reject) {
      return Tweet.findOne({username: params.findByUrl})
      .exec(function(err, tweet) {
        if (err) { return reject(err); }
        return resolve(tweet);
      });
    });
  }

  findById(params) {
    return new Promise(function(resolve, reject) {
      return Tweet.findOne({_id: params.TweetObjectId})
      .exec(function(err, tweet) {
        if (err) { return reject(err); }
        return resolve(tweet);
      });
    });
  }

  upsert(params) {
    return new Promise((resolve, reject) => {
      let query = {moment_id: params.moment_id};
      let data = Object.assign(params, {
        updated_at: Date.now(),
        $inc: { count: 1}
      });
      let options = {'new': true, upsert: true};
      return resolve(this.findOneAndUpdate(query, data, options));
    });
  }
};
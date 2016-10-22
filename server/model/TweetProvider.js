const mongoose     = require('mongoose');
const moment       = require('moment');
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
  tweeted_at: {
    type: Date,
    default: Date.now()
  },
  updated_at: {
    type: Date,
    default: Date.now()
  }
});


TweetSchema.index({moment_id: -1, created_at: -1, updated_at: -1, tweeted_at: -1});

mongoose.model('Tweet', TweetSchema);

let Tweet = mongoose.model('Tweet');

module.exports = class TweetProvider extends BaseProvider {

  constructor() {
    super(Tweet);
  }

  find(params) {
    return new Promise(function(resolve, reject) {
      console.log(params);

      let condition = (Object.keys(params.query).length) ? [params.query] : [];
      if(params.word){
        condition.push({description: new RegExp(params.word, 'i')});
        condition.push({title: new RegExp(params.word, 'i')});
      }
      if(condition.length === 0) condition = [{}];

      console.log(condition);

      Promise.all([
        Tweet.find({'$or': condition}).limit(params.limit).skip(params.skip).sort(params.sort),
        Tweet.find({'$or': condition}).count().exec()
      ]).then( results => {
        return resolve({moments: results[0], count: results[1]});
      });
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

  findByTerm(params) {
    return new Promise( (resolve, reject) => {

      switch (params.term) {
        case 'day':
          var begin = moment(params.date).format();
          var end = moment(params.date).add(1, 'days').format();
          break;
        case 'week':
          begin = moment(params.date).format();
          end = moment(params.date).add(1, 'weeks').format();
          break;
        case 'month':
          begin = moment(params.date).date(1).format();
          end = moment(params.date).add(1, 'months').date(1).format();
          break;
        case 'year':
          begin = moment(params.date).date(1).format();
          end = moment(params.date).add(1, 'years').date(1).format();
          break;
        default:
          begin = moment().format();
          end = moment().add(1, 'days').format();
      }

      let condition = [{
        tweeted_at: {
          $gte: begin,
          $lt: end
        }
      }];

      console.log('condition = ', condition);

      Tweet.find({"$and": condition})
      .limit(params.limit)
      .skip(params.skip)
      .sort(params.sort)
      .exec(function(err, tweets) {
        if (err) { return reject(err); }
        return resolve(tweets);
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
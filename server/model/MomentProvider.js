const mongoose     = require('mongoose');
const moment       = require('moment');
const BaseProvider = require('./BaseProvider');
let { Schema }     = mongoose;
let { ObjectId }   = Schema;

let MomentSchema = new Schema({
  moment_id: {
    type: String,
    index: true,
    unique: true
  },
  expanded_url: {
    type: String,
    default: ''
  },
  createdBy: {
    type: ObjectId,
    ref: 'Creator',
    index: true
  },
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


MomentSchema.index({moment_id: -1, created_at: -1, updated_at: -1, tweeted_at: -1});

mongoose.model('Moment', MomentSchema);

let Moment = mongoose.model('Moment');

module.exports = class MomentProvider extends BaseProvider {

  constructor() {
    super(Moment);
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
        Moment.find({'$or': condition}).limit(params.limit).skip(params.skip).sort(params.sort).populate('createdBy'),
        Moment.find({'$or': condition}).count().exec()
      ]).then( results => {
        return resolve({moments: results[0], count: results[1]});
      });
    });
  }

  findByCreator(params) {
    return new Promise(function(resolve, reject) {

      Promise.all([
        Moment.find({createdBy: params.createdBy}).limit(params.limit).skip(params.skip).sort(params.sort).populate('createdBy'),
        Moment.find({createdBy: params.createdBy}).count().exec()
      ]).then( results => {
        console.log(results);
        return resolve({moments: results[0], count: results[1]});
      });
    });
  }

  findByUrl(params) {
    return new Promise(function(resolve, reject) {
      return Moment.findOne({url: params.url}).populate('createdBy')
      .exec(function(err, tweet) {
        if (err) { return reject(err); }
        return resolve(tweet);
      });
    });
  }

  findById(params) {
    return new Promise(function(resolve, reject) {
      return Moment.findOne({moment_id: params.moment_id}).populate('createdBy')
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
          var begin = moment(params.date).add(-1, 'days').format();
          var end = moment(params.date).format();
          break;
        case 'week':
          begin = moment(params.date).add(-1, 'weeks').format();
          end = moment(params.date).format();
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



      Promise.all([
        Moment.find({'$and': condition}).limit(params.limit).skip(params.skip).sort(params.sort).populate('createdBy'),
        Moment.find({'$and': condition}).count().exec()
      ]).then( results => {
        return resolve({moments: results[0], count: results[1]});
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
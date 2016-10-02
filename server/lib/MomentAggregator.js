
require('dotenv').config();
const twit = require('twit');
const path = require('path');
const client = require('cheerio-httpcli');
const ModelProviderFactory = require(path.resolve('server', 'model', 'ModelProviderFactory'));


module.exports = class MomentAggregator {
  constructor() {
    this.T = new twit({
        consumer_key: process.env.CONSUMER_KEY
      , consumer_secret: process.env.CONSUMER_SECRET
      , access_token: process.env.ACCESS_TOKEN
      , access_token_secret: process.env.ACCESS_TOKEN_SECRET
    });
    this.keyword = "moments";
    this.TweetProvider = ModelProviderFactory.create('Tweet');
  }

  isMomentTweet(tweet) {
    return tweet.entities.urls.some( tweet_url => {
      return tweet_url.expanded_url.indexOf('https://twitter.com/i/moments/') !== -1;
    });
  }

  getMomentTweet(tweet) {
    return tweet.entities.urls.find(url => {
      return url.expanded_url.indexOf('https://twitter.com/i/moments/') !== -1;
    });
  }

  scrapeMomentInfo(momentUrl) {
    return new Promise( (resolve, reject) => {
      client.fetch(momentUrl)
      .then(function (result) {
        const info = {
          avater: result.$('.MomentCapsuleCover-details .MomentUserByline-avatar').attr('src'),
          fullname: result.$('.MomentCapsuleCover-details .MomentUserByline-fullname').text(),
          username: result.$('.MomentCapsuleCover-details .MomentUserByline-username').text(),
          description: result.$('.MomentCapsuleCover-details .MomentCapsuleCover-description').text(),
          thumnail: result.$('.MomentCapsuleCover-media .MomentMediaItem-entity--image').attr('src'),
        };

        return resolve(info);
      })
      .catch( err => reject(err) );
    });
  }

  openStream() {
    this.stream = this.T.stream('statuses/filter', {'track': this.keyword, 'language': 'ja'});
    this.stream.on('tweet', (tweet) => {
      console.log(tweet.entities.urls);

      if (!this.isMomentTweet(tweet)) return;

      console.log(tweet);
      console.log(this.getMomentTweet(tweet));
      const moment_expanded_url = this.getMomentTweet(tweet).expanded_url;

      this.scrapeMomentInfo(moment_expanded_url)
      .then( momentInfo => {
        console.log('momentInfo = ', momentInfo);
        console.log('moment_expanded_url.split('/').pop() = ', moment_expanded_url.split('/').pop());


        const opts = {
          moment_id: moment_expanded_url.split('/').pop(),
          expanded_url: moment_expanded_url,
          avater: momentInfo.avater,
          fullname: momentInfo.fullname,
          username: momentInfo.username,
          description: momentInfo.description,
          thumnail: momentInfo.thumnail,
        };
        this.TweetProvider.upsert(opts);
      });

    });
  }
};

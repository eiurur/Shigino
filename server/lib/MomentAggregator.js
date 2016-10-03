
require('dotenv').config();
const twit                 = require('twit');
const path                 = require('path');
const client               = require('cheerio-httpcli');
const ModelProviderFactory = require(path.resolve('server', 'model', 'ModelProviderFactory'));
const MorphologicalAnalyzer = require(path.resolve('server', 'lib', 'MorphologicalAnalyzer'));


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

  includeUrl(tweet) {
    return tweet.entities.urls.expanded_url !== null;
  }

  isMomentTweet(tweet) {
    return tweet.entities.urls.some( tweet_url => {
      if (!tweet_url.expanded_url) return false;
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
          username: result.$('.MomentCapsuleCover-details .MomentUserByline-username').text().replace('@', ''),
          title: result.$('.MomentCapsuleCover-title').text(),
          description: result.$('.MomentCapsuleCover-details .MomentCapsuleCover-description').text(),
          thumbnail: result.$('.MomentCapsuleCover-media .MomentMediaItem-entity--image').attr('src'),
        };

        return resolve(info);
      })
      .catch( err => reject(err) );
    });
  }

  openStream() {
    this.stream = this.T.stream('statuses/filter', {'track': this.keyword, 'language': 'ja'});
    this.stream.on('tweet', (tweet) => {
      // console.log(tweet.entities.urls);


      if (!this.isMomentTweet(tweet)) return;

      // console.log(tweet);
      const moment_expanded_url = this.getMomentTweet(tweet).expanded_url;

      this.scrapeMomentInfo(moment_expanded_url)
      .then( momentInfo => {
        const opts = {
          moment_id: moment_expanded_url.split('/').pop(),
          expanded_url: moment_expanded_url,
          avater: momentInfo.avater,
          fullname: momentInfo.fullname,
          username: momentInfo.username,
          title: momentInfo.title,
          description: momentInfo.description,
          thumbnail: momentInfo.thumbnail,
        };
        // console.log(MorphologicalAnalyzer.tokenize(momentInfo.description).then( result => console.log(result) ).catch(err => console.log(err) ));
        this.TweetProvider.upsert(opts);
      });

    });
  }
};

const twit                 = require('twit');
const path                 = require('path');
const client               = require('cheerio-httpcli');
const ModelProviderFactory = require(path.resolve('server', 'model', 'ModelProviderFactory'));
const TimeConverter        = require(path.resolve('server', 'lib', 'TimeConverter'));

if(process.env.NODE_ENV === 'development')
  require('dotenv').config();

module.exports = class MomentAggregator {
  constructor() {
    this.T = new twit({
        consumer_key: process.env.CONSUMER_KEY
      , consumer_secret: process.env.CONSUMER_SECRET
      , access_token: process.env.ACCESS_TOKEN
      , access_token_secret: process.env.ACCESS_TOKEN_SECRET
    });
    this.keyword = "moments";
    this.MomentProvider = ModelProviderFactory.create('Moment');
    this.CreatorProvider = ModelProviderFactory.create('Creator');
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
          tweeted_at: result.$('.MomentCapsuleCover-details .MomentCapsuleSubtitle-context').text().trim(),
        };

        return resolve(info);
      })
      .catch( err => reject(err) );
    });
  }

  openStream() {
    this.stream = this.T.stream('statuses/filter', {'track': this.keyword, 'language': 'ja'});
    this.stream.on('tweet', (tweet) => {

      if (!this.isMomentTweet(tweet)) return;

      const moment_expanded_url = this.getMomentTweet(tweet).expanded_url;
      const creator_id_str = (tweet.retweeted_status) ? tweet.retweeted_status.user.id_str :  tweet.user.id_str;

      this.scrapeMomentInfo(moment_expanded_url)
      .then( momentInfo => {
        const creatorOpts = {
          id_str: creator_id_str,
          avater: momentInfo.avater,
          fullname: momentInfo.fullname,
          username: momentInfo.username,
        };
        const momentOpts = {
          moment_id: moment_expanded_url.split('/').pop(),
          expanded_url: moment_expanded_url,
          title: momentInfo.title,
          description: momentInfo.description,
          thumbnail: momentInfo.thumbnail,
          tweeted_at: TimeConverter.toNow(momentInfo.tweeted_at),
        };

        // 公式モーメントはusernameが空。
        // 公式モーメントを収集するとランキングがぶっ壊れる、見てもつまらないので保存しない。
        if(!momentInfo.username) return;

        this.CreatorProvider.upsert(creatorOpts)
        .then( (result) => {
          const opts = Object.assign(momentOpts, {createdBy: result._id});
          console.log('opts = ', opts);
          this.MomentProvider.upsert(opts);
        })
        .catch( (err) => console.log(err) );
      });

    });
  }
};

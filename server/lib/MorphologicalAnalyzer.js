const path = require('path');
const kuromoji = require('kuromoji');
const DIC_DIR = path.resolve('node_modules', 'kuromoji', 'dict');

module.exports = class MorphologicalAnalyzer {
  static tokenize(text) {
    return new Promise((resolve, reject) => {
      kuromoji.builder({ dicPath: DIC_DIR }).build((err, tokenizer) => {
        if(err) {
          reject(err);
          return;
        }

        // 形態素解析
        const tweetTokened = tokenizer.tokenize(text);
        console.log('tweetTokened => ', tweetTokened);

        // 名詞だけ取り出す。
        const nouns = tweetTokened.filter(token => token.pos === '名詞' || token.pos_detail_1 === '固有名詞').map(value => value['surface_form']);
        return resolve(nouns);
      });
    });

  }

};

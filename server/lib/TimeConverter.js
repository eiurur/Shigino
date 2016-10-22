const moment = require('moment');

module.exports = class TimeConverter {
  static fromNow() {

  }

  static convertPeriod(period) {
    period = period.replace('前', '');
    switch(period) {
      case '分': return 'minutes';
      case '時間': return 'hours';
      default: return null;
    }
  }

  static zeroPadding(num, lowerDigit) {
    if(num.toString().length >= lowerDigit) return num;
    const zero = '0'.repeat(lowerDigit);
    return (zero + num).slice(-lowerDigit);
  }

  /**
   * [toNow description]
   * 1 分前 ->
   * 1 時間前 ->
   * @param  {[type]} time [description]
   * @return {[type]}      [description]
   */
  static toNow(time) {

    const parsedTime = /(\d+)\+?\s([ぁ-んァ-ヶー一-龠]+)/ig.exec(time);

    console.log(time);
    console.log(parsedTime);

    // 「昨日」
    if(time === '昨日') return moment().subtract(1, 'days').format();

    // 日付確定 「2016年10月10日」 -> 2016-10-10
    if(parsedTime === null) {
      const date = time.replace('年', '-').replace('月', '-').replace('日', '');
      const zeroPaddingDate = date.split('-').map(n => this.zeroPadding(n, 2)).join('-');
      return moment(zeroPaddingDate).format();
    }

    // それ以外 「1分前」、「1時間前」
    console.log(parsedTime[1]);
    console.log(parsedTime[2]);
    console.log(this.convertPeriod(parsedTime[2]));
    return moment().subtract(parsedTime[1], this.convertPeriod(parsedTime[2])).format();
  }
};
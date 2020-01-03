const { config } = require('./config.js');
// 隐藏会员支付内容，方便过审
global.checking = false;

const reviewTime = 202001010; // 最迟审核通过时间

function getTime() {
  const time = new Date();
  let year = time.getFullYear(),
    month = time.getMonth() + 1,
    day = time.getDate();
  function format(num) {
    num = '' + num;
    return num[1] !== undefined ? num : ('0' + num);
  }
  return Number('' + year + format(month) + format(day));
}

function ver() {
  return new Promise((reslove, reject) => {
    if (getTime() < reviewTime) {
      wx.cloud.callFunction({
        name: 'reviewHideHandler',
        data: {
          version: config.version
        },
        success: ({ result }) => {
          console.log(config.version, !!result.review);
          global.checking = !!result.review;
          reslove();
        }
      });
    } else {
      reslove();
    }
  })
}
// 如果当前时间比最迟审核通过时间早，那就拉取线上的开关文件
// 如果每次都拉取，会浪费云函数使用资源

module.exports = { ver };

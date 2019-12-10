// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  // const wxContext = cloud.getWXContext()
  let url = event.url;
  // return {
  //   event,
  //   openid: wxContext.OPENID,
  //   appid: wxContext.APPID,
  //   unionid: wxContext.UNIONID,
  // }
  try {
    const res = await cloud.openapi.security.imgSecCheck({
      media: {
        header: { 'Content-Type': 'application/octet-stream' },
        contentType: 'image/png',
        value: Buffer.from(url)
      }
    })
    return res
  } catch (err) {
    return err
  }
}
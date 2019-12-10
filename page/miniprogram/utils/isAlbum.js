const APP = getApp();
function isText(text) {
  if (APP.globalData.isAdmin === 1) {//如果是管理员，不走审核
    return Promise.resolve(true);
  } else {
    return new Promise((resolve, reject) => {
      wx.showLoading({
        title: '文字初审中...',
        mask: true
      });
      wx.cloud.callFunction({
        name: "isText",
        data: {
          text
        }
      }).then(res => {
        wx.hideLoading()
        if (res.result.errCode != 87014) {
          resolve(true)
        } else {
          resolve(false)
        }
      })
    })
  }
}

function funA(url) {//转为本地路径
  return new Promise((resolve, reject) => {
    wx.getFileSystemManager().readFile({
      filePath: url,
      //encoding: 'utf-8',
      success: res => {
        resolve(res)
      },
      fail: reject
    })
  })

}
function isAlbumGF(url) {//进行检验
  
  //return Promise.resolve(true);//关闭图片审核
  wx.showLoading({
    title: '图片审核...',
    mask: true
  })
  return funA(url).then(res => {
    
    return new Promise((resolve, reject) => {
      wx.cloud.callFunction({
        name: "isAlbum",
        data: {
          url: res.data
        }
      }).then(res => {
        console.log(res)
        wx.hideLoading();
        if (res.result.errCode != 87014) {
          resolve(true)
        } else {
          APP.toastS("此照片存在违规可能，请更换照片！")
          reject(res)
        }
      })
    })
  })

}
export default {
  isText,
  isAlbumGF
}
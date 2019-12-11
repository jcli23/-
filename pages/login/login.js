const app = getApp()        
Page({

  /**
   * 页面的初始数据
   */
  data: {
    num:0,
    id:0,
    phonenum:null,
    password:null,
    email:null
  },
  exchage(e){          //该登录方式样式
    this.setData({
      num: e.currentTarget.dataset.num
    })
  },
  bindblur1(e){
    this.setData({
      phonenum: e.detail.value
    })
    console.log(this.data.phonenum)
  },
  bindblur2(e) {
    this.setData({
      password: e.detail.value
    })
    console.log(this.data.password)
  },
  bindblur5(e) {
    this.setData({
      email: e.detail.value
    })
    console.log(this.data.email)
  },
  login() {             //立即登录
    app.globalData.fly.get(`/login/cellphone?phone=${this.data.phonenum}&password=${this.data.password}`).then(res => {
      if (res.data.code===200){
        wx.setStorageSync('id', res.data.account.id)
        wx.switchTab({
          url: `/pages/me/me`,
        })
      }
      console.log(res)
    }).catch(err => {
      if(res.code===502){
        wx.showToast({
          title: '密码错误',
        })
      }
      console.log(err)
    })
  },
  emaillogin() {             //立即登录
    app.globalData.fly.get(`/login?email=${this.data.email}&password=${this.data.password}`).then(res => {
      if (res.data.code === 200) {
        wx.setStorageSync('id', res.data.account.id)
        wx.switchTab({
          url: `/pages/me/me`,
        })
      }
      console.log(res)
    }).catch(err => {
      if (res.code === 502) {
        wx.showToast({
          title: '密码错误',
        })
      }
      console.log(err)
    })
  },
  gotophone(){             //注册跳转手机号注册
    wx.navigateTo({
      url: `/pages/phone_registration/phone_registration`
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
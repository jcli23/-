const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phonenum:null,
    captcha:null,
    password:null,
    nickname:null,
    exist:0
  },
  bindblur1(e){         //接收手机号
    console.log(e)
    this.setData({
      phonenum: e.detail.value
    })
    this.checkphone()       //检验手机号是否已注册
    console.log(this.data.phonenum)
  },
  bindblur2(e) {         //接收密码
    this.setData({
      password: e.detail.value
    })
    console.log(this.data.password)
  },
  getcaptcha(){
    this.captcha()
  },
  captcha() {   
    //获取验证码
    app.globalData.fly.get(`/captcha/sent?phone=${this.data.phonenum}`).then(res => {
      console.log(res)
    }).catch(err => {
      console.log(err)
    })
  },
  checkphone() {             //检验手机号是否注册
    app.globalData.fly.get(`/cellphone/existence/check?phone=${this.data.phonenum}`).then(res => {
      if (res.data.exist === 1) {
        wx.showToast({
          title: '该号已注册',
        })
      }
      if (res.data.exist === -1) {
        wx.showToast({
          title: '该号可注册',
        })
      }
      console.log(res)
    }).catch(err => {
      console.log(err)
    })
  },
  bindblur3(e) {             //接收输入框验证码
    this.setData({
      captcha: e.detail.value
    })
    console.log(this.data.captcha)
  },
  bindblur4(e) {             //接收输入框昵称
    this.setData({
      nickname: e.detail.value
    })
    console.log(this.data.nickname)
  },
  checkcaptcha() {             //检查验证码
    app.globalData.fly.get(`/captcha/verify?phone=${this.data.phonenum}&captcha=${this.data.captcha}`).then(res => {
      if(res===200){
          
      }
    }).catch(err => {
      console.log(err)
    })
  },
  register(){
     //检查验证码
    app.globalData.fly.get(`/captcha/verify?phone=${this.data.phonenum}&captcha=${this.data.captcha}`).then(res => {
      if (res === 200) {
        app.globalData.fly.get(`/register/cellphone?phone=${this.data.phonenum}&password=${this.data.password}&captcha=${this.data.captcha}&nickname=${this.data.nickname}`).then(res => {
          console.log
        }).catch(err => {
          console.log(err)
        })
      }
    }).catch(err => {
      console.log(err)
    })
  },
  tologin(){
    wx.navigateTo({
      url: '/pages/login/login'
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
const app = getApp()   
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:0,          //装用户id
    user:{}        //装用户信息
  },
  login(){            //未登录时跳转登录页
    wx.navigateTo({
      url: `/pages/login/login`,
    })
  },
  user() {             //获取用户数据
    wx.showLoading({
      title: '加载中...',
    })
    app.globalData.fly.get(`/user/detail?uid=${this.data.id}`).then(res => {
      wx.hideLoading()
      console.log(wx.getStorageSync('userdata'))
      if (!(wx.getStorageSync('userdata')) === true) {    //如果无修改历史，正常接收线上id
        let user = res.data
        this.setData({
          user,
          nickname: res.data.profile.nickname
        })
      }else{                                //修改过，名称则用修改过的，同时其他数据同为线上数据
        this.setData({
          user:res.data,
          nickname:wx.getStorageSync('userdata')[0]
        })
      }
      console.log(this.data.user)
    }).catch(err => {
      console.log(err)
      wx.hideLoading()
    })
  },
  loginout(){          //退出登录
    app.globalData.fly.get(`/logout`).then(res => {
      if(res.data.code===200){
        this.setData({
          id:0
        })
        wx.setStorageSync('id', 0)
      }
    }).catch(err => {
      console.log(err)
    })
  },
  editmsg(){              //修改数据传值和跳转
    let nickname = this.data.user.profile.nickname
    let gender = this.data.user.profile.gender
    let birthday = this.data.user.profile.birthday
    let city = this.data.user.profile.city
    let signature = this.data.user.profile.signature
    let province = this.data.user.profile.province
    wx.navigateTo({
      url: `/pages/edit/edit?&nickname=${nickname}&gender=${gender}&birthday=${birthday}&city=${city}&signature=${signature}&province=${province}`,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let id = wx.getStorageSync('id')
    this.setData({
      id
    })
    if(!id){
      this.setData({
        id:0
      })
    }
    if (this.data.id !== 0) {     //如果登录，获取数据
      console.log(111)
      this.user()
    }
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let id = wx.getStorageSync('id')     //每次进入都刷新
    this.setData({
      id
    })
    if (!id) {
      this.setData({
        id: 0
      })
    }
    if (this.data.id !== 0) {
      this.user()
    }
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
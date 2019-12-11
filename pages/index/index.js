//index.js
//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    indicatorDots: true,
    vertical: true,
    autoplay: true,
    interval: 3000,
    banner:[],            //装轮播图数据
    searchopen:false
  },
  banner(){             //获取轮播图
    wx.showLoading({
      title: '加载中...',
    })
    app.globalData.fly.get(`/banner`).then(res=>{
      wx.hideLoading()
      let banner=res.data.banners
      this.setData({
        banner
      })
      // console.log(this.data.banner)
    }).catch(err=>{
      console.log(err)
      wx.hideLoading()
    })
  },
  open(){
    this.setData({
      searchopen: !this.data.searchopen
    })
  },
  close(e){
    this.setData({
      searchopen:e.detail.opensearch
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.banner()
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
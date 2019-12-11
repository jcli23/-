const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:'',
    idlist:[],
    album:{},
    songs:[],
    subCount:0
  },
  dish() {             //获取轮播图
    wx.showLoading({
      title: '加载中...',
    })
    app.globalData.fly.get(`/album?id=${this.data.id}`).then(res => {
      wx.hideLoading()
      res.data.songs.map(item => {
        this.data.idlist.push({ id: item.id })
      })
      this.setData({
        album:res.data.album,
        songs:res.data.songs,
        idlist:this.data.idlist
      })
      console.log(res)
      console.log(this.data.idlist)
      console.log(this.data.album)
      console.log(this.data.songs)
    }).catch(err => {
      console.log(err)
      wx.hideLoading()
    })
  },
  dish_detail() {             
    wx.showLoading({
      title: '加载中...',
    })
    app.globalData.fly.get(`/album/detail/dynamic?id=${this.data.id}`).then(res => {
      wx.hideLoading()
      this.setData({
        subCount: res.data.subCount
      })
      if (this.data.subCount > 100000) {
        Math.floor(this.data.subCount / 10000)
        this.data.subCount = Math.floor(this.data.subCount / 10000) + '万'
      }
      this.setData({
        subCount: this.data.subCount
      })
      console.log()
    }).catch(err => {
      console.log(err)
      wx.hideLoading()
    })
  },
  chage(e) {
    this.setData({
      play: e.currentTarget.dataset.index,
    })
    wx.setStorageSync('index', this.data.play)
    wx.setStorageSync('idlist', this.data.idlist)
    wx.navigateTo({
      url: '/pages/songplay/songplay',
    })
  },
  back() {
    wx.navigateBack({
      delta: 1,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id: options.id
    })
    this.dish()
    this.dish_detail()
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
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:'',
    picUrl:'',
    name:'',
    num:0,
    idlist:[],
    hotsongs:[],
    briefDesc:''
  },
  details(){
    app.globalData.fly.get(`/artist/desc?id=${this.data.id}`).then(res => {
      wx.hideLoading()
      
      // console.log(res)
      
    }).catch(err => {
      console.log(err)
      wx.hideLoading()
    })
  },
  hot() {
    app.globalData.fly.get(`/artists/top/song?id=${this.data.id}`).then(res => {
      wx.hideLoading()
      res.data.hotSongs.map(item=>{
        this.data.idlist.push({ id: item.id })
      })
      this.setData({
        picUrl: res.data.artist.picUrl,
        name: res.data.artist.name,
        hotsongs: res.data.hotSongs.slice(0,6),
        briefDesc: res.data.artist.briefDesc,
        idlist:this.data.idlist
      })
      console.log(this.data.hotsongs)
      // console.log(res)
    }).catch(err => {
      console.log(err)
      wx.hideLoading()
    })
  },
  back(){
    wx.navigateBack({
      delta: 1,
    })
  },
  num(e){
    this.setData({
      num: e.currentTarget.dataset.num
    })
  },
  chage(e){
    this.setData({
      play: e.currentTarget.dataset.index,
    })
    wx.setStorageSync('idlist', this.data.idlist)
    wx.setStorageSync('index', this.data.play)
    wx.navigateTo({
      url: '/pages/songplay/songplay'
    })
  },
  playhot(e) {
    this.setData({
      play: 0
    })
    wx.setStorageSync('idlist', this.data.idlist)
    wx.setStorageSync('index', this.data.play)
    wx.navigateTo({
      url: '/pages/songplay/songplay'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      id: options.id,        //接收歌手id
    })
    this.details()
    this.hot()
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
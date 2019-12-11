// pages/singer/singer.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    item:'',
    id:'',
    num:0,
    num2:0,
    singer: [{
      name: "入驻歌手",
      id: "5001"
    },
    {
      name: "华语男歌手",
      id: "1001"
    },
    {
      name: "华语女歌手",
      id: "1002"
    },
    {
      name: "华语组合/乐队",
      id: "1003"
    },
    {
      name: "欧美男歌手",
      id: "2001"
    },
    {
      name: "欧美女歌手",
      id: "2002"
    },
    {
      name: "欧美组合/乐队",
      id: "2003"
    },
    {
      name: "日本男歌手",
      id: "6001"
    },
    {
      name: "日本女歌手",
      id: "6002"
    },
    {
      name: "日本组合/乐队",
      id: "6003"
    },
    {
      name: "韩国男歌手",
      id: "7001"
    },
    {
      name: "韩国女歌手",
      id: "7002"
    },
    {
      name: "韩国组合/乐队",
      id: "7003"
    },
    {
      name: "其他男歌手",
      id: "4001"
    },
    {
      name: "其他女歌手",
      id: "4002"
    },
    {
      name: "其他组合/乐队",
      id: "4003"
    },
    ],
    letter: ["热", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
  },
  click(e){
    this.setData({
      num: e.currentTarget.dataset.num,
      id: e.currentTarget.dataset.id,
      num2:0
    })
    this.artist()
  },
  click2(e) {
    this.setData({
      num2: e.currentTarget.dataset.num2,
      item: e.currentTarget.dataset.item
    })
    this.artist()
  },
  artist() {             //获取歌手列表
    wx.showLoading({
      title: '加载中...',
    })
    if(this.data.item==='热'){
      app.globalData.fly.get(`/artist/list?cat=${this.data.id}`).then(res => {
        wx.hideLoading()
        let artist = res.data.artists
        this.setData({
          artist
        })
        // console.log(res)
        console.log(this.data.artist)
      }).catch(err => {
        console.log(err)
        wx.hideLoading()
      })
    } else {                //获取歌手列表   
      app.globalData.fly.get(`/artist/list?cat=${this.data.id}&initial=${this.data.item}`).then(res => {
        wx.hideLoading()
        let artist = res.data.artists
        this.setData({
          artist
        })
        // console.log(res)
        console.log(this.data.artist)
      }).catch(err => {
        console.log(err)
        wx.hideLoading()
      })
    }
  },
  goto(e){
    this.setData({
      id: e.currentTarget.dataset.id
    })
    wx.navigateTo({
      url: `/pages/singer_details/singer_details?id=${this.data.id}`,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.artist()
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
const app = getApp()
let timejs = require("../../utils/util.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:0,
    djradio:{},
    num:0,
    limit:40,
    offset:0,
    asc: false,
    count:0,
    programs:[],
  },
  back() {
    wx.navigateBack({
      delta: 1,
    })
  },
  radio() {             //获取电台详情
    app.globalData.fly.get(`/dj/detail?rid=${this.data.id}`).then(res => {
      wx.hideLoading()
      if (res.data.djRadio.subCount > 100000) {     //处理订阅数字
        Math.floor(res.data.djRadio.subCount / 10000)
        res.data.djRadio.subCount = (res.data.djRadio.subCount / 10000).toFixed(1) + '万'
      }
      this.setData({
        djradio: res.data.djRadio
      })
      // console.log(this.data.djradio)
    }).catch(err => {
      console.log(err)
      wx.hideLoading()
    })
  },
  program() {                 //获取电台节目数据
    app.globalData.fly.get(`/dj/program?rid=${this.data.id}&limit=${this.data.limit}&offset=${this.data.offset}&asc=${this.data.asc}`).then(res => {
      wx.hideLoading()
      res.data.programs.map(item=>{
        item.createTime=timejs.formatTimeThree(item.createTime, 'M-D')
        let next = ((item.duration/1000) % 60).toFixed(0)
        item.duration = `${Math.floor((item.duration/1000)/60)}:${next}`
        if (item.listenerCount>100000){
          item.listenerCount = (item.listenerCount/10000).toFixed(1)+'万'
        }
      })
      this.setData({
        count:res.data.count,
        programs: this.data.programs.concat(res.data.programs),
        createtime: this.data.createtime
      })
      console.log(this.data.programs)
    }).catch(err => {
      console.log(err)
      wx.hideLoading()
    })
  },
  num(e) {
    this.setData({
      num: e.currentTarget.dataset.num
    })
  },
  chageasc(){
    this.setData({
      programs:[],
      limit: 40,
      offset: 0,
      asc: !this.data.asc
    })
    this.program(this.data.limit,this.data.offset,this.data.asc)
  },
  lower(){         
    this.setData({
      offset: this.data.offset + this.data.limit
    })
    this.program(this.data.id, this.data.offse, this.data.asc)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id: options.id
    })
    // console.log(this.data.id)
    this.radio()
    this.program()
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
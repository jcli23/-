const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value:'',
    realkeyword:'',
    keywords:[],
    active:''
  },
  keydefault() {        //获取默认推荐
    wx.showLoading({
      title: '加载中...',
    })
    app.globalData.fly.get(`/search/default`).then(res => {
      wx.hideLoading()
      this.setData({
        realkeyword: res.data.data.realkeyword
      })
      // console.log(res)
      // console.log(this.data.program)
    }).catch(err => {
      console.log(err)
      wx.hideLoading()
    })
  },
  keywords() {        //获取推荐搜索
    wx.showLoading({
      title: '加载中...',
    })
    app.globalData.fly.get(`/search/suggest?keywords=${this.data.value}&type=mobile`).then(res => {
      wx.hideLoading()
      this.setData({
        keywords: res.data.result.allMatch
      })
    }).catch(err => {
      console.log(err)
      wx.hideLoading()
    })
  },
  back() {
    wx.navigateBack({
      delta: 1,
    })
  },
  result() {        //获取推荐搜索
    wx.showLoading({
      title: '加载中...',
    })
    app.globalData.fly.get(`/search/multimatch?keywords=${this.data.value}`).then(res => {
      wx.hideLoading()
      // console.log(res)
    }).catch(err => {
      console.log(err)
      wx.hideLoading()
    })
  },
  onChange(e) {                //输入框change事件
    // this.setData({
    //   value: e.detail
    // })
    if ((this.data.value).trim() !== '') {
      this.setData({ show: true });       //输入框有值，打开关键字弹出层
      this.keywords()
    } else {
      this.setData({ show: false });      //输入框无值，关闭关键字弹出层
    }
  },
  choose(e) {
    this.setData({ show: false });    //点击推荐关闭关键字弹出层
    this.setData({
      value: e.currentTarget.dataset.keyword           //给value赋值
    })
    let searchlist = wx.getStorageSync('searchlist')    //获取历史搜索
    if (!searchlist) {                          //搜索无值，创立历史
      let searchlist = []
      searchlist.unshift(this.data.value.trim())
      wx.setStorageSync('searchlist', searchlist)
    } else {                                     //有值则添加进去
      if (searchlist.indexOf(this.data.value.trim()) === -1)
        searchlist.unshift(this.data.value)
      wx.setStorageSync('searchlist', searchlist)
    }
  },
  confirm(e) {
    this.setData({ show: false });      //确认后，关闭关键字弹出层
    if ((this.data.value).trim() !== '') {        //输入框有输入值，value取值为用户输入值
      this.setData({
        value: e.detail
      })
    } else {                             //输入框无输入值，value取值为推荐搜索值
      this.setData({
        value: e.currentTarget.dataset.realkeyword
      })
    }
    let searchlist = wx.getStorageSync('searchlist')    //获取历史搜索
    if (!searchlist) {                          //搜索无值，创立历史
      let searchlist = []
      searchlist.push(this.data.value)
      wx.setStorageSync('searchlist', searchlist)
    } else {                                     //有值则添加进去
      if (searchlist.indexOf(this.data.value.trim()) === -1)
        searchlist.unshift(this.data.value)
      wx.setStorageSync('searchlist', searchlist)
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      value: options.value
    })
    this.keydefault()
    this.result()
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
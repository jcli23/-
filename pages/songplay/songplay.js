         const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:0,
    index:0,
    idlist:[],
    song:'',
    author:'',
    num:0,
    play:false
  },
  getmusic() {
    app.globalData.fly.get(`/song/url?id=${this.data.id}`).then(res => {
      if (res) {
        this.setData({
          url: res.data.data[0].url
        })
        app.globalData.fly.get(`/song/detail?ids=${this.data.id}`).then(res => {
          if (res) {
            this.setData({
              songs: res.data.songs,
              song: res.data.songs[0].name,
              author:res.data.songs[0].ar[0].name,
              songcover: res.data.songs[0].al.picUrl
            })
            this.playmusic()
          }
        }).catch(err => {
          console.log(err)
        })
      }
    }).catch(err => {
      console.log(err)
    })
  },
  back() {
    wx.navigateBack({
      delta: 1,
    })
  },
  playmusic() {        //音乐播放
    const backgroundAudio = wx.getBackgroundAudioManager()
    backgroundAudio.title = this.data.song
    backgroundAudio.singer = this.data.author
    backgroundAudio.coverImgUrl = this.data.songcover
    backgroundAudio.src = this.data.url
    backgroundAudio.onTimeUpdate(() => {
      let first = (backgroundAudio.currentTime % 60).toFixed(0)
      let next = (backgroundAudio.duration % 60).toFixed(0)
      if (first.length < 2) {
        first = `0${(backgroundAudio.currentTime % 60).toFixed(0)}`
      }
      if (next.length < 2) {
        next = `0${(backgroundAudio.duration % 60).toFixed(0)}`
      }
      this.setData({
        percentage: Math.floor(backgroundAudio.currentTime / backgroundAudio.duration * 100),
        totalTime: `0${Math.floor(backgroundAudio.duration / 60)}:${next}`,
        currentTime: `0${Math.floor(backgroundAudio.currentTime / 60)}:${first}`
      })
      backgroundAudio.onEnded(() => {
        this.next()
      })
      // console.log(this.data.percentage)  //百分比
      // console.log(this.data.totalTime)   //总时长
      // console.log(this.data.currentTime)  //播放时长
    })
  },
  stop() {
    this.setData({
      num: 1
    })
    const backgroundAudio = wx.getBackgroundAudioManager()
    backgroundAudio.pause()
  },
  play() {
    this.setData({
      num: 0
    })
    const backgroundAudio = wx.getBackgroundAudioManager()
    backgroundAudio.play()
  },
  chagerandom(){
    this.setData({
      play: !this.data.play,
    })
  },
  last() {           //切换上一首
    if(this.data.play===false){
      if (this.data.index > 0) {
        this.setData({
          index: this.data.index - 1,
          id: wx.getStorageSync('idlist')[this.data.index - 1].id
        })
      } else {
        this.setData({
          id: this.data.id
        })
      }
      this.getmusic()
    }else{
      this.setData({
        index: Math.floor(Math.random() * (this.data.idlist.length - 1)),
        id: wx.getStorageSync('idlist')[Math.floor(Math.random() * (this.data.idlist.length - 1)) - 1].id
      })
      this.getmusic()
    }
    this.setData({
      num: 0
    }) 
  },
  next() {         //切换下一首
    if (this.data.play === false) {
    if (this.data.index < wx.getStorageSync('idlist').length - 1) {
      this.setData({
        index: this.data.index + 1,
        id: wx.getStorageSync('idlist')[this.data.index + 1].id
      })
    }
    this.getmusic()
    } else {
      this.setData({
        index: Math.floor(Math.random() * (this.data.idlist.length - 1)),
        id: wx.getStorageSync('idlist')[Math.floor(Math.random() * (this.data.idlist.length - 1)) - 1].id
      })
      this.getmusic()
    }
    this.setData({
      num: 0
    })
  },
  onChange(e) {
    let jump = e.detail
    const backgroundAudio = wx.getBackgroundAudioManager()
    let jumpTime = jump / 100 * backgroundAudio.duration
    backgroundAudio.seek(jumpTime)
    console.log(jumpTime)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      idlist:wx.getStorageSync('idlist'),
      index:wx.getStorageSync('index'),
      id: wx.getStorageSync('idlist')[wx.getStorageSync('index')].id
    })
    console.log(this.data.id)
    this.getmusic()
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
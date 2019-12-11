// pages/songlist_details/songlist_details.js
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    songid:0,
    id:0,
    url:'',
    copywriter:'',
    lock:true,
    num:0,
    playlist:{},
    play: -1,
    songindex:0,
    songcover:'',         
    index:0,         //歌曲列表序列号
    song:'',         //歌曲名
    author:'',       //歌曲作者
    idlist:[]
  },
  playlist() {             //获取歌单列表
    wx.showLoading({
      title: '加载中...',
    })
    app.globalData.fly.get(`/playlist/detail?id=${this.data.id}`).then(res => {
      wx.hideLoading()
      let playlist = res.data.playlist
      this.setData({
        playlist,
        idlist: res.data.playlist.trackIds
      })

      if (res.data.playlist.subscribedCount > 100000) {
        Math.floor(res.data.playlist.subscribedCount / 10000)
        res.data.playlist.subscribedCount = Math.floor(res.data.playlist.subscribedCount / 10000) + '万'
        }
        this.setData({
          playlist: this.data.playlist
        })
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
  audioPlay: function () {      //音乐播放
    this.setData({
      lock:true
    })
    const backgroundAudio = wx.getBackgroundAudioManager()
    backgroundAudio.play()
  },
  audioPause: function () {     //音乐暂停
    this.setData({
      lock: false
    })
    const backgroundAudio = wx.getBackgroundAudioManager()
    backgroundAudio.pause()
  },
  chage(e){             
    this.setData({
      play: e.currentTarget.dataset.index,   
      songid: e.currentTarget.dataset.id,       //歌曲id
      song: e.currentTarget.dataset.song,       //歌曲名
      author: e.currentTarget.dataset.author,   //歌曲作家
    })
    this.setData({
      num:1
    })
    wx.setStorageSync('idlist', this.data.idlist)
    wx.setStorageSync('index', this.data.play)
    wx.navigateTo({
      url: '/pages/songplay/songplay'
    })
    app.globalData.fly.get(`/song/url?id=${this.data.songid}`).then(res => {
      console.log(res)
      if(res){
        let url = res.data.data[0].url
        this.setData({
          url          //歌曲mp3资源
        })
        console.log(this.data.url,123)
        app.globalData.fly.get(`/song/detail?ids=${this.data.songid}`).then(res => {
          if(res){
            let songcover = res.data.songs[0].al.picUrl
            this.setData({
              songcover            //专辑封面
            })
            // this.playmusic()       //播放音乐
          }
        }).catch(err => {
          console.log(err)
        })
      }
      // console.log(res)
    }).catch(err => {
      console.log(err)
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id: options.id,
      copywriter: options.copywriter
    })
    this.playlist()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.audioCtx = wx.createAudioContext('myAudio')
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
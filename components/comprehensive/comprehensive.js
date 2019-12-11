const app = getApp()
let timejs = require("../../utils/util.js")
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    value:{
      type:String
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    song:null,       //单曲列表
    playList: null,       //歌单列表
    video: null,          //视频列表
    sim_query: null,       //相关搜索列表
    mlog: null,     
    talk: null,            
    artist: null,
    album: null,
    result:true,
    djRadio: null,
    user: null,
    idlist:[]
  },
  observers:{
    'value'(value){
      if(value!==''){

        this.result(value, this.data.offse, this.data.limit)
      }
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    result(keywords) {        //获取推荐搜索
      wx.showLoading({
        title: '加载中...',
      })
      app.globalData.fly.get(`/search?keywords=${keywords}&type=1018`).then(res => {
        wx.hideLoading()
        console.log(res)
        if (res.data.result.order.length===0){
          this.setData({
            result:false
          })
        }else{
          this.setData({
            result: true
          })
        }
        
        if (res.data.result.playList)
        res.data.result.playList.playLists.map(item=>{
          if (item.playCount>100000){
            Math.floor(item.playCount / 10000)
            item.playCount = (item.playCount / 10000).toFixed(1) + '万'
          }
        })
        if (res.data.result.video)
        res.data.result.video.videos.map(item => {
          if (item.playTime > 100000) {                       //处理播放次数
            Math.floor(item.playTime / 10000)
            item.playTime = Math.floor(item.playTime / 10000) + '万'
          }
          let next = ((item.durationms / 1000) % 60).toFixed(0)
          if (Math.floor((item.durationms / 1000) / 60) < 10) { 
            //处理播放时长
            item.durationms = `0${Math.floor((item.durationms / 1000) / 60)}:${next}`
          }
          if (res.data.result.album.albums)
          res.data.result.album.albums.map(item=>{
            item.publishTime = timejs.formatTimeTwo(item.publishTime, 'Y-M-D')
          })
        })
        if (res.data.result.song){
          res.data.result.song.songs.map(item => {
            this.data.idlist.push({ id: item.id })
          })
          this.setData({
            idlist: this.data.idlist,
            song: res.data.result.song
          })
        }
        if (res.data.result.playList) {
          this.setData({
            playList: res.data.result.playList
          })
        }
        console.log(this.data.playList)
        if (res.data.result.video) {
          this.setData({
            video: res.data.result.video
          })
        }
        if (res.data.result.sim_query) {
          this.setData({
            sim_querys: res.data.result.sim_query.sim_querys
          })
        }
        if (res.data.result.talk) {
          this.setData({
            talk: res.data.result.talk
          })
        }
        if (res.data.result.artist) {
          this.setData({
            artist: res.data.result.artist
          })
        }
        if (res.data.result.album) {
          this.setData({
            album: res.data.result.album
          })
        }
        if (res.data.result.djRadio) {
          this.setData({
            djRadio: res.data.result.djRadio
          })
          console.log(this.data.djRadio)
        }
        if (res.data.result.mlog){
          this.setData({
            mlog: res.data.result.mlog
          })
        }
        if (res.data.result.user) {
          this.setData({
            user: res.data.result.user
          })
        }
      }).catch(err => {
        console.log(err)
        wx.hideLoading()
      })
    },
    play(e) {
      this.setData({
        index: e.currentTarget.dataset.index
      })
      wx.setStorageSync('index', this.data.index)
      wx.setStorageSync('idlist', this.data.idlist)
      wx.navigateTo({
        url: '/pages/songplay/songplay',
      })
    },
    playall(e) {
      this.setData({
        index:0
      })
      wx.setStorageSync('index', this.data.index)
      wx.setStorageSync('idlist', this.data.idlist)
      wx.navigateTo({
        url: '/pages/songplay/songplay',
      })
    },
    gotosingle(e) {
      this.setData({
        singleid: e.currentTarget.dataset.id
      })
      wx.navigateTo({
        url: `/pages/songlist_details/songlist_details?id=${this.data.singleid}`,
      })
    },
    goto1(e) {
      this.setData({
        idalbum: e.currentTarget.dataset.id
      })
      wx.navigateTo({
        url: `/pages/dish_details/dish_details?id=${this.data.idalbum}`,
      })
    },
    gotoradio(e) {
      this.setData({
        idradio: e.currentTarget.dataset.id
      })
      wx.navigateTo({
        url: `/pages/radio_detail/radio_detail?&id=${this.data.idradio}`,
      })
    },
    gotosinger(e) {
      this.setData({
        singerid: e.currentTarget.dataset.id
      })
      wx.navigateTo({
        url: `/pages/singer_details/singer_details?id=${this.data.singerid}`,
      })
    },
  }
})

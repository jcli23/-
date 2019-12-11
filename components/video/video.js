const app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    value: {
      type: String
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    offset: 0,
    limit: 20,
    videos:[],
    num:0
  },
  observers: {
    'value'(value) {
      if (value !== '') {
        this.setData({
          videos:[]
        })
        this.video(value, this.data.offse, this.data.limit)
      }
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    video(keywords) {        //获取推荐搜索
      wx.showLoading({
        title: '加载中...',
      })
      app.globalData.fly.get(`/search?keywords=${keywords}&type=1014&limit=${this.data.limit}&offset=${this.data.offset}`).then(res => {
        wx.hideLoading()
        res.data.result.videos.map(item => {
          if (item.playTime > 100000) {                       //处理播放次数
            Math.floor(item.playTime / 10000)
            item.playTime = Math.floor(item.playTime / 10000) + '万'
          }
          let next = ((item.durationms / 1000) % 60).toFixed(0)
          if (Math.floor((item.durationms / 1000) / 60) < 10) {
            //处理播放时长
            item.durationms = `0${Math.floor((item.durationms / 1000) / 60)}:${next}`
          }
        })
        this.setData({
          videos: this.data.videos.concat(res.data.result.videos),      //下拉刷新拼接数组
          num: res.data.result.videos.length
        })
        // console.log(res)
        // console.log(this.data.videos)
      }).catch(err => {
        console.log(err)
        wx.hideLoading()
      })
    },
    lower() {
      if(this.data.num===this.data.limit){
        this.setData({
          offset: this.data.offset + this.data.limit,
        })
        this.video(this.properties.value)
      }
    },
  }
})

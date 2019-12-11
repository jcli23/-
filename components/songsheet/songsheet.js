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
    playlists: [],
    num:0
  },
  observers: {
    'value'(value) {
      if (value !== '') {
        this.setData({
          playlists:[]
        })
        this.songsheet(value)
      }
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    songsheet(keywords) {        //获取推荐搜索
      wx.showLoading({
        title: '加载中...',
      })
      app.globalData.fly.get(`/search?keywords=${keywords}&type=1000&limit=${this.data.limit}&offset=${this.data.offset}`).then(res => {
        wx.hideLoading()
        this.setData({
          playlists: this.data.playlists.concat(res.data.result.playlists),
          num: res.data.result.playlists.length
        })
        // console.log(res)
        // console.log(this.data.playlists)
      }).catch(err =>{
        wx.hideLoading()
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
    lower() {
      if(this.data.num===this.data.limit){
        this.setData({
          offset: this.data.offset + this.data.limit,
        })
        this.songsheet(this.properties.value)
      }
    },
  }
})

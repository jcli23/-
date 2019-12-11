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
    offset:0,
    limit: 40,
    songs:[],
    idlist: [],
    num:0,
    result: true
  },
  observers: {
    'value'(value) {
      if (value !== '') {
        this.setData({
          songs:[]
        })
        this.result(value)
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
      app.globalData.fly.get(`/search?keywords=${keywords}&type=1&limit=40&offset=${this.data.offset}`).then(res => {
        wx.hideLoading()
        this.setData({
          result: true
        })
        res.data.result.songs.map(item => {
          this.data.idlist.push({ id: item.id })
        })
        this.setData({
          songs: this.data.songs.concat(res.data.result.songs),      //下拉刷新拼接数组
          idlist: this.data.idlist,
          num: res.data.result.songs.length
        })
        // console.log(this.data.songs)
      }).catch(err => {
        this.setData({
          result: false
        })
        wx.hideLoading()
      })
    },
    play(e){
      this.setData({
        index: e.currentTarget.dataset.index
      })
      wx.setStorageSync('index', this.data.index)
      wx.setStorageSync('idlist', this.data.idlist)
      wx.navigateTo({
        url: '/pages/songplay/songplay',
      })
    },
    playall() {
      this.setData({
        index: 0
      })
      wx.setStorageSync('index', this.data.index)
      wx.setStorageSync('idlist', this.data.idlist)
      wx.navigateTo({
        url: '/pages/songplay/songplay',
      })
    },
    lower() {
      if(this.data.num===this.data.limit){
        this.setData({
          offset: this.data.offset + this.data.limit,
        })
        this.result(this.properties.value)
      }
    },
  }
})

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
    singer:[],
    num:0
  },
  observers: {
    'value'(value) {
      if (value !== '') {
        this.setData({
          singer:[]
        })
        this.singer(value)
      }
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    singer(keywords) {        //获取推荐搜索
      wx.showLoading({
        title: '加载中...',
      })
      app.globalData.fly.get(`/search?keywords=${keywords}&type=100&limit=${this.data.limit}&offset=${this.data.offset}`).then(res => {
        wx.hideLoading()
        this.setData({
          singer: this.data.singer.concat(res.data.result.artists),
          num: res.data.result.artists.length
        })
        // console.log(res)
        console.log(this.data.singer)
      }).catch(err => {
        wx.hideLoading()
      })
    },
    goto(e) {
      this.setData({
        id: e.currentTarget.dataset.id
      })
      wx.navigateTo({
        url: `/pages/singer_details/singer_details?id=${this.data.id}`,
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

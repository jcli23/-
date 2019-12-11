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
    user: [],
    num:0
  },
  observers: {
    'value'(value) {
      if (value !== '') {
        this.setData({
          user:[]
        })
        this.user(value)
      }
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    user(keywords) {        //获取推荐搜索
      wx.showLoading({
        title: '加载中...',
      })
      app.globalData.fly.get(`/search?keywords=${keywords}&type=1002&limit=${this.data.limit}&offset=${this.data.offset}`).then(res => {
        wx.hideLoading()
        this.setData({
          user: this.data.user.concat(res.data.result.userprofiles),      //下拉刷新拼接数组
          num: res.data.result.userprofiles.length
        })
        // console.log(res)
      }).catch(err => {
        wx.hideLoading()
      })
    },
    lower() {
      if(this.data.num===this.data.limit){
        this.setData({
          offset: this.data.offset + this.data.limit,
        })
        this.user(this.properties.value)
      }
    },
  }
})

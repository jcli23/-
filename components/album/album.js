const app = getApp()
let timejs = require("../../utils/util.js")
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
    albums:[],
    num:0
  },
  observers: {
    'value'(value) {
      if (value !== '') {
        this.setData({
          albums:[]
        })
        this.album(value)
      }
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    album(keywords) {        //获取推荐搜索
      wx.showLoading({
        title: '加载中...',
      })
      app.globalData.fly.get(`/search?keywords=${keywords}&type=10&limit=${this.data.limit}&offset=${this.data.offset}`).then(res => {
        wx.hideLoading()
        res.data.result.albums.map(item => {
          item.publishTime = timejs.formatTimeTwo(item.publishTime, 'Y-M-D')
        })
        this.setData({
          albums: this.data.albums.concat(res.data.result.albums),
          num: res.data.result.albums.length
        })
        // console.log(res)
        // console.log(this.data.albums)
      }).catch(err => {
        wx.hideLoading()
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
    lower() {
      if(this.data.num===this.data.limit){
        this.setData({
          offset: this.data.offset + this.data.limit,
        })
        this.album(this.properties.value)
      }
    },
  }
})

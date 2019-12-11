// components/radio/radio.js
const app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    djprogram:[]        //装电台数据
  },

  /**
   * 组件的方法列表
   */
  methods: {
    djprogram() {         //获取电台数据
      wx.showLoading({
        title: '加载中...',
      })
      app.globalData.fly.get(`/personalized/djprogram`).then(res => {
        wx.hideLoading()
        let djprogram = res.data.result.slice(0, 6)
        this.setData({
          djprogram
        })
        // console.log(res)
        // console.log(this.data.djprogram)
      }).catch(err => {
        console.log(err)
        wx.hideLoading()
      })
    },
    goto(e) {
      this.setData({
        id: e.currentTarget.dataset.id
      })
      wx.navigateTo({
        url: `/pages/radio_detail/radio_detail?&id=${this.data.id}`,
      })
    }
  },
  ready() {
    this.djprogram()
  },
})

// components/songlist/songlist.js
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
    result:[]
  },

  /**
   * 组件的方法列表
   */
  ready() {
    this.playlist()
  },
  methods: {
    playlist() {             
      wx.showLoading({
        title: '加载中...',
      })
      app.globalData.fly.get(`/personalized`).then(res => {
        wx.hideLoading()
        let result = res.data.result
        this.setData({
          result
        })
        res.data.result.map(item=>{
          if (item.playCount>100000000){
            Math.floor(item.playCount / 100000000)
            item.playCount = (item.playCount / 100000000).toFixed(1) + '亿'
          } else if (item.playCount > 100000){
            Math.floor(item.playCount / 10000)
            item.playCount = Math.floor(item.playCount / 10000) + '万'
          }else{
            item.playCount
          }
          this.setData({
            result:this.data.result
          })
        })
        // console.log(res)
        // console.log(this.data.result)
      }).catch(err => {
        console.log(err)
        wx.hideLoading()
      })
    },
    goto(e){
      this.setData({
        id: e.currentTarget.dataset.id,
        copywriter: e.currentTarget.dataset.copywriter
      })
      wx.navigateTo({
        url: `/pages/songlist_details/songlist_details?id=${this.data.id}&copywriter=${this.data.copywriter}`,
      })
    }
  }
})

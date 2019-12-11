// components/newmusic/newmusic.js
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
    newmusic:[],       //装推荐新音乐
    idlist:[]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    newmusic() {           //获取推荐新音乐数据
      wx.showLoading({
        title: '加载中...',
      })
      app.globalData.fly.get(`/personalized/newsong`).then(res => {
        wx.hideLoading()
        let newmusic = res.data.result.slice(0, 6)
        res.data.result.map(item => {
          this.data.idlist.push({ id: item.id })
        })
        this.setData({
          newmusic,
          idlist: this.data.idlist
        })
        // console.log(res)
        // console.log(this.data.newmusic)
      }).catch(err => {
        console.log(err)
        wx.hideLoading()
      })
    },
    goto(e) {
      this.setData({
        index: e.currentTarget.dataset.index
      })
      wx.setStorageSync('index', this.data.index)
      wx.setStorageSync('idlist', this.data.idlist)
      wx.navigateTo({
        url: '/pages/songplay/songplay',
      })
    }
  },
  ready() {
    this.newmusic()
  },
})

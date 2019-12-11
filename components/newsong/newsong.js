// components/newsong/newsong.js
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
    num:0,
    topsong:[],         //装推荐歌单
    idlist:[]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    album() {           //获取推荐歌单数据
      wx.showLoading({
        title: '加载中...',
      })
      app.globalData.fly.get(`/album/newest`).then(res => {
        wx.hideLoading()
        let album = res.data.albums
        this.setData({
          album
        })
        // console.log(res)
        // console.log(this.data.album)
      }).catch(err => {
        console.log(err)
        wx.hideLoading()
      })
    },
    topsong() {
      wx.showLoading({
        title: '加载中...',
      })
      app.globalData.fly.get(`/top/song`).then(res => {
        wx.hideLoading()
        let topsong = res.data.data
        res.data.data.map(item=>{
          this.data.idlist.push({ id: item.id })
        })
        this.setData({
          topsong,
          idlist: this.data.idlist
        })
        // console.log(res)
        // console.log(this.data.idlist)
      }).catch(err => {
        console.log(err)
        wx.hideLoading()
      })
    },
    chagefont(e){
      this.setData({
        num: e.currentTarget.dataset.num
      })
    },
    goto1(e) {
      this.setData({
        id: e.currentTarget.dataset.id
      })
      wx.navigateTo({
        url: `/pages/dish_details/dish_details?id=${this.data.id}`,
      })
    },
    goto2(e) {
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
    this.album()
    this.topsong()
  },
})

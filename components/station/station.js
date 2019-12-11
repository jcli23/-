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
    djRadio: [],
    number:0
  },
  observers: {
    'value'(value) {
      if (value !== '') {
        this.setData({
          djRadio:[]
        })
        this.djRadio(value)
      }
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    djRadio(keywords) {        //获取推荐搜索
      wx.showLoading({
        title: '加载中...',
      })
      app.globalData.fly.get(`/search?keywords=${keywords}&type=1009&limit=${this.data.limit}&offset=${this.data.offset}`).then(res => {
        wx.hideLoading()
        this.setData({
          djRadio: this.data.djRadio.concat(res.data.result.djRadios),      //下拉刷新拼接数组
          number: res.data.result.djRadios.length
        })
        // console.log(res)
        // console.log(this.data.djRadio)
      }).catch(err => {
        wx.hideLoading()
      })
    },
    gotoradio(e) {
      this.setData({
        idradio: e.currentTarget.dataset.id
      })
      wx.navigateTo({
        url: `/pages/radio_detail/radio_detail?&id=${this.data.idradio}`,
      })
    },
    lower() {
      if(this.data.number===this.data.limit){
        this.setData({
          offset: this.data.offset + this.data.limit,
        })
        this.djRadio(this.properties.value)
      }
    },
  }
})

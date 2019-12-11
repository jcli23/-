// components/program/program.js
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
    program:[]            //装节目数据
  },

  /**
   * 组件的方法列表
   */
  methods: {
    program() {        //获取节目数据
      wx.showLoading({
        title: '加载中...',
      })
      app.globalData.fly.get(`/program/recommend`).then(res => {
        wx.hideLoading()
        let program = res.data.programs.slice(0, 6)
        this.setData({
          program
        })
        // console.log(res)
        // console.log(this.data.program)
      }).catch(err => {
        console.log(err)
        wx.hideLoading()
      })
    },
  },
  ready() {
    this.program()
  },
})

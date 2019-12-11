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
    value:'',          //搜索值
    realkeyword:'',       //输入框默认推荐
    list:[],            //热搜榜数据
    keywords:[],        //搜索模糊推荐值
    show: false,        //推荐输入弹出层开关
    searchlist:[]       //搜索历史列表
  },
  /**
   * 组件的方法列表
   */
  ready() {
    this.keydefault()
    this.searchhot()
    this.getsearch()
  },
  methods: {
    keydefault() {        //获取默认推荐
      wx.showLoading({
        title: '加载中...',
      })
      app.globalData.fly.get(`/search/default`).then(res => {
        wx.hideLoading()
        this.setData({
          realkeyword: res.data.data.realkeyword
        })
        // console.log(res)
        // console.log(this.data.program)
      }).catch(err => {
        console.log(err)
        wx.hideLoading()
      })
    },
    searchhot() {        //获取热搜
      wx.showLoading({
        title: '加载中...',
      })
      app.globalData.fly.get(`/search/hot/detail`).then(res => {
        wx.hideLoading()
        this.setData({
          list:res.data.data
        })
        console.log(res)
        // console.log(this.data.program)
      }).catch(err => {
        console.log(err)
        wx.hideLoading()
      })
    },
    keywords() {        //获取推荐搜索
      wx.showLoading({
        title: '加载中...',
      })
      app.globalData.fly.get(`/search/suggest?keywords=${this.data.value}&type=mobile`).then(res => {
        wx.hideLoading()
        this.setData({
          keywords: res.data.result.allMatch
        }) 
      }).catch(err => {
        console.log(err)
        wx.hideLoading()
      })
    },
    back(){                         //返回按钮，传值给父组件
      this.triggerEvent("close",{
        opensearch:false
      })
    },
    onChange(e){                //输入框change事件
      this.setData({
        value:e.detail
      })
      if((this.data.value).trim() !==''){
        this.setData({ show: true });       //输入框有值，打开关键字弹出层
        this.keywords()
      }else{
        this.setData({ show: false });      //输入框无值，关闭关键字弹出层
      }
    },
    choose(e){
      this.setData({ show: false });    //点击推荐关闭关键字弹出层
      this.setData({
        value:e.currentTarget.dataset.keyword           //给value赋值
      })
      let searchlist = wx.getStorageSync('searchlist')    //获取历史搜索
      if (!searchlist) {                          //搜索无值，创立历史
        let searchlist = []
        searchlist.unshift(this.data.value.trim())
        wx.setStorageSync('searchlist', searchlist)
      } else {                                     //有值则添加进去
        if (searchlist.indexOf(this.data.value.trim()) === -1)
          searchlist.unshift(this.data.value)
        wx.setStorageSync('searchlist', searchlist)
      }
      this.getsearch()
      wx.navigateTo({                    //跳转搜索结果页面
        url: `/pages/search_result/search_result?value=${this.data.value}`,
      })
    },
    choosehot(e){
      this.setData({
        value: e.currentTarget.dataset.hotword  
      })
      let searchlist = wx.getStorageSync('searchlist')    //获取历史搜索
      if (!searchlist) {                          //搜索无值，创立历史
        let searchlist = []
        searchlist.unshift(this.data.value.trim())
        wx.setStorageSync('searchlist', searchlist)
      } else {                                     //有值则添加进去
        if (searchlist.indexOf(this.data.value.trim()) === -1)
          searchlist.unshift(this.data.value)
        wx.setStorageSync('searchlist', searchlist)
      }
      this.getsearch()
      wx.navigateTo({                           //跳转搜索结果页面
        url: `/pages/search_result/search_result?value=${this.data.value}`,
      })
    },
    confirm(e){
      if((this.data.value).trim() !== ''){        //输入框有输入值，value取值为用户输入值
        this.setData({
          value: e.detail
        })
      }else{                             //输入框无输入值，value取值为推荐搜索值
        this.setData({
          value: e.currentTarget.dataset.realkeyword
        })
      }
      let searchlist=wx.getStorageSync('searchlist')    //获取历史搜索
      if (!searchlist){                          //搜索无值，创立历史
        let searchlist=[]
        searchlist.push(this.data.value)
        wx.setStorageSync('searchlist', searchlist)
      }else{                                     //有值则添加进去
        if (searchlist.indexOf(this.data.value.trim())===-1)
        searchlist.unshift(this.data.value)
        wx.setStorageSync('searchlist', searchlist)
      }
      this.getsearch()
      wx.navigateTo({                           //跳转搜索结果页面
        url: `/pages/search_result/search_result?value=${this.data.value}`,
      })
    },
    delsearch(){            //清空历史搜索
      wx.removeStorageSync('searchlist')
      this.setData({
        searchlist:[]
      })
    },
    getsearch(){         //获取历史搜索
      if (wx.getStorageSync('searchlist')){
        this.setData({
          searchlist: wx.getStorageSync('searchlist')
        })
      }
    }
  }
})

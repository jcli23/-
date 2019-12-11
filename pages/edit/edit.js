let timejs=require("../../utils/util.js")
import cities from '../../lib/vant/area/area.js'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentDate: new Date().getTime(),
    maxDate: new Date().getTime(),
    formatter(type, value) {
      if (type === 'year') {
        return `${value}年`;
      } else if (type === 'month') {
        return `${value}月`;
      }
      return value;
    },
    birthday:'',           //生日值
    gender:'',            //性别值
    nickname:'',           //昵称值
    adress:'',            //城市值
    signature:'',         //签名值
    show: false,          //昵称弹出框开关
    show2: false,          //性别弹出框开关
    show3: false,         //生日弹出框开关
    show4: false,         //城市弹出框开关
    show5: false,          //签名弹出框开关
    areaList:{}            //装城市列表
  },
  bindblur(e){              //昵称失去焦点获值
    this.setData({
      nickname: e.detail.value
    })
    console.log(this.data.nickname)
  },
  bindblur2(e) {           //签名失去焦点获值
    this.setData({
      signature: e.detail.value
    })
  },
  showPopup() {                       //弹出层开
    this.setData({ show: true });
  },
  showPopup2() {
    this.setData({ show2: true });
  },
  showPopup3() {
    this.setData({ show3: true });
  },
  showPopup4() {
    this.setData({ show4: true });
  },
  showPopup5() {
    this.setData({ show5: true });
  },
  onClose() {                             //以下同类为弹出层关
    this.setData({ show: false });
  },
  onClose5() {
    this.setData({ show5: false });
  },
  onClose3() {
    this.setData({ show3: false });
  },
  onClose4() {
    this.setData({ show4: false });
  },
  secrecy(){               //以下为性别选项关闭并获值
    this.setData({ 
      show2: false,
      gender:'保密'
    })
  },
  boy() {
    this.setData({
      show2: false,
      gender:'男'
    })
  },
  girl() {
    this.setData({
      show2: false,
      gender:'女'
    })
  },
  confirm(e){              //生日弹出层关闭并刷新值
    console.log(e)
    this.setData({
      show3: false,
      birthday: timejs.formatTimeTwo(e.detail, 'Y/M/D'),
    })
  },
  confirm2(e) {                //地址弹出层关闭并刷新值
    console.log(e)
    this.setData({
      show4: false,
      adress: e.detail.values[0].name + e.detail.values[1].name,
      // province: e.detail.values[0].code,
      // city: e.detail.values[1].code
    })
  },
  update(){                   //确认修改存值并跳转
    let userdata=[
      this.data.nickname,
      this.data.gender,
      this.data.birthday,
      this.data.adress,
      this.data.signature
    ]
    wx.setStorageSync('userdata', userdata)
    wx.switchTab({
      url: '/pages/me/me',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (!(wx.getStorageSync('userdata')) === true) {      //如果未修改过，用线上传来的值
      this.setData({
        nickname: options.nickname
      })
      let birthday = options.birthday
      if (Number(birthday) < 0) {
        this.setData({
          birthday: '未设置'
        })
      } else {
        this.setData({
          birthday: timejs.formatTimeTwo(Number(birthday), 'Y/M/D')
        })
      }
      let gender = options.gender
      if (gender === '0') {
        this.setData({
          gender: '保密'
        })
      }
      if (gender === '1') {
        this.setData({
          gender: '男'
        })
      }
      if (gender === '2') {
        this.setData({
          gender: '女'
        })
      }
      let city = options.city
      let province = options.province
      this.setData({
        areaList: cities,
        adress: cities.province_list[province] + cities.city_list[city],
        signature: options.signature
      })
    } else {                             //如果修改过，用修改过的Storage里的值
      this.setData({
        areaList: cities,
        nickname:wx.getStorageSync('userdata')[0],
        gender: wx.getStorageSync('userdata')[1],
        birthday: wx.getStorageSync('userdata')[2],
        adress: wx.getStorageSync('userdata')[3],
        signature: wx.getStorageSync('userdata')[4]
      })
    }
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
  
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
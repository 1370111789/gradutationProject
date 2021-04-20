// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username:'',
    password:'',
    inputText: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      
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
    const self = this
    let userText = wx.getStorageSync('userText')
    if (userText) {
        self.data.inputText = userText
        self.setData(self.data)
    }
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

  },


  dologin: function(e){
    var id 
    wx.request({
      url: 'http://localhost:8080/getId',
      data:{
        username: e.detail.value.username,
        password: e.detail.value.password
      },
      method:'GET',
      header:{
        'content-type':'application/json'
      },
      success:function(res){
        console.log(res)
        id = res.data.id
        
      },
      fail:function(res){
        console.log("--------fail--------");
      }
    })
    
    wx.request({
      url: 'http://localhost:8080/login',
      data:{
        username: e.detail.value.username,
        password: e.detail.value.password
      },
      method:'GET',
      header:{
        'content-type':'application/json'
      },
      success:function(res){
        console.log(res);
        console.log(id);
        if(res.data){
          wx.redirectTo({
            url: '../successlogin/successlogin?userId='+id,
          })
        }else{
          wx.showToast({
            title: '用户名或密码错误',
            icon: 'none',
            duration:2000
          })
        }
      },
      fail:function(res){
        console.log("--------fail--------");
      }
    })
  },

  onInPutText: function(e){
    const self = this
        const value = e.detail.value
        if (value) {
            wx.setStorageSync('userText', value)
        } 
  },

  goregister: function(e){
    wx.navigateTo({
      url: '../register/register',
    })
  },

  gochangepassword:function(e){
    wx.redirectTo({
      url: '../confirm/confirm',
    })
  }
})
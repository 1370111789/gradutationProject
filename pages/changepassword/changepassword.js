// pages/changepassword/changepassword.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      nickName:'',
      password:'',
      repassword:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      this.setData({
        nickName:options.nickName
      })
      console.log(this.data.nickName)
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

  },

  savepassword:function(e){
    this.setData({
      password:e.detail.value
    })
    console.log(this)
  },

  saverepassword:function(e){
    this.setData({
      repassword:e.detail.value
    })
    console.log(this)
  },

  dochange:function(e){
    if(!this.data.password){
      wx.showToast({
        title: '新密码不能为空',
        icon:'none',
        duration:2000
      })
      return;
    }

    if(!this.data.repassword){
      wx.showToast({
        title: '请再次输入新密码',
        icon:'none',
        duration:2000
      })
      return;
    }

    if(this.data.repassword!=this.data.password){
      wx.showToast({
        title: '两次密码不一致，请重新输入',
        icon:'none',
        duration:2000
      })
      return;
    }
    wx.request({
      url: 'http://localhost:8080/change',
      data:{
        nickName:this.data.nickName,
        password:e.detail.value.newPassword
      },
      method:'GET',
      header:{
        'content-type':'application/json'
      },
      success:function(res){
        console.log(res)
        wx.showModal({
          title:res.data+'用户',
          content:'您的密码已修改，请返回登录',
          success(res){
            if (res.confirm) {
              console.log('用户点击确定')
              wx.redirectTo({
                url: '../login/login',
              })
            }else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
      },
      fail:function(res){
        console.log("--------fail--------");
      }







    })
  }





})
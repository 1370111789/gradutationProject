// pages/changepassword/changepassword.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
   realName:'',
   idNumber:'',
   mobile:''
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

  doconfirm:function(e){
    wx.request({
      url: 'http://localhost:8080/confirm',
      data:{
        realName:e.detail.value.realName,
        idNumber:e.detail.value.idNumber,
        mobile:e.detail.value.mobile
      },
      method:'GET',
      header:{
        'content-type':'application/json'
      },
      success:function(res){
        console.log(res);
        console.log(res.data.nickName);
        if(res.data.id!=null){
          var name = res.data.nickName
          wx.redirectTo({
            url: '../changepassword/changepassword?nickName='+name,
          })
        }else{
          wx.showToast({
            title: '身份验证不通过，请重试',
            icon:'none',
            duration:2000
          })
        }
      },
      fail:function(res){
        console.log("--------fail--------");
      }



    })
  }





})
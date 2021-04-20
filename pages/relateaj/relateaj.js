// pages/relateaj/relateaj.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      userId:'',
      ah:'',
      realName:'',
      idNumber:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      userId:options.userId,
    })
    console.log(this.data.userId)
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

  doRelate:function(e){
    console.log(this.data)
    if(!this.data.ah){
      wx.showToast({
        title: '案号不能为空',
        icon:'none',
        duration:2000
      })
      return;
    }
    if(!this.data.realName){
      wx.showToast({
        title: '真实姓名不能为空',
        icon:'none',
        duration:2000
      })
      return;
    }
    if(!this.data.idNumber){
      wx.showToast({
        title: '身份证号不能为空',
        icon:'none',
        duration:2000
      })
      return;
    }



    wx.request({
      url: 'http://localhost:8080/relate',
      data:{
        userId: this.data.userId,
        ah: e.detail.value.ah,
        realName: e.detail.value.realName,
        idNumber: e.detail.value.idNumber
      },
      method:'GET',
      header:{
        'content-type':'application/json;charset=uft-8'
      },
      success:res=>{
        if(res.data){
          wx.showModal({
            content:'关联成功',
            success:res=> {
              if (res.confirm) {
                console.log('用户点击确定')
                wx.redirectTo({
                  url: '../successlogin/successlogin?userId='+this.data.userId,
                })
              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            }
          })
        }else{
          wx.showToast({
            title: '关联失败，请检查重试',
            icon:'none',
            duration:2000
          })
        }
      },
      fail:function(res){
        console.log('----------')
      }

    })
   

  },

  saveah:function(e){
    console.log(e)
    this.setData({
      ah:e.detail.value
    })
  },

  saverealName:function(e){
    this.setData({
      realName:e.detail.value
    })
  },

  saveidNumber:function(e){
    this.setData({
      idNumber:e.detail.value
    })
  }












})
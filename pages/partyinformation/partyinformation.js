// pages/partyinformation/partyinformation.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      id:'',
      mc:'',
      xh:'',
      lx:'',
      zz:'',
      sfzh:'',
      xb:'',
      isxb:'',
      iszz:'',
      issfzh:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      this.setData({
        id:options.curid
      })
      console.log(this)

      wx.request({
        url: 'http://localhost:8080/queryOneParty',
        data:{
          id:this.data.id
        },
        method:'GET',
        header:{
          'content-type':'application/json'
        },
        success:res =>{
          console.log(res)
          this.setData({
            mc:res.data.mc,
          })
          if(res.data.lx==1){
            this.setData({
              lx:"自然人"
            })
          }else{
            this.setData({
              lx:"企业"
            })
          }
          if(res.data.xb==1){
            this.setData({
              xb:"男",
              isxb:"性别："
            })
          }else if(res.data.xb==0){
            this.setData({
              xb:"女",
              isxb:"性别："
            })
          }
          if(res.data.xh==1){
            this.setData({
              xh:"被告"
            })
          }else{
            this.setData({
              xh:"原告"
            })
          }
          if(res.data.sfzh){
            this.setData({
              sfzh:res.data.sfzh,
              issfzh:"身份证号："
            })
          }
          if(res.data.zz){
            this.setData({
              zz:res.data.zz,
              iszz:"身份证号："
            })
          }
        },
        fail:function(res){
          console.log("--------fail--------");
        }
      })








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
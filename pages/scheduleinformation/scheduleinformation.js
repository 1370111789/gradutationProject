// pages/scheduleinformation/scheduleinformation.js
import appUtil from '../../utils/js/util.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
        id:'',
        pqsj:'',
        ktsj:'',
        fth:'',
        zsfg:'',
        sfkt:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id:options.curid
    })

    wx.request({
      url: 'http://localhost:8080/queryOneSchedule',
      data:{
        id:this.data.id
      },
      method:'GET',
      header:{
        'content-type':'application/json'
      },
      success:res =>{
        console.log(res)
        res.data.ktsj = appUtil(new Date,"Y-M-D")
        res.data.pqsj = appUtil(new Date,"Y-M-D")
        this.setData({
          fth:res.data.fth,
          zsfg:res.data.zsfg,
          ktsj:res.data.ktsj,
          pqsj:res.data.pqsj
        })
        if(res.data.sfkt==0){
          this.setData({
            sfkt:"未开庭"
          })
        }else{
          this.setData({
            sfkt:"已开庭"
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
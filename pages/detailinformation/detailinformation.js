// pages/detailinformation/detailinformation.js
import appUtil from '../../utils/js/util.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
        ah:'',
        ajmc:'',
        larq:'',
        aymc:'',
        ajzt:'',
        iszsfg:'',
        zsfg:'',
        isxgft:'',
        xgft:'',
        partylist:'',
        schedulelist:'',
        schedulelist2:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      this.setData({
        ah:options.curah
      })
      console.log(this.data.ah)

      wx.request({
        url: 'http://localhost:8080/querycase',
        data:{
          ah:this.data.ah
        },
        method:'GET',
        header:{
          'content-type':'application/json'
        },
        success:res =>{
          console.log(res)
          this.setData({
            ajmc:res.data.ajmc,
            larq:res.data.larq,
            aymc:res.data.aymc,
          })
          switch(parseInt(res.data.ajzt)){
            case 1:this.setData({
              ajzt:"收案"
            })
            break;
            case 2:this.setData({
              ajzt:"立案"
            })
            break;
            case 3:this.setData({
              ajzt:"审理"
            })
            break;
            case 4:this.setData({
              ajzt:"结案"
            })
            break;
          }
          if(res.data.zsfg!=null){
            this.setData({
              iszsfg:'主审法官：',
              zsfg:res.data.zsfg
            })
          }
          if(res.data.xgft!=null){
            this.setData({
              isxgft:'法条信息：',
              xgft:res.data.xgft
            })
          }
        },
        fail:function(res){
          console.log("--------fail--------");
        }
      })
      console.log(this)

      wx.request({
        url: 'http://localhost:8080/queryparty',
        data:{
          ah:this.data.ah
        },
        method:'GET',
        header:{
          'content-type':'application/json'
        },
        success:res =>{
          console.log(res)
          this.setData({
            partylist:res.data
          })
        },
        fail:function(res){
          console.log("--------fail--------");
        }
      })

      wx.request({
        url: 'http://localhost:8080/queryschedule',
        data:{
          ah:this.data.ah
        },
        method:'GET',
        header:{
          'content-type':'application/json'
        },
        success:res =>{
          console.log(res)
          this.setData({
            schedulelist:res.data
          })
          for(var curindex in this.data.schedulelist){
            this.data.schedulelist[curindex].ktsj = appUtil(new Date,"Y-M-D")
            this.data.schedulelist[curindex].pqsj = appUtil(new Date,"Y-M-D")
          }
          this.setData({
            schedulelist2:this.data.schedulelist
          })
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

  },

  partydetail:function(e){
    var curindex = e.currentTarget.dataset.index
    var curid = this.data.partylist[curindex].id
    console.log(curid)
    wx.navigateTo({
      url: '../partyinformation/partyinformation?curid='+curid
    })
  },

  scheduledetail:function(e){
    var curindex = e.currentTarget.dataset.index
    var curid = this.data.schedulelist[curindex].id
    console.log(curid)
    wx.navigateTo({
      url: '../scheduleinformation/scheduleinformation?curid='+curid
    })
  }












})
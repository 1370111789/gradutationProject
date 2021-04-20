// pages/register/register.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      nickName:'',
      realName:'',
      idNumber:'',
      mobile:'',
      password:'',
      copassword:''
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

  doregister:function(e){
    console.log(this.data)
    if(!this.data.nickName){
      wx.showToast({
        title: '用户名不能为空',
        icon:'none',
        duration: 2000
      })
      return;
    }
    if(!this.data.realName){
      wx.showToast({
        title: '真实姓名不能为空',
        icon:'none',
        duration: 2000
      })
      return;
    }
    if(!this.data.idNumber){
      wx.showToast({
        title: '身份证号不能为空',
        icon:'none',
        duration: 2000
      })
      return;
    }
    if(!this.data.mobile){
      wx.showToast({
        title: '手机号码不能为空',
        icon:'none',
        duration: 2000
      })
      return;
    }
    if(!this.data.password){
      wx.showToast({
        title: '登录密码不能为空',
        icon:'none',
        duration: 2000
      })
      return;
    }
    if(this.data.password!=this.data.copassword){
      wx.showToast({
        title: '确认密码与登录密码不一致，请重新输入',
        icon:'none',
        duration: 2000
      })
      return;
    }
    var realNameReg = /^[a-zA-Z\u4e00-\u9fa5]+$/
    var idNumberReg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
    var phoneReg = /^1(3|4|5|6|7|8|9)\d{9}$/
    if(!realNameReg.test(this.data.realName)){
      wx.showToast({
        title: '请输入正确的姓名',
        icon:'none',
        duration:2000
      })
      return;
    }
    if(!idNumberReg.test(this.data.idNumber)){
      wx.showToast({
        title: '身份证输入有误，请检查后重新输入',
        icon:'none',
        duration: 2000
      })
      return;
    }
    if(!phoneReg.test(this.data.mobile)){
      wx.showToast({
        title: '手机号码输入有误，请检查后重新输入',
        icon:'none',
        duration:2000
      })
      return;
    }
    wx.request({
      url: 'http://localhost:8080/register',
      data:{
        nickName: e.detail.value.nickName,
        realName: e.detail.value.realName,
        idNumber: e.detail.value.idNumber,
        mobile: e.detail.value.mobile,
        password: e.detail.value.password
      },
      method:"GET",
      header:{
        'content-type':'application/json'
      },
      success:function(res){
        console.log(res);
        if(res.data){
          wx.showModal({
            content:'注册成功，请返回登录',
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
        }else{
          wx.showToast({
            title: '用户名已被注册,请重试',
            icon:"none",
            duration: 2000
          })
        }
      },
      fail:function(res){
        console.log("--------fail--------");
      }
    })
  },

  confirmMobile:function(e){
    this.setData({
      mobile:e.detail.value
    })
    console.log(this)
    var phone = e.detail.value
    var phoneReg = /^1(3|4|5|6|7|8|9)\d{9}$/
    if(!phone){
      return;
    }
    if(!phoneReg.test(phone)){
      wx.showToast({
        title: '手机号码输入有误，请检查后重新输入',
        icon:'none',
        duration:2000
      })
      return;
    }
  },

  confirmRealName:function(e){
    this.setData({
      realName:e.detail.value
    })
    console.log(this)
    var realName = e.detail.value
    var realNameReg = /^[a-zA-Z\u4e00-\u9fa5]+$/
    if(!realName){
      return;
    }
    if(!realNameReg.test(realName)){
      wx.showToast({
        title: '请输入正确的姓名',
        icon:'none',
        duration:2000
      })
      return;
    }
    },

    confirmIdNumber:function(e){
      this.setData({
        idNumber:e.detail.value
      })
      console.log(this)
      var idNumber = e.detail.value
      var idNumberReg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
      if(!idNumber){
        return;
      }
      if(!idNumberReg.test(idNumber)){
        wx.showToast({
          title: '身份证输入有误，请检查后重新输入',
          icon:'none',
          duration: 2000
        })
        return;
      }
    },

    savePassword:function(e){
      this.setData({
        password:e.detail.value
      })
      console.log(this)
    },

    confirmPassword:function(e){
      this.setData({
        copassword:e.detail.value
      })
      console.log(this)
      var copassword = e.detail.value
      var repassword = this.data.password
      if(!copassword){
        return;
      }
      if(copassword!=repassword){
        wx.showToast({
          title: '确认密码与登录密码不一致，请重新输入',
          icon:'none',
          duration:2000
        })
        return;
      }
    },

    confirmNickName:function(e){
      this.setData({
        nickName:e.detail.value
      })
      console.log(this)
    }




  }
)
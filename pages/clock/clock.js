// pages/clock/clock.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    width: 0,
    heigt: 0,
    timer: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const self = this;
    // 获取系统信息
    wx.getSystemInfo({
      success: function(res) {
        self.setData({
          width: res.windowWidth,
          height: res.windowHeight
        })
      },
    })
  },
  initCanvas: function() {
    const self = this;
    // 创建实例
    const ctx = wx.createCanvasContext('myCanvasClock');
    // 角度换算公式   弧度=角度*Math.PI/180
    const D6 = 6 * Math.PI / 180;
    const D30 = 30 * Math.PI / 180;
    const D90 = 90 * Math.PI / 180;
    // 获取宽高
    var width = self.data.width,
      height = self.data.height;
    // 计算表盘的半径  留出30px外边距
    var radius = width / 2 - 30;
    // 每秒绘制一次
    draw();
    self.timer = setInterval(draw, 1000);
    // 绘制函数
    function draw() {
      //  设置坐标轴原点为窗口的中心点
      ctx.translate(width / 2, height / 2);
      // 绘制表盘
      drawClock(ctx, radius);
      // 绘制指针
      drawHand(ctx, radius);
      // 执行绘制
      ctx.draw();

    }
    // 绘制表盘部分
    function drawClock(ctx, radius) {
      // 绘制大圆 大圆半径为radius  线条粗细为2px
      ctx.setLineWidth(2);
      ctx.beginPath(); //开始新路径
      ctx.arc(0, 0, radius, 0, 2 * Math.PI, true);
      ctx.stroke(); //画线
      // 绘制中心圆  中心圆半径为8px 线条粗细为1px
      ctx.setLineWidth(1);
      ctx.beginPath();
      ctx.arc(0, 0, 8, 0, 2 * Math.PI, true);
      ctx.stroke();
      // 绘制大圆盘  粗细为5px
      ctx.setLineWidth(5);
      for (let i = 0; i < 12; i++) {
        // 以原点为中心  顺时针旋转
        // 大刻度盘需要绘制12线条   表示12小时  每次旋转30度
        ctx.rotate(D30);
        ctx.beginPath();
        ctx.moveTo(radius, 0);
        ctx.lineTo(radius - 15, 0);
        ctx.stroke();
        // 绘制小刻度盘  线条粗细为1px
        ctx.setLineWidth(1);
      }
      for (let i = 0; i < 60; i++) {
        // 小刻度盘需要绘制60个线条  表示60分钟 或者60秒  每次旋转6秒
        ctx.rotate(D6);
        ctx.beginPath();
        ctx.moveTo(radius, 0);
        ctx.lineTo(radius - 10, 0); //小刻度盘长度10px
        ctx.stroke();
      }
      // 绘制文本
      ctx.setFontSize(20); //字号
      ctx.textBaseline = 'middle'; //文本垂直居中
      // 计算文本距离表盘中心的半径r
      let r = radius - 30;
      for (let i = 1; i <= 12; i++) {
        // 利用三角函数计算文本坐标
        let x = r * Math.cos(D30 * i - D90);
        let y = r * Math.sin(D30 * i - D90);
        if (i > 10) {
          // 调整11  12 的位置
          ctx.fillText(i, x - 12, y);
        } else {
          ctx.fillText(i, x - 6, y);
        }

      }

    }
    // 绘制指针部分
    function drawHand(ctx, radius) {
      // 获取当前时间
      let t = new Date();
      let h = t.getHours();
      let m = t.getMinutes();
      let s = t.getSeconds();
      h = h > 12 ? h - 12 : h;
      ctx.rotate(-D90);
      // 绘制时针
      ctx.save(); //记录旋转状态
      // 计算时针指向刻度
      // 通过30*h可以计算每个整点的旋转角度
      // 若是时间不是整点 通过h+m/60+s/3600计算偏移度
      ctx.rotate(D30 * (h + m / 60 + s / 3600));
      ctx.setLineWidth(6);
      ctx.beginPath();
      ctx.moveTo(-20, 0); //指针线条的起点  针尾留出20px
      ctx.lineTo(radius / 2.6, 0); //根据表盘半径计算指针线条长度
      ctx.stroke();
      ctx.restore(); //恢复旋转状态 重新指向12
      ctx.save();
      // 绘制分针
      ctx.rotate(D6 * (m + s / 60));
      ctx.setLineWidth(4);
      ctx.beginPath();
      ctx.moveTo(-20, 0);
      ctx.lineTo(radius / 1.8, 0);
      ctx.stroke();
      ctx.restore();
      // 绘制秒针
      ctx.save();
      ctx.rotate(D6 * s);
      ctx.setLineWidth(2);
      ctx.beginPath();
      ctx.moveTo(-20, 0);
      ctx.lineTo(radius / 1.6, 0);
      ctx.stroke();
      ctx.restore();

    }

  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    this.initCanvas();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },


})
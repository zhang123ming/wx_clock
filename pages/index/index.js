Page({
  data: {

  },

  onLoad: function() {
    this.canvas1();
    this.canvas2();
  },
  canvas2: function() {
    const ctx = wx.createCanvasContext('myCnavas2');
    // 设置线条颜色
    ctx.setStrokeStyle("#ff0000");
    ctx.setLineWidth(2);
    // 移动画笔位置
    ctx.moveTo(160, 100);
    ctx.arc(100,100, 60, 0, 2 * Math.PI, true);
    // 移动画笔的坐标位置  绘制嘴巴线条
    ctx.moveTo(140, 100);
    ctx.arc(100, 100, 40, 0, Math.PI, false);
    // 移动坐标位置 绘制左眼圈
    ctx.moveTo(85, 80);
    ctx.arc(80, 80, 5, 0, 2 * Math.PI, true);
    // 移动坐标位置   绘制右眼位置
    ctx.moveTo(125, 80);
    ctx.arc(120, 80, 5, 0, 2 * Math.PI, true);
    ctx.stroke();
    ctx.draw();


  },
  canvas1: function() {
    // one
    const ctx = wx.createCanvasContext('myCanvas1');
    // two  绘图描述
    ctx.setFillStyle('red');
    // 设置大小宽高
    ctx.fillRect(10, 20, 150, 75); //(x,y,w,h);
    // three  画图
    ctx.draw();

  }
})
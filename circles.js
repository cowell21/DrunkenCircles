var Circles = (function () {
  function Circle(centerX, centerY, radius) {
    this.centerX = centerX;
    this.centerY = centerY;
    this.radius = radius;
  }

  Circle.MAX_RADIUS = 25;
  Circle.randomCircle = function (maxX, maxY) {
    return new Circle(
      maxX * Math.random(),
      maxY * Math.random(),
      Circle.MAX_RADIUS * Math.random()
    );
  };

  Circle.prototype.moveRandom = function (maxX, maxY) {
    this.centerY = Math.abs((this.centerY + Math.random() * 2 - 1) % maxY);
    this.centerX = Math.abs((this.centerX + Math.random() * 2 - 1) % maxX);
  };

  Circle.prototype.render = function (ctx) {
    console.log(ctx);

    ctx.fillStyle = "black";
    ctx.beginPath();

    ctx.arc(
      this.centerX,
      this.centerY,
      this.radius,
      0,
      2 * Math.PI,
      false
    );

    ctx.fill();
  };

  function Game(xDim, yDim, numCircles) {
    this.xDim = xDim;
    this.yDim = yDim;

    this.circles = []
    for (var i = 0; i < numCircles; ++i) {
      this.circles.push(Circle.randomCircle(xDim, yDim));
    }
  }

  Game.prototype.render = function (ctx) {

    ctx.clearRect(0, 0, this.xDim, this.yDim);

    for (var i = 0; i < this.circles.length; ++i) {
      console.log(this.circles[i]);
      this.circles[i].render(ctx);
    }
  };

  Game.prototype.moveCircles = function () {
    for (var i = 0; i < this.circles.length; ++i) {
      this.circles[i].moveRandom(this.xDim, this.yDim);
    }
  };

  Game.prototype.start = function (canvasEl) {
    // get a 2d canvas drawing context. The canvas API lets us call
    // a `getContext` method on a cnvas DOM element.
    var ctx = canvasEl.getContext("2d");

    // render at 60 FPS
    var that = this;
    window.setInterval(function () {
      that.moveCircles();
      that.render(ctx);
    }, 100);
  };

  return {
    Circle: Circle,
    Game: Game
  };
})();

function graph(expression, canvasId, x1, x2, y1, y2, thickness){
  var canvas = document.getElementById(canvasId);
  var ctx = canvas.getContext("2d");
  ctx.fillStyle = "#000000";

  var leftBound = x1;
  var rightBound = x2;
  var bottomBound = y1;
  var topBound = y2;

  var vWidth = (rightBound - leftBound);
  var vHeight = (topBound - bottomBound);

  var height = canvas.height;
  var width = canvas.width;

  var xScaleFactor = vWidth / width;
  var yScaleFactor = vHeight / height;

  var pixelSize = thickness;

  var xPixel = 0;
  var yPixel = 0;

  var scope;

  var f = function(x){
    var scope = {
      x: x
    };
    math.eval(expression, scope);
    return scope.y;
    //return Math.eval(expression);
  }

  var dx = 0.1;
  var xNext;
  var yNext;

  for(var i = leftBound; i < rightBound; ){
    draw = 1;
    xPixel = i;
    yPixel = f(i);

    xNext = i+dx;
    yNext = f(i+dx)

    xPixel = xPixel - leftBound;
    yPixel = yPixel - bottomBound;
    xNext = xNext - leftBound;
    yNext = yNext - bottomBound;

    xPixel = xPixel/xScaleFactor;
    yPixel = yPixel/yScaleFactor;
    xNext = xNext/xScaleFactor;
    yNext = yNext/yScaleFactor;

    yPixel = height-yPixel;
    yNext = height-yNext;

    ctx.moveTo(xPixel,yPixel);
    ctx.lineTo(xNext, yNext);
    ctx.stroke();


    i=i+dx;
  }


}

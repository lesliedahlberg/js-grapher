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

  var f = function(x){
    return eval(expression)
  }

  var precision = height;

  for(var i = leftBound*precision; i < rightBound*precision; ){
    xPixel = i/precision;
    yPixel = f(i/precision);

    xPixel = xPixel - leftBound;
    yPixel = yPixel - bottomBound;

    xPixel = xPixel/xScaleFactor;
    yPixel = yPixel/yScaleFactor;

    yPixel = height-yPixel;
    ctx.fillRect(xPixel,yPixel,pixelSize,pixelSize);
    i++;
  }

}

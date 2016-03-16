function graph(expression, canvasId, x1, x2, y1, y2, thickness){
  var canvas = document.getElementById(canvasId);
  var ctx = canvas.getContext("2d");

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

  var xPixel;
  var yPixel;


  var f = function(x){
    var scope = {
      x: x
    };
    math.eval(expression, scope);
    return scope.y;
  }

  var delta = xScaleFactor;
  var dx;
  var diff;
  var it = 0;


  for(var i = leftBound; i < rightBound; ){

    xPixel = i;
    yPixel = f(xPixel);

    ctx.fillStyle = "#FF0000";

    dx = (yPixel-f(xPixel+delta))/delta;
    diff=1;
    if(math.abs(dx) > 1/2){
      diff = math.abs(dx)*2;
      diff = math.min(diff, height/pixelSize)
      ctx.fillStyle = "#0000FF";
    }

    xPixel -= leftBound;
    yPixel -= bottomBound;

    xPixel /= xScaleFactor;
    yPixel /= yScaleFactor;

    yPixel = height-yPixel;


    ctx.fillRect(xPixel,yPixel,pixelSize,pixelSize);

    i=i+delta/diff;
    it++;

  }
  alert(it);


}

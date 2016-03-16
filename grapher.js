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

  var xPixel = 0;
  var yPixel = 0;

  var scope;

  var f = function(x){
    var scope = {
      x: x
    };
    math.eval(expression, scope);
    return scope.y;
  }

  var delta = 0.01;
  var dx = 0;
  var xNext;
  var yNext;

  var color = 1;
  var add;

  for(var i = leftBound; i < rightBound; ){
    xPixel = i;
    yPixel = f(xPixel);

    xNext = i+delta;
    yNext = f(xNext);

    dx = (yNext-yPixel)/delta;

    //if(dx < 1 && dx > -1){
      //dx /= 4;
      add = delta*math.pow((math.abs(dx)),3);
      //add = math.abs(dx);
      //alert(add);
      xNext = i+delta+add;
      yNext = f(xNext);
    //}else{
      //add = 0;
    //}


    xPixel -= leftBound;
    yPixel -= bottomBound;
    xNext -= leftBound;
    yNext -= bottomBound;

    xPixel /= xScaleFactor;
    yPixel /= yScaleFactor;
    xNext /= xScaleFactor;
    yNext /= yScaleFactor;

    yPixel = height-yPixel;
    yNext = height-yNext;

    ctx.beginPath();
    ctx.moveTo(xPixel,yPixel);
    ctx.lineTo(xNext, yNext);

    ctx.strokeStyle = "#00ff00";
    if(color == 1){
      color = 0;
      ctx.strokeStyle = "#ff0000";
    }else{
      color = 1;
    }

    ctx.stroke();

    i=i+delta+add;

  }


}

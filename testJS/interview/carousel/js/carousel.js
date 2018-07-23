  function animate(ele, prop, next) {
    var moveSpeed = (next - ele[prop]) / 10,
      i = 0;
    (function () {
      ele[prop] = ele[prop] + moveSpeed;
      i++;
      if (i < 10) {
        setTimeout(arguments.callee, 60);
      }
    })();
  }
  var go = function (direction) {
    var ele = $('.carousel-container');
    var nextPosition;
    var width = document.getElementsByTagName('img')[0].width; //图片宽度
    var len = document.getElementsByTagName('li').length;
    if (direction == 'prev') {
      nextPosition = ele.scrollLeft === 0 ? width*(len - 1) : ele.scrollLeft - width;
      animate(ele, 'scrollLeft', nextPosition);
    }
    if (direction == 'next') {
      nextPosition = ele.scrollLeft === width*(len - 1) ? 0 : ele.scrollLeft + width;
      animate(ele, 'scrollLeft', nextPosition);
    }
  }
  window.onload = function () {
    var carousel = $('ul');
    addClass(carousel,'animate');
    $.click('.arrow-prev',function () {
      go('prev');
    })
    $.click('.arrow-next',function () {
      go('next');
    })
    var contey = document.getElementById('list');
    addEvent('.carousel-container', 'mouseenter', function () {
      removeClass(carousel, 'animate');
    })
    addEvent('.carousel-container', 'mouseleave', function () {
      addClass(carousel,'animate');
    })
  }
function hasClass(ele, className) {
  if (ele&&ele.className) {
    var classArray = ele.className.split(/\s+/);
    if (classArray.indexOf(className) != -1) {
      return true;
    }
  }
  return false;
}

function addClass(ele, newClass) {
  if (!hasClass(ele, newClass)) {
    ele.className = ele.className?[ele.className,newClass].join(' '):newClass;
  }
}

function removeClass(ele, oldClass) {
  var classArray = ele.className.split(/\s+/);
  var index = classArray.indexOf(oldClass);
  if ( index != -1) {
    classArray.splice(index, 1);
  }
  ele.className = classArray.join(' ');
}

function $(selector){
  var all=selector.split(/\s+/);
  var result = [],rooot=[document];
  for (var i = 0; i < all.length; i++) {
    var type=all[i][0];
    switch(type){
      //ID
      case "#" :
        for (var j = 0; j < rooot.length; j++) {
          var ele=rooot[j].getElementById(all[i].slice(1));
          if (ele) {
            result.push(ele);
          }
        }
        break;

      //class
      case ".":
        for (var j = 0; j < rooot.length; j++) {
          if (document.getElementsByClassName) {
            var eles=rooot[j].getElementsByClassName(all[i].slice(1));
            if (eles) {
              result=result.concat(Array.prototype.slice.call(eles));
            }
          }else{
            var arr = rooot[j].getElementsByTagName("*");
            for (var i = 0; i < arr.length; i++) {
              if (hasClass(arr[i], className)) {
                result.push(arr[i]);
              }
            }
          }
        }
        break;
      //属性
      case "[":
        var att = all[i].slice(1,all[i].length-1).split("=");
        var key = att[0],value=att[1];
        for (var j = 0; j < rooot.length; j++) {
          var eles=rooot[j].getElementsByTagName("*");
          for (var i = 0; i < eles.length; i++) {
            if (value) {
              for (var i = 0; i < eles.length; i++) {
                if(eles[i].getAttribute(key)==value){
                  result.push(eles[i]);
                }
              }
            }else{
              for (var i = 0; i < eles.length; i++) {
                if(eles[i].getAttribute(key)){
                  result.push(eles[i]);
                }
              }
            }
          }
        }
        break;
      //tag
      default:
        for (var j = 0; j < rooot.length; j++) {
          eles=rooot[j].getElementsByTagName(all[i]);
          if (eles) {
            result=result.concat(Array.prototype.slice.call(eles));
          }
        }
    }//switch
    rooot=result;
    result=[];
  }//for
  return rooot[0];
}
function addEvent(selector, event, listener) {
  var ele = $(selector);
  if (ele.addEventListener) {
    ele.addEventListener(event, listener, false);
  } else {
    ele.attachEvent('on' + event, listener);
  }
}
$.click = function (selector, listener) {
  addEvent(selector, 'click', listener);
};
$.add = function (selector, event, listener) {
  var ele = document.getElementsByClassName(selector);
  console.log(ele);
  addEvent(selector, event, listener);
};
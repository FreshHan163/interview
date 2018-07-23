/**
 * Created by sina on 2017/10/9.
 */
//    创建路线展示面板
function  create_list_row(data) {
    var list_panel = document.getElementById('list-panel');
    if( !list_panel ) return false;

    for(var i=0; i<data.length && i < 10; i++) {

        var list_row = document.createElement('div');
        var list_row_number = document.createElement('div');
        var list_row_start = document.createElement('div');
        var list_row_end = document.createElement('div');
        var list_row_path = document.createElement('div');

        //创建一行
        list_row.setAttribute("class", "list-row");
        list_row.setAttribute("id", "list_row_" + i +"");

        //创建行里的内容
        list_row_number.setAttribute("class", "list-row-number");
        list_row_number.innerHTML =  i + 1;
        list_row_start.setAttribute("class", "list-row-start");
//        list_row_start.innerHTML = document.getElementsByClassName("choice-btn")[0].childNodes[0].nodeValue;
        list_row_start.innerHTML = data[i].start;
        list_row_end.setAttribute("class", "list-row-end");
        list_row_end.innerHTML = data[i].end;
        list_row_path.setAttribute("class", "list-row-path");
        list_row_path.innerHTML = data[i].people;


        list_row.appendChild(list_row_number);
        list_row.appendChild(list_row_start);
        list_row.appendChild(list_row_end);
        list_row.appendChild(list_row_path);
        list_panel.appendChild(list_row);
    }
}
//创建地图
var map = new AMap.Map('container', {
    resizeEnable: false,
    zoom: 6
});
map.setMapStyle('amap://styles/blue');      //设置地图样式
map.setFeatures(["bg","road"]);             //设置地图显示内容

//加载地图控件
AMapUI.load(['ui/misc/PathSimplifier', 'ui/overlay/SimpleMarker','lib/$', 'lib/utils'], function(PathSimplifier, SimpleMarker, $, utils) {

    if (!PathSimplifier.supportCanvas) {
        alert('当前环境不支持 Canvas！');
        return;
    }

    //创建轨迹样式
    var pathSimplifierIns = new PathSimplifier({
        zIndex: 100,
        map: map,
        getPath: function(pathData, pathIndex) {

            //返回轨迹数据中的节点坐标信息
            return pathData.path;
        },
        getHoverTitle: function(pathData, pathIndex, pointIndex) {
            //返回鼠标悬停时显示的信息
            if (pointIndex >= 0) {
                //point
                return pathData.name + '，点:' + pointIndex + '/' + pathData.path.length;
            }
            return pathData.name + '，点数量' + pathData.path.length;
        },
        renderOptions: {
            //轨迹线的样式
            pathLineStyle: {
                strokeStyle: 'rgba(255,255,255,0.1)',
                lineWidth: 0.2,
                borderWidth: 0,
                dirArrowStyle: false

            },
            //被选中的轨迹线样式
            pathLineSelectedStyle: {
                strokeStyle: 'white',
                lineWidth: 0.2,
                borderWidth: 0,
                dirArrowStyle: false
            },
            //开始节点
            startPointStyle: {
                radius: 2,
                fillStyle: 'rgba(253,75,13,1)',
                strokeStyle: 'rgba(253,75,13,1)',
                lineWidth: 0
            },
            //结束节点
            endPointStyle: {
                radius: 1,
                fillStyle: 'rgba(253,75,13,1)',
                strokeStyle: 'rgba(253,75,13,1)',
                lineWidth: 0
            }
        }
    });

    //加载轨迹
    window.pathSimplifierIns = pathSimplifierIns;

    //创建轨迹数组dataArr，为对象数组
    var dataArr = [];

    //创建数组里的对象
    function dataObject(name, path){
        this.name = name;
        this.path = path;       //path是一个对象数组
    }

    //从json文本中读取数据
    $.getJSON('json/path.json', function(d) {
        //设置路径数据，创建轨迹
        createPathData(d);

        //设置轨迹巡航路径
        initPath(d);

        //创建路线面板
        create_list_row(d);
    });

    //创建路径数据
    function createPathData(d) {

        for(var i=0; i<d.length - 37; i++) {
            var path_arr = [];              //路径数组
            var start_point = [parseFloat(d[i].start_loc.split(",")[1]), parseFloat(d[i].start_loc.split(",")[0])];
            var end_point = [parseFloat(d[i].end_loc.split(",")[1]), parseFloat(d[i].end_loc.split(",")[0])];
            var start_lng = parseFloat(d[i].start_loc.split(",")[1]);
            var start_lat = parseFloat(d[i].start_loc.split(",")[0]);
            var end_lng = parseFloat(d[i].end_loc.split(",")[1]);
            var end_lat = parseFloat(d[i].end_loc.split(",")[0]);
            var k = Math.abs(start_lat - end_lat);
            // console.log(d[i].end);

            // console.log("start_point: " + start_point);
            // console.log("end_point: " + end_point);

            var z;
            if( k <= 1.5) {
                z =0.5;
            } else if( k > 1.5 & k < 2){
                z = 1;
            } else if( k>= 2 & k < 4) {
                z =3;
            } else {
                z =4;
            }
            var mid_lng = (start_lng + z + end_lng) / 2;
            var mid_lat = (start_lat + z + end_lat) / 2;
            var mid_point = [mid_lng, mid_lat];
//                path_arr.push(start_point);
//                path_arr.push(mid_point);
//                path_arr.push(end_point);

            for(var t=0; t<1;) {
                var x = (1 - t) * (1 - t) * start_lng + 2 * t * (1 - t) * mid_lng + t * t * end_lng;
                var y = (1 - t) * (1 - t) * start_lat + 2 * t * (1 - t) * mid_lat + t * t * end_lat;
                var p = [x, y];
                t += 0.01;
                path_arr.push(p);
            }
//                path_arr.push(start_point);
//                path_arr.push(end_point);
//
            var path_data = new dataObject(
                d[i].start + "->" + d[i].end,       //name
//                    PathSimplifier.getGeodesicPath(start_point, end_point, 20000)                      //对象数组
                path_arr
            );
            dataArr.push(path_data);

            if(d[i].people > 100) {
                new SimpleMarker({
                    //显示定位基点
                    showPositionPoint: true,
                    iconLabel:{
                        innerHTML: d[i].end,
                        style:{
                            color: 'rgb(255,255,255)',
                            fontSize: "50%"
//                                marginTop: '-10px'
                        }
                    },
                    iconStyle: '',
                    map: map,
                    position: [parseFloat(d[i].end_loc.split(",")[1]), parseFloat(d[i].end_loc.split(",")[0])]
                });
            }

        }
        // console.log(dataArr);
        pathSimplifierIns.setData(dataArr);
    }

    //初始化路径数据
    function initPath(data) {
        for(var i=0; i<data.length-37; i++) {
            initRouteItem(data[i],i);
        }
    }

    //初始化每一条路径
    function initRouteItem(pathData, idx) {
        getNavg(idx, pathData.people / 2000);       //设置路径宽度
        if(pathNavigs[idx]) {
            pathNavigs[idx].setSpeed(parseFloat(pathData.time)*30000);        //设置路径速度
        }
        return pathNavigs[idx];
    }

    //创建轨迹巡航器数组，一条路径创建一个轨迹巡航器
    var pathNavigs = [];
    function getNavg(pathIndex, width) {
        if(!pathNavigs[pathIndex]) {
            //创建一个轨迹巡航器
            var navg = pathSimplifierIns.createPathNavigator(pathIndex, {
                loop: true,
                speed: 70000,
                pathNavigatorStyle: {
                    width: 1,
                    height: 1,
                    content: 'none',
                    fillStyle: 'rgb(253,75,13)',
                    strokeStyle: 'rgb(253,75,13)',
                    pathLinePassedStyle: {
                        strokeStyle: 'rgb(253,217,35)',
                        lineWidth: width,
                        borderWidth: 0
                    }
                }
            });
            navg.start();
            pathNavigs[pathIndex] = navg;
        }
        return pathNavigs[pathIndex];
    }

});

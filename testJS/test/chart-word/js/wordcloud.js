$(document).ready( function () {

    // 获取数据库中图表数据
    $.ajax({
        url: "../Index/Index/printword",
        method: "GET",
        async: false,
        data: {
            id: '181'
        },
        success:function(data) {
            if(data) {
                obj = eval('(' + data + ')');   //把json字符串转换为json对象
            } else {
                alert("error");
            }
        }
    });

    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('echarts_map'));
    var maskImage = new Image();
    // alert(maskimage.src);
    //准备数据
    option = {
        backgroundColor: '#fff',
        title: {
            text: '热点分析',
            link: 'https://www.baidu.com/s?wd=' + encodeURIComponent('ECharts'),
            textStyle: {
                fontSize: 23,
                color: 'white'
            },
            subtext: '副标题文本',
            subtextStyle: {
                color: '#eee'
            },
            left: 'left'
        },
        tooltip: {
            show: true
        },
        toolbox: {
            show: true,
            orient: 'vertical',
            left: 'right',
            top: 'center',
            iconStyle: {
                normal: {
                    borderColor: 'red',
                    color: 'none'
                },
                emphasis: {
                    borderColor: 'pink'
                }
            },
            feature: {
                mark: {show: true},
                dataView: {show: true, readOnly: false},
                restore: {show: true},
                saveAsImage: {show: true}
            }
        },
        series: [{
            name: '热点分析',
            type: 'wordCloud',
            shape: 'circle',
            // maskImage: maskImage,
            // drawOutOfBound: false,
            sizeRange: [12,60],
            gridSize: 4,
            rotationRange: [-45, 90],
            autoSize: {
                enable: true,
                minSize: 6
            },
            textStyle: {
                normal: {
                    color: function() {
                        return 'rgb(' + [
                            Math.round(Math.random() * 160),
                            Math.round(Math.random() * 160),
                            Math.round(Math.random() * 160)
                        ].join(',') + ')';
                    }
                },
                emphasis: {
                    shadowBlur: 10,
                    shadowColor: '#333'
                }
            }
        }]
    };

    var JosnList = obj;     //数据
    option.series[0].data = JosnList;

/*    maskImage.onload = function () {
        option.series[0].maskImage
        console.log(option.series[0].maskImage);
    }*/

    // 使用刚指定的配置项和数据显示图表
    maskImage.src = '../../public/image/delete.png';
    myChart.setOption(option);

    $('.nav-content a').on('click',function(){
        $(this).parent().addClass('active')
            .siblings().removeClass('active');
    });

    $('.echarts-tab a').on('click',function(){
        $(this).parent().addClass('active')
                .siblings().removeClass('active');
        var choose=$(this).attr('class');
        var $refer=$('#echarts_keyword_attr1');
        var $search=$('#echarts_keyword_attr2');
        if(choose=='refer'){
            $refer.show();
            $search.hide();
        }else if(choose=='search'){
            $search.show();
            $refer.hide();
        }
    });

    $('.goback-content a').on('click',function(){
        window.location.href="index.html";
    });

    // 上传文件后，显示文件名
    $(".showfile").on("change","input[type='file']",function(){
        var filePath=$(this).val();     //获取上传文件的路径
        var importfile=$("<input type='file' name='file[]' class='importfile' id='importfile'>");

        // 如果文件是jpg或png格式的图片，显示文件名
        if(filePath.indexOf("jpg")!=-1 || filePath.indexOf("png")!=-1){
            $(".filetip").html("").hide();
            var arr=filePath.split('\\');
            var fileName=arr[arr.length-1];
            $(".showfile").text(fileName);
            $(".showfile").prepend(importfile);
        }else{
            $(".showfile").text("请选择文件");
            $(".showfile").prepend(importfile);
            $(".filetip").text("格式有误！").show();
            return false;
        }

    });

    // 查看图表时，获取图表类型
    if ($('#charttype').attr('charttype') != '') {
        $('.typeoption').each(function () {
            if ($(this).val() == $('#charttype').attr('charttype')) {
                $(this).attr("selected", true);
            }
        });
    }

    // 拾色器，显示颜色值和颜色
    $(".colorpicker_component").ColorPicker({
        onSubmit: function (hsb, hex, rgb,el) {
            $(el).val("#" + hex);
            $(el).ColorPickerHide();
            $(el).siblings().children('.colorpicker_element').css('backgroundColor', '#' + hex);//设置文本框的背景颜色为选定的RGB颜色
            // console.log(el);
        }
    });

    option = myChart.getOption();   //获取图表系列值
    console.log(option);

    // 获取当前样式——基本功能
    $('#bgc').val($('.echarts_bg').css("backgroundColor"));
    $('#title_text').val(option.title[0].text);
    $('#title_color').val(option.title[0].textStyle.color);
    $('#subtitle_text').val(option.title[0].subtext);
    $('#subtitle_color').val(option.title[0].subtextStyle.color);
    // 获取标题的对齐方式
    var title_align = option.title[0].left;
    switch(title_align) {
        case 'left' :
            $("#title_align_left").css("color","blue");
            break;
        case 'center' :
            $("#title_align_center").css("color","blue");
            break;
        case 'right' :
            $("#title_align_right").css("color","blue");
            break;
        default:
            break;
    }
    // 获取工具箱颜色

    // 判断当前图形类型
    type = option.series[0].type;
    // 根据图形类型，获取当前值
    judgeChartType(type);
    
    // 遍历所有的input-group样式，若存在colorpicker_component，则增加背景色
    $(".input-group").each(function(){
        var bgcolor = $(this).find(".colorpicker_component").val();
        $(this).find(".colorpicker_element").css("backgroundColor",bgcolor);
    });

    // 设置标题对齐方式
    $(".title_align").on("click",function(){
        title_align = $(this).attr("value");
        $(this).css("color","blue");
        $(this).siblings().css("color","black");
    });

    // 词云图——自定义样式时，显示字符图案
    $('#word_shape').click(function(){
        var word_shape = $(this).find('option:selected').val();      //词云图案形状
        if(word_shape == "custom") {
            $('.word_image').css('display','block');
        } else {
            $('.word_image').css('display','none');
        }
    });
    
    // 词云图——自定义颜色时，显示颜色选择器
    $('#word_setcolor').click(function() {
        var word_setcolor = $(this).find('option:selected').val();      //词云图案形状
        if(word_setcolor == 'gradient') {
            $('.word_textcolor').css('display','block');
        } else if(word_setcolor == 'single') {
            $('.word_textcolor').css('display','block');
        } else {
            $('.word_textcolor').css('display','none');
        }
    });

    // 字符云图形设置
    function setType(type){
        
    }
    // 重置图形样式
    $('#creatchart').click(function(){

        // 设置图形标题名称为任务名称
        var echarts_title = $("#taskname").val();
        $(".echarts-title").find("span").text(echarts_title);

        // 获取基本功能系列颜色和设置
        var bgc = $('#bgc').val();      //背景颜色
        var title_text = $('#title_text').val();    //主标题文本
        var title_color = $('#title_color').val();  //主标题文字颜色
        var subtitle_text = $('#subtitle_text').val();  //副标题文字
        var subtitle_color = $('#subtitle_color').val();    //副标题文字颜色

        // 设置基本功能样式
        option.backgroundColor = bgc;
        option.title[0].text = title_text;
        option.title[0].textStyle.color = title_color;
        option.title[0].subtext = subtitle_text;
        option.title[0].subtextStyle.color = subtitle_color;
        option.title[0].left = title_align;

        // 根据图形类型，生成新的图形样式
        setChart(type);

        myChart.setOption(option);
        console.log(option.series[0].textPadding);
    });

    // 清空图表，释放图表实例，释放后实例不再可用
    $('.resetchart').click(function(){
        myChart.clear();
        myChart.dispose();
    });

    // 保存图表，再次查看时保留当前样式
    $('.savechart').click(function(){
        var saveoption = myChart.getOption();        //获取当前样式值
        // 提交当前样式值，修改json文件
/*        $.ajax({
            url: "",
            method: "GET",
            data: {
                id: '189'
            },
            success:function(data) {
                if(data) {
                        
                } else {
                    alert("error");
                }
            }
        });*/
    });

    console.log(option);
});
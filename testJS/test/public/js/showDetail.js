	$(document).ready(function(){
		alert("js文件");
		// 阻止 tab-pane的默认显示
		$('#myTab a').click(function(e) {
            e.preventDefault();
            $(this).tab('show');

        });
        $('.menu_2 a').click(function(e) {
            e.preventDefault();
            $(this).tab('show');
        });
        // 点击标签时，激活标签
		 $('.menu_datas').click(function(){
            $(this).siblings().removeClass("active");
            $(this).addClass("active");
        });
		show_detail();
	});
function show_detail(){
	$.ajax({
		async:false,
		method:"POST",
		url: ajaxurl,
		data:{id:$("#hide_id").val()},
		dataType:'json',
		success:function(result){
					// alert(result);
					var mentionChart=echarts.init(document.getElementById('kwMention'));
					mentionoption = {
						title: {
							text: result['name'][0].name+' 关键词提及量变化',
							subtext: 'Source:新浪微博数据中心',
							left: 'center'
						},
						tooltip : {
							trigger: 'axis'
						},
						grid: {
							left: '3%',
							right: '4%',
							bottom: '3%',
							containLabel: true
						},
						xAxis : [
							{
								type : 'category',
								boundaryGap : false,
								data : ['2016-07-01', '2016-07-02', '2016-07-03', '2016-07-04', '2016-07-05', '2016-07-06', '2016-07-07'],
							}
						],
						yAxis : [
							{
								type : 'value'
							}
						],
						series : [
							{
								name:result['name'][0].name,
								type:'line',
								stack: '总量',
								label: {
									normal: {
										//show: true,
										position: 'top'
									}
								},
								data:[1, 2, 3, 33179, 22381, 55217, 22479, ],
							}
						]
					};
					mention_num = result['mention'];
					mentionoption.xAxis[0].data = [];
					mentionoption.series[0].data = [];
					for(var i in mention_num){
						var item1 = i;
						// alert(item1);
						mentionoption.xAxis[0].data.push(item1);
						mentionoption.series[0].data.push(mention_num[i][0]);
					}
					mentionChart.setOption(mentionoption);

					var seachChart=echarts.init(document.getElementById('kwSeach'));
					seachOption= {
						title: {
							text: result['name'][0].name+'关键词搜索量变化',
							subtext: 'Source:新浪微博数据中心',
							left: 'center'
						},
						tooltip : {
							trigger: 'axis'
						},
						grid: {
							left: '3%',
							right: '4%',
							bottom: '3%',
							containLabel: true
						},
						xAxis : [
							{
								type : 'category',
								boundaryGap : false,
								data : ['2016-07-01', '2016-07-02', '2016-07-03', '2016-07-04', '2016-07-05', '2016-07-06', '2016-07-07'],
							}
						],
						yAxis : [
							{
								type : 'value'
							}
						],
						series : [
							{
								name:result['name'][0].name,
								type:'line',
								stack: '总量',
								label: {
									normal: {
										show: true,
										position: 'top'
									}
								},
								data:[14994, 32459, 11344, 33179, 22381, 55217, 22479, ],
							}
						]
					};
					
					search_num = result['search'];
					seachOption.xAxis[0].data = [];
					seachOption.series[0].data = [];
					for(var i in search_num){
						var item2 = i;
						// alert(item1);
						seachOption.xAxis[0].data.push(item2);
						seachOption.series[0].data.push(search_num[i][0]);
					}
					seachChart.setOption(seachOption);


					var evaluationChart=echarts.init(document.getElementById('kwEvaluation'));
					evaluationOption = {
						title: {
							text: result['name'][0].name+'关键词口碑变化',
							subtext: 'Source:新浪微博数据中心',
							left: 'center'
						},
						tooltip: {
							trigger: 'axis'
						},
						legend: {
							x: 'right',                         
							//y: 'middle',  
						   // orient: 'vertical',
							data:['正面口碑','中性口碑','负面口碑'],
							top:'17%'
						},
						grid: {
							left: '3%',
							right: '4%',
							bottom: '3%',
							top:90,
							containLabel: true
						},
						xAxis: {
							type: 'category',
							boundaryGap: false,
							data: ['2016-07-01', '2016-07-02', '2016-07-03', '2016-07-04', '2016-07-05', '2016-07-06', '2016-07-07'],
						},
						yAxis: {
							type: 'value'
						},
						series: [
							{
								name:'正面口碑',
								type:'line',
								stack: '总量',
								data:[10, 132, 101, 134, 90, 130, 210]
							},
							{
								name:'中性口碑',
								type:'line',
								stack: '总量',
								data:[10, 132, 191, 234, 290, 130, 210]
							},
							{
								name:'负面口碑',
								type:'line',
								stack: '总量',
								data:[10, 132, 201, 154, 190, 130, 210]
							}
						]
					};
					evaluation = result['evaluation'];
					evaluationOption.xAxis.data = [];
					evaluationOption.series[0].data = [];
					evaluationOption.series[1].data = [];
					evaluationOption.series[2].data = [];
					for(var i in evaluation){
						var item3 = evaluation[i];
						evaluationOption.xAxis.data.push(item3['d']);
						evaluationOption.series[0].data.push(item3['p']);
						evaluationOption.series[1].data.push(item3['e']);
						evaluationOption.series[2].data.push(item3['n']);
					}
					evaluationChart.setOption(evaluationOption);

					var fansAnumChart=echarts.init(document.getElementById('fansAnum'));
					fansAnumOption = {
						title: {
							text: result['name'][0].name+'微博活跃粉丝数据',
							subtext: 'Source:新浪微博数据中心',
							//textAlign: 'left',
							left: 'center'
						},
						tooltip: {
							trigger: 'axis'
						},
						legend: {
							x: 'right',                         
							//y: 'middle',  
						   // orient: 'vertical',
							data:['日活跃粉丝数','月活越粉丝数'],
							top:50,
						},
						grid: {
							left: '3%',
							right: '4%',
							bottom: '3%',
							top:90,
							containLabel: true
						},
						xAxis: {
							type: 'category',
							boundaryGap: false,
							data: ['2016-07-01', '2016-07-02', '2016-07-03', '2016-07-04', '2016-07-05', '2016-07-06', '2016-07-07'],
						},
						yAxis: {
							type: 'value'
						},
						series: [
							{
								name:'日活跃粉丝数',
								type:'line',
								stack: '总量',
								data:[120, 132, 101, 134, 90, 230, 210]
							},
							{
								name:'月活越粉丝数',
								type:'line',
								stack: '总量',
								data:[220, 182, 191, 234, 290, 330, 310]
							}
						]
					};
					afans = result['uid_fans'];
					fansAnumOption.xAxis.data = [];
					fansAnumOption.series[0].data = [];
					fansAnumOption.series[1].data = [];
					for(var i in afans){
						var item4 = i;
						fansAnumOption.xAxis.data.push(item4);
						fansAnumOption.series[0].data.push(afans[i][3]);
						fansAnumOption.series[1].data.push(afans[i][4]);
						
					}
					fansAnumChart.setOption(fansAnumOption);

					var fansNumChart=echarts.init(document.getElementById('fansNum'));
					fansNumOption = {
						title: {
							text: result['name'][0].name+'微博粉丝数据',
							subtext: 'Source:新浪微博数据中心',
							//textAlign: 'left',
							left: 'center'
						},
						tooltip: {
							trigger: 'axis'
						},
						legend: {
							x: 'right',                         
							//y: 'middle',  
						   // orient: 'vertical',
							data:['粉丝数','排垃圾后粉丝数'],
							top:50,
						},
						grid: {
							left: '3%',
							right: '4%',
							bottom: '3%',
							top:90,
							containLabel: true
						},
						xAxis: {
							type: 'category',
							boundaryGap: false,
							data: ['2016-07-01', '2016-07-02', '2016-07-03', '2016-07-04', '2016-07-05', '2016-07-06', '2016-07-07'],
						},
						yAxis: {
							type: 'value'
						},
						series: [
							{
								name:'粉丝数',
								type:'line',
								stack: '总量',
								data:[120, 132, 101, 134, 90, 230, 210]
							},
							{
								name:'排垃圾后粉丝数',
								type:'line',
								stack: '总量',
								data:[220, 182, 191, 234, 290, 330, 310]
							}
						]
					};
					// fans = result['fans'];
					fansNumOption.xAxis.data = [];
					fansNumOption.series[0].data = [];
					fansNumOption.series[1].data = [];
					for(var i in afans){
						var item5 = i;
						fansNumOption.xAxis.data.push(item5);
						fansNumOption.series[0].data.push(afans[i][1]);
						fansNumOption.series[1].data.push(afans[i][2]);
						
					}
					fansNumChart.setOption(fansNumOption);
					
					var blogNumChart=echarts.init(document.getElementById('blogNum'));
					blogNumOption = {
						title: {
							text: result['name'][0].name+'微博账号主动博文数据',
							subtext: 'Source:新浪微博数据中心',
							//textAlign: 'left',
							left: 'center'
						},
						tooltip: {
							trigger: 'axis'
						},
						legend: {
							x: 'right',                         
							//y: 'middle',  
						   // orient: 'vertical',
							data:['发博量','转发量','评论量'],
							top:50,
						},
						grid: {
							left: '3%',
							right: '4%',
							bottom: '3%',
							top:90,
							containLabel: true
						},
						xAxis: {
							type: 'category',
							boundaryGap: false,
							data: ['2016-07-01', '2016-07-02', '2016-07-03', '2016-07-04', '2016-07-05', '2016-07-06', '2016-07-07'],
						},
						yAxis: {
							type: 'value'
						},
						series: [
							{
								name:'发博量',
								type:'line',
								stack: '总量',
								data:[120, 132, 101, 134, 90, 230, 210]
							},
							{
								name:'转发量',
								type:'line',
								stack: '总量',
								data:[220, 182, 191, 234, 290, 330, 310]
							},
							{
								name:'评论量',
								type:'line',
								stack: '总量',
								data:[120, 382, 291, 134, 90, 310, 810]
							}
						]
						
					};
					blog = result['uid_uidcontent'];
					blogNumOption.xAxis.data = [];
					blogNumOption.series[0].data = [];
					blogNumOption.series[1].data = [];
					blogNumOption.series[2].data = [];
					for(var i in blog){
						var item6 = i;
						blogNumOption.xAxis.data.push(item6);
						blogNumOption.series[0].data.push(blog[item6][1]);
						blogNumOption.series[1].data.push(blog[item6][3]);
						blogNumOption.series[2].data.push(blog[item6][4]);
					}
					
					blogNumChart.setOption(blogNumOption);
					
					var blogRnumChart=echarts.init(document.getElementById('blogRnum'));
					blogRnumOption = {
						title: {
							text: result['name'][0].name+'微博账号博文曝光量与阅读量',
							subtext: 'Source:新浪微博数据中心',
							//textAlign: 'left',
							left: 'center'
						},
						tooltip: {
							trigger: 'axis'
						},
						legend: {
							x: 'right',                         
							//y: 'middle',  
						   // orient: 'vertical',
							data:['博文日均曝光量','博文日均阅读量'],
							top:50,
						},
						grid: {
							left: '3%',
							right: '4%',
							bottom: '3%',
							top:90,
							containLabel: true
						},
						xAxis: {
							type: 'category',
							boundaryGap: false,
							data: ['2016-07-01', '2016-07-02', '2016-07-03', '2016-07-04', '2016-07-05', '2016-07-06', '2016-07-07'],
						},
						yAxis: {
							type: 'value'
						},
						series: [
							{
								name:'博文日均曝光量',
								type:'line',
								stack: '总量',
								data:[120, 132, 101, 134, 90, 230, 210]
							},
							{
								name:'博文日均阅读量',
								type:'line',
								stack: '总量',
								data:[220, 182, 191, 234, 290, 330, 310]
							}
						]
						
					};
					blogRnum = result['blogRnum'];
					blogRnumOption.xAxis.data = [];
					blogRnumOption.series[0].data = [];
					blogRnumOption.series[1].data = [];
					for(var i in blogRnum){
						var item7 = blogRnum[i];
						blogRnumOption.xAxis.data.push(item7['d']);
						blogRnumOption.series[0].data.push(item7['e']);
						blogRnumOption.series[1].data.push(item7['r']);
						
					}
					blogRnumChart.setOption(blogRnumOption);
					
					var blogCnumChart=echarts.init(document.getElementById('blogCnum'));
					blogCnumOption = {
						title: {
							text: result['name'][0].name+' 微博账号互动数据',
							subtext: 'Source:新浪微博数据中心',
							//textAlign: 'left',
							left: 'center'
						},
						tooltip: {
							trigger: 'axis'
						},
						legend: {
							x: 'right',                         
							//y: 'middle',  
						   // orient: 'vertical',
							data:['发博量','转发量','评论量'],
							top:50,
						},
						grid: {
							left: '3%',
							right: '4%',
							bottom: '3%',
							top:90,
							containLabel: true
						},
						xAxis: {
							type: 'category',
							boundaryGap: false,
							data: ['2016-07-01', '2016-07-02', '2016-07-03', '2016-07-04', '2016-07-05', '2016-07-06', '2016-07-07'],
						},
						yAxis: {
							type: 'value'
						},
						series: [
							{
								name:'发博量',
								type:'line',
								stack: '总量',
								data:[120, 132, 101, 134, 90, 230, 210]
							},
							{
								name:'转发量',
								type:'line',
								stack: '总量',
								data:[220, 182, 191, 234, 290, 330, 310]
							},
							{
								name:'评论量',
								type:'line',
								stack: '总量',
								data:[120, 382, 291, 134, 90, 310, 810]
							}
						]
						
					};
					blogCnum = result['uid_uidcontent'];
					blogCnumOption.xAxis.data = [];
					blogCnumOption.series[0].data = [];
					blogCnumOption.series[1].data = [];
					blogCnumOption.series[2].data = [];
					for(var i in blogCnum){
							var item8 = i;
							blogCnumOption.xAxis.data.push(item8);
							blogCnumOption.series[0].data.push(blogCnum[item8][1]);
							blogCnumOption.series[1].data.push(blogCnum[item8][3]);
							blogCnumOption.series[2].data.push(blogCnum[item8][4]);
						
					}
					blogCnumChart.setOption(blogCnumOption);

					var translateChart=echarts.init(document.getElementById('blogTranslate'));
					translateOption = {
						title: {
							text: '电影'+result['name'][0].name+' 指定物料博文互动数据（每日加总）',
							subtext: 'Source:新浪微博数据中心',
							//textAlign: 'left',
							left: 'center'
						},
						tooltip: {
							trigger: 'axis'
						},
						legend: {
							x: 'right',                         
							//y: 'middle',  
						   // orient: 'vertical',
							data:['被转发次数','被评论次数','被点赞次数'],
							top:50,
						},
						grid: {
							left: '3%',
							right: '4%',
							bottom: '3%',
							top:90,
							containLabel: true
						},
						xAxis: {
							type: 'category',
							boundaryGap: false,
							data: ['2016-07-01', '2016-07-02', '2016-07-03', '2016-07-04', '2016-07-05', '2016-07-06', '2016-07-07'],
						},
						yAxis: {
							type: 'value'
						},
						series: [
							{
								name:'被转发次数',
								type:'line',
								stack: '总量',
								data:[120, 132, 101, 134, 90, 230, 210]
							},
							{
								name:'被评论次数',
								type:'line',
								stack: '总量',
								data:[220, 182, 191, 234, 290, 330, 310]
							},
							{
								name:'被点赞次数',
								type:'line',
								stack: '总量',
								data:[150, 232, 201, 154, 190, 330, 410]
							}
						]
					};
					translateChart.setOption(translateOption);

					
					var blogExposureChart=echarts.init(document.getElementById('blogExposure'));
					blogExposureOption = {
						title: {
							text: '电影'+result['name'][0].name+' 指定物料博文曝光数据（每日加总）',
							subtext: 'Source:新浪微博数据中心',
							//textAlign: 'center',
							left: 'center'
						},
						tooltip : {
							trigger: 'axis'
						},
						grid: {
							left: '3%',
							right: '4%',
							bottom: '3%',
							containLabel: true
						},
						xAxis : [
							{
								type : 'category',
								boundaryGap : false,
								data : ['2016-07-01', '2016-07-02', '2016-07-03', '2016-07-04', '2016-07-05', '2016-07-06', '2016-07-07'],
							}
						],
						yAxis : [
							{
								type : 'value'
							}
						],
						series : [
							{
								name:result['name'][0].name,
								type:'line',
								stack: '总量',
								label: {
									normal: {
										show: true,
										position: 'top'
									}
								},
								data:[14994, 32459, 11344, 33179, 22381, 55217, 22479, ],
							}
						]
					};
					blogExposureChart.setOption(blogExposureOption);

					var blogReadChart=echarts.init(document.getElementById('blogRead'));
					blogReadOption = {
						title: {
							text: '电影'+result['name'][0].name+' 指定物料博文阅读数据',
							subtext: 'Source:新浪微博数据中心',
							//textAlign: 'left',
							left: 'center'
						},
						tooltip: {
							trigger: 'axis'
						},
						legend: {
							x: 'right',                         
							//y: 'middle',  
						   // orient: 'vertical',
							data:['当天阅读次数','当天阅读人数','截止当日累计阅读次数'],
							top:50,
						},
						grid: {
							left: '3%',
							right: '4%',
							bottom: '3%',
							top:90,
							containLabel: true
						},
						xAxis: {
							type: 'category',
							boundaryGap: false,
							data: ['2016-07-01', '2016-07-02', '2016-07-03', '2016-07-04', '2016-07-05', '2016-07-06', '2016-07-07'],
						},
						yAxis: {
							type: 'value'
						},
						series: [
							{
								name:'当天阅读次数',
								type:'line',
								stack: '总量',
								data:[120, 132, 101, 134, 90, 230, 210]
							},
							{
								name:'当天阅读人数',
								type:'line',
								stack: '总量',
								data:[220, 182, 191, 234, 290, 330, 310]
							},
							{
								name:'截止当日累计阅读次数',
								type:'line',
								stack: '总量',
								data:[150, 232, 201, 154, 190, 330, 410]
							}
						]
					};
					blogReadChart.setOption(blogReadOption);
					

					var spreadChart = echarts.init(document.getElementById('blogSpread'));
					var graph = {};
					graph.nodes = [
						  {category:0,name: 1, value :5,label: '乔布斯',symbol:'image://http://www.damndigital.com/wp-content/uploads/2010/12/steve-jobs.jpg'},
						  {category:1, name: 2,value : 2,label: '丽萨-乔布斯'},
						  {category:1, name: 3,value : 3,label: '保罗-乔布斯'},
						  {category:1, name: 4,value : 3,label: '克拉拉-乔布斯'},
						  {category:1, name: 5,value : 7,label: '劳伦-鲍威尔'},
						  {category:2, name: 6,value : 5,label: '史蒂夫-沃兹尼艾克'},
						  {category:2, name: 7,value : 8,label: '奥巴马'},
						  {category:2, name: 8,value : 9,label: '比尔-盖茨'},
						  {category:2, name: 9,value : 4,label: '乔纳森-艾夫'},
						  {category:2, name: 10,value : 4,label: '蒂姆-库克'},
						  {category:2, name: 11,value : 1,label: '龙-韦恩'},
					  ];
					graph.links = [
								{source : 2, target : 1, value : 5, label: '女儿'},
								{source : 3, target : 1, value : 2, label: '父亲'},
								{source : 4, target : 1, value : 1, label: '母亲'},
								{source : 5, target : 1, value : 2, label: '不详'},
								{source : 6, target : 1, value : 3, label: '合伙人'},
								{source : 7, target : 1, value : 1, label: '不详'},
								{source : 8, target : 1, value : 6, label: '竞争对手'},
								{source : 9, target : 1, value : 1, label: '爱将'},
								{source : 10, target : 1, value : 1, label: '不详'},
								{source : 11, target : 1, value : 1, label: '不详'},
								{source : 4, target : 3, value : 1, label: '不详'},
								{source : 7, target : 3, value : 1, label: '不详'},
								{source : 7, target : 4, value : 1, label: '不详'},
								{source : 7, target : 5, value : 1, label: '不详'},
								{source : 7, target : 6, value : 1, label: '不详'},
								{source : 8, target : 7, value : 6, label: '不详'},
								{source : 8, target : 4, value : 1, label: '不详'},
								{source : 10, target : 7, value : 1, label: '不详'}
							];
					graph.categories = [{name:'主干人物'},{name:'家人'},{name:'朋友'} ];
					graph.categoriesshort = [{name:'家人'},{name:'朋友'} ];
					graph.nodes.forEach(function (node) {
						node.symbolSize = node.value*3;
					});
					var spreadOption = {
					  title: {
						text: '人际关系网络图',
						top: 'top',
						left: 'center'
					  },
					  tooltip : {
						trigger: 'item',
						formatter: function(params){
						  console.log(params);
						  if (params.data.category !=undefined) {
							return '人物:'+params.data.label;
						  }else {
							return '关系:'+params.data.label;
						  }
						},
					  },
					  color:['rgb(194,53,49)','rgb(178,144,137)','rgb(97,160,168)'],
					  legend: [{
						x: 'left',
						data: graph.categoriesshort.map(function (a) {
								return a.name;
							})
					  }],
					  series : [
						{
						  name: '人际关系网络图',
						  type: 'graph',
						  layout: 'force',
						  draggable: true,
						  data: graph.nodes,
						  links: graph.links,
						  categories: graph.categories,
						  focusNodeAdjacency:true,
						  roam: true,
						  label: {
							normal: {
							  show : true,
							  position: 'right',
							  formatter: function(params){
								return params.data.label;
							  },
							}
						  },
						  itemStyle:{
							normal:{
							  opacity:0.9,
							},
						  },
						  lineStyle: {
							normal: {
							  show : true,
							  color: 'target',
							  curveness: 0.3
							}
						  },
						  force: {
							edgeLength: [100,200],
							repulsion: 100
						  }
						}
					  ]
					};
					spreadChart.setOption(spreadOption);

					var sexChart=echarts.init(document.getElementById('sex'));
					sexOption = {
						title : {
							text: result['name'][0].name+'关键词人群属性 性别分布',
							subtext: 'Source:新浪微博数据中心',
							x:'center'
						},
						tooltip : {
							trigger: 'item',
							formatter: "{a} <br/>{b} : {c} ({d}%)"
						},
						legend: {
							x: 'right', 
							orient: 'horizontal',
							data: ['男','女'],
							top:50
						},
						series : [
							{
								name: '性别',
								type: 'pie',
								radius : '55%',
								center: ['50%', '60%'],
								data:[
									{value:335, name:'男'},
									{value:310, name:'女'},
								],
								itemStyle: {
									emphasis: {
										shadowBlur: 10,
										shadowOffsetX: 0,
										shadowColor: 'rgba(0, 0, 0, 0.5)'
									}
								}
							}
						]
					};
					sexChart.setOption(sexOption);

					var ageChart=echarts.init(document.getElementById('age'));
					ageOption = {
						title: {
							text: result['name'][0].name+' 人群属性数据结果 关键词人群属性 年龄分布',
							subtext: 'Source:新浪微博数据中心',
							left: 'center'
						},
						color: ['#3398DB'],
						tooltip : {
							trigger: 'axis',
							axisPointer : {            // 坐标轴指示器，坐标轴触发有效
								type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
							}
						},
						grid: {
							left: '3%',
							right: '4%',
							bottom: '3%',
							containLabel: true
						},
						xAxis : [
							{
								type : 'category',
								data : ['00后', '95后', '90后', '85后', '80后', '70后', '60后','56岁以上'],
								axisTick: {
									alignWithLabel: true
								}
							}
						],
						yAxis : [
							{
								type : 'value'
							}
						],
						series : [
							{
								name:'数量',
								type:'bar',
								barWidth: '45%',
								data:[10, 52, 200, 334, 390, 330, 220,110]
							}
						]
					};
					ageChart.setOption(ageOption);

					var provinceChart=echarts.init(document.getElementById('province')); 
					function randomData() {
						return Math.round(Math.random()*1000);
					}
					provinceOption = {
						title: {
							text: result['name'][0].name+' 人群属性数据结果 关键词人群属性 省份分布',
							subtext: 'Source:新浪微博数据中心',
							left: 'center'
						},
						tooltip: {
							trigger: 'item'
						},
						visualMap: {
							min: 0,
							max: 45000,
							left: 'left',
							top: 'bottom',
							text: ['高','低'],           // 文本，默认为数值文本
							calculable: true
						},
						series: [
							{
								name: '2016年',
								type: 'map',
								mapType: 'china',
								roam: false,
								label: {
									normal: {
										show: true
									},
									emphasis: {
										show: true
									}
								},
								data:[
									{name: '北京',value: 21300 },
									{name: '天津',value: 5816 },
									{name: '上海',value: 28408 },
									{name: '重庆',value: 7890 },
									{name: '河北',value: 7120 },
									{name: '河南',value: 12406 },
									{name: '云南',value: 6870 },
									{name: '辽宁',value: 9845 },
									{name: '黑龙江',value: 5222 },
									{name: '湖南',value: 12658 },
									{name: '安徽',value: 10783 },
									{name: '山东',value: 16253 },
									{name: '新疆',value: 3536 },
									{name: '江苏',value: 31939 },
									{name: '浙江',value: 33156 },
									{name: '江西',value: 8684 },
									{name: '湖北',value: 14803 },
									{name: '广西',value: 7531 },
									{name: '甘肃',value: 2880 },
									{name: '山西',value: 5444 },
									{name: '内蒙古',value: 3775 },
									{name: '陕西',value: 7435 },
									{name: '吉林',value: 4019 },
									{name: '福建',value: 14269 },
									{name: '贵州',value: 5106 },
									{name: '广东',value: 41800 },
									{name: '青海',value: 600 },
									{name: '西藏',value: 365 },
									{name: '四川',value: 16160 },
									{name: '宁夏',value: 1027 },
									{name: '海南',value: 2149 },
									{name: '台湾',value:  randomData()},
									{name: '香港',value: randomData() },
									{name: '澳门',value: 7}
								]
							},
							
							
						]
					};
					provinceChart.setOption(provinceOption);

					var cityChart=echarts.init(document.getElementById('city'));
					cityOption = {
						title: {
							text: result['name'][0].name+' 人群属性数据结果 关键词人群属性 城市分布',
							subtext: 'Source:新浪微博数据中心',
							left: 'center'
						},
						tooltip : {
							trigger: 'axis'
						},
						grid: {
							left: '3%',
							right: '4%',
							bottom: '3%',
							containLabel: true
						},
						xAxis : [
							{
								type : 'category',
								boundaryGap : false,
								data : ['1线', '2线', '3线', '4线及以下', '港澳台', '海外'],
							}
						],
						yAxis : [
							{
								type : 'value'
							}
						],
						series : [
							{
								name:result['name'][0].name,
								type:'line',
								stack: '总量',
								label: {
									normal: {
										show: true,
										position: 'top'
									}
								},
								data:[14994, 32459, 11344, 33179, 22381, 55217 ],
							}
						]
					};
					cityChart.setOption(cityOption);

					var educationChart=echarts.init(document.getElementById('education'));
					educationOption = {
						title: {
							text: result['name'][0].name+' 人群属性数据结果 关键词人群属性 学历分布',
							subtext: 'Source:新浪微博数据中心',
							left: 'center'
						},
						color: ['#3398DB'],
						tooltip : {
							trigger: 'axis',
							axisPointer : {            // 坐标轴指示器，坐标轴触发有效
								type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
							}
						},
						grid: {
							left: '3%',
							right: '4%',
							bottom: '3%',
							containLabel: true
						},
						xAxis : [
							{
								type : 'category',
								data : ['小学', '中专技校', '初中', '高中', '大学本科'],
								axisTick: {
									alignWithLabel: true
								}
							}
						],
						yAxis : [
							{
								type : 'value'
							}
						],
						series : [
							{
								name:'学历',
								type:'bar',
								barWidth: '60%',
								data:[10, 52, 200, 334, 390]
							}
						]
					};
					educationChart.setOption(educationOption);

					var emotionChart=echarts.init(document.getElementById('emotion'));
					emotionOption = {
						title: {
							text: result['name'][0].name+' 人群属性数据结果 关键词人群属性 情感状态分布',
							subtext: 'Source:新浪微博数据中心',
							left: 'center'
						},
						tooltip: {
							trigger: 'axis',
							axisPointer: {
								type: 'shadow'
							}
						},
						grid: {
							left: '3%',
							right: '4%',
							bottom: '3%',
							containLabel: true
						},
						xAxis: {
							type: 'value',
							boundaryGap: [0, 0.01]
						},
						yAxis: {
							type: 'category',
							data: ['离异','分居','丧偶','已婚','订婚','恋爱中','暧昧中','暗恋中','求交往','单身']
						},
						series: [
							{
								name: '情感状态分布',
								type: 'bar',
								data: [18203, 23489, 29034, 104970, 131744, 630230, 23489, 29034, 104970, 131744]
							}
						]
					};
					emotionChart.setOption(emotionOption);

					var constellationChart=echarts.init(document.getElementById('constellation'));
					constellationOption={
						title: {
								text: result['name'][0].name+'  关键词人群属性 星座分布',
								subtext: 'Source:新浪微博数据中心',   
								left:'center'     
							},   
						radar: {
							// shape: 'circle',
							indicator: [
							   { name: '白羊座', max: 150},
							   { name: '双鱼座', max: 150},
							   { name: '水瓶座', max: 150},
							   { name: '摩羯座', max: 150},
							   { name: '射手座', max: 150},
							   { name: '天蝎座', max: 150},
							   { name: '天秤座', max: 150},
							   { name: '处女座', max: 150},
							   { name: '狮子座', max: 150},
							   { name: '巨蟹座', max: 150},
							   { name: '双子座', max: 150},
							   { name: '金牛座', max: 150},
							],
							radius: 90,
						},
						series: [{
							name: '',
							type: 'radar',
							// areaStyle: {normal: {}},
							data : [
								{
									value : [92, 130, 83, 55, 54, 48, 75, 56, 59, 103, 86, 58],
									name : '2014'
								}
							]
						}]
					}; 
					constellationChart.setOption(constellationOption);

					var vtypeChart=echarts.init(document.getElementById('vtype'));
					vtypeOption={
						title: {
							text: result['name'][0].name+'  关键词人群属性 用户类型',
							subtext: 'Source:新浪微博数据中心',
							left: 'center'
						},
						color: ['#3398DB'],
						tooltip : {
							trigger: 'axis',
							axisPointer : {            // 坐标轴指示器，坐标轴触发有效
								type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
							}
						},
						grid: {
							left: '3%',
							right: '4%',
							bottom: '3%',
							containLabel: true
						},
						xAxis : [
							{
								type : 'category',
								data : ['普通用户', '名人橙V', '企业蓝V', '媒体蓝V', '政府蓝V','校园蓝V','机构蓝V','网站蓝V','无线蓝V','应用蓝V','淘宝商家蓝V'],
								axisTick: {
									alignWithLabel: true
								}
							}
						],
						yAxis : [
							{
								type : 'value'
							}
						],
						series : [
							{
								name:'用户类型',
								type:'bar',
								barWidth: '60%',
								data:[10, 52, 200, 334, 390, 52, 200, 334, 52, 200, 334]
							}
						]
					};
					vtypeChart.setOption(vtypeOption);

					var influenceChart=echarts.init(document.getElementById('influence'));
					influenceoption = {
						title: {
							text: result['name'][0].name+' 关键词人群属性 微博影响力',
							subtext: 'Source:新浪微博数据中心',
							left: 'center'
						},
						tooltip : {
							trigger: 'axis'
						},
						grid: {
							left: '3%',
							right: '4%',
							bottom: '3%',
							containLabel: true
						},
						xAxis : [
							{
								type : 'category',
								boundaryGap : false,
								data : ['2016-07-01', '2016-07-02', '2016-07-03', '2016-07-04', '2016-07-05', '2016-07-06', '2016-07-07'],
							}
						],
						yAxis : [
							{
								type : 'value'
							}
						],
						series : [
							{
								name:'影响力占比',
								type:'line',
								stack: '总量',
								label: {
									normal: {
										show: true,
										position: 'top'
									}
								},
								data:[14, 32, 11, 33, 22, 55, 22 ],
							}
						]
					};
					influenceChart.setOption(influenceoption);


					var fansSectionChart=echarts.init(document.getElementById('fansSection'));
					fansSectionOption={
						title: {
							text: result['name'][0].name+'  关键词人群属性 微博粉丝数量',
							subtext: 'Source:新浪微博数据中心',
							left: 'center'
						},
						color: ['#3398DB'],
						tooltip : {
							trigger: 'axis',
							axisPointer : {            // 坐标轴指示器，坐标轴触发有效
								type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
							}
						},
						grid: {
							left: '3%',
							right: '4%',
							bottom: '3%',
							containLabel: true
						},
						xAxis : [
							{
								type : 'category',
								axisLabel:{
									interval:0,
								},
								data : ['0-10', '11-30', '31-100', '101-200', '201-500','501-1000','1001-2000','2001-5000','5001-1万','1万-10万'],
								axisTick: {
									alignWithLabel: true
								}
							}
						],
						yAxis : [
							{
								type : 'value'
							}
						],
						series : [
							{
								name:'占比',
								type:'bar',
								barWidth: '60%',
								data:[10, 52, 200, 334, 390, 52, 200, 334, 52, 200]
							}
						]
					};
					fansSectionChart.setOption(fansSectionOption);

					var attentionChart=echarts.init(document.getElementById('attention'));
					attentionOption={
						title: {
							text: result['name'][0].name+' 关键词人群属性 微博关注数量',
							subtext: 'Source:新浪微博数据中心',
							left: 'center'
						},
						color: ['#3398DB'],
						tooltip : {
							trigger: 'axis',
							axisPointer : {            // 坐标轴指示器，坐标轴触发有效
								type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
							}
						},
						grid: {
							left: '3%',
							right: '4%',
							bottom: '3%',
							containLabel: true
						},
						xAxis : [
							{
								type : 'category',
								data : ['0-10', '11-30', '31-100', '101-200', '201-500','501-1000','1001-2000','2001及以上'],
								axisTick: {
									alignWithLabel: true
								}
							}
						],
						yAxis : [
							{
								type : 'value'
							}
						],
						series : [
							{
								name:'占比',
								type:'bar',
								barWidth: '60%',
								data:[10, 52, 200, 334, 390, 52, 200, 334]
							}
						]
					};
					attentionChart.setOption(attentionOption);

					var contactChart=echarts.init(document.getElementById('contact'));
					contactOption={
						title: {
							text: result['name'][0].name+' 关键词人群属性 微博互粉数量',
							subtext: 'Source:新浪微博数据中心',
							left: 'center'
						},
						color: ['#3398DB'],
						tooltip : {
							trigger: 'axis',
							axisPointer : {            // 坐标轴指示器，坐标轴触发有效
								type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
							}
						},
						grid: {
							left: '3%',
							right: '4%',
							bottom: '3%',
							containLabel: true
						},
						xAxis : [
							{
								type : 'category',
								data : ['0-10', '11-30', '31-100', '101-200', '201-500','501-1000','1001-2000','2001及以上'],
								axisTick: {
									alignWithLabel: true
								}
							}
						],
						yAxis : [
							{
								type : 'value'
							}
						],
						series : [
							{
								name:'占比',
								type:'bar',
								barWidth: '60%',
								data:[10, 52, 200, 334, 390, 52, 200, 334]
							}
						]
					};
					contactChart.setOption(contactOption);

					var creditChart=echarts.init(document.getElementById('credit'));
					creditOption={
						title: {
							text: result['name'][0].name+' 关键词人群属性 阳光信用',
							subtext: 'Source:新浪微博数据中心',
							left: 'center'
						},
						tooltip: {
							trigger: 'axis'
						},
						legend: {
							data:['阳光信用'],
							top:50,
							x: 'left',

						},
						grid: {
							left: '3%',
							right: '4%',
							bottom: '3%',
							top:90,
							containLabel: true
						},
						xAxis: {
							type: 'category',
							boundaryGap: false,
							data: ['30-420','421-450','451-570','571-690','691-900']
						},
						yAxis: {
							type: 'value'
						},
						series: [
							{
								name:'阳光信用',
								type:'line',
								stack: '总量',
								data:[120, 132, 101, 134, 90]
							}
						]
					};
					creditChart.setOption(creditOption);

					var activeChart=echarts.init(document.getElementById('active'));
					activeOption={
						title: {
							text: result['name'][0].name+'  关键词人群属性 活跃时段',
							subtext: 'Source:新浪微博数据中心',
							left: 'center'
						},
						tooltip : {
							trigger: 'axis'
						},
						legend: {
							data:['Pantene','Rejoice','Ziyuan','Clear','Loreal']
						},
						calculable : true,
						xAxis : [
							{
								type : 'category',
								boundaryGap : false,
								data : ['0点','1点','2点','3点','4点','5点','6点','7点','8点','9点','10点','11点']
							}
						],
						yAxis : [
							{
								type : 'value'
							}
						],
						series : [
							{
								name:'活跃时段占比',
								type:'line',
								smooth:true,
								data:[67,63,60,65,62,60,73,78,77,68,68,69]
							}
						]
					};
					activeChart.setOption(activeOption);

					var PreferenceChart=echarts.init(document.getElementById('Preference'));
					PreferenceOption={
						title: {
							text: result['name'][0].name+'  关键词人群属性 内容偏好',
							subtext: 'Source:新浪微博数据中心',
							left: 'center'
						},
						tooltip : {
							trigger: 'axis'
						},
						legend: {
							data:['Pantene','Rejoice','Ziyuan','Clear','Loreal']
						},
						calculable : true,
						xAxis : [
							{
								type : 'category',
								boundaryGap : false,
								data : ['美人','美容','舞蹈','体育','婚庆','搞笑','时尚','育儿','音乐','外语','摄影','数码']
							}
						],
						yAxis : [
							{
								type : 'value'
							}
						],
						series : [
							{
								name:'内容偏好占比',
								type:'line',
								smooth:true,
								data:[67,63,60,65,62,60,73,78,77,68,68,69]
							}
						]
					};
					PreferenceChart.setOption(PreferenceOption);

					var channelChart=echarts.init(document.getElementById('channel'));
					channelOption={
						title: {
							text: result['name'][0].name+'  关键词人群属性 频道偏好',
							subtext: 'Source:新浪微博数据中心',
							left: 'center'
						},
						tooltip : {
							trigger: 'axis'
						},
						legend: {
							data:['Pantene','Rejoice','Ziyuan','Clear','Loreal']
						},
						calculable : true,
						xAxis : [
							{
								type : 'category',
								boundaryGap : false,
								data : ['星座','汽车频道','育儿','新浪论坛','博客','视频','读书','新浪彩通','收藏','地方站','教育','女性']
							}
						],
						yAxis : [
							{
								type : 'value'
							}
						],
						series : [
							{
								name:'频道偏好占比',
								type:'line',
								smooth:true,
								data:[67,63,60,65,62,60,73,78,77,68,68,69]
							}
						]
					};
					channelChart.setOption(channelOption);

					var exposureChart=echarts.init(document.getElementById('exposure'));
					exposureOption={
						title: {
							text: result['name'][0].name+'  指定物料博文曝光数据（每日加总）',
							subtext: 'Source:新浪微博数据中心',
							left: 'center'
						},
						tooltip : {
							trigger: 'axis'
						},
						calculable : true,
						xAxis : [
							{
								type : 'category',
								boundaryGap : false,
								data : ['2016-07-01', '2016-07-02', '2016-07-03', '2016-07-04', '2016-07-05', '2016-07-06', '2016-07-07']
							}
						],
						yAxis : [
							{
								type : 'value'
							}
						],
						series : [
							{
								name:'博文曝光量',
								type:'line',
								smooth:true,
								data:[67,63,60,65,62,60,73]
							}
						]
					};
					exposureChart.setOption(exposureOption);

					var apphotChart=echarts.init(document.getElementById('apphot'));
					apphotOption={
						title: {
							text: result['name'][0].name+'  关键词人群属性 手机app热度',
							subtext: 'Source:新浪微博数据中心',
							left: 'center'
						},
						color: ['#3398DB'],
						tooltip : {
							trigger: 'axis',
							axisPointer : {            // 坐标轴指示器，坐标轴触发有效
								type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
							}
						},
						grid: {
							left: '3%',
							right: '4%',
							bottom: '3%',
							containLabel: true
						},
						xAxis : [
							{
								type : 'category',
								data : ['微信', 'QQ', '微博', '手机淘宝', '支付宝','美团','美图秀秀','百度地图'],
								axisTick: {
									alignWithLabel: true
								}
							}
						],
						yAxis : [
							{
								type : 'value'
							}
						],
						series : [
							{
								name:'手机app热度',
								type:'bar',
								barWidth: '60%',
								data:[10, 52, 200, 334, 390, 52, 200, 334]
							}
						]
					};
					apphotChart.setOption(apphotOption);

					var apptypeChart=echarts.init(document.getElementById('apptype'));
					apptypeOption={
						title: {
							text: result['name'][0].name+'  关键词人群属性 app类型分布',
							subtext: 'Source:新浪微博数据中心',
							left: 'center'
						},
						color: ['#3398DB'],
						tooltip : {
							trigger: 'axis',
							axisPointer : {            // 坐标轴指示器，坐标轴触发有效
								type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
							}
						},
						grid: {
							left: '3%',
							right: '4%',
							bottom: '3%',
							containLabel: true
						},
						xAxis : [
							{
								type : 'category',
								data : ['即时通讯', '社交交友', '网络购物', '网络音乐', '在线视频','在线团购','上网服务','手机游戏'],
								axisTick: {
									alignWithLabel: true
								}
							}
						],
						yAxis : [
							{
								type : 'value'
							}
						],
						series : [
							{
								name:'手机app热度',
								type:'bar',
								barWidth: '60%',
								data:[10, 52, 200, 334, 390, 52, 200, 334]
							}
						]
					};
					apptypeChart.setOption(apptypeOption);



					var topicBasicChart=echarts.init(document.getElementById('topicBasic'));
					topicBasicOption = {
						title: {
							text: result['name'][0].name+' 话题基本数据 讨论人数 讨论次数',
							subtext: 'Source:新浪微博数据中心',
							left: 'center'
						},
						tooltip: {
							trigger: 'axis'
						},
						legend: {
							x: 'right', 
							data:['讨论人数','讨论次数'],
							top:50
						},
						grid: {
							left: '3%',
							right: '4%',
							bottom: '3%',
							top:90,
							containLabel: true
						},
						xAxis: {
							type: 'category',
							boundaryGap: false,
							data: ['2016-07-01', '2016-07-02', '2016-07-03', '2016-07-04', '2016-07-05', '2016-07-06', '2016-07-07'],
						},
						yAxis: {
							type: 'value'
						},
						series: [
							{
								name:'讨论人数',
								type:'line',
								stack: '总量',
								data:[120, 132, 101, 134, 90, 230, 210]
							},
							{
								name:'讨论次数',
								type:'line',
								stack: '总量',
								data:[220, 182, 191, 234, 290, 330, 310]
							}
						]
					};
					topicBasicChart.setOption(topicBasicOption);

					var topicReaderChart=echarts.init(document.getElementById('topicReader'));
					topicReaderOption = {
						name:'人数/次数',
						title: {
							text: result['name'][0].name+' 话题基本数据 阅读人数 阅读次数',
							subtext: 'Source:新浪微博数据中心',
							left: 'center'
						},
						tooltip: {
							trigger: 'axis'
						},
						legend: {
							x: 'right',
							data:['阅读人数','阅读次数'],
							top:50
						},
						grid: {
							left: '3%',
							right: '4%',
							bottom: '3%',
							top:90,
							containLabel: true
						},
						xAxis: {
							type: 'category',
							boundaryGap: false,
							data: ['2016-07-01', '2016-07-02', '2016-07-03', '2016-07-04', '2016-07-05', '2016-07-06', '2016-07-07'],
						},
						yAxis: {
							type: 'value'
						},
						series: [
							{
								name:'阅读人数',
								type:'line',
								stack: '总量',
								data:[120, 132, 101, 134, 90, 230, 210]
							},
							{
								name:'阅读次数',
								type:'line',
								stack: '总量',
								data:[220, 182, 191, 234, 290, 330, 310]
							}
						]
					};
					topicReaderChart.setOption(topicReaderOption);
			}
		});
		
	}

		



    //@ sourceURL=pen.js
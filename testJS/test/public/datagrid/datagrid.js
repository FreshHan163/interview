(function($){
	var index0 = -1;
	var row0 = '';

	function beginEdit(target, index){
		var table = $(target).find('.data-grid-table')[0];
		var row = table.tBodies[0].rows[index];
		
		$.data(row, 'data', $(row).html());
		
		var setting = $.data(target, 'datagrid');
		$.each(setting['columns'], function(i, n){
			$cell = $(row.cells[i])
			var editor = n['editor'];
			if(editor=='text'){
				$cell.html('<input type="text" name="'+n['field']+'" value="'+$cell.text()+'">');
			}else if(editor=='readonly'){
				$cell.html('<input type="text" name="'+n['field']+'" value="'+$cell.text()+'" readonly>');
			} else if(editor['type']=='text'){
				var width = editor['width'];
				$cell.html('<input type="text" style="width:'+width+'" name="'+n['field']+'" value="'+$cell.text()+'">');
			}else if(editor['type']=='select'){
				var data = editor['data'];
				var option = '';
				$.each(data, function(i2, n2){
					option += '<option value="'+n2['id']+'" '+(n2['name']==$cell.text()?'selected':'')+'>'+n2['name']+'</option>';
				});
				$cell.html('<select name="'+n['field']+'">'+option+'</select>');
			}else{
				$cell.html(editor);
			}
		});
	}

	function endEdit(target, index){
		var table = $(target).find('.data-grid-table')[0];
		var row = table.tBodies[0].rows[index];
		if(!$.data(row, 'data'))return;
		$.data(row, 'data', null);
		var setting = $.data(target, 'datagrid');
		$.each(setting['columns'], function(i, n){
			$cell = $(row.cells[i])
			var editor = n['editor'];
			if(editor=='text'){
				$cell.text($cell.children(':input').val());
			}else if(editor['type']=='select'){
				var select = $cell.children('select')[0];
				value = select.options[select.selectedIndex].text;
				$cell.text(value);
			}else{
				$cell.html(n['formatter']);
			}
		});
	}

	function cancelEdit(target, index){
		var table = $(target).find('.data-grid-table')[0];
		var row = table.tBodies[0].rows[index];
		var data = $.data(row, 'data');
		$.data(row, 'data', null);
		$(row).html(data);
	}

	function appendRow(target){
		var table = $(target).find('.data-grid-table')[0];
		
		var setting = $.data(target, 'datagrid');
		var $row = $('<tr></tr>');
		$.each(setting['columns'], function(i, n){
			$cell = $('<td></td>');
			var editor = n['editor'];
			if(editor=='text'){
				$cell.html('<input type="text" name="'+n['field']+'" value="">');
			}else if(editor['type']=='text'){
				var width = editor['width'];
				style='';
				if(width){
					style+="width:"+width;
				}
				$cell.html('<input type="text" style="'+style+'" name="'+n['field']+'" value="'+$cell.text()+'">');
			}else if(editor['type']=='select'){
				var data = editor['data'];
				var option = '';
				$.each(data, function(i2, n2){
					option += '<option value="'+n2['id']+'">'+n2['name']+'</option>';
				});
				$cell.html('<select name="'+n['field']+'">'+option+'</select>');
			}else{
				$cell.html(n['append']);
			}
			$row.append($cell);
		});

		$(table).append($row);
	}

	function createTable(rows, columns, title, id, tableId, average){
		var thead = '';
		var tbody = '';
		
		//thead
		thead = '<THEAD><TR CLASS="data-grid-head-row">';
		$.each(columns, function(i, column){
			var title = column['title'];
			var field = column['field'];
			var align = column['align'];
			var width = column['width'];
			var temp = ' field="'+field+'"';
			if(width)temp += ' width="'+width+'"';
			if(align)temp += ' align-attr="'+align+'"';
			thead += '<TH CLASS="data-grid-table-th" '+temp+'" NOWRAP>'+ title +'</TH>';
		});
		thead += '</TR></THEAD>';
		
		//tbody
		tbody = '<TBODY>';
		
		//增加平均值
		var sums = [];
		var rownum = rows.length;
		$.each(columns, function(i, column){
			sums[i] = 0;
		});

		for(var index in rows){
			var row = rows[index];
			var idvalue = row[id];
			var temp = '';
			if(idvalue)temp = ' id="'+idvalue+'"';
			tbody += '<TR CLASS="data-grid-body-row" '+temp+'>';
			$.each(columns, function(i, column){
				var field = column['field'];
				var align = column['align'];
				var width = column['width'];
				var color = column['color'];
				var bgcolor = column['bgcolor'];
				var formatter = column['formatter'];
				var temp = '';
				var css = '';

				if(color=='auto'){
					var text = row[field];
					if(/^-?[0-9.]*$/.test(text.replace(/[,%]/g, ''))){
						text = Number(text.replace(/[^-0-9\.]/g,''));
						if(text>0){
							color='red';
						}else{
							color='green';
						}
					}
				}
				
				var text = String(row[field]);
				if(/^-?[0-9.]*$/.test(text.replace(/[,%]/g, ''))){
					sums[i] += Number(text.replace(/[^-0-9\.]/g,''));
				}

				if(align)temp += ' align="'+align+'"';
				if(width)temp += ' width="'+width+'"';
				if(color)css += ' color:'+color+';';
				if(bgcolor)css += 'background-color:'+bgcolor+';';
				
				var value = row[field];
				if(formatter){
					if(typeof(formatter)=='string'){
						value = formatter;
					}else{
						value = formatter(value, row, index);
					}
				}
				if(value=='0'){
					value = '';
				}
				tbody += '<TD CLASS="data-grid-body-cell" '+temp+' style='+css+'"" NOWRAP>'+ value +'</TD>';
			});
			table += '</TR>';
		}

		//增加平均值
		if(average){
			tbody += '<TR>';
			$.each(columns, function(i, column){
				var field = column['field'];
				var align = column['align'];
				var width = column['width'];
				var color = column['color'];
				var bgcolor = column['bgcolor'];
				var formatter = column['formatter'];
				var temp = '';
				var css = '';
				
				if(align)temp += ' align="'+align+'"';
				if(width)temp += ' width="'+width+'"';
				if(color)css += ' color:'+color+';';
				if(bgcolor)css += 'background-color:'+bgcolor+';';
				
				var value = getNumber(sums[i]*1.0/rownum);
				if(formatter){
					if(typeof(formatter)=='string'){
						value = formatter;
					}else{
						value = formatter(value, row, index);
					}
				}
				if(value=='0'){
					value = '';
				}

				if(i==0){value='平均值'};
				tbody += '<TD CLASS="data-grid-body-cell" '+temp+' style='+css+'"" NOWRAP>'+ value +'</TD>';
			});
			table += '</TR>';
		}
		
		table += '</TBODY>';
		
		var table = '';
		if(title){
			table +='<DIV CLASS="data-grid-title">'+title+'</DIV>';
		}
		table +='<DIV CLASS="table-wrapper"><TABLE ID="'+tableId+'" CLASS="data-grid-table" cellSpacing="0" cellPadding="0">';
		
		table += thead;
		table += tbody;
		table += '</TABLE></DIV>';
		
		return table;
	}

	function writeTable($div, table, append){
		$div.empty();
		$div.html(table);
		$div.addClass('data-grid-container');
		
		if(append){
			appendRow($div[0]);
		}
	}

	function doubleTtitle($div){
		//处理双层标题
		//已经双层返回
		//检查是否双层
		//写入第二行
		//合并上一行
		var $table = $div.find('.data-grid-table');
		var $thead = $table.find('thead');
		
		var $rows = $thead.find('tr');
		if($rows.length==2)return;
		var $row0 = $rows.eq(0);
		var $cells = $row0.find('th');
		
		//检查是否要分两行
		var tworow = false;
		var rowcount = 0;
		$cells.each(function(){
			var $cell = $(this);
			var text = $cell.text();
			var p = text.indexOf('|');
			if(p!=-1){
				tworow = true;
				var num = text.split('|').length;
				if(num>rowcount)rowcount = num;
			}
		});
		if(!tworow)return;

		//var $row1 = $('<TR/>');
		var rows = [];	//多行
		var cells = [];	//每行的前一列
		for(var i=0;i<rowcount;i++){
			rows.push($('<TR/>'));
		}

		$cells.each(function(){
			var $cell = $(this);
			var text = $cell.text();
			var p = text.indexOf('|');
			var datas = text.split('|');
			
			if(datas.length==1){
				//不需要分两行
				var $cell1 = $cell.clone();
				$cell1.attr('rowSpan', rowcount);
				//$cell.removeClass('data-grid-table-th').addClass('data-grid-table-th2');
				rows[0].append($cell1);
				for(var i=0;i<rowcount;i++){
					cells[i] = null;
				}
			}else{
				for(var i=0;i<rowcount;i++){
					if(i>=datas.length){
						text = '';
					}else{
						text = datas[i];
					}

					//是否要和前一列合并
					var combine = false;
					if(cells[i] && cells[i].length!=0){
						var text0 = cells[i].text();
						if(text0 == text){
							combine = true;
						}
					}

					if(combine){
						//和一列合并, 本列挪到下一行
						var colSpan = cells[i].attr('colSpan');
						if(!colSpan)colSpan=1;
						cells[i].attr('colSpan', parseInt(colSpan)+1);
					}else{
						//不和前一列合并, 分到两行内
						var $cell1 = $cell.clone();
						$cell1.text(text);
						rows[i].append($cell1);
						cells[i] = $cell1;
					}
				}
			}
		});

		$thead.empty();
		for(var i=0;i<rows.length;i++){
			$thead.append(rows[i]);
		}
	}
	
	function repeat(c, n){
		s = '';
		for(var i=0;i<n;i++){
			s += c;
		}
		return s;
	}

	function fill(s, l){
		s = ''+s;
		if(s.length<l){
			s = repeat('0', l - s.length) + s;
		}
		return s;
	}

	function findNum(s, d){
		var l = d.length;
		var p = 0;
		var n = 0;
		while(s.substring(p, p+l) == d){
			n++;
			p+=l;
		}
		return n/4;
	}

	function getLevel(row){
		var $cell = $(row.cells[0]);
		var html = $cell.html()
		var level = findNum(html, '&nbsp;');
		return level;
	}
	
	//每行向上找到第一个层次数比自己低的, 作为父节点,用一数组记下最近的N层节点
	function createTree($div, showLevel){
		var $table = $div.find('.data-grid-table');
		var rows = $table[0].tBodies[0].rows;
		var levelrows = [];//用level作为索引
		var childrens = [];//用行号作为索引
		for(var i=0;i<rows.length;i++){
			var row = rows[i];
			var level = getLevel(row);
			//找父节点
			var no = -1;
			var plevel = level-1;
			while(plevel>=0){
				if(levelrows[plevel]!=undefined){
					no = levelrows[plevel];
					break;
				}
				plevel --;
			}
			if (no!=-1)
			{
				if(childrens[no]==undefined){
					childrens[no] = [];
				}
				childrens[no].push(rows[i]);
			}
			levelrows[level] = i;
			$(row).attr('level', level);
		}
		//默认展开所有
		for(var i=0;i<rows.length;i++){
			var $row = $(rows[i]);
			var $cell = $(rows[i].cells[0]);
			var level = parseInt($row.attr('level'));
			if(childrens[i]!=undefined){
				$row.data('children', childrens[i]);
				$cell.html(repeat('&nbsp;', 4*level) + '<span class="tree-hit tree-expand2"/>' + $cell.text().trim());
				$row.attr('expend', 'true');
				bind($row);
			}else{
				$cell.html(repeat('&nbsp;', 4*level) + '<span class="tree-indent"/>' + $cell.text().trim());
			}
		}
		//只显示第1层
		if(showLevel!=-1){
			for(var i=0;i<rows.length;i++){
				var $row = $(rows[i]);
				var level = parseInt($row.attr('level'));
				if(level==showLevel){
					expend($row, 'false');
				}
			}
		}
	}

	String.prototype.trim = function(){
		return this.replace(/(^\s*)|(\s*$)/g, "");
	};
	
	//控制子菜单显示
	//显示时根据节点状态
	//隐藏时全隐藏
	function showChildren($row, status){
		var children = $row.data('children');
		if(!children)return;
		for(var i=0;i<children.length;i++){
			if(status=="true"){
				$(children[i]).show();
				var status1 = $(children[i]).attr('expend');
				if(!status1)status1=='true';
				showChildren($(children[i]), status1);
			}else{
				$(children[i]).hide();
				showChildren($(children[i]), false);
			}
		}
	}
	
	//改变节点状态
	function expend($row, status){
		var children = $row.data('children');
		if(!children)return;
		//改变当前节点状态
		var $cell = $($row[0].cells[0]);
		var level = parseInt($row.attr('level'));
		$row.attr('expend', status);
		$cell.html(repeat('&nbsp;', 4*level) + (status=='true'?'<span class="tree-hit tree-expand2"/>':'<span class="tree-hit tree-collapse2"/>') + $cell.text().trim());
		showChildren($row, status);
	}

	function toggle($row){
		//改变当前节点状态
		var status = $row.attr('expend');
		status = status=='true'?'false':'true';
		expend($row, status);
	}

	function bind($row){
		$row.click(function(){
			toggle($row);
		});
	}

	function getNumber(st){
		//return Number(String(st).replace(/[^0-9\.-]/g,''));
		return formatNumber(st, 0);
	}

	function trim(s){
		return s.replace(/(^\s*)|(\s*$)/g, "");
	};


	function formatNumber(srcStr,nAfterDot){
		srcStr = String(srcStr);
		var resultStr,nTen;

		//取最后的非数字(单位等)
		var p = srcStr.search(/[^0-9\.-]$/);

		if(p==-1){
			after="";
		}else{
			after=srcStr.substring(p);
			srcStr=srcStr.substring(0,p);
		}
		
		//转化成数字
		srcStr=srcStr.replace(/[^0-9\.-]/g,'');
		
		//空字符串或0返加空字符串
		if(trim(srcStr)=="")return "";
		
		//改后小数点后位数
		strLen = srcStr.length;
		dotPos = srcStr.indexOf(".",0);
		if (dotPos == -1){
		//无小数点
			if (nAfterDot>0)
			{
				resultStr = srcStr+".";
				for (i=0;i<nAfterDot;i++){
					resultStr = resultStr+"0";
				}
			}else{
				resultStr=srcStr;
			}
		}else{
			//有小数点
			resultStr = srcStr;
			if ((strLen - dotPos - 1) > nAfterDot){
				nAfter = dotPos + nAfterDot + 1;
				nTen =1;
				for(j=0;j<nAfterDot;j++){
					nTen = nTen*10;
				}
				resultStr = String(Math.round(parseFloat(srcStr)*nTen)/nTen);

				var l = resultStr.length;
				var p = resultStr.indexOf(".",0);
				var pl;
				if(p==-1){
					pl=0;
				}else{
					pl=l-p-1;
				}
			
				if (nAfterDot>0&&pl==0)
					resultStr = resultStr+".";

				if(pl < nAfterDot){
					for (i=0;i<nAfterDot - pl;i++){
						resultStr = resultStr+"0";
					}
				}
			}
			else if((strLen - dotPos - 1) < nAfterDot){
				for (i=0;i<(nAfterDot - strLen + dotPos + 1);i++){
					resultStr = resultStr+"0";
				}
			}
		}
		
		//加3位一,
		dotPos = resultStr.indexOf(".",0);
		if(dotPos==-1)dotPos=resultStr.length;
			var s="";
			for(var i=dotPos-1;i>=0;i--){
			if((dotPos-i)%3==0&&i!=0){
				s=","+resultStr.substring(i,i+1)+s;
			}else{
				s=resultStr.substring(i,i+1)+s;
			}
		}
		//补上小数点后部分
		if(dotPos!=-1)
			s = s+resultStr.substring(dotPos);
		
		//加上最后的非数字
		return s+after;
	}

	$.fn.mydatagrid = function(options, param){
		if (typeof options == 'string') {
			switch(options){
				case 'beginEdit':
					return this.each(function(){
						beginEdit(this, param);
					});
				case 'endEdit':
					return this.each(function(){
						endEdit(this, param);
					});
				case 'cancelEdit':
					return this.each(function(){
						cancelEdit(this, param);
					});
				case 'appendRow':
					return this.each(function(){
						appendRow(this, param);
					});
			}
		}

		options = options || {};
		return this.each(function(){
			var settings={
				url: '',	//{total:100, rows:[{name1:value1, name2:value2}], columns:[{field:'', title:'', align:'', width:100}], title:''}
				data: {},
				columns: [],	//[{field:'', title:'', align:'', width:100, color:'', bgcolor:''}],
				title: '',
				id: 'id',	//指定数据列中哪列是ID
				tree: {tree:0, level:-1},
				average: false
			};
			/*
			editor:'text'
			formatter:function(value, rowData, rowIndex){
				return value=='1'?'有效':'无效';
			},
			editor:{
				type:'select',
				data:[{id:1, name:'有效'}, {id:0, name:'无效'}]
			}
			formatter:'<a href="#" onclick="edit(this)">修改</a>&nbsp;&nbsp;<a href="#" onclick="del(this)">删除</a>',
			editor:'<a href="#" onclick="save(this)">保存</a>&nbsp;&nbsp;<a href="#" onclick="cancel(this)">取消</a>',
			append:'<a href="#" onclick="save(this)">添加</a>'
			*/
			
			var setting0 = $.data(this, 'datagrid');
			
			if(setting0){
				$.extend(settings, setting0);
			}
			
			if(options){
				$.extend(settings,options);
			}

			$.data(this, 'datagrid', settings);

			var $div=$(this);
			var $table = $div.find('.data-grid-table');
			var url = settings['url'];
			var columns = settings['columns'];
			var title = settings['title'];
			var id = settings['id'];
			var data = settings['data'];
			var tree = settings['tree'];
			var average = settings['average'];
			
			if(url){
				$.getJSON(url, {timestamp: new Date().getTime()}, function(json){
					var rows = json['rows'];
					var columns1 = json['columns'];
					var tree1 = json['tree'];

					if(columns1)columns = columns1;
					if(tree1)tree = tree1;

					var table = createTable(rows, columns, title, id, $div.attr("id")+'-table', average);
					writeTable($div, table, settings['appendRow']);
					doubleTtitle($div);
					if(tree && tree['tree']=="1"){
						createTree($div, tree['level']);
					}
				});
			}else{
				var table = createTable(data, columns, title, id, $div.attr("id")+'-table', average);
				writeTable($div, table, settings['appendRow']);
				doubleTtitle($div);
				if(tree && tree['tree']=='1'){
					createTree($div, tree['level']);
				}
			}
		});
	}
})(jQuery);
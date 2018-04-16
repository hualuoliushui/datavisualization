function ChartLine(svg,width,height){
    var _svg = svg;
    var radio = 1/8;
    var padding = {top:height*radio,right:width*radio,bottom:height*radio,left:width*radio};
    var _gxAxis = null,
        _xScale = null,
        _xAxis = null,
        _xAxisTitle = null,
        _gyAxis = null,
        _yScale = null,
        _yAxis = null,
        _yAxisTitle = null,
        _focusCirle = null,
        _focusLine = null,
        _vLine = null,
        _hLine = null,
        _mouseRect = null,
        _grid = null;

    this.init = function(width,height){
        _xScale = d3.scaleLinear();
        // 定义坐标轴
        _xAxis = d3.axisBottom(_xScale)
            .tickFormat(d3.format("d"));

        _gxAxis = _svg.append("g")
            .attr("class","axis")
            .attr("transform","translate("+padding.left+","+(height-padding.bottom)+")")
            .call(_xAxis);
        _xAxisTitle = _svg.append("text")
            .attr("class","axis-title")
            .attr("transform","translate("+(width-padding.right)+","+(height-padding.bottom)+")")

        _yScale = d3.scaleLinear();
        // 定义坐标轴
        _yAxis = d3.axisLeft(_yScale)
            .tickFormat(d3.format("d"));
        _gyAxis = _svg.append("g")
            .attr("class","axis")
            .attr("transform","translate("+padding.left+","+(padding.top)+")")
            .call(_yAxis);
        _yAxisTitle = _svg.append("text")
            .attr("class","axis-title")
            .attr("transform","translate("+(padding.left)+","+(padding.top)+")")

        _grid = _svg.append("g")
            .attr("class","grid")
        init_axis_tip()
    }

    this.draw = function (data_set, data_map,formatStr,chart_line_title) {
        chart_line_title = chart_line_title || {xAxis:"",yAxis:""};
        chart_line_title["xAxis"] = chart_line_title["xAxis"] || "";
        chart_line_title["yAxis"] = chart_line_title["yAxis"] || "";
        if(!data_set || !data_map)
            return;
        var year_min_max = d3.extent(data_set,function (value) {
            return Number(value[0]);
        })
        var num_min_max = d3.extent(data_set,function (value) {
            return Number(value[1]);
        })
        _xScale
            .domain([year_min_max[0]-1,year_min_max[1]+1])
            .range([0,width-padding.left-padding.right]);
        _yScale
            .domain([0,num_min_max[1]*1.1])
            .range([height-padding.top-padding.bottom,0]);

        draw_data_line(data_set);
        draw_axis(chart_line_title,data_set.length);
        draw_grid();
        _mouseRect.on("mousemove",function () {
            // 获取鼠标相对透明矩形左上角的坐标，左上角坐标为(0,0)
            var temp = get_new_coordinate(this,_xScale,_yScale,data_set);
            if(!temp)
                return;
            update_axis_tip(formatStr,temp[0][0],temp[0][1],temp[1][0],temp[1][1]);
        })

    }

    function draw_data_line(data_set) {
        function default_set(ele,linePath){
            if(!ele)
                return;
            var temp = [];

            ele.attr("class","data-line")
                .attr("transform","translate("+padding.left+","+padding.top+")")
                .attr("d",function (d) {
                    var data_set = d.value;
                    for(var i=0,len=data_set.length;i<len;i++){
                        temp.push([data_set[i][0],0]);
                    }
                    return linePath(temp)
                })
                .transition()
                .duration(1000)
                .attr("d",function (d) {
                    return linePath(d.value);
                })
        }
        // 直线生成器
        var linePath = d3.line()
            .curve(d3.curveCatmullRom)
            .x(function (d) {
                return _xScale(d[0]);
            })
            .y(function (d) {
                return _yScale(d[1]);
            });
        var update = _svg.selectAll("path.data-line")
            .data([{value:data_set}]);
        var enter = update.enter();
        var exit = update.exit();

        exit.remove();
        default_set(enter.append("path"),linePath);
        default_set(update,linePath);
    }

    function draw_axis(chart_line_title,xTicks) {
        _xAxis.ticks(xTicks);
        _gxAxis.transition()
            .duration(2000)
            .call(_xAxis);
        _xAxisTitle.text(chart_line_title["xAxis"]);

        _gyAxis.transition()
            .duration(2000)
            .call(_yAxis);
        _yAxisTitle.text(chart_line_title["yAxis"]);
    }

    function draw_grid() {
        var update = null,
            enter = null,
            exit = null;
        function default_xLine_set(xLine) {
            xLine
                .attr("x1",_xScale)
                .attr("x2",_xScale)
                .attr("y2",padding.top)
                .attr("y1",(height-padding.bottom))
                .attr("transform","translate("+padding.left+",0)")
        }
        function default_yLine_set(yLine) {
            yLine
                .attr("y1",_yScale)
                .attr("y2",_yScale)
                .attr("x1",padding.left)
                .attr("x2",(width-padding.left))
                .attr("transform","translate(0,"+(padding.bottom)+")")
        }
        update = _grid.selectAll("line.grid-xLine")
            .data(_xScale.ticks());
        enter = update.enter()
        default_xLine_set(update);
        default_xLine_set(enter.append('line').attr("class","grid-xLine"))
        exit = update.exit();
        exit.remove();

        update = _grid.selectAll("line.grid-yLine")
            .data(_yScale.ticks());
        enter = update.enter()
        default_yLine_set(update);
        default_yLine_set(enter.append('line').attr("class","grid-yLine"))
        exit = update.exit();
        exit.remove();
    }

    function init_axis_tip() {
        // 焦点的元素
        _focusCirle = _svg.append("g")
            .attr("class","focusCircle")
            .style("display","none");
        _focusCirle.append("circle")
            .attr("r",4.5)
        _focusCirle.append("text")
            .classed("focusText",true)
            .attr("dx",10)
            .attr("dy","1em")
        // 对齐线的元素
        _focusLine = _svg.append("g")
            .attr("class","focusLine")
            .style("display",'none');
        _vLine = _focusLine.append("line");
        _hLine = _focusLine.append("line");

        _mouseRect = _svg.append("rect")
            .attr("class","overlay")
            .attr("x",padding.left)
            .attr("y",padding.top)
            .attr("width",width-padding.left-padding.right)
            .attr("height",height-padding.top-padding.bottom)
            .on("mouseover",function () {
                _focusCirle.style("display",null);
                _focusLine.style("display",null);
            })
            .on("mouseout",function () {
                _focusCirle.style("display","none");
                _focusLine.style("display","none");
            })
    }
    function get_new_coordinate(content,xScale,yScale,data_set){
        var mouseX = d3.mouse(content)[0] - padding.left;
        var mouseY = d3.mouse(content)[1] - padding.top;

        // 通过比例尺的反函数计算原数据中的值
        var x0 = xScale.invert(mouseX);
        var y0 = yScale.invert(mouseY);
        // 四舍五入
        x0 = Math.round(x0);
        // 查找在原数组中x0的值，并返回索引号
        var bisect = d3.bisector(function (d) {
            return d[0];
        }).left;
        var index = bisect(data_set,x0);
        // 从数据中获取
        if(index>=data_set.length)
            return;
        var x1 = data_set[index][0];
        var y1 = data_set[index][1];
        // 分别用相应的比例尺，计算焦点位置
        var focusX = xScale(x1) + padding.left;
        var focusY = yScale(y1) + padding.top;
        return [[x1,y1],[focusX,focusY]];
    }
    function update_axis_tip(formatStr,x1,y1,focusX,focusY){
        // 通过平移，将焦点移动到指定的位置
        _focusCirle.attr("transform","translate("+focusX+","+focusY+")");
        // 设置焦点的文字信息
        var temp_text = _focusCirle.select("text")
            .attr("dx",function () {
                return width/2-focusX;
            })
            .attr("dy",function () {
                return height/2-focusY;
            })
        // console.log(typeof formatStr == "string");
        if(typeof formatStr == "string"){
            // console.log(formatStr.format(x1,y1))
            temp_text.text(formatStr.format(x1,y1));
        }

        // 设置垂直对齐线的起点和终点
        _vLine.attr("x1",focusX)
            .attr("y1",focusY)
            .attr("x2",focusX)
            .attr("y2",height-padding.bottom);
        // 设置水平对齐线的起点和终点
        _hLine.attr("x1",focusX)
            .attr("y1",focusY)
            .attr("x2",padding.left)
            .attr("y2",focusY);
    }

    this.svg = function () {
        return _svg;
    }
    this.hide = function () {
        _svg.attr("display","none")
    }
    this.show = function () {
        _svg.attr("display",null)
    }

    this.init(width,height);
}
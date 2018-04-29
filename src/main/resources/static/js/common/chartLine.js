function ChartLine(svg,timeScale){
    var _svg = svg,
        width = _svg.attr("width"),
        height = _svg.attr("height"),
        _margin = {top:30,right:50,bottom:50,left:50},
        _width = width - _margin.left-_margin.right,
        _height = height-_margin.top-_margin.bottom,
        _color = d3.scaleOrdinal(d3.schemeCategory20);
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
        _grid = null,
        _path_gen = null,
        _area_gen = null,
        _main_g = null,
        _zoom = null,
        _zoomXScale = null,
        _area_color = null;

    this.init = function(){
        if(timeScale)
            _xScale = d3.scaleTime().range([0,_width]);
        else
            _xScale = d3.scaleLinear().range([0,_width]);
        _yScale = d3.scaleLinear().range([_height,0]);
        // 定义坐标轴
        _xAxis = d3.axisBottom(_xScale)
        // if(!timeScale)
        //     _xAxis.tickFormat(d3.format("d"));
        _yAxis = d3.axisLeft(_yScale)
            .tickFormat(d3.format("d"));
        _svg.append("defs").append("clipPath")
            .attr("id", "clip")
            .append("rect")
            .attr("width", _width)
            .attr("height", _height);
        // 直线生成器
        _path_gen = d3.line()
            .curve(d3.curveCatmullRom)
            .x(function (d) {
                return _xScale(d[0]);
            })
            .y(function (d) {
                return _yScale(d[1]);
            });
        _area_gen = d3.area()
            .curve(d3.curveMonotoneX)
            .x(function(d) { return _xScale(+d[0]); })
            .y0(_height)
            .y1(function(d) { return _yScale(+d[1]); });

        // 缩放控制器
        _zoom = d3.zoom()
            .scaleExtent([1, 32])
            .translateExtent([[0, 0], [_width, _height]])
            .extent([[0, 0], [_width, _height]])
            .on("zoom", zoomed);

        _main_g = _svg.append("g")
            .attr("class","line-main-g")
            .attr("transform","translate("+_margin.left+","+_margin.top+")")

        _gxAxis = _main_g.append("g")
            .attr("class","axis axis--x")
            .attr("transform","translate(0,"+_height+")")
            .call(_xAxis);
        _xAxisTitle = _main_g.append("text")
            .attr("class","axis-title")
            .attr("transform","translate("+(_width)+","+_height+")")

        _gyAxis = _main_g.append("g")
            .attr("class","axis axis--y")
            .call(_yAxis);
        _yAxisTitle = _main_g.append("text")
            .attr("class","axis-title")
            .attr("transform","translate("+(-_margin.left)+","+(-_margin.top/2)+")")

        _main_g.append("path")
            .attr("class","data-line clip_path")

        _grid = _svg.append("g")
            .attr("class","grid")
        _area_color = "steelblue";
        init_axis_tip()
    }

    this.draw = function (data_set, data_map,formatStr,chart_line_title,draw_point,zoom) {
        chart_line_title = chart_line_title || {xAxis:"",yAxis:""};
        chart_line_title["xAxis"] = chart_line_title["xAxis"] || "";
        chart_line_title["yAxis"] = chart_line_title["yAxis"] || "";
        if(!data_set)
            return;
        var y_max = d3.max(data_set,function(d){return d[1];}) || 25;
        _xScale
            .domain(d3.extent(data_set,function(d){return d[0];}));
        _yScale
            .domain([0,y_max+1]);
        _zoomXScale = _xScale;
        draw_data_line(data_set);
        if(draw_point)
            draw_data_point(data_set);
        draw_axis(chart_line_title,data_set.length);

        // Gratuitous intro zoom!
        if(zoom)
            _svg.call(_zoom)
        // draw_grid(_xScale);
        _mouseRect.on("mousemove",function () {
            // 获取鼠标相对透明矩形左上角的坐标，左上角坐标为(0,0)
            var temp = get_new_coordinate(this,_zoomXScale,_yScale,data_set);
            if(!temp)
                return;
            update_axis_tip(formatStr,temp[0][0],temp[0][1],temp[1][0],temp[1][1]);
        })

    }

    function draw_data_point(data_set) {
        var r_max = 2;
        function default_set(ele) {
            if(!ele)return;
            ele.attr("class","data-point clip_path")
                .attr("r",function(d){return r_max})
                .attr("cx",function(d){return _xScale(d[0]);})
                .attr("cy",function(d){return _yScale(d[1]);})
                .attr("fill","white")
                .attr("stroke-width",1)
                .attr("stroke","black")
        }
        var update = _main_g.selectAll("circle.clip_path")
            .data(data_set);
        var enter = update.enter();
        var exit = update.exit();

        exit.remove();
        default_set(enter.append("circle"),_area_gen);
        default_set(update,_area_gen);
    }

    function draw_data_line(data_set,gen) {
        function default_set(ele,gen){
            if(!ele)
                return;
            var temp = [];

            ele.classed("data-line",true)
                .classed("clip_path",true)
                .style("fill",_area_color)
                // .attr("d",function (d) {
                //     var data_set = d.value;
                //     for(var i=0,len=data_set.length;i<len;i++){
                //         temp.push([data_set[i][0],0]);
                //     }
                //     return _path_gen(temp)
                // })
                // .transition()
                // .duration(1000)
                .attr("d",function (d) {
                    return gen(d);
                })
        }

        var update = _main_g.select("path.data-line")
            .datum(data_set);
        var enter = update.enter();
        var exit = update.exit();

        exit.remove();
        var gen = _area_gen;
        default_set(enter.append("path"),gen);
        default_set(update,gen);
    }
    
    function rotate_text_label(ele) {
        return ele.attr("transform","rotate(30)")
            .style("text-anchor", "start");
    }

    function draw_axis(chart_line_title,xTicks) {
        if(!timeScale)
            _xScale.ticks(xTicks);
        _gxAxis.transition()
            .duration(1000)
            .call(_xAxis)
            .selectAll("text")
            .call(rotate_text_label)
        _xAxisTitle.text(chart_line_title["xAxis"]);

        _gyAxis.transition()
            .duration(1000)
            .call(_yAxis);
        _yAxisTitle.text(chart_line_title["yAxis"]);
    }

    function zoomed() {
        var t = d3.event.transform, xt = t.rescaleX(_xScale);
        _path_gen.x(function(d) {return xt(d[0]);})
        _area_gen.x(function(d) {return xt(d[0]);})
        _zoomXScale = xt;
        // draw_grid(xt);
        if(_main_g.attr("class")!="line-main-g")
            return;
        _main_g.selectAll(".data-point").attr("cx",function(d){return _zoomXScale(d[0]);})
        _main_g.selectAll(".data-line").attr("d",function (d) {
            return _area_gen(d);
        });
        _main_g.select(".axis--x").call(_xAxis.scale(xt));
        rotate_text_label(_gxAxis.selectAll("text"))
    }

    function draw_grid(xScale) {
        var update = null,
            enter = null,
            exit = null;
        function default_xLine_set(xLine) {
            xLine
                .attr("x1",xScale)
                .attr("x2",xScale)
                .attr("y2",_margin.top)
                .attr("y1",_height+_margin.top)
        }
        function default_yLine_set(yLine) {
            yLine
                .attr("y1",function(d){return _yScale(d)-_margin.bottom})
                .attr("y2",function(d){return _yScale(d)-_margin.bottom})
                .attr("x1",_margin.left)
                .attr("x2",(_width+_margin.left))
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
            .attr("x",_margin.left)
            .attr("y",_margin.top)
            .attr("width",width-_margin.left-_margin.right)
            .attr("height",height-_margin.top-_margin.bottom)
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
        var mouseX = d3.mouse(content)[0] - _margin.left;
        var mouseY = d3.mouse(content)[1] - _margin.top;

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
        var focusX = xScale(x1) + _margin.left;
        var focusY = yScale(y1) + _margin.top;
        return [[x1,y1],[focusX,focusY]];
    }
    function update_axis_tip(formatStr,x1,y1,focusX,focusY){
        // 通过平移，将焦点移动到指定的位置
        _focusCirle.attr("transform","translate("+focusX+","+focusY+")");
        // 设置焦点的文字信息
        var temp_text = _focusCirle.select("text")
            .attr("dx",function () {
                return _width/2-focusX;
            })
            .attr("dy",function () {
                return _margin.top/2-focusY;
            })
        // console.log(typeof formatStr == "string");
        if(typeof formatStr == "string"){
            // console.log(formatStr.format(x1,y1))
            if(timeScale)
                temp_text.text(formatStr.format(x1.getFullYear(),x1.getMonth()+1,y1));
            else
                temp_text.text(formatStr.format(x1,y1));
        }

        // 设置垂直对齐线的起点和终点
        _vLine.attr("x1",focusX)
            .attr("y1",focusY)
            .attr("x2",focusX)
            .attr("y2",height-_margin.bottom);
        // 设置水平对齐线的起点和终点
        _hLine.attr("x1",focusX)
            .attr("y1",focusY)
            .attr("x2",_margin.left)
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
    this.set_data_point_state = function(state){
        var show_point = function () {
            if(!_main_g)return;
            _main_g.selectAll(".data-point")
                .attr("display",null)
            _main_g.selectAll(".data-line")
                .attr("display","none")
        }

        var hide_point = function () {
            if(!_main_g)return;
            _main_g.selectAll(".data-point")
                .attr("display","none");
            _main_g.selectAll(".data-line")
                .attr("display",null)
        }
        if(state)
            show_point();
        else
            hide_point();
    }

    this.init();
}
function ChinaMap(svg){
    function ToolTip(){
        this._toolTip = d3.select("body")
            .append("div")
            .attr("class","tooltip")
            .style("opacity",0.0);

        this.mouse_over = function (event, value, index) {
            this._toolTip.style("opacity",1.0);
        }

        this.mouse_move = function (event, value, index) {
            this._toolTip.style("left",(event.pageX)+"px")
                .style("top",(event.pageY + 20) + "px");
        }
        this.mouse_out = function (event, value, index) {
            this._toolTip
                .style("opacity",0.0);
        }

        this.get_ele = function () {
            return this._toolTip;
        }
    }

    var origin_properties = {
        "stroke" : "black",
        "stroke-width" : 1,
        "fill" : "none",
        "opacity":1.0
    }

    function MarkerArrow(defs,id){
        var _defs = defs;
        var _id = id;

        var arrowMarker = defs.append("marker")
            .attr("id",_id)
            .attr("markerUnits","strokeWidth")
            .attr("markerWidth","12")
            .attr("markerHeight","12")
            .attr("viewBox","0 0 12 12")
            .attr("refX","6")
            .attr("refY","6")
            .attr("orient","auto")
            .on("mouseover",function(){
                d3.select(this)
                    .style("display","none");
            })
            .on("mouseout",function(){
                d3.select(this)
                    .style("display",null);
            });
        var arrow_path = "M2,2 L10,6 L2,10 L6,6 L2,2";
        arrowMarker.append("path")
            .attr("d",arrow_path)
            .attr("fill","#000");
    }

    function MarkerPoint(defs,id){
        var _defs = defs;
        var _id = id;
        var startMarker = _defs.append("marker")
            .attr("id",_id)
            .attr("markerUnits","strokeWidth")
            .attr("markerWidth","12")
            .attr("markerHeight","12")
            .attr("viewBox","0 0 12 12")
            .attr("refX","6")
            .attr("refY","6")
            .attr("orient","auto");
        startMarker.append("circle")
            .attr("cx",6)
            .attr("cy",6)
            .attr("r",2)
            .attr("fill","#000");
    }

    var _svg = svg,
        width = +_svg.attr("width"),
        height = +_svg.attr("height"),
        _margin = {left:30,right:30,top:30,bottom:30},
        _width = width-_margin.left-_margin.right,
        _height = height-_margin.top-_margin.bottom;
    var _main_china_json_features = null,
        _start_point_color_map = new Map();
    // 小贴士
    var _tooltip = new ToolTip();
    // 详情展示
    var _detailDialog = new util.ShowDetailModal(d3.select("body").append("div"),"chinaMapDetailDialog")

    // interval_id
    var _interval_ids = [];

    this.ToolTipMouseOver = function (_) {
        !arguments.length ? _tooltip.mouse_over : (_tooltip.mouse_over=_);
    }

    var _type = ["normal","flow"];

    // 地图坐标投影
    var projection = d3.geoMercator()
        .center([107,31])
        .scale(_width*3/4)
        .translate([width/2,height*5/8]);
    // // 平移量、缩放量初始值
    // var initTran = projection.translate();
    // var initScale = projection.scale();
    // 路径生成器
    var path = d3.geoPath(projection)

    // 颜色
    var color = d3.scaleOrdinal(d3.schemeCategory20);
    var color_start =d3.rgb(0,255,255);
    var color_end = d3.rgb(0,0,255);
    var computeColor = d3.interpolate(color_start,color_end);
    var color_function = function (d, i) {
        return color(i);
    }

    var _linearGradient = null;
    var _colorRect = null;
    var _minValueText = null;
    var _maxValueText = null;

    var defs = _svg.append("defs");
    // 箭头
    new MarkerArrow(defs,"arrow")
    // 起始圆点
    new MarkerPoint(defs,"startPoint")

    function line_color_func(d,i) {
        if(!_start_point_color_map.has(d[0][0])){
            _start_point_color_map.set(d[0][0],color(i));
        }
        return _start_point_color_map.get(d[0][0]);
    }

    // var pekingToGuilin = {
    //     type:"LineString",
    //     coordinates: [[116.4,39.9],[110.3,25.3]]
    // }
    // _svg.append("path")
    //     .attr("class","line")
    //     .attr("d",path(pekingToGuilin))
    //     .attr("marker-end","url(#arrow)")
    //     .attr("marker-start","url(#startPoint)");

    // 经纬度网格 -
    // var graticule = d3.geoGraticule()
    //     .extent([[-180,-90],[180,90]])
    //     .step([10,10])
    // var grid = graticule()
    //
    // var gridPath = _svg.append("path")
    //     .datum(grid)
    //     .attr("class","graticule")
    //     .attr("d",path);
    
    function draw_normal(context,data, data_map,formatStr){
        var _this=context;
        if(data && data_map){
            hide_flow_eles();
            _this.ToolTipMouseOver(function (event,d,i) {
                d = _main_china_json_features[i];
                function getName(d) {
                    if(!d) return "";
                    return d.properties.name;
                }
                if(!((typeof formatStr) =="string"))
                    return;
                this.get_ele().html(formatStr.format(getName(d),data_map.has(getName(d))?data_map.get(getName(d)):0))
                    .style("left",(event.pageX)+"px")
                    .style("top",(event.pageY+20)+"px")
                    .style("opacity",1.0)
            });

            var max_value = d3.max(data,function (d){
                return d[1];
            });
            var linear = d3.scaleLinear()
                .domain([0,max_value])
                .range([0,1]);

            _svg.select("#colorRect")
                .attr("display",null);
            //添加文字
            _svg.select("#minValueText")
                .attr("display",null)
                .text(function(){
                    return 0;
                });

            _svg.select("#maxValueText")
                .attr("display",null)
                .text(function(){
                    return max_value;
                });
            color_function = function (d,i) {
                d = _main_china_json_features[i];
                if(!d) return "white";
                function getName(d) {
                    return d.properties.name;
                }
                var value = data_map.has(getName(d)) ? data_map.get(getName(d)) : 0;
                var t = linear(value);
                var t_color = computeColor(t);
                return t_color.toString();
            }

            _svg.select("g.province")
                .selectAll("path")
                .on('mouseover',function (d, i) {
                    d = _main_china_json_features[i];
                    _tooltip.mouse_over(d3.event,d,i);
                })
                .on('mousemove',function (d, i) {
                    d = _main_china_json_features[i];
                    _tooltip.mouse_move(d3.event,d,i);
                })
                .on('mouseout',function (d, i) {
                    d = _main_china_json_features[i];
                    _tooltip.mouse_out(d3.event,d,i);
                })
                .style("fill",color_function)
        }
        // console.log("draw china complete")
    }

    function hide_normal_eles() {
        _svg.select("g.province")
            .selectAll("path")
            .on('mouseover',null)
            .on('mousemove',null)
            .on('mouseout',null)
            .style("fill","white");
        _svg.select("#colorRect")
            .attr("display","none");
        _svg.select("#minValueText")
            .attr("display","none")
        _svg.select("#maxValueText")
            .attr("display","none")
    }

    function hide_flow_eles() {
        _svg.select("g.route-line")
            .style("display","none");
    }

    function draw_flow(context,data,data_map,formatStr,ele_type,detailFormatStr) {
        ele_type = ele_type || "line";
        detailFormatStr = detailFormatStr || "{0}-{1}"
        // console.log(arguments);
        var _this=context;
        // console.log("provinces_coordinates",provinces_coordinates)
        if(data){
            _this.ToolTipMouseOver(function (event,d,i) {
                function getOuterHtml(ele) {
                    return ele.prop("outerHTML");
                }
                if(!((typeof formatStr) =="string"))
                    return;
                var htmlStr = "无";
                if(d[2]){
                    var values = [];
                    for(var key in d[1]){
                        values.push(key);
                    }
                    htmlStr = values.join(",");
                }
                this.get_ele().html(formatStr.format(d[0][0],d[0][1],htmlStr))
                    .style("left",(event.pageX)+"px")
                    .style("top",(event.pageY+20)+"px")
                    .style("opacity",1.0)
            });
            function default_set(operator,ele,ele_type) {
                ele_type = ele_type || "line";
                function sub_default_set(ele) {
                    function fade(opacity) {
                        return function (g_d, i) {
                            d3.selectAll(".flow-line")
                                .filter(function (d) {
                                    return g_d[0][0]!=d[0][0];// || g_d[0][1]!=d[0][1];
                                })
                                .transition()
                                .duration(duration_time/2)
                                .style("opacity",opacity);
                        }
                    }
                    ele
                        .attr("class","flow-line")
                        .on("click",function (d) {
                            _detailDialog.setHeaderTitle(d[0][0]+"->"+d[0][1])
                            var body = _detailDialog.getBodyDiv();
                            var update = body.selectAll("h5.total")
                                .data([d[2]])
                            default_set_total_title(update)
                            default_set_total_title(update.enter().append("h5"));
                            update.exit().remove();
                            function default_set_total_title(ele){
                                if(!ele)return;
                                ele.attr("class","total")
                                    .text(function(d){return "总数:"+d});
                            }

                            update = body.selectAll("div.div-detail")
                                .data(Object.keys(d[1]))
                            default_set_detail(update)
                            default_set_detail(update.enter().append("div"))
                            update.exit().remove();
                            function default_set_detail(ele) {
                                if(!ele || ele.empty())return;
                                ele.attr("class","div-detail")
                                var update = ele.selectAll("h6.detail-title")
                                    .data(function(key){return [key];})
                                default_set_detail_title(update);
                                default_set_detail_title(update.enter().append("h6"))
                                update.exit().remove();
                                function default_set_detail_title(ele) {
                                    if(!ele)return;
                                    ele.attr("class","detail-title")
                                        .text(function(key){
                                            var sum = d3.sum(d[1][key],function(value){return value[1];});
                                            return key+"("+sum+"份)";});
                                }
                                ele.selectAll("svg.detail-chart").remove();
                                var chart_update = ele.selectAll("svg.detail-chart")
                                    .data(function(key){return [key];});
                                default_set_detail_chart(chart_update);
                                default_set_detail_chart(chart_update.enter().append("svg"))
                                chart_update.exit().remove();
                                function default_set_detail_chart(ele){
                                    if(!ele || ele.empty())return;
                                    ele.attr("width",400).attr("height",300)
                                        .attr("class","detail-chart")
                                        .each(function (key) {
                                            var chart = new ChartLine(d3.select(this),false);
                                            var data_set = d[1][key].slice(0);
                                            chart.draw(data_set.sort(function(a,b){return d3.ascending(+a[0],+b[0]);})
                                                ,null,detailFormatStr,{xAxis:"时间/年",yAxis:"数量/份"},true,false);
                                        })
                                }
                                // var ul_update = ele.selectAll("ul")
                                //     .data(function (key) {
                                //         console.log("ul",key);
                                //         return [key];
                                //     })
                                // default_set_ul(ul_update);
                                // default_set_ul(ul_update.enter().append("ul"));
                                // ul_update.exit().remove();
                                // function default_set_ul(ele) {
                                //     if(!ele)return;
                                //     ele.attr("class","list-group")
                                //     update = ele.selectAll("li")
                                //         .data(function (key) {
                                //             console.log("li",d,key)
                                //             return d[1][key];
                                //         })
                                //     default_set_li(update)
                                //     default_set_li(update.enter().append("li"))
                                //     update.exit().remove();
                                //     function default_set_li(ele) {
                                //         if(!ele)return;
                                //         ele.attr("class","list-group-item")
                                //             .text(function (d) {
                                //                 return d[0]+"年-----"+d[1];
                                //             })
                                //     }
                                // }
                            }
                        })
                        .attr("data-toggle","modal")
                        .attr("data-target","#"+_detailDialog.getId())
                        .on('mouseover',function (d, i) {
                            // console.log("mouseover",this);
                            d3.select(this)
                                // .attr("stroke",'yellow')
                                .attr("stroke-width",5)
                            _tooltip.mouse_over(d3.event,d,i);
                            fade(0.0)(d,i);
                        })
                        .on('mousemove',function (d, i) {
                            _tooltip.mouse_move(d3.event,d,i);
                        })
                        .on('mouseout',function (d, i) {
                            d3.select(this)
                                .attr("stroke",line_color_func)
                                .attr("stroke-width",origin_properties["stroke-width"])
                            _tooltip.mouse_out(d3.event,d,i);
                            fade(1.0)(d,i);
                        })
                        .attr("marker-end","url(#arrow)")
                        .attr("marker-start","url(#startPoint)")
                        .attr("stroke",line_color_func)
                }
                function default_animation(ele,duration_time,ele_type,operator){
                    // console.log(arguments);
                    // 此处的ele_type 代表ele元素的种类，而不是update或者enter
                    duration_time = duration_time || 1000;
                    if(ele_type=="path"){
                        if(operator=="enter"){
                            // 使用path 在某些 路径上不能呈现 从0到最终地点的动画效果
                            ele = ele
                                .attr("d",function (d) {
                                    if(!d) return;
                                    var start_coord = provinces_coordinates[d[0][0]];
                                    var end_coord = provinces_coordinates[d[0][1]];
                                    return path({
                                        type:"LineString",
                                        coordinates:[start_coord,start_coord]
                                    });
                                }).transition()
                                .duration(duration_time)
                        }
                        ele
                            .attr("d",function (d) {
                                if(!d) return;
                                var start_coord = provinces_coordinates[d[0][0]];
                                var end_coord = provinces_coordinates[d[0][1]];
                                return path({
                                    type:"LineString",
                                    coordinates:[start_coord,end_coord]
                                });

                            });
                    }else{
                        if(operator=="enter"){
                            ele = ele
                                .attr("stroke",'blue')
                                .attr("stroke-width", 3)
                                .attr("x1",function (d) {
                                    var start_coord = provinces_coordinates[d[0][0]];
                                    return projection(start_coord)[0];
                                })
                                .attr("y1",function (d) {
                                    var start_coord = provinces_coordinates[d[0][0]];
                                    return projection(start_coord)[1];
                                })
                                .attr("x2",function (d) {
                                    var end_coord = provinces_coordinates[d[0][0]];
                                    return projection(end_coord)[0];
                                })
                                .attr("y2",function (d) {
                                    var end_coord = provinces_coordinates[d[0][0]];
                                    return projection(end_coord)[1];
                                })
                                .transition()
                                .duration(duration_time)
                                .on("interrupt",function (d) {
                                    // console.log("enter","interrupt");
                                })
                        }
                        ele
                            .attr("stroke",line_color_func)
                            .attr("stroke-width",origin_properties["stroke-width"])
                            .attr("x1",function (d) {
                                var start_coord = provinces_coordinates[d[0][0]];
                                return projection(start_coord)[0];
                            })
                            .attr("y1",function (d) {
                                var start_coord = provinces_coordinates[d[0][0]];
                                return projection(start_coord)[1];
                            })
                            .attr("x2",function (d) {
                                var end_coord = provinces_coordinates[d[0][1]];
                                return projection(end_coord)[0];
                            })
                            .attr("y2",function (d) {
                                var end_coord = provinces_coordinates[d[0][1]];
                                return projection(end_coord)[1];
                            });
                    }

                }
                var duration_time = 1000;
                if(operator=="enter" || operator=="update"){
                    if(operator=="enter"){
                        ele = ele.append(ele_type);
                    }
                    sub_default_set(ele)
                    // if(operator=="enter"){ // 线的动画会影响鼠标选定
                    //     _interval_ids.push(setInterval(function () {
                    //         console.log("interval_id.length",_interval_ids.length);
                    //         default_animation(ele,duration_time,ele_type,operator);
                    //         },
                    //         duration_time*1.5
                    //     ));
                    // }
                    default_animation(ele,duration_time,ele_type,operator);
                }else if(operator=="exit"){
                    if(ele_type=="path"){
                        ele
                            .transition()
                            .duration(duration_time)
                            .attr("d",function (d) {
                                if(!d) return;
                                var start_coord = provinces_coordinates[d[0][0]];
                                var end_coord = provinces_coordinates[d[0][0]];
                                return path({
                                    type:"LineString",
                                    coordinates:[start_coord,end_coord]
                                });

                            })
                            .on("end",function (d) {
                                d3.select(this).remove();
                            })
                    }else{
                        ele
                            .attr("stroke",'red')
                            .attr("stroke-width", 3)
                            .transition()
                            .duration(duration_time)
                            .on("interrupt",function (d) {
                                // console.log("exit","interrupt");
                            })
                            .attr("x1",function (d) {
                                var start_coord = provinces_coordinates[d[0][0]];
                                return projection(start_coord)[0];
                            })
                            .attr("y1",function (d) {
                                var start_coord = provinces_coordinates[d[0][0]];
                                return projection(start_coord)[1];
                            })
                            .attr("x2",function (d) {
                                var end_coord = provinces_coordinates[d[0][0]];
                                return projection(end_coord)[0];
                            })
                            .attr("y2",function (d) {
                                var end_coord = provinces_coordinates[d[0][0]];
                                return projection(end_coord)[1];
                            })
                            .on("end",function (d) {
                                d3.select(this).remove();
                            })
                    }

                }
            }
            hide_normal_eles();
            // data.length = 5;
            var update = _svg.select("g.route-line")
                .style("display",null)
                .selectAll(ele_type)
                .data(data,function (d) {
                    return d[0][0]+"->"+d[0][1];
                })
            var enter = update.enter()
            var exit = update.exit();
            default_set("update",update,ele_type);
            default_set("enter",enter,ele_type);
            default_set("exit",exit,ele_type);
        }
    }

    var draw_type = {normal:draw_normal,flow:draw_flow}

    this.draw = function (data, data_map, formatStr, type,detailFormatStr) {
        function clear_interval() {
            for(var i=0,len=_interval_ids.length;i<len;i++){
                clearInterval(_interval_ids[i]);
            }
            _interval_ids=[];
        }
        type = type || (~_type.indexOf(type) ? type : _type[0]);
        // console.log(type)
        var _this = this;
        clear_interval();
        draw_type[type](_this,data,data_map,formatStr,"path",detailFormatStr);
    }

    this.init_tip_color_rect = function () {
        var colorRect_width = 140;
        var colorRect_height = 30;
        var colorRect_x = width/8;
        var colorRect_y = height-colorRect_height-10;
        var defs = _svg.append("defs");
        _linearGradient = defs.append("linearGradient")
            .attr("id","linearColor")
            .attr("x1","0%")
            .attr("y1","0%")
            .attr("x2","100%")
            .attr("y2","0%")
        var stop1 = _linearGradient.append("stop")
            .attr("offset","0%")
            .style("stop-color",color_start.toString())
        var stop2 = _linearGradient.append("stop")
            .attr("offset","100%")
            .style("stop-color",color_end.toString());
        _colorRect = _svg.append("rect")
            .attr("id","colorRect")
            .attr("x",colorRect_x)
            .attr("y",colorRect_y)
            .attr("width",colorRect_width)
            .attr("height",colorRect_height)
            .attr("display","none")
            .style("fill","url(#"+_linearGradient.attr("id")+")");
        _minValueText = _svg.append("text")
            .attr("class","valueText")
            .attr("id","minValueText")
            .attr("x", colorRect_x)
            .attr("y", colorRect_y)
            .attr("dy", "-0.3em")
            .attr("display","none");
        _maxValueText = _svg.append("text")
            .attr("class","valueText")
            .attr("id","maxValueText")
            .attr("x", colorRect_x+colorRect_width)
            .attr("y", colorRect_y)
            .attr("dy", "-0.3em")
            .attr("display","none");
    }

    this.init = function (main_china_json) {
        var _this = this;
        _main_china_json_features = main_china_json.features;
        _this.init_tip_color_rect();
        // 中国大陆及港澳台
        _svg.append("g")
            .attr("class","province")
            .selectAll("path")
            .data(_main_china_json_features)
            .enter()
            .append("path")
            .style("fill",color_function)
            .attr("d",path); // 使用路径生成器

        _svg.append("g")
            .attr("class","route-line");

        // 南海诸岛
        d3.xml("/svg/southchinasea.svg",function (error, xmlDocument) {
            if(error)
                return console.error(error);
            _svg.html(function(d){
                return d3.select(this).html() + xmlDocument.getElementsByTagName("g")[0].outerHTML;
            })
            d3.select("#southsea")
                .attr("width",_width/8)
                .attr("transform","translate("+(width*3/4)+","+(height*4/5)+")scale(0.5)")
                .attr("class","south-china-sea");
        });
    }

    this.svg = function () {
        return _svg;
    }

    this.hide = function () {
        if(_svg)
            _svg.attr("display","none");
    }

    this.show = function () {
        if(_svg)
            _svg.attr("display","");
    }
}
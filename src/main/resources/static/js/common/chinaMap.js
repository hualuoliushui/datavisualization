function ChinaMap(svg,width,height){
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
            this._toolTip.style("opacity",0.0);
        }

        this.get_ele = function () {
            return this._toolTip;
        }
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
            .attr("orient","auto");
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

    var _svg = svg;
    // 小贴士
    var _tooltip = new ToolTip()

    this.ToolTipMouseOver = function (_) {
        !arguments.length ? _tooltip.mouse_over : (_tooltip.mouse_over=_);
    }

    var _provinces = null;
    var _inited = false;

    // 地图坐标投影
    var projection = d3.geoMercator()
        .center([107,31])
        .scale(600)
        .translate([width/2,height*5/8]);
    // // 平移量、缩放量初始值
    // var initTran = projection.translate();
    // var initScale = projection.scale();
    // 路径生成器
    var path = d3.geoPath(projection)

    // 颜色
    var color = d3.scaleOrdinal(d3.schemeCategory20b);
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

    this.draw = function (data, data_map, formatStr) {
        var _this = this;
        if(!_inited)
            return _this.init(data,data_map, formatStr);
        // console.log("draw")
        // console.log(_provinces);
        if(_provinces==null)
            return;
        // while(_provinces==null);
        if(data && data_map){
            _this.ToolTipMouseOver(function (event,d,i) {
                function getName(d) {
                    return d.properties.name;
                }
                if(!((typeof formatStr) =="string"))
                    return;
                this.get_ele().html(formatStr.format(getName(d),data_map[getName(d)]?data_map[getName(d)]:0))
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
                if(!d) return "white";
                function getName(d) {
                    return d.properties.name;
                }
                var value = data_map[getName(d)] ? data_map[getName(d)] : 0;
                var t = linear(value);
                // console.log(t);
                var t_color = computeColor(t);
                return t_color.toString();
            }

            _provinces
                .on('mouseover',function (d, i) {
                    _tooltip.mouse_over(d3.event,d,i);
                })
                .on('mousemove',function (d, i) {
                    _tooltip.mouse_move(d3.event,d,i);
                })
                .on('mouseout',function (d, i) {
                    _tooltip.mouse_out(d3.event,d,i);
                })
                .style("fill",color_function)
        }
    }

    this.init_tip_color_rect = function () {
        var colorRect_x = 20;
        var colorRect_y = 450;
        var colorRect_width = 140;
        var colorRect_height = 30;
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
            .attr("width",140)
            .attr("height",30)
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

    this.init = function (data,data_map,formatStr) {
        var _this = this;
        if(_inited)
        {
            _this.draw(data,data_map,formatStr);
            return;
        }
        _inited=true;
        _this.init_tip_color_rect();
        // 中国大陆及港澳台
        d3.json("/json/china.json",function (error, root) {
            if(error)
                return console.error(error);

            var groups = _svg.append("g");
            var paths = groups.selectAll("path")
            _provinces = paths.data(root.features)
                .enter()
                .append("path")
                .attr("class","province")
                .style("fill",color_function)
                .attr("d",path); // 使用路径生成器

            _this.draw(data,data_map,formatStr);
        })

        // 南海诸岛
        d3.xml("/svg/southchinasea.svg",function (error, xmlDocument) {
            if(error)
                return console.error(error);
            _svg.html(function(d){
                return d3.select(this).html() + xmlDocument.getElementsByTagName("g")[0].outerHTML;
            })
            d3.select("#southsea")
                .attr("transform","translate(640,410)scale(0.5)")
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
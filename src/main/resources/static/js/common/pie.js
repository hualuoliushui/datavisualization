function PIE(svg,valueOf,lineTextValueOf,need_lineText) {
    var _svg = svg;
    var _this = this;
    var width = +_svg.attr("width");
    var height = +_svg.attr("height");
    var _margin = {left:30,right:30,top:30,bottom:30};
    var _width = width-_margin.left-_margin.right;
    var _height = height -_margin.top-_margin.bottom;
    var _drag_out_data_set = [];
    var _drag = d3.drag()
        .on("start",drag_start)
        .on("drag",drag_move)
        .on("end",drag_end)
    var _drag_in = d3.drag()
        .on("start",in_drag_start)
        .on("drag",in_drag_move)
        .on("end",in_drag_end);
    var _main_g = _svg.append("g")
        .attr("class","main-g")
        .attr("transform","translate("+_margin.left+","+_margin.top+")");
    var _drag_out_g = _svg.append("g")
        .attr("class","drag-out-g")
        .attr("transform","translate("+_margin.left+","+_margin.top+")")
    var tooltip = d3.select("body")
        .append("div")
        .attr("class","tooltip")
        .style("opacity",0.0);
    var pieCircle = {
        cx:_width/2,
        cy:_height/2,
        r:0
    };
    var _color = d3.scaleOrdinal(d3.schemeCategory20);
    var _dataset=[]
    var _piedata=null;
    var _formatStr="{0}-{1}";
    var _getPercent=getPercentGen([]);
    lineTextValueOf = lineTextValueOf ? lineTextValueOf : function (d) {return d.data[0];};
    valueOf = valueOf ? valueOf : function (d) {return d[1];};

    this.convertData = function (dataset) {
        _dataset=dataset.slice(0)
        for(var i=0,len=_dataset.length;i<len;i++){
            if(!_dataset[i].color){
                _dataset[i].color = _color(i);
            }
        }
        var pie = d3.pie()
            .value(valueOf);
        _piedata=pie(dataset);
        for(var i=0,len=_piedata.length;i<len;i++){
            _piedata[i].color = _piedata[i]["data"].color;
        }
        _getPercent = getPercentGen(dataset);
    }

    function getPercentGen(data_set) {
        //计算百分比
        // console.log(d); d 为弧度数据结构
        var sum = d3.sum(_dataset,function (d) {
            return Number(valueOf(d))
        });
        return function (d) {
            var percent = Number(d.value)/ sum *100;
            //保留一位小数点
            return percent.toFixed(1)+"%";
        }
    }

    function drag_start(d) {

    }

    function drag_move(d) {
        d.dx+=d3.event.dx;
        d.dy+=d3.event.dy;
        d3.select(this)
            .attr("transform","translate("+(d.dx+pieCircle.cx)+","+(d.dy+pieCircle.cy)+")");
    }

    function drag_end(d,i) {
        var dis2 = d.dx*d.dx+d.dy*d.dy;
        if(dis2 > pieCircle.r*pieCircle.r/4){
            var movedData = _dataset.splice(i,1)[0];
            var color = d3.select(this).select("path").attr("fill");
            d3.select(this).remove();
            tooltip.style("opacity",0);
            movedData.color=color;
            _drag_out_data_set.push(movedData);
            update_drag_out_ele();
            redraw(_dataset);
        }else{
            d3.select(this)
                .attr('transform',function(d){
                    d.dx=0,d.dy=0;
                    return "translate("+(pieCircle.cx)+","+(pieCircle.cy)+")"})
        }
    }

    function in_drag_start(d) {

    }

    function in_drag_move(d) {
        d.dx+=d3.event.dx;
        d.dy+=d3.event.dy;
        d3.select(this)
            .attr("transform","translate("+(d.dx)+","+(d.dy)+")");
    }
    
    function in_drag_end(d, i) {
        if(d.dx>_width/4){
            var movedData = _drag_out_data_set.splice(i,1)[0];
            _dataset.push(movedData);
            d3.select(this).remove();
            tooltip.style("opacity",0);
            update_drag_out_ele();
            redraw(_dataset)
        }else{
            d.dx=0;
            d.dy=0;
            d3.select(this)
                .attr("transform","translate("+(d.dx)+","+(d.dy)+")");
        }
    }
    
    function update_drag_out_ele() {
        var len = _drag_out_data_set.length
            ,padding=2;
        var rect_descr = {
            rect_total_height:_height-padding*(len-1)
            ,used_len:0
        };

        var sum = d3.sum(_drag_out_data_set,function(d){return d[1]});
        function default_set(ele,operator) {
            ele.each(function (d) {
                    d.dx=0;
                    d.dy=0;
                    d.rect_descr=rect_descr
                })
                .on("mouseover",function(d,i){
                    tooltip.style("opacity",1.0);
                    tooltip.html(_formatStr.format(d[0],d[1],(d[1]/sum*100).toFixed(1)+"%"))
                        .style("left",(d3.event.pageX)+"px")
                        .style("top",(d3.event.pageY+20)+"px")
                        .style("opacity",1.0)
                        .style("box-shadow", "10px 0px 0px " + d.color);
                })
                .on("mousemove",function () {
                    tooltip.style("left",(d3.event.pageX)+"px")
                        .style("top",(d3.event.pageY + 20) + "px");
                })
                .on("mouseout",function(d,i){
                    tooltip.style("opacity",0.0);
                })
                .call(_drag_in);
            var rect = null;
            var text = null;
            if(operator=="enter"){
                ele.attr("class","out-g");
                rect = ele.append("rect");
                text = ele.append("text");
            }else{
                rect = ele.selectAll("rect");
                text = ele.selectAll("text");
            }
            rect.attr("x",function(d,i){return 0})
                .attr("y",function(d,i){
                    var len = d[1]/sum*d.rect_descr.rect_total_height;
                    d.rect_descr.used_len+=len+padding;
                    return d.rect_descr.used_len-len-padding;
                })
                .attr("height",function(d,i){
                    return d[1]/sum*d.rect_descr.rect_total_height;
                })
                .attr("width",20)
                .attr("fill",function(d,i){return d.color;})
        }
        var out_update=_drag_out_g.selectAll("g.out-g")
            .data(_drag_out_data_set)

        default_set(out_update,"update")
        default_set(out_update.enter().append("g"),"enter");
        out_update.exit().remove();
    }

    function default_set(formatStr,operator,ele,outerRadius,innerRadius) {
        var temp = d3.min([_width,_height])*0.5;
        outerRadius = outerRadius || temp;
        innerRadius = innerRadius || 0;
        pieCircle.r = outerRadius;

        var arc = d3.arc()
            .innerRadius(innerRadius)
            .outerRadius(outerRadius);

        var path=null
        var text=null
        var line=null
        var lineText=null

        if(operator=='update') {
            ele.each(function (d) {
                    d.dx=0;
                    d.dy=0;
                })
                .call(_drag)
            path = ele.select('path')
            text = ele.select('.pie-inner-text')
            if(need_lineText) {
                line = ele.select('.pie-outer-line')
                lineText = ele.select('.pie-outer-text')
            }
        }
        else{
            var arcs_g = ele.append('g')
                .attr("class","arc")
                .each(function (d,i) {
                    d.dx=0;
                    d.dy=0;
                })
                .attr('transform',function(d){return "translate("+(pieCircle.cx)+","+(pieCircle.cy)+")"})
                .call(_drag)
                .on('mouseover',function (d, i) {
                    if((typeof formatStr == "string")){
                        tooltip.html(formatStr.format(lineTextValueOf(d),valueOf(d.data),
                            _getPercent(d)))
                            .style("left",(d3.event.pageX)+"px")
                            .style("top",(d3.event.pageY+20)+"px")
                            .style("opacity",1.0)
                            .style("box-shadow", "10px 0px 0px " + d.color);
                    }
                    var temp_arc = d3.arc()
                        .innerRadius(innerRadius)
                        .outerRadius(outerRadius*1.2);
                    d3.select(this)
                        .select('path')
                        .attr("d",function (d) {
                            return temp_arc(d);
                        })
                    d3.select(this)
                        .select('text')
                        .attr("transform",function (d) {
                            var x = temp_arc.centroid(d)[0];//文字的x坐标
                            var y = temp_arc.centroid(d)[1];//文字的y坐标
                            return "translate("+x+","+y+")";
                        })
                    if(line){
                        d3.select(this)
                            .select('.pie-outer-line')
                            .attr('stroke','black')
                            .attr('x1',function (d) {
                                return temp_arc.centroid(d)[0]*2;
                            })
                            .attr('y1',function (d) {
                                return temp_arc.centroid(d)[1]*2;
                            })
                            .attr('x2',function (d) {
                                return temp_arc.centroid(d)[0]*2.2;
                            })
                            .attr('y2',function (d) {
                                return temp_arc.centroid(d)[1]*2.2;
                            })

                        d3.select(this)
                            .select('.pie-outer-text')
                            .attr("transform",function (d) {
                                var x = temp_arc.centroid(d)[0]*2.5;
                                var y = temp_arc.centroid(d)[1]*2.5;
                                return "translate("+x+","+y+")";
                            })
                    }

                })
                .on("mouseout",function (d, i) {
                    tooltip.style("opacity",0.0);
                    d3.select(this)
                        .select('path')
                        .attr("d",function (d) {
                            return arc(d);
                        })
                    d3.select(this)
                        .select('text')
                        .attr("transform",function (d) {
                            var x = arc.centroid(d)[0];//文字的x坐标
                            var y = arc.centroid(d)[1];//文字的y坐标
                            return "translate(" + x + "," + y + ")";
                        })
                    if(line){
                        d3.select(this)
                            .select('.pie-outer-line')
                            .attr('stroke','black')
                            .attr('x1',function (d) {
                                return arc.centroid(d)[0]*2;
                            })
                            .attr('y1',function (d) {
                                return arc.centroid(d)[1]*2;
                            })
                            .attr('x2',function (d) {
                                return arc.centroid(d)[0]*2.2;
                            })
                            .attr('y2',function (d) {
                                return arc.centroid(d)[1]*2.2;
                            })
                        d3.select(this)
                            .select('.pie-outer-text')
                            .attr("transform",function (d) {
                                var x = arc.centroid(d)[0]*2.5;
                                var y = arc.centroid(d)[1]*2.5;
                                return "translate("+x+","+y+")";
                            })
                    }
                })
                .on("mousemove",function (d) {
                    tooltip.style("left",(d3.event.pageX)+"px")
                        .style("top",(d3.event.pageY + 20) + "px");
                })
            path = arcs_g.append('path')
            text = arcs_g.append('text').classed('pie-inner-text',true)
            if(line){
                line = arcs_g.append('line').classed('pie-outer-line',true)
                lineText = arcs_g.append('text').classed('pie-outer-text',true)
            }
        }

        var duration_time = 1000;
        path.attr("fill",function (d, i) {
                return d.color;
            })
            .attr("d",function (d) {
                d["_endAngle"]=d["endAngle"];
                d["endAngle"]=d["startAngle"];
                return arc(d);
            })
            .transition()
            .duration(duration_time)
            .attrTween("d",function(d,i,a){
                return function(t){
                    d["endAngle"]=t*(d["_endAngle"]-d["startAngle"])+d["startAngle"];
                    return arc(d);
                }
            })
            // .attr("d",function (d) {
            //     d["endAngle"]=d["_endAngle"];
            //     return arc(d);
            // })
        
        setTimeout(function () {
            text.attr("transform",function (d) {
                var x = arc.centroid(d)[0];//文字的x坐标
                var y = arc.centroid(d)[1];//文字的y坐标
                return "translate("+x+","+y+")";
            })
                .attr("text-anchor","middle")
                .text(_getPercent)
        },duration_time);

        if(line) {
            line.attr('stroke','black')
                .attr('x1',function (d) {
                    return arc.centroid(d)[0]*2;
                })
                .attr('y1',function (d) {
                    return arc.centroid(d)[1]*2;
                })
                .attr('x2',function (d) {
                    return arc.centroid(d)[0]*2.2;
                })
                .attr('y2',function (d) {
                    return arc.centroid(d)[1]*2.2;
                })

            lineText.attr("transform",function (d) {
                var x = arc.centroid(d)[0]*2.5;
                var y = arc.centroid(d)[1]*2.5;
                return "translate("+x+","+y+")";
            })
                .attr('text-anchor','middle')
                .text(lineTextValueOf)
        }

    }

    function redraw(data_set) {
        _this.convertData(data_set);
        draw();
    }

    function draw(formatStr,outerRadius,innerRadius) {
        _formatStr = formatStr || _formatStr;
        var update = _main_g.selectAll('g.arc')
            .data(_piedata);
        default_set(_formatStr,'update',update,
            outerRadius,innerRadius)

        var enter = update.enter();

        default_set(_formatStr,'enter',enter,
            outerRadius,innerRadius)

        var exit = update.exit();
        exit.remove();
    }

    this.draw = function (formatStr,outerRadius,innerRadius) {
        _drag_out_data_set=[];
        update_drag_out_ele()
        draw(formatStr,outerRadius,innerRadius);
        return this;
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
};
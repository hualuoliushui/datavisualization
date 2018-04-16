function PIE(svg,width,height,valueOf,lineTextValueOf,need_lineText) {
    var _width = width || 800;
    var _height = height || 800;
    var _svg = svg || d3.select("body").append("svg")
        .attr("width", _width)
        .attr("height", _height);
    var tooltip = d3.select("body")
        .append("div")
        .attr("class","tooltip")
        .style("opacity",0.0);
    var _dataset=[]
    var _piedata=null;
    lineTextValueOf = lineTextValueOf ? lineTextValueOf : function (d) {return d.data[0];};
    valueOf = valueOf ? valueOf : function (d) {return d[1];};
    this.convertData = function (dataset) {
        _dataset=dataset.slice(0)
        var pie = d3.pie()
            .value(valueOf);
        _piedata=pie(dataset);
    }
    this.default_set = function (formatStr,type,ele,outerRadius,innerRadius) {
        var temp = _width/2;
        outerRadius = outerRadius || temp;
        innerRadius = innerRadius || temp/2;
        var arc = d3.arc()
            .innerRadius(innerRadius)
            .outerRadius(outerRadius);
        var color = d3.scaleOrdinal(d3.schemeCategory20);
        var dataset = _dataset;
        var width = _width
        var height = _height

        var path=null
        var text=null
        var line=null
        var lineText=null
        var circle = null

        if(type=='update') {
            path = ele.select('path')
            text = ele.select('.pie-inner-text')
            if(need_lineText) {
                line = ele.select('.pie-outer-line')
                lineText = ele.select('.pie-outer-text')
            }
        }
        else{
            var enter_arcs = ele.append('g')
                .attr('transform',
                    "translate("+(_width)+","+(_height)+")")
                .on('mouseover',function (d, i) {
                    if((typeof formatStr == "string")){
                        tooltip.html(formatStr.format(lineTextValueOf(d),valueOf(d.data),
                            getPercent(d)))
                            .style("left",(d3.event.pageX)+"px")
                            .style("top",(d3.event.pageY+20)+"px")
                            .style("opacity",1.0)
                            .style("box-shadow", "10px 0px 0px " + color(i));
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
            path = enter_arcs.append('path')
            text = enter_arcs.append('text').classed('pie-inner-text',true)
            if(line){
                line = enter_arcs.append('line').classed('pie-outer-line',true)
                lineText = enter_arcs.append('text').classed('pie-outer-text',true)
            }
        }
        path.attr("fill",function (d, i) {
                return color(i);
            })
            .attr("d",function (d) {
                d["_endAngle"]=d["endAngle"];
                d["endAngle"]=d["startAngle"]+0.1;
                // console.log(d);
                return arc(d);
            })
            .transition()
            .duration(1000)
            .attr("d",function (d) {
                d["endAngle"]=d["_endAngle"];
                return arc(d);
            })

        function getPercent(d) {
            //计算百分比
            // console.log(d); d 为弧度数据结构
            var sum = d3.sum(_dataset,function (d) {
                return Number(valueOf(d))
            });

            var percent = Number(d.value)/ sum *100;
            //保留一位小数点
            return percent.toFixed(1)+"%";
        }

        text.attr("transform",function (d) {
                var x = arc.centroid(d)[0];//文字的x坐标
                var y = arc.centroid(d)[1];//文字的y坐标
                return "translate("+x+","+y+")";
            })
            .attr("text-anchor","middle")
            .text(getPercent)

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

    this.draw = function (formatStr,outerRadius,innerRadius) {
        var g = _svg.selectAll('g')
        var update = g.data(_piedata);
        this.default_set(formatStr,'update',update,
            outerRadius,innerRadius)

        var enter = update.enter();

        this.default_set(formatStr,'enter',enter,
            outerRadius,innerRadius)

        var exit = update.exit();
        exit.remove();

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
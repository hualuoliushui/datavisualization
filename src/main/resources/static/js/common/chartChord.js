function ChartChord(svg) {
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
        
        this.set_html = function (htmlStr) {
            this._toolTip.html(htmlStr);
        }

        this.set_opacity = function(opacity){
            this._toolTip
                .style("opacity",opacity);
        }
    }
    var _svg = svg,
        width = +_svg.attr("width"),
        height = +_svg.attr("height"),
        outerRadius = Math.min(width,height)*0.35,
        innerRadius= outerRadius-30,
        _data_value_sum = 0;
        _main_g = null,
        _node_names = [],
        _tool_tip = null;
        _this = this;

    var _formatValue = null,
        _chord = null,
        _arc = null,
        _ribbon = null,
        _color = null;

    this.init = function () {
        _main_g = _svg.append("g").attr("class","chord-main-g")
            .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
        _tool_tip = new ToolTip();
        _formatValue = d3.formatPrefix(",.0",1e3);
        _chord = d3.chord()
            .padAngle(0.05)
            .sortSubgroups(d3.descending);
        _arc = d3.arc()
            .innerRadius(innerRadius)
            .outerRadius(outerRadius);
        _ribbon = d3.ribbon()
            .radius(innerRadius);
        _color = d3.scaleOrdinal(d3.schemeCategory20)
            .range(["#000000", "#FFDD89", "#957244", "#F26223"]);
        _main_g.append("g").attr("class","nodes");
        _main_g.append("g").attr("class", "ribbons");
    }

    this.draw = function(data,formatStr){
        // console.log("chord",data);
        if(!data) return;
        var matrix = getMatrix(data);
        if(!matrix) return;
        _main_g.datum(_chord(matrix));
        var group = _main_g.select("g.nodes").selectAll(".chord-group")
            .data(function (chords) {
                return chords.groups;
            });
        default_exit_set(group);
        default_set_groups(group);
        default_set_groups(group.enter().append("path"));

        var node_text = _main_g.select("g.nodes").selectAll(".node-text")
            .data(function (chords) {
                return chords.groups;
            });
        default_exit_set(node_text);
        default_set_node_text(node_text);
        default_set_node_text(node_text.enter().append("text"));

        var ribbons =_main_g.select("g.ribbons")
            .selectAll(".chord-ribbon")
            .data(function(chords) { return chords; })
        default_exit_set(ribbons);
        default_set_ribbons(ribbons);
        default_set_ribbons(ribbons.enter().append("path"));

        function default_exit_set(update) {
            if(!update)return;
            var exit = update.exit();
            exit.remove();
        }
        function default_set_groups(group) {
            group
                .classed("chord-group",true)
                .style("fill", function(d) { return _color(d.index); })
                .style("stroke", function(d) { return d3.rgb(_color(d.index)).darker(); })
                .attr("d", function (d) {
                    // console.log("d",d);
                    return _arc(d);
                });
            d3.selectAll(".chord-group")
                .on("mouseover",fade(0.0))
                .on("mouseout",fade(1.0));
            function fade(opacity) {
                return function (g, i) {
                    d3.selectAll(".chord-ribbon")
                        .filter(function (d) {
                            // console.log(i,d.source.index,d.target.index);
                            return d.source.index!=i&&d.target.index!=i;
                        })
                        .transition()
                        .style("opacity",opacity);
                }
            }
        }
        function default_set_node_text(node_text) {
            node_text
                .each(function (d,i) {
                    d.angle = (d.startAngle+d.endAngle)/2;
                    d.name = _node_names[i];
                })
                .classed("node-text",true)
                .attr("dy",".35em")
                .attr("transform",function (d) {
                    var result = "rotate(" + (d.angle*180/Math.PI-90)+")";
                    result += "translate("+ (innerRadius+36) + ")";
                    if(d.angle>Math.PI)
                        result+="rotate(180)";
                    return result;
                })
                .style("text-anchor",function (d) {
                    return d.angle > Math.PI ? "end":null;
                })
                .text(function (d) {
                    return d.name;
                })
        }
        function default_set_ribbons(ribbons) {
            function fade(opacity) {
                return function (g, i) {
                    function setTip() {
                        function getHtmlStr(sourceIndex, targetIndex) {
                            var value = matrix[sourceIndex][targetIndex];
                            if(value==0)
                                return "";
                            return formatStr.format(
                                _node_names[sourceIndex],_node_names[targetIndex]
                                ,value
                                ,(value*100).toFixed(1)
                            );
                        }
                        _tool_tip.set_html(getHtmlStr(g.source.index,g.target.index)+"<br/>" +
                            "" + (g.source.index==g.target.index ? "" :getHtmlStr(g.target.index,g.source.index)));
                        _tool_tip.set_opacity(1.0-opacity);
                    }
                    d3.selectAll(".chord-ribbon")
                        .filter(function (d) {
                            return !(d.source.index==g.source.index
                                &&d.target.index==g.target.index);
                        })
                        .transition()
                        .style("opacity",opacity);
                    if(setTip)
                        setTip();
                }
            }
            ribbons
                .classed("chord-ribbon",true)
                .attr("d", _ribbon)
                .style("fill", function(d) { return _color(d.target.index); })
                .style("stroke", function(d) { return d3.rgb(_color(d.target.index)).darker(); })
                .on("mouseover",fade(0.0))
                .on("mousemove",function (d, i) {
                    _tool_tip.mouse_move(d3.event,d,i);
                })
                .on("mouseout",fade(1.0));
        }



        function getMatrix(data) {
            _data_value_sum = 0;
            var temp = [];
            for(var i=0,len=data.keys().length;i<len;i++){
                var key = data.keys()[i];
                var value = data.get(key);
                temp[value["index"]]=value["value"].slice(0);//防止修改原数据
                _node_names[value["index"]]=key;
            }
            // 剔除不存在数据（数据为0）的行和列
            var row_len=temp.length,col_len = row_len ? temp[0].length:0;
            var row_state = [];
            for(var i=0;i<row_len;i++){
                var state = false;
                for(var j=0;j<col_len;j++){
                    state = state || temp[i][j];
                    if(state)
                        break;
                }
                row_state.push(state);
            }
            var col_state = [];
            for(var i=0;i<col_len;i++){
                var state = false;
                for(var j=0;j<row_len;j++){
                    state = state || temp[j][i];
                    if(state)
                        break;
                }
                col_state.push(state);
            }
            var to_delete_indexes = [];
            for(var i=0,len=d3.min([col_state.length,row_state.length]);i<len;i++){
                if(!(row_state[i] || col_state[i]))
                    to_delete_indexes.push(i);
            }
            if(to_delete_indexes.length>0){
                for(var i=0,len=to_delete_indexes.length;i<len;i++){
                    temp.splice(to_delete_indexes[i]-i,1);
                    _node_names.splice(to_delete_indexes[i]-i,1);
                    for(var j=0,jlen=temp.length;j<jlen;j++){
                        temp[j].splice(to_delete_indexes[i]-i,1);
                    }
                }
            }
            for(var i=0,ilen=temp.length;i<ilen;i++){
                for(var j=0,jlen=temp[i].length;j<jlen;j++){
                    if(!temp[i][j] || Number.isNaN(temp[i][j]))
                        continue;
                    _data_value_sum+= +temp[i][j];
                }
            }
            // console.log("temp",temp);
            return temp;
        }
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

    this.init();
}
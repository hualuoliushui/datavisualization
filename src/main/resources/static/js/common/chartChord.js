function ChartChord(svg) {
    var _svg = svg,
        width = +_svg.attr("width"),
        height = +_svg.attr("height"),
        _main_g = _svg.append("g").attr("class","chord-main-g")
            .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")"),
        outerRadius = Math.min(width,height)*0.5-40,
        innerRadius= outerRadius-30,
        _node_names = [];
        _this = this;

    var _formatValue = null,
        _chord = null,
        _arc = null,
        _ribbon = null,
        _color = null;

    this.init = function () {
        _formatValue = d3.formatPrefix(",.0",1e3);
        _chord = d3.chord()
            .padAngle(0.05)
            .sortSubgroups(d3.descending);
        _arc = d3.arc()
            .innerRadius(innerRadius)
            .outerRadius(outerRadius);
        _ribbon = d3.ribbon()
            .radius(innerRadius);
        _color = d3.scaleOrdinal()
            .domain(d3.range(4))
            .range(["#000000", "#FFDD89", "#957244", "#F26223"]);
        _main_g.append("g").attr("class","nodes");
        _main_g.append("g").attr("class", "ribbons");
    }

    this.draw = function(data){
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
                    var result = "rotate(" + (d.angle*180/Math.PI)+")";
                    result += "translate(0,"+ -1.0*(outerRadius+10) + ")";
                    if(d.angle>Math.PI/2
                         && d.angle<Math.PI*3/2
                    )
                        result+="rotate(180)";
                    return result;
                })
                .text(function (d) {
                    return d.name;
                })
        }
        function default_set_ribbons(ribbons) {
            ribbons
                .classed("chord-ribbon",true)
                .attr("d", _ribbon)
                .style("fill", function(d) { return _color(d.target.index); })
                .style("stroke", function(d) { return d3.rgb(_color(d.target.index)).darker(); });
        }



        function getMatrix(data) {
            var temp = [];
            for(var i=0,len=data.keys().length;i<len;i++){
                var key = data.keys()[i];
                var value = data.get(key);
                temp[value["index"]]=value["value"].slice(0);//防止修改原数据
                _node_names[value["index"]]=key;
            }
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
            console.log("temp",temp);
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
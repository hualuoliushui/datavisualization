function ChartTree(svg,width,height) {
    var _svg = svg;
    var _margin = {top: 20, right: 120, bottom: 20, left: 120}
    var _duration_time = 250;

    var _layout = null
        ,_main_g = null
        ,_root = null
        ,_i=0;
    ;

    this.init = function (width,height) {
        _layout = d3.cluster()
            .size([width, height])
        _main_g = _svg.append("g")
            .attr("transform", "translate(" + _margin.left + "," + _margin.top + ")");
    }

    function collapse(d) {
        if (d.children) {
            d._children = d.children;
            d._children.forEach(collapse);
            d.children = null;
        }
    }
    
    function update_nodes(source) {
        var nodes = _layout(_root).descendants();
        var update = _svg.selectAll(".node")
            .data(nodes,function (d) {
                return d.id || (d.id=++_i);
            })
        default_exit_node(update.exit());
        default_enter_node(update.enter());
        default_update_node(update);

        function default_exit_node(ele) {
            ele.transition()
                .duration(_duration_time)
                .attr("transform", function(d) { return "translate(" + source.x + "," + source.y + ")"; })
                .remove();
            // ele.select("circle")
            //     .attr("r", 1e-6);
            // ele.select("text")
            //     .style("fill-opacity", 1e-6);
        }
        function default_enter_node(ele) {
            ele = ele.append("g")
                .classed("node",true)
                .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; })
                .on("click", click);

            ele.append("circle")
                .attr("r", 4)
                .style("fill", function(d) { return d._children ? "#0409ff" : "#ff272a"; });
            ele.append("text")
                .attr("y", function(d) { return d.children || d._children ? -10 : 10; })
                .attr("dy", ".35em")
                .attr("text-anchor", function(d) { return d.children || d._children ? "end" : null; })
                .text(function(d) { return d["data"].name; })
                // .style("fill-opacity", 1e-6);
        }
        function default_update_node(ele) {
            ele = ele.transition()
                .duration(_duration_time)
                .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
            ele.select("circle")
                .attr("r", 4.5)
                .style("fill", function(d) { return d._children ? "#0409ff" : "#ff272a"; });
            ele.select("text")
                .style("fill-opacity", 1);
        }
        // Toggle children on click.
        function click(d) {
            if (d.children) {
                d._children = d.children;
                d.children = null;
            } else {
                d.children = d._children;
                d._children = null;
            }
            update_nodes(d);
        }
    }

    this.draw = function (data) {
        if(!data || !Object.keys(data).length) return;
        _root = d3.hierarchy(data);
        collapse(_root);
        update_nodes(_root);
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
$(function () {
    var width  = 800;
    var height = 525;

    var record_data = {};
    var area_num_data_set = [];
    var area_num_data_map = {};
    var time_num_data_set = [];
    var time_num_data_map = {};
    var chart_pie = null;
    var chart_china_map = null;

    var chart_line = null;
    var record_id=0;
    var data_type=0;
    var chart_type=0;

    function init_chart() {
        chart_pie = new PIE(d3.select("#pie").append("svg").attr("width", width)
            .attr("height", height),width/2,height/2);
        chart_china_map = new ChinaMap(d3.select("#chinaMap").append("svg").attr("width", width)
            .attr("height", height),width,height);
        chart_line = new ChartLine(d3.select("#chartLine").append("svg").attr("width",width)
            .attr("height",height),width,height);
    }

    function getProvince(companyArea){
        if(!companyArea)
            return;
        var pos = (~companyArea.indexOf("内蒙古") || ~companyArea.indexOf("新疆") || ~companyArea.indexOf("广西") || ~companyArea.indexOf("宁夏") || ~companyArea.indexOf("西藏")) && ~companyArea.indexOf("区")
        pos = pos ? pos : ~companyArea.indexOf("台湾") || ~companyArea.indexOf("香港") || ~companyArea.indexOf("澳门")
        pos = pos ? pos : ~companyArea.indexOf("省") || ~companyArea.indexOf("市") || ~companyArea.indexOf("区")
        return companyArea.substr(0,-pos);
    }

    function getCreateYear(createTime) {
        if(!createTime && createTime.length<4)
            return;
        return createTime.substr(0,4);
    }

    var data_types = [
        {
            url: function (record_id) {return "/statistic/getMerchantDetails?recordId=" + record_id;},
            get_area_key: function (companyArea) {
                if(!companyArea) return;
                return [{key:getProvince(companyArea),num:1}];
            },
            area_key_value_des: "companyArea",
            get_time_key: function (createDate) {
                if(!createDate) return;
                return [{key:getCreateYear(createDate),num:1}];
            },
            time_key_value_des: "createDate",
            chart_line_tip: "{0}年商户注册量: {1}",
            sub_title:"商户数量-地域-时间分布"
        }
        ,
        {
            url: function (record_id) {return "/statistic/getGoodTypeDetails?recordId=" + record_id;},
            get_area_key: function (goodTypeDetail) {
                if(!(goodTypeDetail instanceof Object)) return;
                if(!goodTypeDetail["producePlace"]) return;
                var sum = 0;
                for(var i = 0,len = goodTypeDetail["goodDetails"].length;i<len;i++){
                    sum += Number(goodTypeDetail["goodDetails"][i]["goodNumber"])
                }
                return [{key:getProvince(goodTypeDetail["producePlace"]),num:sum}];
            },
            area_key_value_des: null,
            get_time_key: function (goodDetails) {
                if(!(goodDetails instanceof Array)) return null;
                var keys = [];
                for(var i = 0,len = goodDetails.length;i<len;i++){
                    keys.push({key:getCreateYear(goodDetails[i]["produceDate"]),num:Number(goodDetails[i]["goodNumber"])});
                }
                return keys;
            },
            time_key_value_des: "goodDetails",
            chart_line_tip: "{0}年商品生产数量:{1}",
            sub_title:"商品数量-地域-时间分布"
        }
    ]
    function deal_data(data,data_set,data_map,data_pro,deal_data_pro) {
        data.forEach(function (value) {
            var keys = deal_data_pro(data_pro==null ? value : value[data_pro])
            if(!keys) return;
            keys = (keys instanceof Array) ? keys : [keys]
            for(var j=0,len = keys.length;j<len;j++){
                var key = keys[j];
                if(!data_map.hasOwnProperty(key.key)){
                    data_map[key.key]=key.num;
                }else{
                    data_map[key.key]+=key.num;
                }
            }
        });
        for( var key in data_map){
            data_set.push([key,data_map[key]])
        }
        // console.log(data_set)
        // console.log(data_map)
    }

    function deal_area_num_data(data,data_set,data_map,data_type){
        deal_data(data,data_set,data_map,
            data_types[data_type-1].area_key_value_des,
            data_types[data_type-1].get_area_key);
    }
    
    function deal_time_num_data(data,data_set,data_map,data_type) {
        deal_data(data,data_set,data_map,
            data_types[data_type-1].time_key_value_des,
            data_types[data_type-1].get_time_key);
    }

    function draw_pie() {
        chart_pie.convertData(area_num_data_set)
        chart_pie.draw("{0} <br/> {1}({2})");
    }
    
    function draw_china() {
        chart_china_map.draw(area_num_data_set,area_num_data_map,"{0} <br/> {1}");
    }

    function draw_line() {
        chart_line.draw(time_num_data_set,time_num_data_map,data_types[data_type-1].chart_line_tip);
    }

    function init_data(record_id, data_type){
        if(!record_id)
            return;
        var url = data_types[data_type-1].url(record_id);
        if(record_data.hasOwnProperty(url))
            return work(record_data[url]);
        d3.json(url,function (error, response) {
            if(error)
                return console.log(error)
            console.log(response);
            work(response.data);
            record_data[url]=response.data;
        })
    }

    function work(data){
        area_num_data_set = [];
        area_num_data_map = {};
        deal_area_num_data(data,area_num_data_set,area_num_data_map,data_type);
        time_num_data_set = [];
        time_num_data_map = {};
        deal_time_num_data(data,time_num_data_set,time_num_data_map,data_type);
        draw_pie();
        draw_china();
        draw_line();
        change_chart_show(chart_type);
    }

    function change_chart_show(type) {
        if(!type)
            return;
        chart_china_map.hide();
        chart_pie.hide();
        chart_line.hide();
        // type = 3;
        switch(type){
            case 1:
                chart_china_map.show();
                break;
            case 2:
                chart_pie.show();
                break;
            case 3:
                chart_line.show();
                break;
            default:
                console.log("error type"+type);
                break;
        }
    }
    
    function set_sub_title(data_type) {
        if(!data_type)
            return;
        $("#sub-title").text(data_types[data_type-1].sub_title)
    }

    function set_change_data_type_callback(){
        $(".data_type").click(function () {
            var next_type = Number($(this).attr("value"));
            if(next_type == data_type)
                return;
            data_type = next_type;
            d3.selectAll(".data_type").classed("active",false);
            d3.select(this).classed("active",true);
            set_sub_title(data_type);
            init_data(record_id,data_type);
        });
    }

    
    function set_change_chart_callback() {
        $("#chart_type").change(function () {
            var next_type = Number($(this).val());
            if(next_type==chart_type)
                return;
            chart_type = next_type;
            change_chart_show(chart_type);
        });
    }
    
    function set_change_record_callback() {
        $("#record").change(function () {
            record_id = Number($(this).val());
            if(!record_id)
                return;
            init_data(record_id,data_type);
        })
    }
    
    function getDefaultStyle(obj, attribute) { // typeof obj == "Element"
        return obj.currentStyle ? obj.currentStyle[attribute] : document.defaultView.getComputedStyle(obj)[attribute];
    }
    
    function d3EleTodocumentEleById(ele) {
        return $("#"+ele.attr("id"))[0];
    }

    function setStyleFromCSS(ele_doc) { // ele
        console.log(ele_doc);
        var styles = ["width","height","position","font-family","font-size","text-align"
            ,"color","background-color","border-width","border-radius","content","bottom"
            ,"left","margin-left","border-top","border-bottom","border-right","border-left"
            ,"stroke","stroke-width","fill","pointer-events","opacity","shape-rendering"]
        for(var i=0,len=styles.length;i<len;i++){
            ele_doc.style[styles[i]]=getDefaultStyle(ele_doc,styles[i]);
        }
        var children = ele_doc.children;
        for(var i=0,len=children.length;i<len;i++){
            setStyleFromCSS(children[i]);
        }
    }
    
    function svgToPng(svg, pngWidth, pngHeight) {
        var serializer = new XMLSerializer();
        var source = '<?xml version="1.0" standalone="no"?>\r\n'+serializer.serializeToString(svg.node());
        var image = new Image;
        image.src = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(source);
        var canvas = document.createElement("canvas");
        canvas.width = pngWidth;
        canvas.height = pngHeight;
        var context = canvas.getContext("2d");
        context.fillStyle = '#fff';//设置保存后的PNG 是白色的
        context.fillRect(0,0,10000,10000);
        context.drawImage(image, 0, 0);
        return canvas.toDataURL("image/png");
    }

    function getCurSvg() {
        var svg_doc = null,
            svg = null;
        switch(chart_type){
            case 1:
                svg = chart_china_map.svg();
                svg_doc = $("#chinaMap").children()[0];
                break;
            case 2:
                svg = chart_pie.svg();
                svg_doc = $("#pie").children()[0];
                break;
            case 3:
                svg = chart_line.svg();
                svg_doc = $("#chartLine").children()[0];
                break;
            default:
                break;
        }
        return [svg_doc,svg];
    }

    function set_save_svg_callback() {
        $('#export_chart').click(function (event) {
            var [svg_doc,svg] = getCurSvg();
            console.log(svg_doc);
            setStyleFromCSS(svg_doc);
            var url = svgToPng(svg,width,height);
            var pngName = "svgToPng";
            var a = document.createElement("a");
            a.download=pngName+".png";
            a.href=url;
            a.click();
        })

        
    }
    
    function init() {
        Util();
        record_id = Number($("#record").val());
        data_type = Number($(".data_type.active").attr("value"));
        chart_type = Number($("#chart_type").val());
        set_sub_title(data_type);
        init_chart();
        init_data(record_id,data_type);
        set_change_record_callback();
        set_change_data_type_callback();
        set_change_chart_callback();
        set_save_svg_callback();
    }

    init();
});
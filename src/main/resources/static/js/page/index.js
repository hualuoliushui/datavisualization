$(function () {
    var width = 800;
    var height = 525;

    var data_cache = {};
    var data_cache_state = {
        init:0
        ,working:1
        ,complete:2
    }

    var chart_pie = null;
    var chart_china_map = null;
    var chart_line = null;
    var chart_chord = null;

    var record_id = 0;
    var data_type = 0;
    var chart_type = 0;

    var good_type_select = null,
        start_point_select = null,
        end_point_select = null,
        year_select = null;

    function request(url) {
        return new Promise(function (resolve, reject) {

            d3.json(url, function (error, response) {
                if (error)
                    reject(error);
                else {
                    resolve(response);
                }
            })
        })
    }

    // 显示操作状态信息
    function deal_msg(obj, type) {
        type = type || "warn"
        var msg = '';
        switch (type) {
            case 'result':
                msg = obj.msg;
                break;
            case 'error':
                msg = "错误:"+obj;
                break;
            case 'success':
                msg = "成功:"+obj;
                break;
            case 'warn':
                msg = "注意:"+obj;
            default:
                msg = obj;
                break;
        }
        d3.select("#msg").text(msg);
    }

    var chart_types_descrip = [{value:1,text:"中国地图",group:d3.set([1,2,3])}
    , {value:2,text:"饼图",group:d3.set([1,2])}
    , {value:3,text:"折线图",group:d3.set([1,2])}
    , {value:4,text:"弦图",group:d3.set([3])}
    ];

    var china_flow_description = new (function () {
        var _this = this;
        this.multi_select_options = {
            good_type: [],
            start_point: [],
            end_point: [],
            year: []
        };
        this.option_selected_values = {
            good_type: d3.set(),
            start_point: d3.set(),
            end_point: d3.set(),
            year: d3.set()
        };

        function update_china_flow_chart() {
            china_flow_description["update_data"]();
            draw_china_flow();
            draw_chord();
        }

        function select_all(type) {

            _this["option_selected_values"][type] = d3.set(_this["multi_select_options"][type]);
            update_china_flow_chart()
        }

        function deselect_all(type) {
            _this["option_selected_values"][type] = d3.set();
            update_china_flow_chart()
        }

        this.on_select_all = {
            good_type: function () {
                select_all("good_type");
            },
            start_point: function () {
                select_all("start_point");
            },
            end_point: function () {
                select_all("end_point");
            },
            year: function () {
                select_all("year");
            }
        };
        this.on_deselect_all = {
            good_type: function () {
                deselect_all("good_type");
            },
            start_point: function () {
                deselect_all("start_point");
            },
            end_point: function () {
                deselect_all("end_point");
            },
            year: function () {
                deselect_all("year");
            }
        };

        function change(option_val, checked, type) {
            if (checked) {
                _this["option_selected_values"][type].add(option_val);
            } else {
                _this["option_selected_values"][type].remove(option_val);
            }
            update_china_flow_chart()
        }

        this.on_change = {
            good_type: function (option, checked) {

                change(option.val(), checked, "good_type");
            },
            start_point: function (option, checked) {

                change(option.val(), checked, "start_point");
            },
            end_point: function (option, checked) {

                change(option.val(), checked, "end_point");
            },
            year: function (option, checked) {

                change(option.val(), checked, "year");
            }
        }
        var _data = d3.map();
        var _show_data = null;
        var _chord_show_data = null;
        this.set_data = function (data) {
            _data = data;
        }
        this.get_data = function () {
            return _data;
        }
        this.update_data = function () {
            if(!_data)
                _data=d3.map();
            _show_data = [];
            _data.each(function (value, start_point) {
                if (!china_flow_description["option_selected_values"]["start_point"].has(start_point))
                    return;
                value.each(function (value, end_point) {
                    if (!china_flow_description["option_selected_values"]["end_point"].has(end_point))
                        return;
                    let goodType_year_num = {};
                    let sum = 0;
                    let temp = 0;
                    value.each(function (value, good_type) {
                        if (!china_flow_description["option_selected_values"]["good_type"].has(good_type))
                            return;
                        let year_num_map = d3.map();
                        if (value && value.length) {
                            for (let i = 0, len = value.length; i < len; i++) {
                                value[i]["goodDetails"].each(function (value, year) {
                                    if (!china_flow_description["option_selected_values"]["year"].has(year))
                                        return;
                                    temp = Number(value["goodNumber"]);
                                    if (isNaN(temp)) return;
                                    if (year_num_map.has(year))
                                        year_num_map.set(year, year_num_map.get(year) + temp)
                                    else
                                        year_num_map.set(year, temp);
                                    sum += temp;
                                })
                            }
                        }
                        var year_num = [];
                        year_num_map.each(function (value, key) {
                            year_num.push([key, value]);
                        })
                        if (year_num.length) {
                            year_num.sort(function (a, b) {
                                return Number(a[0]) > Number(b[0]);
                            })
                            goodType_year_num[good_type] = year_num;
                        }
                    })
                    if (sum > 0)
                        _show_data.push([[start_point, end_point], goodType_year_num, sum]);
                });
            })
            _this.update_chord_data(_show_data);
        }
        this.update_chord_data = function (show_data) {
            if(!show_data && !provinces_coordinates) return;
            var temp = d3.map(),
                index = 0,
                i = 0,
                len = Object.keys(provinces_coordinates).length;
            for(var key in provinces_coordinates){
                temp.set(key,{index:index++,value:Array(...Array(len)).map((_) => 0)});
            }
            for(i=0,len=show_data.length;i<len;i++){
                var start = show_data[i][0][0];
                var end = show_data[i][0][1];
                var sum = show_data[i][2];
                temp.get(start)["value"][temp.get(end)["index"]]=sum;
            }
            _chord_show_data = temp;
        }
        this.get_show_data = function () {
            return _show_data;
        }
        this.get_chord_show_data = function () {
            return _chord_show_data;
        }
    })();

    function init_multi_select(ele, str, type) {
        str = str || "请选择"
        ele.multiselect({
            nonSelectedText: str
            , buttonText: function (options, select) {
                return str;
            }
            , includeSelectAllOption: true
            , enableFiltering: true
            , disableIfEmpty: true
            , selectAllText: "全选"
            , selectAllValue: 0
            // , numberDisplayed:1
            , maxHeight: 200
            , onChange: china_flow_description["on_change"][type]
            , onSelectAll: china_flow_description["on_select_all"][type]
            , onDeselectAll: china_flow_description["on_deselect_all"][type]
            // , inheritClass:true
        })
        ele.multiselect('selectAll', false);
        ele.multiselect('updateButtonText', false)
        china_flow_description["on_select_all"][type]();
    }

    function init_filter_select() {
        good_type_select = $("#good_type")
        start_point_select = $("#start_point");
        end_point_select = $("#end_point");
        year_select = $("#year");

        init_multi_select(good_type_select, null, "good_type");
        init_multi_select(start_point_select, null, "start_point");
        init_multi_select(end_point_select, null, "end_point");
        init_multi_select(year_select, null, "year");
    }

    function update_filter_select(data) {
        function update_multi_select(ele, d3_set, str, type) {
            ele.html("");
            var temp = [];
            d3_set.each(function (value) {
                temp.push(value);
            })
            // 按拼音首字母排序
            temp.sort((a, b) => a.localeCompare(b, 'zh-Hans-CN', {sensitivity: 'accent'}));
            for (var i = 0, len = temp.length; i < len; i++) {
                var value = temp[i];
                ele.append($('<option></option>').text(value).val(value));
            }
            china_flow_description["multi_select_options"][type] = temp;
            init_multi_select(ele.multiselect("destroy"), str, type);
        }

        var good_type_set = d3.set(),
            start_point_set = d3.set(),
            end_point_set = d3.set(),
            year_set = d3.set();

        data.each(function (value, key) {
            start_point_set.add(key);
            value.each(function (value, key) {
                end_point_set.add(key);
                value.each(function (value, key) {
                    good_type_set.add(key);
                    if (value) {
                        for (var i = 0, len = value.length; i < len; i++) {
                            value[i]["goodDetails"].each(function (value, key) {
                                year_set.add(key);
                            })
                        }

                    }
                })
            })
        })

        update_multi_select(good_type_select, good_type_set, "商品种类", "good_type");
        update_multi_select(start_point_select, start_point_set, "生产地", "start_point");
        update_multi_select(end_point_select, end_point_set, "销售地", "end_point");
        update_multi_select(year_select, year_set, "生产年份", "year");
    }

    function init_chart(china_json) {
        chart_pie = new PIE(d3.select("#pie").append("svg").attr("width", width)
            .attr("height", height), width / 2, height / 2);
        chart_china_map = new ChinaMap(d3.select("#chinaMap").append("svg").attr("width", width)
            .attr("height", height), width, height);
        chart_line = new ChartLine(d3.select("#chartLine").append("svg").attr("width", width)
            .attr("height", height), width, height);
        chart_chord = new ChartChord(d3.select("#chartChord").append("svg").attr("width",width)
            .attr("height",height));
        chart_china_map.init(china_json);
    }

    function getProvince(companyArea) {
        if (!companyArea)
            return;
        var pos = (~companyArea.indexOf("内蒙古") || ~companyArea.indexOf("新疆") || ~companyArea.indexOf("广西") || ~companyArea.indexOf("宁夏") || ~companyArea.indexOf("西藏")) && ~companyArea.indexOf("区")
        pos = pos ? pos : ~companyArea.indexOf("台湾") || ~companyArea.indexOf("香港") || ~companyArea.indexOf("澳门")
        pos = pos ? pos : ~companyArea.indexOf("省") || ~companyArea.indexOf("市") || ~companyArea.indexOf("区")
        return companyArea.substr(0, -pos);
    }

    function getCreateYear(createTime) {
        if (!createTime && createTime.length < 4)
            return;
        return createTime.substr(0, 4);
    }

    var data_types_description_indexes = [1, 2]

    var data_types_description = {
        1: {
            data_type: 1,
            area_arr: [],
            area_map: {},
            time_arr: [],
            time_map: {},
            get_area_key: function (companyArea) {
                if (!companyArea) return;
                return [{key: getProvince(companyArea), num: 1}];
            },
            area_key_value_des: "companyArea",
            get_time_key: function (createDate) {
                if (!createDate) return;
                return [{key: getCreateYear(createDate), num: 1}];
            },
            time_key_value_des: "createDate",
            chart_line_tip: "{0}年商户注册量: {1}",
            chart_line_title: {xAxis: "年份", yAxis: "当年注册商户人数"},
            sub_title: "商户数量-地域-时间分布"
        },
        2: {
            data_type: 2,
            area_arr: [],
            area_map: {},
            time_arr: [],
            time_map: {},
            get_area_key: function (goodTypeDetail) {
                if(!goodTypeDetail) return;
                if (!(goodTypeDetail instanceof Object)) return;
                if (!goodTypeDetail["producePlace"]) return;
                var sum = 0;
                if(goodTypeDetail["goodDetails"] instanceof Array){
                    for (var i = 0, len = goodTypeDetail["goodDetails"].length; i < len; i++) {
                        sum += Number(goodTypeDetail["goodDetails"][i]["goodNumber"])
                    }
                }else{
                    goodTypeDetail["goodDetails"].each(function (value, key) {
                        sum += Number(value["goodNumber"]);
                    })
                }
                return [{key: getProvince(goodTypeDetail["producePlace"]), num: sum}];
            },
            area_key_value_des: null,
            get_time_key: function (goodDetails) {
                if(!goodDetails) return;
                var keys = [];
                if (goodDetails instanceof Array) {
                    for (var i = 0, len = goodDetails.length; i < len; i++) {
                        keys.push({
                            key: getCreateYear(goodDetails[i]["produceDate"]),
                            num: Number(goodDetails[i]["goodNumber"])
                        });
                    }
                }else{
                    goodDetails.each(function (value, key) {
                        console.log("get_time_key",value,key);
                        keys.push({
                            key: getCreateYear(value["produceDate"]),
                            num: Number(value["goodNumber"])
                        })
                    })
                }
                return keys;
            },
            time_key_value_des: "goodDetails",
            chart_line_tip: "{0}年商品生产数量:{1}",
            chart_line_title: {xAxis: "年份", yAxis: "当年生产商品数"},
            sub_title: "商品数量-地域-时间分布"
        }
    }

    function deal_data(data, data_set, data_map, data_pro, deal_data_pro) {
        data.forEach(function (value) {
            var keys = deal_data_pro(data_pro == null ? value : value[data_pro])
            if (!keys) return;
            keys = (keys instanceof Array) ? keys : [keys]
            for (var j = 0, len = keys.length; j < len; j++) {
                var key = keys[j];
                if (!data_map.hasOwnProperty(key.key)) {
                    data_map[key.key] = key.num;
                } else {
                    data_map[key.key] += key.num;
                }
            }
        });
        for (var key in data_map) {
            data_set.push([key, data_map[key]])
        }
    }

    function deal_area_num_data(data, data_type_obj) {
        data_type_obj.area_arr=[];
        deal_data(data, data_type_obj.area_arr, data_type_obj.area_map,
            data_type_obj.area_key_value_des,
            data_type_obj.get_area_key);
    }

    function deal_time_num_data(data, data_type_obj) {
        data_type_obj.time_arr=[];
        deal_data(data, data_type_obj.time_arr, data_type_obj.time_map,
            data_type_obj.time_key_value_des,
            data_type_obj.get_time_key);
    }

    function draw_pie(data_type) {
        chart_pie.convertData(data_types_description[data_type].area_arr)
        chart_pie.draw("{0} <br/> {1}({2})");
    }

    function draw_china_flow() {
        if (!chart_china_map) return;
        chart_china_map.draw(china_flow_description["get_show_data"](), null, "<h4>生产地:</h4>{0}<br/><h4>销售地：</h4>{1}<br/><h4>商品：</h4>{2}", "flow")
    }
    
    function draw_chord() {
        if(!chart_chord) return;
        chart_chord.draw(china_flow_description["get_chord_show_data"]())
    }

    function draw_china(data_type) {
        chart_china_map.draw(data_types_description[data_type].area_arr,
            data_types_description[data_type].area_map, "{0} <br/> {1}");
    }

    function draw_line(data_type) {
        chart_line.draw(data_types_description[data_type].time_arr
            , data_types_description[data_type].time_map
            , data_types_description[data_type].chart_line_tip,
            data_types_description[data_type].chart_line_title);
    }

    function disable_record_select() {
        d3.select("#record").attr("disabled","");
    }

    function enable_record_select() {
        d3.select("#record").attr("disabled",null);
    }

    function make_sure_data_cache(recordId) {
        if (!data_cache.hasOwnProperty(recordId) || !data_cache[recordId]){
            data_cache[recordId] = {
                record_id:recordId
                ,state:data_cache_state.init
                ,nextState:data_cache_state.init
                ,total:0
                ,limit:10
                ,offset:0
                ,data:[]
            }
        }
    }

    function getNumOfDataUrl(recordId) {
        make_sure_data_cache(recordId);
        return "/statistic/getNumOfData?recordId=" + recordId;
    }

    function getDataUrl(recordId) {
        make_sure_data_cache(recordId);
        return "/statistic/getData?recordId=" + recordId + "" +
            "&limit="+data_cache[recordId]["limit"] +"" +
            "&offset="+data_cache[recordId]["offset"];
    }

    function get_data_cache_state(recordId) {
        make_sure_data_cache(recordId);
        return [data_cache[recordId]["state"],data_cache[recordId]["nextState"]];
    }

    function update_data_cache_total(recordId,total) {
        if(Number.isNaN(+total))
            return false;
        make_sure_data_cache(recordId);
        data_cache[recordId]["total"]= +total;
        return true;
    }

    function update_data_cache(recordId,data_detail) {
        make_sure_data_cache(recordId);
        if(data_cache[recordId]["offset"]==data_detail["offset"]){
            data_cache[recordId]["data"]=data_cache[recordId]["data"].concat(data_detail["data"])
            data_cache[recordId]["offset"]+=data_detail["limit"];
            if(data_cache[recordId]["offset"]==data_cache[recordId]["total"])
                update_data_cache_state(recordId,data_cache_state.complete);
            return true;
        }else
            return false;
    }

    function update_data_cache_state(recordId, next_state) {
        make_sure_data_cache(recordId);
        if(next_state==data_cache_state.init){
            data_cache[recordId]=null;
            make_sure_data_cache(recordId);
        }
        data_cache[recordId]["state"]=data_cache[recordId]["nextState"];
        data_cache[recordId]["nextState"]=next_state;
    }

    function init_data(recordId) {
        if (!recordId)
            return;
        work(recordId);
    }


    function work(recordId) {
        var [state,nextState] = get_data_cache_state(recordId);
        console.log("recordId:"+recordId,state,nextState);
        if(state==nextState && state==data_cache_state.complete){
            deal_msg("更新视图数据中");
            empty_data();
            work_with_data(recordId,data_cache[recordId]["data"]);
            deal_msg("更新视图数据完毕");
            return;
        }
        switch(nextState){
            case data_cache_state.init:
                request_data_init(recordId);
                break;
            case data_cache_state.working:
                // setTimeout(request_data_working,2000,recordId);
                request_data_working(recordId);
                break;
            case data_cache_state.complete:
                request_data_complete(recordId);
                break;
            default:
                break;
        }
    }

    function empty_data() {
        for(var i=0,len=data_types_description_indexes.length;i<len;i++){
            data_types_description[data_types_description_indexes[i]].area_arr=[];
            data_types_description[data_types_description_indexes[i]].area_map={};
            data_types_description[data_types_description_indexes[i]].time_arr=[];
            data_types_description[data_types_description_indexes[i]].time_map={};
        }
        china_flow_description["set_data"](d3.map());
    }

    function request_data_init(recordId) {
        disable_record_select();
        deal_msg("初始化数据加载");
        empty_data();
        var url = getNumOfDataUrl(recordId);
        request(url)
            .then(function (value) {
                if (value.errCode != 0) {
                    deal_msg(value, 'result');
                    return;
                }
                var total = +value.data
                if(!update_data_cache_total(recordId,total)){
                    deal_msg("初始化加载数据出错",'error');
                    return;
                }
                update_data_cache_state(recordId,data_cache_state.working);
                work(recordId);
            }, function (reason) {
                deal_msg(reason, 'error');
            })
    }

    function request_data_working(recordId) {
        deal_msg("数据加载中");
        var url = getDataUrl(recordId);
        request(url)
            .then(function (value) {
                if (value.errCode != 0) {
                    deal_msg(value, 'result');
                    return;
                }
                console.log(value);
                update_data_cache_state(recordId,data_cache_state.working);
                if(value["data"] && update_data_cache(recordId,value["data"])){
                    work_with_data(recordId,value.data["data"]);
                    work(recordId);
                }
            }, function (reason) {
                deal_msg(reason, 'error');
            })
    }

    function request_data_complete(recordId) {
        update_data_cache_state(recordId,data_cache_state.complete);
        enable_record_select();
        deal_msg("数据加载完毕");
    }

    function work_with_data(recordId,data){
        var merchant_detail = [];
        var good_type_detail = [];
        for(var i=0,len=data.length;i<len;i++){
            good_type_detail=good_type_detail.concat(data[i]["goodTypeDetails"]);
        }
        merchant_detail=merchant_detail.concat(data);
        var detail = [merchant_detail,good_type_detail];
        for (var i = 0, len = data_types_description_indexes.length; i < len; i++) {
            deal_area_num_data(detail[i], data_types_description[data_types_description_indexes[i]]);
            deal_time_num_data(detail[i], data_types_description[data_types_description_indexes[i]]);
        }
        deal_All_data(recordId);
        draw(data_type);
        change_chart_show(chart_type);
    }

    function deal_All_data(recordId) {
        make_sure_data_cache(recordId);
        var data = data_cache[recordId]["data"];
        var merchants = [];
        var goodTypes = [];
        for(var i=0,len=data.length;i<len;i++){
            goodTypes=goodTypes.concat(data[i]["goodTypeDetails"]);
        }
        merchants=merchants.concat(data);
        var merchants_map = d3.map(merchants, function (d) {
            return d.merchantId;
        });
        for (var i = 0, len = goodTypes.length; i < len; i++) {
            goodTypes[i]["goodDetails"] = d3.map(goodTypes[i]["goodDetails"], function (d) {
                return getCreateYear(d["produceDate"]);
            });
        }
        var temp_map = d3.nest()
            .key(function (d) {
                return getProvince(d["producePlace"]);
            })
            .key(function (d) {
                return getProvince(merchants_map.get(d["merchantId"])["companyArea"]);
            })
            .key(function (d) {
                return d["typeName"]
            })
            .map(goodTypes, d3.map);
        china_flow_description["set_data"](temp_map);
        update_filter_select(temp_map);
        china_flow_description["update_data"]();
    }

    function show_filter_select() {
        $("#good_type_div").show();
        $("#start_point_div").show();
        $("#end_point_div").show();
        $("#year_div").show();
    }

    function hide_filter_select() {
        $("#good_type_div").hide();
        $("#start_point_div").hide();
        $("#end_point_div").hide();
        $("#year_div").hide();
    }

    function draw(data_type) {
        update_chart_type_select(data_type);
        if (!~data_types_description_indexes.indexOf(data_type))// 非常规数据类型，默认设为数据合并类型处理
        {
            show_filter_select();
            set_sub_title(data_type, "商品流向")
            draw_china_flow();
            draw_chord();
        }
        else {
            hide_filter_select();
            set_sub_title(data_type);
            draw_pie(data_type);
            draw_china(data_type);
            draw_line(data_type);
        }
    }

    function change_chart_show(type) {
        if (!type)
            return;
        chart_china_map.hide();
        chart_pie.hide();
        chart_line.hide();
        chart_chord.hide();
        switch (type) {
            case 1:
                chart_china_map.show();
                break;
            case 2:
                chart_pie.show();
                break;
            case 3:
                chart_line.show();
                break;
            case 4:
                chart_chord.show();
                break;
            default:
                break;
        }
    }

    function set_sub_title(data_type, str) {
        if (!data_type)
            return;
        $("#sub-title").text(str || data_types_description[data_type].sub_title)
    }

    function set_change_data_type_callback() {
        $(".data_type").click(function () {
            var next_type = Number($(this).attr("value"));
            if (next_type == data_type)
                return;
            data_type = next_type;
            d3.selectAll(".data_type").classed("active", false);
            d3.select(this).classed("active", true);
            draw(data_type);
            change_chart_show(chart_type);
        });
    }


    function set_change_chart_callback() {
        $("#chart_type").change(function () {
            var next_type = Number($(this).val());
            if (next_type == chart_type)
                return;
            chart_type = next_type;
            change_chart_show(chart_type);
        });
    }

    function set_change_record_callback() {
        $("#record").change(function () {
            record_id = Number($(this).val());
            if (!record_id)
                return;
            init_data(record_id, data_type);
        })
    }

    function getDefaultStyle(obj, attribute) { // typeof obj == "Element"
        return obj.currentStyle ? obj.currentStyle[attribute] : document.defaultView.getComputedStyle(obj)[attribute];
    }

    function setStyleFromCSS(ele_doc) { // ele
        var styles = ["width", "height", "position", "font-family", "font-size", "text-align"
            , "color", "background-color", "border-width", "border-radius", "content", "bottom"
            , "left", "margin-left", "border-top", "border-bottom", "border-right", "border-left"
            , "stroke", "stroke-width", "fill", "pointer-events", "opacity", "shape-rendering"]
        for (var i = 0, len = styles.length; i < len; i++) {
            ele_doc.style[styles[i]] = getDefaultStyle(ele_doc, styles[i]);
        }
        var children = ele_doc.children;
        for (var i = 0, len = children.length; i < len; i++) {
            setStyleFromCSS(children[i]);
        }
    }

    function getCurSvg() {
            var svg = null;
        switch (chart_type) {
            case 1:
                svg = chart_china_map.svg();
                break;
            case 2:
                svg = chart_pie.svg();
                break;
            case 3:
                svg = chart_line.svg();
                break;
            default:
                break;
        }
        return svg;
    }

    function set_save_svg_callback() {
        $('#export_chart').click(function (event) {
            var svg = getCurSvg();
            setStyleFromCSS(svg.node());
            saveSvgAsPng(svg.node(), "chart.png");
        })
    }
    
    function init_chart_type_select(data_type) {
        data_type = data_type || 1;
        update_chart_type_select(data_type);
    }

    function update_chart_type_select(data_type) {
        function default_set(ele) {
            ele.attr("value",function (d) {
                return d["value"];
            })
                .text(function (d) {
                    return d["text"];
                })
        }
        var temp = [];
        var isIncludingCur = false;
        for(var i=0,len=chart_types_descrip.length;i<len;i++){
            if(chart_types_descrip[i]["group"].has(data_type)){
                temp.push(chart_types_descrip[i]);
                if(chart_types_descrip[i]["value"]==chart_type){
                    isIncludingCur = true;
                }
            }
        }

        temp.sort(function (a,b) { return a["value"]-b["value"]; });
        var update = d3.select("#chart_type").selectAll("option")
            .data(temp)
        var enter = update.enter();
        var exit = update.exit();
        default_set(update);
        default_set(enter.append("option"));
        exit.remove();
        if(!isIncludingCur && temp.length>0){
            chart_type=temp[0]["value"];
            $("#chart_type").val(chart_type);
        }
    }


    function init() {
        record_id = Number($("#record").val());
        data_type = Number($(".data_type.active").attr("value"));
        init_chart_type_select();
        chart_type = Number($("#chart_type").val());
        hide_filter_select();
        set_sub_title(data_type);
        set_change_record_callback();
        set_change_data_type_callback();
        set_change_chart_callback();
        set_save_svg_callback();
        init_filter_select();
        var url = "/json/china.json";
        request(url)
            .then(function (value) {
                init_chart(value);
                init_data(record_id, data_type);
            }, function (reason) {
                deal_msg(reason, 'error');
            })
    }

    init();
});
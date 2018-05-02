(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
        typeof define === 'function' && define.amd ? define(['exports'], factory) :
            (factory((global.util = global.util || {})));
}(this, (function (exports) {
    'use strict';
    String.prototype.format = function(){
        var args = arguments;
        // console.log("args",args);
        return this.replace(/\{(\d+)\}/g,
            function(m,i){
                return args[i];
            });
    }
    // console.log("test,{0}".format("hello world"))

    function isContain(arr, item,compare) {
        compare = compare || function (x, y) {
            if(x==y) return true;
            else return false;
        }
        for(var i=0,len=arr.length;i<len;i++){
            if(compare(arr[i],item))
                return true;
        }
        return false;
    }

    function removeItem(arr, proc,item,compare) {
        compare = compare || function (x, y) {
            if(x==y) return true;
            else return false;
        }
        var temp = [];
        if(proc){
            for(var i=0,len=arr.length;i<len;i++){
                if(!compare(arr[i][proc],item))
                    temp.push(arr[i]);
            }
        }else{
            for(var i=0,len=arr.length;i<len;i++){
                if(!compare(arr[i],item))
                    temp.push(arr[i]);
            }
        }

        return temp;
    }
    function ShowDetailModal(div, id) {
        var _id = null,
            _header_title = null,
            _header_close_btn = null,
            _body_div = null,
            _footer_div = null;

        this.getId = function () {
            return _id;
        }

        this.setHeaderTitle = function(str){
            if(!_header_title)return;
            _header_title.text(str);
        }

        this.getBodyDiv = function () {
            return _body_div;
        }

        function init() {
            if(!div)return;
            _id = id || "showDetailModal";
            div.attr("class","modal fade")
                .attr("id",id)
                .attr("tabindex",-1)
                .attr("role","dialog")
                .attr("ara-labelledby","tipModalLabel")
                .attr("aria-hidden",true)
            var dialog_div = div.append("div")
                .attr("class","modal-dialog")

            var content_div = dialog_div.append("div")
                .attr("class","modal-content")

            var header_div = content_div.append("div")
                .attr("class","modal-header")
            _header_title = header_div.append("h4")
                .attr("class","modal-title")
                .attr("id","tipModalLabel")
            // _header_close_btn = header_div.append("button")
            //     .attr("type","button")
            //     .attr("class","close")
            //     .attr("data-dismiss","modal")
            //     .attr("aria-hidden",true)

            _body_div = content_div.append("div")
                .attr("class","modal-body")

            // _footer_div = content_div.append("div")
            //     .attr("class","modal-footer")
            // var footer_close_btn = header_div.append("button")
            //     .attr("type","button")
            //     .attr("class","btn btn-default")
            //     .attr("data-dismiss","modal")
            //     .text("关闭")
        }

        init();
    }

    function map2Object(map) {
        let obj = Object.create(null);
        for(let[k,v] of map){
            obj[k]=v;
        }
        return obj;
    }

    function object2Map(obj) {
        let map = new Map();
        for(let k of Object.keys(obj)){
            map.set(k,obj[k]);
        }
        return map;
    }

    exports.object2Map = object2Map;
    exports.map2Object = map2Object;
    exports.isContain = isContain;
    exports.removeItem = removeItem;
    exports.ShowDetailModal = ShowDetailModal;
    Object.defineProperty(exports, '__esModule', { value: true });
})));

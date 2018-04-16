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
    exports.isContain = isContain;
    exports.removeItem = removeItem;
    Object.defineProperty(exports, '__esModule', { value: true });
})));

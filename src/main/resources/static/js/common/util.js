function Util() {
    String.prototype.format = function(){
        var args = arguments;
        return this.replace(/\{(\d+)\}/g,
            function(m,i){
                return args[i];
            });
    }
    // console.log("test,{0}".format("hello world"))
}
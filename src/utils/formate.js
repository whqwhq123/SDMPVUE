export const formate=function(number){
    //shijianchuo是整数，否则要parseInt转换
    var time = new Date(number);
    var y = time.getFullYear();
    var m = time.getMonth()+1;
    var d = time.getDate();
    var h = time.getHours();
    var mm = time.getMinutes();
    var s = time.getSeconds();
    return y+'-'+add0(m)+'-'+add0(d)+' '+add0(h)+':'+add0(mm)+':'+add0(s);
}
export const formatenyr=function(number){
    //shijianchuo是整数，否则要parseInt转换
    var time = new Date(number);
    var y = time.getFullYear();
    var m = time.getMonth()+1;
    var d = time.getDate();
    var h = time.getHours();
    var mm = time.getMinutes();
    var s = time.getSeconds();
    return y+'-'+add0(m)+'-'+add0(d)+' '+add0(h)+':'+add0(mm);
}
function add0(m){return m<10?'0'+m:m }
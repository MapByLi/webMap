/**
 * Created by lyh on 2018/5/21.
 */


var start_point = new BMap.Point(110.404, 35.915);// 创建点坐标
var _properties=new Array("province","city","district");
var flag=0;//计数器

//点击下钻，右键返回
//下钻回调函数
function drill(e) {
    if((0<=flag)&&(flag<3)){
        var point=e.point;
        var coder=new BMap.Geocoder();
        coder.getLocation(point,function (rs) {
            var name=rs.addressComponents[_properties[flag]];//获得点击的点的行政区划名字
            var province=rs.addressComponents.province;
            var city=rs.addressComponents.city;
            console.log("这一块是："+name)
            console.log(rs.addressComponents)
            bm.clearOverlays();
            addPly_(name,province,city) ;               //调用colors.js中的添加覆盖物函数
            //调整视野和zoom
            bm.setCenter(name);
            var zoom=bm.getZoom()+2;
            bm.setZoom(zoom);
            flag=flag+1;               //计数器+1，表示下钻到下一层
        })

    }

};
//返回上级回调函数
function upper(e) {
    if((0<flag)&&(flag<=3)){
        //通过覆盖物的矩形中心点确定覆盖的区域
        var point=bm.getOverlays()[0].getBounds().getCenter();
        var coder=new BMap.Geocoder();
        coder.getLocation(point,function (rs) {
            var name=rs.addressComponents[_properties[flag-2]];
            var province=rs.addressComponents.province;
            var city=rs.addressComponents.city;
            //返回上层的覆盖物
            if(name){
                bm.clearOverlays();
                addPly_(name,province,city);
                //调整视野和zoom
                bm.setCenter(name);
                var zoom=bm.getZoom()-2;
                bm.setZoom(zoom);
            }
            else{
                bm.clearOverlays();
                //调整视野和zoom为初始值
                bm.centerAndZoom(start_point,5)
            }
            flag=flag-1; //计数器-1，表示返回上一层
        })
    }

}
//添加覆盖物（随机颜色）
function addPly_(name,province,city){
    $.ajax({
        url:"data/json/china.json",
        dataType:"json",
        success:function (rs) {
            //省级
            if(rs.province[name]){
                var sub=Object.keys(rs.province[name].sub)//获取地级市数组
                sub.forEach(function (cr, index, arr) {
                    var color= '#'+Math.floor(Math.random()*0xffffff).toString(16);//随机产生颜色
                    addPly(cr,color)
                })

            }
            //市级
            else if (rs.province[province].sub[name]){
                var sub=Object.keys(rs.province[province].sub[name].sub) //获取区级数组
                if(sub!=""){
                    sub.forEach(function (cr, index, arr) {
                        console.log(cr)
                        var color= '#'+Math.floor(Math.random()*0xffffff).toString(16);//随机产生颜色
                        addPly(cr,color)
                    })
                }
                else {
                    var color= '#'+Math.floor(Math.random()*0xffffff).toString(16);//随机产生颜色
                    addPly(name,color)
                }
            }
            //区级
            else if (rs.province[province].sub[city].sub[name]){
                var color= '#'+Math.floor(Math.random()*0xffffff).toString(16);
                addPly(name,color)
            }

        }

    })
}
//指定颜色添加覆盖物

function addPly(name,color) {
    var bdy=new BMap.Boundary();
    bdy.get(name,function (rs) {
        // map.clearOverlays();        //清除地图覆盖物
        var count = rs.boundaries.length; //行政区域的点有多少个
        for(var i = 0; i < count; i++) {
            var ply = new BMap.Polygon(rs.boundaries[i],
                {
                    strokeWeight: 2, //设置多边形边线线粗

                    strokeOpacity: 0.5, //设置多边形边线透明度0-1
                    StrokeStyle: "solid", //设置多边形边线样式为实线或虚线，取值 solid 或 dashed
                    fillColor: color, //设置多边形填充颜色
                    fillOpacity: 0.5,//设置多边形填充颜色透明度0-1
                    strokeColor: "#fff", //设置多边形边线颜色

                }); //建立多边形覆盖物
            bm.addOverlay(ply);  //添加覆盖物
        }
    })
}

//echarts表格

function show_table(){
    $.table=$(".table_container");
    $.table.css("display","inline-block");
    var myChart=echarts.init(document.getElementById('main_echarts'));
    var option={
        xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
            type: 'value'
        },
        series: [{
            data: [120, 200, 150, 80, 70, 110, 130],
            type: 'bar'
        }]
    };
    myChart.setOption(option)
}

/**
 * 数据最大值，最小值，当前数据，最深色，最浅色
 * */
function range(max, min, val, col1, col2) {
    let valRange = +((val - min) / (max - min)).toFixed(2);
    let [r1,g1,b1]=col1,
        [r2,g2,b2]=col2;
    let [r3,g3,b3]=[(r2 - (r2 - r1) * valRange), (g2 - (g2 - g1) * valRange), (b2 - (b2 - b1) * valRange )];
    return [r3, g3, b3];
}
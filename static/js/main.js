/**
 * Created by lyh on 2018/5/21.
 */

let myChart=null;
let bm=null;
let option=null;
//初始化地图echarts，添加点击下钻返回事件
$(function () {
    myChart=echarts.init(document.getElementById('baidu_map'));
    option={
        bmap:{
            center:[110.404, 35.915],
            zoom:5,
            maxZoom:12,
            roam:true,
            mapStyle:{
                styleJson: [ {
                    "featureType": "water",
                    "elementType": "all",
                    "stylers": {
                        "color": "#021019"
                    }
                },
                    {
                        "featureType": "highway",
                        "elementType": "geometry.fill",
                        "stylers": {
                            "color": "#000000"
                        }
                    },
                    {
                        "featureType": "highway",
                        "elementType": "geometry.stroke",
                        "stylers": {
                            "color": "#147a92"
                        }
                    },
                    {
                        "featureType": "arterial",
                        "elementType": "geometry.fill",
                        "stylers": {
                            "color": "#000000"
                        }
                    },
                    {
                        "featureType": "arterial",
                        "elementType": "geometry.stroke",
                        "stylers": {
                            "color": "#0b3d51"
                        }
                    },
                    {
                        "featureType": "local",
                        "elementType": "geometry",
                        "stylers": {
                            "color": "#000000"
                        }
                    },
                    {
                        "featureType": "land",
                        "elementType": "all",
                        "stylers": {
                            "color": "#08304b"
                        }
                    },
                    {
                        "featureType": "railway",
                        "elementType": "geometry.fill",
                        "stylers": {
                            "color": "#000000"
                        }
                    },
                    {
                        "featureType": "railway",
                        "elementType": "geometry.stroke",
                        "stylers": {
                            "color": "#08304b"
                        }
                    },
                    {
                        "featureType": "subway",
                        "elementType": "geometry",
                        "stylers": {
                            "lightness": -70
                        }
                    },
                    {
                        "featureType": "building",
                        "elementType": "geometry.fill",
                        "stylers": {
                            "color": "#000000"
                        }
                    },
                    {
                        "featureType": "all",
                        "elementType": "labels.text.fill",
                        "stylers": {
                            "color": "#857f7f"
                        }
                    },
                    {
                        "featureType": "all",
                        "elementType": "labels.text.stroke",
                        "stylers": {
                            "color": "#000000"
                        }
                    },
                    {
                        "featureType": "building",
                        "elementType": "geometry",
                        "stylers": {
                            "color": "#022338"
                        }
                    },
                    {
                        "featureType": "green",
                        "elementType": "geometry",
                        "stylers": {
                            "color": "#062032"
                        }
                    },
                    {
                        "featureType": "boundary",
                        "elementType": "all",
                        "stylers": {
                            "color": "#1e1c1c"
                        }
                    },
                    {
                        "featureType": "manmade",
                        "elementType": "geometry",
                        "stylers": {
                            "color": "#022338"
                        }
                    },
                    {
                        "featureType": "poi",
                        "elementType": "all",
                        "stylers": {
                            "visibility": "off"
                        }
                    },
                    {
                        "featureType": "all",
                        "elementType": "labels.icon",
                        "stylers": {
                            "visibility": "off"
                        }
                    },
                    {
                        "featureType": "all",
                        "elementType": "labels.text.fill",
                        "stylers": {
                            "color": "#2da0c6",
                            "visibility": "on"
                        }
                    },
                    {
                        "featureType": "city",
                        "elementType": "labels",
                        "stylers": {
                            "color": "#ffffff00"
                        }
                    }]
            }
        }
    };
    myChart.setOption(option);
    bm=myChart.getModel().getComponent('bmap').getBMap();
    bm.addEventListener("click",drill);
    bm.addEventListener("rightclick",upper);
    console.log(bm)
});


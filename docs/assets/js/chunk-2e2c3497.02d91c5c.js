(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2e2c3497"],{"209d":function(t,a,e){"use strict";e.r(a);var n=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",[e("div",{staticClass:"search_wrap"},[e("el-input",{staticClass:"input-with-select",attrs:{placeholder:"请输入内容"},model:{value:t.input,callback:function(a){t.input=a},expression:"input"}},[e("el-button",{attrs:{slot:"append",icon:"el-icon-search"},slot:"append"})],1)],1),e("div",{staticClass:"layer_wrap"},[e("div",{staticClass:"selector_wrap"},[e("div",{staticClass:"layer_item",on:{click:t.changeTotalType}},[t._v(t._s(t.totalType.label))]),e("div",{staticClass:"layer_item",on:{click:function(a){return t.showChartHandle(0)}}},[t._v("分布图")]),e("div",{staticClass:"layer_item last_item",on:{click:function(a){return t.showChartHandle(1)}}},[t._v("趋势图")]),e("div",{staticClass:"layer_item last_item",on:{click:t.showTimeLineHandle}},[t._v("时间轴")])]),e("div",{directives:[{name:"show",rawName:"v-show",value:"custom"===t.totalType.code,expression:"totalType.code === 'custom'"}],staticClass:"date_picker"},[e("el-date-picker",{attrs:{type:"daterange",align:"right","unlink-panels":"","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期",size:"small"},on:{change:t.dataRangeChanged},model:{value:t.dateRange,callback:function(a){t.dateRange=a},expression:"dateRange"}})],1)]),e("Map",{ref:"map",attrs:{center:t.mapCenter}}),e("div",{staticClass:"chart_wrap"},[e("transition",{attrs:{name:"chart",mode:"out-in"}},["distributionChart"===t.showChart?e("DistributionChart",{attrs:{data:t.szyqData}}):"trendChart"===t.showChart?e("TrendChart",{attrs:{data:t.szyqData}}):t._e()],1)],1),t.showTimeLine?e("TimeLine",{staticClass:"timeline-container",attrs:{startDate:"2022-03-01",speed:1},on:{changeDate:t.handleDateChange}}):t._e()],1)},i=[],r=e("3835"),s=(e("d3b7"),e("3ca3"),e("ddb0"),e("d81d"),e("c1df")),o=e.n(s),c=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{attrs:{id:"map"}})},l=[],u=(e("a9e3"),e("557c")),d={props:{center:{type:Array,default:function(){return[112,32]}},zoom:{type:Number,default:12}},data:function(){return{mapObj:void 0}},mounted:function(){this.init()},methods:{init:function(){this.mapObj=new u["a"]({target:"map",center:this.center,zoom:this.zoom})}}},h=d,p=(e("c01d"),e("2877")),f=Object(p["a"])(h,c,l,!1,null,"34e941a7",null),m=f.exports,y=e("4787"),v=e("5831"),b=e("4cdf"),w=e("f403"),g=e("343d"),C={components:{Map:m,DistributionChart:function(){return Promise.all([e.e("chart"),e.e("chunk-vendors"),e.e("chunk-2bea83e2")]).then(e.bind(null,"50e8"))},TrendChart:function(){return Promise.all([e.e("chart"),e.e("chunk-vendors"),e.e("chunk-397c27c4")]).then(e.bind(null,"4c63"))},TimeLine:function(){return e.e("chunk-1e000fd7").then(e.bind(null,"1bb3"))}},mixins:[g["a"]],data:function(){return{szyqData:null,heatlayer:null,mapCenter:[114.040504,22.553397],totalIndex:0,showChart:"",input:"",dateRange:"",showTimeLine:!1}},computed:{totalType:function(){return this.totalTypeList[this.totalIndex]}},watch:{totalIndex:function(t){this.changeMapData(t)}},mounted:function(){this.getData()},methods:{getData:function(){var t=this;this.$api.getSzyzData().then((function(a){t.szyqData=a,t.$refs.map.mapObj&&t.showHeatmap(a)}))},showHeatmap:function(t){var a=this.$refs.map.mapObj;if(a){this.heatlayer&&a.getOlMap().removeLayer(this.heatlayer),this.heatlayer=this.createHeatmap(),a.getOlMap().addLayer(this.heatlayer);var e=t.map((function(t){var a=parseFloat(t.x,10),e=parseFloat(t.y,10);return new b["a"]({geometry:new w["a"]([a,e])})})),n=this.heatlayer.getSource();n.addFeatures(e)}},createHeatmap:function(){var t=new y["a"]({source:new v["a"],blur:7,radius:5,weight:function(){return 3}});return t},changeTotalType:function(){this.totalIndex=this.totalIndex>=this.totalTypeList.length-1?0:this.totalIndex+1},changeMapData:function(t){var a,e,n=this.totalTypeList[this.totalIndex];if("custom"===n.code){var i=Object(r["a"])(this.dateRange,2);a=i[0],e=i[1]}else e=o()(),a=o()().subtract(n.value,"day");var s=this.filterMapDataByDateRange(a,e,this.szyqData);this.showHeatmap(s)},showChartHandle:function(t){var a=0===t?"distributionChart":"trendChart";this.showChart===a?this.showChart="":this.showChart=a},dataRangeChanged:function(){this.changeMapData()},showTimeLineHandle:function(){this.showTimeLine=!this.showTimeLine}}},D=C,T=(e("94a1"),Object(p["a"])(D,n,i,!1,null,"4a817586",null));a["default"]=T.exports},"343d":function(t,a,e){"use strict";e("4de4"),e("d3b7");var n=e("c1df"),i=e.n(n);a["a"]={data:function(){return{personCategory:[{code:"age",label:"按年龄"},{code:"sex",label:"按性别"},{code:"area",label:"按区域"}],totalTypeList:[{code:"day",label:"昨日数据",value:1},{code:"day3",label:"三日累计",value:3},{code:"day7",label:"七日累计",value:7},{code:"day15",label:"十五日累计",value:15},{code:"custom",label:"自定义时间范围",value:0}]}},methods:{filterMapDataBySubDate:function(t,a){if(Array.isArray(a)){var e=i()().subtract(t,"day"),n=a.filter((function(t){var a=i()(t.date);return a.isAfter(e)}));return n}},filterMapDataByDateRange:function(t,a,e){var n=i()(t).subtract(1,"day"),r=i()(a),s=e.filter((function(t){var a=i()(t.date);return a.isBetween(n,r)}));return s}}}},"8c39":function(t,a,e){},"94a1":function(t,a,e){"use strict";e("8c39")},c01d:function(t,a,e){"use strict";e("c240")},c240:function(t,a,e){}}]);
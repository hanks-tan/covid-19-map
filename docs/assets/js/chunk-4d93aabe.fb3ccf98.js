(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-4d93aabe"],{"3a8e":function(t,a,e){"use strict";e("84ae")},"84ae":function(t,a,e){},b024:function(t,a,e){"use strict";e.r(a);var n=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"wrap"},[t._m(0),t.rankData?e("DynamicRankChart",{staticClass:"chart",attrs:{colorCofig:t.rankData.colorCofig,dateIndex:t.rankData.dateIndex,labelIndex:t.rankData.labelIndex,labelCodeIndex:t.rankData.labelCodeIndex,dimension:t.rankData.dimension,renderData:t.rankData.renderData,startDateIndex:t.rankData.startDateIndex}}):t._e()],1)},i=[function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"title"},[e("h2",[t._v("国内 确诊病例 TOP10 的城市变化过程")])])}],r=(e("ac1f"),e("1276"),e("d3b7"),e("159b"),function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div")}),o=[],s=(e("a9e3"),e("7db0"),e("4de4"),e("fb6a"),e("caad"),e("22b4")),c=e("5e81"),d=e("5a72"),u=e("4b2a"),l=e("4cb5"),f=e("f95e"),h=e("313e"),p={title:{text:"World Population"},tooltip:{trigger:"axis",axisPointer:{type:"shadow"}},legend:{},grid:{left:"3%",right:"4%",bottom:"3%",containLabel:!0},xAxis:{type:"value",boundaryGap:[0,.01]},yAxis:{type:"category"}},m={init:function(t,a){var e=h["a"](a);return e&&e.setOption(t),e},addLineChart:function(t,a){var e=Object.assign({},t,p);e.yAxis.data=t.yAxisData;var n=this.init(e,a);return n.updateData=function(t){var a=Object.assign({},t,p);a.yAxis.data=t.yAxisData,n.setOption(a)},n}};s["a"]([c["a"],d["a"],u["a"],l["a"],f["a"]]);var x={data:function(){return{}},props:{colorCofig:{type:Object},updateFrequency:{type:Number,default:1e3},dimension:{type:Number,required:!0},dateIndex:{type:Number,required:!0},labelIndex:{type:Number,required:!0},labelCodeIndex:{type:Number,required:!0},startDateIndex:{type:Number,default:0},renderData:{type:Array,validator:function(t){var a=t[0];if(!Array.isArray(a))return!1;var e=a.find((function(t){return"string"!==typeof t}));return!e}}},mounted:function(){this.init()},methods:{init:function(){for(var t=this.renderData,a=this.dateIndex,e=this.labelIndex,n=this.labelCodeIndex,i=this.colorCofig,r=this.dimension,o=this.updateFrequency,s=this.getAllDate(t,this.dateIndex),c=this.startDateIndex<s.length?this.startDateIndex:0,d=s[c],u={grid:{top:10,bottom:30,left:150,right:80},xAxis:{max:"dataMax",axisLabel:{formatter:function(t){return Math.round(t)+""}}},dataset:{source:t.slice(1).filter((function(t){return t[a]===d}))},yAxis:{type:"category",inverse:!0,max:10,axisLabel:{show:!0,fontSize:14,formatter:function(t){return t},rich:{flag:{fontSize:25,padding:5}}},animationDuration:300,animationDurationUpdate:300},series:[{realtimeSort:!0,seriesLayoutBy:"column",type:"bar",itemStyle:{color:function(t){return i[t.value[n]]||"#5470c6"}},encode:{x:r,y:e},label:{show:!0,precision:1,position:"right",valueAnimation:!0,fontFamily:"monospace"}}],animationDuration:0,animationDurationUpdate:o,animationEasing:"linear",animationEasingUpdate:"linear",graphic:{elements:[{type:"text",right:160,bottom:60,style:{text:d,font:"bolder 80px monospace",fill:"rgba(100, 100, 100, 0.25)"},z:100}]}},l=m.init(u,this.$el),f=c;f<s.length-1;++f)(function(t){setTimeout((function(){h(s[t+1])}),(t-c)*o)})(f);function h(e){var n=t.slice(1).filter((function(t){return t[a]===e}));u.series[0].data=n,u.graphic.elements[0].style.text=e,l.setOption(u)}},getAllDate:function(t,a){var e=[];return t.slice(1).forEach((function(t){e.includes(t[a])||e.push(t[a])})),e}}},b=x,y=e("2877"),D=Object(y["a"])(b,r,o,!1,null,"1deed5c6",null),v=D.exports,g=e("bc3a"),C=e.n(g),I={data:function(){return{lineChartData:void 0,rankData:void 0,lineRachChartOptins:{renderData:[],countries:[],startDate:"",countryColName:"city",dateColName:"date",dataItemName:"",title:""}}},components:{DynamicRankChart:v},mounted:function(){this.init()},methods:{init:function(){var t=this;this.$api.getCovidData().then((function(t){var a=t.data.split("\n"),e=[];return a.forEach((function(t,a){var n=t.split(",");0===a?e.push(n):n[6]&&([7,8,9,10].forEach((function(t){n[t]=parseInt(n[t])})),e.push(n))})),e})).then((function(a){var e={420100:"#00008b",440300:"#f00",440100:"#ffde00",110102:"#002a8f",440400:"#003580"},n={renderData:a,colorCofig:e,dimension:7,dateIndex:0,labelIndex:5,labelCodeIndex:6,startDateIndex:40};t.rankData=n}))},showLineRaceChart:function(){var t=this;this.$api.getCovidData().then((function(t){var a=t.data.split("\n"),e=[];return a.forEach((function(t,a){var n=t.split(",");0===a?e.push(n):n[6]&&([7,8,9,10].forEach((function(t){n[t]=parseInt(n[t])})),e.push(n))})),e})).then((function(a){var e=["武汉市","深圳市","广州市","黄冈市"];t.lineRachChartOptins.countries=e,t.lineRachChartOptins.startDate="2020-02-14",t.lineRachChartOptins.countryColName="city",t.lineRachChartOptins.dateColName="date",t.lineRachChartOptins.dataItemName="confirmed",t.lineRachChartOptins.title="增长",t.lineRachChartOptins.renderData=a}))},getData:function(t){return new Promise((function(a,e){C.a.get(t).then((function(t){a(t)}))}))}}},O=I,k=(e("3a8e"),Object(y["a"])(O,n,i,!1,null,"38dd998a",null));a["default"]=k.exports}}]);
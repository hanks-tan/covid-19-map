(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-56ac79ea"],{"40b2":function(e,t,a){},"58fa":function(e,t,a){"use strict";a.r(t);var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"wrap"},[a("div",{staticClass:"content"},[a("el-tabs",{attrs:{type:"border-card"}},e._l(e.tabs,(function(t,n){return a("el-tab-pane",{key:n,attrs:{label:t.label}},["domestic"===t.code?a("div",[a("DomesticData")],1):e._e()])})),1)],1)])},c=[],o=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("div",{staticClass:"card"}),a("div",{staticClass:"box-inner"},[a("div",{staticClass:"date"},[e._v("数据更新时间："+e._s(e.date))]),a("div",{staticClass:"today-data"},e._l(e.todayData,(function(t){return a("el-card",{key:t.code,staticClass:"card"},[a("div",{staticClass:"compare"},[a("span",[e._v("较昨日")]),e._v(" "+e._s(t.compareBefore)+" ")]),a("div",{staticClass:"cur-count"},[e._v(" "+e._s(t.value)+" ")]),a("div",[e._v(" "+e._s(t.label)+" ")])])})),1)]),a("div")])},s=[],r={data:function(){return{date:"2022-03-22",todayData:[{name:"dead",label:"新增确诊",value:1333,compareBefore:"+5"},{name:"confirmed",label:"累计确诊",value:133,compareBefore:"+3"},{name:"",label:"现存确诊",value:1333,compareBefore:"+5"},{name:"dead",label:"累计境外输入",value:1333,compareBefore:"+5"},{name:"dead",label:"累计治愈",value:1333,compareBefore:"+5"},{name:"dead",label:"累计死亡",value:1333,compareBefore:"+5"}]}}},i=r,l=(a("e969"),a("2877")),d=Object(l["a"])(i,o,s,!1,null,"bda9a538",null),u=d.exports,b=a("a0be"),f={components:{DomesticData:u,Map:b["a"]},data:function(){return{count:0,tabs:[{label:"国内疫情",code:"domestic"},{label:"国际疫情",code:"international"}]}},methods:{load:function(){this.count+=2}}},m=f,v=(a("8bcb"),Object(l["a"])(m,n,c,!1,null,"d28dc7c4",null));t["default"]=v.exports},"8bcb":function(e,t,a){"use strict";a("40b2")},"990b":function(e,t,a){},a0be:function(e,t,a){"use strict";var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{attrs:{id:"map"}})},c=[],o=(a("a9e3"),a("557c")),s={props:{center:{type:Array,default:function(){return[112,32]}},zoom:{type:Number,default:12}},data:function(){return{mapObj:void 0}},mounted:function(){this.init()},methods:{init:function(){this.mapObj=new o["a"]({target:"map",center:this.center,zoom:this.zoom})}}},r=s,i=(a("c01d"),a("2877")),l=Object(i["a"])(r,n,c,!1,null,"34e941a7",null);t["a"]=l.exports},c01d:function(e,t,a){"use strict";a("c240")},c240:function(e,t,a){},e969:function(e,t,a){"use strict";a("990b")}}]);
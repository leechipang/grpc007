(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-f4a0910a"],{8492:function(t,e,n){"use strict";n.d(e,"u",(function(){return r})),n.d(e,"s",(function(){return o})),n.d(e,"v",(function(){return i})),n.d(e,"t",(function(){return s})),n.d(e,"q",(function(){return c})),n.d(e,"n",(function(){return l})),n.d(e,"y",(function(){return u})),n.d(e,"o",(function(){return m})),n.d(e,"x",(function(){return d})),n.d(e,"w",(function(){return f})),n.d(e,"d",(function(){return h})),n.d(e,"b",(function(){return b})),n.d(e,"e",(function(){return g})),n.d(e,"c",(function(){return p})),n.d(e,"l",(function(){return v})),n.d(e,"z",(function(){return _})),n.d(e,"C",(function(){return y})),n.d(e,"B",(function(){return w})),n.d(e,"A",(function(){return k})),n.d(e,"r",(function(){return x})),n.d(e,"j",(function(){return F})),n.d(e,"a",(function(){return L})),n.d(e,"i",(function(){return $})),n.d(e,"k",(function(){return C})),n.d(e,"f",(function(){return z})),n.d(e,"g",(function(){return j})),n.d(e,"h",(function(){return S})),n.d(e,"p",(function(){return O})),n.d(e,"m",(function(){return N}));var a=n("0c6d");function r(t){return a["a"].get("merchant/menu/lst",t)}function o(){return a["a"].get("merchant/menu/create/form")}function i(t){return a["a"].get("merchant/menu/update/form/".concat(t))}function s(t){return a["a"].delete("merchant/menu/delete/".concat(t))}function c(t){return a["a"].get("system/merchant/lst",t)}function l(){return a["a"].get("system/merchant/create/form")}function u(t){return a["a"].get("system/merchant/update/form/".concat(t))}function m(t){return a["a"].delete("system/merchant/delete/".concat(t))}function d(t,e){return a["a"].post("system/merchant/status/".concat(t),{status:e})}function f(t){return a["a"].get("system/merchant/password/form/".concat(t))}function h(t){return a["a"].get("system/merchant/category/lst",t)}function b(){return a["a"].get("system/merchant/category/form")}function g(t){return a["a"].get("system/merchant/category/form/".concat(t))}function p(t){return a["a"].delete("system/merchant/category/".concat(t))}function v(t,e){return a["a"].get("merchant/order/lst/".concat(t),e)}function _(t){return a["a"].get("merchant/order/mark/".concat(t,"/form"))}function y(t,e){return a["a"].get("merchant/order/refund/lst/".concat(t),e)}function w(t){return a["a"].get("merchant/order/refund/mark/".concat(t,"/form"))}function k(t,e){return a["a"].post("merchant/order/reconciliation/create/".concat(t),e)}function x(t){return a["a"].post("system/merchant/login/".concat(t))}function F(t){return a["a"].get("merchant/intention/lst",t)}function L(t){return a["a"].get("merchant/intention/mark/".concat(t,"/form"))}function $(t){return a["a"].delete("merchant/intention/delete/".concat(t))}function C(t){return a["a"].get("merchant/intention/status/".concat(t,"/form"))}function z(t){return a["a"].get("system/merchant/changecopy/".concat(t,"/form"))}function j(){return a["a"].get("merchant/intention/agree")}function S(t){return a["a"].post("merchant/intention/agree",t)}function O(t,e){return a["a"].post("system/merchant/close/".concat(t),{status:e})}function N(){return a["a"].get("system/merchant/count")}},cec0:function(t,e,n){"use strict";n.r(e);var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"divBox"},[n("el-card",{staticClass:"box-card"},[n("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[n("div",{staticClass:"container"},[n("el-form",{attrs:{size:"small","label-width":"100px",inline:!0}},[n("el-form-item",{staticStyle:{display:"inline-block"},attrs:{label:"选择时间："}},[n("el-radio-group",{attrs:{size:"small"},on:{change:function(e){return t.selectChange(t.tableFrom.date)}},model:{value:t.tableFrom.date,callback:function(e){t.$set(t.tableFrom,"date",e)},expression:"tableFrom.date"}},t._l(t.fromList.fromTxt,(function(e,a){return n("el-radio-button",{key:a,attrs:{label:e.val}},[t._v(t._s(e.text))])})),1),t._v(" "),n("el-date-picker",{attrs:{type:"daterange",placeholder:"选择日期",format:"yyyy/MM/dd","value-format":"yyyy/MM/dd","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期"},on:{change:t.onchangeTime},model:{value:t.timeVal,callback:function(e){t.timeVal=e},expression:"timeVal"}})],1),t._v(" "),n("el-form-item",{staticStyle:{display:"inline-block"},attrs:{label:"关键字：","label-width":"80px"}},[n("el-input",{staticClass:"selWidth",attrs:{placeholder:"请输入店铺关键字/店铺名/联系电话"},model:{value:t.tableFrom.keyword,callback:function(e){t.$set(t.tableFrom,"keyword",e)},expression:"tableFrom.keyword"}},[n("el-button",{attrs:{slot:"append",icon:"el-icon-search"},on:{click:function(e){return t.getList(1)}},slot:"append"})],1)],1),t._v(" "),n("el-form-item",{attrs:{label:"商户类别："}},[n("el-select",{staticClass:"selWidth",attrs:{clearable:"",placeholder:"请选择"},on:{change:function(e){return t.getList(1)}},model:{value:t.tableFrom.is_trader,callback:function(e){t.$set(t.tableFrom,"is_trader",e)},expression:"tableFrom.is_trader"}},[n("el-option",{attrs:{label:"自营",value:"1"}}),t._v(" "),n("el-option",{attrs:{label:"非自营",value:"0"}})],1)],1),t._v(" "),t.headeNum.length>0?n("el-tabs",{on:{"tab-click":function(e){return t.getList(1)}},model:{value:t.tableFrom.status,callback:function(e){t.$set(t.tableFrom,"status",e)},expression:"tableFrom.status"}},t._l(t.headeNum,(function(t,e){return n("el-tab-pane",{key:e,attrs:{name:t.type.toString(),label:t.title+"("+t.count+")"}})})),1):t._e()],1)],1),t._v(" "),n("el-button",{attrs:{size:"small",type:"primary"},on:{click:t.onAdd}},[t._v("添加商户")])],1),t._v(" "),n("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.listLoading,expression:"listLoading"}],staticClass:"switchTable",staticStyle:{width:"100%"},attrs:{data:t.tableData.data,size:"small","highlight-current-row":""}},[n("el-table-column",{attrs:{prop:"mer_id",label:"ID","min-width":"60"}}),t._v(" "),n("el-table-column",{attrs:{prop:"mer_name",label:"商户名称","min-width":"150"}}),t._v(" "),n("el-table-column",{attrs:{prop:"mer_name",label:"商户类别","min-width":"90"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("span",{staticClass:"spBlock"},[t._v(t._s(e.row.is_trader?"自营":"非自营"))])]}}])}),t._v(" "),n("el-table-column",{attrs:{prop:"real_name",label:"商户姓名","min-width":"150"}}),t._v(" "),n("el-table-column",{attrs:{prop:"admin.account",label:"商户账号","min-width":"100"}}),t._v(" "),n("el-table-column",{attrs:{prop:"mer_address",label:"商户地址","min-width":"200"}}),t._v(" "),n("el-table-column",{attrs:{prop:"mark",label:"备注","min-width":"200"}}),t._v(" "),n("el-table-column",{attrs:{prop:"sort",label:"排序","min-width":"100"}}),t._v(" "),n("el-table-column",{attrs:{prop:"status",label:"推荐","min-width":"100"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("el-switch",{attrs:{"active-value":1,"inactive-value":0,"active-text":"是","inactive-text":"否",disabled:""},nativeOn:{click:function(n){return t.onchangeIsShow(e.row)}},model:{value:e.row.is_best,callback:function(n){t.$set(e.row,"is_best",n)},expression:"scope.row.is_best"}})]}}])}),t._v(" "),n("el-table-column",{attrs:{prop:"create_time",label:"创建时间","min-width":"150"}}),t._v(" "),n("el-table-column",{attrs:{prop:"status",label:"开启/关闭","min-width":"100"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("el-switch",{attrs:{"active-value":1,"inactive-value":0,"active-text":"开启","inactive-text":"关闭",disabled:""},nativeOn:{click:function(n){return t.onchangeIsClose(e.row)}},model:{value:e.row.status,callback:function(n){t.$set(e.row,"status",n)},expression:"scope.row.status"}})]}}])}),t._v(" "),n("el-table-column",{attrs:{label:"操作","min-width":"280",fixed:"right",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return["1"===t.tableFrom.status?n("router-link",{attrs:{to:{path:t.roterPre+"/merchant/list/reconciliation/"+e.row.mer_id+"/1"}}},[n("el-button",{staticClass:"mr10",attrs:{type:"text",size:"small"}},[t._v("对账")])],1):t._e(),t._v(" "),"1"===t.tableFrom.status?n("el-button",{attrs:{type:"text",size:"small"},on:{click:function(n){return t.onLogo(e.row.mer_id)}}},[t._v("登录")]):t._e(),t._v(" "),n("el-button",{attrs:{type:"text",size:"small"},on:{click:function(n){return t.onEdit(e.row.mer_id)}}},[t._v("编辑")]),t._v(" "),"1"===t.tableFrom.status?n("el-button",{attrs:{type:"text",size:"small"},on:{click:function(n){return t.onPassword(e.row.mer_id)}}},[t._v("修改管理员密码")]):t._e(),t._v(" "),"0"===t.tableFrom.status?n("el-button",{attrs:{type:"text",size:"small"},on:{click:function(n){return t.handleDelete(e.row.mer_id,e.$index)}}},[t._v("删除")]):t._e(),t._v(" "),"1"===t.tableFrom.status?n("el-button",{attrs:{type:"text",size:"small"},on:{click:function(n){return t.handleTimes(e.row.mer_id)}}},[t._v("设置第三方平台商品复制次数")]):t._e()]}}])})],1),t._v(" "),n("div",{staticClass:"block"},[n("el-pagination",{attrs:{"page-sizes":[20,40,60,80],"page-size":t.tableFrom.limit,"current-page":t.tableFrom.page,layout:"total, sizes, prev, pager, next, jumper",total:t.tableData.total},on:{"size-change":t.handleSizeChange,"current-change":t.pageChange}})],1)],1)],1)},r=[],o=n("8492"),i=n("e572"),s=n("83d6"),c=n("bbcc"),l=n("a78e"),u=n.n(l),m={name:"MerchantList",data:function(){return{fromList:i["a"],roterPre:s["roterPre"],isChecked:!1,listLoading:!0,headeNum:[{count:270,type:"1",title:"正常开启的商户"},{count:270,type:"0",title:"已关闭商户"}],tableData:{data:[],total:0},tableFrom:{page:1,limit:20,date:"",status:"1",keyword:"",is_trader:""},autoUpdate:!0,timeVal:[]}},mounted:function(){this.getHeadNum(),this.getList("")},methods:{onLogo:function(t){var e=this;Object(o["r"])(t).then((function(t){u.a.set("merchantToken",t.data.token),window.open(c["a"].httpUrl+t.data.url)})).catch((function(t){e.$message.error(t.message)}))},selectChange:function(t){this.tableFrom.date=t,this.timeVal=[],this.tableFrom.page=1,this.getList("")},onchangeTime:function(t){this.timeVal=t,this.tableFrom.date=this.timeVal?this.timeVal.join("-"):"",this.tableFrom.page=1,this.getList("")},getHeadNum:function(){var t=this;Object(o["m"])().then((function(e){t.headeNum[0]["count"]=e.data.valid,t.headeNum[1]["count"]=e.data.invalid})).catch((function(t){}))},getList:function(t){var e=this;this.listLoading=!0,this.tableFrom.page=t||this.tableFrom.page,Object(o["q"])(this.tableFrom).then((function(t){e.tableData.data=t.data.list,e.tableData.total=t.data.count,e.listLoading=!1})).catch((function(t){e.listLoading=!1,e.$message.error(t.message)}))},pageChange:function(t){this.tableFrom.page=t,this.getList("")},handleSizeChange:function(t){this.tableFrom.limit=t,this.getList(1)},onchangeIsShow:function(t){var e=this,n=0===t.is_best?"是否开启推荐商户":"是否关闭推荐商户";this.$modalSure(n).then((function(){Object(o["x"])(t.mer_id,1===t.is_best?0:1).then((function(t){var n=t.message;e.$message.success(n),e.getList("")})).catch((function(t){var n=t.message;e.$message.error(n)}))}))},onchangeIsClose:function(t){var e=this;Object(o["p"])(t.mer_id,1===t.status?0:1).then((function(t){var n=t.message;e.$message.success(n),e.getList("")})).catch((function(t){var n=t.message;e.$message.error(n)}))},onAdd:function(){var t=this;this.$modalForm(Object(o["n"])()).then((function(){return t.getList("")}))},onEdit:function(t){var e=this;this.$modalForm(Object(o["y"])(t)).then((function(){return e.getList("")}))},handleDelete:function(t){var e=this;this.$modalSure("该商户下有相关数据信息，删除后不可恢复，您是否确定删除").then((function(){Object(o["o"])(t).then((function(t){var n=t.message;e.$message.success(n),e.getList(""),e.getHeadNum()})).catch((function(t){var n=t.message;e.$message.error(n)}))}))},handleTimes:function(t){var e=this;this.$modalForm(Object(o["f"])(t)).then((function(){return e.getList("")}))},onPassword:function(t){this.$modalForm(Object(o["w"])(t))}}},d=m,f=n("2877"),h=Object(f["a"])(d,a,r,!1,null,"d36587a6",null);e["default"]=h.exports},e572:function(t,e,n){"use strict";n.d(e,"c",(function(){return a})),n.d(e,"a",(function(){return r})),n.d(e,"b",(function(){return o}));var a=[{label:"开启",value:1},{label:"关闭",value:0}],r={title:"选择时间",custom:!0,fromTxt:[{text:"全部",val:""},{text:"今天",val:"today"},{text:"昨天",val:"yesterday"},{text:"最近7天",val:"lately7"},{text:"最近30天",val:"lately30"},{text:"本月",val:"month"},{text:"本年",val:"year"}]},o={title:"状态",custom:!0,fromTxt:[{text:"全部",val:""},{text:"待审核",val:"0"},{text:"审核已通过",val:"1"},{text:"审核未通过",val:"2"}]}}}]);
(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-3fcd9395"],{"11e1":function(t,e,s){},"1a24":function(t,e,s){"use strict";s("11e1")},b055:function(t,e,s){"use strict";s.r(e);var a=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"divBox"},[a("el-card",{staticClass:"box-card"},[a("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[a("div",{staticClass:"filter-container"},[a("div",{staticClass:"demo-input-suffix acea-row"},[a("span",{staticClass:"seachTiele"},[t._v("状态：")]),t._v(" "),a("el-select",{staticClass:"filter-item selWidth mr20",attrs:{placeholder:"请选择",clearable:""},on:{change:function(e){return t.getList(1)}},model:{value:t.tableFrom.status,callback:function(e){t.$set(t.tableFrom,"status",e)},expression:"tableFrom.status"}},[a("el-option",{attrs:{label:"未开启",value:0}}),t._v(" "),a("el-option",{attrs:{label:"开启",value:1}})],1),t._v(" "),a("span",{staticClass:"seachTiele"},[t._v("商户类别：")]),t._v(" "),a("el-select",{staticClass:"filter-item selWidth mr20",attrs:{clearable:"",placeholder:"请选择"},on:{change:function(e){return t.getList(1)}},model:{value:t.tableFrom.is_trader,callback:function(e){t.$set(t.tableFrom,"is_trader",e)},expression:"tableFrom.is_trader"}},[a("el-option",{attrs:{label:"自营",value:"1"}}),t._v(" "),a("el-option",{attrs:{label:"非自营",value:"0"}})],1),t._v(" "),a("span",{staticClass:"seachTiele"},[t._v("关键字：")]),t._v(" "),a("el-input",{staticClass:"selWidth",attrs:{placeholder:"请输入优惠券名称",clearable:""},model:{value:t.tableFrom.coupon_name,callback:function(e){t.$set(t.tableFrom,"coupon_name",e)},expression:"tableFrom.coupon_name"}},[a("el-button",{attrs:{slot:"append",icon:"el-icon-search"},on:{click:function(e){return t.getList(1)}},slot:"append"})],1)],1)])]),t._v(" "),a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.listLoading,expression:"listLoading"}],staticStyle:{width:"100%"},attrs:{data:t.tableData.data,size:"small","highlight-current-row":""}},[a("el-table-column",{attrs:{prop:"coupon_id",label:"ID","min-width":"50"}}),t._v(" "),a("el-table-column",{attrs:{prop:"title",label:"优惠劵名称","min-width":"120"}}),t._v(" "),a("el-table-column",{attrs:{label:"优惠劵类型","min-width":"90"},scopedSlots:t._u([{key:"default",fn:function(e){var s=e.row;return[a("span",[t._v(t._s(t._f("couponTypeFilter")(s.type)))])]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"商户名称","min-width":"180"},scopedSlots:t._u([{key:"default",fn:function(e){var s=e.row;return[a("span",[t._v(t._s(s.merchant?s.merchant.mer_name:""))])]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"mer_name",label:"商户类别","min-width":"90"},scopedSlots:t._u([{key:"default",fn:function(e){return[e.row.merchant?a("span",{staticClass:"spBlock"},[t._v(t._s(e.row.merchant.is_trader?"自营":"非自营"))]):t._e()]}}])}),t._v(" "),a("el-table-column",{attrs:{"min-width":"200",label:"领取日期"},scopedSlots:t._u([{key:"default",fn:function(e){var s=e.row;return[s.start_time?a("div",[t._v("\n            "+t._s(s.start_time)+" - "+t._s(s.end_time)+"\n          ")]):a("span",[t._v("不限时")])]}}])}),t._v(" "),a("el-table-column",{attrs:{"min-width":"200",label:"使用时间"},scopedSlots:t._u([{key:"default",fn:function(e){var s=e.row;return[s.use_start_time&&s.use_end_time?a("div",[t._v("\n            "+t._s(s.use_start_time)+" "),a("br"),t._v("- "+t._s(s.use_end_time)+"\n          ")]):a("span",[t._v(t._s(s.coupon_time)+"天")])]}}])}),t._v(" "),a("el-table-column",{attrs:{"min-width":"100",label:"发布数量"},scopedSlots:t._u([{key:"default",fn:function(e){var s=e.row;return[0===s.is_limited?a("span",[t._v("不限量")]):a("div",[a("span",{staticClass:"fa"},[t._v("发布："+t._s(s.total_count))]),t._v(" "),a("span",{staticClass:"sheng"},[t._v("剩余："+t._s(s.remain_count))])])]}}])}),t._v(" "),a("el-table-column",{attrs:{"min-width":"100",label:"使用数量"},scopedSlots:t._u([{key:"default",fn:function(e){var s=e.row;return[a("div",[a("span",[t._v("已领取总数："+t._s(s.send_num))]),t._v(" "),a("span",{staticClass:"sheng"},[t._v("已使用总数："+t._s(s.used_num))])])]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"状态","min-width":"100"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(t._f("filterOpen")(e.row.status)))])]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"操作","min-width":"160",fixed:"right"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{staticClass:"mr10",attrs:{type:"text",size:"small"},on:{click:function(s){return t.details(e.row.coupon_id)}}},[t._v("详情")]),t._v(" "),a("el-button",{staticClass:"mr10",attrs:{type:"text",size:"small"},on:{click:function(s){return t.receive(e.row.coupon_id)}}},[t._v("领取记录")]),t._v(" "),a("el-button",{staticClass:"mr10",attrs:{type:"text",size:"small"},on:{click:function(s){return t.usedRecord(e.row.coupon_id)}}},[t._v("使用记录")])]}}])})],1),t._v(" "),a("div",{staticClass:"block"},[a("el-pagination",{attrs:{"page-sizes":[20,40,60,80],"page-size":t.tableFrom.limit,"current-page":t.tableFrom.page,layout:"total, sizes, prev, pager, next, jumper",total:t.tableData.total},on:{"size-change":t.handleSizeChange,"current-change":t.pageChange}})],1)],1),t._v(" "),t.detailDialog?a("el-dialog",{attrs:{title:"优惠券详情",visible:t.detailDialog,width:"700px"},on:{"update:visible":function(e){t.detailDialog=e}}},[a("div",[a("div",{staticClass:"box-container"},[a("div",{staticClass:"list sp"},[a("label",{staticClass:"name"},[t._v("优惠券名称：")]),t._v(" "),a("span",{staticClass:"info"},[t._v(t._s(t.couponDetail.title))])]),t._v(" "),a("div",{staticClass:"list sp"},[a("label",{staticClass:"name"},[t._v("优惠券类型：")]),t._v(" "),a("span",{staticClass:"info"},[t._v(t._s(t._f("couponTypeFilter")(t.couponDetail.coupon_type)))])]),t._v(" "),a("div",{staticClass:"list sp"},[a("label",{staticClass:"name"},[t._v("优惠券面值：")]),t._v(" "),a("span",{staticClass:"info"},[t._v(t._s(t.couponDetail.coupon_price))])]),t._v(" "),a("div",{staticClass:"list sp"},[a("label",{staticClass:"name"},[t._v("使用门槛：")]),t._v(" "),a("span",{staticClass:"info"},[t._v(t._s("0.00"==t.couponDetail.use_min_price?"无门槛":"最低消费"+t.couponDetail.use_min_price))])]),t._v(" "),a("div",{staticClass:"list sp100"},[a("label",{staticClass:"name"},[t._v("使用有效期：")]),t._v(" "),t.couponDetail.coupon_time?a("span",{staticClass:"info"},[t._v(t._s(t.couponDetail.coupon_time))]):a("span",{staticClass:"info"},[t._v(t._s(t.couponDetail.use_start_time+" - "+t.couponDetail.use_end_time))])]),t._v(" "),a("div",{staticClass:"list sp100"},[a("label",{staticClass:"name"},[t._v("领取时间：")]),t._v(" "),1==t.couponDetail.is_timeout?a("span",{staticClass:"info"},[t._v(t._s(t.couponDetail.start_time)+" - "+t._s(t.couponDetail.end_time))]):a("span",{staticClass:"info"},[t._v("不限时")])]),t._v(" "),a("div",{staticClass:"list sp"},[a("label",{staticClass:"name"},[t._v("类型：")]),t._v(" "),a("span",{staticClass:"info"},[t._v(t._s(t._f("couponUseTypeFilter")(t.couponDetail.coupon_type)))])]),t._v(" "),a("div",{staticClass:"list sp"},[a("label",{staticClass:"name"},[t._v("是否限量：")]),t._v(" "),a("span",{staticClass:"info"},[t._v(t._s(t._f("filterClose")(t.couponDetail.is_limited)))])]),t._v(" "),a("div",{staticClass:"list sp"},[a("label",{staticClass:"name"},[t._v("已发布总数：")]),t._v(" "),a("span",{staticClass:"info"},[t._v(t._s(0==t.couponDetail.is_limited?"不限量":t.couponDetail.total_count))])]),t._v(" "),a("div",{staticClass:"list sp"},[a("label",{staticClass:"name"},[t._v("剩余总数：")]),t._v(" "),a("span",{staticClass:"info"},[t._v(t._s(0==t.couponDetail.is_limited?"不限量":t.couponDetail.remain_count))])]),t._v(" "),a("div",{staticClass:"list sp100"},[a("label",{staticClass:"name"},[t._v("已领取/发放总数：")]),t._v(" "),a("span",{staticClass:"info"},[t._v(t._s(t.couponDetail.send_num))]),t._v(" "),a("el-button",{staticClass:"ml20",attrs:{size:"small",type:"text"},on:{click:function(e){return t.receive(t.couponDetail.coupon_id)}}},[t._v("领取记录")])],1),t._v(" "),a("div",{staticClass:"list sp100"},[a("label",{staticClass:"name"},[t._v("已使用总数：")]),t._v(" "),a("span",{staticClass:"info"},[t._v(t._s(t.couponDetail.used_num))]),t._v(" "),a("el-button",{staticClass:"ml20",attrs:{size:"small",type:"text"},on:{click:function(e){return t.usedRecord(t.couponDetail.coupon_id)}}},[t._v("使用记录")])],1),t._v(" "),a("div",{staticClass:"list sp"},[a("label",{staticClass:"name"},[t._v("排序：")]),t._v(" "),a("span",{staticClass:"info"},[t._v(t._s(t.couponDetail.sort))])]),t._v(" "),a("div",{staticClass:"list sp"},[a("label",{staticClass:"name"},[t._v("状态：")]),t._v(" "),a("span",{staticClass:"info"},[t._v(t._s(t.couponDetail.status?"开启":"关闭"))])])])])]):t._e(),t._v(" "),a("el-dialog",{staticClass:"modalbox",attrs:{title:t.title,visible:t.dialogVisible,"min-width":"500px","before-close":t.handleClose},on:{"update:visible":function(e){t.dialogVisible=e}}},[a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.Loading,expression:"Loading"}],staticStyle:{width:"100%"},attrs:{data:t.issueData.data,size:"small","highlight-current-row":""}},[a("el-table-column",{attrs:{prop:"user.nickname",label:"用户名","min-width":"120"}}),t._v(" "),a("el-table-column",{attrs:{label:"用户头像","min-width":"80"},scopedSlots:t._u([{key:"default",fn:function(t){return[t.row.user&&t.row.user.avatar?a("div",{staticClass:"demo-image__preview"},[a("img",{staticStyle:{width:"36px",height:"36px"},attrs:{src:t.row.user.avatar}})]):a("div",{staticClass:"demo-image__preview"},[a("img",{staticStyle:{width:"36px",height:"36px"},attrs:{src:s("cdfe")}})])]}}])}),t._v(" "),a("el-table-column",{attrs:{label:t.receiveTime,"min-width":"180"},scopedSlots:t._u([{key:"default",fn:function(e){return[0===t.receiveType?a("span",[t._v(t._s(e.row.create_time))]):a("span",[t._v(t._s(e.row.use_time))])]}}])})],1),t._v(" "),a("div",{staticClass:"block"},[a("el-pagination",{attrs:{"page-sizes":[10,20,30,40],"page-size":t.tableFromIssue.limit,"current-page":t.tableFromIssue.page,layout:"total, sizes, prev, pager, next, jumper",total:t.issueData.total},on:{"size-change":t.handleSizeChangeIssue,"current-change":t.pageChangeIssue}})],1)],1)],1)},n=[],i=s("b7be"),o=s("83d6"),l={name:"CouponList",data:function(){return{Loading:!1,dialogVisible:!1,detailDialog:!1,roterPre:o["roterPre"],listLoading:!0,title:"领取记录",receiveTime:"领取时间",receiveType:0,tableData:{data:[],total:0},tableFrom:{page:1,limit:20,status:"",coupon_name:"",is_trader:""},tableFromIssue:{page:1,limit:10,coupon_id:0},issueData:{data:[],total:0},couponDetail:{}}},mounted:function(){this.getList(1)},methods:{handleDelete:function(t,e){var s=this;this.$modalSure().then((function(){Object(i["x"])(t).then((function(t){var a=t.message;s.$message.success(a),s.tableData.data.splice(e,1)})).catch((function(t){var e=t.message;s.$message.error(e)}))}))},handleClose:function(){this.dialogVisible=!1},details:function(t){var e=this;this.detailDialog=!0,Object(i["y"])(t).then((function(t){e.couponDetail=t.data})).catch((function(t){var s=t.message;e.$message.error(s)}))},receive:function(t){this.dialogVisible=!0,this.title="领取记录",this.receiveTime="领取时间",this.receiveType=0,this.tableFromIssue.coupon_id=t,this.tableFromIssue.page=1,this.getIssueList(0)},usedRecord:function(t){this.dialogVisible=!0,this.title="使用记录",this.receiveTime="使用时间",this.receiveType=1,this.tableFromIssue.coupon_id=t,this.tableFromIssue.page=1,this.getIssueList(1)},getIssueList:function(t){var e=this;this.Loading=!0,this.tableFromIssue.status=t||"",Object(i["B"])(this.tableFromIssue).then((function(t){e.issueData.data=t.data.list,e.issueData.total=t.data.count,e.Loading=!1})).catch((function(t){e.Loading=!1,e.$message.error(t.message)}))},pageChangeIssue:function(t){this.tableFromIssue.page=t,1==this.receiveType?this.getIssueList(1):this.getIssueList(0)},handleSizeChangeIssue:function(t){this.tableFromIssue.limit=t,1==this.receiveType?this.getIssueList(1):this.getIssueList(0)},getList:function(t){var e=this;this.listLoading=!0,this.tableFrom.page=t||this.tableFrom.page,Object(i["z"])(this.tableFrom).then((function(t){e.tableData.data=t.data.list,e.tableData.total=t.data.count,e.listLoading=!1})).catch((function(t){e.listLoading=!1,e.$message.error(t.message)}))},pageChange:function(t){this.tableFrom.page=t,this.getList("")},handleSizeChange:function(t){this.tableFrom.limit=t,this.getList("")},onchangeIsShow:function(t){var e=this;Object(i["A"])(t.coupon_id,t.status).then((function(t){var s=t.message;e.$message.success(s),e.getList("")})).catch((function(t){var s=t.message;e.$message.error(s)}))}}},r=l,c=(s("1a24"),s("2877")),u=Object(c["a"])(r,a,n,!1,null,"6de28e00",null);e["default"]=u.exports},b7be:function(t,e,s){"use strict";s.d(e,"y",(function(){return n})),s.d(e,"z",(function(){return i})),s.d(e,"A",(function(){return o})),s.d(e,"B",(function(){return l})),s.d(e,"x",(function(){return r})),s.d(e,"e",(function(){return c})),s.d(e,"k",(function(){return u})),s.d(e,"c",(function(){return d})),s.d(e,"b",(function(){return p})),s.d(e,"d",(function(){return _})),s.d(e,"h",(function(){return v})),s.d(e,"g",(function(){return f})),s.d(e,"l",(function(){return m})),s.d(e,"a",(function(){return g})),s.d(e,"G",(function(){return b})),s.d(e,"D",(function(){return h})),s.d(e,"F",(function(){return C})),s.d(e,"C",(function(){return w})),s.d(e,"E",(function(){return D})),s.d(e,"H",(function(){return y})),s.d(e,"f",(function(){return k})),s.d(e,"j",(function(){return F})),s.d(e,"i",(function(){return x})),s.d(e,"v",(function(){return L})),s.d(e,"n",(function(){return I})),s.d(e,"q",(function(){return z})),s.d(e,"r",(function(){return S})),s.d(e,"p",(function(){return T})),s.d(e,"s",(function(){return $})),s.d(e,"w",(function(){return j})),s.d(e,"u",(function(){return O})),s.d(e,"t",(function(){return V})),s.d(e,"m",(function(){return B})),s.d(e,"o",(function(){return R}));var a=s("0c6d");function n(t){return a["a"].get("store/coupon/detail/".concat(t))}function i(t){return a["a"].get("store/coupon/lst",t)}function o(t,e){return a["a"].post("store/coupon/status/".concat(t),{status:e})}function l(t){return a["a"].get("store/coupon/issue",t)}function r(t){return a["a"].delete("store/coupon/delete/".concat(t))}function c(t){return a["a"].get("broadcast/room/lst",t)}function u(t,e){return a["a"].post("broadcast/room/status/".concat(t),e)}function d(t){return a["a"].delete("broadcast/room/delete/".concat(t))}function p(t){return a["a"].get("broadcast/room/apply/form/".concat(t))}function _(t){return a["a"].get("broadcast/room/detail/".concat(t))}function v(t){return a["a"].get("broadcast/goods/lst",t)}function f(t){return a["a"].get("broadcast/goods/detail/".concat(t))}function m(t,e){return a["a"].post("broadcast/goods/status/".concat(t),e)}function g(t){return a["a"].get("broadcast/goods/apply/form/".concat(t))}function b(){return a["a"].get("seckill/config/create/form")}function h(t){return a["a"].get("seckill/config/lst",t)}function C(t){return a["a"].get("seckill/config/update/".concat(t,"/form"))}function w(t){return a["a"].delete("seckill/config/delete/".concat(t))}function D(t,e){return a["a"].post("seckill/config/status/".concat(t),{status:e})}function y(t,e){return a["a"].get("broadcast/room/goods/".concat(t),e)}function k(t){return a["a"].delete("broadcast/goods/delete/".concat(t))}function F(t,e){return a["a"].post("broadcast/room/sort/".concat(t),e)}function x(t,e){return a["a"].post("broadcast/goods/sort/".concat(t),e)}function L(t){return a["a"].post("config/others/group_buying",t)}function I(){return a["a"].get("config/others/group_buying")}function z(t){return a["a"].get("store/product/group/lst",t)}function S(t){return a["a"].get("store/product/group/get/".concat(t))}function T(t){return a["a"].get("store/product/group/detail/".concat(t))}function $(t){return a["a"].post("store/product/group/status",t)}function j(t,e){return a["a"].post("store/product/group/is_show/".concat(t),{status:e})}function O(t){return a["a"].get("store/product/group/get/".concat(t))}function V(t,e){return a["a"].post("store/product/group/update/".concat(t),e)}function B(t){return a["a"].get("store/product/group/buying/lst",t)}function R(t,e){return a["a"].get("store/product/group/buying/detail/".concat(t),e)}},cdfe:function(t,e,s){t.exports=s.p+"system/img/f.5aa43cd3.png"}}]);
(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-27a6c7f0"],{b055:function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"divBox"},[s("el-card",{staticClass:"box-card"},[s("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[s("div",{staticClass:"filter-container"},[s("div",{staticClass:"demo-input-suffix acea-row"},[s("span",{staticClass:"seachTiele"},[t._v("状态：")]),t._v(" "),s("el-select",{staticClass:"filter-item selWidth mr20",attrs:{placeholder:"请选择",clearable:""},on:{change:function(e){return t.getList(1)}},model:{value:t.tableFrom.status,callback:function(e){t.$set(t.tableFrom,"status",e)},expression:"tableFrom.status"}},[s("el-option",{attrs:{label:"未开启",value:0}}),t._v(" "),s("el-option",{attrs:{label:"开启",value:1}})],1),t._v(" "),s("span",{staticClass:"seachTiele"},[t._v("优惠券名称：")]),t._v(" "),s("el-input",{staticClass:"selWidth mr20",attrs:{placeholder:"请输入优惠券名称",clearable:""},model:{value:t.tableFrom.coupon_name,callback:function(e){t.$set(t.tableFrom,"coupon_name",e)},expression:"tableFrom.coupon_name"}},[s("el-button",{attrs:{slot:"append",icon:"el-icon-search"},on:{click:function(e){return t.getList(1)}},slot:"append"})],1),t._v(" "),s("span",{staticClass:"seachTiele"},[t._v("优惠券类型：")]),t._v(" "),s("el-select",{staticClass:"filter-item selWidth mr20",attrs:{placeholder:"请选择",clearable:""},on:{change:function(e){return t.getList(1)}},model:{value:t.tableFrom.type,callback:function(e){t.$set(t.tableFrom,"type",e)},expression:"tableFrom.type"}},[s("el-option",{attrs:{label:"全部",value:""}}),t._v(" "),s("el-option",{attrs:{label:"店铺券",value:0}}),t._v(" "),s("el-option",{attrs:{label:"商品券",value:1}})],1),t._v(" "),s("span",{staticClass:"seachTiele"},[t._v("获取方式：")]),t._v(" "),s("el-select",{staticClass:"filter-item selWidth mr20",attrs:{placeholder:"请选择",clearable:""},on:{change:function(e){return t.getList(1)}},model:{value:t.tableFrom.send_type,callback:function(e){t.$set(t.tableFrom,"send_type",e)},expression:"tableFrom.send_type"}},[s("el-option",{attrs:{label:"全部",value:""}}),t._v(" "),s("el-option",{attrs:{label:"手动获取",value:0}}),t._v(" "),s("el-option",{attrs:{label:"新人",value:2}}),t._v(" "),s("el-option",{attrs:{label:"买赠",value:3}})],1)],1)]),t._v(" "),s("router-link",{attrs:{to:{path:t.roterPre+"/marketing/coupon/creatCoupon"}}},[s("el-button",{attrs:{size:"small",type:"primary"}},[t._v("添加优惠劵")])],1)],1),t._v(" "),s("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.listLoading,expression:"listLoading"}],staticStyle:{width:"100%"},attrs:{data:t.tableData.data,size:"small","highlight-current-row":""}},[s("el-table-column",{attrs:{prop:"coupon_id",label:"ID","min-width":"50"}}),t._v(" "),s("el-table-column",{attrs:{prop:"title",label:"优惠劵名称","min-width":"120"}}),t._v(" "),s("el-table-column",{attrs:{label:"优惠劵类型","min-width":"90"},scopedSlots:t._u([{key:"default",fn:function(e){var a=e.row;return[s("span",[t._v(t._s(t._f("couponTypeFilter")(a.type)))])]}}])}),t._v(" "),s("el-table-column",{attrs:{"min-width":"200",label:"领取日期"},scopedSlots:t._u([{key:"default",fn:function(e){var a=e.row;return[a.start_time?s("div",[t._v("\n            "+t._s(a.start_time)+" "),s("br"),t._v("- "+t._s(a.end_time)+"\n          ")]):s("span",[t._v("不限时")])]}}])}),t._v(" "),s("el-table-column",{attrs:{"min-width":"200",label:"使用时间"},scopedSlots:t._u([{key:"default",fn:function(e){var a=e.row;return[a.use_start_time&&a.use_end_time?s("div",[t._v("\n            "+t._s(a.use_start_time)+" "),s("br"),t._v("- "+t._s(a.use_end_time)+"\n          ")]):s("span",[t._v(t._s(a.coupon_time)+"天")])]}}])}),t._v(" "),s("el-table-column",{attrs:{"min-width":"100",label:"发布数量"},scopedSlots:t._u([{key:"default",fn:function(e){var a=e.row;return[0===a.is_limited?s("span",[t._v("不限量")]):s("div",[s("span",{staticClass:"fa"},[t._v("发布："+t._s(a.total_count))]),t._v(" "),s("span",{staticClass:"sheng"},[t._v("剩余："+t._s(a.remain_count))])])]}}])}),t._v(" "),s("el-table-column",{attrs:{"min-width":"100",label:"使用数量"},scopedSlots:t._u([{key:"default",fn:function(e){var a=e.row;return[s("div",[s("span",[t._v("已领取/发放总数："+t._s(a.send_num))]),t._v(" "),s("span",{staticClass:"sheng"},[t._v("已使用总数："+t._s(a.used_num))])])]}}])}),t._v(" "),s("el-table-column",{attrs:{label:"状态","min-width":"100"},scopedSlots:t._u([{key:"default",fn:function(e){return[s("el-switch",{attrs:{"active-value":1,"inactive-value":0,"active-text":"显示","inactive-text":"隐藏"},nativeOn:{click:function(a){return t.onchangeIsShow(e.row)}},model:{value:e.row.status,callback:function(a){t.$set(e.row,"status",a)},expression:"scope.row.status"}})]}}])}),t._v(" "),s("el-table-column",{attrs:{label:"操作","min-width":"150",fixed:"right"},scopedSlots:t._u([{key:"default",fn:function(e){return[s("el-button",{staticClass:"mr10",attrs:{type:"text",size:"small"},on:{click:function(a){return t.details(e.row.coupon_id)}}},[t._v("详情")]),t._v(" "),s("el-button",{staticClass:"mr10",attrs:{type:"text",size:"small"},on:{click:function(a){return t.receive(e.row.coupon_id)}}},[t._v("领取/发放记录")]),t._v(" "),s("router-link",{attrs:{to:{path:t.roterPre+"/marketing/coupon/creatCoupon/"+e.row.coupon_id}}},[s("el-button",{staticClass:"mr10",attrs:{type:"text",size:"small"}},[t._v("复制")])],1),t._v(" "),s("el-button",{attrs:{type:"text",size:"small"},on:{click:function(a){return t.handleDelete(e.row.coupon_id,e.$index)}}},[t._v("删除")])]}}])})],1),t._v(" "),s("div",{staticClass:"block"},[s("el-pagination",{attrs:{"page-sizes":[20,40,60,80],"page-size":t.tableFrom.limit,"current-page":t.tableFrom.page,layout:"total, sizes, prev, pager, next, jumper",total:t.tableData.total},on:{"size-change":t.handleSizeChange,"current-change":t.pageChange}})],1)],1),t._v(" "),t.detailDialog?s("el-dialog",{attrs:{title:"优惠券详情",visible:t.detailDialog,width:"700px"},on:{"update:visible":function(e){t.detailDialog=e}}},[s("div",[s("div",{staticClass:"box-container"},[s("div",{staticClass:"list sp"},[s("label",{staticClass:"name"},[t._v("优惠券名称：")]),t._v(" "),s("span",{staticClass:"info"},[t._v(t._s(t.couponDetail.title))])]),t._v(" "),s("div",{staticClass:"list sp"},[s("label",{staticClass:"name"},[t._v("优惠券类型：")]),t._v(" "),s("span",{staticClass:"info"},[t._v(t._s(t._f("couponTypeFilter")(t.couponDetail.type)))])]),t._v(" "),s("div",{staticClass:"list sp"},[s("label",{staticClass:"name"},[t._v("优惠券面值：")]),t._v(" "),s("span",{staticClass:"info"},[t._v(t._s(t.couponDetail.coupon_price))])]),t._v(" "),s("div",{staticClass:"list sp"},[s("label",{staticClass:"name"},[t._v("使用门槛：")]),t._v(" "),s("span",{staticClass:"info"},[t._v(t._s("0.00"==t.couponDetail.use_min_price?"无门槛":"最低消费"+t.couponDetail.use_min_price))])]),t._v(" "),s("div",{staticClass:"list sp100"},[s("label",{staticClass:"name"},[t._v("使用有效期：")]),t._v(" "),t.couponDetail.coupon_time&&0==t.couponDetail.coupon_type?s("span",{staticClass:"info"},[t._v(t._s(t.couponDetail.coupon_time)+"天")]):1==t.couponDetail.coupon_type?s("span",{staticClass:"info"},[t._v(t._s(t.couponDetail.use_start_time+" - "+t.couponDetail.use_end_time))]):t._e()]),t._v(" "),s("div",{staticClass:"list sp100"},[s("label",{staticClass:"name"},[t._v("领取时间：")]),t._v(" "),1==t.couponDetail.is_timeout?s("span",{staticClass:"info"},[t._v(t._s(t.couponDetail.start_time)+" - "+t._s(t.couponDetail.end_time))]):s("span",{staticClass:"info"},[t._v("不限时")])]),t._v(" "),s("div",{staticClass:"list sp"},[s("label",{staticClass:"name"},[t._v("类型：")]),t._v(" "),s("span",{staticClass:"info"},[t._v(t._s(t._f("couponUseTypeFilter")(t.couponDetail.send_type)))])]),t._v(" "),s("div",{staticClass:"list sp"},[s("label",{staticClass:"name"},[t._v("是否限量：")]),t._v(" "),s("span",{staticClass:"info"},[t._v(t._s(t._f("filterClose")(t.couponDetail.is_limited)))])]),t._v(" "),s("div",{staticClass:"list sp"},[s("label",{staticClass:"name"},[t._v("已发布总数：")]),t._v(" "),s("span",{staticClass:"info"},[t._v(t._s(0==t.couponDetail.is_limited?"不限量":t.couponDetail.total_count))])]),t._v(" "),s("div",{staticClass:"list sp"},[s("label",{staticClass:"name"},[t._v("剩余总数：")]),t._v(" "),s("span",{staticClass:"info"},[t._v(t._s(0==t.couponDetail.is_limited?"不限量":t.couponDetail.remain_count))])]),t._v(" "),s("div",{staticClass:"list sp100"},[s("label",{staticClass:"name"},[t._v("已领取/发放总数：")]),t._v(" "),s("span",{staticClass:"info"},[t._v(t._s(t.couponDetail.send_num))]),t._v(" "),s("el-button",{staticClass:"ml20",attrs:{size:"small",type:"text"},on:{click:function(e){return t.receive(t.couponDetail.coupon_id)}}},[t._v("已领取/发放记录")])],1),t._v(" "),s("div",{staticClass:"list sp100"},[s("label",{staticClass:"name"},[t._v("已使用总数：")]),t._v(" "),s("span",{staticClass:"info"},[t._v(t._s(t.couponDetail.used_num))]),t._v(" "),s("el-button",{staticClass:"ml20",attrs:{size:"small",type:"text"},on:{click:function(e){return t.usedRecord(t.couponDetail.coupon_id)}}},[t._v("使用记录")])],1),t._v(" "),s("div",{staticClass:"list sp"},[s("label",{staticClass:"name"},[t._v("排序：")]),t._v(" "),s("span",{staticClass:"info"},[t._v(t._s(t.couponDetail.sort))])]),t._v(" "),s("div",{staticClass:"list sp"},[s("label",{staticClass:"name"},[t._v("状态：")]),t._v(" "),s("span",{staticClass:"info"},[t._v(t._s(t.couponDetail.status?"开启":"关闭"))])])])])]):t._e(),t._v(" "),s("el-dialog",{staticClass:"modalbox",attrs:{title:t.title,visible:t.dialogVisible,"min-width":"500px","before-close":t.handleClose},on:{"update:visible":function(e){t.dialogVisible=e}}},[s("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.Loading,expression:"Loading"}],staticStyle:{width:"100%"},attrs:{data:t.issueData.data,size:"small","highlight-current-row":""}},[s("el-table-column",{attrs:{prop:"user.nickname",label:"用户名","min-width":"120"}}),t._v(" "),s("el-table-column",{attrs:{label:"用户头像","min-width":"80"},scopedSlots:t._u([{key:"default",fn:function(t){return[t.row.user.avatar?s("div",{staticClass:"demo-image__preview"},[s("img",{staticStyle:{width:"36px",height:"36px"},attrs:{src:t.row.user.avatar}})]):s("div",{staticClass:"demo-image__preview"},[s("img",{staticStyle:{width:"36px",height:"36px"},attrs:{src:a("cdfe")}})])]}}])}),t._v(" "),s("el-table-column",{attrs:{label:t.receiveTime,"min-width":"180"},scopedSlots:t._u([{key:"default",fn:function(e){return[0===t.receiveType?s("span",[t._v(t._s(e.row.create_time))]):s("span",[t._v(t._s(e.row.use_time))])]}}])})],1),t._v(" "),s("div",{staticClass:"block"},[s("el-pagination",{attrs:{"page-sizes":[10,20,30,40],"page-size":t.tableFromIssue.limit,"current-page":t.tableFromIssue.page,layout:"total, sizes, prev, pager, next, jumper",total:t.issueData.total},on:{"size-change":t.handleSizeChangeIssue,"current-change":t.pageChangeIssue}})],1)],1)],1)},i=[],l=a("b7be"),n=a("83d6"),o={name:"CouponList",data:function(){return{Loading:!1,dialogVisible:!1,detailDialog:!1,roterPre:n["roterPre"],listLoading:!0,title:"领取/发放记录",receiveTime:"领取时间",receiveType:0,tableData:{data:[],total:0},tableFrom:{page:1,limit:20,status:"",coupon_name:"",type:"",send_type:""},tableFromIssue:{page:1,limit:10,coupon_id:0},issueData:{data:[],total:0},couponDetail:{}}},mounted:function(){this.getList(1)},methods:{handleDelete:function(t,e){var a=this;this.$modalSure().then((function(){Object(l["y"])(t).then((function(t){var s=t.message;a.$message.success(s),a.tableData.data.splice(e,1)})).catch((function(t){var e=t.message;a.$message.error(e)}))}))},handleClose:function(){this.dialogVisible=!1},details:function(t){var e=this;this.detailDialog=!0,Object(l["z"])(t).then((function(t){e.couponDetail=t.data})).catch((function(t){var a=t.message;e.$message.error(a)}))},receive:function(t){this.dialogVisible=!0,this.title="领取/发放记录",this.receiveTime="领取时间",this.receiveType=0,this.tableFromIssue.coupon_id=t,this.getIssueList("")},usedRecord:function(t){this.dialogVisible=!0,this.title="使用记录",this.receiveTime="使用时间",this.receiveType=1,this.tableFromIssue.coupon_id=t,this.getIssueList(1)},getIssueList:function(t){var e=this;this.Loading=!0,this.tableFromIssue.status=t,Object(l["I"])(this.tableFromIssue).then((function(t){e.issueData.data=t.data.list,e.issueData.total=t.data.count,e.Loading=!1})).catch((function(t){e.Loading=!1,e.$message.error(t.message)}))},pageChangeIssue:function(t){this.tableFromIssue.page=t,this.getIssueList("")},handleSizeChangeIssue:function(t){this.tableFromIssue.limit=t,this.getIssueList("")},getList:function(t){var e=this;this.listLoading=!0,this.tableFrom.page=t||this.tableFrom.page,Object(l["A"])(this.tableFrom).then((function(t){e.tableData.data=t.data.list,e.tableData.total=t.data.count,e.listLoading=!1})).catch((function(t){e.listLoading=!1,e.$message.error(t.message)}))},pageChange:function(t){this.tableFrom.page=t,this.getList("")},handleSizeChange:function(t){this.tableFrom.limit=t,this.getList("")},onchangeIsShow:function(t){var e=this;Object(l["C"])(t.coupon_id,t.status).then((function(t){var a=t.message;e.$message.success(a),e.getList("")})).catch((function(t){var a=t.message;e.$message.error(a)}))}}},c=o,r=(a("bdf0"),a("2877")),u=Object(r["a"])(c,s,i,!1,null,"b32529e2",null);e["default"]=u.exports},bdf0:function(t,e,a){"use strict";var s=a("e423"),i=a.n(s);i.a},cdfe:function(t,e,a){t.exports=a.p+"mer/img/f.5aa43cd3.png"},e423:function(t,e,a){}}]);
(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-78e9d75c"],{"2c03":function(t,a,e){"use strict";e("995b")},"995b":function(t,a,e){},b7be:function(t,a,e){"use strict";e.d(a,"y",(function(){return i})),e.d(a,"z",(function(){return o})),e.d(a,"A",(function(){return n})),e.d(a,"B",(function(){return l})),e.d(a,"x",(function(){return r})),e.d(a,"e",(function(){return c})),e.d(a,"k",(function(){return u})),e.d(a,"c",(function(){return d})),e.d(a,"b",(function(){return m})),e.d(a,"d",(function(){return _})),e.d(a,"h",(function(){return p})),e.d(a,"g",(function(){return f})),e.d(a,"l",(function(){return b})),e.d(a,"a",(function(){return v})),e.d(a,"G",(function(){return g})),e.d(a,"D",(function(){return h})),e.d(a,"F",(function(){return C})),e.d(a,"C",(function(){return w})),e.d(a,"E",(function(){return D})),e.d(a,"H",(function(){return F})),e.d(a,"f",(function(){return y})),e.d(a,"j",(function(){return k})),e.d(a,"i",(function(){return x})),e.d(a,"v",(function(){return S})),e.d(a,"n",(function(){return L})),e.d(a,"q",(function(){return $})),e.d(a,"r",(function(){return z})),e.d(a,"p",(function(){return j})),e.d(a,"s",(function(){return O})),e.d(a,"w",(function(){return E})),e.d(a,"u",(function(){return V})),e.d(a,"t",(function(){return I})),e.d(a,"m",(function(){return B})),e.d(a,"o",(function(){return G}));var s=e("0c6d");function i(t){return s["a"].get("store/coupon/detail/".concat(t))}function o(t){return s["a"].get("store/coupon/lst",t)}function n(t,a){return s["a"].post("store/coupon/status/".concat(t),{status:a})}function l(t){return s["a"].get("store/coupon/issue",t)}function r(t){return s["a"].delete("store/coupon/delete/".concat(t))}function c(t){return s["a"].get("broadcast/room/lst",t)}function u(t,a){return s["a"].post("broadcast/room/status/".concat(t),a)}function d(t){return s["a"].delete("broadcast/room/delete/".concat(t))}function m(t){return s["a"].get("broadcast/room/apply/form/".concat(t))}function _(t){return s["a"].get("broadcast/room/detail/".concat(t))}function p(t){return s["a"].get("broadcast/goods/lst",t)}function f(t){return s["a"].get("broadcast/goods/detail/".concat(t))}function b(t,a){return s["a"].post("broadcast/goods/status/".concat(t),a)}function v(t){return s["a"].get("broadcast/goods/apply/form/".concat(t))}function g(){return s["a"].get("seckill/config/create/form")}function h(t){return s["a"].get("seckill/config/lst",t)}function C(t){return s["a"].get("seckill/config/update/".concat(t,"/form"))}function w(t){return s["a"].delete("seckill/config/delete/".concat(t))}function D(t,a){return s["a"].post("seckill/config/status/".concat(t),{status:a})}function F(t,a){return s["a"].get("broadcast/room/goods/".concat(t),a)}function y(t){return s["a"].delete("broadcast/goods/delete/".concat(t))}function k(t,a){return s["a"].post("broadcast/room/sort/".concat(t),a)}function x(t,a){return s["a"].post("broadcast/goods/sort/".concat(t),a)}function S(t){return s["a"].post("config/others/group_buying",t)}function L(){return s["a"].get("config/others/group_buying")}function $(t){return s["a"].get("store/product/group/lst",t)}function z(t){return s["a"].get("store/product/group/get/".concat(t))}function j(t){return s["a"].get("store/product/group/detail/".concat(t))}function O(t){return s["a"].post("store/product/group/status",t)}function E(t,a){return s["a"].post("store/product/group/is_show/".concat(t),{status:a})}function V(t){return s["a"].get("store/product/group/get/".concat(t))}function I(t,a){return s["a"].post("store/product/group/update/".concat(t),a)}function B(t){return s["a"].get("store/product/group/buying/lst",t)}function G(t,a){return s["a"].get("store/product/group/buying/detail/".concat(t),a)}},c3af:function(t,a,e){"use strict";e("e7ed")},e6d3:function(t,a,e){"use strict";e.r(a);var s=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"divBox"},[e("el-card",{staticClass:"box-card"},[e("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[e("div",{staticClass:"container"},[e("el-form",{attrs:{size:"small","label-width":"100px"}},[e("el-form-item",{attrs:{label:"状态："}},[e("el-radio-group",{attrs:{type:"button"},on:{change:function(a){return t.getList(1)}},model:{value:t.tableFrom.status_tag,callback:function(a){t.$set(t.tableFrom,"status_tag",a)},expression:"tableFrom.status_tag"}},[e("el-radio-button",{attrs:{label:""}},[t._v("全部")]),t._v(" "),e("el-radio-button",{attrs:{label:"0"}},[t._v("待审核")]),t._v(" "),e("el-radio-button",{attrs:{label:"1"}},[t._v("审核已通过")]),t._v(" "),e("el-radio-button",{attrs:{label:"-1"}},[t._v("审核未通过")])],1)],1),t._v(" "),e("el-form-item",{staticStyle:{display:"inline-block"},attrs:{label:"商户类别："}},[e("el-select",{staticClass:"selWidth",attrs:{clearable:"",placeholder:"请选择"},on:{change:function(a){return t.getList(1)}},model:{value:t.tableFrom.is_trader,callback:function(a){t.$set(t.tableFrom,"is_trader",a)},expression:"tableFrom.is_trader"}},[e("el-option",{attrs:{label:"自营",value:"1"}}),t._v(" "),e("el-option",{attrs:{label:"非自营",value:"0"}})],1)],1),t._v(" "),e("el-form-item",{staticClass:"width100",staticStyle:{display:"inline-block"},attrs:{label:"关键字："}},[e("el-input",{staticClass:"selWidth",attrs:{placeholder:"请输入直播间名称/ID/主播昵称/微信号",size:"small"},model:{value:t.tableFrom.keyword,callback:function(a){t.$set(t.tableFrom,"keyword",a)},expression:"tableFrom.keyword"}},[e("el-button",{attrs:{slot:"append",icon:"el-icon-search"},on:{click:function(a){return t.getList(1)}},slot:"append"})],1)],1)],1)],1)]),t._v(" "),e("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.listLoading,expression:"listLoading"}],staticStyle:{width:"100%"},attrs:{data:t.tableData.data,size:"small","highlight-current-row":""}},[e("el-table-column",{attrs:{label:"序号","min-width":"60"},scopedSlots:t._u([{key:"default",fn:function(a){return[e("span",[t._v(t._s(a.$index+(t.tableFrom.page-1)*t.tableFrom.limit+1))])]}}])}),t._v(" "),e("el-table-column",{attrs:{label:"商户名称","min-width":"90"},scopedSlots:t._u([{key:"default",fn:function(a){return[e("span",[t._v(t._s(a.row.merchant?a.row.merchant.mer_name:""))])]}}])}),t._v(" "),e("el-table-column",{attrs:{prop:"mer_name",label:"商户类别","min-width":"90"},scopedSlots:t._u([{key:"default",fn:function(a){return[a.row.merchant?e("span",{staticClass:"spBlock"},[t._v(t._s(a.row.merchant.is_trader?"自营":"非自营"))]):t._e()]}}])}),t._v(" "),e("el-table-column",{attrs:{prop:"broadcast_room_id",label:"ID","min-width":"60"}}),t._v(" "),e("el-table-column",{attrs:{prop:"name",label:"直播间名称","min-width":"90"}}),t._v(" "),1==t.tableFrom.status_tag?e("el-table-column",{key:"1",attrs:{prop:"broadcast_room_id",label:"直播间ID","min-width":"80"}}):t._e(),t._v(" "),e("el-table-column",{attrs:{prop:"anchor_name",label:"主播昵称","min-width":"90"}}),t._v(" "),e("el-table-column",{attrs:{prop:"anchor_wechat",label:"主播微信号","min-width":"100"}}),t._v(" "),e("el-table-column",{attrs:{prop:"start_time","min-width":"150",label:"直播开始时间"}}),t._v(" "),e("el-table-column",{attrs:{prop:"end_time","min-width":"150",label:"直播计划结束时间"}}),t._v(" "),e("el-table-column",{attrs:{label:"直播状态","min-width":"100"},scopedSlots:t._u([{key:"default",fn:function(a){return[e("span",[t._v(t._s(t._f("broadcastStatusFilter")(a.row.live_status)))])]}}])}),t._v(" "),e("el-table-column",{attrs:{prop:"create_time","min-width":"150",label:"创建时间"}}),t._v(" "),e("el-table-column",{attrs:{prop:"sort","min-width":"60",label:"排序"}}),t._v(" "),e("el-table-column",{attrs:{label:"显示状态","min-width":"100"},scopedSlots:t._u([{key:"default",fn:function(a){return[e("el-switch",{attrs:{"active-value":1,"inactive-value":0,"active-text":"显示","inactive-text":"隐藏"},nativeOn:{click:function(e){return t.onchangeIsShow(a.row)}},model:{value:a.row.is_show,callback:function(e){t.$set(a.row,"is_show",e)},expression:"scope.row.is_show"}})]}}])}),t._v(" "),e("el-table-column",{attrs:{label:"审核状态","min-width":"100"},scopedSlots:t._u([{key:"default",fn:function(a){return[e("span",[t._v(t._s(t._f("liveReviewStatusFilter")(a.row.status)))]),t._v(" "),-1==a.row.status?e("span",{staticStyle:{display:"block","font-size":"12px"}},[t._v("原因 "+t._s(a.row.error_msg))]):t._e()]}}])}),t._v(" "),e("el-table-column",{attrs:{label:"操作","min-width":"150",fixed:"right"},scopedSlots:t._u([{key:"default",fn:function(a){return[0==a.row.status?e("el-button",{attrs:{type:"text",size:"small"},on:{click:function(e){return t.handleAudit(a.row.broadcast_room_id)}}},[t._v("审核")]):t._e(),t._v(" "),e("el-button",{staticClass:"mr10",attrs:{type:"text",size:"small"},on:{click:function(e){return t.onStudioDetails(a.row.broadcast_room_id)}}},[t._v("详情")]),t._v(" "),e("el-button",{staticClass:"mr10",attrs:{type:"text",size:"small"},on:{click:function(e){return t.handleEdit(a.row.broadcast_room_id)}}},[t._v("编辑")]),t._v(" "),e("el-button",{attrs:{type:"text",size:"small"},on:{click:function(e){return t.handleDelete(a.row,a.$index)}}},[t._v("删除")])]}}])})],1),t._v(" "),e("div",{staticClass:"block"},[e("el-pagination",{attrs:{"page-sizes":[20,40,60,80],"page-size":t.tableFrom.limit,"current-page":t.tableFrom.page,layout:"total, sizes, prev, pager, next, jumper",total:t.tableData.total},on:{"size-change":t.handleSizeChange,"current-change":t.pageChange}})],1)],1),t._v(" "),e("details-from",{ref:"studioDetail",on:{getList:t.getList}})],1)},i=[],o=e("b7be"),n=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"divBox"},[t.dialogVisible?e("el-dialog",{attrs:{title:"直播间信息",visible:t.dialogVisible,width:"700px"},on:{"update:visible":function(a){t.dialogVisible=a}}},[e("div",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}]},[e("div",{staticClass:"box-container"},[e("div",{staticClass:"list sp"},[e("label",{staticClass:"name"},[t._v("直播间名称：")]),t._v(" "),e("span",{staticClass:"info"},[t._v(t._s(t.FormData.name))])]),t._v(" "),e("div",{staticClass:"list sp"},[e("label",{staticClass:"name"},[t._v("主播微信号：")]),t._v(" "),e("span",{staticClass:"info"},[t._v(t._s(t.FormData.anchor_wechat))])]),t._v(" "),e("div",{staticClass:"list sp"},[e("label",{staticClass:"name"},[t._v("直播间ID：")]),t._v(" "),e("span",{staticClass:"info"},[t._v(t._s(t.FormData.broadcast_room_id))])]),t._v(" "),e("div",{staticClass:"list sp"},[e("label",{staticClass:"name"},[t._v("主播昵称：")]),t._v(" "),e("span",{staticClass:"info"},[t._v(t._s(t.FormData.anchor_name))])]),t._v(" "),e("div",{staticClass:"list sp"},[e("label",{staticClass:"name"},[t._v("手机号：")]),t._v(" "),e("span",{staticClass:"info"},[t._v(t._s(t.FormData.phone))])]),t._v(" "),e("div",{staticClass:"list sp"},[e("label",{staticClass:"name"},[t._v("审核结果：")]),t._v(" "),e("span",{staticClass:"info"},[t._v(t._s(t._f("liveReviewStatusFilter")(t.FormData.status)))])]),t._v(" "),e("div",{staticClass:"list sp"},[e("label",{staticClass:"name"},[t._v("直播开始时间：")]),t._v(" "),e("span",{staticClass:"info"},[t._v(t._s(t.FormData.start_time))])]),t._v(" "),e("div",{staticClass:"list sp"},[e("label",{staticClass:"name"},[t._v("直播结束时间：")]),t._v(" "),e("span",{staticClass:"info"},[t._v(t._s(t.FormData.end_time))])]),t._v(" "),e("div",{staticClass:"list sp"},[e("label",{staticClass:"name"},[t._v("直播间类型：")]),t._v(" "),e("span",{staticClass:"info"},[t._v(t._s(t._f("broadcastType")(t.FormData.type)))])]),t._v(" "),e("div",{staticClass:"list sp"},[e("label",{staticClass:"name"},[t._v("显示类型：")]),t._v(" "),e("span",{staticClass:"info"},[t._v(t._s(t._f("broadcastDisplayType")(t.FormData.screen_type)))])]),t._v(" "),e("div",{staticClass:"list sp image"},[e("label",{staticClass:"name"},[t._v("背景图：")]),t._v(" "),e("img",{staticStyle:{"max-width":"150px",height:"80px"},attrs:{src:t.FormData.cover_img}})]),t._v(" "),e("div",{staticClass:"list sp image"},[e("label",{staticClass:"name"},[t._v("分享图：")]),t._v(" "),e("img",{staticStyle:{"max-width":"150px",height:"80px"},attrs:{src:t.FormData.share_img}})]),t._v(" "),e("div",{staticClass:"list sp"},[e("label",{staticClass:"name"},[t._v("是否开启点赞：")]),t._v(" "),e("span",{staticClass:"info blue"},[t._v(t._s(t._f("filterClose")(t.FormData.close_like)))])]),t._v(" "),e("div",{staticClass:"list sp"},[e("label",{staticClass:"name"},[t._v("是否开启货架：")]),t._v(" "),e("span",{staticClass:"info blue"},[t._v(t._s(t._f("filterClose")(t.FormData.close_goods)))])]),t._v(" "),e("div",{staticClass:"list sp"},[e("label",{staticClass:"name"},[t._v("是否开启评论：")]),t._v(" "),e("span",{staticClass:"info blue"},[t._v(t._s(t._f("filterClose")(t.FormData.close_comment)))])]),t._v(" "),e("div",{staticClass:"list sp"},[e("label",{staticClass:"name"},[t._v("是否开启直播回放：")]),t._v(" "),e("span",{staticClass:"info blue"},[t._v(t._s(t.FormData.replay_status?"✔":"✖"))])]),t._v(" "),e("div",{staticClass:"list sp"},[e("label",{staticClass:"name"},[t._v("是否开启分享：")]),t._v(" "),e("span",{staticClass:"info blue"},[t._v(t._s(t.FormData.close_share?"✖":"✔"))])]),t._v(" "),e("div",{staticClass:"list sp"},[e("label",{staticClass:"name"},[t._v("是否开启客服：")]),t._v(" "),e("span",{staticClass:"info blue"},[t._v(t._s(t.FormData.close_kf?"✖":"✔"))])]),t._v(" "),t.isEdit?e("div",{staticClass:"list"},[e("label",{staticClass:"name"},[t._v("排序：")]),t._v(" "),e("el-input",{staticClass:"selWidth",staticStyle:{"padding-right":"0"},attrs:{type:"number",placeholder:"请输入序号",size:"small"},model:{value:t.FormData.sort,callback:function(a){t.$set(t.FormData,"sort",t._n(a))},expression:"FormData.sort"}}),t._v(" "),e("el-button",{staticStyle:{width:"80px"},attrs:{size:"small",type:"primary"},on:{click:t.handleSort}},[t._v("确定")])],1):e("div",{staticClass:"list sp"},[e("label",{staticClass:"name"},[t._v("排序：")]),t._v(" "),e("span",{staticClass:"info"},[t._v(t._s(t.FormData.sort))])]),t._v(" "),2===t.FormData.status?e("div",{staticClass:"list sp100"},[e("label",{staticClass:"name"},[t._v("已导入直播商品：")]),t._v(" "),e("selected-goods",{ref:"selectedGoods",attrs:{broadcast_room_id:t.FormData.broadcast_room_id}})],1):t._e()])])]):t._e()],1)},l=[],r=(e("55dd"),function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"importedGoods"},[e("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.listLoading,expression:"listLoading"}],ref:"table",staticStyle:{width:"100%"},attrs:{data:t.tableData.data,size:"samll","highlight-current-row":""}},[e("el-table-column",{attrs:{prop:"broadcast_goods_id",label:"ID","min-width":"50"}}),t._v(" "),e("el-table-column",{attrs:{label:"商品图","min-width":"80"},scopedSlots:t._u([{key:"default",fn:function(t){return[e("div",{staticClass:"demo-image__preview"},[e("el-image",{staticStyle:{width:"36px",height:"36px"},attrs:{src:t.row.cover_img,"preview-src-list":[t.row.cover_img]}})],1)]}}])}),t._v(" "),e("el-table-column",{attrs:{prop:"store_name",label:"商品名称","min-width":"200"},scopedSlots:t._u([{key:"default",fn:function(a){return[e("span",[t._v(t._s(a.row.product.store_name))])]}}])}),t._v(" "),e("el-table-column",{attrs:{label:"库存","min-width":"80"},scopedSlots:t._u([{key:"default",fn:function(a){return[e("span",[t._v(t._s(a.row.product.stock))])]}}])}),t._v(" "),e("el-table-column",{attrs:{prop:"price",label:"直播价","min-width":"80"}}),t._v(" "),e("el-table-column",{attrs:{prop:"pay_num",label:"销售数量","min-width":"80"}}),t._v(" "),e("el-table-column",{attrs:{prop:"pay_price",label:"销售金额","min-width":"80"}})],1),t._v(" "),e("div",{staticClass:"block mb20"},[e("el-pagination",{attrs:{"page-sizes":[3,6,9],"page-size":t.tableFrom.limit,"current-page":t.tableFrom.page,layout:"total, sizes, prev, pager, next, jumper",total:t.tableData.total},on:{"size-change":t.handleSizeChange,"current-change":t.pageChange}})],1)],1)}),c=[],u=(e("c5f6"),{name:"GoodsList",data:function(){return{listLoading:!0,multipleSelection:[],tableData:{data:[],total:0},tableFrom:{page:1,limit:3,cate_id:"",store_name:"",keyword:""}}},props:{broadcast_room_id:{type:Number}},watch:{broadcast_room_id:{deep:!0,handler:function(t){this.getList(t)}}},mounted:function(){this.getList(this.broadcast_room_id)},methods:{getList:function(t){var a=this;this.listLoading=!0,Object(o["H"])(t,this.tableFrom).then((function(t){a.tableData.data=t.data.list,a.tableData.total=t.data.count,a.listLoading=!1})).catch((function(t){a.listLoading=!1,a.$message.error(t.message)}))},pageChange:function(t){this.tableFrom.page=t,this.getList(this.broadcast_room_id)},handleSizeChange:function(t){this.tableFrom.limit=t,this.getList(this.broadcast_room_id)}}}),d=u,m=e("2877"),_=Object(m["a"])(d,r,c,!1,null,"65106882",null),p=_.exports,f={name:"studioDetail",components:{selectedGoods:p},data:function(){return{dialogVisible:!1,isEdit:!1,option:{form:{labelWidth:"150px"}},FormData:{sort:0},loading:!1}},mounted:function(){},methods:{getData:function(t){var a=this;this.loading=!0,Object(o["d"])(t).then((function(t){a.FormData=t.data,a.loading=!1,console.log(a.FormData)})).catch((function(t){a.$message.error(t.message),a.loading=!1}))},handleSort:function(){var t=this;Object(o["j"])(this.FormData.broadcast_room_id,{sort:this.FormData.sort}).then((function(a){t.$emit("getList"),t.$message.success(a.message),t.dialogVisible=!1})).catch((function(a){t.$message.error(a.message)}))}}},b=f,v=(e("c3af"),Object(m["a"])(b,n,l,!1,null,"4e87ddaa",null)),g=v.exports,h=e("83d6"),C={name:"StudioList",components:{detailsFrom:g},data:function(){return{Loading:!1,dialogVisible:!1,broadcast_room_id:0,roterPre:h["roterPre"],listLoading:!0,tableData:{data:[],total:0},tableFrom:{page:1,limit:20,status_tag:"",is_trader:""}}},mounted:function(){this.getList()},methods:{handleDelete:function(t,a){var e=this;2==t.status&&101==t.live_status?this.$confirm("该直播间正在进行直播，删除后不可恢复，您确认删除吗？","提示",{confirmButtonText:"删除",cancelButtonText:"不删除",type:"warning"}).then((function(){Object(o["c"])(t.broadcast_room_id).then((function(t){var s=t.message;e.$message.success(s),e.tableData.data.splice(a,1)})).catch((function(t){var a=t.message;e.$message.error(a)}))})).catch((function(t){e.$message({type:"info",message:"已取消"})})):this.$modalSureDelete().then((function(){Object(o["c"])(t.broadcast_room_id).then((function(t){var s=t.message;e.$message.success(s),e.tableData.data.splice(a,1)})).catch((function(t){var a=t.message;e.$message.error(a)}))}))},onStudioDetails:function(t){this.broadcast_room_id=t,this.$refs.studioDetail.dialogVisible=!0,this.$refs.studioDetail.isEdit=!1,this.$refs.studioDetail.getData(t)},handleEdit:function(t){this.broadcast_room_id=t,this.$refs.studioDetail.dialogVisible=!0,this.$refs.studioDetail.isEdit=!0,this.$refs.studioDetail.getData(t)},getList:function(t){var a=this;this.listLoading=!0,this.tableFrom.page=t||this.tableFrom.page,Object(o["e"])(this.tableFrom).then((function(t){a.tableData.data=t.data.list,a.tableData.total=t.data.count,a.listLoading=!1})).catch((function(t){a.listLoading=!1,a.$message.error(t.message)}))},pageChange:function(t){this.tableFrom.page=t,this.getList()},handleSizeChange:function(t){this.tableFrom.limit=t,this.getList()},handleAudit:function(t){var a=this;this.$modalForm(Object(o["b"])(t)).then((function(){return a.getList()}))},onchangeIsShow:function(t){var a=this;Object(o["k"])(t.broadcast_room_id,{is_show:t.is_show}).then((function(t){var e=t.message;a.$message.success(e),a.getList()})).catch((function(t){var e=t.message;a.$message.error(e)}))}}},w=C,D=(e("2c03"),Object(m["a"])(w,s,i,!1,null,"4894a21b",null));a["default"]=D.exports},e7ed:function(t,a,e){}}]);
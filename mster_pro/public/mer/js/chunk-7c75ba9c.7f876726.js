(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-7c75ba9c"],{"0306":function(e,t,a){"use strict";var i=a("dd77"),s=a.n(i);s.a},"0898":function(e,t,a){"use strict";var i=a("c945"),s=a.n(i);s.a},7514:function(e,t,a){"use strict";var i=a("5ca1"),s=a("0a49")(5),l="find",n=!0;l in[]&&Array(1)[l]((function(){n=!1})),i(i.P+i.F*n,"Array",{find:function(e){return s(this,e,arguments.length>1?arguments[1]:void 0)}}),a("9c6c")(l)},b9c2:function(e,t,a){"use strict";a.r(t);var i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"divBox"},[a("el-card",{staticClass:"box-card"},[a("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[a("el-tabs",{on:{"tab-click":function(t){return e.getList(1)}},model:{value:e.user_type,callback:function(t){e.user_type=t},expression:"user_type"}},[a("el-tab-pane",{attrs:{label:"全部用户",name:""}}),e._v(" "),a("el-tab-pane",{attrs:{label:"微信用户",name:"wechat"}}),e._v(" "),a("el-tab-pane",{attrs:{label:"小程序用户",name:"routine"}}),e._v(" "),a("el-tab-pane",{attrs:{label:"H5用户",name:"h5"}})],1),e._v(" "),a("div",{staticClass:"container"},[a("el-form",{attrs:{inline:"",size:"small","label-position":e.labelPosition,"label-width":"100px"}},[a("el-row",[a("el-col",{attrs:{xs:24,sm:24,md:24,lg:18,xl:18}},[a("el-col",e._b({},"el-col",e.grid,!1),[a("el-form-item",{attrs:{label:"用户昵称："}},[a("el-input",{staticClass:"selWidth",attrs:{placeholder:"请输入昵称",clearable:""},model:{value:e.userFrom.nickname,callback:function(t){e.$set(e.userFrom,"nickname",t)},expression:"userFrom.nickname"}})],1)],1)],1),e._v(" "),e.collapse?[a("el-col",{attrs:{xs:24,sm:24,md:24,lg:18,xl:18}},[a("el-col",e._b({},"el-col",e.grid,!1),[a("el-form-item",{attrs:{label:"用户标签："}},[a("el-select",{staticClass:"selWidth",attrs:{placeholder:"请选择",clearable:"",filterable:""},model:{value:e.userFrom.label_id,callback:function(t){e.$set(e.userFrom,"label_id",t)},expression:"userFrom.label_id"}},[a("el-option",{attrs:{value:""}},[e._v("全部")]),e._v(" "),e._l(e.labelLists,(function(e,t){return a("el-option",{key:t,attrs:{value:e.label_id,label:e.label_name}})}))],2)],1)],1)],1),e._v(" "),a("el-col",{attrs:{xs:24,sm:24,md:24,lg:18,xl:18}},[a("el-col",e._b({},"el-col",e.grid,!1),[a("el-form-item",{attrs:{label:"性别："}},[a("el-radio-group",{staticClass:"selWidth",attrs:{type:"button"},model:{value:e.userFrom.sex,callback:function(t){e.$set(e.userFrom,"sex",t)},expression:"userFrom.sex"}},[a("el-radio-button",{attrs:{label:""}},[a("span",[e._v("全部")])]),e._v(" "),a("el-radio-button",{attrs:{label:"1"}},[a("span",[e._v("男")])]),e._v(" "),a("el-radio-button",{attrs:{label:"2"}},[a("span",[e._v("女")])]),e._v(" "),a("el-radio-button",{attrs:{label:"0"}},[a("span",[e._v("保密")])])],1)],1)],1),e._v(" "),a("el-col",e._b({},"el-col",e.grid,!1),[a("el-form-item",{attrs:{label:"身份："}},[a("el-radio-group",{staticClass:"selWidth",attrs:{type:"button"},model:{value:e.userFrom.is_promoter,callback:function(t){e.$set(e.userFrom,"is_promoter",t)},expression:"userFrom.is_promoter"}},[a("el-radio-button",{attrs:{label:""}},[a("span",[e._v("全部")])]),e._v(" "),a("el-radio-button",{attrs:{label:"1"}},[a("span",[e._v("推广员")])]),e._v(" "),a("el-radio-button",{attrs:{label:"0"}},[a("span",[e._v("普通用户")])])],1)],1)],1)],1),e._v(" "),a("el-col",{attrs:{xs:24,sm:24,md:24,lg:18,xl:18}},[a("el-col",e._b({},"el-col",e.grid,!1),[a("el-form-item",{attrs:{label:"访问情况："}},[a("el-select",{staticClass:"selWidth",attrs:{placeholder:"请选择",clearable:""},model:{value:e.userFrom.user_time_type,callback:function(t){e.$set(e.userFrom,"user_time_type",t)},expression:"userFrom.user_time_type"}},[a("el-option",{attrs:{value:"visit",label:"最后访问"}}),e._v(" "),a("el-option",{attrs:{value:"add_time",label:"首次访问"}})],1)],1)],1),e._v(" "),a("el-col",e._b({},"el-col",e.grid,!1),[a("el-form-item",{attrs:{label:"消费情况："}},[a("el-select",{staticClass:"selWidth",attrs:{placeholder:"请选择",clearable:""},model:{value:e.userFrom.pay_count,callback:function(t){e.$set(e.userFrom,"pay_count",t)},expression:"userFrom.pay_count"}},[a("el-option",{attrs:{value:"-1",label:"0次"}}),e._v(" "),a("el-option",{attrs:{value:"0",label:"1次以上"}}),e._v(" "),a("el-option",{attrs:{value:"1",label:"2次以上"}}),e._v(" "),a("el-option",{attrs:{value:"2",label:"3次以上"}}),e._v(" "),a("el-option",{attrs:{value:"3",label:"4次以上"}}),e._v(" "),a("el-option",{attrs:{value:"4",label:"5次以上"}})],1)],1)],1)],1),e._v(" "),a("el-col",{attrs:{xs:24,sm:24,md:24,lg:18,xl:18}},[a("el-col",e._b({},"el-col",e.grid,!1),[a("el-form-item",{staticClass:"timeBox",attrs:{label:"访问时间："}},[a("el-date-picker",{staticClass:"selWidth",attrs:{"value-format":"yyyy/MM/dd",align:"right","unlink-panels":"",format:"yyyy/MM/dd",size:"small",type:"daterange",placement:"bottom-end",placeholder:"自定义时间","picker-options":e.pickerOptions},on:{change:e.onchangeTime},model:{value:e.timeVal,callback:function(t){e.timeVal=t},expression:"timeVal"}})],1)],1)],1)]:e._e(),e._v(" "),a("el-col",{staticClass:"text-right userFrom",attrs:{xs:24,sm:24,md:24,lg:6,xl:6}},[a("el-form-item",[a("el-button",{staticClass:"mr15",attrs:{type:"primary",icon:"ios-search",label:"default",size:"small"},on:{click:e.userSearchs}},[e._v("搜索")]),e._v(" "),a("el-button",{staticClass:"ResetSearch mr10",attrs:{size:"small",type:"reset"},on:{click:function(t){return e.reset("userFrom")}}},[e._v("重置")]),e._v(" "),a("a",{staticClass:"ivu-ml-8",on:{click:function(t){e.collapse=!e.collapse}}},[e.collapse?[e._v("\n                                        收起 "),a("i",{staticClass:"el-icon-arrow-up"})]:[e._v("\n                                        展开 "),a("i",{staticClass:"el-icon-arrow-down"})]],2)],1)],1)],2)],1)],1)],1),e._v(" "),a("div",[a("el-button",{staticClass:"mr15",staticStyle:{"margin-bottom":"20px"},attrs:{type:"primary",icon:"ios-search",label:"default",size:"small"},on:{click:e.sendCoupon}},[e._v("发送优惠券")]),e._v(" "),e.checkedIds.length>0||e.allCheck?a("el-alert",{attrs:{title:e.allCheck?"已选择  "+e.tableData.total+"  项":"已选择  "+e.checkedIds.length+"  项",type:"info","show-icon":""}}):e._e()],1),e._v(" "),a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.listLoading,expression:"listLoading"}],staticStyle:{width:"100%"},attrs:{data:e.tableData.data,size:"small"}},[a("el-table-column",{attrs:{width:"50"},scopedSlots:e._u([{key:"header",fn:function(t){return[a("el-popover",{staticClass:"tabPop",attrs:{placement:"top-start",width:"100",trigger:"hover"}},[a("div",[a("span",{staticClass:"spBlock onHand",class:{check:"dan"===e.chkName},on:{click:function(a){return e.onHandle("dan",t.$index)}}},[e._v("选中本页")]),e._v(" "),a("span",{staticClass:"spBlock onHand",class:{check:"duo"===e.chkName},on:{click:function(t){return e.onHandle("duo")}}},[e._v("选中全部")])]),e._v(" "),a("el-checkbox",{attrs:{slot:"reference",value:"dan"===e.chkName&&e.checkedPage.indexOf(e.userFrom.page)>-1||"duo"===e.chkName},on:{change:e.changeType},slot:"reference"})],1)]}},{key:"default",fn:function(t){return[a("el-checkbox",{attrs:{value:e.checkedIds.indexOf(t.row.uid)>-1||"duo"===e.chkName&&-1===e.noChecked.indexOf(t.row.uid)},on:{change:function(a){return e.changeOne(a,t.row)}}})]}}])}),e._v(" "),a("el-table-column",{attrs:{prop:"user_merchant_id",label:"ID","min-width":"60"}}),e._v(" "),a("el-table-column",{attrs:{label:"头像","min-width":"50"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("div",{staticClass:"demo-image__preview"},[a("el-image",{staticStyle:{width:"36px",height:"36px"},attrs:{src:t.row.avatar?t.row.avatar:e.moren,"preview-src-list":[t.row.avatar||e.moren]}})],1)]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"昵称","min-width":"90"},scopedSlots:e._u([{key:"default",fn:function(t){var i=t.row;return[a("div",{staticClass:"acea-row"},[a("i",{directives:[{name:"show",rawName:"v-show",value:1===i.sex,expression:"row.sex===1"}],staticClass:"el-icon-male mr5",staticStyle:{"font-size":"15px","margin-top":"3px",color:"#2db7f5"}}),e._v(" "),a("i",{directives:[{name:"show",rawName:"v-show",value:2===i.sex,expression:"row.sex===2"}],staticClass:"el-icon-female mr5",staticStyle:{"font-size":"15px","margin-top":"3px",color:"#ed4014"}}),e._v(" "),a("div",{domProps:{textContent:e._s(i.nickname)}})]),e._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:i.vip_name,expression:"row.vip_name"}],staticClass:"vipName"},[e._v(e._s(i.vip_name))])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"首次访问时间",prop:"create_time","min-width":"120"}}),e._v(" "),a("el-table-column",{attrs:{label:"用户类型","min-width":"100"},scopedSlots:e._u([{key:"default",fn:function(t){var i=t.row;return[a("span",[e._v(e._s("routine"===i.user_type?"小程序":"wechat"===i.user_type?"公众号":"H5"))])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"首次消费时间",prop:"first_pay_time","min-width":"120"}}),e._v(" "),a("el-table-column",{attrs:{label:"最近消费时间",prop:"last_pay_time","min-width":"120"}}),e._v(" "),a("el-table-column",{attrs:{label:"标签","min-width":"100"},scopedSlots:e._u([{key:"default",fn:function(t){var i=t.row;return[a("span",[e._v(" "+e._s(i.label.join("、")))])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"操作","min-width":"130",fixed:"right"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{staticClass:"mr10",attrs:{type:"text",size:"small"},on:{click:function(a){return e.onDetails(t.row)}}},[e._v("详情")]),e._v(" "),a("el-button",{staticClass:"mr10",attrs:{type:"text",size:"small"},on:{click:function(a){return e.setLabel(t.row.user_merchant_id)}}},[e._v("设置标签")])]}}])})],1),e._v(" "),a("div",{staticClass:"block"},[a("el-pagination",{attrs:{"page-sizes":[20,40,60,80],"page-size":e.userFrom.limit,"current-page":e.userFrom.page,layout:"total, sizes, prev, pager, next, jumper",total:e.tableData.total},on:{"size-change":e.handleSizeChange,"current-change":e.pageChange}})],1)],1),e._v(" "),e.visibleDetail?a("el-dialog",{attrs:{title:"用户详情",visible:e.visibleDetail,width:"1000px","before-close":e.Close},on:{"update:visible":function(t){e.visibleDetail=t}}},[e.visibleDetail?a("user-details",{ref:"userDetails",attrs:{uid:e.uid,row:e.row}}):e._e()],1):e._e(),e._v(" "),e.visibleCoupon?a("el-dialog",{attrs:{title:"优惠券列表",visible:e.visibleCoupon,width:"1000px"},on:{"update:visible":function(t){e.visibleCoupon=t}}},[e.visibleCoupon?a("coupon-List",{ref:"couponList",attrs:{couponForm:e.couponForm,checkedIds:e.checkedIds,allCheck:e.allCheck,userFrom:e.userFrom},on:{sendSuccess:e.sendSuccess}}):e._e()],1):e._e()],1)},s=[],l=(a("456d"),a("7514"),a("ac6a"),a("c24f")),n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[e.psInfo?a("div",{staticClass:"acea-row row-middle"},[a("div",{staticClass:"avatar mr15"},[a("div",{staticClass:"block"},[a("el-avatar",{attrs:{size:50,src:e.psInfo.avatar?e.psInfo.avatar:e.moren}})],1)]),e._v(" "),a("div",{staticClass:"dashboard-workplace-header-tip"},[a("p",{staticClass:"dashboard-workplace-header-tip-title",domProps:{textContent:e._s(e.psInfo.nickname||"-")}}),e._v(" "),a("div",{staticClass:"dashboard-workplace-header-tip-desc"},[a("span",{staticClass:"dashboard-workplace-header-tip-desc-sp"},[e._v("消费次数: "+e._s(e.psInfo.pay_num)+"次")]),e._v(" "),a("span",{staticClass:"dashboard-workplace-header-tip-desc-sp"},[e._v("总消费金额: "+e._s(e.psInfo.pay_price)+"元")])])])]):e._e(),e._v(" "),a("el-row",{staticClass:"ivu-mt mt20",attrs:{align:"middle",gutter:10}},[a("el-col",{attrs:{span:4}},[a("el-menu",{staticClass:"el-menu-vertical-demo",attrs:{"default-active":"0"},on:{select:e.changeType}},e._l(e.list,(function(t,i){return a("el-menu-item",{key:i,attrs:{name:t.val,index:t.val}},[a("span",{attrs:{slot:"title"},slot:"title"},[e._v(e._s(t.label))])])})),1)],1),e._v(" "),a("el-col",{attrs:{span:20}},[a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],staticClass:"tabNumWidth",attrs:{data:e.tableData.data,size:"mini"}},[e._l(e.columns,(function(e,t){return a("el-table-column",{key:t,attrs:{prop:e.key,label:e.title,width:"item.minWidth"}})})),e._v(" "),"3"===e.type?a("el-table-column",{attrs:{label:"有效期","min-width":"150"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(e._f("filterEmpty")(t.row?t.row.start_time+"-"+t.row.end_time:"")))])]}}],null,!1,3673940515)}):e._e()],2),e._v(" "),a("div",{staticClass:"block"},[a("el-pagination",{attrs:{"page-sizes":[6,12,18,24],"page-size":e.tableFrom.limit,"current-page":e.tableFrom.page,layout:"total, sizes, prev, pager, next, jumper",total:e.tableData.total},on:{"size-change":e.handleSizeChange,"current-change":e.pageChange}})],1)],1)],1)],1)},o=[],r=(a("c5f6"),{name:"UserDetails",props:{uid:{type:Number,default:null},row:{type:Object,default:null}},data:function(){return{moren:a("cdfe"),loading:!1,columns:[],Visible:!1,list:[{val:"0",label:"消费记录"},{val:"3",label:"持有优惠券"}],tableData:{data:[],total:0},tableFrom:{page:1,limit:6},psInfo:null,type:"0"}},mounted:function(){this.uid&&(this.getHeader(),this.getInfo("0"))},methods:{changeType:function(e){this.type=e,this.tableFrom.page=1,this.getInfo(e)},getInfo:function(e){var t=this;switch(this.loading=!0,e){case"0":Object(l["w"])(this.uid,this.tableFrom).then((function(e){t.tableData.data=e.data.list,t.tableData.total=e.data.count,t.columns=[{title:"订单ID",key:"order_id",minWidth:250},{title:"收货人",key:"real_name",minWidth:90},{title:"商品数量",key:"total_num",minWidth:80},{title:"商品总价",key:"total_price",minWidth:90},{title:"实付金额",key:"pay_price",minWidth:90},{title:"交易完成时间",key:"pay_time",minWidth:160}],t.loading=!1})).catch((function(){t.loading=!1}));break;case"3":Object(l["u"])(this.uid,this.tableFrom).then((function(e){t.tableData.data=e.data.list,t.tableData.total=e.data.count,t.columns=[{title:"优惠券名称",key:"coupon_title",minWidth:120},{title:"面值",key:"coupon_price",minWidth:120},{title:"最低消费额",key:"use_min_price",minWidth:120},{title:"兑换时间",key:"use_time",minWidth:120}],t.loading=!1})).catch((function(){t.loading=!1}));break}},pageChange:function(e){this.tableFrom.page=e,this.getInfo(this.type)},handleSizeChange:function(e){this.tableFrom.limit=e,this.getInfo(this.type)},getHeader:function(){this.psInfo=this.row}}}),c=r,u=(a("de2e"),a("2877")),d=Object(u["a"])(c,n,o,!1,null,"489ad9d2",null),m=d.exports,h=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"divBox"},[a("div",{staticClass:"header clearfix"},[a("div",{staticClass:"container"},[a("el-form",{attrs:{inline:"",size:"small"}},[a("el-form-item",{attrs:{label:"优惠劵名称："}},[a("el-input",{staticClass:"selWidth",attrs:{placeholder:"请输入优惠券名称",size:"small"},model:{value:e.tableFrom.coupon_name,callback:function(t){e.$set(e.tableFrom,"coupon_name",t)},expression:"tableFrom.coupon_name"}},[a("el-button",{attrs:{slot:"append",icon:"el-icon-search",size:"small"},on:{click:function(t){return e.getList(1)}},slot:"append"})],1)],1)],1)],1)]),e._v(" "),a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.listLoading,expression:"listLoading"}],ref:"table",staticStyle:{width:"100%"},attrs:{data:e.tableData.data,size:"mini","max-height":"400","tooltip-effect":"dark"}},[a("el-table-column",{attrs:{width:"55"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-radio",{attrs:{label:t.row.coupon_id},nativeOn:{change:function(a){return e.getTemplateRow(t.row)}},model:{value:e.templateRadio,callback:function(t){e.templateRadio=t},expression:"templateRadio"}},[e._v(" ")])]}}])}),e._v(" "),a("el-table-column",{attrs:{prop:"coupon_id",label:"ID","min-width":"50"}}),e._v(" "),a("el-table-column",{attrs:{prop:"title",label:"优惠券名称","min-width":"120"}}),e._v(" "),a("el-table-column",{attrs:{label:"优惠劵类型","min-width":"80"},scopedSlots:e._u([{key:"default",fn:function(t){var i=t.row;return[a("span",[e._v(e._s(e._f("couponTypeFilter")(i.type)))])]}}])}),e._v(" "),a("el-table-column",{attrs:{prop:"coupon_price",label:"优惠券面值","min-width":"90"}}),e._v(" "),a("el-table-column",{attrs:{label:"最低消费额","min-width":"90"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(0===t.row.use_min_price?"不限制":t.row.use_min_price))])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"有效期限","min-width":"250"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(1===t.row.coupon_type?t.row.use_start_time+" 一 "+t.row.use_end_time:t.row.coupon_time))])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"剩余数量","min-width":"90"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(0===t.row.is_limited?"不限量":t.row.remain_count))])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"操作","min-width":"120",fixed:"right",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{staticClass:"mr10",attrs:{type:"text",size:"small",disabled:e.multipleSelection.coupon_id!=t.row.coupon_id},on:{click:function(a){return e.send(t.row.coupon_id)}}},[e._v("发送")])]}}])})],1),e._v(" "),a("div",{staticClass:"block mb20"},[a("el-pagination",{attrs:{"page-sizes":[5,10,10,20],"page-size":e.tableFrom.limit,"current-page":e.tableFrom.page,layout:"total, sizes, prev, pager, next, jumper",total:e.tableData.total},on:{"size-change":e.handleSizeChange,"current-change":e.pageChange}})],1),e._v(" "),a("div")],1)},p=[],_=a("b7be"),b=a("83d6"),v={name:"CouponList",props:{couponForm:{type:Object,required:!0},checkedIds:{type:Array,default:[]},allCheck:{type:Boolean,default:!1},userFrom:{type:Object,required:!0}},data:function(){return{roterPre:b["roterPre"],listLoading:!0,tableData:{data:[],total:0},tableFrom:{page:1,limit:5,coupon_name:""},multipleSelection:{coupon_id:""},templateRadio:0}},mounted:function(){this.tableFrom.page=1,this.getList(1)},methods:{getTemplateRow:function(e){this.multipleSelection={coupon_id:e.coupon_id}},send:function(e){var t=this;delete this.userFrom["page"],delete this.userFrom["limit"];var a=this;a.$confirm("确定要发送优惠券吗？发送优惠券后将无法恢复，请谨慎操作！","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){var i={coupon_id:e,search:a.userFrom,mark:a.filter(t.couponForm),is_all:a.allCheck?1:0,uid:a.checkedIds};Object(_["E"])(i).then((function(e){a.$message.success(e.message),a.$emit("sendSuccess")})).catch((function(e){a.$message.error(e.message)}))})).catch((function(e){tthathis.$message({type:"info",message:"已取消"})}))},filter:function(e){for(var t in e)""===e[t]&&delete e[t];return e},getList:function(e){var t=this;this.listLoading=!0,this.tableFrom.page=e||this.tableFrom.page,Object(_["A"])(this.tableFrom).then((function(e){t.tableData.data=e.data.list,t.tableData.total=e.data.count,t.listLoading=!1})).catch((function(e){t.listLoading=!1,t.$message.error(e.message)}))},pageChange:function(e){this.tableFrom.page=e,this.getList("")},handleSizeChange:function(e){this.tableFrom.limit=e,this.getList("")}}},f=v,g=(a("0898"),Object(u["a"])(f,h,p,!1,null,"a8ac3bc6",null)),k=g.exports,w={name:"UserList",components:{userDetails:m,couponList:k},data:function(){return{moren:a("cdfe"),pickerOptions:{shortcuts:[{text:"今天",onClick:function(e){var t=new Date,a=new Date;a.setTime(new Date((new Date).getFullYear(),(new Date).getMonth(),(new Date).getDate())),e.$emit("pick",[a,t])}},{text:"昨天",onClick:function(e){var t=new Date,a=new Date;a.setTime(a.setTime(new Date((new Date).getFullYear(),(new Date).getMonth(),(new Date).getDate()-1))),t.setTime(t.setTime(new Date((new Date).getFullYear(),(new Date).getMonth(),(new Date).getDate()))),e.$emit("pick",[a,t])}},{text:"最近7天",onClick:function(e){var t=new Date,a=new Date;a.setTime(a.getTime()-6048e5),e.$emit("pick",[a,t])}},{text:"最近30天",onClick:function(e){var t=new Date,a=new Date;a.setTime(a.getTime()-2592e6),e.$emit("pick",[a,t])}},{text:"本月",onClick:function(e){var t=new Date,a=new Date;a.setTime(a.setTime(new Date((new Date).getFullYear(),(new Date).getMonth(),1))),e.$emit("pick",[a,t])}},{text:"本年",onClick:function(e){var t=new Date,a=new Date;a.setTime(a.setTime(new Date((new Date).getFullYear(),0,1))),e.$emit("pick",[a,t])}}]},timeVal:[],collapse:!1,visibleDetail:!1,visibleCoupon:!1,maxCols:3,isShowSend:!0,visible:!1,user_type:"",tableData:{data:[],total:0},listLoading:!0,wechatIds:"",row:"",labelPosition:"right",userProps:{children:"children",label:"name",value:"name"},userFrom:{label_id:"",user_type:"",sex:"",is_promoter:"",country:"",pay_count:"",user_time_type:"",user_time:"",nickname:"",province:"",city:"",page:1,limit:20,group_id:""},couponForm:{"用户标签":"","用户类型":"","性别":"","身份":"","消费情况":"","访问情况":"","访问时间":"","昵称":""},address:[],grid:{xl:8,lg:12,md:12,sm:24,xs:24},grid2:{xl:18,lg:16,md:12,sm:24,xs:24},grid3:{xl:8,lg:12,md:12,sm:24,xs:24},addresData:[],groupList:[],labelLists:[],chkName:"",checkedPage:[],checkedIds:[],noChecked:[],allCheck:!1}},mounted:function(){this.getTagList(),this.getList("")},methods:{onHandle:function(e){this.chkName=this.chkName===e?"":e,this.changeType(!(""===this.chkName))},changeType:function(e){e?this.chkName||(this.chkName="dan"):(this.chkName="",this.allCheck=!1);var t=this.checkedPage.indexOf(this.userFrom.page);"dan"===this.chkName?this.checkedPage.push(this.userFrom.page):t>-1&&this.checkedPage.splice(t,1),this.syncCheckedId()},syncCheckedId:function(){var e=this,t=this.tableData.data.map((function(e){return e.uid}));"duo"===this.chkName?(this.checkedIds=[],this.allCheck=!0):"dan"===this.chkName?(this.allCheck=!1,t.forEach((function(t){var a=e.checkedIds.indexOf(t);-1===a&&e.checkedIds.push(t)}))):t.forEach((function(t){var a=e.checkedIds.indexOf(t);a>-1&&e.checkedIds.splice(a,1)}))},sendCoupon:function(){0==this.checkedIds.length&&0==this.allCheck?this.$message.warning("请选择用户"):this.visibleCoupon=!0},changeOne:function(e,t){if(e)if("duo"===this.chkName){var a=this.noChecked.indexOf(t.uid);a>-1&&this.noChecked.splice(a,1)}else{var i=this.checkedIds.indexOf(t.uid);-1===i&&this.checkedIds.push(t.uid)}else if("duo"===this.chkName){var s=this.noChecked.indexOf(t.uid);-1===s&&this.noChecked.push(t.uid)}else{var l=this.checkedIds.indexOf(t.uid);l>-1&&this.checkedIds.splice(l,1)}},sendSuccess:function(){this.visibleCoupon=!1},getCoupounParmas:function(){var e=""==this.userFrom.label_id?"":this.getLabelValue(),t=this.findKey(this.userFrom.user_type,{"":"","微信用户":"wechat","小程序用户":"routine","H5用户":"h5"}),a=this.findKey(this.userFrom.sex,{"男":"1","女":"2","保密":"0","":""}),i=this.findKey(this.userFrom.sex,{"0次":"-1","1次以上":"0","2次以上":"1","3次以上":"2","4次以上":"3","5次以上":"4","":""}),s=this.findKey(this.userFrom.is_promoter,{"推广员":"1","普通用户":"0","":""}),l="visit"==this.userFrom.user_time_type?"最后访问":"add_time"==this.userFrom.user_time_type?"首次访问":"";this.couponForm={"用户标签":e,"用户类型":t,"性别":a,"消费情况":i,"身份":s,"访问情况":l,"访问时间":this.userFrom.user_time,"昵称":this.userFrom.nickname}},findKey:function(e,t){var a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:function(e,t){return e===t};return Object.keys(t).find((function(i){return a(t[i],e)}))},getLabelValue:function(){for(var e="",t=0;t<this.labelLists.length;t++)if(this.labelLists[t]["label_id"]===this.userFrom.label_id)return e=this.labelLists[t]["label_name"],e},selectChange:function(e){this.timeVal=[],this.userFrom.user_time=e,this.getList("")},onchangeTime:function(e){this.timeVal=e,this.userFrom.user_time=e?this.timeVal.join("-"):""},userSearchs:function(){this.userFrom.user_time_type&&!this.userFrom.user_time?this.$message.error("请选择访问时间"):!this.userFrom.user_time_type&&this.userFrom.user_time?this.$message.error("请选择访问情况"):this.getList(1)},getTagList:function(){var e=this;Object(l["o"])({page:1,limit:9999,all:1}).then((function(t){e.labelLists=t.data.list})).catch((function(t){e.$message.error(t.message)}))},onDetails:function(e){this.row=e,this.uid=e.uid,this.visibleDetail=!0},Close:function(){this.visibleDetail=!1},handleClose:function(){this.visible=!1},setLabel:function(e){var t=this;this.$modalForm(Object(l["g"])(e)).then((function(){return t.getList("")}))},getList:function(e){var t=this;this.listLoading=!0,this.userFrom.page=e||this.userFrom.page,this.userFrom.user_type=this.user_type,this.userFrom.province=this.address[0],this.userFrom.city=this.address[1],"0"===this.userFrom.user_type&&(this.userFrom.user_type=""),Object(l["v"])(this.userFrom).then((function(e){t.tableData.data=e.data.list,t.tableData.total=e.data.count,t.listLoading=!1,t.getCoupounParmas()})).catch((function(e){t.listLoading=!1,t.$message.error(e.message)}))},pageChange:function(e){this.userFrom.page=e,this.getList("")},handleSizeChange:function(e){this.userFrom.limit=e,this.getList("")},handleClick:function(){this.getList("")},reset:function(){this.userFrom={label_id:"",user_type:"",sex:"",is_promoter:"",country:"",pay_count:"",user_time_type:"",user_time:"",nickname:"",province:"",city:"",page:1,limit:20,group_id:"",date:""},this.timeVal=[]}}},y=w,C=(a("0306"),Object(u["a"])(y,i,s,!1,null,"2c0eb362",null));t["default"]=C.exports},bc42:function(e,t,a){},c945:function(e,t,a){},cdfe:function(e,t,a){e.exports=a.p+"mer/img/f.5aa43cd3.png"},dd77:function(e,t,a){},de2e:function(e,t,a){"use strict";var i=a("bc42"),s=a.n(i);s.a}}]);
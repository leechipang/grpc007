(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-12693069"],{"504c":function(t,a,s){var e=s("9e1e"),i=s("0d58"),l=s("6821"),r=s("52a7").f;t.exports=function(t){return function(a){var s,n=l(a),o=i(n),c=o.length,u=0,_=[];while(c>u)s=o[u++],e&&!r.call(n,s)||_.push(t?[s,n[s]]:n[s]);return _}}},5334:function(t,a,s){},8615:function(t,a,s){var e=s("5ca1"),i=s("504c")(!1);e(e.S,"Object",{values:function(t){return i(t)}})},9132:function(t,a,s){"use strict";s.r(a);var e=function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("div",{staticClass:"divBox"},[s("el-card",{staticClass:"box-card"},[s("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[s("div",{staticClass:"container"},[s("el-form",{attrs:{size:"small","label-width":"120px"}},[s("el-form-item",{staticStyle:{display:"block"},attrs:{label:"状态："}},[s("el-radio-group",{staticClass:"mr20",attrs:{type:"button",size:"small",clearable:""},on:{change:function(a){return t.getList("")}},model:{value:t.tableFrom.product_status,callback:function(a){t.$set(t.tableFrom,"product_status",a)},expression:"tableFrom.product_status"}},t._l(t.fromList.fromTxt,(function(a,e){return s("el-radio-button",{key:e,attrs:{label:a.val}},[t._v(t._s(a.text))])})),1)],1),t._v(" "),s("el-form-item",{attrs:{label:"商品搜索："}},[s("el-input",{staticClass:"selWidth",attrs:{placeholder:"请输入商品名称"},model:{value:t.tableFrom.keyword,callback:function(a){t.$set(t.tableFrom,"keyword",a)},expression:"tableFrom.keyword"}},[s("el-button",{attrs:{slot:"append",icon:"el-icon-search"},on:{click:function(a){return t.getList(1)}},slot:"append"})],1)],1),t._v(" "),s("el-form-item",{attrs:{label:"助力活动状态："}},[s("el-select",{staticClass:"filter-item selWidth mr20",attrs:{placeholder:"请选择",clearable:""},on:{change:function(a){return t.getList(1)}},model:{value:t.tableFrom.type,callback:function(a){t.$set(t.tableFrom,"type",a)},expression:"tableFrom.type"}},t._l(t.assistStatusList,(function(t){return s("el-option",{key:t.value,attrs:{label:t.label,value:t.value}})})),1)],1)],1)],1),t._v(" "),s("router-link",{attrs:{to:{path:t.roterPre+"/marketing/assist/create"}}},[s("el-button",{attrs:{size:"small",type:"primary"}},[s("i",{staticClass:"add"},[t._v("+")]),t._v(" 添加助力商品\n        ")])],1)],1),t._v(" "),s("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.listLoading,expression:"listLoading"}],staticStyle:{width:"100%"},attrs:{data:t.tableData.data,size:"mini"}},[s("el-table-column",{attrs:{prop:"product_assist_id",label:"ID","min-width":"50"}}),t._v(" "),s("el-table-column",{attrs:{label:"助力商品图","min-width":"80"},scopedSlots:t._u([{key:"default",fn:function(t){return[s("div",{staticClass:"demo-image__preview"},[s("el-image",{attrs:{src:t.row.product.image,"preview-src-list":[t.row.product.image]}})],1)]}}])}),t._v(" "),s("el-table-column",{attrs:{prop:"store_name",label:"商品名称","min-width":"120"}}),t._v(" "),s("el-table-column",{attrs:{label:"助力价格","min-width":"90"},scopedSlots:t._u([{key:"default",fn:function(a){return[s("span",[t._v(t._s(a.row.assistSku&&a.row.assistSku[0].assist_price?a.row.assistSku[0].assist_price:0))])]}}])}),t._v(" "),s("el-table-column",{attrs:{prop:"stock",label:"助力活动状态","min-width":"90"},scopedSlots:t._u([{key:"default",fn:function(a){return[s("span",[t._v(t._s(0===a.row.assist_status?"未开始":1===a.row.assist_status?"正在进行":"已结束"))])]}}])}),t._v(" "),s("el-table-column",{attrs:{label:"活动时间","min-width":"160"},scopedSlots:t._u([{key:"default",fn:function(a){return[s("div",[t._v("开始日期："+t._s(a.row.start_time&&a.row.start_time?a.row.start_time.slice(0,10):""))]),t._v(" "),s("div",[t._v("结束日期："+t._s(a.row.end_time&&a.row.end_time?a.row.end_time.slice(0,10):""))])]}}])}),t._v(" "),s("el-table-column",{attrs:{label:"助力成功人数/参与人次","min-width":"80",align:"center"},scopedSlots:t._u([{key:"default",fn:function(a){return[s("span",[t._v(t._s(a.row.success)+" / "+t._s(a.row.all))])]}}])}),t._v(" "),s("el-table-column",{attrs:{label:"限量","min-width":"60"},scopedSlots:t._u([{key:"default",fn:function(a){return[s("span",[t._v(t._s(a.row.assistSku&&a.row.assistSku[0]?a.row.assistSku[0].stock_count:0))])]}}])}),t._v(" "),s("el-table-column",{attrs:{label:"限量剩余","min-width":"60"},scopedSlots:t._u([{key:"default",fn:function(a){return[s("span",[t._v(t._s(a.row.assistSku&&a.row.assistSku[0]?a.row.assistSku[0].stock:0))])]}}])}),t._v(" "),s("el-table-column",{attrs:{prop:"status",label:"显示状态","min-width":"80"},scopedSlots:t._u([{key:"default",fn:function(a){return[s("el-switch",{attrs:{"active-value":1,"inactive-value":0,"active-text":"上架","inactive-text":"下架"},on:{change:function(s){return t.onchangeIsShow(a.row)}},model:{value:a.row.is_show,callback:function(s){t.$set(a.row,"is_show",s)},expression:"scope.row.is_show"}})]}}])}),t._v(" "),s("el-table-column",{attrs:{label:"审核状态","min-width":"130"},scopedSlots:t._u([{key:"default",fn:function(a){return[s("span",[t._v(t._s(0===a.row.product_status?"待审核":1===a.row.product_status?"审核通过":"审核失败"))]),t._v(" "),-1===a.row.product_status?s("span",{staticStyle:{"font-size":"12px"}},[s("br"),t._v("\n            原因："+t._s(a.row.refusal)+"\n          ")]):t._e()]}}])}),t._v(" "),s("el-table-column",{attrs:{label:"操作","min-width":"150",fixed:"right"},scopedSlots:t._u([{key:"default",fn:function(a){return[0===a.row.product_status?s("router-link",{attrs:{to:{path:t.roterPre+"/marketing/assist/create/"+a.row.product_assist_id}}},[s("el-button",{staticClass:"mr10",attrs:{type:"text",size:"small"}},[t._v("编辑")])],1):t._e(),t._v(" "),s("el-button",{staticClass:"mr10",attrs:{type:"text",size:"small"},on:{click:function(s){return t.goDetail(a.row.product_assist_id)}}},[t._v("查看详情")]),t._v(" "),1!==a.row.product_status||2==a.row.assist_status?s("el-button",{staticClass:"mr10",attrs:{type:"text",size:"small"},on:{click:function(s){return t.handleDelete(a.row.product_assist_id,a.$index)}}},[t._v("删除")]):t._e()]}}])})],1),t._v(" "),s("div",{staticClass:"block"},[s("el-pagination",{attrs:{"page-sizes":[20,40,60,80],"page-size":t.tableFrom.limit,"current-page":t.tableFrom.page,layout:"total, sizes, prev, pager, next, jumper",total:t.tableData.total},on:{"size-change":t.handleSizeChange,"current-change":t.pageChange}})],1)],1),t._v(" "),t.dialogVisible?s("el-dialog",{attrs:{title:"助力商品详情",center:"",visible:t.dialogVisible,width:"700px"},on:{"update:visible":function(a){t.dialogVisible=a}}},[s("div",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}]},[s("div",{staticClass:"box-container"},[s("div",{staticClass:"title"},[t._v("基本信息：")]),t._v(" "),s("div",{staticClass:"acea-row"},[s("div",{staticClass:"list sp"},[s("label",{staticClass:"name"},[t._v("商品ID：")]),t._v(t._s(t.formValidate.product_id))]),t._v(" "),s("div",{staticClass:"list sp"},[s("label",{staticClass:"name"},[t._v("商品名称：")]),s("span",[t._v(t._s(t.formValidate.store_name))])]),t._v(" "),s("div",{staticClass:"list sp100 image"},[s("label",{staticClass:"name"},[t._v("商品图：")]),t._v(" "),s("img",{staticStyle:{"max-width":"150px",height:"80px"},attrs:{src:t.formValidate.image}})])]),t._v(" "),s("div",{staticClass:"title",staticStyle:{"margin-top":"20px"}},[t._v("助力商品活动信息：")]),t._v(" "),s("div",{staticClass:"acea-row"},[s("div",{staticClass:"list sp100"},[s("label",{staticClass:"name"},[t._v("助力活动简介：")]),t._v(t._s(t.formValidate.store_info))]),t._v(" "),s("div",{staticClass:"list sp100"},[s("label",{staticClass:"name"},[t._v("助力活动日期：")]),t._v(t._s(t.formValidate.start_time+"-"+t.formValidate.end_time))]),t._v(" "),s("div",{staticClass:"list sp"},[s("label",{staticClass:"name"},[t._v("助力价：")]),t._v(t._s(t.formValidate.price)+"元")]),t._v(" "),s("div",{staticClass:"list sp"},[s("label",{staticClass:"name"},[t._v("已售商品数：")]),t._v(t._s(t.formValidate.pay)+t._s(t.formValidate.unit_name))]),t._v(" "),s("div",{staticClass:"list sp"},[s("label",{staticClass:"name"},[t._v("限量：")]),t._v(t._s(t.formValidate.stock_count))]),t._v(" "),s("div",{staticClass:"list sp"},[s("label",{staticClass:"name"},[t._v("限量剩余：")]),t._v(t._s(t.formValidate.stock))]),t._v(" "),s("div",{staticClass:"list sp"},[s("label",{staticClass:"name"},[t._v("限购件数：")]),t._v(t._s(t.formValidate.pay_count)+t._s(t.formValidate.unit_name))]),t._v(" "),s("div",{staticClass:"list sp"},[s("label",{staticClass:"name"},[t._v("助力次数：")]),t._v(t._s(t.formValidate.assist_user_count))]),t._v(" "),s("div",{staticClass:"list sp"},[s("label",{staticClass:"name"},[t._v("助力人数：")]),t._v(t._s(t.formValidate.assist_count)+"人")]),t._v(" "),s("div",{staticClass:"list sp"},[s("label",{staticClass:"name"},[t._v("审核状态：")]),t._v(" "),s("span",[t._v(t._s(0===t.formValidate.reviewStatus?"待审核":1===t.formValidate.reviewStatus?"审核通过":"审核失败"))]),t._v(" "),-1===t.formValidate.reviewStatus?s("span",{staticStyle:{"font-size":"12px"}},[s("br"),t._v("\n            原因："+t._s(t.formValidate.refusal)+"\n          ")]):t._e()]),t._v(" "),s("div",{staticClass:"list sp"},[s("label",{staticClass:"name"},[t._v("助力成功/参与人次：")]),t._v(t._s(t.formValidate.success)+" / "+t._s(t.formValidate.all))]),t._v(" "),s("div",{staticClass:"list sp"},[s("label",{staticClass:"name"},[t._v("助力活动状态：")]),t._v(t._s(0===t.formValidate.assist_status?"未开始":1===t.formValidate.assist_status?"正在进行":"已结束"))]),t._v(" "),s("div",{staticClass:"list sp"},[s("label",{staticClass:"name"},[t._v("显示状态：")]),t._v(t._s(1===t.formValidate.is_show?"显示":"隐藏"))]),t._v(" "),s("div",{staticClass:"list sp"},[s("label",{staticClass:"name"},[t._v("创建时间：")]),t._v(t._s(t.formValidate.create_time))])])])])]):t._e()],1)},i=[],l=(s("96cf"),s("3b8d")),r=(s("8615"),s("55dd"),s("ac6a"),s("28a5"),s("c4c8")),n=s("83d6"),o={name:"ProductList",data:function(){return{props:{emitPath:!1},roterPre:n["roterPre"],listLoading:!0,tableData:{data:[],total:0},assistStatusList:[{label:"未开始",value:0},{label:"正在进行",value:1},{label:"已结束",value:2}],fromList:{custom:!0,fromTxt:[{text:"全部",val:""},{text:"待审核",val:"0"},{text:"已审核",val:"1"},{text:"审核失败",val:"-1"}]},tableFrom:{page:1,limit:20,keyword:"",product_status:"",type:""},modals:!1,dialogVisible:!1,loading:!1,manyTabTit:{},manyTabDate:{},formValidate:{},attrInfo:{}}},mounted:function(){this.getList("")},methods:{renderheader:function(t,a){var s=a.column;a.$index;return t("span",{},[t("span",{},s.label.split("|")[0]),t("br"),t("span",{},s.label.split("|")[1])])},watCh:function(t){var a=this,s={},e={};this.formValidate.attr.forEach((function(t,a){s["value"+a]={title:t.value},e["value"+a]=""})),this.ManyAttrValue.forEach((function(t,s){var e=Object.values(t.detail).sort().join("/");a.attrInfo[e]&&(a.ManyAttrValue[s]=a.attrInfo[e])})),this.attrInfo={},this.ManyAttrValue.forEach((function(t){a.attrInfo[Object.values(t.detail).sort().join("/")]=t})),this.manyTabTit=s,this.manyTabDate=e},goDetail:function(t){var a=this;this.dialogVisible=!0,Object(r["e"])(t).then(function(){var t=Object(l["a"])(regeneratorRuntime.mark((function t(s){var e;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:a.loading=!1,e=s.data,a.formValidate={product_id:e.product_assist_id,image:e.product.image,store_name:e.store_name,store_info:e.store_info,start_time:e.start_time?e.start_time:"",end_time:e.end_time?e.end_time:"",create_time:e.create_time,unit_name:e.product.unit_name,is_show:e.is_show,stock_count:e.assistSku[0].stock_count,stock:e.assistSku[0].stock,content:e.content,price:e.assistSku[0].assist_price,assist_status:e.assist_status,reviewStatus:e.product_status,refusal:e.refusal,all:e.all,pay:e.pay,assist_user_count:e.assist_user_count,assist_count:e.assist_count,pay_count:e.pay_count,success:e.success},a.fullscreenLoading=!1;case 4:case"end":return t.stop()}}),t)})));return function(a){return t.apply(this,arguments)}}()).catch((function(t){a.fullscreenLoading=!1,a.$message.error(t.message)}))},getList:function(t){var a=this;this.listLoading=!0,this.tableFrom.page=t||this.tableFrom.page,Object(r["f"])(this.tableFrom).then((function(t){a.tableData.data=t.data.list,a.tableData.total=t.data.count,a.listLoading=!1})).catch((function(t){a.listLoading=!1,a.$message.error(t.message)}))},pageChange:function(t){this.tableFrom.page=t,this.getList("")},handleSizeChange:function(t){this.tableFrom.limit=t,this.getList("")},handleDelete:function(t,a){var s=this;this.$modalSure().then((function(){Object(r["b"])(t).then((function(t){var e=t.message;s.$message.success(e),s.tableData.data.splice(a,1)})).catch((function(t){var a=t.message;s.$message.error(a)}))}))},onchangeIsShow:function(t){var a=this;Object(r["g"])(t.product_assist_id,t.is_show).then((function(t){var s=t.message;a.$message.success(s),a.getList("")})).catch((function(t){var s=t.message;a.$message.error(s)}))}}},c=o,u=(s("c234"),s("2877")),_=Object(u["a"])(c,e,i,!1,null,"2aeaeb95",null);a["default"]=_.exports},c234:function(t,a,s){"use strict";var e=s("5334"),i=s.n(e);i.a}}]);
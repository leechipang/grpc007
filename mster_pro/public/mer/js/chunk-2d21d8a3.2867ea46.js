(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d21d8a3"],{d276:function(t,a,e){"use strict";e.r(a);var i=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"divBox"},[e("el-card",{staticClass:"box-card"},[e("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[e("el-button",{attrs:{size:"small",type:"primary"},on:{click:t.onAdd}},[t._v("添加组合数据")])],1),t._v(" "),e("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],staticStyle:{width:"100%"},attrs:{data:t.tableData.data,size:"small"}},[e("el-table-column",{attrs:{prop:"group_id",label:"ID","min-width":"60"}}),t._v(" "),e("el-table-column",{attrs:{prop:"group_name",label:"数据组名称","min-width":"130"}}),t._v(" "),e("el-table-column",{attrs:{prop:"group_key",label:"数据组key","min-width":"130"}}),t._v(" "),e("el-table-column",{attrs:{prop:"group_info",label:"数据组说明","min-width":"130"}}),t._v(" "),e("el-table-column",{attrs:{prop:"create_time",label:"创建时间","min-width":"150"}}),t._v(" "),e("el-table-column",{attrs:{label:"操作","min-width":"100",fixed:"right"},scopedSlots:t._u([{key:"default",fn:function(a){return[e("el-button",{attrs:{type:"text",size:"small"},on:{click:function(e){return t.goList(a.row.group_id,a.$index)}}},[t._v("数据列表")]),t._v(" "),e("el-button",{attrs:{type:"text",size:"small"},on:{click:function(e){return t.onEdit(a.row.group_id)}}},[t._v("编辑")])]}}])})],1),t._v(" "),e("div",{staticClass:"block"},[e("el-pagination",{attrs:{"page-sizes":[20,40,60,80],"page-size":t.tableData.limit,"current-page":t.tableData.page,layout:"total, sizes, prev, pager, next, jumper",total:t.tableData.total},on:{"size-change":t.handleSizeChange,"current-change":t.pageChange}})],1)],1)],1)},n=[],l=e("8593"),o={name:"List",data:function(){return{tableData:{page:1,limit:20,data:[],total:0},loading:!1}},mounted:function(){this.getList()},methods:{getList:function(){var t=this;this.loading=!0,Object(l["l"])(this.tableData.page,this.tableData.limit).then((function(a){t.tableData.data=a.data.list,t.tableData.total=a.data.count,t.loading=!1})).catch((function(a){t.loading=!1,t.$message.error(a.message)}))},pageChange:function(t){this.tableData.page=t,this.getList()},handleSizeChange:function(t){this.tableData.limit=t,this.getList()},onAdd:function(){var t=this;this.$modalForm(Object(l["g"])()).then((function(){return t.getLst()}))},onEdit:function(t){var a=this;this.$modalForm(Object(l["y"])(t)).then((function(){return a.getLst()}))},goList:function(t){this.$router.push("/group/data/".concat(t))}}},s=o,r=e("2877"),c=Object(r["a"])(s,i,n,!1,null,"eb2e9d34",null);a["default"]=c.exports}}]);
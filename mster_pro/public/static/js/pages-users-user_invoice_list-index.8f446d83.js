(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-users-user_invoice_list-index"],{"0003":function(t,e,i){"use strict";var n=i("3462"),r=i.n(n);r.a},"00ab":function(t,e,i){"use strict";var n=i("4ea4");i("99af"),i("a434"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var r=n(i("032c")),o=i("2f62"),a=i("5e22"),s=i("7d4f"),c={components:{home:r.default},props:{},filters:{filterTxt:function(t){var e={0:"未开票",1:"已开票",10:"未寄出"};return e[t]}},data:function(){return{tabCur:1,invoiceList:[],query:{page:1,limit:20},loading:!1,finished:!1,isScroll:!1,orderList:[],orderPage:1}},computed:(0,o.mapGetters)(["isLogin"]),watch:{loading:function(t){t?uni.showLoading({title:"加载中"}):uni.hideLoading()}},onLoad:function(t){if(t.type)this.tabCur=t.type;else try{this.tabCur=uni.getStorageSync("user_invoice_list")?uni.getStorageSync("user_invoice_list"):1,uni.removeStorageSync("user_invoice_list")}catch(e){}},onShow:function(){this.orderPage=1,this.orderList=[],this.query.page=1,this.invoiceList=[],this.finished=!1,this.isScroll=!1,this.receiptOrder(),this.getInvoiceList()},methods:{goOrderDetail:function(t){uni.navigateTo({url:"/pages/users/user_invoice_order/index?order_id=".concat(t.storeOrder.group_order_id,"&invoice_id=").concat(t.order_receipt_id)})},tab:function(t){this.tabCur!==t&&(this.tabCur=t,uni.setStorageSync("user_invoice_list",t))},receiptOrder:function(){var t=this;this.isScroll||(0,s.receiptOrder)({page:this.orderPage,limit:this.query.limit}).then((function(e){t.orderList=t.orderList.concat(e.data.list),t.isScroll=t.orderList.length>=e.data.count,t.orderPage++}))},getInvoiceList:function(t){var e=this;t&&(this.invoiceList=[],this.query.page=1,this.finished=!1),this.loading||this.finished||(this.loading=!0,(0,a.invoice)().then((function(t){var i=t.data;e.loading=!1,e.invoiceList=t.data,e.finished=i.length<e.query.limit,e.query.page++})).catch((function(t){e.loading=!1,e.$util.Tips({title:t})})))},addInvoice:function(){uni.navigateTo({url:"/pages/users/user_invoice_form/index"})},editInvoice:function(t){uni.navigateTo({url:"/pages/users/user_invoice_form/index?id=".concat(t)})},deleteInvoice:function(t,e){var i=this;uni.showModal({content:"删除该发票？",confirmColor:"#E93323",success:function(n){n.confirm&&(0,a.invoiceDelete)(t).then((function(){i.$util.Tips({title:"删除成功",icon:"success"},(function(){i.invoiceList.splice(e,1)}))})).catch((function(t){return i.$util.Tips({title:t})}))}})}},onReachBottom:function(){this.receiptOrder()}};e.default=c},"032c":function(t,e,i){"use strict";i.r(e);var n=i("7141"),r=i("262f");for(var o in r)"default"!==o&&function(t){i.d(e,t,(function(){return r[t]}))}(o);i("1cb6");var a,s=i("f0c5"),c=Object(s["a"])(r["default"],n["b"],n["c"],!1,null,"6c588de2",null,!1,n["a"],a);e["default"]=c.exports},"1c33":function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n=i("2f62"),r={name:"Home",props:{},data:function(){return{top:"",bottom:""}},computed:(0,n.mapGetters)(["homeActive"]),methods:{setTouchMove:function(t){var e=this;t.touches[0].clientY<545&&t.touches[0].clientY>66&&(e.top=t.touches[0].clientY,e.bottom="auto")},open:function(){this.homeActive?this.$store.commit("CLOSE_HOME"):this.$store.commit("OPEN_HOME")}},created:function(){this.bottom="50px"}};e.default=r},"1cb6":function(t,e,i){"use strict";var n=i("c6df"),r=i.n(n);r.a},"262f":function(t,e,i){"use strict";i.r(e);var n=i("1c33"),r=i.n(n);for(var o in n)"default"!==o&&function(t){i.d(e,t,(function(){return n[t]}))}(o);e["default"]=r.a},3462:function(t,e,i){var n=i("76b5");"string"===typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);var r=i("4f06").default;r("063b006e",n,!0,{sourceMap:!1,shadowMode:!1})},"5c6ce":function(t,e,i){"use strict";var n;i.d(e,"b",(function(){return r})),i.d(e,"c",(function(){return o})),i.d(e,"a",(function(){return n}));var r=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-uni-view",[i("v-uni-view",{staticClass:"acea-row nav"},[i("v-uni-view",{staticClass:"acea-row row-center-wrapper",class:{on:1==t.tabCur},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.tab(1)}}},[t._v("发票记录")]),i("v-uni-view",{staticClass:"acea-row row-center-wrapper",class:{on:2==t.tabCur},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.tab(2)}}},[t._v("抬头管理")])],1),1==t.tabCur?[t.orderList.length?i("v-uni-view",{staticClass:"store-list"},t._l(t.orderList,(function(e,n){return i("v-uni-view",{key:n,staticClass:"item"},[i("v-uni-view",{staticClass:"hd"},[e.storeOrder.orderProduct[0].cart_info.productAttr.image?i("v-uni-image",{attrs:{src:e.storeOrder.orderProduct[0].cart_info.productAttr.image,mode:""}}):i("v-uni-image",{attrs:{src:e.storeOrder.orderProduct[0].cart_info.product.image,mode:""}}),i("v-uni-view",{staticClass:"line2 name"},[t._v(t._s(e.storeOrder.orderProduct[0].cart_info.product.store_name))])],1),i("v-uni-view",{staticClass:"bd"},[i("v-uni-view",{staticClass:"title"},[t._v(t._s(1==e.receipt_info.receipt_type?"普通发票":"专用发票"))]),i("v-uni-view",{staticClass:"time"},[t._v("申请时间 "+t._s(e.create_time))]),i("v-uni-view",{staticClass:"price"},[i("v-uni-text",[t._v("￥")]),t._v(t._s(e.order_price))],1)],1),i("v-uni-view",{staticClass:"ft"},[i("v-uni-text",[t._v(t._s(t._f("filterTxt")(e.status)))]),1==e.storeOrder.paid?i("v-uni-view",{staticClass:"btn",on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.goOrderDetail(e)}}},[t._v("查看详情")]):t._e()],1)],1)})),1):i("v-uni-view",{staticClass:"nothing"},[i("v-uni-image",{attrs:{src:"/static/images/noInvoice.png"}}),i("v-uni-view",{staticClass:"nothing_text"},[t._v("您还没有发票记录哟~")])],1)]:t._e(),2==t.tabCur?[t.invoiceList&&t.invoiceList.length?i("v-uni-view",{staticClass:"list"},t._l(t.invoiceList,(function(e,n){return i("v-uni-view",{key:n,staticClass:"item"},[i("v-uni-view",{staticClass:"acea-row item-hd"},[i("v-uni-view",{staticClass:"acea-row row-middle"},[i("v-uni-view",{staticClass:"name"},[t._v(t._s(e.receipt_title))]),e.is_default?i("v-uni-view",{staticClass:"label"},[t._v("默认")]):t._e()],1),i("v-uni-view",{staticClass:"type",class:1==e.receipt_type?"":"special"},[t._v(t._s(1==e.receipt_type?"普通发票":"专用发票"))])],1),i("v-uni-view",{staticClass:"item-bd"},[1==e.receipt_title_type?i("v-uni-view",{staticClass:"cell"},[t._v("邮箱 "+t._s(e.email))]):i("v-uni-view",[i("v-uni-view",{staticClass:"cell"},[t._v("联系电话 "+t._s(e.tel))]),i("v-uni-view",{staticClass:"cell"},[t._v("企业税号 "+t._s(e.duty_paragraph))])],1)],1),i("v-uni-view",{staticClass:"acea-row row-right item-ft"},[i("v-uni-view",{staticClass:"btn",on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.editInvoice(e.user_receipt_id)}}},[i("v-uni-text",{staticClass:"iconfont icon-bianji"}),t._v("编辑")],1),i("v-uni-view",{staticClass:"btn",on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.deleteInvoice(e.user_receipt_id,n)}}},[i("v-uni-text",{staticClass:"iconfont icon-shanchu"}),t._v("删除")],1)],1)],1)})),1):i("v-uni-view",{staticClass:"nothing"},[i("v-uni-image",{attrs:{src:"/static/images/noInvoice.png"}}),i("v-uni-view",{staticClass:"nothing_text"},[t._v("您还没有添加发票信息哟~")])],1),i("v-uni-button",{staticClass:"add-btn",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.addInvoice.apply(void 0,arguments)}}},[i("v-uni-text",{staticClass:"iconfont icon-fapiao"}),t._v("添加新发票")],1)]:t._e(),i("home")],2)},o=[]},"6bac":function(t,e,i){var n=i("24fb");e=n(!1),e.push([t.i,".pictrueBox[data-v-6c588de2]{width:%?130?%;height:%?120?%}\n\n/*返回主页按钮*/.home[data-v-6c588de2]{position:fixed;color:#fff;text-align:center;z-index:9999;right:%?15?%;display:-webkit-box;display:-webkit-flex;display:flex}.home .homeCon[data-v-6c588de2]{border-radius:%?50?%;opacity:0;height:0;color:#e93323;width:0}.home .homeCon.on[data-v-6c588de2]{opacity:1;-webkit-animation:bounceInRight .5s cubic-bezier(.215,.61,.355,1);animation:bounceInRight .5s cubic-bezier(.215,.61,.355,1);width:%?300?%;height:%?86?%;margin-bottom:%?20?%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;-webkit-box-align:center;-webkit-align-items:center;align-items:center;background:#f44939!important}.home .homeCon .iconfont[data-v-6c588de2]{font-size:%?48?%;color:#fff;display:inline-block;margin:0 auto}.home .pictrue[data-v-6c588de2]{width:%?86?%;height:%?86?%;border-radius:50%;margin:0 auto}.home .pictrue .image[data-v-6c588de2]{width:100%;height:100%;border-radius:50%;-webkit-transform:rotate(90deg);transform:rotate(90deg);ms-transform:rotate(90deg);moz-transform:rotate(90deg);webkit-transform:rotate(90deg);o-transform:rotate(90deg)}",""]),t.exports=e},7141:function(t,e,i){"use strict";var n;i.d(e,"b",(function(){return r})),i.d(e,"c",(function(){return o})),i.d(e,"a",(function(){return n}));var r=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-uni-view",{staticStyle:{"touch-action":"none"}},[i("v-uni-view",{staticClass:"home",staticStyle:{position:"fixed"},style:{top:t.top+"px",bottom:t.bottom},attrs:{id:"right-nav"},on:{touchmove:function(e){e.stopPropagation(),e.preventDefault(),arguments[0]=e=t.$handleEvent(e),t.setTouchMove.apply(void 0,arguments)}}},[t.homeActive?i("v-uni-view",{staticClass:"homeCon bg-color-red",class:!0===t.homeActive?"on":""},[i("v-uni-navigator",{staticClass:"iconfont icon-shouye-xianxing",attrs:{"hover-class":"none",url:"/pages/index/index","open-type":"switchTab"}}),i("v-uni-navigator",{staticClass:"iconfont icon-caigou-xianxing",attrs:{"hover-class":"none",url:"/pages/order_addcart/order_addcart","open-type":"switchTab"}}),i("v-uni-navigator",{staticClass:"iconfont icon-yonghu1",attrs:{"hover-class":"none",url:"/pages/user/index","open-type":"switchTab"}})],1):t._e(),i("v-uni-view",{staticClass:"pictrueBox",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.open.apply(void 0,arguments)}}},[i("v-uni-view",{staticClass:"pictrue"},[i("v-uni-image",{staticClass:"image",attrs:{src:!0===t.homeActive?"/static/images/close.gif":"/static/images/open.gif"}})],1)],1)],1)],1)},o=[]},"76b5":function(t,e,i){var n=i("24fb");e=n(!1),e.push([t.i,'@charset "UTF-8";\n/**\n * 这里是uni-app内置的常用样式变量\n *\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\n *\n */\n/**\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\n *\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\n */\n/* 颜色变量 */\n/* 行为相关颜色 */\n/* 背景颜色 */\n/* 边框颜色 */\n/* 尺寸变量 */\n/* 文字尺寸 */\n/* 图片尺寸 */\n/* Border Radius */\n/* 水平间距 */\n/* 垂直间距 */\n/* 透明度 */\n/* 文章场景相关 */.nav[data-v-2ba87f50]{position:fixed;top:0;left:0;z-index:9;width:100%;height:%?90?%;background-color:#fff}.nav .acea-row[data-v-2ba87f50]{-webkit-box-flex:1;-webkit-flex:1;flex:1;border-top:%?3?% solid transparent;border-bottom:%?3?% solid transparent;font-size:%?30?%;color:#282828}.nav .on[data-v-2ba87f50]{border-bottom-color:#e93323;color:#e93323}.list[data-v-2ba87f50]{padding:%?14?% %?32?%;margin-top:%?90?%;padding-bottom:%?220?%}.list .item[data-v-2ba87f50]{padding:%?28?% %?32?%;background-color:#fff}.list .item ~ .item[data-v-2ba87f50]{margin-top:%?14?%}.list .item-hd .acea-row[data-v-2ba87f50]{-webkit-box-flex:1;-webkit-flex:1;flex:1;min-width:0}.list .name[data-v-2ba87f50]{font-weight:600;font-size:%?30?%;color:#282828;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.list .label[data-v-2ba87f50]{width:%?56?%;height:%?28?%;border:%?1?% solid #e93323;margin-left:%?18?%;font-size:%?20?%;line-height:%?26?%;text-align:center;color:#e93323}.list .type[data-v-2ba87f50]{width:%?124?%;height:%?42?%;background-color:#fcf0e0;font-size:%?24?%;line-height:%?42?%;text-align:center;color:#d67300}.list .type.special[data-v-2ba87f50]{background-color:#fde9e7;color:#e93323}.list .item-bd[data-v-2ba87f50]{margin-top:%?18?%}.list .cell[data-v-2ba87f50]{font-size:%?26?%;color:#666}.list .cell ~ .cell[data-v-2ba87f50]{margin-top:%?12?%}.list .item-ft[data-v-2ba87f50]{margin-top:%?11?%}.list .btn[data-v-2ba87f50]{font-size:%?26?%;color:#282828;cursor:pointer}.list .btn ~ .btn[data-v-2ba87f50]{margin-left:%?35?%}.list .btn .iconfont[data-v-2ba87f50]{margin-right:%?10?%;font-size:%?24?%;color:#000}.add-btn[data-v-2ba87f50]{position:fixed;right:%?30?%;bottom:%?20?%;left:%?30?%;z-index:9;height:%?86?%;border-radius:%?43?%;background-color:#e93323;font-size:%?30?%;line-height:%?86?%;color:#fff}.nothing[data-v-2ba87f50]{margin-top:%?200?%;text-align:center}.nothing_text[data-v-2ba87f50]{margin-top:%?20?%;color:#999}.store-list[data-v-2ba87f50]{margin-top:%?110?%;padding:0 %?30?% %?30?%}.store-list .item[data-v-2ba87f50]{padding:%?30?%;margin-bottom:%?20?%;background:#fff;border-radius:%?6?%}.store-list .item .hd[data-v-2ba87f50]{display:-webkit-box;display:-webkit-flex;display:flex}.store-list .item .hd uni-image[data-v-2ba87f50]{width:%?78?%;height:%?78?%}.store-list .item .hd .name[data-v-2ba87f50]{-webkit-box-flex:1;-webkit-flex:1;flex:1;margin-left:%?24?%;line-height:1.8;font-size:%?26?%;color:#282828}.store-list .item .bd[data-v-2ba87f50]{position:relative;padding:%?25?% %?36?%;margin-top:%?36?%;background:#f5f6f7;border-radius:%?20?%}.store-list .item .bd .title[data-v-2ba87f50]{font-size:%?26?%;color:#282828;font-weight:700}.store-list .item .bd .time[data-v-2ba87f50]{margin-top:%?8?%;font-size:%?26?%;color:#818181}.store-list .item .bd .price[data-v-2ba87f50]{position:absolute;right:%?30?%;top:50%;-webkit-transform:translateY(-50%);transform:translateY(-50%);color:#282828;font-size:%?32?%;font-weight:700}.store-list .item .bd .price uni-text[data-v-2ba87f50]{font-weight:400;font-size:%?24?%}.store-list .item .ft[data-v-2ba87f50]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between;margin-top:%?39?%}.store-list .item .ft uni-text[data-v-2ba87f50]{color:#282828;font-size:%?28?%;font-weight:700}.store-list .item .ft .btn[data-v-2ba87f50]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;width:%?150?%;height:%?57?%;background:#fff;border:1px solid #707070;border-radius:%?29?%;font-size:%?26?%}',""]),t.exports=e},"774a":function(t,e,i){"use strict";i.r(e);var n=i("00ab"),r=i.n(n);for(var o in n)"default"!==o&&function(t){i.d(e,t,(function(){return n[t]}))}(o);e["default"]=r.a},"7d4f":function(t,e,i){"use strict";var n=i("4ea4");Object.defineProperty(e,"__esModule",{value:!0}),e.getCartCounts=o,e.getCartList=a,e.changeCartNum=s,e.cartDel=c,e.getOrderList=u,e.orderProduct=d,e.orderComment=l,e.orderPay=f,e.orderData=v,e.unOrderCancel=p,e.orderDel=g,e.getOrderDetail=h,e.groupOrderDetail=b,e.getPayOrder=m,e.orderAgain=w,e.orderTake=_,e.express=x,e.ordeRefundReason=y,e.orderRefundVerify=C,e.orderConfirm=k,e.getCouponsOrderPrice=O,e.postOrderComputed=L,e.orderCreate=A,e.groupOrderList=z,e.refundBatch=P,e.refundProduct=E,e.refundApply=S,e.refundMessage=T,e.refundList=$,e.refundDetail=j,e.expressList=M,e.refundBackGoods=I,e.refundDel=D,e.refundExpress=R,e.verifyCode=B,e.presellOrderPay=q,e.receiptOrder=Y,e.getReceiptOrder=G,e.getCallBackUrlApi=H;var r=n(i("112d"));function o(){return r.default.get("user/cart/count")}function a(){return r.default.get("user/cart/lst")}function s(t,e){return r.default.post("user/cart/change/"+t,e)}function c(t){return r.default.post("user/cart/delete",t)}function u(t){return r.default.get("order/list",t)}function d(t){return r.default.get("reply/product/"+t)}function l(t,e){return r.default.post("reply/"+t,e)}function f(t,e){return r.default.post("order/pay/"+t,e)}function v(){return r.default.get("order/number")}function p(t){return r.default.post("order/cancel/"+t)}function g(t){return r.default.post("order/del/"+t)}function h(t){return r.default.get("order/detail/"+t)}function b(t){return r.default.get("order/group_order_detail/"+t)}function m(t){return r.default.get("order/status/"+t)}function w(t){return r.default.post("user/cart/again",t)}function _(t){return r.default.post("order/take/"+t)}function x(t){return r.default.post("order/express/"+t)}function y(){return r.default.get("order/refund/reason")}function C(t){return r.default.post("order/refund/verify",t)}function k(t){return r.default.post("order/check",t)}function O(t,e){return r.default.get("coupons/order/"+t,e)}function L(t,e){return r.default.post("/order/computed/"+t,e)}function A(t){return r.default.post("order/create",t,{noAuth:!0})}function z(t){return r.default.get("order/group_order_list",t,{noAuth:!0})}function P(t){return r.default.get("refund/batch_product/"+t,{noAuth:!0})}function E(t,e){return r.default.get("refund/product/"+t,e,{noAuth:!0})}function S(t,e){return r.default.post("refund/apply/"+t,e,{noAuth:!0})}function T(){return r.default.get("common/refund_message",{noAuth:!0})}function $(t){return r.default.get("refund/list",t,{noAuth:!0})}function j(t){return r.default.get("refund/detail/"+t,{noAuth:!0})}function M(){return r.default.get("common/express")}function I(t,e){return r.default.post("refund/back_goods/"+t,e,{noAuth:!0})}function D(t){return r.default.post("refund/del/"+t,{noAuth:!0})}function R(t){return r.default.get("refund/express/"+t,{noAuth:!0})}function B(t){return r.default.get("order/verify_code/"+t)}function q(t,e){return r.default.post("presell/pay/"+t,e)}function Y(t){return r.default.get("user/receipt/order",t)}function G(t){return r.default.get("user/receipt/order/"+t)}function H(t){return r.default.get("common/pay_key/"+t,{},{noAuth:!0})}},"8d42":function(t,e,i){"use strict";i.r(e);var n=i("5c6ce"),r=i("774a");for(var o in r)"default"!==o&&function(t){i.d(e,t,(function(){return r[t]}))}(o);i("0003");var a,s=i("f0c5"),c=Object(s["a"])(r["default"],n["b"],n["c"],!1,null,"2ba87f50",null,!1,n["a"],a);e["default"]=c.exports},c6df:function(t,e,i){var n=i("6bac");"string"===typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);var r=i("4f06").default;r("6a4e1020",n,!0,{sourceMap:!1,shadowMode:!1})}}]);
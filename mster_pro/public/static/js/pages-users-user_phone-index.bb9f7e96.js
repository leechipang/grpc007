(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-users-user_phone-index"],{"087b":function(t,e,n){var i=n("24fb");e=i(!1),e.push([t.i,'@charset "UTF-8";\n/**\n * 这里是uni-app内置的常用样式变量\n *\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\n *\n */\n/**\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\n *\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\n */\n/* 颜色变量 */\n/* 行为相关颜色 */\n/* 背景颜色 */\n/* 边框颜色 */\n/* 尺寸变量 */\n/* 文字尺寸 */\n/* 图片尺寸 */\n/* Border Radius */\n/* 水平间距 */\n/* 垂直间距 */\n/* 透明度 */\n/* 文章场景相关 */uni-page-body[data-v-8d0d5cf0]{background-color:#fff!important}.ChangePassword .phone[data-v-8d0d5cf0]{font-size:%?32?%;font-weight:700;text-align:center;margin-top:%?55?%}.ChangePassword .list[data-v-8d0d5cf0]{width:%?580?%;margin:%?53?% auto 0 auto}.ChangePassword .list .item[data-v-8d0d5cf0]{width:100%;height:%?110?%;border-bottom:%?2?% solid #f0f0f0}.ChangePassword .list .item uni-input[data-v-8d0d5cf0]{width:100%;height:100%;font-size:%?32?%}.ChangePassword .list .item .placeholder[data-v-8d0d5cf0]{color:#b9b9bc}.ChangePassword .list .item uni-input.codeIput[data-v-8d0d5cf0]{width:%?340?%}.ChangePassword .list .item .code[data-v-8d0d5cf0]{font-size:%?32?%;background-color:#fff}.ChangePassword .list .item .code.on[data-v-8d0d5cf0]{color:#b9b9bc!important}.ChangePassword .confirmBnt[data-v-8d0d5cf0]{font-size:%?32?%;width:%?580?%;height:%?90?%;border-radius:%?45?%;color:#fff;margin:%?92?% auto 0 auto;text-align:center;line-height:%?90?%}body.?%PAGE?%[data-v-8d0d5cf0]{background-color:#fff!important}',""]),t.exports=e},"21f7":function(t,e,n){"use strict";n.r(e);var i=n("a037"),o=n.n(i);for(var r in i)"default"!==r&&function(t){n.d(e,t,(function(){return i[t]}))}(r);e["default"]=o.a},"4aab":function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i={data:function(){return{disabled:!1,text:"获取验证码"}},methods:{sendCode:function(){var t=this;if(!this.disabled){this.disabled=!0;var e=60;this.text="剩余 "+e+"s";var n=setInterval((function(){e-=1,e<0&&clearInterval(n),t.text="剩余 "+e+"s",t.text<"剩余 0s"&&(t.disabled=!1,t.text="重新获取")}),1e3)}}}};e.default=i},"622c":function(t,e,n){var i=n("087b");"string"===typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);var o=n("4f06").default;o("733a3cf8",i,!0,{sourceMap:!1,shadowMode:!1})},a037:function(t,e,n){"use strict";var i=n("4ea4");Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0,n("96cf");var o=i(n("1da1")),r=i(n("4aab")),a=n("d2a5"),u=n("c496"),s=n("5e22"),c=n("2f62"),d={mixins:[r.default],components:{},data:function(){return{phone:"",captcha:"",isAuto:!1,isShowAuth:!1,key:""}},computed:(0,c.mapGetters)(["isLogin"]),onLoad:function(){this.isLogin||(0,u.toLogin)()},methods:{onLoadFun:function(){this.isShowAuth=!1},authColse:function(t){this.isShowAuth=t},editPwd:function(){var t=this;return t.phone?/^1(3|4|5|7|8|9|6)\d{9}$/i.test(t.phone)?t.captcha?void(0,a.bindingPhone)({phone:t.phone,sms_code:t.captcha}).then((function(e){if(void 0===e.data||!e.data.is_bind)return t.$util.Tips({title:"绑定成功！",icon:"success"},{tab:5,url:"/pages/users/user_info/index"});uni.showModal({title:"是否绑定账号",content:e.msg,confirmText:"绑定",success:function(e){if(e.confirm)(0,a.bindingPhone)({phone:t.phone,captcha:t.captcha,step:1}).then((function(e){return t.$util.Tips({title:e.msg,icon:"success"},{tab:5,url:"/pages/users/user_info/index"})})).catch((function(e){return t.$util.Tips({title:e})}));else if(e.cancel)return t.$util.Tips({title:"您已取消绑定！"},{tab:5,url:"/pages/users/user_info/index"})}})})).catch((function(e){return t.$util.Tips({title:e})})):t.$util.Tips({title:"请填写验证码"}):t.$util.Tips({title:"请输入正确的手机号码！"}):t.$util.Tips({title:"请填写手机号码！"})},code:function(){var t=this;return(0,o.default)(regeneratorRuntime.mark((function e(){var n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(n=t,n.phone){e.next=3;break}return e.abrupt("return",n.$util.Tips({title:"请填写手机号码！"}));case 3:if(/^1(3|4|5|7|8|9|6)\d{9}$/i.test(n.phone)){e.next=5;break}return e.abrupt("return",n.$util.Tips({title:"请输入正确的手机号码！"}));case 5:return t.disabled=!0,e.next=8,(0,s.registerVerify)({phone:n.phone,key:n.key,code:n.captcha,type:"binding"}).then((function(e){t.disabled=!1,n.$util.Tips({title:e.msg}),n.sendCode()})).catch((function(e){return t.disabled=!1,n.$util.Tips({title:e})}));case 8:case"end":return e.stop()}}),e)})))()}}};e.default=d},d2a5:function(t,e,n){"use strict";var i=n("4ea4");Object.defineProperty(e,"__esModule",{value:!0}),e.getIndexData=r,e.getLogo=a,e.setFormId=u,e.setCouponReceive=s,e.getCoupons=c,e.getShopCoupons=d,e.getUserCoupons=l,e.getArticleCategoryList=f,e.getArticleList=p,e.getArticleHotList=h,e.getArticleBannerList=g,e.getArticleDetails=v,e.loginMobile=b,e.verifyCode=m,e.registerVerify=w,e.phoneRegister=A,e.phoneRegisterReset=y,e.phoneLogin=C,e.switchH5Login=x,e.bindingPhone=_,e.logout=P,e.getTemlIds=k,e.pink=$,e.getCity=T,e.getLiveList=L;var o=i(n("112d"));function r(){return o.default.get("common/home",{},{noAuth:!0})}function a(){return o.default.get("wechat/get_logo",{},{noAuth:!0})}function u(t){return o.default.post("wechat/set_form_id",{formId:t})}function s(t){return o.default.post("coupon/receive/"+t)}function c(t){return o.default.get("coupon/product",t,{noAuth:!0})}function d(t){return o.default.get("coupon/store/"+t,{},{noAuth:!0})}function l(t){return o.default.get("coupon/list",t)}function f(){return o.default.get("article/category/lst",{},{noAuth:!0})}function p(t,e){return o.default.get("article/lst/"+t,e,{noAuth:!0})}function h(){return o.default.get("article/hot/list",{},{noAuth:!0})}function g(){return o.default.get("article/banner/list",{},{noAuth:!0})}function v(t){return o.default.get("article/detail/"+t,{},{noAuth:!0})}function b(t){return o.default.post("login/mobile",t,{noAuth:!0})}function m(){return o.default.get("verify_code",{},{noAuth:!0})}function w(t,e,n,i){return o.default.post("register/verify",{phone:t,type:void 0===e?"reset":e,key:n,code:i},{noAuth:!0})}function A(t){return o.default.post("register",t,{noAuth:!0})}function y(t){return o.default.post("register/reset",t,{noAuth:!0})}function C(t){return o.default.post("login",t,{noAuth:!0})}function x(t){return o.default.post("user/switch",t)}function _(t){return o.default.post("user/binding",t)}function P(){return o.default.get("logout")}function k(){return o.default.get("wechat/teml_ids",{},{noAuth:!0})}function $(){return o.default.get("pink",{},{noAuth:!0})}function T(){return o.default.get("system/city/lst",{},{noAuth:!0})}function L(t,e){return o.default.get("wechat/live",{page:t,limit:e},{noAuth:!0})}},d4f5:function(t,e,n){"use strict";var i;n.d(e,"b",(function(){return o})),n.d(e,"c",(function(){return r})),n.d(e,"a",(function(){return i}));var o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-uni-view",[n("v-uni-form",{attrs:{"report-submit":"true"},on:{submit:function(e){arguments[0]=e=t.$handleEvent(e),t.editPwd.apply(void 0,arguments)}}},[n("v-uni-view",{staticClass:"ChangePassword"},[n("v-uni-view",{staticClass:"list"},[n("v-uni-view",{staticClass:"item"},[n("v-uni-input",{attrs:{type:"number",placeholder:"填写手机号码","placeholder-class":"placeholder"},model:{value:t.phone,callback:function(e){t.phone=e},expression:"phone"}})],1),n("v-uni-view",{staticClass:"item acea-row row-between-wrapper"},[n("v-uni-input",{staticClass:"codeIput",attrs:{type:"number",placeholder:"填写验证码","placeholder-class":"placeholder"},model:{value:t.captcha,callback:function(e){t.captcha=e},expression:"captcha"}}),n("v-uni-button",{staticClass:"code font-color",class:!0===t.disabled?"on":"",attrs:{disabled:t.disabled},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.code.apply(void 0,arguments)}}},[t._v(t._s(t.text))])],1)],1),n("v-uni-button",{staticClass:"confirmBnt bg-color",attrs:{"form-type":"submit"}},[t._v("确认绑定")])],1)],1)],1)},r=[]},d740:function(t,e,n){"use strict";var i=n("622c"),o=n.n(i);o.a},f09c:function(t,e,n){"use strict";n.r(e);var i=n("d4f5"),o=n("21f7");for(var r in o)"default"!==r&&function(t){n.d(e,t,(function(){return o[t]}))}(r);n("d740");var a,u=n("f0c5"),s=Object(u["a"])(o["default"],i["b"],i["c"],!1,null,"8d0d5cf0",null,!1,i["a"],a);e["default"]=s.exports}}]);
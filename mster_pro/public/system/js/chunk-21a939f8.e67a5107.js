(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-21a939f8"],{"3d3b":function(e,t,n){},"4f9b":function(e,t,n){"use strict";n("f54d")},7979:function(e,t,n){"use strict";n("3d3b")},"9a9b":function(e,t,n){e.exports=n.p+"system/img/laber.d00bb7e6.png"},"9ed6":function(e,t,n){"use strict";n.r(t);var o=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"page-account"},[n("div",{staticClass:"container",class:[e.fullWidth>768?"containerSamll":"containerBig"]},[e.fullWidth>768?[n("swiper",{staticClass:"swiperPross",attrs:{options:e.swiperOption}},[e._l(e.swiperList,(function(e,t){return n("swiper-slide",{key:t,staticClass:"swiperPic"},[n("img",{attrs:{src:e.pic}})])})),e._v(" "),n("div",{staticClass:"swiper-pagination",attrs:{slot:"pagination"},slot:"pagination"})],2)]:e._e(),e._v(" "),n("div",{staticClass:"index_from page-account-container"},[e._m(0),e._v(" "),n("div",{staticClass:"page-account-top"},[n("div",{staticClass:"page-account-top-logo"},[n("img",{attrs:{src:e.loginLogo,alt:"logo"}})])]),e._v(" "),n("el-form",{ref:"loginForm",staticClass:"login-form",attrs:{model:e.loginForm,rules:e.loginRules,autocomplete:"on","label-position":"left"},on:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.handleLogin(t)}}},[n("el-form-item",{attrs:{prop:"account"}},[n("el-input",{ref:"account",attrs:{"prefix-icon":"el-icon-user",placeholder:"用户名",name:"username",type:"text",tabindex:"1",autocomplete:"on"},model:{value:e.loginForm.account,callback:function(t){e.$set(e.loginForm,"account",t)},expression:"loginForm.account"}})],1),e._v(" "),n("el-form-item",{attrs:{prop:"password"}},[n("el-input",{key:e.passwordType,ref:"password",attrs:{"prefix-icon":"el-icon-lock",type:e.passwordType,placeholder:"密码",name:"password",tabindex:"2","auto-complete":"on"},model:{value:e.loginForm.password,callback:function(t){e.$set(e.loginForm,"password",t)},expression:"loginForm.password"}}),e._v(" "),n("span",{staticClass:"show-pwd",on:{click:e.showPwd}},[n("svg-icon",{attrs:{"icon-class":"password"===e.passwordType?"eye":"eye-open"}})],1)],1),e._v(" "),n("el-form-item",{staticClass:"captcha",attrs:{prop:"code"}},[n("div",{staticClass:"captcha"},[n("el-input",{ref:"username",staticStyle:{width:"168px"},attrs:{"prefix-icon":"el-icon-message",placeholder:"验证码",name:"username",type:"text",tabindex:"3",autocomplete:"on"},model:{value:e.loginForm.code,callback:function(t){e.$set(e.loginForm,"code",t)},expression:"loginForm.code"}}),e._v(" "),n("div",{staticClass:"imgs",on:{click:function(t){return e.getCaptcha()}}},[n("img",{attrs:{src:e.captchatImg}})])],1)]),e._v(" "),n("el-button",{staticStyle:{width:"100%","margin-bottom":"30px"},attrs:{loading:e.loading,type:"primary"},nativeOn:{click:function(t){return t.preventDefault(),e.handleLogin(t)}}},[e._v("登录")])],1)],1)],2)])},i=[function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",{staticClass:"labelPic"},[o("img",{attrs:{src:n("9a9b")}})])}],a=(n("ac6a"),n("456d"),n("c24f")),s=n("bbcc"),r=n("2b0e");function c(e){e.$on("notice",(function(e){this.$notify.info({title:e.title||"消息",message:e.message,onClick:function(){console.log("click")}})}))}function l(e){return new WebSocket("".concat(s["a"].wsSocketUrl,"?type=admin&token=").concat(e))}function u(e){var t,n=l(e),o=new r["default"];function i(e,t){n.send(JSON.stringify({type:e,data:t}))}return n.onopen=function(){o.$emit("open"),t=setInterval((function(){i("ping")}),1e4)},n.onmessage=function(e){o.$emit("message",e);var t=JSON.parse(e.data);200===t.status&&o.$emit(t.data.status,t.data.result),console.log(e)},n.onclose=function(e){o.$emit("close",e),console.log("on close"),clearInterval(t)},c(o),function(){n.close()}}var d=u;!function(){function e(e,t,n){return e.getAttribute(t)||n}function t(e){return document.getElementsByTagName(e)}function n(){var n=t("script"),o=n.length,i=n[o-1];return{l:o,z:e(i,"zIndex",-2),o:e(i,"opacity",.8),c:e(i,"color","255,255,255"),n:e(i,"count",240)}}function o(){a=r.width=window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth,s=r.height=window.innerHeight||document.documentElement.clientHeight||document.body.clientHeight}function i(){if(d+=1,d<5)m(i);else{d=0,u.clearRect(0,0,a,s);var e,t,n,o,r,l,g=[p].concat(f);f.forEach((function(i){for(i.x+=i.xa,i.y+=i.ya,i.xa*=i.x>a||i.x<0?-1:1,i.ya*=i.y>s||i.y<0?-1:1,u.fillRect(i.x-.5,i.y-.5,2,2),u.fillStyle="#FFFFFF",t=0;t<g.length;t++)e=g[t],i!==e&&null!==e.x&&null!==e.y&&(o=i.x-e.x,r=i.y-e.y,l=o*o+r*r,l<e.max&&(e===p&&l>=e.max/2&&(i.x-=.03*o,i.y-=.03*r),n=(e.max-l)/e.max,u.beginPath(),u.lineWidth=n/2,u.strokeStyle="rgba("+c.c+","+(n+.2)+")",u.moveTo(i.x,i.y),u.lineTo(e.x,e.y),u.stroke()));g.splice(g.indexOf(i),1)})),m(i)}}var a,s,r=document.createElement("canvas"),c=n(),l="c_n"+c.l,u=r.getContext("2d"),d=0,m=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(e){window.setTimeout(e,1e3/45)},g=Math.random,p={x:null,y:null,max:2e4};r.id=l,r.style.cssText="position:fixed;top:0;left:0;z-index:"+c.z+";opacity:"+c.o,t("body")[0].appendChild(r),o(),window.onresize=o,window.onmousemove=function(e){e=e||window.event,p.x=e.clientX,p.y=e.clientY},window.onmouseout=function(){p.x=null,p.y=null};for(var f=[],h=0;c.n>h;h++){var w=g()*a,y=g()*s,v=2*g()-1,b=2*g()-1;f.push({x:w,y:y,xa:v,ya:b,max:6e3})}setTimeout((function(){i()}),100)}();var m=n("a78e"),g=n.n(m),p={name:"Login",data:function(){var e=function(e,t,n){t?n():n(new Error("请输入用户名"))},t=function(e,t,n){t?t.length<6?n(new Error("请输入不少于6位数的密码")):n():n(new Error("请输入密码"))};return{fullWidth:document.body.clientWidth,swiperOption:{pagination:{el:".pagination"},autoplay:{enabled:!0,disableOnInteraction:!1,delay:3e3}},loginLogo:"",swiperList:[],captchatImg:"",loginForm:{account:"",password:"",key:"",code:""},loginRules:{account:[{required:!0,trigger:"blur",validator:e}],password:[{required:!0,trigger:"blur",validator:t}],code:[{required:!0,message:"请输入正确的验证码",trigger:"blur"}]},passwordType:"password",capsTooltip:!1,loading:!1,showDialog:!1,redirect:void 0,otherQuery:{}}},watch:{fullWidth:function(e){if(!this.timer){this.screenWidth=e,this.timer=!0;var t=this;setTimeout((function(){t.timer=!1}),400)}},$route:{handler:function(e){var t=e.query;t&&(this.redirect=t.redirect,this.otherQuery=this.getOtherQuery(t))},immediate:!0}},created:function(){var e=this;document.onkeydown=function(t){if(-1!==e.$route.path.indexOf("login")){var n=window.event.keyCode;13===n&&e.handleLogin()}},window.addEventListener("resize",this.handleResize)},mounted:function(){var e=this;console.log(this.title),this.getInfo(),this.$nextTick((function(){e.screenWidth<768?document.getElementsByTagName("canvas")[0].removeAttribute("class","index_bg"):document.getElementsByTagName("canvas")[0].className="index_bg"})),this.getCaptcha()},beforeCreate:function(){this.fullWidth<768?document.getElementsByTagName("canvas")[0].removeAttribute("class","index_bg"):document.getElementsByTagName("canvas")[0].className="index_bg"},beforeDestroy:function(){window.removeEventListener("resize",this.handleResize),document.getElementsByTagName("canvas")[0].removeAttribute("class","index_bg")},destroyed:function(){},methods:{getInfo:function(){var e=this;Object(a["s"])().then((function(t){var n=t.data;e.swiperList=n.login_banner,e.loginLogo=n.login_logo,g.a.set("MerInfo",JSON.stringify(n)),console.log(g.a.get("MerInfo"))})).catch((function(t){var n=t.message;e.$message.error(n)}))},getCaptcha:function(){var e=this;Object(a["c"])().then((function(t){var n=t.data;e.captchatImg=n.captcha,e.loginForm.key=n.key})).catch((function(t){var n=t.message;e.$message.error(n)}))},checkCapslock:function(e){var t=e.key;this.capsTooltip=t&&1===t.length&&t>="A"&&t<="Z"},showPwd:function(){var e=this;"password"===this.passwordType?this.passwordType="":this.passwordType="password",this.$nextTick((function(){e.$refs.password.focus()}))},handleLogin:function(){var e=this;this.$refs["loginForm"].validate((function(t){if(!t)return!1;e.loading=!0,e.$store.dispatch("user/login",e.loginForm).then((function(t){e.$router.push({path:e.redirect||"/",query:e.otherQuery}),e.loading=!1,e.$root.notice=d(t.token)})).catch((function(t){e.loginForm.code="",e.$message.error(t.message),e.loading=!1,e.getCaptcha()}))}))},getOtherQuery:function(e){return Object.keys(e).reduce((function(t,n){return"redirect"!==n&&(t[n]=e[n]),t}),{})},handleResize:function(e){this.fullWidth=document.body.clientWidth,this.fullWidth<768?document.getElementsByTagName("canvas")[0].removeAttribute("class","index_bg"):document.getElementsByTagName("canvas")[0].className="index_bg"}}},f=p,h=(n("4f9b"),n("7979"),n("2877")),w=Object(h["a"])(f,o,i,!1,null,"3ac100e2",null);t["default"]=w.exports},f54d:function(e,t,n){}}]);
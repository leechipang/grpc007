<template>
	<div class="register absolute">
		<div class="shading">
			<div class="pictrue acea-row row-center-wrapper">
				<image :src="logoUrl" v-if="logoUrl" />
				<image src="/static/images/logo2.png" v-else />
			</div>
		</div>
		<div class="whiteBg" v-if="formItem === 1">
			<div class="title acea-row row-center-wrapper">
				<div class="item" :class="current === index ? 'on' : ''" v-for="(item, index) in navList" @click="navTap(index)"
				 :key="index">
					{{ item }}
				</div>
			</div>
			<div class="list" :hidden="current !== 0">
				<form @submit.prevent="submit">
					<div class="item">
						<div class="acea-row row-middle">
							<image src="/static/images/phone_1.png"></image>
							<input type="text" placeholder="输入手机号码" v-model="account" required />
						</div>
					</div>
					<div class="item">
						<div class="acea-row row-middle">
							<image src="/static/images/code_2.png"></image>
							<input type="password" placeholder="填写登录密码" v-model="password" required />
						</div>
					</div>
				</form>
				<navigator class="forgetPwd" hover-class="none" url="/pages/users/retrievePassword/index">
					<span class="iconfont icon-wenti"></span>忘记密码
				</navigator>
			</div>
			<div class="list" :hidden="current !== 1">
				<div class="item">
					<div class="acea-row row-middle">
						<image src="/static/images/phone_1.png"></image>
						<input type="text" placeholder="输入手机号码" v-model="account" />
					</div>
				</div>
				<div class="item">
					<div class="acea-row row-middle">
						<image src="/static/images/code_2.png"></image>
						<input type="text" placeholder="填写验证码" class="codeIput" v-model="captcha" />
						<button class="code" :disabled="disabled" :class="disabled === true ? 'on' : ''" @click="code">
							{{ text }}
						</button>
					</div>
				</div>
				<div class="item" v-if="isShowCode">
					<div class="acea-row row-middle">
						<image src="/static/images/code_2.png"></image>
						<input type="text" placeholder="填写验证码" class="codeIput" v-model="codeVal" />
						<div class="code" @click="again"><img :src="codeUrl" /></div>
					</div>
				</div>
			</div>
			<div class="logon" @click="loginMobile" :hidden="current !== 1">登录</div>
			<div class="logon" @click="submit" :hidden="current === 1">登录</div>
			<!-- <div class="tip">
				没有账号?
				<span @click="formItem = 2" class="font-color-red">立即注册</span>
			</div> -->
		</div>
		<div class="whiteBg" v-else>
			<div class="title">注册账号</div>
			<div class="list">
				<div class="item">
					<div class="acea-row row-middle">
						<image src="/static/images/phone_1.png"></image>
						<input type="text" placeholder="输入手机号码" v-model="account" />
					</div>
				</div>
				<div class="item">
					<div class="acea-row row-middle">
						<image src="/static/images/code_2.png"></image>
						<input type="text" placeholder="填写验证码" class="codeIput" v-model="captcha" />
						<button class="code" :disabled="disabled" :class="disabled === true ? 'on' : ''" @click="code">
							{{ text }}
						</button>
					</div>
				</div>
				<div class="item">
					<div class="acea-row row-middle">
						<image src="/static/images/code_1.png"></image>
						<input type="password" placeholder="填写您的登录密码" v-model="password" />
					</div>
				</div>
				<div class="item" v-if="isShowCode">
					<div class="acea-row row-middle">
						<image src="/static/images/code_2.png"></image>
						<input type="text" placeholder="填写验证码" class="codeIput" v-model="codeVal" />
						<div class="code" @click="again"><img :src="codeUrl" /></div>
					</div>
				</div>
			</div>
			<div class="logon" @click="register">注册</div>
			<div class="tip">
				已有账号?
				<span @click="formItem = 1" class="font-color-red">立即登录</span>
			</div>
		</div>
		<div class="bottom"></div>
	</div>
</template>
<script>
	import dayjs from "@/plugin/dayjs/dayjs.min.js";
	import sendVerifyCode from "@/mixins/SendVerifyCode";
	import {
		loginH5,
		loginMobile,
		registerVerify,
		register,
		getCodeApi,
		getUserInfo,
		getCaptcha
	} from "@/api/user";
	import attrs, {
		required,
		alpha_num,
		chs_phone
	} from "@/utils/validate";
	import {
		validatorDefaultCatch
	} from "@/utils/dialog";
	import {
		getLogo,
		getconfig
	} from "@/api/public";
	// import cookie from "@/utils/store/cookie";
	import {
		VUE_APP_API_URL
	} from "@/utils";

	const BACK_URL = "login_back_url";

	export default {
		name: "Login",
		mixins: [sendVerifyCode],
		data: function() {
			return {
				navList: ["账号登录", "快速登录"],
				current: 1,
				account: "",
				password: "",
				captcha: "",
				formItem: 1,
				type: "login",
				logoUrl: "",
				keyCode: "",
				codeUrl: "",
				codeVal: "",
				isShowCode: false
			};
		},
		watch: {
			formItem: function(nval, oVal) {
				if (nval == 1) {
					this.type = 'login'
				} else {
					this.type = 'register'
				}
			}
		},
		onReady() {
			uni.$on('update', (data) => {
				this.logoUrl = data.login_logo
				console.log(this.logoUrl)
			})
		},
		mounted: function() {
			// const app = getApp();
			// this.$nextTick(() => {
			// 	this.logoUrl = app.globalData.login_logo
			// 	console.log(this.logoUrl)
			// });

		},
		methods: {
			again() {
				// this.codeUrl =
				// 	VUE_APP_API_URL +
				// 	"/sms_captcha?" +
				// 	"key=" +
				// 	this.keyCode +
				// 	Date.parse(new Date());
				this.getcaptcha()
			},
			getCode() {
				let that = this
				getCodeApi()
					.then(res => {
						that.keyCode = res.data.key;
					})
					.catch(res => {
						that.$util.Tips({
							title: res
						});
					});
			},

			async getLogoImage() {
				let that = this;
				getLogo(2).then(res => {
					that.logoUrl = res.data.logo_url;
				});
			},
			async loginMobile() {
				let that = this;
				if (!that.account) return that.$util.Tips({
					title: '请输入手机号码'
				});
				if (!/^1(3|4|5|7|8|9|6)\d{9}$/i.test(that.account)) return that.$util.Tips({
					title: '请输入正确的手机号码'
				});
				if (!that.captcha) return that.$util.Tips({
					title: '请输入验证码'
				});
				if (!/^[\w\d]+$/i.test(that.captcha)) return that.$util.Tips({
					title: '请输入正确的验证码'
				});
				loginMobile({
						phone: that.account,
						sms_code: that.captcha,
						spread: that.$Cache.get("spread")
					})
					.then(({
						data
					}) => {
						const backUrl = that.$Cache.get(BACK_URL) || "/pages/index/index";
						that.$Cache.clear(BACK_URL);
						that.$store.commit("LOGIN", {
							'token': data.token,
							'time': data.exp
						});
						that.$store.commit("SETUID", data.user.uid);
						that.$store.commit('UPDATE_USERINFO', data.user);

						let method
						let indexPat = ['/pages/index/index', '/pages/order_addcart/order_addcart', '/pages/goods_cate/goods_cate',
							'/pages/user/index'
						]
						if (indexPat.includes(this.getPath(backUrl))) {
							method = 'switchTab'
						} else {
							method = 'navigateTo'
						}
						if (this.getPath(backUrl) === '/pages/users/login/index') {
							uni.switchTab({
								url: '/pages/index/index'
							});
							return
						}
						uni[method]({
							url: backUrl
						});

						// if (backUrl === '/pages/index/index' || backUrl === '/pages/order_addcart/order_addcart' || backUrl ===
						// 	'/pages/user/index') {
						// 	uni.switchTab({
						// 		url: backUrl
						// 	});
						// } else {
						// 	uni.switchTab({
						// 		url: '/pages/index/index'
						// 	});
						// }
					})
					.catch(res => {
						that.$util.Tips({
							title: res
						});
					});
			},
			async register() {
				let that = this;
				if (!that.account) return that.$util.Tips({
					title: '请输入手机号码'
				});
				if (!/^1(3|4|5|7|8|9|6)\d{9}$/i.test(that.account)) return that.$util.Tips({
					title: '请输入正确的手机号码'
				});
				if (!that.captcha) return that.$util.Tips({
					title: '请输入验证码'
				});
				if (!/^[\w\d]+$/i.test(that.captcha)) return that.$util.Tips({
					title: '请输入正确的验证码'
				});
				if (!that.password) return that.$util.Tips({
					title: '请输入密码'
				});
				if (!/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/i.test(that.password)) return that.$util.Tips({
					title: '您输入的密码过于简单'
				});
				register({
						account: that.account,
						captcha: that.captcha,
						password: that.password,
						spread: that.$Cache.get("spread")
					})
					.then(res => {
						that.$util.Tips({
							title: res
						});
						that.formItem = 1;
					})
					.catch(res => {
						that.$util.Tips({
							title: res
						});
					});
			},
			async code() {
				let that = this;
				if (!that.account) return that.$util.Tips({
					title: '请输入手机号码'
				});
				if (!/^1(3|4|5|7|8|9|6)\d{9}$/i.test(that.account)) return that.$util.Tips({
					title: '请输入正确的手机号码'
				});
				// if (that.formItem == 2) that.type = "register";
				await registerVerify({
						phone: that.account,
						type: 'login',
						key: that.keyCode,
						code: that.codeVal
					})
					.then(res => {
						that.$util.Tips({
							title: res.message
						});
						that.sendCode();
					})
					.catch(res => {
						console.log(res, 'res22222222')
						that.getcaptcha();

						that.$util.Tips({
							title: res
						});
					});
			},
			getcaptcha() {
				let that = this
				getCaptcha().then(data => {
					// that.codeUrl = `${VUE_APP_API_URL}/sms_captcha?key=${that.keyCode}`;
					that.codeUrl = data.data.captcha;
				})
				that.isShowCode = true;
			},
			navTap: function(index) {
				this.current = index;
			},
			getPath(url) {
				if (url.indexOf("?") != -1) {
					url = url.split("?")[0];
					console.log(url);
				}
				return url
			},
			async submit() {
				let that = this;
				if (!that.account) return that.$util.Tips({
					title: '请输入账号'
				});
				if (!/^[\w\d]{5,16}$/i.test(that.account)) return that.$util.Tips({
					title: '请输入正确的账号'
				});
				if (!that.password) return that.$util.Tips({
					title: '请输入密码'
				});
				loginH5({
						account: that.account,
						password: that.password,
						spread: that.$Cache.get("spread")
					})
					.then(({
						data
					}) => {
						const backUrl = that.$Cache.get(BACK_URL) || "/pages/index/index";
						that.$Cache.clear(BACK_URL);
						that.$store.commit("LOGIN", {
							'token': data.token,
							'time': data.exp
						});
						that.$store.commit("SETUID", data.user.uid);
						that.$store.commit('UPDATE_USERINFO', data.user);

						console.log(backUrl)
						console.log(this.getPath(backUrl))
						// if (backUrl) {
						// 	uni.navigateBack({
						// 		delta: 1
						// 	});
						// } else {
						// 	uni.switchTab({
						// 		url: '/pages/index/index'
						// 	});
						// }
						let method
						let indexPat = ['/pages/index/index', '/pages/order_addcart/order_addcart', '/pages/goods_cate/goods_cate',
							'/pages/user/index'
						]
						if (indexPat.includes(this.getPath(backUrl))) {
							method = 'switchTab'
						} else {
							method = 'navigateTo'
						}
						if (this.getPath(backUrl) === '/pages/users/login/index') {
							uni.switchTab({
								url: '/pages/index/index'
							});
							return
						}
						uni[method]({
							url: backUrl
						});


						// if (backUrl === '/pages/index/index' || backUrl === '/pages/order_addcart/order_addcart' || backUrl ===
						// 	'/pages/user/index' || this.getPath(backUrl) === '/pages/columnGoods/goods_search_con/index') {
						// 	console.log('111')
						// 	if (this.getPath(backUrl) === '/pages/columnGoods/goods_search_con/index') {
						// 		uni.navigateTo({
						// 			url: backUrl
						// 		});
						// 	} else {
						// 		uni.switchTab({
						// 			url: backUrl
						// 		});
						// 	}
						// } else {
						// 	if (backUrl.split("?")[0] === '/pages/activity/assist_detail/index') {
						// 		uni.navigateTo({
						// 			url: backUrl
						// 		});
						// 	} else {
						// 		uni.switchTab({
						// 			url: '/pages/index/index'
						// 		});
						// 	}

						// }
					})
					.catch(e => {
						that.$util.Tips({
							title: e
						});
					});
			}
		}
	};
</script>
<style lang="scss">
	.code img {
		width: 100%;
		height: 100%;
	}

	.acea-row.row-middle {
		input {
			margin-left: 20rpx;
		}
	}
</style>

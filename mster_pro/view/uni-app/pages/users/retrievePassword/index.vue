<template>
	<div class="register absolute">
		<div class="shading">
			<div class="pictrue acea-row row-center-wrapper">
				<image :src="logoUrl" v-if="logoUrl" />
				<image src="/static/images/logo2.png" v-else />
			</div>
		</div>
		<div class="whiteBg">
			<div class="title">忘记密码</div>
			<div class="list">
				<div class="item">
					<div class="acea-row row-middle">
						<image src="/static/images/phone_1.png"></image>
						<input type="text" placeholder="输入手机号码" v-model="account" autocomplete="off" />
						<input type="text" style="height: 0;opacity: 0">
					</div>
				</div>
				<div class="item">
					<div class="acea-row row-middle">
						<image src="/static/images/code_2.png"></image>
						<input type="password" placeholder="填写您的新密码" v-model="password" autocomplete="off" />
					</div>
				</div>
				<div class="item">
					<div class="acea-row row-middle">
						<image src="/static/images/code_2.png"></image>
						<input type="password" placeholder="再次输入新密码" v-model="confirm_pwd" autocomplete="off" />
					</div>
				</div>
				<div class="item">
					<div class="acea-row row-middle">
						<image src="/static/images/code_2.png"></image>
						<input type="text" placeholder="填写验证码" class="codeIput" v-model="captcha" autocomplete="off" />
						<button class="code" :disabled="disabled" :class="disabled === true ? 'on' : ''" @click="code">
							{{ text }}
						</button>
					</div>
				</div>
				<div class="item" v-if="isShowCode">
					<div class="align-left">
						<input type="text" placeholder="填写验证码" class="codeIput" v-model="codeVal" />
						<div class="code" @click="again"><img :src="codeUrl" /></div>
					</div>
				</div>
			</div>
			<div class="logon" @click="registerReset">确认</div>
			<div class="tip">
				<span class="font-color-red" @click="back">立即登录</span>
			</div>
		</div>
		<div class="bottom"></div>
	</div>
</template>

<script>
	const app = getApp();
	import sendVerifyCode from "@/mixins/SendVerifyCode";
	import {
		registerVerify,
		registerForget,
		getCodeApi,
		getCaptcha
	} from "@/api/user";
	import {
		validatorDefaultCatch
	} from "@/utils/dialog";
	import attrs, {
		required,
		alpha_num,
		chs_phone
	} from "@/utils/validate";

	export default {
		name: "RetrievePassword",
		mixins: [sendVerifyCode],
		data: function() {
			return {
				account: "",
				password: "",
				confirm_pwd: "",
				captcha: "",
				codeKey: "",
				codeUrl: "",
				codeVal: "",
				isShowCode: false,
				logoUrl: "",
			};
		},
		onReady() {

			uni.$on('update', (data) => {
				this.logoUrl = data.login_logo
			})
		},
		mounted: function() {
			this.$nextTick(() => {
				this.logoUrl = app.globalData.login_logo
			});
		},
		methods: {
			back() {
				uni.navigateBack();
			},
			again() {
				this.codeUrl =
					VUE_APP_API_URL + "/captcha?" + this.keyCode + Date.parse(new Date());
				console.log(this.codeUrl);
			},

			async code() {
				let that = this;
				// that.sendCode();

				if (!that.account) return that.$util.Tips({
					title: '请填写手机号码'
				});
				if (!/^1(3|4|5|7|8|9|6)\d{9}$/i.test(that.account)) return that.$util.Tips({
					title: '请输入正确的手机号码'
				});

				await registerVerify({
						phone: that.account,
						type: 'change_pwd',
						key: that.codeKey,
						code: that.codeVal,
					})
					.then(res => {

						that.$util.Tips({
							title: res.message
						});
						that.sendCode();
					}).catch(res => {
						console.log(res, 'res')
						that.getcaptcha();
						that.$util.Tips({
							title: res
						});
					});

			},

			getcaptcha() {
				let that = this
				getCaptcha().then(data => {
					that.codeUrl = data.data.captcha; //图片路径
					that.codeVal = data.data.code; //图片验证码
					that.codeKey = data.data.key //图片验证码key
				})
				that.isShowCode = true;
			},
			async registerReset() {
				var that = this;
				if (!that.account) return that.$util.Tips({
					title: '请填写手机号码'
				});
				if (!/^1(3|4|5|7|8|9|6)\d{9}$/i.test(that.account)) return that.$util.Tips({
					title: '请输入正确的手机号码'
				});
				if (that.password == '123456') return that.$util.Tips({
					title: '您输入的密码过于简单'
				});
				if (that.password != that.confirm_pwd) return that.$util.Tips({
					title: '两次密码不一致'
				});
				if (!that.captcha) return that.$util.Tips({
					title: '请填写验证码'
				});
				registerForget({
						phone: that.account,
						sms_code: that.captcha,
						pwd: that.password,
						confirm_pwd: that.confirm_pwd
					})
					.then(res => {
						that.$util.Tips({
							title: res.msg
						}, {
							tab: 3
						})
					})
					.catch(res => {
						that.$util.Tips({
							title: res
						})
					});
			},
		}
	};
</script>
<style scoped>
	.code img {
		width: 100%;
		height: 100%;
	}
</style>

<template>
	<view>
		<form @submit="editPwd" report-submit='true'>
			<view class="ChangePassword">
				<view class="list">
					<view class="item">
						<input type='number' placeholder='填写手机号码' placeholder-class='placeholder' v-model="phone"></input>
					</view>
					<view class="item acea-row row-between-wrapper">
						<input type='number' placeholder='填写验证码' placeholder-class='placeholder' class="codeIput" v-model="captcha"></input>
						<button class="code font-color" :class="disabled === true ? 'on' : ''" :disabled='disabled' @click="code">
							{{ text }}
						</button>
					</view>
					<view class="item">
						<input type='text' placeholder='填写本人姓名' placeholder-class='placeholder' v-model="real_name"></input>
					</view>
					<view class="item">
						<input type='text' placeholder='填写本人身份证号' placeholder-class='placeholder' v-model="card_id"></input>
					</view>
				</view>
				<button form-type="submit" class="confirmBnt bg-color">确认绑定</button>
			</view>
		</form>
		<!-- #ifdef MP -->
		<authorize @onLoadFun="onLoadFun" :isAuto="isAuto" :isShowAuth="isShowAuth" @authColse="authColse"></authorize>
		<!-- #endif -->
	</view>
</template>

<script>
	import sendVerifyCode from "@/mixins/SendVerifyCode";
	import {
		bindingPhone,
		verifyCode,
		bindInfo,
		
	} from '@/api/api.js';
	import {
		toLogin
	} from '@/libs/login.js';
	import { registerVerify } from '@/api/user.js'
	import {
		mapGetters
	} from "vuex";
	// #ifdef MP
	import authorize from '@/components/Authorize';
	// #endif
	export default {
		mixins: [sendVerifyCode],
		components: {
			// #ifdef MP
			authorize
			// #endif
		},
		data() {
			return {
				phone:'',
				captcha:'',
				isAuto: false, //没有授权的不会自动授权
				isShowAuth: false, //是否隐藏授权
				key: '',
				real_name:'',
				card_id:''
			};
		},
		computed: mapGetters(['isLogin']),
		onLoad() {
			if (this.isLogin) {
				this.init()
				// verifyCode().then(res=>{
				// 	this.$set(this, 'key', res.data.key)
				// });
			} else {
				// #ifdef H5 || APP-PLUS
				toLogin();
				// #endif 
				// #ifdef MP
				this.isAuto = true;
				this.$set(this, 'isShowAuth', true)
				// #endif
			}
		},
		methods: {
			onLoadFun:function(){
				this.isShowAuth = false;
			},
			// 授权关闭
			authColse: function(e) {
				this.isShowAuth = e
			},
			init(){
				bindInfo({
			
				}).then(res => {
					if(res.status == 200){
						var data = res.data
						this.phone = data.phone
						this.card_id = data.card_id
						this.real_name = data.real_name
					}
					console.log(res)
				}).catch(err => {
					return that.$util.Tips({
						title: err
					});
				})
			},
			editPwd: function() {
				let that = this;
				if (!that.phone) return that.$util.Tips({
					title: '请填写手机号码！'
				});
				if (!(/^1(3|4|5|7|8|9|6)\d{9}$/i.test(that.phone))) return that.$util.Tips({
					title: '请输入正确的手机号码！'
				});
				if (!that.captcha) return that.$util.Tips({
					title: '请填写验证码'
				});
				if (!that.real_name) return that.$util.Tips({
					title: '请填写本人姓名'
				});
				if (!that.card_id) return that.$util.Tips({
					title: '请填写本人身份证号'
				});
				bindingPhone({
					phone: that.phone,
					sms_code: that.captcha,
					real_name: that.real_name,
					card_id: that.card_id,
				}).then(res => {
					if (res.data !== undefined && res.data.is_bind) {
						uni.showModal({
							title: '是否绑定账号',
							content: res.msg,
							confirmText: '绑定',
							success(res) {
								if (res.confirm) {
									bindingPhone({
										phone: that.phone,
										captcha: that.captcha,
										step: 1
									}).then(res => {
										that.$util.Tips({
											title: res.msg,
											icon: 'success'
										});
										setTimeout(()=>{
											uni.navigateBack({
												delta: 1
											});
										},700)
									}).catch(err => {
										return that.$util.Tips({
											title: err
										});
									})
								} else if (res.cancel) {
									return that.$util.Tips({
										title: '您已取消绑定！'
									}, {
										tab: 5,
										url: '/pages/users/user_info/index'
									});
								}
							}
						});
					} else
						return that.$util.Tips({
							title: '绑定成功！',
							icon: 'success'
						}, {
							tab: 5,
							url: '/pages/users/user_info/index'
						});
				}).catch(err => {
					return that.$util.Tips({
						title: err
					});
				})
			},
			/**
			 * 发送验证码
			 * 
			 */
			async code() {
				let that = this;
				if (!that.phone) return that.$util.Tips({
					title: '请填写手机号码！'
				});
				if (!(/^1(3|4|5|7|8|9|6)\d{9}$/i.test(that.phone))) return that.$util.Tips({
					title: '请输入正确的手机号码！'
				});
				this.disabled = true
				await registerVerify({
					phone:that.phone,
					key:that.key, 
					code:that.captcha,
					type: 'binding'
				}).then(res => {
					this.disabled = false
					that.$util.Tips({
						title: res.msg
					});
					that.sendCode();
				}).catch(err => {
					this.disabled = false
					return that.$util.Tips({
						title: err
					});
				});
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #fff !important;
	}

	.ChangePassword .phone {
		font-size: 32rpx;
		font-weight: bold;
		text-align: center;
		margin-top: 55rpx;
	}

	.ChangePassword .list {
		width: 580rpx;
		margin: 53rpx auto 0 auto;
	}

	.ChangePassword .list .item {
		width: 100%;
		height: 110rpx;
		border-bottom: 2rpx solid #f0f0f0;
	}

	.ChangePassword .list .item input {
		width: 100%;
		height: 100%;
		font-size: 32rpx;
	}

	.ChangePassword .list .item .placeholder {
		color: #b9b9bc;
	}

	.ChangePassword .list .item input.codeIput {
		width: 340rpx;
	}

	.ChangePassword .list .item .code {
		font-size: 32rpx;
		background-color: #fff;
	}

	.ChangePassword .list .item .code.on {
		color: #b9b9bc !important;
	}

	.ChangePassword .confirmBnt {
		font-size: 32rpx;
		width: 580rpx;
		height: 90rpx;
		border-radius: 45rpx;
		color: #fff;
		margin: 92rpx auto 0 auto;
		text-align: center;
		line-height: 90rpx;
	}
</style>

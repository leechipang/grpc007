<template>
	<view>
		<form @submit="formSubmit" report-submit='true'>
			<view class='addAddress'>
				<view class='list'>
					<view class='item acea-row row-between-wrapper'>
						<view class='name'>姓名</view>
						<input type='text' placeholder='请输入姓名' name='real_name' :value="userAddress.real_name" placeholder-class='placeholder'></input>
					</view>
					<view class='item acea-row row-between-wrapper'>
						<view class='name'>联系电话</view>
						<input type='text' placeholder='请输入联系电话' name="phone" :value='userAddress.phone' placeholder-class='placeholder'></input>
					</view>
					<view class='item acea-row row-between-wrapper'>
						<view class='name'>所在地区</view>
						<view class="address">
							<picker mode="multiSelector" @change="bindRegionChange" @columnchange="bindMultiPickerColumnChange" :value="valueRegion"
							 :range="multiArray">
								<view class='acea-row'>
									<view class="picker">{{region[0]}}，{{region[1]}}，{{region[2]}}</view>
									<view class='iconfont icon-dizhi font-color'></view>
								</view>
							</picker>
						</view>
					</view>
					<view class='item acea-row row-between-wrapper'>
						<view class='name'>详细地址</view>
						<input type='text' placeholder='请填写具体地址' name='detail' placeholder-class='placeholder' :value='userAddress.detail'></input>
					</view>
				</view>
				<view class='default acea-row row-middle'>
					<checkbox-group @change='ChangeIsDefault'>
						<checkbox :checked="userAddress.is_default ? true : false" />设置为默认地址</checkbox-group>
				</view>

				<button class='keepBnt bg-color' form-type="submit">立即保存</button>
				<!-- #ifdef MP -->
				<view class="wechatAddress" v-if="!id" @click="getWxAddress">导入微信地址</view>
				<!-- #endif -->
				<!-- #ifdef H5 -->
				<view class="wechatAddress" v-if="this.$wechat.isWeixin() && !id" @click="getAddress">导入微信地址</view>
				<!-- #endif -->
			</view>
		</form>
		<!-- #ifdef MP -->
		<authorize @onLoadFun="onLoadFun" :isAuto="isAuto" :isShowAuth="isShowAuth" @authColse="authColse"></authorize>
		<!-- #endif -->
	</view>
</template>

<script>
	import {
		editAddress,
		getAddressDetail
	} from '@/api/user.js';
	import {
		getCity
	} from '@/api/api.js';
	import {
		toLogin
	} from '@/libs/login.js';
	import {
		mapGetters
	} from "vuex";
	import wPicker from "@/components/wPicker/w-picker.vue";
	// #ifdef MP
	import authorize from '@/components/Authorize';
	// #endif
	export default {
		components: {
			// #ifdef MP
			authorize,
			// #endif
		},
		data() {
			return {
				regionDval: ['浙江省', '杭州市', '滨江区'],
				cartId: '', //购物车id
				pinkId: 0, //拼团id
				couponId: 0, //优惠券id
				address_id: 0, //地址id
				userAddress: {
					is_default: false
				}, //地址详情
				region: ['省', '市', '区'],
				valueRegion: [0, 0, 0],
				isAuto: false, //没有授权的不会自动授权
				isShowAuth: false, //是否隐藏授权
				district: [],
				multiArray: [],
				multiIndex: [0, 0, 0],
				cityId: 0,
				defaultRegion: ['广东省', '广州市', '番禺区'],
				defaultRegionCode: '440113'
			};
		},
		computed: mapGetters(['isLogin']),
		onLoad(options) {
			if (this.isLogin) {
				this.cartId = options.cartId || '';
				this.pinkId = options.pinkId || 0;
				this.couponId = options.couponId || 0;
				this.address_id = options.id || 0;
				uni.setNavigationBarTitle({
					title: options.id ? '修改地址' : '添加地址'
				})
				this.getUserAddress();
				this.getCityList();
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
			// 地址数据
			getCityList: function() {
				let that = this;
				getCity().then(res => {
					this.district = res.data
					that.initialize();
				})
			},
			initialize: function() {
				let that = this,
					province = [],
					city = [],
					area = [];
				if (that.district.length) {
					let cityChildren = that.district[0].children || [];
					let areaChildren = cityChildren.length ? (cityChildren[0].children || []) : [];
					that.district.forEach(function(item) {
						province.push(item.name);
					});
					cityChildren.forEach(function(item) {
						city.push(item.name);
					});
					areaChildren.forEach(function(item) {
						area.push(item.name);
					});
					this.multiArray = [province, city, area]
				}
			},
			bindRegionChange: function(e) {
				let multiIndex = this.multiIndex,
					province = this.district[multiIndex[0]] || {
						children: []
					},
					city = province.children[multiIndex[1]] || {
						city_id: 0
					},
					multiArray = this.multiArray,
					value = e.detail.value;

				this.region = [multiArray[0][value[0]], multiArray[1][value[1]], multiArray[2][value[2]]]
				// this.$set(this.region,0,multiArray[0][value[0]]);
				// this.$set(this.region,1,multiArray[1][value[1]]);
				// this.$set(this.region,2,multiArray[2][value[2]]);
				this.cityId = city.city_id
				this.valueRegion = [0, 0, 0]
				this.initialize();
			},
			bindMultiPickerColumnChange: function(e) {
				let that = this,
					column = e.detail.column,
					value = e.detail.value,
					currentCity = this.district[value] || {
						children: []
					},
					multiArray = that.multiArray,
					multiIndex = that.multiIndex;
				multiIndex[column] = value;
				switch (column) {
					case 0:
						let areaList = currentCity.children[0] || {
							children: []
						};
						multiArray[1] = currentCity.children.map((item) => {
							return item.name;
						});
						multiArray[2] = areaList.children.map((item) => {
							return item.name;
						});
						break;
					case 1:
						let cityList = that.district[multiIndex[0]].children[multiIndex[1]].children || [];
						multiArray[2] = cityList.map((item) => {
							return item.name;
						});
						break;
					case 2:

						break;
				}
				// #ifdef MP
				this.$set(this.multiArray, 0, multiArray[0]);
				this.$set(this.multiArray, 1, multiArray[1]);
				this.$set(this.multiArray, 2, multiArray[2]);
				// #endif
				// #ifdef H5
				this.multiArray = multiArray;
				// #endif



				this.multiIndex = multiIndex
				// this.setData({ multiArray: multiArray, multiIndex: multiIndex});
			},
			// 授权回调
			onLoadFun: function() {
				this.isShowAuth = false;
				this.getUserAddress();
			},
			// 授权关闭
			authColse: function(e) {
				this.isShowAuth = e
			},
			toggleTab(str) {
				this.$refs[str].show();
			},
			// bindRegionChange: function(e) {
			// 	this.$set(this, 'region', e.detail.value);
			// },
			onConfirm(val) {
				this.region = val.checkArr[0] + '-' + val.checkArr[1] + '-' + val.checkArr[2];
			},
			getUserAddress: function() {
				if (!this.address_id) return false;
				let that = this;
				getAddressDetail(this.address_id).then(res => {
					// let region = [res.data.province, res.data.city, res.data.district];
					let region = [res.data.province, res.data.city, res.data.district];
					that.$set(that, 'userAddress', res.data);
					that.$set(that, 'region', region);
					that.city_id = res.data.city_id
				});
			},
			// 导入共享地址（小程序）
			getWxAddress: function() {
				let that = this;
				uni.authorize({
					scope: 'scope.address',
					success: function(res) {
						uni.chooseAddress({
							success: function(res) {
								let addressP = {};
								addressP.province = res.provinceName;
								addressP.city = res.cityName;
								addressP.district = res.countyName;
								editAddress({
									address: addressP,
									is_default: 1,
									real_name: res.userName,
									post_code: res.postalCode,
									phone: res.telNumber,
									detail: res.detailInfo,
									id: 0,
									type: 1,
								}).then(res => {
									setTimeout(function() {
										if (that.cartId) {
											let cartId = that.cartId;
											let pinkId = that.pinkId;
											let couponId = that.couponId;
											that.cartId = '';
											that.pinkId = '';
											that.couponId = '';
											uni.navigateTo({
												url: '/pages/users/order_confirm/index?cartId=' + cartId + '&addressId=' + (that.id ? that.id :
													res.data
													.id) + '&pinkId=' + pinkId + '&couponId=' + couponId
											});
										} else {
											uni.navigateBack({
												delta: 1
											});
										}
									}, 1000);
									return that.$util.Tips({
										title: "添加成功",
										icon: 'success'
									});
								}).catch(err => {
									return that.$util.Tips({
										title: err
									});
								});
							},
							fail: function(res) {
								if (res.errMsg == 'chooseAddress:cancel') return that.$util.Tips({
									title: '取消选择'
								});
							},
						})
					},
					fail: function(res) {
						uni.showModal({
							title: '您已拒绝导入微信地址权限',
							content: '是否进入权限管理，调整授权？',
							success(res) {
								if (res.confirm) {
									uni.openSetting({
										success: function(res) {}
									});
								} else if (res.cancel) {
									return that.$util.Tips({
										title: '已取消！'
									});
								}
							}
						})
					},
				})
			},
			// 导入共享地址（微信）；
			getAddress() {
				let that = this;
				that.$wechat.openAddress().then(userInfo => {
					editAddress({
							id: this.address_id,
							real_name: userInfo.userName,
							phone: userInfo.telNumber,
							province: userInfo.provinceName,
							city: userInfo.cityName,
							district: userInfo.countryName,
							detail: userInfo.detailInfo,
							is_default: 1,
							post_code: userInfo.postalCode,
							type: 1,														
						})
						.then(() => {
							setTimeout(function() {
								if (that.cartId) {
									let cartId = that.cartId;
									let pinkId = that.pinkId;
									let couponId = that.couponId;
									that.cartId = '';
									that.pinkId = '';
									that.couponId = '';
									uni.navigateTo({
										url: '/pages/users/order_confirm/index?cartId=' + cartId + '&addressId=' + (that.id ? that.id :
											res.data
											.id) + '&pinkId=' + pinkId + '&couponId=' + couponId
									});
								} else {
									uni.navigateTo({
										url: '/pages/users/user_address_list/index'
									})
									// history.back();
								}
							}, 1000);
							that.$util.Tips({
								title: "添加成功",
								icon: 'success'
							});
						})
						.catch(err => {
							return that.$util.Tips({
								title: err || "添加失败"
							});
						});
				}).catch(err => {
					console.log(err);
				});
			},
			/**
			 * 提交用户添加地址
			 * 
			 */
			formSubmit: function(e) {
				let that = this,
					value = e.detail.value;
				if (!value.real_name) return that.$util.Tips({
					title: '请填写收货人姓名'
				});
				if (!value.phone) return that.$util.Tips({
					title: '请填写联系电话'
				});
				if (!/^1(3|4|5|7|8|9|6)\d{9}$/i.test(value.phone)) return that.$util.Tips({
					title: '请输入正确的手机号码'
				});
				if (that.region == '省-市-区') return that.$util.Tips({
					title: '请选择所在地区'
				});
				if (!value.detail) return that.$util.Tips({
					title: '请填写详细地址'
				});
				value.address_id = that.address_id;

				let regionArray = that.region;
				// value.address = {
				// 	province: regionArray[0],
				// 	city: regionArray[1],
				// 	district: regionArray[2],
				// 	city_id: that.cityId,
				// };
				value.province = regionArray[0]
				value.city = regionArray[1]
				value.district = regionArray[2]
				value.city_id = that.cityId
				value.is_default = that.userAddress.is_default ? 1 : 0;

				uni.showLoading({
					title: '保存中',
					mask: true
				})
				editAddress(value).then(res => {
					if (that.id)
						that.$util.Tips({
							title: '修改成功',
							icon: 'success'
						});
					else
						that.$util.Tips({
							title: '添加成功',
							icon: 'success'
						});
					setTimeout(function() {
						if (that.cartId) {
							let cartId = that.cartId;
							let pinkId = that.pinkId;
							let couponId = that.couponId;
							that.cartId = '';
							that.pinkId = '';
							that.couponId = '';
							uni.$emit('updataAddress')
							uni.navigateTo({
								url: '/pages/users/order_confirm/index?cartId=' + cartId + '&addressId=' + (that.id ? that.id : res.data
									.address_id) + '&pinkId=' + pinkId + '&couponId=' + couponId
							});
						} else {
							// #ifdef H5
							return history.back();
							// #endif
							// #ifndef H5
							return uni.navigateBack({
								delta: 1,
							})
							// #endif
						}
					}, 1000);
				}).catch(err => {
					return that.$util.Tips({
						title: err
					});
				})
			},
			ChangeIsDefault: function(e) {
				this.$set(this.userAddress, 'is_default', !this.userAddress.is_default);
			}
		}
	}
</script>

<style scoped lang="scss">
	.addAddress .list {
		background-color: #fff;
	}

	.addAddress .list .item {
		padding: 30rpx;
		border-top: 1rpx solid #eee;
	}

	.addAddress .list .item .name {
		width: 195rpx;
		font-size: 30rpx;
		color: #333;
	}

	.addAddress .list .item .address {
		// width: 412rpx;
		flex: 1;
		margin-left: 20rpx;
	}

	.addAddress .list .item input {
		width: 475rpx;
		font-size: 30rpx;
	}

	.addAddress .list .item .placeholder {
		color: #ccc;
	}

	.addAddress .list .item picker {
		width: 475rpx;
	}

	.addAddress .list .item picker .picker {
		width: 410rpx;
		font-size: 30rpx;
	}

	.addAddress .list .item picker .iconfont {
		font-size: 43rpx;
	}

	.addAddress .default {
		padding: 0 30rpx;
		height: 90rpx;
		background-color: #fff;
		margin-top: 23rpx;
	}

	.addAddress .default checkbox {
		margin-right: 15rpx;
	}

	.addAddress .keepBnt {
		width: 690rpx;
		height: 86rpx;
		border-radius: 50rpx;
		text-align: center;
		line-height: 86rpx;
		margin: 50rpx auto;
		font-size: 32rpx;
		color: #fff;
	}

	.addAddress .wechatAddress {
		width: 690rpx;
		height: 86rpx;
		border-radius: 50rpx;
		text-align: center;
		line-height: 86rpx;
		margin: 0 auto;
		font-size: 32rpx;
		color: #fe960f;
		border: 1px solid #fe960f;
	}
</style>

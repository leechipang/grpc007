<template>
	<view>
		<view class='bargain-list'>
			<view class='header'>
				<img mode="widthFix" class="assistBg" src="../static/images/assist.png" alt="">
			</view>
			<view class='list'>
				<block v-for="(item,index) in assistList" :key="index">
					<view class='item acea-row row-between-wrapper' @tap="openSubscribe(item.product_assist_id)">
						<view class='pictrue'>
							<image :src='item.product.image'></image>
						</view>
						<view class='text acea-row row-column-around'>
							<view class='name line1'>{{item.store_name}}</view>
							<view class='num'><text class='iconfont icon-pintuan'></text>{{item.user_count}}人正在参与</view>
							<view class='money color-red'>助力价: ￥<text class='price'>{{item.assistSku ? item.assistSku[0].assist_price : ''}}</text></view>
						</view>
						<view class='cutBnt bg-color'></text>发起助力</view>
					</view>
				</block>
			</view>
		</view>
		<home></home>
		<!-- #ifdef MP -->
		<authorize @onLoadFun="onLoadFun" :isAuto="isAuto" :isShowAuth="isShowAuth" @authColse="authColse"></authorize>
		<!-- #endif -->
	</view>
</template>

<script>
	import {
		getAssistList,
		initiateAssistApi
	} from '../../../api/activity.js';
	import home from '@/components/home/index.vue';
	import {
		openBargainSubscribe
	} from '@/utils/SubscribeMessage.js';
	import {
		getUserInfo
	} from '@/api/user.js';
	import {
		toLogin
	} from '@/libs/login.js';
	import {
		mapGetters
	} from "vuex";
	// #ifdef MP
	import authorize from '@/components/Authorize';
	// #endif
	export default {
		components: {
			home,
			// #ifdef MP
			authorize
			// #endif
		},
		data() {
			return {
				topImage: '',
				assistList: [],
				active: 0,
				type: 0,
				scrollLeft: 0,
				interval: 0,
				status: 1,
				page: 1,
				limit: 8,
				loading: false,
				loadend: false,
				pageloading: false,
				userInfo: {},
				isAuto: false, //没有授权的不会自动授权
				isShowAuth: false, //是否隐藏授权
			}
		},
		/**
		 * 用户点击右上角分享
		 */
		// #ifdef MP
		onShareAppMessage: function() {
			wx.showShareMenu({
			      withShareTicket: true,
			      menus: ['shareAppMessage', 'shareTimeline']
			    })
			return {
				title: '助力活动',
				path: 'pages/activity/assist/index',
			}
		},
		onShareTimeline: function() {
			return {
				title: '助力活动',
				  query: {
				    key: ''
				  },
				  imageUrl: ''
				}      
		},
		// #endif
		computed: mapGetters(['isLogin']),
		watch:{
		 isLogin:{
			handler:function(newV,oldV){
				if(newV){
					this.getUserInfo();
					this.getAssistProductList();
				}
			},
			deep:true
		 }
		},
		onLoad() {
			this.getAssistProductList();
			if (this.isLogin) {
				this.getUserInfo();
			}
		},
		methods: {
			// 微信登录回调
			onLoadFun: function(e) {
				this.getUserInfo();
				this.isShowAuth = false
			},
			getAssistProductList: function() {
				var that = this;
				var data = {
					page: that.page,
					limit: that.limit,
				};
				if (that.loadend) return;
				if (that.pageloading) return;
				this.pageloading = true
				getAssistList(data).then(res => {
					console.log(res);
					var assistList = res.data.list;
					var loadend = assistList.length < that.limit;
					that.page++;
					that.assistList = that.assistList.concat(assistList),
						that.page = that.page;
					that.pageloading = false;
					that.loadend = loadend;
				}).catch(err => {
					that.pageloading = false
				});
			},
			openSubscribe: function(id) {
				if(this.isLogin){
					initiateAssistApi(id).then(res => {
						let id = res.data.product_assist_set_id;
						uni.hideLoading();
						// #ifndef MP
						uni.navigateTo({
							url: '/pages/activity/assist_detail/index?id='+id
						});
						// #endif
						// #ifdef MP
						openBargainSubscribe().then(res => {
							uni.hideLoading();
							uni.navigateTo({
								url: '/pages/activity/assist_detail/index?id='+id
							});
						}).catch((err) => {
							uni.showToast({
								title:err,
								icon:'none'
							})
						});
						// #endif					
					}).catch((err) => {
						uni.showToast({
							title:err,
							icon:'none'
						})
					});
				}else{
					// #ifdef H5 || APP-PLUS
					toLogin();
					// #endif 
					// #ifdef MP
					this.isAuto = true;
					this.$set(this, 'isShowAuth', true);
					// #endif
				}
				
			},
			// 授权关闭
			authColse: function(e) {
				this.isShowAuth = e
			},
			/*
			 * 获取用户信息
			 */
			getUserInfo: function() {
				let that = this;
				getUserInfo().then(res => {
					that.$set(that, 'userInfo', res.data);
				});
			},
		},
		/**
		 * 页面上拉触底事件的处理函数
		 */
		onReachBottom: function() {
			this.getAssistProductList();
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #e93323;
	}
	.noCommodity{
		border-top: none;
	}
	.bargain-list .header {
		width: 100%;
		position: relative;
	}
	.bargain-list .header .assistBg {
		width: 750rpx;
	}
	.bargain-list .list {
		background-color: #fff;
		border: 6rpx solid #fc8b42;
		border-radius: 30rpx;
		margin: -90rpx 30rpx 66rpx 30rpx;
		padding: 0 24rpx;
	}

	.bargain-list .list .item {
		border-bottom: 1rpx solid #eee;
		position: relative;
		height: 223rpx;
	}

	.bargain-list .list .item .pictrue {
		width: 160rpx;
		height: 160rpx;
	}

	.bargain-list .list .item .pictrue image {
		width: 100%;
		height: 100%;
		border-radius: 6rpx;
	}

	.bargain-list .list .item .text {
		width: 450rpx;
		font-size: 30rpx;
		color: #282828;
		height: 160rpx;
	}

	.bargain-list .list .item .text .name {
		width: 100%;
	}

	.bargain-list .list .item .text .num {
		font-size: 26rpx;
		color: #999;
	}

	.bargain-list .list .item .text .num .iconfont {
		font-size: 35rpx;
		margin-right: 7rpx;
	}

	.bargain-list .list .item .text .money {
		font-size: 24rpx;
		font-weight: bold;
	}
	.color-red{
		color: #E93323;
	}
	.bargain-list .list .item .text .money .price {
		font-size: 32rpx;
	}

	.bargain-list .list .item .cutBnt {
		position: absolute;
		width: 180rpx;
		height: 50rpx;
		border-radius: 50rpx;
		font-size: 24rpx;
		color: #fff;
		text-align: center;
		line-height: 46rpx;
		right: 24rpx;
		bottom: 28rpx;
		box-shadow: 0 7rpx 0 #f8c1bd;
	}

	.bargain-list .list .item .cutBnt .iconfont {
		margin-right: 8rpx;
		font-size: 30rpx;
	}

	.bargain-list .list .load {
		font-size: 24rpx;
		height: 85rpx;
		text-align: center;
		line-height: 85rpx;
	}
</style>

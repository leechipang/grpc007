<template>
	<view>
		<view class='order-details'>
			<!-- 给header上与data上加on为退款订单-->
			<view v-if="orderInfo.orderList && orderInfo.orderList[0].activity_type != 2" >
				<view class='header bg-color acea-row row-middle'>
					<view class='pictrue'>
						<image :src="imgUrl+'/static/order_1.gif'"></image>
					</view>
					<view class='data'>
						<view class='state'>请在{{orderInfo.cancel_time}}前完成支付!</view>
						<view>{{orderInfo.add_time_y}}<text class='time'>{{orderInfo.create_time}}</text></view>
					</view>
				</view>
				<view class='nav'>
					<view class='navCon acea-row row-between-wrapper'>
						<view class="on">待付款</view>
						<view>待发货</view>
						<view>待收货</view>
						<view>待评价</view>
						<view>已完成</view>
					</view>
					<view class='progress acea-row row-between-wrapper'>
						<view class='iconfont icon-webicon318 font-color'></view>
						<view class='line'></view>
						<view class='iconfont icon-yuandianxiao'></view>
						<view class='line'></view>
						<view class='iconfont icon-yuandianxiao'></view>
						<view class='line'></view>
						<view class='iconfont icon-yuandianxiao'></view>
						<view class='line'></view>
						<view class='iconfont icon-yuandianxiao'></view>
					</view>
				</view>
			</view>
			<!--预售（代付款）-->
			<view v-else>
				<view class='header presell_header'>
					<view class="presell_payment" v-if="orderInfo.orderList"><text class="iconfont icon-shijian1"></text>{{orderInfo.orderList[0].orderProduct[0].cart_info.productPresell.presell_type==1?'待支付':'待付定金'}}</view>  
					<view class='data'>
						<view class='state'>请在{{orderInfo.cancel_time}}前完成支付,超时订单将自动取消</view>						
					</view>
				</view>
			</view>
			<view>							
				<view class='address'>
					<view class='name'>{{orderInfo.real_name}}<text class='phone'>{{orderInfo.user_phone}}</text></view>
					<view>{{orderInfo.user_address}}</view>
				</view>
				<view class='line'>
					<image src='../../static/images/line.jpg'></image>
				</view>
			</view>
			<!-- 店铺商品列表 -->
			<view class="order-wrapper" v-for="(item,index) in orderInfo.orderList" :key="index">
				<view class="title" @click="goStore(item)">{{item.merchant.mer_name}}<text class="iconfont icon-xiangyou"></text>
				</view>
				<view class="goods-box">
					<view v-for="(goods,j) in item.orderProduct" :key="goods.order_product_id" @click="goProduct(goods)">
						<view v-if="item.activity_type === 2">
							<view class="item">
								<image :src="goods.cart_info.product.image"></image>
								<view class="info-box">
									<view class="name line1"><text class="event_name event_bg">预售</text>{{goods.cart_info.product.store_name}}</view>
									<view class="msg">{{goods.cart_info.productAttr.sku}}</view>
									<view  class="event_ship event_color">发货时间：
										<!--全款预售-->
										<text v-if="goods.cart_info.productPresell.presell_type === 1">{{ goods.cart_info.productPresell.delivery_type === 1 ? '支付成功后' : '预售结束后' }}{{ goods.cart_info.productPresell.delivery_day }}天内</text>
										<!--定金预售-->
										<text v-if="goods.cart_info.productPresell.presell_type === 2">{{ goods.cart_info.productPresell.delivery_type === 1 ? '支付尾款后' : '预售结束后' }}{{ goods.cart_info.productPresell.delivery_day }}天内</text>
									</view>	
								</view>
								<view class="num"><text class="font-color">￥{{goods.cart_info.productPresellAttr.presell_price}}</text></br>x{{goods.product_num}}</view>
							</view>
							<view class="event_progress" v-if="goods.cart_info.productPresell.presell_type !=1">
								<view class="progress_list">									
									<view class="progress_name font-color">阶段一： 等待买家付款</view>
									<view class="progress_price">商品定金  <text class="align_right">￥{{ item.pay_price }}</text></view>
									<view class="progress_pay">定金需付款<text class="align_right font-color">￥{{ item.pay_price }}</text></view>
								</view>
								<view class="progress_list">
									<view class="progress_name font-color">阶段二： 未开始</view>
									<view class="progress_price">商品尾款  <text class="align_right">￥{{ item.presellOrder.pay_price }}</text></view>
									<view class="progress_pay">尾款需付款<text class="align_right font-color">￥{{ item.presellOrder.pay_price }}</text></view>
								</view>
							</view>
							
						</view>
						<view v-else class="item">
							<image :src="goods.cart_info.product.image"></image>
							<view class="info-box">
								<view class="name line1">{{goods.cart_info.product.store_name}}</view>
								<view class="msg">{{goods.cart_info.productAttr.sku}}</view>
								<view class="price">￥{{goods.cart_info.productAttr.price}}</view>
							</view>
							<view class="num">x{{goods.product_num}}</view>
						</view>
					</view>
				</view>
				<div class="goodCall" @click="goGoodCall">
					<span class="iconfont icon-kefu"></span><span style="font-size: 28rpx;">联系客服</span>
				</div>
			</view>
			
			<view class='wrapper'>
				<view class='item acea-row row-between'>
					<view>订单编号：</view>
					<view class='conter acea-row row-middle row-right'>{{orderInfo.group_order_sn}}
						<!-- #ifndef H5 -->
						<text class='copy' @tap='copy'>复制</text>
						<!-- #endif -->
						<!-- #ifdef H5 -->
						<text class='copy copy-data' :data-clipboard-text="orderInfo.group_order_sn">复制</text>
						<!-- #endif -->
					</view>
				</view>
				<view class='item acea-row row-between'>
					<view>下单时间：</view>
					<view class='conter'>{{orderInfo.create_time || 0}}</view>
				</view>
				<view class='item acea-row row-between'>
					<view>支付状态：</view>
					<view class='conter'>未支付</view>
				</view>
				<view class='item acea-row row-between'>
					<view>商品总额：</view>
					<view class='conter'>￥{{orderInfo.total_price}}</view>
				</view>
				<!-- <view class='item acea-row row-between'>
					<view>支付方式：</view>
					<view class='conter'>{{orderInfo._status._payType}}</view>
				</view> -->
			</view>
			<view class='wrapper'>
				<view class='item acea-row row-between' v-if="orderInfo.pay_postage > 0">
					<view>运费：</view>
					<view class='conter'>+￥{{orderInfo.pay_postage}}</view>
				</view>
				<view class='item acea-row row-between' v-if='orderInfo.coupon_price>0'>
					<view>优惠券抵扣：</view>
					<view class='conter'>-￥{{orderInfo.coupon_price}}</view>
				</view>
				<view class='item acea-row row-between'>
					<view>实付款：</view>
					<view class='conter'>￥{{orderInfo.pay_price}}</view>
				</view>
				<!-- <view class='actualPay acea-row row-right'>实付款：<text class='money font-color'>￥{{orderInfo.pay_price}}</text></view> -->
			</view>
			<view style='height:120rpx;'></view>
			<view class='footer acea-row row-right row-middle'>
				<view class="bnt cancel" @click.stop="cancelOrder">取消订单</view>
				<view class='bnt bg-color' @tap='pay_open(orderInfo.order_id)'>立即付款</view>
			</view>
		</view>
		<!-- #ifdef MP -->
		<authorize @onLoadFun="onLoadFun" :isAuto="isAuto" :isShowAuth="isShowAuth" @authColse="authColse"></authorize>
		<!-- #endif -->
		<payment :payMode='payMode' :pay_close="pay_close" @onChangeFun='onChangeFun' :order_id="pay_order_id" :totalPrice='totalPrice'></payment>
	</view>
</template>
<style scoped lang="scss">
	.event_bg{
		background: #FF7F00;
	}
	.event_color{
		color: #FF7F00;
	}

	.goodCall {
		text-align: center;
		width: 100%;
		height: 86rpx;
		padding: 0 30rpx;
		border-top: 1rpx solid #f0f0f0;
		font-size: 30rpx;
		line-height: 86rpx;
		background: #fff;
		color: #282828;
		
		.icon-kefu {
			font-size: 32rpx;
			margin-right: 15rpx;		
		}

		/* #ifdef MP */
		button {
			display: flex;
			align-items: center;
			justify-content: center;
			height: 86rpx;
			font-size: 30rpx;
			color: #e93323;
		}

		/* #endif */
	}

	.order-details .header {
		padding: 0 30rpx;
		height: 150rpx;
		&.presell_header{
			background-image: url('data:image/jpg;base64,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');
			background-repeat: no-repeat;
			background-size: cover;
			padding: 35rpx 50rpx;
			.data{
				margin: 8rpx 0 0 26rpx;
				.state{
					font-weight: normal;
					font-size: 24rpx;
				}
			}
		}
	}

	.order-details .header.on {
		background-color: #666 !important;
	}

	.order-details .header .pictrue {
		width: 110rpx;
		height: 110rpx;
	}

	.order-details .header .pictrue image {
		width: 100%;
		height: 100%;
	}

	.order-details .header .data {
		color: rgba(255, 255, 255, 0.8);
		font-size: 24rpx;
		margin-left: 27rpx;
	}

	.order-details .header .data.on {
		margin-left: 0;
	}

	.order-details .header .data .state {
		font-size: 30rpx;
		font-weight: bold;
		color: #fff;
		margin-bottom: 7rpx;
	}

	.order-details .header .data .time {
		margin-left: 20rpx;
	}

	.presell_header .presell_payment{
		color: #fff;
		font-size: 30rpx;
		font-weight: bold;
		margin-left: 26rpx;
		.iconfont{
			font-weight: normal;
			margin-right: 8rpx;
		}
	}
	.order-details .nav {
		background-color: #fff;
		font-size: 26rpx;
		color: #282828;
		padding: 25rpx 0;
	}

	.order-details .nav .navCon {
		padding: 0 40rpx;
	}

	.order-details .nav .on {
		color: #e93323;
	}

	.order-details .nav .progress {
		padding: 0 65rpx;
		margin-top: 10rpx;
	}

	.order-details .nav .progress .line {
		width: 100rpx;
		height: 2rpx;
		background-color: #939390;
	}

	.order-details .nav .progress .iconfont {
		font-size: 25rpx;
		color: #939390;
		margin-top: -2rpx;
	}

	.order-details .address {
		font-size: 26rpx;
		color: #868686;
		background-color: #fff;
		margin-top: 13rpx;
		padding: 35rpx 30rpx;
	}

	.order-details .address .name {
		font-size: 30rpx;
		color: #282828;
		margin-bottom: 15rpx;
	}

	.order-details .address .name .phone {
		margin-left: 40rpx;
	}

	.order-details .line {
		width: 100%;
		height: 3rpx;
	}

	.order-details .line image {
		width: 100%;
		height: 100%;
		display: block;
	}

	.order-details .wrapper {
		background-color: #fff;
		margin-top: 12rpx;
		padding: 30rpx;
	}

	.order-details .wrapper .item {
		font-size: 28rpx;
		color: #282828;
	}

	.order-details .wrapper .item~.item {
		margin-top: 20rpx;
	}

	.order-details .wrapper .item .conter {
		color: #868686;
		width: 460rpx;
		text-align: right;
	}

	.order-details .wrapper .item .conter .copy {
		font-size: 20rpx;
		color: #333;
		border-radius: 17rpx;
		border: 1rpx solid #666;
		padding: 3rpx 15rpx;
		margin-left: 24rpx;
		
	}

	.order-details .wrapper .actualPay {
		border-top: 1rpx solid #eee;
		margin-top: 30rpx;
		padding-top: 30rpx;
	}

	.order-details .wrapper .actualPay .money {
		font-weight: bold;
		font-size: 30rpx;
	}

	.order-details .footer {
		width: 100%;
		height: 100rpx;
		position: fixed;
		bottom: 0;
		left: 0;
		background-color: #fff;
		padding: 0 30rpx;
		box-sizing: border-box;
	}

	.order-details .footer .bnt {
		width: 176rpx;
		height: 60rpx;
		text-align: center;
		line-height: 60rpx;
		border-radius: 50rpx;
		color: #fff;
		font-size: 27rpx;
	}

	.order-details .footer .bnt.cancel {
		color: #aaa;
		border: 1rpx solid #ddd;
	}

	.order-details .footer .bnt~.bnt {
		margin-left: 18rpx;
	}

	.order-details .writeOff {
		background-color: #fff;
		margin-top: 13rpx;
		padding-bottom: 30rpx;
	}

	.order-details .writeOff .title {
		font-size: 30rpx;
		color: #282828;
		height: 87rpx;
		border-bottom: 1px solid #f0f0f0;
		padding: 0 30rpx;
		line-height: 87rpx;
	}

	.order-details .writeOff .grayBg {
		background-color: #f2f5f7;
		width: 590rpx;
		height: 384rpx;
		border-radius: 20rpx 20rpx 0 0;
		margin: 50rpx auto 0 auto;
		padding-top: 55rpx;
	}

	.order-details .writeOff .grayBg .pictrue {
		width: 290rpx;
		height: 290rpx;
		margin: 0 auto;
	}

	.order-details .writeOff .grayBg .pictrue image {
		width: 100%;
		height: 100%;
		display: block;
	}

	.order-details .writeOff .gear {
		width: 590rpx;
		height: 30rpx;
		margin: 0 auto;
	}

	.order-details .writeOff .gear image {
		width: 100%;
		height: 100%;
		display: block;
	}

	.order-details .writeOff .num {
		background-color: #f0c34c;
		width: 590rpx;
		height: 84rpx;
		color: #282828;
		font-size: 48rpx;
		margin: 0 auto;
		border-radius: 0 0 20rpx 20rpx;
		text-align: center;
		padding-top: 4rpx;
	}

	.order-details .writeOff .rules {
		margin: 46rpx 30rpx 0 30rpx;
		border-top: 1px solid #f0f0f0;
		padding-top: 10rpx;
	}

	.order-details .writeOff .rules .item {
		margin-top: 20rpx;
	}

	.order-details .writeOff .rules .item .rulesTitle {
		font-size: 28rpx;
		color: #282828;
	}

	.order-details .writeOff .rules .item .rulesTitle .iconfont {
		font-size: 30rpx;
		color: #333;
		margin-right: 8rpx;
		margin-top: 5rpx;
	}

	.order-details .writeOff .rules .item .info {
		font-size: 28rpx;
		color: #999;
		margin-top: 7rpx;
	}

	.order-details .writeOff .rules .item .info .time {
		margin-left: 20rpx;
	}

	.order-details .map {
		height: 86rpx;
		font-size: 30rpx;
		color: #282828;
		line-height: 86rpx;
		border-bottom: 1px solid #f0f0f0;
		margin-top: 13rpx;
		background-color: #fff;
		padding: 0 30rpx;
	}

	.order-details .map .place {
		font-size: 26rpx;
		width: 176rpx;
		height: 50rpx;
		border-radius: 25rpx;
		line-height: 50rpx;
		text-align: center;
	}

	.order-details .map .place .iconfont {
		font-size: 27rpx;
		height: 27rpx;
		line-height: 27rpx;
		margin: 2rpx 3rpx 0 0;
	}

	.order-details .address .name .iconfont {
		font-size: 34rpx;
		margin-left: 10rpx;
	}

	.refund {
		padding: 0 30rpx 30rpx;
		margin-top: 24rpx;
		background-color: #fff;

		.title {
			display: flex;
			align-items: center;
			font-size: 30rpx;
			color: #333;
			height: 86rpx;
			border-bottom: 1px solid #f5f5f5;

			image {
				width: 32rpx;
				height: 32rpx;
				margin-right: 10rpx;
			}
		}

		.con {
			padding-top: 25rpx;
			font-size: 28rpx;
			color: #868686;
		}
	}
	.order-wrapper{
		margin-top: 15rpx;
		
		.title{
			display: flex;
			align-items: center;
			height: 86rpx;
			padding:0 30rpx;
			border-bottom: 1px solid #f0f0f0;
			background-color: #fff;
			.iconfont{
				font-size: 24rpx;
				color: #666;
				margin-top: 6rpx;
				margin-left: 5rpx;
			}
		}
		.goods-box{
			.item{
				display: flex;
				padding: 25rpx 30rpx 25rpx 30rpx;
				background-color: #fff;
				image{
					width: 130rpx;
					height: 130rpx;
					border-radius: 16rpx;
				}
				.info-box{
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					margin-left: 25rpx;
					width: 450rpx;
					.msg{
						color: #868686;
						font-size: 20rpx;
					}
					.price{
						font-size: 26rpx;
						color: $theme-color;
					}
				}
				.num{
					flex: 1;
					text-align: right;
					font-size: 26rpx;
					color: #868686;
				}
			}
			
			 .event_name{
				display: inline-block;
				margin-right: 9rpx;
				color: #fff;
				font-size: 20rpx;
				padding: 0 8rpx;
				line-height: 30rpx;	
				text-align: center;
				border-radius: 6rpx;						
			}
			.event_ship{
				font-size: 20rpx;
				margin-top: 10rpx;						
			}
		}
		.event_progress{
			margin-top: 20rpx;
			background: #fff;
			.progress_name {
				padding-left: 30rpx;
				height: 60rpx;
				line-height: 60rpx;
				font-size: 24rpx;
				font-weight: bold;
				position: relative;
				&::before{
					content: "";
					display: inline-block;
					width: 5rpx;
					height: 34rpx;
					background: #E93323;
					position: absolute;
					top: 15rpx;
					left: 0;
				}
			}
			.align_right{
				float: right;
				font-weight: bold;
			}
			.progress_price{
				padding: 20rpx 30rpx;
				color: #999999;
				font-size: 22rpx;

			}
			.progress_pay{
				padding: 25rpx 30rpx;
				background: #FFF8F7;
				font-size: 26rpx;
				color: #282828;
				
			}
		}
		
	}
</style>

<script>
	let app = getApp();
	import { HTTP_REQUEST_URL } from '@/config/app';
	import {
		goShopDetail
	} from '@/libs/order.js'
	import {
		groupOrderDetail,
		orderAgain,
		orderTake,
		orderDel,
		unOrderCancel
	} from '@/api/order.js';
	import {
		openOrderRefundSubscribe
	} from '@/utils/SubscribeMessage.js';
	import {
		getUserInfo
	} from '@/api/user.js';
	import payment from '@/components/payment';
	import orderGoods from "@/components/orderGoods";
	import ClipboardJS from "@/plugin/clipboard/clipboard.js";
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
			payment,
			orderGoods,
			// #ifdef MP
			authorize
			// #endif
		},
		data() {
			return {
				order_id: '',
				evaluate: 0,
				cartInfo: [], //购物车产品
				orderInfo: {
					system_store: {},
					_status: {}
				}, //订单详情
				system_store: {},
				isGoodsReturn: false, //是否为退款订单
				status: {}, //订单底部按钮状态
				isClose: false,
				payMode: [{
						name: "微信支付",
						icon: "icon-weixinzhifu",
						value: 'wechat',
						title: '微信快捷支付',
						payStatus: 1
					},
					{
						name: "支付宝支付",
						icon: "icon-zhifubao",			
						value: 'alipay',
						title: '支付宝支付',
						payStatus: app.globalData.alipay_open	
					},
					{
						name: "余额支付",
						icon: "icon-yuezhifu",
						value: 'balance',
						title: '可用余额:',
						number: 0,
						payStatus: app.globalData.yue_pay_status
					},
				],
				pay_close: false,
				pay_order_id: '',
				totalPrice: '0',
				isAuto: false, //没有授权的不会自动授权
				isShowAuth: false, //是否隐藏授权
				imgUrl:HTTP_REQUEST_URL,
				hide_mer_status: app.globalData.hide_mer_status
			};
		},
		computed: mapGetters(['isLogin']),
		onLoad: function(options) {
			if (options.order_id) {
				this.$set(this, 'order_id', options.order_id);
			}
		},
		onShow() {
			if (this.isLogin) {
				this.getOrderInfo();
				this.getUserInfo();
			} else {
				// #ifdef H5 || APP-PLUS
				toLogin();
				// #endif 
				// #ifdef MP
				this.isAuto = true;
				this.$set(this, 'isShowAuth', true);
				// #endif
			}			
		},
		onHide: function() {
			this.isClose = true;
		},
		onReady: function() {
			// #ifdef H5
			this.$nextTick(function() {
				const clipboard = new ClipboardJS(".copy-data");
				clipboard.on("success", () => {
					this.$util.Tips({
						title: '复制成功'
					});
				});
			});
			// #endif
			uni.$on('update',(data)=>{
				this.hide_mer_status = data.hide_mer_status
			})
		},
		mounted: function() {
			const app = getApp();
			this.$nextTick(() => {
				this.hide_mer_status = app.globalData.hide_mer_status
			});
		},
		methods: {
			// 去店铺
			goStore(item){
				if(this.hide_mer_status != 1){
					uni.navigateTo({
						url:`/pages/store/home/index?id=${item.merchant.mer_id}`
					})
				}
				
			},
			// 商品详情
			goProduct(goods){
				goods.activity_id = goods.cart_info && goods.cart_info.activeSku.product_group_id
				goShopDetail(goods, '').then(res => {
					uni.navigateTo({
						url:`/pages/goods_details/index?id=${goods.product_id}`
					})
				})
			},
			goGoodCall() {
				let self = this
				uni.navigateTo({
					url: `/pages/chat/customer_list/index?orderId=${self.order_id}`
				})
			},
			
			/**
			 * 事件回调
			 * 
			 */
			onChangeFun: function(e) {
				let opt = e;
				let action = opt.action || null;
				let value = opt.value != undefined ? opt.value : null;
				(action && this[action]) && this[action](value);
			},
			/**
			 * 拨打电话
			 */
			makePhone: function() {
				uni.makePhoneCall({
					phoneNumber: this.system_store.phone
				})
			},
			
			/**
			 * 关闭支付组件
			 * 
			 */
			payClose: function() {
				this.pay_close = false;
			},
			/**
			 * 打开支付组件
			 * 
			 */
			pay_open: function() {
				this.pay_close = true;
				this.pay_order_id = this.orderInfo.group_order_id.toString();
				this.totalPrice = this.orderInfo.pay_price;
			},
			/**
			 * 支付成功回调
			 * 
			 */
			pay_complete: function() {
				this.pay_close = false;
				this.pay_order_id = '';
				uni.redirectTo({
					url:'/pages/users/order_list/index?status=1'
				})
			},
			/**
			 * 支付失败回调
			 * 
			 */
			pay_fail: function() {
				
				this.pay_close = false;
				this.pay_order_id = '';
			},
			/**
			 * 登录授权回调
			 * 
			 */
			onLoadFun: function() {
				this.isShowAuth = false;
				this.getOrderInfo();
				this.getUserInfo();
			},
			/**
			 * 获取用户信息
			 * 
			 */
			getUserInfo: function() {
				let that = this;
				getUserInfo().then(res => {
					that.payMode[2].number = res.data.now_money;
					that.$set(that, 'payMode', that.payMode);
				})
			},
			/**
			 * 获取订单详细信息
			 * 
			 */
			getOrderInfo: function() {
				let that = this;
				uni.showLoading({
					title: "正在加载中"
				});
				groupOrderDetail(this.order_id).then(res => {
					let _type = 0;
					uni.hideLoading();
					that.$set(that, 'orderInfo', res.data);
				}).catch(err => {
					console.log(err)
					uni.hideLoading();
					that.$util.Tips({
						title: err
					}, '/pages/users/order_list/index');
				});
			},
			/**
			 * 
			 * 剪切订单号
			 */
			// #ifndef H5
			copy: function() {
				let that = this;
				uni.setClipboardData({
					data: this.orderInfo.order_id
				});
			},
			// #endif
			// 取消订单
			cancelOrder() {
				let self = this
				uni.showModal({
					title: '提示',
					content: '确认取消该订单?',
					success: function(res) {
						if (res.confirm) {
							unOrderCancel(self.order_id)
								.then((data) => {
									console.log(data)
									self.$util.Tips({
										title: data.message
									}, {
										tab: 3
									})
								})
								.catch(() => {
									self.getDetail();
								});
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
		}
	}
</script>

<style>
	.qs-btn {
		width: auto;
		height: 60rpx;
		text-align: center;
		line-height: 60rpx;
		border-radius: 50rpx;
		color: #fff;
		font-size: 27rpx;
		padding: 0 3%;
		color: #aaa;
		border: 1px solid #ddd;
		margin-right: 20rpx;
	}
</style>

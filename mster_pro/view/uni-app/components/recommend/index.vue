<template>
	<view class='recommend'>
		<view class="common-hd">
			<view class="title">为你推荐</view>
		</view>
		<view class='recommendList acea-row row-between-wrapper' :class="indexP?'on':''">
			<view class='item' v-for="(item,index) in hostProduct" :key="index" hover-class='none' @tap="goDetail(item)">
				<view class='pictrue'>
					<image :src='item.image'></image>
					<span class="pictrue_log_big pictrue_log_class" v-if="item.activity && item.activity.type === '1'">秒杀</span>
					<span class="pictrue_log_big pictrue_log_class" v-if="item.activity && item.activity.type === '2'">砍价</span>
					<span class="pictrue_log_big pictrue_log_class" v-if="item.activity && item.activity.type === '3'">拼团</span>
				</view>
				<view class="text">
					<view class='name line1'>
						<text v-if="item.merchant.is_trader" class="font-bg-red">自营</text>
						<span v-if="item.product_type != 0" :class="'font_bg-red type'+item.product_type">{{item.product_type == 1 ? "秒杀" : item.product_type == 2 ? "预售" : item.product_type == 3 ? "助力" : item.product_type == 4 ? "拼团" : ""}}</span>
					{{item.store_name}}
					</view>
					
					<view class="acea-row row-middle">
						<view class='money font-color'>￥<text class='num'>{{item.price}}</text></view>
						<text class="coupon font-color-red" v-if="item.issetCoupon">领券</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {mapGetters} from "vuex";
	import { goShopDetail } from '@/libs/order.js'
	import {openBargainSubscribe} from '@/utils/SubscribeMessage.js';
	import {initiateAssistApi} from '@/api/activity.js';
	import {toLogin} from '@/libs/login.js';
	export default {
	computed: mapGetters(['uid']),
		props: {
			hostProduct: {
				type: Array,
				default: function() {
					return [];
				}
			},
			indexP:{
				type: Boolean,
				default: false
			},
			isLogin:{
				type: Boolean,
				default: false
			}
		},
		data() {
			return {

			};
		},

		methods: {
			goDetail(item){
				goShopDetail(item, this.uid).then(res => {
				if (this.isLogin) {
						initiateAssistApi(item.activity_id).then(res => {
							let id = res.data.product_assist_set_id;
							uni.hideLoading();
							// #ifndef MP
							uni.navigateTo({
								url: '/pages/activity/assist_detail/index?id=' + id
							});
							// #endif
							// #ifdef MP
							openBargainSubscribe().then(res => {
								uni.hideLoading();
								uni.navigateTo({
									url: '/pages/activity/assist_detail/index?id=' + id
								});
							}).catch((err) => {
								uni.hideLoading();
							});
							// #endif					
						}).catch((err) => {
							uni.showToast({
								title: err,
								icon: 'none'
							})
						});
					} else {
						// #ifdef H5 || APP-PLUS
						toLogin();
						// #endif 
						// #ifdef MP
						this.$emit('isShowAuth', true);
						this.$emit('isAuto', true);
						// #endif
					}
				})		
			}
		}
	}
</script>

<style scoped lang="scss">
	.font-bg-red,.font_bg-red{
		display: inline-block;
		background: #E93424;
		color: #fff;
		font-size: 18rpx;
		width: 52rpx;
		text-align: center;
		line-height: 30rpx;
		border-radius: 5rpx;
		margin-right: 8rpx;
		position: relative;
		top: -2rpx;
		&.type2{
			background-color: #FD6523;
		}
		
	}
	.common-hd {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 118rpx;
	
		.title {
			padding: 0 80rpx;
			font-size: 34rpx;
			color: $theme-color;
			font-weight: bold;
			background-image: url("~@/static/images/index-title.png");
			background-repeat: no-repeat;
			background-size: 100% auto;
			background-position: left center;
		}
	}

	.recommend .recommendList {
		padding: 0 20rpx;
	}
	
	.recommend .recommendList.on{
		padding: 0;
	}
	.recommend .recommendList .item {
		width: 340rpx;
		margin-bottom: 30rpx;
		background-color: #fff;
		border-radius: 16rpx;
		padding-bottom: 20rpx;
	}	
	.recommend .recommendList .item .text{
		padding: 0 20rpx;
	}	
	.recommend .recommendList .item .coupon{
		background:rgba(255,248,247,1);
		border:1px solid rgba(233,51,35,1);
		border-radius:4rpx;
		font-size:20rpx;
		margin-left: 18rpx;
		padding: 1rpx 4rpx;
	}

	.recommend .recommendList .item .pictrue {
		position: relative;
		width: 100%;
		height: 345rpx;
	}

	.recommend .recommendList .item .pictrue image {
		width: 100%;
		height: 100%;
		border-radius: 16rpx 16rpx 0 0;
	}

	.recommend .recommendList .item .name {
		font-size: 28rpx;
		color: #282828;
		margin: 20rpx 0 10rpx 0;
	}

	.recommend .recommendList .item .money {
		font-size: 20rpx;
		font-weight: bold;
	}

	.recommend .recommendList .item .money .num {
		font-size: 34rpx;
	}
</style>

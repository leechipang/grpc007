<template>
	<view>
		<block v-if="bargain.length>0">
			<div class="bargain-record" ref="container">
				<div class="item" v-for="(item, index) in bargain" :key="index">
					<div class="picTxt acea-row row-between-wrapper">
						<div class="pictrue">
							<image :src="item.product.image" />
						</div>
						<div class="text acea-row row-column-around">
							<div class="line1" style="width: 100%;">{{ item.product.store_name }}</div>
							<count-down :justify-left="'justify-content:left'" :is-day="true" :tip-text="'倒计时 '" :day-text="' 天 '" :hour-text="' 时 '" :minute-text="' 分 '"
							 :second-text="' 秒'" :datatime="item.stop_time" v-if="item.status === 1" :id="item.product_assist_set_id"></count-down>
							 <view class='money font-color'>
							 	助力价: ￥
							 	<text class='num'>{{item.assistSku[0].assist_price}}</text>
							 </view>				
						</div>
					</div>
					<div class="bottom acea-row row-between-wrapper">
						<div class="purple" v-if="item.status === 1 || item.status === 0">活动进行中</div>
						<div class="success" v-if="item.status === 10 || item.status === 20">助力成功</div>
						<div class="end" v-if="item.status === -1">活动已结束</div>
						<div class="acea-row row-middle row-right">
							<div v-if="item.status === 1 || item.status === 0">
								<div class="bnt cancel" @click="getBargainUserCancel(item.product_assist_set_id)">
									取消活动
								</div>
								<div class="bnt bg-color-red" @click="getInvitation(item.product_assist_set_id)">
									邀请助力
								</div>
							</div>
														
							<div v-if="item.status === 10 || item.status === 20">
								<view v-if="(item.order.paid == 0 || item.order.paid == 1) && item.status === 20"class="bnt bg-color-red" @click="goOrderDetail(item.order)">查看详情</view>
								<view v-else  class="bnt bg-color-red" @click="goPay(item)">立即付款</view>
							</div>							
						</div>
					</div>
				</div>
				<Loading :loaded="status" :loading="loadingList"></Loading>
			</div>
		</block>
		<block v-if="bargain.length == 0">
			<emptyPage title="暂无记录～"></emptyPage>
		</block>
		<home></home>
	</view>
</template>
<script>
	import CountDown from "@/components/countDown";
	import emptyPage from '@/components/emptyPage.vue'
	import {
		getBargainUserList,
		getBargainUserCancel
	} from "@/api/activity";
	import {
		postCartAdd
	} from '../../../api/store.js';
	import Loading from "@/components/Loading";
	import home from '@/components/home';
	export default {
		name: "BargainRecord",
		components: {
			CountDown,
			Loading,
			emptyPage,
			home
		},
		props: {},
		data: function() {
			return {
				bargain: [],
				status: false, //助力列表是否获取完成 false 未完成 true 完成
				loadingList: false, //当前接口是否请求完成 false 完成 true 未完成
				page: 1, //页码
				limit: 20, //数量
			};
		},
		onLoad: function() {
			this.getBargainUserList();
		},
		onReady() {
			uni.$once('endTime',(data)=>{
				this.bargain.forEach((el,index)=>{
					if(el.product_assist_set_id == data){
						el.status = -1
					}
				})
			})
		},
		methods: {
			goDetail: function(id) {
				uni.navigateTo({
					url: `/pages/activity/assist_detail/index?id=${id}`
				})
			},
			getBargainUserList: function() {
				var that = this;
				if (that.loadingList) return;
				if (that.status) return;
				getBargainUserList({
						page: that.page,
						limit: that.limit
					})
					.then(res => {
						that.status = res.data.list.length < that.limit;
						that.bargain.push.apply(that.bargain, res.data.list);
						that.page++;
						that.loadingList = false;
					})
					.catch(res => {
						that.$util.Tips({
							title: res
						})
					});
			},
			// 立即购买
			goPay: function(item) { //立即支付
				var that = this;
				var data = {
					product_id : item.product_assist_set_id,
					product_attr_unique: item.assistSku[0].unique,
					cart_num: 1,
					product_type: 3,
					is_new: 1					
				};
				postCartAdd(data).then(res => {
					uni.navigateTo({
						url: '/pages/users/order_confirm/index?new=1&cartId=' + res.data.cart_id
					});
				}).catch(err => {
					return that.$util.Tips({title:err})
				});
			},
			// 邀请助力
			getInvitation: function(id){
				uni.navigateTo({
					url: '/pages/activity/assist_detail/index?id=' + id
				});
			},
			// 查看详情
			goOrderDetail: function(order) {
				if(order.paid == 1){
					uni.navigateTo({
						url: '/pages/order_details/index?order_id='+order.order_id,
					})
				}else{
					uni.navigateTo({
						url: '/pages/order_details/stay?order_id='+order.group_order_id,
					})
				}
				
			},
			
			// 取消
			getBargainUserCancel: function(id) {
				var that = this;
				getBargainUserCancel(id)
					.then(res => {
						that.status = false;
						that.loadingList = false;
						that.page = 1;
						
						that.$util.Tips({
							title: res.message
						})
						setTimeout(function(){
							that.bargain = [];
							that.getBargainUserList();
						},3000)
						
					})
					.catch(res => {
						that.$util.Tips({
							title: res
						})
					});
			},
			
		},
		onReachBottom() {
			this.getBargainUserList();
		}
	};
</script>

<style lang="scss">
	/*助力记录*/
	.bargain-record .item .picTxt .text .time .styleAll {
		color: #fc4141;
		font-size:24rpx;
	}
	.bargain-record .item .picTxt .text .time .red {
		color: #999;
		font-size:24rpx;
	}
	.bargain-record .item {
		background-color: #fff;
		margin-bottom: 12upx;
	}

	.bargain-record .item .picTxt {
		height: 210upx;
		border-bottom: 1px solid #f0f0f0;
		padding: 0 30upx;
	}

	.bargain-record .item .picTxt .pictrue {
		width: 150upx;
		height: 150upx;
	}

	.bargain-record .item .picTxt .pictrue image {
		width: 100%;
		height: 100%;
		border-radius: 6upx;
	}

	.bargain-record .item .picTxt .text {
		width: 515upx;
		font-size: 30upx;
		color: #282828;
		height: 150upx;
	}

	.bargain-record .item .picTxt .text .time {
		font-size: 24upx;
		color: #868686;
		justify-content: left !important;
	}
	
	.bargain-record .item .picTxt .text .successTxt{
		font-size:24rpx;
	}
	
	.bargain-record .item .picTxt .text .endTxt{
		font-size:24rpx;
		color: #999;
	}
	.bargain-record .item .picTxt .text .money {
		font-size: 24upx;
	}

	.bargain-record .item .picTxt .text .money .num {
		font-size: 32upx;
		font-weight: bold;
	}

	.bargain-record .item .picTxt .text .money .symbol {
		font-weight: bold;
	}

	.bargain-record .item .bottom {
		height: 100upx;
		padding: 0 30upx;
		font-size: 27upx;
	}

	.bargain-record .item .bottom .purple {
		color: #f78513;
	}

	.bargain-record .item .bottom .end {
		color: #999;
	}

	.bargain-record .item .bottom .success {
		color: #e93323;
	}

	.bargain-record .item .bottom .bnt {
		font-size: 27upx;
		color: #fff;
		width: 176upx;
		height: 60upx;
		border-radius: 32upx;
		text-align: center;
		line-height: 60upx;
		display: inline-block;
	}

	.bargain-record .item .bottom .bnt.cancel {
		color: #aaa;
		border: 1px solid #ddd;
	}

	.bargain-record .item .bottom .bnt~.bnt {
		margin-left: 18upx;
	}
</style>

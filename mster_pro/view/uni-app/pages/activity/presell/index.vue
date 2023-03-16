<template>
	<div>
		<view class='flash-sale'>
			<view class='header'>
				<img mode="widthFix" class="presellBg" src="../static/images/presell_bg.png" alt="">	
			</view>
			<view class="main_count">
				<view class="presellList acea-row row-between-wrapper">
					<view class='timeList'>
						<block v-for="(item,index) in timeList" :key='index'>
							<view @tap='settimeList(item,index)' class='item' :class="active == index?'on':''">
								<view class='time'><span>{{item}}</span></view>
							</view>
						</block>
					</view>
				</view>
				<view class='list'>
					<block v-for="(item,index) in presellList" :key='index'>
						<view class='item acea-row row-between-wrapper' @tap='goDetails(item)'>
							<view class='pictrue'>
								<image :src='item.product.image'></image>
							</view>
							<view class='text acea-row row-column-around'>
								<view class='name line1'>{{item.store_name}}</view>
								<view class='booking'>
									<text v-if="item.presell_type != 0 && active != 0" class="count" style="color: #999;">已预定{{item.seles ? item.seles : 0}}{{item.product.unit_name}}</text>
									<text v-else style="color: #999; font-size: 24rpx;">暂未开始</text>
								</view>
								<view v-if="item.coupon" class='coupon acea-row row-between-wrapper' style="margin-top: 14rpx;">
									<view class='hide line1 acea-row'>									
										<view class='activity'>满{{item.coupon.use_min_price}}减{{item.coupon.coupon_price}}</view>
									</view>
								</view>
								<view class="progress">
									<view class='presell_price'>
										<text class="presell_text">预售价</text>
										<text class="price">¥ <text>{{ item.price }}</text></text>
									</view>
									<view v-if="active != 0" class='order_btn'>{{ active === 1  ? '立即预定' : '已结束' }}</view>
									<view v-else class="unStartBtn">
										<text>开售时间</text>
										<view>{{ new Date(item.start_time.replace(/-/g,"/")).getMonth()+1 }}月
										{{ new Date(item.start_time.replace(/-/g,"/")).getDate() }}日 
										{{ new Date(item.start_time.replace(/-/g,"/")).getHours()<10?'0'+ 
										new Date(item.start_time.replace(/-/g,"/")).getHours():new Date(item.start_time.replace(/-/g,"/")).getHours() || '00'}}:
										{{ new Date(item.start_time.replace(/-/g,"/")).getMinutes()<10?"0" + new Date(item.start_time.replace(/-/g,"/")).getMinutes():
										new Date(item.start_time.replace(/-/g,"/")).getMinutes() || '00'}}</view>
									</view>
								</view>
							</view>
						</view>
					</block>
				</view>
			</view>
			
		</view>		
		<home></home>
	</div>
</template>

<script>
	import {
		getSeckillIndexTime,
		getPresellList
	} from '../../../api/activity.js';
	import home from '@/components/home/index.vue'
	export default {
		components: {
			home
		},
		data() {
			return {
				topImage: '',
				presellList: [],
				timeList: [
					'未开始',
					'正在进行',
					'已结束'
				],
				active: 1,
				type: 0,
				scrollLeft: 0,
				interval: 0,
				status: 1,
				page: 1,
				limit: 8,
				loading: false,
				loadend: false,
				pageloading: false,
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
				title: '预售活动',
				path: 'pages/activity/presell/index',
			}
		},
		onShareTimeline: function() {
			return {
				title: '预售活动',
				  query: {
				    key: ''
				  },
				  imageUrl: ''
				}      
		},
		// #endif
		onLoad() {
			this.getPresellProductList();
		},
		methods: {			
			getPresellProductList: function() {
				var that = this;
				var data = {
					page: that.page,
					limit: that.limit,
					type: that.active
				};
				if (that.loadend) return;
				if (that.pageloading) return;
				this.pageloading = true
				getPresellList(data).then(res => {
					console.log(res);
					var presellList = res.data.list;
					var loadend = presellList.length < that.limit;
					that.page++;
					that.presellList = that.presellList.concat(presellList),
						that.page = that.page;
					that.pageloading = false;
					that.loadend = loadend;
				}).catch(err => {
					that.pageloading = false
				});
			},
			settimeList: function(item, index) {
				var that = this;
				that.active = index			
				that.type = that.active;
				that.loadend = false;
				that.page = 1;
				that.presellList = [];
				// wxh.time(e.currentTarget.dataset.stop, that);
				that.getPresellProductList();
			},
			goDetails(item) {
				uni.navigateTo({
					url: '/pages/activity/presell_details/index?id=' + item.product_presell_id
				})
			}
		},
		/**
		 * 页面上拉触底事件的处理函数
		 */
		onReachBottom: function() {
			this.getPresellProductList();
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #FF7F21;
	}
	.noCommodity{
		border-top: none;
	}
	.flash-sale .header {
		width: 100%;
		position: relative;
	}
	.flash-sale .main_count{
		position: relative;
		top: -150rpx;
		
	}
	.flash-sale .header .presellBg {
		width: 750rpx;
	}
	.flash-sale .presellList {
		padding: 0 20rpx;
		bottom: 0;
		margin: 0 30rpx;
		width: 690rpx;
		background: #fff;
		border-radius: 16rpx;
		line-height: 80rpx;
		height: 80rpx;

	}

	.flash-sale .presellList .priceTag {
		width: 75rpx;
		height: 70rpx;

	}

	.flash-sale .presellList .priceTag image {
		opacity: 1;
	}

	.flash-sale .presellList .priceTag image {
		width: 100%;
		height: 100%;
	}

	.flash-sale .timeList {
		display: flex;
		justify-content: center;
		align-items: center;
		margin: 0 auto;
	}

	.flash-sale .timeList .item {
		font-size: 20rpx;
		color: #666;
		text-align: center;
		box-sizing: border-box;
		width: 224rpx;
	}

	.flash-sale .timeList .item .time {
		font-size: 26rpx;
		color: #AAAAAA;
	}

	.flash-sale .timeList .item.on .time {
		color: #FD6523;
		font-weight: 600;
		span{
			position: relative;
			&::after{
				content: '';
				display: inline-block;
				width: 100%;
				height: 4rpx;
				background: #FD6523;
				position: absolute;
				left: 0;
				bottom: -4rpx;
				border-radius: 2rpx;
			}
		}
		
	}
	.activity {
		height: 56rpx;
		padding: 0 11px;
		color: #e93323;
		font-size: 22rpx;
		line-height: 50rpx;
		position: relative;
		background-image: url(~pages/activity/static/images/couponBg.png);
		background-size: 100%;
		background-repeat: no-repeat;
	}

	.flash-sale .list{
		margin-top: 24rpx;
	}
	.flash-sale .list .item {
		height: 278rpx;
		position: relative;
		width: 690rpx;
		margin: 0 auto 20rpx auto;
		background-color: #fff;
		border-radius: 20rpx;
		padding: 0 25rpx;
	}

	.flash-sale .list .item .pictrue {
		width: 240rpx;
		height: 240rpx;
		border-radius: 10rpx;
	}

	.flash-sale .list .item .pictrue image {
		width: 100%;
		height: 100%;
		border-radius: 10rpx;
	}

	.flash-sale .list .item .text {
		width: 380rpx;
		font-size: 30rpx;
		color: #333;
	}

	.flash-sale .list .item .text .name {
		width: 100%;
		color: #282828;
		font-weight: bold;
		font-size: 28rpx;
	}

	.flash-sale .list .item .text .booking {
		font-size: 30rpx;
		color: #E93323;
	}

	.flash-sale .list .item .text .booking .count {
		font-size: 24rpx;
		color: #E93323;
	}

	.flash-sale .list .item .text .limit {
		font-size: 22rpx;
		color: #999;
		margin-bottom: 5rpx;
	}

	.flash-sale .list .item .text .limit .limitPrice {
		margin-left: 10rpx;
	}

	.flash-sale .list .item .text .progress {
		width: 392rpx;
		height: 74rpx;
		background-image: url(~pages/activity/static/images/priceBg.png);
		background-size: 100%;
		margin-top: 16rpx;
		.presell_price{
			float: left;
			width: 50%;
			text-align: center;
			line-height: 15px;
			padding: 8rpx 0;
			.presell_text{
				display: block;
				color: #E93323;
				font-size: 20rpx;
			}
			.price{
				font-size: 26rpx;
				color: #E93323;
				text{
					font-weight: bold;
				}
			}
		}
		.order_btn{
			float: left;
			width: 50%;
			text-align: center;
			color: #FFFFFF;
			font-size: 26rpx;
			line-height: 76rpx;

		}
		.unStartBtn{
			float: left;
			width: 50%;
			text-align: center;
			color: #FFFFFF;
			font-size: 20rpx;
			padding: 8rpx 0;
			text{
				font-size: 22rpx;
			}
		}
	}
</style>

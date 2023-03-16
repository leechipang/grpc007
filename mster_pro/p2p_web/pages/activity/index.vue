<template>
	<div>
		<view class='flash-sale'>
			<view class='header'>
				<img mode="widthFix" class="presellBg" src="../static/images/presell_bg.png" alt="">
				<view class="seckillList acea-row row-between-wrapper">
					<view class='timeList'>
						<block v-for="(item,index) in timeList" :key='index'>
							<view @tap='settimeList(item,index)' class='item' :class="active == index?'on':''">
								<view class='time'><text>{{item}}</text></view>
							</view>
						</block>
					</view>
				</view>
			</view>

			<view class='list'>
				<block v-for="(item,index) in seckillList" :key='index'>
					<view class='item acea-row row-between-wrapper' @tap='goDetails(item)'>
						<view class='pictrue'>
							<image :src='item.product.image'></image>
						</view>
						<view class='text acea-row row-column-around'>
							<view class='name line1'>{{item.store_name}}</view>
							<view class='booking'>
								<text class="count">{{item.ot_price ? item.ot_price : 0}}人已预订</text>
							</view>
							
							<view class="progress">
								<view class='presell_price'></view>
								<view class='order_btn'>立即预订</view>
							</view>
						</view>
					</view>
				</block>
			</view>
		</view>
		<view class='noCommodity' v-if="seckillList.length == 0 && (page != 1 || active== 0)">
			<view class='pictrue'>
				<image src='/static/images/noShopper.png'></image>
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
				seckillList: [],
				timeList: [
					'未开始',
					'正在进行',
					'已结束'
				],
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
			}
		},
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
					var seckillList = res.data.list;
					seckillList.map((item) => {
						item.percent = item.stock === 0 ? '0%' : (item.sales * 100 / item.stock).toFixed(2) + '%';
					})
					var loadend = seckillList.length < that.limit;
					that.page++;
					that.seckillList = that.seckillList.concat(seckillList),
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
				that.seckillList = [];
				// wxh.time(e.currentTarget.dataset.stop, that);
				that.getSeckillList();
			},
			goDetails(item) {
				uni.navigateTo({
					url: '/pages/activity/goods_seckill_details/index?id=' + item.product_id + '&time=' + item.stop
				})
			}
		},
		/**
		 * 页面上拉触底事件的处理函数
		 */
		onReachBottom: function() {
			this.getSeckillList();
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #FF7F21 !important;
	}

	.flash-sale .header {
		width: 100%;
		position: relative;
	}

	.flash-sale .header .presellBg {
		width: 750rpx;
	}


	.flash-sale .seckillList {
		padding: 0 20rpx;
		position: absolute;
		bottom: 0;
		left: 30rpx;
		width: 690rpx;
		background: #fff;
		border-radius: 16rpx;
		line-height: 80rpx;
		height: 80rpx;

	}

	.flash-sale .seckillList .priceTag {
		width: 75rpx;
		height: 70rpx;

	}

	.flash-sale .seckillList .priceTag image {
		opacity: 1;
	}

	.flash-sale .seckillList .priceTag image {
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
		font-size: 36rpx;
		font-weight: 600;
		color: #333;
	}

	.flash-sale .timeList .item.on .time {
		color: #FD6523;
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



	.flash-sale .list{
		margin-top: 24rpx;
	}
	.flash-sale .list .item {
		height: 230rpx;
		position: relative;
		width: 690rpx;
		margin: 0 auto 20rpx auto;
		background-color: #fff;
		border-radius: 20rpx;
		padding: 0 25rpx;
	}

	.flash-sale .list .item .pictrue {
		width: 180rpx;
		height: 180rpx;
		border-radius: 10rpx;
	}

	.flash-sale .list .item .pictrue image {
		width: 100%;
		height: 100%;
		border-radius: 10rpx;
	}

	.flash-sale .list .item .text {
		width: 460rpx;
		font-size: 30rpx;
		color: #333;
		height: 166rpx;
	}

	.flash-sale .list .item .text .name {
		width: 100%;
	}

	.flash-sale .list .item .text .booking {
		font-size: 30rpx;
		color: #E93323;
	}

	.flash-sale .list .item .text .booking .count {
		font-size: 24rpx;
		color: #999;
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
		height: 76rpx;
		background: url(~pages/activity/static/images/yh.png) top left/100% 100% no-repeat;
	}
</style>

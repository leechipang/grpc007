<template>
	<view class="user-swiper">
		<view class="box" id="box" :style="{marginLeft: `${distance}px`}">
			<view class="user-list" v-for="(item,index) in combinationUserList" :key="index">
				<image v-show="init" class="header-img" :src="item.avatar" mode=""></image>
				<text v-show="init" class="user-name">***** 拼团成功</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				init: true,
				distance: 0,
				boxWidth: 0,
				timer: null // 定时器名称 
			}
		},
		props: {
			combinationUserList: {
				type: Array,
				default: () => {
					[]
				}
			}
		},
		watch: {
			combinationUserList() {
				setTimeout(e => {
					const query = uni.createSelectorQuery().in(this);
					query.select('#box').boundingClientRect(data => {
						this.width = data.width
						this.move()
					}).exec();
				}, 1000)
			}
		},
		activated() {
			this.move()
		},
		methods: {
			move() {
				// 设置位移
				this.timer = setInterval(() => {
					console.log(this.distance)
					this.$set(this, 'distance', this.distance - this.width / this.combinationUserList.length)
					// 如果位移超过宽度，则回到起点
					if (this.distance === -this.width) {
						this.init = false
						this.distance = 0
						setTimeout(e => {
							this.init = true
						}, 800)
					}
				}, 2500)
			}
		},
		destroyed() {
			clearInterval(this.timer);
			this.timer = null;
		},
		deactivated() {
			clearInterval(this.timer);
			this.timer = null;
		}
	}
</script>

<style lang="scss" scoped>
	.user-swiper {
		width: 260rpx;
		overflow: hidden;
		border-radius: 25rpx;
		background: rgba(#000000, 0.3);
		height: 50rpx;
		display: flex;
		align-items: center;

		.box {
			width: max-content;
			display: flex;
			align-items: center;
			flex-wrap: nowrap;
			transition: all .8s;

			.user-list {
				display: flex;
				align-items: center;
				justify-content: center;
				width: 260rpx;
				border-radius: 25rpx;
				padding: 8rpx 18rpx;
				color: #fff;
				font-size: 22rpx;

				.header-img {
					width: 34rpx;
					height: 34rpx;
					border-radius: 50%;
					border: 1px solid #FFFFFF;
					margin-right: 6rpx;
				}
			}
		}
	}
</style>

<template>
	<view>
		<view class='collectionGoods' v-if="collectProductList.length">
			<navigator :url='"/pages/goods_details/index?id="+item.type_id' hover-class='none' class='item acea-row row-between-wrapper' v-for="(item,index) in collectProductList" :key="index" v-if="item.product">
				<view class='pictrue' >
					<image :src="item.product.image"></image>
				</view>
				<view class='text acea-row row-column-between'>
					<view class='name line1'>{{item.product.store_name}}</view>
					<view class='acea-row row-between-wrapper'>
						<view class='money font-color'>￥{{item.product.price}}</view>
						<view class='delete' @click.stop='delCollection(item.type_id,index)'>删除</view>
					</view>
				</view>
			</navigator>
			<view class='loadingicon acea-row row-center-wrapper'>
				<text class='loading iconfont icon-jiazai' :hidden='loading==false'></text>{{loadTitle}}
			</view>
		</view>
		<view class='noCommodity' v-else-if="!collectProductList.length && page > 1">
			<view class='pictrue'>
				<image src='/static/images/noCollection.png'></image>
			</view>
			<recommend :hostProduct="hostProduct" :isLogin="isLogin"></recommend>
		</view>
		<!-- #ifdef MP -->
		<authorize @onLoadFun="onLoadFun" :isAuto="isAuto" :isShowAuth="isShowAuth" @authColse="authColse"></authorize>
		<!-- #endif -->
	</view>
</template>

<script>
	import {
		getCollectUserList,
		getProductHot,
		collectDel,
	} from '@/api/store.js';
	import {
		mapGetters
	} from "vuex";
	import {
		toLogin
	} from '@/libs/login.js';
	import recommend from '@/components/recommend';
	// #ifdef MP
	import authorize from '@/components/Authorize';
	// #endif
	export default {
		components: {
			recommend,
			// #ifdef MP
			authorize
			// #endif
		},
		data() {
			return {
				hostProduct: [],
				loadTitle: '加载更多',
				loading: false,
				loadend: false,
				collectProductList: [],
				limit: 8,
				page: 1,
				isAuto: false, //没有授权的不会自动授权
				isShowAuth: false ,//是否隐藏授权
				hotScroll:false,
				hotPage:1,
				hotLimit:10
			};
		},
		computed: mapGetters(['isLogin']),
		onLoad() {
			if (this.isLogin) {
				this.get_user_collect_product();
				this.get_host_product();
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
		/**
		 * 页面上拉触底事件的处理函数
		 */
		methods: {
			/**
			 * 授权回调
			 */
			onLoadFun: function() {
				this.isShowAuth = false;
				this.get_user_collect_product();
				this.get_host_product();
			},
			// 授权关闭
			authColse: function(e) {
				this.isShowAuth = e
			},
			/**
			 * 获取收藏产品
			 */
			get_user_collect_product: function() {
				let that = this;
				if (this.loading) return;
				if (this.loadend) return;
				that.loading = true;
				that.loadTitle = "";
				getCollectUserList({
					page: that.page,
					limit: that.limit
				}).then(res => {
					let collectProductList = res.data.list;
					let loadend = collectProductList.length < that.limit;
					that.collectProductList = that.$util.SplitArray(collectProductList, that.collectProductList);
					that.$set(that, 'collectProductList', that.collectProductList);
					that.loadend = loadend;
					that.loadTitle = loadend ? '我也是有底线的' : '加载更多';
					that.page = that.page + 1;
					that.loading = false;
				}).catch(err => {
					that.loading = false;
					that.loadTitle = "加载更多";
				});
			},
			/**
			 * 取消收藏
			 */
			delCollection: function(id, index) {
				let that = this;
				collectDel({
					type:1,
					type_id:id
				}).then(res => {
					return that.$util.Tips({
						title: '取消收藏成功',
						icon: 'success'
					}, function() {
						that.collectProductList.splice(index, 1);
						that.$set(that, 'collectProductList', that.collectProductList);
					});
				});
			},
			/**
			 * 获取我的推荐
			 */
			get_host_product: function() {
				let that = this;
				if(that.hotScroll) return
				getProductHot(
					that.hotPage,
					that.hotLimit,
				).then(res => {
					that.hotPage++
					that.hotScroll = res.data.list.length<that.hotLimit
					that.hostProduct = that.hostProduct.concat(res.data.list)
				});
			}
		},
		onReachBottom() {
			this.get_user_collect_product();
		}
	}
</script>

<style scoped lang="scss">
	.collectionGoods {
		background-color: #fff;
		border-top: 1rpx solid #eee;
	}

	.collectionGoods .item {
		margin-left: 30rpx;
		padding-right: 30rpx;
		border-bottom: 1rpx solid #eee;
		height: 180rpx;
	}

	.collectionGoods .item .pictrue {
		width: 130rpx;
		height: 130rpx;
	}

	.collectionGoods .item .pictrue image {
		width: 100%;
		height: 100%;
		border-radius: 6rpx;
	}

	.collectionGoods .item .text {
		width: 535rpx;
		height: 130rpx;
		font-size: 28rpx;
		color: #282828;
	}

	.collectionGoods .item .text .name {
		width: 100%;
	}

	.collectionGoods .item .text .money {
		font-size: 26rpx;
	}

	.collectionGoods .item .text .delete {
		font-size: 26rpx;
		color: #282828;
		width: 144rpx;
		height: 46rpx;
		border: 1px solid #bbb;
		border-radius: 4rpx;
		text-align: center;
		line-height: 46rpx;
	}

	.noCommodity {
		background-color: #fff;
		padding-top: 1rpx;
		border-top: 0;
	}
</style>

<template>
	<view>
		<view class='productList'>
			<view class='search bg-color acea-row row-between-wrapper'>
				<view class="back" @click='set_where(1)'>
					<view class="iconfont icon-xiangzuo"></view>
				</view>
				<view class='input acea-row row-between-wrapper'><text class='iconfont icon-sousuo'></text>
					<input placeholder='搜索商品名称' placeholder-class='placeholder' confirm-type='search' name="search" :value='where.keyword'
					 @confirm="searchSubmit" @input="inputChange"></input>
				</view>
				<view style="text-align: right;" v-if="tabIndex==1" class='iconfont' :class='is_switch==true?"icon-pailie":"icon-tupianpailie"'
				 @click='Changswitch'></view>
				<view v-else-if="mer_location == 1" style="text-align: right;" class='iconfont icon-dingwei' @click="showMaoLocation(latitude,longitude)"></view>
			</view>
			<view class="nav-wrapper">
				<view v-if="hide_mer_status == 0" class="tab-bar">
					<view class="tab-item" :class="{on:tabIndex==1}" @click="tabIndex = 1">商品</view>
					<view class="tab-item" :class="{on:tabIndex==2}" @click="tabIndex = 2">店铺</view>
				</view>
				<block v-if="tabIndex==1">
					<view class='nav acea-row row-middle'>
						<view class='item' @click="downStatus = !downStatus" :class="{'font-color':downKey>0 && firstKey == 0}">
							{{downMenu[downKey].title}}
							<text v-if="!downStatus" class="iconfont icon-xiala1 spin"></text>
							<text v-else class="iconfont icon-xiala1"></text>
						</view>
						<view class='item' :class="{'font-color':firstKey == 3}" @click='set_where(3)'>
							销量
						</view>
						<view class='item' :class="{'font-color':firstKey == 2}" @click='set_where(2)'>
							价格
							<image v-if="price==1" src='/static/images/up.png'></image>
							<image v-else-if="price==2" src='/static/images/down.png'></image>
							<image v-else src='/static/images/horn.png'></image>
						</view>
						<!-- down -->
						<view class='item' :class="{'font-color':firstKey == 4}" @click='bindRight'>
							筛选
							<text class="iconfont icon-shaixuan"></text>
						</view>
					</view>
				</block>
				<block v-if="tabIndex==2">
					<view class='nav acea-row row-middle'>
						<view class='item' v-for="item in shopTab" :key="item.key" :class=" {'font-color':storeKey==item.key}" @click="storeTab(item.key)">
							{{item.title}}
						</view>
					</view>
				</block>
			</view>

			<!-- 商品 -->
			<block v-if="tabIndex == 1">
				<view class='list acea-row row-between-wrapper' :class='is_switch==true?"":"on"'>
					<view class='item' :class='is_switch==true?"":"on"' hover-class='none' v-for="(item,index) in productList" :key="index"
					 @click="godDetail(item)">
						<view class='pictrue' :class='is_switch==true?"":"on"'>
							<image :src='item.image' :class='is_switch==true?"":"on"'></image>

						</view>
						<view class='text' :class='is_switch==true?"":"on"'>
							<view class='name line1'>
								<text v-if="item.merchant.is_trader && item.product_type == 0" class="font-bg-red">自营</text>
								<span v-if="item.product_type != 0" :class="'font_bg-red type'+item.product_type">{{item.product_type == 1 ? "秒杀" : item.product_type == 2 ? "预售" : item.product_type == 3 ? "助力" : item.product_type == 4 ? "拼团" : ""}}</span>
								{{item.store_name}}
							</view>
							<view class='money font-color p-jifen' :class='is_switch==true?"":"on"'>
								<!-- ￥<text class='num'>{{item.price}}</text> -->
								<image class="fen" v-if="item.score>0" src="/static/img/20.png"></image>
                <text class="p-ji" v-if="item.score>0">{{ item.score }}</text>
                <text class="p-add" v-if="item.score>0 &&　item.price != '0.00'">+</text>
                <text class="p-pri" v-if="item.price != '0.00'"
                  >￥{{ item.price }}</text
                >
								<view class="ticket" v-if="is_switch && item.issetCoupon">领券</view>
								<view class="ticket-big" v-if="!is_switch && item.issetCoupon">领券满{{item.issetCoupon.use_min_price}}减{{item.issetCoupon.coupon_price}}</view>
							</view>
							<view class="score">{{item.rate}}评分 {{item.reply_count}}条评论</view>
							<view class="company" v-if="item.merchant">
								<text class='name'>{{item.merchant.mer_name}}</text>
								<view class="flex" @click.stop="goStore(item.merchant.mer_id)">
									进店
									<text class="iconfont icon-xiangyou"></text>
								</view>
							</view>
						</view>
						<!-- 返佣 -->
						<block v-if="item.max_extension && (item.product_type == 2 || item.product_type == 0)">
							<view class="foot-bar" :class='is_switch==true?"":"on"'>
								<text class="iconfont icon-fenxiang" v-if="is_switch==true"></text>
								最高赚 ¥{{item.max_extension}}
							</view>
						</block>
					</view>
					<view class='loadingicon acea-row row-center-wrapper' v-if='productList.length > 0'>
						<text class='loading iconfont icon-jiazai' :hidden='loading==false'></text>{{loadTitle}}
					</view>
				</view>
				<view class='noCommodity' v-if="productList.length==0 && !loading">
					<view class='pictrue' style="margin: 0 auto;">
						<image src='/static/images/noShopper.png'></image>
					</view>
					<recommend :hostProduct="hostProduct" :isLogin="isLogin"></recommend>
				</view>
			</block>
			<!-- 店铺 -->
			<block v-if="tabIndex == 2">
				<view class="store-wrapper">
					<view class="store-item" v-for="(item,index) in storeList" :key="index">
						<view class="head">
							<view class="left-wrapper">
								<view class="logo">
									<image :src="item.mer_avatar" mode=""></image>
								</view>
								<view class="con-box">
									<view class="name">{{item.mer_name}}</view>
									<view class="star-box">
										<view class="star">
											<view class="star-active" :style="'width:'+item.allScore+'%'"></view>
										</view>
										<view class="num">{{item.product_score}}</view>
										<view class="line" v-if="item.distance"></view>
										<view class="distance" v-if="item.distance" @click="showMaoLocation(item.lat,item.long)">{{item.distance}}
											<view class="iconfont icon-xiangyou"></view>
										</view>
									</view>
								</view>
							</view>
							<view class="link" @click="goStore(item.mer_id)">进店</view>
						</view>
						<view class="pic-wrapper">
							<view class="pic-item" v-for="(goods,index) in item.recommend" :key="index">
								<navigator :url="`/pages/goods_details/index?id=${goods.product_id}`">
									<image :src="goods.image" mode=""></image>
									<view class="price">
										<text>￥</text>{{goods.price}}
									</view>
								</navigator>
							</view>
						</view>
					</view>
					<view class='loadingicon acea-row row-center-wrapper' v-if='loading'>
						<text class='loading iconfont icon-jiazai' :hidden='loading==false'></text>{{loadTitle}}
					</view>
					<view class='no-shop' v-if="!storeList.length && !loading">
						<view class='pictrue' style="margin: 0 auto;">
							<image src='/static/images/no-shop.png'></image>
							<text>暂无店铺，快去搜索其他店铺吧</text>
						</view>
					</view>
				</view>
			</block>
			<rightSlider v-if="rightBox" :status="rightBox" :brandList="brandList" :price_on="where.price_on" :price_off="where.price_off"
			 @confirm="confirm" @close="close"></rightSlider>
		</view>
		<view class="down-wrapper" v-if="downStatus">
			<view class="bg"></view>
			<view class="down-box">
				<view class="down-item" v-for="(item,index) in downMenu" :key="item.key" :class="{'on':index == downKey}" @click="bindDown(item,index)">
					{{item.title}}
				</view>
			</view>
		</view>
		<!-- #ifdef MP -->
		<authorize @onLoadFun="onLoadFun" :isAuto="isAuto" :isShowAuth="isShowAuth" @authColse="authColse"></authorize>
		<!-- #endif -->
	</view>
</template>

<script>
	import {
		getProductslist,
		getProductHot,
		getBrandlist,
		storeMerchantList,
		getGeocoder
	} from '@/api/store.js';
	import {openBargainSubscribe} from '@/utils/SubscribeMessage.js';
	import {initiateAssistApi} from '@/api/activity.js';
	import {toLogin} from '@/libs/login.js';
	import recommend from '@/components/recommend';
	import rightSlider from '@/components/rightSlider.vue'
	import {
		mapGetters
	} from "vuex";
	// #ifdef MP
	import authorize from '@/components/Authorize';
	// #endif
	import {
		goShopDetail
	} from '@/libs/order.js'
	import {
		getconfig,
	} from '@/api/public.js';
	const app = getApp();
	export default {		
		components: {
			recommend,
			rightSlider,
			// #ifdef MP
			authorize
			// #endif
		},
		watch: {
			tabIndex(nVal, oVal) {
				if (nVal == 1) {
					this.loadend = false;
					this.$set(this.where, 'page', 1)
					this.get_product_list(true);
				} else {
					console.log('222')
					this.downStatus = false
					this.storeScroll = true
					this.storeMerchantList('')
				}
			}
		},
		data() {
			return {
				productList: [],
				is_switch: true,
				hide_mer_status: app.globalData.hide_mer_status,
				where: {
					cate_id: '',
					order: '',
					price_on: '',
					price_off: '',
					brand_id: '',
					keyword: '',
					page: 1,
					limit: 10
				},
				shopTabs: [{
						title: '默认',
						key: 0,
						order: ""
					},
					{
						title: '销量',
						key: 1,
						order: 'sales'
					},
					{
						title: '好评',
						key: 2,
						order: 'rate'
					},
					{
						title: '距离',
						key: 3,
						order: 'location'
					}
				],
				price: 0,
				stock: 0,
				nows: false,
				loadend: false,
				loading: false,
				loadTitle: '加载更多',
				title: '',
				hostProduct: [],
				hotPage: 1,
				hotLimit: 10,
				hotScroll: false,
				// 筛选框
				rightBox: false,
				//品牌列表
				brandList: [],
				downKey: 0,
				downStatus: false,
				// 下拉菜单
				downMenu: [{
						title: '综合',
						key: 1,
					},
					{
						title: '评分',
						key: 2,
					},
					{
						title: '新品',
						key: 3,
					}
				],
				// 是否第一个
				firstKey: 0,
				// tab切换
				tabIndex: 1,
				// 商铺列表
				storeList: [],
				sotreParam: {
					keyword: '',
					page: 1,
					limit: 10,
					order: ''
				},
				storeKey: 0,
				storeScroll: true,
				detaile_address: "", //详细地址
				recommend_address: "", //当前地点
				latitude: "",
				longitude: "",
				mer_location: 0,
				count: 0, //店铺总条数
				isAuto: false, //没有授权的不会自动授权
				isShowAuth: false, //是否隐藏授权
			};
		},
		onLoad: function(options) {
			console.log(this.isLogin)
			this.$set(this.where, 'cate_id', options.id || '');
			this.title = options.title || '';
			this.$set(this.where, 'keyword', options.searchValue || '');
			this.get_product_list();
			this.get_host_product();
		},
		onReady() {},
		mounted() {
			uni.getStorage({
				key: 'GLOBAL_DATA',
				success: (res) => {
					console.log(res);
					this.hide_mer_status = res.data.hide_mer_status
					if (res.data.mer_location == 1) {
						this.mer_location = res.data.mer_location
						this.selfLocation()
					}
				}
			});
		},
		computed: {
			shopTab: function() {
				return this.shopTabs.filter((item) => {
					if (this.mer_location == 1) {
						return item
					} else {
						return item.key < 3
					}
				})
			},
			...mapGetters(['isLogin', 'uid']),
		},
		methods: {
			//查看地图
			showMaoLocation(lat, lon) {
				console.log(lat, lon)
				if (!lat || !lon) return this.$util.Tips({
					title: '缺少经纬度信息无法查看地图！'
				});
				uni.openLocation({
					latitude: parseFloat(lat),
					longitude: parseFloat(lon),
					scale: 8,
					geocode: true,
					success: function(res) {
						console.log(res)
					},
				});
			},
			//获取定位
			selfLocation() {
				let self = this
				uni.getLocation({
					type: 'gcj02',
					success: (res) => {
						console.log(res)
						let latitude, longitude;
						latitude = res.latitude.toString();
						longitude = res.longitude.toString();
						this.latitude = res.latitude
						this.longitude = res.longitude
						console.log(res)
						getGeocoder({
							lat: latitude,
							long: longitude
						}).then(res => {
							console.log(res)
							this.detaile_address = res.data.address;
							this.recommend_address = res.data.formatted_addresses.recommend;
						})
					},
					complete: function() {
						// self.getList();
					}
				});
			},
			// 查找店铺
			storeMerchantList(type) {
				if (!this.storeScroll) return
				this.loading = true
				let serachData = {
					keyword: this.where.keyword,
					page: this.sotreParam.page,
					limit: this.sotreParam.limit,
					order: this.sotreParam.order
				}
				if (this.latitude) {
					serachData.location = this.latitude + ',' + this.longitude
				}
				storeMerchantList(serachData).then(res => {
					res.data.list.forEach(item => {
						var tempNum = parseFloat(item.product_score) + parseFloat(item.service_score) + parseInt(item.postage_score)
						tempNum = tempNum / 3 / 5 * 100
						item.allScore = tempNum.toFixed(2)
					})
					this.storeScroll = res.data.list.length >= this.sotreParam.limit
					if (type == 'search') {
						this.storeList = res.data.list
					} else {
						this.storeList = this.storeList.concat(res.data.list)
					}
					this.count = res.data.count
					this.loading = false
				})
			},
			// 店铺排序
			storeTab(key) {
				if (this.loading) return
				this.storeKey = key
				this.sotreParam.order = this.shopTabs[key].order
				this.sotreParam.page = 1
				this.storeScroll = true
				this.storeList = []
				this.storeMerchantList()
			},
			// 右侧切换
			bindRight() {
				this.price = 0;
				this.firstKey = 4
				this.getBrandlist()

			},
			// 品牌列表
			getBrandlist() {
				let temp = []
				getBrandlist({
					cate_id: this.where.cate_id,
					keyword: this.where.keyword
				}).then(res => {
					temp = res.data.list.map(item => {
						return {
							...item,
							check: false
						}
					})
					if (this.where.brand_id.length > 0) {
						this.where.brand_id.forEach((ids, index) => {
							temp.forEach(el => {
								if (ids == el.brand_id) {
									el.check = true
								}
							})
						})
					}
					this.brandList = temp
					this.rightBox = true
				})
			},
			onLoadFun: function(e) {
				this.isShowAuth = false
			},
			// 授权关闭
			authColse: function(e) {
				this.isShowAuth = e;
			},
			// 去详情页
			godDetail(item) {
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
						this.isAuto = true;
						this.$set(this, 'isShowAuth', true);
						// #endif
					}
				})
					
			},
			// 组件确定
			confirm(data) {
				let arr = []
				if (data.brandList.length == 0) {
					this.where.brand_id = ''
				} else {
					data.brandList.forEach(item => {
						arr.push(item.brand_id)
					})
					this.where.brand_id = arr
				}
				this.rightBox = data.status
				this.where.price_on = data.price_on
				this.where.price_off = data.price_off
				this.loadend = false;
				console.log(this.where)
				this.$set(this.where, 'page', 1)
				this.get_product_list(true);

			},
			// 组件关闭
			close() {
				this.rightBox = false
			},
			// 下拉选项
			bindDown(item, index) {
				this.firstKey = 0
				if (index == 0) {
					this.where.order = ''
				} else if (index == 1) {
					this.where.order = 'rate'
				} else if (index == 2) {
					this.where.order = 'is_new'
				}
				this.downKey = index
				this.downStatus = false
				this.loadend = false;
				this.$set(this.where, 'page', 1)
				this.get_product_list(true);
			},
			Changswitch: function() {
				let that = this;
				that.is_switch = !that.is_switch
			},
			searchSubmit: function(e) {
				let that = this;
				if (!e.detail.value.trim()) {
					uni.showToast({
						title: '请输入搜索内容',
						icon: 'none',
						duration: 1000
					});
					return
				}
				that.$set(that.where, 'keyword', e.detail.value);
				if (this.tabIndex == 1) {
					that.loadend = false;
					that.$set(that.where, 'page', 1)
					this.get_product_list(true);
				} else {
					this.sotreParam.page = 1
					this.storeScroll = true
					this.storeList = []
					this.storeMerchantList('search')
				}

			},
			inputChange: function(e) {
				let that = this;
				that.$set(that.where, 'keyword', e.detail.value);
			},
			/**
			 * 获取我的推荐
			 */
			get_host_product: function() {
				let that = this;
				if (that.hotScroll) return
				getProductHot(
					that.hotPage,
					that.hotLimit,
				).then(res => {
					that.hotPage++
					that.hotScroll = res.data.list.length < that.hotLimit
					that.hostProduct = that.hostProduct.concat(res.data.list)
					// that.$set(that, 'hostProduct', res.data)
				});
			},
			//点击事件处理
			set_where: function(e) {
				switch (e) {
					case 1:
						uni.navigateBack()
						break
					case 2:
						this.firstKey = e
						if (this.price == 0) {
							this.price = 1;
							this.where.order = 'price_asc'
						} else if (this.price == 1) {
							this.price = 2;
							this.where.order = 'price_desc'
						} else if (this.price == 2) {
							this.price = 0;
							this.where.order = ''
						}
						this.$set(this.where, 'page', 1)
						this.get_product_list(true);
						break;
					case 3:
						this.price = 0;
						this.loadend = false;
						this.$set(this.where, 'order', 'sales')
						this.$set(this.where, 'page', 1)
						this.get_product_list(true);
						this.firstKey = e
						break;
				}
				this.loadend = false;
				this.$set(this.where, 'page', 1);
				this.get_product_list(true);
			},
			//查找产品
			get_product_list: function(isPage) {
				let that = this;
				if (that.loadend) return;
				if (that.loading) return;
				if (isPage === true) that.$set(that, 'productList', []);
				that.loading = true;
				that.loadTitle = '';
				getProductslist(that.where).then(res => {
					let list = res.data.list;
					let productList = that.$util.SplitArray(list, that.productList);
					let loadend = list.length < that.where.limit;
					that.loadend = loadend;
					that.loading = false;
					that.loadTitle = loadend ? '已全部加载' : '加载更多';
					that.$set(that, 'productList', productList);
					that.$set(that.where, 'page', that.where.page + 1);
				}).catch(err => {
					that.loading = false;
					that.loadTitle = '加载更多';
				});
			},
			goStore: function(id) {
				console.log(id)
				if (this.hide_mer_status != 1) {
					uni.navigateTo({
						url: `/pages/store/home/index?id=${id}`
					})
				}
			}
		},
		onPullDownRefresh() {

		},
		onReachBottom() {
			if (this.tabIndex == 1) {
				if (this.productList.length > 0) {
					this.get_product_list();
				} else {
					this.get_host_product();
				}
			} else {
				if (this.count === this.storeList.length) {
					if (this.count === 0) {
						return
					}
					uni.showToast({
						title: '已加载全部',
						icon: 'none',
						duration: 1000
					});
				} else {
					this.sotreParam.page += 1
					this.storeMerchantList()
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.font-bg-red,
	.font_bg-red {
		display: inline-block;
		background: #E93424;
		color: #fff;
		font-size: 20rpx;
		width: 52rpx;
		text-align: center;
		line-height: 30rpx;
		border-radius: 5rpx;
		margin-right: 8rpx;
		position: relative;
		top: -2rpx;
		&.ml8 {
			margin-left: 8rpx;
			margin-right: 0;
		}

		&.type2 {
			background-color: #FD6523;
		}
	}


	.productList .search {
		width: 100%;
		height: 86rpx;
		padding: 0 20rpx;
		box-sizing: border-box;
		position: fixed;
		left: 0;
		top: 0;
		z-index: 9;

		.icon-dingwei {
			color: #fff;
			font-weight: 0;
			font-size: 40rpx;
			line-height: 86rpx;
			width: 62rpx;
		}
	}

	.productList .search .back {
		display: flex;
		align-items: center;
		width: 40rpx;
		height: 60rpx;

		.iconfont {
			color: #fff;
			font-size: 36rpx;
		}
	}

	.productList .search .input {
		flex: 1;
		height: 60rpx;
		background-color: #fff;
		border-radius: 50rpx;
		padding: 0 20rpx;
		box-sizing: border-box;
	}

	.productList .search .input input {
		flex: 1;
		height: 100%;
		font-size: 26rpx;
		margin-left: 10rpx;
	}

	.productList .search .input .placeholder {
		color: #999;
	}

	.productList .search .input .iconfont {
		font-size: 35rpx;
		color: #555;
	}

	.productList .search .icon-pailie,
	.productList .search .icon-tupianpailie,
	.productList .search .iconempty {
		color: #fff;
		width: 62rpx;
		font-size: 40rpx;
		height: 86rpx;
		line-height: 86rpx;
	}


	.productList .nav-wrapper {
		z-index: 9;
		position: fixed;
		left: 0;
		top: 0;
		width: 100%;
		margin-top: 86rpx;
		background-color: $theme-color;

		.tab-bar {
			display: flex;
			align-items: center;

			.tab-item {
				position: relative;
				flex: 1;
				display: flex;
				justify-content: center;
				align-items: center;
				padding: 8rpx 0 20rpx;
				color: #fff;
				font-size: 28rpx;
				font-weight: bold;

				&::after {
					content: ' ';
					position: absolute;
					left: 50%;
					bottom: 18rpx;
					width: 30rpx;
					height: 3rpx;
					background: transparent;
					transform: translateX(-50%);
				}

				&.on {
					&::after {
						background: #fff;
					}
				}
			}
		}
	}

	.productList .nav {
		height: 86rpx;
		color: #454545;
		font-size: 28rpx;
		background-color: #fff;
		display: flex;
		justify-content: space-between;
		padding: 0 28rpx;
	}

	.productList .nav .item {
		display: flex;
		align-items: center;
		justify-content: center;
		flex: 1;
	}

	.productList .nav .item.font-color {
		font-weight: bold;
	}

	.productList .nav .item image {
		width: 15rpx;
		height: 19rpx;
		margin-left: 10rpx;
	}

	.productList .list {
		padding: 0 20rpx;
		margin-top: 240rpx;
	}

	.productList .list.on {
		background-color: #fff;
		border-top: 1px solid #f6f6f6;
	}

	.productList .list .item {
		position: relative;
		width: 345rpx;
		margin-top: 20rpx;
		background-color: #fff;
		border-radius: 20rpx;
	}

	.productList .list .item.on {
		width: 100%;
		display: flex;
		border-bottom: 1rpx solid #f6f6f6;
		padding: 30rpx 0;
		margin: 0;
	}

	.productList .list .item .pictrue {
		position: relative;
		width: 100%;
		height: 345rpx;
	}

	.productList .list .item .pictrue.on {
		width: 200rpx;
		height: 200rpx;
	}

	.productList .list .item .pictrue image {
		width: 100%;
		height: 100%;
		border-radius: 20rpx 20rpx 0 0;
	}

	.productList .list .item .pictrue image.on {
		border-radius: 6rpx;
	}

	.productList .list .item .text {
		padding: 20rpx 17rpx 26rpx 17rpx;
		font-size: 30rpx;
		color: #222;
	}

	.productList .list .item .text.on {
		width: 508rpx;
		padding: 0 0 0 22rpx;
	}

	.productList .list .item .text .money {
		display: flex;
		align-items: center;
		font-size: 26rpx;
		font-weight: bold;
		margin-top: 8rpx;
	}

	.productList .list .item .text .money.on {
		margin-top: 30rpx;
	}

	.productList .list .item .text .money .num {
		font-size: 34rpx;
	}

	.productList .distance {
		display: flex;
		align-items: center;
		font-size: 24rpx;
		color: #999999;

		.icon-xiangyou {
			font-size: 24rpx;
			line-height: 24rpx;
		}
	}

	.productList .list .item .text .money .ticket {
		margin-left: 10rpx;
		padding: 0 5rpx;
		font-weight: initial;
		font-size: 20rpx;
		border: 1px solid $theme-color;
		border-radius: 4rpx;
	}

	.productList .list .item .text .money .ticket-big {
		display: flex;
		align-items: center;
		justify-content: center;
		min-width: 163rpx;
		height: 28rpx;
		margin-left: 10rpx;
		background-image: url(~static/images/yh.png);
		background-size: 100% 100%;
		font-size: 20rpx;
		font-weight: normal;
		padding: 0 10rpx;
	}

	.productList .list .item .text .score {
		margin-top: 10rpx;
		color: #737373;
		font-size: 20rpx;
	}

	.productList .list .item .text .company {
		display: flex;
		align-items: center;
		color: #737373;
		font-size: 20rpx;
		margin-top: 10rpx;

		.name {
			display: inline-block;
			width: 200rpx;
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
		}

		.flex {
			display: flex;
			align-items: center;
			margin-left: 10rpx;
			color: #282828;

			.iconfont {
				font-size: 16rpx;
				margin-top: 4rpx;
			}
		}
	}

	.productList .list .item .foot-bar {
		width: 100%;
		height: 52rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		background: linear-gradient(-90deg, $bg-star 0%, $bg-end 100%);
		border-radius: 0px 0px 16rpx 16rpx;
		color: #fff;
		font-size: 24rpx;

		.icon-fenxiang {
			font-size: 24rpx;
			margin-right: 10rpx;
		}

		&.on {
			position: absolute;
			right: 0;
			bottom: 30rpx;
			width: 180rpx;
			height: 44rpx;
			border-radius: 22rpx;
		}
	}

	.noCommodity {
		background-color: #fff;
		padding-bottom: 30rpx;
	}

	.no-shop {
		margin-top: 6rpx;
		background-color: #fff;
		padding-bottom: calc(100% - 109rpx);

		.pictrue {
			display: flex;
			flex-direction: column;
			align-items: center;
			color: $uni-nothing-text;

			image {
				width: 414rpx;
				height: 380rpx;
			}
		}
	}

	.spin {
		display: block;
		transform: rotate(180deg);
		font-size: 36rpx;
	}

	.icon-xiala1 {
		margin-top: 6rpx;
	}

	.icon-shaixuan {
		font-size: 30rpx;
		margin-left: 10rpx;
	}

	.down-wrapper {
		.bg {
			z-index: 8;
			position: fixed;
			left: 0;
			top: 0;
			width: 100%;
			height: 100%;
			background: rgba(0, 0, 0, .5);
		}

		.down-box {
			z-index: 8;
			position: fixed;
			left: 0;
			top: 238rpx;
			width: 100%;
			padding: 0 40rpx 28rpx 74rpx;
			background-color: #F8F8F8;
			border-radius: 0 0 24rpx 24rpx;

			.down-item {
				margin-top: 28rpx;
				font-size: 24rpx;
				color: #454545;

				&.on {
					color: $theme-color;
					background-image: url(~static/images/active.png);
					background-repeat: no-repeat;
					background-size: 21rpx 21rpx;
					background-position: center right;
				}
			}
		}
	}

	.store-wrapper {
		margin-top: 240rpx;
		border-top: 1px solid #F6F6F6;

		.star-box {
			display: flex;
			align-items: center;

			.line {
				width: 2rpx;
				height: 20rpx;
				background: #BFBFBF;
				margin: 0 12rpx;
			}

			.star {
				position: relative;
				width: 111rpx;
				height: 19rpx;
				background: url(~pages/columnGoods/images/star.png);
				background-size: 111rpx 19rpx;
			}

			.star-active {
				position: absolute;
				left: 0;
				top: 0;
				width: 111rpx;
				height: 19rpx;
				overflow: hidden;
				background: url(~pages/columnGoods/images/star_active.png);
				background-size: 111rpx 19rpx;
			}

			.num {
				color: $theme-color;
				font-size: 24rpx;
				margin-left: 10rpx;
			}
		}

		.store-item {
			margin-bottom: 12rpx;
			padding: 40rpx 20rpx;
			background-color: #fff;

			.head {
				display: flex;
				align-items: center;
				justify-content: space-between;

				.left-wrapper {
					display: flex;
					align-items: center;

					.logo {
						width: 80rpx;
						height: 80rpx;

						image {
							width: 80rpx;
							height: 80rpx;
							border-radius: 6rpx;
						}
					}

					.con-box {
						margin-left: 20rpx;

						.font-bg-red {
							width: max-content;
							white-space: nowrap;
							margin-left: 20rpx;
							font-size: 18rpx;
							padding: 2rpx 10rpx;
							color: #FFFFFF;
							background-color: #E93323;
							border-radius: 13rpx;
						}

						.name {
							font-size: 30rpx;
							color: #333;
							font-weight: bold;
							margin-bottom: 10rpx;
						}
					}
				}

				.link {
					width: 114rpx;
					height: 50rpx;
					line-height: 50rpx;
					background: linear-gradient(-90deg, rgba(246, 122, 56, 1) 0%, rgba(241, 27, 9, 1) 100%);
					border-radius: 25rpx;
					text-align: center;
					color: #fff;
					font-size: 24rpx;
				}
			}

			.pic-wrapper {
				display: flex;
				margin-top: 30rpx;

				.pic-item {
					position: relative;
					width: 226rpx;
					height: 226rpx;
					margin-right: 16rpx;

					image {
						width: 226rpx;
						height: 226rpx;
						border-radius: 16rpx;
					}

					.price {
						position: absolute;
						right: 0;
						bottom: 0;
						height: 36rpx;
						padding: 0 10rpx;
						line-height: 36rpx;
						text-align: center;
						background: rgba(0, 0, 0, .5);
						border-radius: 16rpx 2rpx 16rpx 2rpx;
						color: #fff;
						font-size: 24rpx;

						text {
							font-size: 18rpx;
						}
					}

					&:nth-child(3n) {
						margin-right: 0;
					}
				}
			}
		}
	}
	.line1{
		width: 320rpx;
		height: 74rpx;
		white-space:pre-line;
		// text-align-last: justify;
		margin: 0 auto;
	}
</style>

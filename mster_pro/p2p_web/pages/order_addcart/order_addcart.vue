<template>
	<view>
		<view class='shoppingCart'>
			<view class='labelNav acea-row row-around row-middle'>
				<view class='item'><text class='iconfont icon-xuanzhong'></text>100%正品保证</view>
				<view class='item'><text class='iconfont icon-xuanzhong'></text>所有商品精挑细选</view>
				<view class='item'><text class='iconfont icon-xuanzhong'></text>售后无忧</view>
			</view>
			<view class='nav acea-row row-between-wrapper'>
				<view>购物数量 <text class='num font-color'>{{cartTotalCount}}</text></view>
				<view v-if="cartList.valid.length > 0 || cartList.invalid.length > 0" class='administrate acea-row row-center-wrapper'
				 @click='manage'>{{ footerswitch ? '管理' : '取消'}}</view>
			</view>
			<view v-if="cartList.valid.length > 0 || cartList.invalid.length > 0">
				<view class='list'>
					<block v-for="(item,index) in cartList.valid" :key="index">
						<view class='item acea-row row-between-wrapper'>
							<view class="store-title">
								<view class="checkbox" @click="storeAllCheck(item,index)">
									<text v-if="!item.allCheck" class="iconfont icon-weixuanzhong"></text>
									<text v-else class="iconfont icon-xuanzhong1"></text>
								</view>
								<navigator :url="hide_mer_status == 0 ? '/pages/store/home/index?id='+item.mer_id : '#'" class="info">
									<text class="iconfont icon-shangjiadingdan"></text>
									<view class="name">{{item.mer_name}}</view>
									<text class="iconfont icon-xiangyou"></text>
								</navigator>
								<view class="coupon-btn" v-if="item.hasCoupon>0" @click="giveCoupon(item)">优惠券</view>
							</view>
							<navigator v-for="goods in item.list" :key="goods.cart_id" :url='"/pages/goods_details/index?id="+goods.product.product_id'
							 hover-class='none' class='picTxt acea-row'>
								<view class="checkbox" @click.stop="goodsCheck(goods,index)">
									<text v-if="!goods.check" class="iconfont icon-weixuanzhong"></text>
									<text v-else class="iconfont icon-xuanzhong1"></text>
								</view>
								<view class='pictrue'>
									<image :src='(goods.productAttr && goods.productAttr.image) || goods.product.image'></image>
									<!-- <image v-else :src='item.productInfo.image'></image> -->
								</view>
								<view class='text'>
									<view class='line1'>{{goods.product.store_name}}</view>
									<view class='infor line1' v-if="goods.productAttr.sku">属性：{{goods.productAttr.sku}}</view>
									<view class='money'>￥{{goods.productAttr.price}}</view>
								</view>
								<view class='carnum acea-row row-center-wrapper'>
									<view class="reduce" :class="goods.numSub ? 'on' : ''" @click.stop='subCart(goods)'>-</view>
									<view class='num'>{{goods.cart_num}}</view>
									<!-- <view class="num">
											<input type="number" v-model="item.cart_num" @click.stop @input="iptCartNum(index)" @blur="blurInput(index)"/>
										</view> -->
									<view class="plus" :class="goods.numAdd ? 'on' : ''" @click.stop='addCart(goods)'>+</view>
								</view>
							</navigator>
						</view>
					</block>
				</view>
				<view class='invalidGoods' v-if="cartList.invalid.length > 0">
					<view class='goodsNav acea-row row-between-wrapper'>
						<view @click='goodsOpen'><text class='iconfont' :class='goodsHidden==true?"icon-xiangxia":"icon-xiangshang"'></text>失效商品</view>
						<view class='del' @click='unsetCart'><text class='iconfont icon-shanchu1'></text>清空</view>
					</view>
					<view class='goodsList' :hidden='goodsHidden'>
						<block v-for="(item,index) in cartList.invalid" :key='index'>
							<view class='item acea-row row-between-wrapper'>
								<view class='invalid'>失效</view>
								<view class='pictrue'>
									<image :src='(item.productAttr && item.productAttr.image) || item.product.image'></image>

								</view>
								<view class='text acea-row row-column-between'>
									<view class='line1 name'>{{item.product.store_name}}</view>
									<!-- <view class='infor line1' v-if="item.productInfo.attrInfo">属性：{{item.productInfo.attrInfo.suk}}</view> -->
									<view class='acea-row row-between-wrapper'>
										<!-- <view>￥{{item.truePrice}}</view> -->
										<view class='end'>该商品已失效</view>
									</view>
								</view>
							</view>
						</block>
					</view>
				</view>
			</view>
			<view class='noCart' v-if="recommend" :style="{marginTop:cartList.invalid.length ==0 && cartList.invalid.length ==0?'170rpx':'' }">
				<view class='pictrue'>
					<image src='../../static/images/noCart.png'></image>
				</view>
				<recommend :hostProduct='hostProduct' :isLogin="isLogin                                                                                                                                                                                                                                                                                                                  "></recommend>
				<view class='loadingicon acea-row row-center-wrapper' v-if="hostProduct.length>5">
					<text class='loading iconfont icon-jiazai' :hidden='loading==false'></text>{{loadTitle}}
				</view>
			</view>
			<view style='height:120rpx;'></view>
			<view class='footer acea-row row-between-wrapper' v-if="cartList.valid.length > 0">
				<view>
					<!-- <checkbox-group @change="checkboxAllChange">
						<checkbox value="all" :checked="!!isAllSelect" /><text class='checkAll'>全选 ({{cartCount}})</text>
					</checkbox-group> -->
					<view class="allcheckbox" @click.stop="checkboxAllChange">
						<text v-if="!isAllSelect" class="iconfont icon-weixuanzhong"></text>
						<text v-else class="iconfont icon-xuanzhong1"></text>
						全选 ({{cartCount}})
					</view>
				</view>
				<view class='money acea-row row-middle' v-if="footerswitch==true">
					<text class='font-color'>￥{{selectCountPrice}}</text>
					<form @submit="subOrder" report-submit='true'>
						<button class='placeOrder bg-color' formType="submit">立即下单</button>
					</form>
				</view>
				<view class='button acea-row row-middle' v-else>
					<form @submit="subCollect" report-submit='true'>
						<button class='bnt cart-color' formType="submit">收藏</button>
					</form>
					<form @submit="subDel" report-submit='true'>
						<button class='bnt' formType="submit">删除</button>
					</form>
				</view>
			</view>
		</view>
		<!-- 优惠券弹窗 -->
		<block v-if="coupon.coupon">
			<couponListWindow 
				:coupon='coupon' 
				@ChangCouponsClone="ChangCouponsClone" 
				@ChangCouponsUseState="ChangCouponsUseState"
			></couponListWindow>
		</block> 
		
		<!-- #ifdef MP -->
		<authorize :isAuto="isAuto" :isShowAuth="isShowAuth" @authColse="authColse" @onLoadFun="onLoadFun"></authorize>
		<!-- #endif -->
	</view>
</template>

<script>
	import couponListWindow from '@/components/couponListWindow';
	import {
		getCartList,
		getCartCounts,
		changeCartNum,
		cartDel
	} from '@/api/order.js';
	import {
		getCoupons,
		getShopCoupons
	} from '@/api/api.js';
	import {
		getProductHot,
		collectAll
	} from '@/api/store.js';
	import {
		toLogin
	} from '@/libs/login.js';
	import {
		mapGetters
	} from "vuex";
	import recommend from '@/components/recommend';
	// #ifdef MP
	import authorize from '@/components/Authorize';
	// #endif
	const app = getApp();
	export default {
		components: {
			recommend,
			couponListWindow,
			// #ifdef MP
			authorize
			// #endif
		},
		data() {
			return {
				loading: false, //是否加载中
				loadend: false, //是否加载完毕
				loadTitle: '加载更多', //提示语
				cartCount: 0,
				goodsHidden: true,
				footerswitch: true,
				hostProduct: [],
				cartList: {
					valid: [],
					invalid: []
				},
				isAllSelect: false, //全选
				selectValue: [], //选中的数据
				selectCountPrice: 0.00,
				isAuto: false, //没有授权的不会自动授权
				isShowAuth: false, //是否隐藏授权
				hotScroll: false,
				hotPage: 1,
				hotLimit: 10,
				//属性是否打开
				coupon: {
					'coupon': false,
					list: [],
				},
				// 购物车总数
				cartTotalCount:0,
				recommend: false,
				hide_mer_status: 1
			};
		},
		computed: mapGetters(['isLogin']),
		onReady(){			
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
		onLoad: function(options) {
			let that = this;
			if (that.isLogin == false) {
				// #ifdef H5 || APP-PLUS
				toLogin();
				// #endif 
				// #ifdef MP
				that.isAuto = true;
				that.$set(that, 'isShowAuth', true);
				// #endif
			}
		},
		onShow: function() {
			uni.showTabBar();
			if (this.isLogin == true) {
				this.hostProduct = [];
				this.hotScroll = false;				
				this.hotLimit = 10;
				this.hotPage = 1;
				this.getHostProduct();
				this.getCartList();
				this.getCartNum();
				this.goodsHidden = true;
				this.footerswitch = true;			
				this.cartList = {
						valid: [],
						invalid: []
					},
				this.isAllSelect = false; //全选
				this.selectValue = []; //选中的数据
				this.selectCountPrice = 0.00;
				this.cartCount = 0;
				this.isShowAuth = false;
				uni.setStorage({
					key:'invoice_Data',
					data:{},
					success: function(){
						
					}
				})
			}
		},
		methods: {
			// 授权关闭
			authColse: function(e) {
				console.log(e,'authColse')
				this.isShowAuth = e;
			},
			onLoadFun(){
				this.isShowAuth = false;
			},
			// 删除
			subDel: function(event) {
				let that = this
				let type_id = []
				this.cartList.valid.forEach(el=>{
					el.list.forEach(goods=>{
						if(goods.check){
							type_id.push(goods.cart_id)
						}
					})
				})
				if(type_id.length == 0){
					return that.$util.Tips({
						title: '请选择产品'
					});
				}else{
					cartDel({
						cart_id:type_id,
					}).then(res=>{
						this.getCartList();
						this.getCartNum();
						return that.$util.Tips({
							title: res.message,
							icon: 'success'
						});
					}).catch(err => {
						return that.$util.Tips({
							title: err
						});
					});
				}
			},
			// 收藏
			subCollect: function(event) {
				let that = this
				let type_id = []
				this.cartList.valid.forEach(el=>{
					el.list.forEach(goods=>{
						if(goods.check){
							type_id.push(goods.product.product_id)
						}
					})
				})
				if(type_id.length == 0){
					return that.$util.Tips({
						title: '请选择产品'
					});
				}else{
					collectAll({
						type_id:type_id,
						type:1
					}).then(res=>{
						return that.$util.Tips({
							title: res.message,
							icon: 'success'
						});
					}).catch(err => {
						return that.$util.Tips({
							title: err
						});
					});
				}
			},
			// 立即下单
			subOrder: function(event) {
				let selectValue = []
				this.cartList.valid.forEach(el=>{
					el.list.forEach(goods=>{
						if(goods.check){
							selectValue.push(goods.cart_id)
						}
					})
				})
				if (selectValue.length > 0) {
					uni.navigateTo({
						url: '/pages/users/order_confirm/index?cartId=' + selectValue.join(',')
					});
				} else {
					return that.$util.Tips({
						title: '请选择产品'
					});
				}
			},
			// 购物车增加
			addCart: function(goods, index) {
				let that = this;
				goods.cart_num = Number(goods.cart_num) + 1
				this.cartTotalCount = Number(this.cartTotalCount) + 1;
				if (goods.hasOwnProperty('productAttr') && goods.cart_num > goods.productAttr.stock) {
					goods.cart_num = goods.productAttr.stock;
					goods.numAdd = true;
					goods.numSub = false;
					return
				} else {
					goods.numAdd = false;
					goods.numSub = false;
				}
				changeCartNum(goods.cart_id, {
					cart_num: goods.cart_num
				}).then(res => {}).catch(error => {
					goods.cart_num = Number(goods.cart_num) - 1
				})
				this.cartAllCheck('goodsCheck')
			},
			// 购物车递减
			subCart(goods) {
				let status = false;
				
				if (goods.cart_num < 1) status = true;
			
				if (goods.cart_num <= 1) {
					goods.cart_num = 1;
					goods.numSub = true;
					status = true;
					
				} else {
					goods.cart_num = Number(goods.cart_num) - 1
					this.cartTotalCount = Number(this.cartTotalCount) - 1;
					goods.numSub = false;
					goods.numAdd = false;
					if(goods.cart_num <= 1){
						goods.numSub = true;
					}
				}
				if (false == status) {
					changeCartNum(goods.cart_id, {
						cart_num: goods.cart_num
					}).then(res => {}).catch(error => {
						goods.cart_num = Number(goods.cart_num) - 1
					})
					this.cartAllCheck('goodsCheck')
				}
				
			},
			getCartNum: function() {
				let that = this;
				getCartCounts().then(res => {
					console.log(res);
					that.cartTotalCount = res.data[0].count || 0;
				});
			},
			// 购物车列表
			getCartList: function() {
				let that = this;
				getCartList().then(res => {
					res.data.list.forEach((item, index) => {
						item.allCheck = true
						item.list.forEach((goods, j) => {
							goods.check = true
							if (goods.cart_num == 1) {
								goods.numSub = true;
							} else {
								goods.numSub = false;
							}
							if (goods.cart_num == goods.productAttr.stock) {
								goods.numAdd = true;
							} else {
								goods.numAdd = false;
							}

						})
					})
					this.cartList.valid = res.data.list
					this.cartList.invalid = res.data.fail
					if(res.data.list.length == 0 && res.data.list.length == 0){
						this.recommend = true
					}else{
						this.recommend = false
					}
					this.checkboxAllChange()
				});
			},
			// 商铺全选
			storeAllCheck(item, index) {
				// 店铺取消
				if (item.allCheck) {
					item.allCheck = false
					item.list.forEach((el, index) => {
						el.check = false
					})
				} else {
					item.allCheck = true
					item.list.forEach((el, index) => {
						el.check = true
					})
				}
				this.cartAllCheck('goodsCheck')
			},
			// 商品选中
			goodsCheck(goods) {
				goods.check = !goods.check
				// console.log(parentIndex,'parentIndex')
				this.cartAllCheck('goodsCheck')
			},
			// 全选判断
			cartAllCheck(type) {
				let allArr = [];
				let totalMoney = 0
				let totalNum = 0
				this.cartList.valid.forEach((el, index) => {
					if (type == 'goodsCheck') {
						let tempArr = el.list.filter(goods => {
							return goods.check == true
						})
						if (el.list.length == tempArr.length) {
							el.allCheck = true
							allArr.push(el)
						} else {
							el.allCheck = false
						}
					} else {
						el.list.forEach((goods) => {
							goods.check = this.isAllSelect
						})
						el.allCheck = this.isAllSelect
						if (el.allCheck) allArr.push(el)
					}
					// 总金额 //总数
					el.list.forEach(e => {
						if (e.check) {
							totalMoney = this.$util.$h.Add(totalMoney, this.$util.$h.Mul(e.productAttr.price, e.cart_num))
							totalNum += e.cart_num
						}
					})
				})
				this.cartCount = totalNum
				this.selectCountPrice = totalMoney
				// 全选
				this.isAllSelect = allArr.length == this.cartList.valid.length ? true : false

			},
			// 购物车全选
			checkboxAllChange() {
				this.isAllSelect = !this.isAllSelect
				this.cartAllCheck('cartCheck')
			},
			// 推荐列表
			getHostProduct: function() {
				let that = this;
				if (that.loadend) return;
				if (that.hotScroll) return;
				that.loading = true;
				that.loadTitle = "加载更多";
				getProductHot(
					that.hotPage,
					that.hotLimit,
				).then(res => {
					let list = res.data.list || [];	
					that.hotPage++
					that.hotScroll = res.data.list.length < that.hotLimit
					that.hostProduct = that.hostProduct.concat(res.data.list)
					that.loading = false;
					that.loadTitle = that.hotScroll ? "我也是有底线的" : '加载更多';
				});
			},
			// 失效商品展开
			goodsOpen: function() {
				let that = this;
				that.goodsHidden = !that.goodsHidden;
			},
			// 管理
			manage: function() {
				let that = this;
				that.footerswitch = !that.footerswitch;
			},
			// 清空
			unsetCart: function() {
				let that = this,
					ids = [];
				for (let i = 0, len = that.cartList.invalid.length; i < len; i++) {
					ids.push(that.cartList.invalid[i].cart_id);
				}
				cartDel({
					cart_id:ids
				}).then(res => {
					that.$util.Tips({
						title: '清除成功'
					});
					that.$set(that.cartList, 'invalid', []);
				}).catch(res => {

				});
			},
			// 店铺优惠券
			giveCoupon(item){
				let that = this;
				let goodsArr = []
				let couponList = [];
				let activeList = [];
				let ids = []
				item.list.map(el=>{
					ids.push(el.product_id)
				})
				getCoupons({
					ids:ids.join(',')
				}).then(res => {
					goodsArr = res.data
					getShopCoupons(item.mer_id).then(({data})=>{
						uni.hideTabBar();
						couponList = goodsArr.concat(data)
						this.$set(this.coupon, 'list', couponList);
						this.$set(this.coupon, 'coupon', true);
					}).catch(error=>{
						uni.showTabBar();
					})
				});

			},
			ChangCouponsClone: function() {
				uni.showTabBar();
				this.$set(this.coupon, 'coupon', false)
			},
			ChangCouponsUseState(index) {
				uni.showTabBar();
				let that = this;
				that.coupon.list[index].issue = true;
				console.log(that.coupon.list[index])
				// that.$set(that.coupon, 'list', that.coupon.list);
				// that.$set(that.coupon, 'coupon', false);
			},
		},
		onReachBottom() {
			this.getHostProduct();
		}
	}
</script>

<style scoped lang="scss">
	.shoppingCart .labelNav {
		height: 76rpx;
		padding: 0 30rpx;
		font-size: 22rpx;
		color: #8c8c8c;
		position: fixed;
		left: 0;
		width: 100%;
		box-sizing: border-box;
		background-color: #f5f5f5;
		z-index: 5;
		top: 0;
	}

	.shoppingCart .labelNav .item .iconfont {
		font-size: 25rpx;
		margin-right: 10rpx;
	}

	.shoppingCart .nav {
		width: 100%;
		height: 80rpx;
		background-color: #fff;
		padding: 0 30rpx;
		box-sizing: border-box;
		font-size: 28rpx;
		color: #282828;
		position: fixed;
		left: 0;
		z-index: 5;
		top: 76rpx;
	}

	.shoppingCart .nav .administrate {
		font-size: 26rpx;
		color: #282828;
		width: 110rpx;
		height: 46rpx;
		border-radius: 6rpx;
		border: 1px solid #868686;
	}

	.shoppingCart .noCart {
		margin-top: 20rpx;
		margin-bottom: 20rpx;
		background-color: #fff;
		padding-top: 0.1rpx;
	}

	.shoppingCart .noCart .pictrue {
		width: 414rpx;
		height: 336rpx;
		margin: 78rpx auto 56rpx auto;
	}

	.shoppingCart .noCart .pictrue image {
		width: 100%;
		height: 100%;
	}

	.shoppingCart .list {
		margin-top: 171rpx;
	}

	.shoppingCart .list .item {
		background-color: #fff;
		margin-bottom: 15rpx;

		.store-title {
			display: flex;
			align-items: center;
			width: 100%;
			padding: 0 30rpx;
			height: 85rpx;
			border-bottom: 1px solid #f0f0f0;

			.checkbox {
				width: 60rpx;

				.iconfont {
					font-size: 40rpx;
					color: #CCCCCC;
				}

				.icon-xuanzhong1 {
					color: $theme-color;
				}
			}

			.info {
				flex: 1;
				display: flex;
				align-items: center;

				.iconfont {
					font-size: 36rpx;
				}

				.name {
					margin: 0 0 0 10rpx;
					font-size: 28rpx;
					color: #282828;
					font-weight: bold;
				}

				.icon-xiangyou {
					margin-top: 6rpx;
					font-size: 22rpx;
					color: #999;
				}
			}

			.coupon-btn {
				color: $theme-color;
				font-size: 22rpx;
				width: 100rpx;
				height: 36rpx;
				line-height: 36rpx;
				background: #FFEDEB;
				border-radius: 18rpx;
				text-align: center;
			}
		}
	}

	.shoppingCart .list .item .picTxt {
		width: 100%;
		padding: 25rpx 30rpx;
		position: relative;
		align-items: center;
		border-bottom: 1px solid #f0f0f0;

		.checkbox {
			width: 60rpx;

			.iconfont {
				font-size: 40rpx;
				color: #CCCCCC;
			}

			.icon-xuanzhong1 {
				color: $theme-color;
			}
		}
	}

	.shoppingCart .list .item .picTxt .pictrue {
		width: 160rpx;
		height: 160rpx;
	}

	.shoppingCart .list .item .picTxt .pictrue image {
		width: 100%;
		height: 100%;
		border-radius: 6rpx;
	}

	.shoppingCart .list .item .picTxt .text {
		width: 444rpx;
		margin-left: 20rpx;
		font-size: 28rpx;
		color: #282828;
	}

	.shoppingCart .list .item .picTxt .text .infor {
		font-size: 24rpx;
		color: #868686;
		margin-top: 16rpx;
	}

	.shoppingCart .list .item .picTxt .text .money {
		font-size: 32rpx;
		color: #282828;
		margin-top: 28rpx;
	}

	.shoppingCart .list .item .picTxt .carnum {
		height: 47rpx;
		position: absolute;
		bottom: 30rpx;
		right: 30rpx;
	}

	.shoppingCart .list .item .picTxt .carnum view {
		border: 1rpx solid #a4a4a4;
		width: 66rpx;
		text-align: center;
		height: 100%;
		line-height: 40rpx;
		font-size: 28rpx;
		color: #a4a4a4;
	}

	.shoppingCart .list .item .picTxt .carnum .reduce {
		border-right: 0;
		border-radius: 3rpx 0 0 3rpx;
	}

	.shoppingCart .list .item .picTxt .carnum .reduce.on {
		border-color: #e3e3e3;
		color: #dedede;
	}

	.shoppingCart .list .item .picTxt .carnum .plus {
		border-left: 0;
		border-radius: 0 3rpx 3rpx 0;
	}

	.shoppingCart .list .item .picTxt .carnum .num {
		color: #282828;
	}

	.shoppingCart .invalidGoods {
		background-color: #fff;
	}

	.shoppingCart .invalidGoods .goodsNav {
		width: 100%;
		height: 66rpx;
		padding: 0 30rpx;
		box-sizing: border-box;
		font-size: 28rpx;
		color: #282828;
	}

	.shoppingCart .invalidGoods .goodsNav .iconfont {
		color: #424242;
		font-size: 28rpx;
		margin-right: 17rpx;
	}

	.shoppingCart .invalidGoods .goodsNav .del {
		font-size: 26rpx;
		color: #999;
	}

	.shoppingCart .invalidGoods .goodsNav .del .icon-shanchu1 {
		color: #999;
		font-size: 33rpx;
		vertical-align: -2rpx;
		margin-right: 8rpx;
	}

	.shoppingCart .invalidGoods .goodsList .item {
		padding: 20rpx 30rpx;
		border-top: 1rpx solid #f5f5f5;
	}

	.shoppingCart .invalidGoods .goodsList .item .invalid {
		font-size: 22rpx;
		color: #fff;
		width: 70rpx;
		height: 36rpx;
		background-color: #aaa;
		border-radius: 3rpx;
		text-align: center;
		line-height: 36rpx;
	}

	.shoppingCart .invalidGoods .goodsList .item .pictrue {
		width: 140rpx;
		height: 140rpx;
	}

	.shoppingCart .invalidGoods .goodsList .item .pictrue image {
		width: 100%;
		height: 100%;
		border-radius: 6rpx;
	}

	.shoppingCart .invalidGoods .goodsList .item .text {
		width: 433rpx;
		font-size: 28rpx;
		color: #999;
		height: 140rpx;
	}

	.shoppingCart .invalidGoods .goodsList .item .text .name {
		width: 100%;
	}

	.shoppingCart .invalidGoods .goodsList .item .text .infor {
		font-size: 24rpx;
	}

	.shoppingCart .invalidGoods .goodsList .item .text .end {
		font-size: 26rpx;
		color: #bbb;
	}

	.shoppingCart .footer {
		z-index: 9;
		width: 100%;
		height: 96rpx;
		background-color: #fafafa;
		position: fixed;
		padding: 0 30rpx;
		box-sizing: border-box;
		border-top: 1rpx solid #eee;
		bottom: var(--window-bottom);
	}

	.shoppingCart .footer .checkAll {
		font-size: 28rpx;
		color: #282828;
		margin-left: 16rpx;
	}

	// .shoppingCart .footer checkbox .wx-checkbox-input{background-color:#fafafa;}
	.shoppingCart .footer .money {
		font-size: 30rpx;
	}

	.shoppingCart .footer .placeOrder {
		color: #fff;
		font-size: 30rpx;
		width: 226rpx;
		height: 70rpx;
		border-radius: 50rpx;
		text-align: center;
		line-height: 70rpx;
		margin-left: 22rpx;
	}

	.shoppingCart .footer .button .bnt {
		font-size: 28rpx;
		color: #999;
		border-radius: 50rpx;
		border: 1px solid #999;
		width: 160rpx;
		height: 60rpx;
		text-align: center;
		line-height: 60rpx;
	}

	.shoppingCart .footer .button form~form {
		margin-left: 17rpx;
	}

	.allcheckbox {
		display: flex;
		align-items: center;
		width: 260rpx;

		.iconfont {
			margin-right: 20rpx;
			font-size: 40rpx;
			color: #CCCCCC;
		}

		.icon-xuanzhong1 {
			color: $theme-color;
		}
	}
</style>
<style>
	@supports (bottom: constant(safe-area-inset-bottom)) or (bottom: env(safe-area-inset-bottom)){
	.shoppingCart .footer{
	bottom: calc(var(--window-bottom) + constant(safe-area-inset-bottom));
	bottom: calc(var(--window-bottom) + env(safe-area-inset-bottom));
	}
	}
</style>
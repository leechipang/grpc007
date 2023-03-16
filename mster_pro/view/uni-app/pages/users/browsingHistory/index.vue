<template>
	<view class="page-wrapper history">
		<block v-if="list.length>0">
			<view class="item area-row" :class="{gary :item.product.is_show == 1 &&item.product.status ==1 }" v-for="(item,index) in list" v-if="item.product">
				<view v-if="isEdit" class="checkbox" @click="historyAllCheck(item,index)">
					<text v-if="!item.allCheck" class="iconfont icon-weixuanzhong"></text>
					<text v-else class="iconfont icon-xuanzhong1"></text>
				</view>
				<view class="item item_count"  @click="goPage(item)">
					<image :src="item.product.image" mode=""></image>
					<view class="info">
						<view class="title line2">{{item.product.store_name}}</view>
						<view class="msg">
							<block v-if="item.product.is_show == 1 && item.product.status == 1">
								<view class="price"><text>￥</text>{{item.product.price}}</view>
								<view class="num">已售{{item.product.sales}}件</view>
							</block>
							<block v-else>
								<view class="tips">该商品已下架</view>
								<view class="btn" @click.stop="bindDelete(item,index)">删除</view>
							</block>
						</view>
					</view>
				</view>				
			</view>
		</block>
		<block v-else>
			<emptyPage title="暂无浏览记录~"></emptyPage>
		</block>
		<view class='footer acea-row row-between-wrapper area-edit' v-if="list.length > 0">
			<view class="area-item">
				<view class="allcheckbox" @click.stop="subDel('empty')">														
					<text class="iconfont icon-qingkonghuancun"></text>
					<text class="text">清空</text>
				</view>
			</view>
		
			<view class="area-item">
				<view class="allcheckbox" @click.stop="handleEdit">														
					<text class="iconfont icon-bianji2"></text> 
					<text class="text">编辑</text>
				</view>
			</view>
		</view>
		<view class='footer acea-row row-between-wrapper' v-if="isEdit">
			<view>
				<view class="allcheckbox" @click.stop="checkboxAllChange">
					<text v-if="!isAllSelect" class="iconfont icon-weixuanzhong"></text>
					<text v-else class="iconfont icon-xuanzhong1"></text>
					全选 
				</view>
			</view>

			<view class='button acea-row row-middle'>
				<form @submit="subDel('batch')" report-submit='true'>
					<button class='bnt' formType="submit">删除</button>
				</form>
			</view>
		</view>
	</view>
</template>

<script>
	import emptyPage from '@/components/emptyPage.vue'
	import { historyList, historyDelete, historyBatchDelete } from '@/api/user.js'
	export default{
		components:{
			emptyPage
		},
		data(){
			return {
				list:[],
				isScroll:true,
				page:1,
				limit:10,
				isAllSelect: false,
				isEdit: false,
				allArr: []
			}
		},
		onShow() {
			this.list = [];
			this.allArr = [];
			this.isScroll = true;
			this.page = 1;
			this.getList();
			this.isAllSelect = false; 
			this.isEdit = false;
		},
		methods:{
			getList(){
				if(!this.isScroll) return
				let that = this
				historyList({
					page:that.page,
					limit:that.limit
				}).then(({data})=>{
					data.list.forEach((item, index) => {
						item.allCheck = false
					})
					that.isScroll = data.list.length>=that.limit					
					that.page+=1
					that.list = that.list.concat(data.list)
					// that.checkboxAllChange();
				})
			
			},			
			// 全选
			checkboxAllChange() {
				this.isAllSelect = !this.isAllSelect
				this.cartAllCheck('allCheck')
			},
			handleEdit(){
				this.isEdit = true;
			},
			// 删除
			subDel: function(type) {
				let that = this	
				let type_id
				let content = (type == 'empty') ? '确定清空浏览记录？' : '确定删除浏览记录？'
				if(type == 'batch'){
					type_id = []
					that.list.forEach(el=>{
						if(el.allCheck){
							type_id.push(el.user_visit_id)
						}
					})
				}else{
					type_id = 1
				}
				if(type_id.length == 0 && type == 'batch'){
					return that.$util.Tips({
						title: '请选择记录'
					});
				}else{
					uni.showModal({
					    title: '提示',
					     content: content,
					     success: function (res) {
							if (res.confirm) {							
								historyBatchDelete({
									ids:type_id,						
								}).then(res=>{
									that.allArr = [];
									that.page = 1;
									that.list = [];
									that.isEdit = false;
									that.isScroll = true;
									that.getList();
									return that.$util.Tips({
										title: res.message,
										icon: 'success'
									});							
								}).catch(err => {
									return that.$util.Tips({
										title: err
									});							
								});  
							}else if (res.cancel) {
                                return that.$util.Tips({
                                	title: '已取消'
                                });
                            }							 					     	    				     	 					        
					     }   
					    });                          					
				}
			},
			// 商铺全选
			historyAllCheck(item, index) {
				// 取消
				if (item.allCheck) {
					item.allCheck = false
				} else {
					item.allCheck = true
				}
				this.cartAllCheck('itemCheck')
			},
			// 删除
			bindDelete(item,index){
				historyDelete(item.user_visit_id).then(res=>{
					this.list.splice(index,1)
					uni.showToast({
						title:res.message,
						icon:'none'
					})
				}).catch(error=>{
					uni.showToast({
						title:error,
						icon:'none'
					})
				})
			},
			goPage(item){
				uni.navigateTo({
					url:`/pages/goods_details/index?id=${item.product.product_id}`
				})
			},
			// 全选判断
			cartAllCheck(type) {
				this.allArr = []
				this.list.forEach((el, index) => {					
					if(type == 'allCheck'){						
						el.allCheck = this.isAllSelect						
					}
					if (el.allCheck) this.allArr.push(el)										
				})					
				// 全选
				this.isAllSelect = this.allArr.length == this.list.length ? true : false			
			},
		},			
		onReachBottom() {
			this.getList()
		}
	}
</script>

<style lang="scss">
.page-wrapper{
	margin-bottom: 96rpx;
	.item{
		display: flex;
		position: relative;
		padding:25rpx 20rpx;
		background-color: #fff;
		-webkit-box-align: center;
		-webkit-align-items: center;
		align-items: center;
		width: 100%;
		&.item_count{
			&::after{
				display: none;
			}
		}
		&:after{
			content: ' ';
			position: absolute;
			left: 20rpx;
			right: 0;
			bottom: 0;
			height: 1px;
			background: #f0f0f0;
		}
		image{
			width: 170rpx;
			height: 170rpx;
			border-radius:6rpx;
		}
		.info{
			flex: 1;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			padding: 5rpx 0;
			margin-left: 20rpx;
			.title{
				font-size: 30rpx;
				color: #999;
			}
			.msg{
				display: flex;
				align-items: center;
				justify-content: space-between;
				margin-top: 20rpx;
				.price{
					color: $theme-color;
					font-size: 34rpx;
					text{
						font-size: 26rpx;
					}
				}
				.num{
					font-size: 22rpx;
					color: #AAAAAA;
				}
				.tips{
					font-size: 24rpx;
					color: #AAAAAA;
				}
				.btn{
					display: flex;
					align-items: center;
					justify-content: center;
					width:120rpx;
					height:46rpx;
					border:1px solid #999;
					border-radius:23rpx;
					font-size: 26rpx;
					color: #999;
				}
			}
		}
		&.gary{
			.info .title{
				color: #333;
			}
		}
	}
}
	.history .item .iconfont{
		font-size: 40rpx;
		color: #CCCCCC;
	}
	.history .item .icon-xuanzhong1{
	    color: #E93323;
	}
	.history .footer {
		z-index: 9;
		width: 100%;
		height: 96rpx;
		background-color: #ffffff;
		position: fixed;
		padding: 0 20rpx;
		box-sizing: border-box;
		border-top: 1rpx solid #eee;
		bottom: var(--window-bottom);
	}
	.area-edit{
		justify-content: center;

		.area-item{
			width: 50%;
			text-align: center;
			position: relative;	
			align-items: center;
			color: #333333;
			.text{
				position: relative;
				top: -1px;
			}
			.iconfont{
				color: #333333;
			}
			&:nth-child(1){
				&::after{
					content: '';
					display: inline-block;
					width: 2rpx;
					height: 42rpx;
					background: #CCCCCC;
					position: absolute;
					top: 0;
					right: 0;
				}
			}
		}
	}
	.history .footer .checkAll {
		font-size: 28rpx;
		color: #282828;
		margin-left: 16rpx;
	}
	.allcheckbox .iconfont{
	    margin-right: 11px;
	    font-size: 40rpx;
	    color: #cccccc;
	}
	.allcheckbox .icon-xuanzhong1{
	    color: #E93323;
	}
	.history .footer .button .bnt {
		font-size: 28rpx;
		color: #999;
		border-radius: 50rpx;
		border: 1px solid #999;
		width: 160rpx;
		height: 60rpx;
		text-align: center;
		line-height: 60rpx;
	}
</style>

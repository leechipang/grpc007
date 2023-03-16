<template>
	<view>
		<view class='poster-poster' v-if="posterStatus">
			<view class='poster-pop'>
				<image src='../../../static/images/poster-close.png' class='close' @click="posterImageClose"></image>
				<view class="user-code">
					<image class="canvas" :style="{width:wd+'px', height:hg+'px'}" :src="posterImage" v-if="posterImage"></image>
					<canvas class="canvas" :style="{width:wd+'px',height:hg+'px'}" canvas-id="myCanvas" v-else></canvas>
				</view>
				<!-- #ifndef H5  -->
				<view v-if="posterImage" class='save-poster' @click="savePosterPath(posterImage)">保存到手机</view>
				<!-- #endif -->
				<!-- #ifdef H5 -->
				<view v-if="posterImage" class="keep">长按图片可以保存到手机</view>
				<!-- #endif -->
			</view>
		</view>
		<view class='mask' v-if="posterImage"></view>
	</view>
</template>

<script>
	import {
		imgToBase
	} from '@/api/user.js';
	export default {
		data() {
			return {
				wd: 225,
				hg: 357,
				posterImage: "",
				posterBag: '../static/images/poster-bag.png',
			}
		},
		props: {
			picData: {
				type: Object
			},
			posterStatus: {
				type: Boolean,
				default: false
			}
		},
		watch: {
			posterStatus(data) {
				if (data) {
					this.posterShow()
				}
			},
		},
		onLoad() {

		},
		methods: {
			async posterShow() {
				uni.showLoading({
					title: '海报生成中',
					mask: true
				});
				console.log(this.picData)
				let arr, bag_pic, goods_img, mp_code
				goods_img = await this.imgToBase(this.picData.goodsPic)
				mp_code = await this.imgToBase(this.picData.codePic)
				console.log(goods_img,mp_code)
				// #ifdef H5
				arr = [this.posterBag, goods_img, mp_code]
				// #endif

				// #ifdef MP
				arr = [this.posterBag, await this.downloadFilestoreImage(this.picData.goodsPic), await this.downloadFilestoreImage(
					this.picData.codePic)]
				// #endif
				this.bargainPosterCanvas(arr, this.picData.title, this.picData.label, this.picData.msg, this.picData.price,
					this.wd,
					this.hg,
					(tempFilePath) => {
						this.posterImage = tempFilePath
					});
			},
			async imgToBase(url) {
				let res = await imgToBase({
					image: url
				})
				return res.data.image
			},
			savePosterPath(url) {
				let that = this;
				uni.getSetting({
					success(res) {
						if (!res.authSetting['scope.writePhotosAlbum']) {
							uni.authorize({
								scope: 'scope.writePhotosAlbum',
								success() {
									uni.saveImageToPhotosAlbum({
										filePath: url,
										success: function(res) {
											that.$util.Tips({
												title: '保存成功',
												icon: 'success'
											});
										},
										fail: function(res) {
											that.$util.Tips({
												title: '保存失败'
											});
										}
									});
								}
							});
						} else {
							uni.saveImageToPhotosAlbum({
								filePath: url,
								success: function(res) {
									that.$util.Tips({
										title: '保存成功',
										icon: 'success'
									});
								},
								fail: function(res) {
									that.$util.Tips({
										title: '保存失败'
									});
								}
							});
						}
					}
				});
			},
			posterImageClose() {
				this.$emit('update:posterStatus', false)
				this.posterImage = ""
			},
			//图片转符合安全域名路径
			downloadFilestoreImage(url) {
				return new Promise((resolve, reject) => {
					let that = this;
					uni.downloadFile({
						url: url,
						success: function(res) {
							resolve(res.tempFilePath);
						},
						fail: function() {
							return that.$util.Tips({
								title: ''
							});
						}
					});
				})
			},
			bargainPosterCanvas(arr2, title, label, msg, price, wd, hg, successFn) {
				let that = this;
				const ctx = uni.createCanvasContext('myCanvas', this);
				ctx.clearRect(0, 0, 0, 0);
				/**
				 * 只能获取合法域名下的图片信息,本地调试无法获取
				 * 
				 */
				ctx.fillStyle = '#ccc';
				ctx.fillRect(0, 0, wd, hg);
				uni.getImageInfo({
					src: arr2[0],
					success: (res) => {
						console.log(arr2)
						const WIDTH = res.width;
						const HEIGHT = res.height;
						console.log(wd, hg)
						ctx.drawImage(arr2[0], 0, 0, wd, hg);

						// 保证在不同机型对应坐标准确
						let labelx = 0.6656 //标签x
						let labely = 0.167 //标签y
						let pricex = 0.1847 //价格x
						let pricey = 0.175 //价格y
						let codex = 0.385 //二维码
						let codey = 0.77
						let picturex = 0.1571 //商品图左上点
						let picturey = 0.2916
						let picturebx = 0.6857 //商品图右下点
						let pictureby = 0.3916
						let msgx = 0.1036 //msg
						let msgy = 0.2306
						ctx.drawImage(arr2[1], wd * picturex, hg * picturey, wd * picturebx, hg * pictureby);
						ctx.save();
						ctx.drawImage(arr2[2], wd * codex, hg * codey, 55, 55);
						ctx.save();
						//标题
						const CONTENT_ROW_LENGTH = 25;
						let [contentLeng, contentArray, contentRows] = that.textByteLength(title, CONTENT_ROW_LENGTH);
						if (contentRows > 2) {
							contentRows = 2;
							let textArray = contentArray.slice(0, 2);
							textArray[textArray.length - 1] += '…';
							contentArray = textArray;
						}
						ctx.setTextAlign('left');
						ctx.setFillStyle('#000');
						if (contentArray.length < 2) {
							ctx.setFontSize(16);
						} else {
							ctx.setFontSize(14);
						}
						let contentHh = 3;
						console.log('222')
						for (let m = 0; m < contentArray.length; m++) {
							if (m) {
								ctx.fillText(contentArray[m], 20, 25 + contentHh * m + 13, 1100);
							} else {
								ctx.fillText(contentArray[m], 20, 25, 1100);
							}
						}
						// 标签内容
						ctx.setTextAlign('left')
						ctx.setFontSize(10);
						ctx.setFillStyle('#FFF');
						ctx.fillText(label, wd * labelx, hg * labely);
						ctx.save();
						// 价格
						ctx.setFillStyle('red');
						// ctx.setFontSize(16);
						ctx.font = "bold 18px Arial";
						ctx.fillText(price, wd * pricex, hg * pricey);
						ctx.save();
						// msg
						ctx.setFontSize(8);
						ctx.setFillStyle('#3F3F3F');
						ctx.fillText(msg, wd * msgx, hg * msgy);
						ctx.save();
						ctx.draw(true, () => {
							uni.canvasToTempFilePath({
								canvasId: 'myCanvas',
								fileType: 'png',
								quality: 1,
								success: (res) => {
									console.log(res)
									successFn && successFn(res.tempFilePath);
									uni.hideLoading();
								}
							}, this)
						});
					},
					fail: function(err) {
						console.log(err)
						uni.hideLoading();
						that.Tips({
							title: '无法获取图片信息'
						});
					}
				})
			},
			textByteLength(text, num) {
				let strLength = 0;
				let rows = 1;
				let str = 0;
				let arr = [];
				for (let j = 0; j < text.length; j++) {
					if (text.charCodeAt(j) > 255) {
						strLength += 2;
						if (strLength > rows * num) {
							strLength++;
							arr.push(text.slice(str, j));
							str = j;
							rows++;
						}
					} else {
						strLength++;
						if (strLength > rows * num) {
							arr.push(text.slice(str, j));
							str = j;
							rows++;
						}
					}
				}
				arr.push(text.slice(str, text.length));
				return [strLength, arr, rows] //  [处理文字的总字节长度，每行显示内容的数组，行数]
			},
		}
	}
</script>

<style>
	.poster-poster {
		width: 100%;
		height: 100%;
		width: 450rpx;
		height: 714rpx;
	}

	.poster-pop {
		position: fixed;
		left: 50%;
		transform: translateX(-50%);
		top: 50%;
		margin: 0 auto;
		margin-top: -357rpx;
		z-index: 999;
	}

	.poster-pop image {
		width: 100%;
		height: 100%;
		display: block;
	}

	.poster-pop .close {
		width: 46rpx;
		height: 75rpx;
		position: fixed;
		right: 0;
		top: -73rpx;
		display: block;
		z-index: 3999;
	}

	.poster-pop .save-poster {
		background-color: #df2d0a;
		font-size: ：22rpx;
		color: #fff;
		text-align: center;
		height: 76rpx;
		line-height: 76rpx;
		width: 100%;
		margin-top: 20rpx;
	}

	.poster-pop .keep {
		color: #fff;
		text-align: center;
		font-size: 25rpx;
		margin-top: 10rpx;
	}

	.mask {
		z-index: 300 !important;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: rgba(0, 0, 0, 0.6);
		z-index: 9;
	}
</style>

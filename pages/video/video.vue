<template>
	<!-- 视频心情卡 -->
	<view class="video">
		<!-- 头像和关注 -->
		<!-- <view class='justify-content-between headPortrait'>
			<view class="flex">
				<image src="../../static/logo.png" mode=""></image>
				<view>AAAA</view>
			</view>
			<view class="focus">关注</view>
		</view> -->
		<!-- 视频 -->
		<!-- <video :style="{ height: scrollH }":src="videoPath" :poster="poster" auto-pause-if-navigate="true" auto-pause-if-open-native="true" autoplay="true"
		 controls="true" enable-play-gesture="true" enable-progress-gesture="true" loop="true"></video> -->
		<video style="position: fixed; left:0;bottom: 0upx;right:0;margin:0 auto; width: 100%; height: 100%;" class="cuIcon-videofill"
		 :src="videoPath" :poster="poster" auto-pause-if-navigate="true" auto-pause-if-open-native="true" autoplay="true"
		 controls="true" enable-play-gesture="true" enable-progress-gesture="true" loop="true"></video>

		<!-- 描述 -->
		<view class="describe">
			<span style="font-weight:700 ; margin-right: 15rpx;">{{title}}</span>
			{{content}}
		</view>

		<!-- <view class="openAPP flex" :style="{ bottom: bottom }">
			<image src="../../static/blackHere.png" mode=""></image>
			<view>APP内打开</view>
		</view> -->
		<button open-type="launchApp" :app-parameter="wechat" @error="launchAppError" class="openAPP flex videoOpen" :style="{ bottom: bottom }" v-if="isApp"
		 >
			<image src="../../static/blackHere.png" mode=""></image>
			<view>APP内打开</view>
		</button>
		<uni-popup ref="login" type="center" :custom="true" :maskClick="false">

			<view class="loginCon" :style="{ height: scrollH+'px' }">
				<view class="con">
					<view class="top">允许微信授权</view>
					<view class="middle">使用微信登录，发现身边精彩</view>
					<image src="../../static/h.png" mode=""></image>
					<button open-type="getUserInfo" @getuserinfo="getuserinfo" :disabled="isDisabled">授权</button>
				</view>
			</view>
		</uni-popup>
		<uni-popup ref="popup" type="center" :custom="true" :maskClick="false">
		
			<view class="content">
				<image src="../../static/h.png" mode=""></image>
				<view class="content_">还没拥有Here? {{isIOS?'AppStore':'应用市场'}}搜索“here” 即刻发现身边的精彩吧</view>
		
				<view class="click">
					<view class="cancel" @tap="close">取消</view>
					<view class="comfirm" @tap="know">知道了</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	export default {
		onLoad(e) {
			let bodys = uni.getSystemInfoSync();
			this.scrollH = bodys.windowHeight;
			// this.bottom = this.scrollH * 0.05 + 'px';
			this.bottom = "150rpx;";
			this.cardId = e.id
			this.shop = e.shop || ''
			if (this.shop == 1) {
				if (!uni.getStorageSync('userInfo').token) {
					// this.$refs.login.open();
					this.getDetails()
				} else {
					this.token = uni.getStorageSync('userInfo').token
					this.userId = uni.getStorageSync('userInfo').userId
					this.getDetails()
				}
			} else {
				// app跳转
				this.isApp = true
				this.wechat = 'id=' + e.id + '&type=A' + '&isvideo=1'
				// this.cardId = e.id
				if (!uni.getStorageSync('userInfo').token) {
					// this.$refs.login.open();
					this.getDetails()
				} else {
					this.token = uni.getStorageSync('userInfo').token
					this.userId = uni.getStorageSync('userInfo').userId
					this.getDetails()
				}

			}
			// this.token = uni.getStorageSync('userInfo').token||e.token
			// this.userId = e.userId 
			// this.cardId = e.cardId


		},
		onReady() {

			// this.scrollH = this.scrollH*0.8+ 'px';
		},
		onShareAppMessage() {
			return {
				title: this.title || this.content,
				path:'/pages/video/video?id='+this.cardId +'&shop=1',
				withShareMenu: true,
				imageUrl: this.cardUrl,
			}
			// wx.showShareMenu({

			// success: (e)=> {
			// 	console.log(this.content)
			// 	console.log(this.cardUrl)
			// },
			// fail:()=> {}
			// })
		},
		data() {
			return {
				isApp: false,
				shop: '',
				videoPath: '',
				poster: '',
				scrollH: 0,
				bottom: 0,
				title: "adgdfg",
				content: "",
				cardId: '',
				userId: '', //登录人ID
				userIdBeLook: '', //被查看人ID
				isDisabled: false,
				isAttention: '',
				nickname: '',
				portrait: '',
				topicId: '', //官方活动ID
				cardUrl: '',
				wechat:'',
				isIOS: false
			};
		},
		methods: {
			launchAppError(e) {
				console.log(e)
				if (e.type == "error") {
					if(uni.getSystemInfoSync().system.includes('iOS')){
						this.isIOS = true
					}
					this.$refs.popup.open();
				}
			},
			know(){
				this.$refs.popup.close();
				// if(uni.getSystemInfoSync().system.includes('iOS')){
				// 	this.$refs.popup.close();
				// }else{
				// 	uni.navigateTo({
				// 		url: '../webview/webview'
				// 	})
				// }
				
			},
			close() {
				this.$refs.popup.close();
			},
			getDetails() {
				uni.showLoading({
					title: '加载中'
				});
				let data = {
					userId: this.userId,
					cardId: this.cardId
				}
				this.$http.post(this.$api.cardInfo, {
					data: data,
					header: {
						'content-type': 'application/json;charset=UTF-8',
						'token': this.token
					}
				}).then(res => {
					if (res.data.code == 0) {
						uni.hideLoading()
						this.poster = res.data['data']['cardUrl'].replace('http://wykj-here.oss-cn-hangzhou.aliyuncs.com/',
							'https://wykj-here.oss-cn-hangzhou.aliyuncs.com/');
						this.videoPath = res.data['data']['resList'][0]['resUrl'].replace(
							'http://wykj-here.oss-cn-hangzhou.aliyuncs.com/', 'https://wykj-here.oss-cn-hangzhou.aliyuncs.com/');;
						this.title = res.data['data']['cardTitle'];
						this.content = res.data['data']['cardContent'];
						this.cardUrl = res.data['data']['cardUrl'];
						if (res.data.data.cardUrlSpec < 0) {

						}
						// console.log(res.data.data.cardUrl)
						// uni.getImageInfo({
						// 	src: res.data.data.cardUrl,
						// 	success(e) {
						// 		console.log(e)
						// 	}
						// })
					} else if (res.data.code == 403) {
						uni.hideLoading()
						uni.clearStorageSync();
						uni.reLaunch({
							url: '../login/login'
						})
						let data = {
							type: 'A',
							id: this.cardId,
							isvideo: 1,
							shop: this.shop || ''
						}
						uni.setStorageSync('data', data)
					} else {
						this.toast(res.data.msg)
					}

				})
			},
			open: function(e) {
				// let ua = navigator.userAgent.toLowerCase();
				var url = 'here://here_splash/splash?type=A&id=' + e + '&isvideo=1';
				var load = 'https://a.app.qq.com/o/simple.jsp?pkgname=com.wenyi.here';
				// if(this.isAndroid(ua)) {
				// 	url = 'here://here_splash/splash?type=A&id=' + e + '&isvideo=1';
				// 	load = load + '&android_schema=' + encodeURIComponent(url);
				// } else {
				// 	url = 'hereapp920://?type=A&id=' + e + '&isvideo=1';
				// 	load = load + '&ios_scheme=' + encodeURIComponent(url);
				// }
				if (uni.getSystemInfoSync().system.includes('Android')) {
					url = 'here://here_splash/splash?type=A&id=' + e + '&isvideo=1';
					load = load + '&android_schema=' + encodeURIComponent(url);
				} else {
					url = 'hereapp920://?type=A&id=' + e + '&isvideo=1';
					load = load + '&ios_scheme=' + encodeURIComponent(url);
				}
				//  switch(uni.getSystemInfoSync().platform){
				//     case 'android':

				//        console.log('运行Android上')

				//        break;

				//     case 'ios':

				//        console.log('运行iOS上')

				//        break;

				//     default:

				//        console.log('运行在开发者工具上')

				//        break;

				// }
				// if(this.isWeixinBrowser(ua)) {
				// 	// this.$refs.popup.open();
				// 	// this.openOther(load);
				// } else {
				// 	// window.location = url;
				// 	// let loadDateTime = Date.now();
				// 	// let turn = setTimeout(function(){
				// 	//     let timeOutDateTime = Date.now();
				// 	//     if ((timeOutDateTime - loadDateTime) < 1000 ){
				// 	//         this.openOther(load);
				// 	//     }
				// 	// },600);
				// }
			},
			getuserinfo(e) {
				if (this.isDisabled) return
				this.isDisabled = true
				if (e.detail.userInfo) {
					// console.log(e)
					var obj = {
						// iv:e.detail.iv,
						// encryptedData:e.detail.encryptedData
						sex: e.detail.userInfo.gender,
						nickname: e.detail.userInfo.nickName,
						portrait: e.detail.userInfo.avatarUrl
					}
					// return
					this.mixclickLogin(obj)
				} else {
					uni.showToast({
						icon: 'none',
						title: '同意授权后可登录'
					});
					this.isDisabled = false
				}
			},
			//获取用户信息
			mixclickLogin(obj) {
				uni.showLoading({
					title: '登录中，请稍等'
				})
				wx.login({
					success: (res) => {
						if (res.code) {
							// uni.switchTab({
							// 	url: '../index/index'
							// })
							let params = {
								code: res.code,
								appid: 'wx3cccf63d0819e7b1',
								secret: '5c7ce3acccc34766de79e779082a63a3'
							}
							// params = JSON.stringify(params);
							this.$http.post(this.$api.getOpenid, {
								data: params,
								header: {
									'content-type': 'application/json;charset=UTF-8',
								}
							}).then(e => {
								if (e.data.code == 0) {
									// if (!e.data.data.unionid) {
									// 	uni.showToast({
									// 		title: '微信授权失败',
									// 		duration: 2000,
									// 		icon: 'none'
									// 	});
									// 	this.isDisabled = false
									// 	return
									// }
									this.mixsendUnionidLogin(e.data.data.unionid, e.data.data.openid, obj)
								} else {
									this.isDisabled = false
									this.toast(e.data.msg)
								}
							})
						} else {
							this.isDisabled = false
							uni.showToast({
								title: res.errMsg,
								duration: 2000,
								icon: 'none'
							});
						}
					}
				})
			},
			//本地unionid登陆
			mixsendUnionidLogin(unionid, openid, obj) {
				let params = {
					thrAccount: openid,
					// thrAccount: unionid,
					thrType: '3',
					sex: obj.sex,
					nickname: obj.nickname,
					portrait: obj.portrait
				}
				uni.showLoading({
					title: '登录中...'
				});
				this.$http.post(this.$api.loginWechat, {
					data: params,
					header: {
						'content-type': 'application/json;charset=UTF-8',
					}
				}).then(res => {
					if (res.data.code == 0) {
						this.token = res.data.data.token
						uni.hideLoading()
						let userInfo = {
							userId: res.data.data.userId,
							mobile: res.data.data.mobile,
							sex: res.data.data.sex,
							token: res.data.data.token,
							nickname: res.data.data.nickname,
							portrait: res.data.data.portrait

						}
						this.userId = res.data.data.userId
						this.token = res.data.data.token
						uni.setStorageSync('userInfo', userInfo)
						this.getDetails()
						this.$refs.login.close();
						// this.isDisabled = false
					} else {
						this.toast(e.data.msg);
						this.isDisabled = false
					}
				})
			},
		}
	}
</script>

<style lang="less" scoped>
	.video {
		width: 750rpx;
		box-sizing: border-box;

		video {
			width: 100%;
		}

		.headPortrait {
			width: 100%;
			position: fixed;
			top: 20rpx;
			padding: 0 34rpx;
			box-sizing: border-box;
			z-index: 9999;

			.flex {
				align-items: center;

				image {
					width: 84rpx;
					height: 84rpx;
					border-radius: 50%;
				}

				view {

					font-size: 30rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #FFFFFF;
					margin-left: 15rpx;

				}
			}

			.focus {
				width: 106rpx;
				height: 51rpx;
				border: 1rpx solid rgba(255, 255, 255, 1);
				border-radius: 10rpx;
				color: rgba(255, 255, 255, 1);
				font-size: 24rpx;
				text-align: center;
				line-height: 51rpx;

			}
		}

		.describe {
			position: fixed;
			bottom: 20rpx;
			margin-top: 15rpx;
			padding: 0 34rpx;
			box-sizing: border-box;
			font-size: 30rpx;
			font-family: PingFang SC;
			font-weight: 400;
			padding-bottom: 30rpx;
			box-sizing: border-box;
			color: #FFFFFF;
			z-index: 9999;
		}
		.videoOpen{
			bottom: 150rpx;
		}

		uni-popup {
			.loginCon {
				width: 750rpx;
				background: #333333;
				overflow: hidden;

				view {
					line-height: 1;
				}

				.con {
					margin-top: 350rpx;
					margin-left: 85rpx;
					width: 580rpx;
					background: #FFFFFF;
					border-radius: 20rpx;
					overflow: hidden;

					.top {
						text-align: center;
						margin-top: 60rpx;
						font-size: 36rpx;
						font-family: PingFang SC;
						font-weight: 600;
						color: #000000;
					}

					.middle {
						margin-top: 38rpx;
						text-align: center;
						font-size: 24rpx;
						font-family: PingFang SC;
						font-weight: 600;
						color: #999999;
					}

					image {
						width: 155rpx;
						height: 155rpx;
						margin: 83rpx 0 0 214rpx;
					}

					button {
						margin-top: 85rpx;
						width: 100%;
						background: #FDD10A;
						height: 100rpx;
						line-height: 100rpx;
						text-align: center;
						font-size: 34rpx;
						font-family: PingFang SC;
						font-weight: 600;
						color: #343434;


					}
				}
			}
		}
		uni-popup {
			.content {
				background: rgba(255, 255, 255, 1);
				padding-top: 34rpx;
				width: 480rpx;
				border-radius: 30upx;
				box-sizing: border-box;
				display: flex;
				flex-direction: column;
		
				image {
					width: 120rpx;
					height: 120rpx;
					margin-left: 180rpx;
				}
		
				.content_ {
					margin: 45rpx 0 53rpx 110rpx;
					
					text-align: center;
					width: 285rpx;
					font-size: 26rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #666666;
				}
		
				.click {
					display: flex;
					border-top: 1rpx solid #dedede;
		
					>view {
						font-size: 30upx;
						flex: 1;
						text-align: center;
						padding: 25rpx 0;
					}
		
					.cancel {
						border-right: 1rpx solid #dedede;
					}
		
					.comfirm {
						color: rgba(92, 146, 225, 1);
					}
				}
			}
			.loginCon{
				width: 750rpx;
				background: #333333;
				overflow: hidden;
				view{
					line-height: 1;
				}
				.con{
					margin-top: 350rpx;
					margin-left: 85rpx;
					width: 580rpx;
					background: #FFFFFF;
					border-radius: 20rpx;
					overflow: hidden;
					.top{
						text-align: center;
						margin-top: 60rpx;
						font-size: 36rpx;
						font-family: PingFang SC;
						font-weight: 600;
						color: #000000;
					}
					.middle{
						margin-top: 38rpx;
						text-align: center;
						font-size: 24rpx;
						font-family: PingFang SC;
						font-weight: 600;
						color: #999999;
					}
					image{
						width: 155rpx;
						height: 155rpx;
						margin: 83rpx 0 0 214rpx;
					}
					button{
						margin-top: 85rpx;
						width: 100%;
						background: #FDD10A;
						height: 100rpx;
						line-height: 100rpx;
						text-align: center;
						font-size: 34rpx;
						font-family: PingFang SC;
						font-weight: 600;
						color: #343434;
						
						
					}
				}
			}
		}
	}
</style>

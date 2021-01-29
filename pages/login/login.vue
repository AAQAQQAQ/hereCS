<template>
	<view class="login">
		<!-- 授权微信或者手机号 -->
		<view class="coverage">
			<image src="../../static/loginLogo.png" mode="" class="logo"></image>
			<button class="weChat" :disabled="isDisabled" open-type="getUserInfo" @getuserinfo="getuserinfo">微信登录</button>
			<view class="phone" @tap="switchIndex">取消</view>
			<!-- <view class="phone" @tap="phoneLogin">已有账号，手机号登录</view>
			 -->
		</view>
	</view>
</template>

<script>
	export default {
		onLoad() {
			// console.log(uni.getStorageSync('data'))
			// wx.hideHomeButton()
		},
		onReady() {
			let bodys = uni.getSystemInfoSync();
			this.scrollH = bodys.windowHeight;
		},
		data() {
			return {
				isDisabled:false,
				scrollH:0,
			};
		},
		methods:{
			switchIndex(){
				uni.switchTab({
					url:'../index/index'
				})
			},
			phoneLogin(){
				if(this.isDisabled) return 
					uni.navigateTo({
						url: '../phoneLogin/phoneLogin'
					})
				
			},
			getuserinfo(e) {
				if(this.isDisabled) return
				this.isDisabled = true
				if (e.detail.userInfo) {
					// console.log(e)
					var obj={
						// iv:e.detail.iv,
						// encryptedData:e.detail.encryptedData
						sex:e.detail.userInfo.gender,
						nickname: e.detail.userInfo.nickName,
						portrait: e.detail.userInfo.avatarUrl
					}
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
					success:(res)=> {
						if (res.code) {
							// uni.switchTab({
							// 	url: '../index/index'
							// })
							let params = {
								code: res.code,
								// 小程序自己的
								appid: 'wx3cccf63d0819e7b1',
								secret: '5c7ce3acccc34766de79e779082a63a3'
								// app一致
								// appid: 'wx9e35cf9cc84b8e87',
								// secret: '46aae2f15b0aa235c911fbc1db29da36'
							}
							// params = JSON.stringify(params);
							this.$http.post(this.$api.getOpenid, {
								data: params,
								header: {
									'content-type': 'application/json;charset=UTF-8',
								}
							}).then(e => {
								if (e.data.code == 0) {
									// if(!e.data.data.unionid){
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
					if(res.data.code == 0){
						uni.hideLoading()
						let userInfo = {
							userId: res.data.data.userId,
							mobile: res.data.data.mobile,
							sex: res.data.data.sex,
							token: res.data.data.token,
							nickname: res.data.data.nickname,
							portrait: res.data.data.portrait
							
						}
						uni.setStorageSync('userInfo', userInfo)
						if(uni.getStorageSync('data').type == 'D'||uni.getStorageSync('data').type == 'C'){
							let type = uni.getStorageSync('data').type
							let id = uni.getStorageSync('data').id
							let shop = uni.getStorageSync('data').shop ||''
							uni.reLaunch({
								url:'../home/home?type='+type+'&id='+id+'&shop='+shop
							})
							uni.removeStorageSync('data');
						}else if(uni.getStorageSync('data').type == 'A'){
							let id = uni.getStorageSync('data').id 
							 let isvideo = uni.getStorageSync('data').isvideo 
							 let shop = uni.getStorageSync('data').shop ||''
							if(isvideo == 0){
								uni.reLaunch({
									url:'../mood/mood?id='+id+'&shop='+shop
								})
							}else if(isvideo == 1){
								uni.reLaunch({
									url:'../video/video?id='+id+'&shop='+shop
								})
							}
							uni.removeStorageSync('data');
						}else if(uni.getStorageSync('data').type == 'G'){
							let id = uni.getStorageSync('data').id 
							uni.navigateTo({
								url:'../officialActivity/officialActivity?id='+id
							})
							uni.removeStorageSync('data');
						}else{
							uni.switchTab({
								url: '../index/index'
							})
						}
						
						// this.isDisabled = false
					}else{
						this.toast(e.data.msg);
						this.isDisabled = false
					}
				})
			},
		}
	}
</script>

<style lang="less" scoped>
.login{
	width: 750rpx;
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
	.coverage{
		.logo{
			margin: 89rpx 0 0 224rpx;
			width: 342rpx;
			height: 358rpx;
		}
		.weChat{
			margin: 82rpx 0 0 95rpx;
			width: 560rpx;
			height: 92rpx;
			background: #000000;
			border-radius: 46rpx;
			line-height: 92rpx;
			text-align: center;
			font-size: 36rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #FFFFFF;
		}
		.phone{
			margin: 42rpx 0 0 95rpx;
			width: 558rpx;
			height: 92rpx;
			line-height: 92rpx;
			text-align: center;
			border: 2rpx solid #E6E6E6;
			border-radius: 46rpx;
			font-size: 36rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #010101;
		}
	}
	
	
}
</style>

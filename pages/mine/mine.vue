<template>
	<view class="mine_con">
			<button open-type="getUserInfo" @getuserinfo="getuserinfo" :disabled="isDisabled">
				<view class="avator flex">
					<image :src="portrait||avatorMoren" mode=""></image>
					<view>
						{{nickname||'登录/注册'}}
					</view>
				</view>
			</button>
		</view>
</template>

<script>
	export default {
		onShow() {
			this.token = uni.getStorageSync('userInfo').token
			this.nickname = uni.getStorageSync('userInfo').nickname || uni.getStorageSync('userInfo').mobile||''
			this.portrait = uni.getStorageSync('userInfo').portrait||''
		},
		data() {
			return {
				token:'',
				nickname: '',
				portrait: '',
				avatorMoren: '../../static/touxiang.png',
				isDisabled: false
			};
		},
		methods:{
			out(){
				uni.removeStorageSync('userInfo');
				uni.removeStorageSync('login');
				// uni.reLaunch({
				// 	url:'../login/login'
				// })
				this.token = ''
				this.nickname = ''
				this.portrait = ''
				this.isDisabled = false
				
			},
			getphonenumber(e){
				console.log(e)
			},
			getuserinfo(e) {
				if(this.isDisabled||this.token) return
				this.isDisabled = true
				if (e.detail.userInfo) {
					var obj={
						// iv:e.detail.iv,
						// encryptedData:e.detail.encryptedData
						sex:e.detail.userInfo.gender,
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
					success:(res)=> {
						if (res.code) {
							// uni.switchTab({
							// 	url: '../index/index'
							// })
							let params = {
								code: res.code,
								appid: 'wx3cccf63d0819e7b1',
								secret: '5c7ce3acccc34766de79e779082a63a3'
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
									console.log(e)
									// if(!e.data.data.unionid){
									// 	uni.showToast({
									// 		title: '微信授权失败，请使用手机号码登录',
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
						uni.setStorageSync('login','login-ok')
							uni.switchTab({
								url: '../index/index'
							})
						
						// this.isDisabled = true
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
	.mine_con {
			width: 750rpx;
			button::after {
			  border: none;
			}
			button {
			  background-color: #fff;
			}
	
			.avator {
				border-top: 2rpx solid #E8E8E8;
				padding: 42rpx 0 36rpx 36rpx;
				box-sizing: border-box;
				align-items: center;
	
				image {
					width: 130rpx;
					height: 130rpx;
					border-radius: 50%;
				}
	
				view {
					margin-left: 28rpx;
					font-size: 32rpx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #343434;
				}
			}
	
		}
</style>

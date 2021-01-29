<template>
	<view>
		<view class="phoneLogin">
			<!-- 手机号码 -->
			<view class="phoneNumber">
				<view class="tit flex">
					<image src="../../static/shouji.png" mode=""></image>
					<view>手机号码</view>
				</view>
				<view class="input flex">
					<view class="prefix">+86</view>
					<input type="number" v-model="phone" placeholder="请输入您的手机号" maxlength="11" placeholder-style="color: #CCCCCC" />
				</view>

			</view>
			<!-- 密码 验证码 -->
			<view class="phoneNumber" style="margin-top: 37rpx;">
				<view class="tit flex">
					<image src="../../static/renzheng.png" mode="" class="renzhneg"></image>
					<view v-if="showCode">验证码</view>
					<view v-if="!showCode">登录密码</view>
				</view>
				<view class="input justify-content-between">
					<!--  -->
					<input :type="showCode?'number':'password'" value="" :maxlength="showCode?'4':'12'" :placeholder="showCode?'请输入4位验证码':'请输入密码'"
					 style="margin-left: 0; width:300rpx" v-model="number" />
					<!-- <m-input type="password" displayable v-model="password" placeholder="请输入密码"></m-input> -->
					<view class="getCode" v-if="showCode" @tap="getsms">{{codeMsg}}</view>
				</view>

			</view>
			<view class="type justify-content-between">
				<view v-if="!showCode" @tap="changeType">验证码登录</view>
				<view v-if="showCode" @tap="changeType">密码登录</view>
				<view v-if="!showCode" @tap="to">找回密码</view>
			</view>
			<view class="next" :class="(phone&&number)?'black':''" @tap="login">登录</view>
			<!-- <view class="next" v-show="showCode">登录</view> -->
		</view>
	</view>
</template>

<script>
	import {
		checkPhone
	} from '@/common/tools';
	// import md5 from 'js-md5';
	import md5 from '@/common/md5';
	let t = null;
	export default {
		data() {
			return {
				showCode: false, //默认是手机密码登录
				phone: '',
				number: '',
				codeMsg: '获取验证码',
				codeDisabled: false ,//倒计时结束后才能重新发
			};
		},
		methods: {
			changeType() {
				if (this.codeDisabled) return
				this.showCode = !this.showCode
				this.number = ''
			},
			// 获取验证码
			getsms() {
				if (this.phone == '') {
					this.toast('手机号不能为空')
					return
				}
				if (!checkPhone(this.phone)) return;
				if (this.codeDisabled) return
				this.codeDisabled = true
				let time = 60;
				let params = {
					mobile: this.phone,
					type: '3'
				}
				uni.showLoading({
					title: '接收中'
				});
				this.$http
					.post(this.$api.getLoginSms, {
						data: params,
						header: {
							'content-type': 'application/json;charset=UTF-8',
						}
					})
					.then(res => {
						if (res.data.code == 0) {
							this.toast('发送成功');
							t = setInterval(() => {
								time--;
								this.codeMsg = time + '秒';
								if (time  == 0) {
									this.codeMsg = '重新获取';
									this.codeDisabled = false;
									clearInterval(t);
								}
							}, 1000);
						} else {
							this.toast(res.data.msg);
							this.codeDisabled = false;
						}
					});
			},
			// 登录
			login() {
				if(!this.phone||!this.number) return
				uni.showLoading({
					title: '登录中'
				});
				if (!this.showCode) {
					// 密码登录
					let p = {
						mobile: this.phone,
						passwords : md5.md5(this.number).toUpperCase()
					}
					
					this.$http.post(this.$api.loginForPasswords,{
						data: p ,
						header: {
							'content-type': 'application/json;charset=UTF-8',
						}
					}).then(e=>{
						if(e.data.code == 0){
							uni.hideLoading()
							let userInfo = {
								userId: e.data.data.userId,
								mobile: e.data.data.mobile,
								sex: e.data.data.sex,
								token: e.data.data.token,
								nickname: e.data.data.nickname,
								portrait: e.data.data.portrait
							}
							uni.setStorageSync('userInfo', userInfo)
								uni.switchTab({
									url: '../index/index'
								})
						}else{
							this.toast(e.data.msg);
						}
					})
				} else {
					// 验证码登录 
					// 校验验证码是否正确
					let params = {
						mobile: this.phone,
						code : this.number
					}
					this.$http.post(
					this.$api.checkCode,{
						data: params,
						header: {
							'content-type': 'application/json;charset=UTF-8',
						}
					}).then(res=>{
						if(res.data.code == 0){
							uni.hideLoading()
							// 验证成功后再登录到主页
							let p = {
								mobile: this.phone,
								code : this.number
							}
							
							this.$http.post(this.$api.loginForCode,{
								data: p ,
								header: {
									'content-type': 'application/json;charset=UTF-8',
								}
							}).then(e=>{
								let userInfo = {
									userId: e.data.data.userId,
									mobile: e.data.data.mobile,
									sex:e.data.data.sex,
									token: e.data.data.token
									
								}
								uni.setStorageSync('userInfo', userInfo)
								if(e.data.code == 0){
									uni.switchTab({
										url: '../index/index'
									})
								}else{
									this.toast(res.data.msg);
								}
							})
						}else{
							this.toast(res.data.msg);
						}
					})
				}
			}
		}
	}
</script>

<style lang="less">
	.phoneLogin {
		.phoneNumber {
			width: 602rpx;
			margin: 72rpx 0 0 74rpx;
			border-bottom: 3rpx solid #E4E4E4;
			padding-bottom: 34rpx;
			box-sizing: border-box;

			.tit {
				align-items: center;
				padding-left: 10rpx;
				box-sizing: border-box;

				image {
					width: 24rpx;
					height: 36rpx;
				}

				view {
					margin-left: 20rpx;
					font-size: 30rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #000000;
				}

				.renzhneg {
					width: 29rpx;
					height: 35rpx;
				}
			}

			.input {
				margin-top: 41rpx;
				align-items: center;
				padding-left: 10rpx;
				box-sizing: border-box;

				.prefix {
					font-size: 32rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #000000;
				}

				input {
					margin-left: 39rpx;
					width: 400rpx;
				}

				.getCode {
					font-size: 30rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #FDD20C;
				}

				.minute {
					font-size: 30rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #CCCCCC;
				}
			}
		}

		.type {
			padding: 21rpx 102rpx 0 75rpx;
			box-sizing: border-box;

			view {
				font-size: 28rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #666666;
			}
		}

		.next {
			margin: 88rpx 0 0 218rpx;
			width: 314rpx;
			height: 96rpx;
			line-height: 96rpx;
			text-align: center;
			border-radius: 48rpx;
			font-size: 32rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #FFFFFF;
			background: #E6E6E6;
		}

		.black {
			background: #000000;
		}
	}
</style>

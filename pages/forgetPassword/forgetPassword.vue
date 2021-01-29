<template>
	<view class="login">
		<!-- 点击手机号登录 -->
		<view class="phoneLogin">
			<!-- 手机号码 -->
			<view class="phoneNumber">
				<view class="tit flex">
					<image src="../../static/shouji.png" mode=""></image>
					<view>手机号码</view>
				</view>
				<view class="input flex">
					<view class="prefix">+86</view>
					<input type="number" value="" placeholder="请输入您的手机号" maxlength="11" placeholder-style="color: #CCCCCC" v-model="phone"/>
				</view>
				
			</view>
			<!-- 验证码 -->
			<view class="phoneNumber" style="margin-top: 37rpx;">
				<view class="tit flex">
					<image src="../../static/renzheng.png" mode="" class="renzhneg"></image>
					<view >验证码</view>
				</view>
				<view class="input justify-content-between">
					<!--  -->
					<input type="number" value="" maxlength="4" placeholder="请输入4位验证码" style="margin-left: 0; width:300rpx" v-model="number"/>
					<view class="getCode" @tap="getsms">{{codeMsg}}</view>
				</view>
				
			</view>
			<view class="next" :class="(phone&&number)?'black':''" @tap="next">下一步</view>
		</view>
	</view>
</template>

<script>
	import {
		checkPhone
	} from '@/common/tools';
	let t = null;
	export default {
		data() {
			return {
				phone: '',
				number: '',
				codeMsg: '获取验证码',
				codeDisabled: false //倒计时结束后才能重新发
			};
		},
		methods:{
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
					type: '1'
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
						} else if(res.data.code == 403){
						uni.reLaunch({
							url: '/pages/login/login'
						});
						uni.clearStorageSync();
					}else {
							this.toast(res.data.msg);
							this.codeDisabled = false;
						}
					});
			},
			next(){
				if(!this.phone||!this.number) return
				uni.showLoading({
					title: '请稍候'
				});
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
						uni.navigateTo({
							url:'../setPassword/setPassword?code='+this.number+'&phone='+this.phone
						})
					}else if(res.data.code == 403){
						uni.reLaunch({
							url: '/pages/login/login'
						});
						uni.clearStorageSync();
					}else{
						this.toast(res.data.msg);
					}
				})
			}
		}
	}
</script>

<style lang="less" scoped>
.login{
	width: 750rpx;
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
	.phoneLogin{
		.phoneNumber{
			width: 602rpx;
			margin: 72rpx 0 0 74rpx;
			border-bottom: 3rpx solid #E4E4E4;
			padding-bottom: 34rpx;
			box-sizing: border-box;
			.tit{
				align-items: center;
				padding-left: 10rpx;
				box-sizing: border-box;
				image{
					width: 24rpx;
					height: 36rpx;
				}
				view{
					margin-left: 20rpx;
					font-size: 30rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #000000;
				}
				.renzhneg{
					width: 29rpx;
					height: 35rpx;
				}
			}
			.input{
				margin-top: 41rpx;
				align-items: center;
				padding-left: 10rpx;
				box-sizing: border-box;
				.prefix{
					font-size: 32rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #000000;
				}
				input{
					margin-left: 39rpx;
					width: 400rpx;
				}
				.getCode{
					font-size: 30rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #FDD20C;
				}
				.minute{
					font-size: 30rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #CCCCCC;
				}
			}
		}
		.next{
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
		.black{
			background: #000000;
		}
	}
	
}
</style>


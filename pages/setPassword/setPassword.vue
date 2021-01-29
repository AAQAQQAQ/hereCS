<template>
	<view class="setPassword">
		<view class="input">
			<input type="password" placeholder="请输入6~20位密码" maxlength="20" placeholder-style="color: #CCCCCC" v-model="one" />
		</view>
		<view class="input" style="margin-top: 40rpx;">
			<input type="password" placeholder="请再次输入密码" placeholder-style="color: #CCCCCC" v-model="two" />
		</view>
		<view class="finish" :class="(one.length>5&&two.length>5)?'black':''" @tap="comfirm">完成</view>
	</view>
</template>

<script>
	export default {
		onLoad(e) {
			this.code = e.code
			this.phone = e.phone
		},
		data() {
			return {
				code:'',//上个页面带过来的验证码
				phone:'',//上个页面带过来的手机号
				one: '',
				two:'',
				againFlag: false,
			};
		},
		methods:{
			comfirm(){
				if(this.one.length<6||this.two.length<6)return 
				if(this.one != this.two){
					this.toast('两次密码输入不一致，请重新输入')
					return
				}
				let params = {
					mobile: this.phone,
					code: this.code,
					passwords: this.one
				}
				this.$http.post(this.$api.setPasswords,{
					data: params,
					header: {
						'content-type': 'application/json;charset=UTF-8',
					}
				}).then(res=>{
					if(res.data.code == 0){
						setTimeout(() => {
							uni.reLaunch({
								url:'../login/login'
							})
						}, 1000)
					}else{
						this.toast(res.data.msg)
					}
				})
			}
		}
	}
</script>

<style lang="less" scoped>
.setPassword{
	.input{
		width: 602rpx;
		margin-top: 76rpx;
		margin-left: 74rpx;
		padding: 0 0 33rpx 10rpx;
		box-sizing: border-box;
		border-bottom: 3rpx solid #E4E4E4;
	}
	.finish{
		margin: 200rpx 0 0 218rpx;
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
</style>

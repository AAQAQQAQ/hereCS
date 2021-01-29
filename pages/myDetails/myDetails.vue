<template>
	<view class="con_my" :style="{ paddingTop: customBar + 'px' }">
		<view class="nav" :style="{ height: customBar + 'px' }">
			<view class="con" :style="{ height: customBar - statusBar + 'px', paddingTop: statusBar + 'px' }">
				<view class="backBtn" @tap="backto"><image class="qr-back" src="../../static/icon/jt.png"></image></view>
				<!-- <view class="title"> 123</view> -->
			</view>
		</view>
		<view class="nav2" :style="{ height: customBar + 'px' }">
			<view class="con" :style="{ height: customBar - statusBar + 'px', paddingTop: statusBar + 'px' }">
				<view class="title" :style="{ lineHeight: (customBar - statusBar) + 'px' }">
					<view class="username" :style="{ lineHeight: (customBar - statusBar)/3*2 + 'px' }">卡加斯</view>
					<view class="id" :style="{ lineHeight: (customBar - statusBar)/3 + 'px' }">ID:13132e</view>
				</view>
			</view>
		</view>
		<view class="infos flex">
			<image src="../../static/h.png"></image>
			<view class="justify-content-between cows">
				<view class="cow">
					<view>0</view>
					<view>关注</view>
				</view>
				<view class="cow">
					<view>1453</view>
					<view>粉丝</view>
				</view>
				<view class="cow">
					<view>453</view>
					<view>喜欢</view>
				</view>
			</view>
		</view>
		<view class="greyBG"></view>
	</view>
</template>

<script>
	export default {
		onLoad() {
			wx.getSystemInfo({
				success: e => {
					this.statusBar = e.statusBarHeight; //状态栏高度
					let custom = wx.getMenuButtonBoundingClientRect(); //菜单按钮
					this.customBar = custom.bottom + custom.top - e.statusBarHeight;
					//计算得到定义的状态栏高度
				}
			});
			// this.commit()
		},
		data() {
			return {
				statusBar: 0,
				customBar: 0,
			};
		},
		methods:{
			commit(){
				let params = {
					userId: 2441,
					drawAddressId: 1,
					nickname: '',
					mobile: 13555551111,
					address: ''
				}
				this.$http.post(this.$api.getDraw,{
					data: params,
					header: {
						'content-type': 'application/json;charset=UTF-8',
					}
				}).then(res=>{
					
				})
			}
		}
	}
</script>

<style lang="less" scoped>
.con_my{
	width: 750rpx;
	.nav {
		background: pink;
		position: fixed;
		top: 0;
		width: 100%;
		z-index: 999;
		.con {
			// position: fixed;
			width: 100%;
			// top: 0;
			display: flex;
		}
		.backBtn{
			margin-left: 35rpx;
			font-size: 36rpx;
			display: flex;
			align-items: center;
			height: 100%;
			justify-content: center;
			max-width: 100%;
			.title {
			}
			image{
				width: 24rpx;
				height: 38rpx;
			}
		}
	}
	.nav2{
		background: rgba(0,0,0,0);
		position: fixed;
		top: 0;
		width: 100%;
		z-index: 999;
		.con {
			position: fixed;
			width: 100%;
			top: 0;
			display: flex;
			.title{
				width: 100%;
				text-align: center;
				.username{
					font-size: 30rpx;
					font-family: PingFang SC;
					font-weight: 600;
					color: #000000;
				}
				.id{
					font-size: 20rpx;
					font-family: PingFang SC;
					font-weight: 600;
					color: #999999;
				}
			}
		}
	}
	.infos{
		padding: 47rpx 42rpx;
		box-sizing: border-box;
		image{
			width: 170rpx;
			height: 170rpx;
			border-radius: 50%;
		}
		.cows{
			padding: 0 40rpx 0 83rpx;
			box-sizing: border-box;
			text-align: center;
			flex:1;
			.cow{
				view{
					&:nth-child(1){
						font-size: 34rpx;
						font-family: PingFang SC;
						font-weight: 600;
						color: #000000;
					}
					&:nth-child(2){
						margin-top: 14rpx;
						font-size: 22rpx;
						font-family: PingFang SC;
						font-weight: 600;
						color: #999999;
					}
				}
			}
			
		}
	}
	.greyBG{
		background: #F2F2F2;
		width: 100%;
		height: 31rpx;
	}
	
}
</style>

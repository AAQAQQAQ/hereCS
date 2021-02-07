<template>
	<view class="con">
		<view class="list">
			<view class="items justify-content-between">
				<view class="left flex">
					<view class="avator">
						<image src="../../static/h.png" mode="aspectFill"></image>
					</view>
					<view class="name">是那边</view>
				</view>
				<view class="right">01-09</view>
			</view>
			<view class="items justify-content-between">
				<view class="left flex">
					<view class="avator">
						<image src="../../static/h.png" mode="aspectFill"></image>
					</view>
					<view class="name">是那边</view>
				</view>
				<view class="right">01-09</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="less" scoped>
	.con{
		width: 750rpx;
		padding-top: 20rpx;
		box-sizing: border-box;
		.list{
			padding: 0 30rpx;
			box-sizing: border-box;
			.items{
				margin-bottom: 41rpx;
				align-items: center;
				.left{
					align-items: center;
					.avator{
						width: 100rpx;
						height: 100rpx;
						border-radius: 50%;
						image{
							width: 100%;
							height: 100%;
							border-radius: 50%;
						}
					}
					.name{
						flex: 1;
						margin-left: 19rpx;
						font-size: 30rpx;
						font-family: PingFang SC;
						font-weight: 600;
						color: #000000;
					}
				}
				.right{
					font-size: 24rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #999999;
				}
			}
		}
	}
</style>

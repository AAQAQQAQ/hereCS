<template>
	<view class="con">
		<view class="list">
			<view class="items justify-content-between">
				<view class="left flex">
					<view class="avator">
						<image src="../../static/h.png" mode="aspectFill"></image>
					</view>
					<view class="name">
						<view>基金</view>
						<view>开始关注你了</view>
					</view>
				</view>
				<view  class="right">01-10</view>
			</view>
			<view class="items justify-content-between">
				<view class="left flex">
					<view class="avator">
						<image src="../../static/h.png" mode=""></image>
					</view>
					<view class="name">
						<view>基金</view>
						<view>开始关注你了</view>
					</view>
				</view>
				<view  class="right">01-10</view>
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
			padding: 0 30rpx 0 33rpx;
			box-sizing: border-box;
			.items{
				align-items: center;
				margin-bottom: 41rpx;
				.left{
					// align-items: center;
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
						view{
							&:nth-child(1){
								margin-top: 9rpx;
								font-size: 30rpx;
								font-family: PingFang SC;
								font-weight: 600;
								color: #000000;
							}
							&:nth-child(2){
								margin-top: 20rpx;
								font-size: 24rpx;
								font-family: PingFang SC;
								font-weight: 400;
								color: #000000;
							}
						}
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

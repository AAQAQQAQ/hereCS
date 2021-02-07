<template>
	<view>
		<view class="block_i">
			<view class="list"  style="margin-left: 22rpx">
				<view class="items" v-for="(item, index) in oneList" :key="index" @tap="linkTo(item.cardUrlType,item.cardId,item.userId,item.cardType,item.indexType)">
					<image :src="item.cardUrl" mode="aspectFill" :style="item.cardUrlSpec" class="masterImg"></image>
					<view class="tit" :style="item.indexType != 0?'':'line-height: 1;margin: 10rpx 0 8rpx 17rpx;'">{{item.cardTitle}}</view>
					<view class="des" v-if="item.indexType != 0">{{item.cardContent}}</view>
					<view class="justify-content-between person" v-if="item.indexType != 0&&item.indexType != 2">
						<view class="flex avator">
							<image :src="item.portrait" mode=""></image>
							<view>{{item.nickname}}</view>
						</view>
						<view class="flex like">
							<image src="../../static/zan2@2x.png" mode="" v-if="item.isPraise == 0"></image>
							<image src="../../static/zan1@2x.png" mode="" v-if="item.isPraise != 0"></image>
							<view>{{item.praiseNum||0}}</view>
						</view>
					</view>
					<image class="video" src="../../static/icon/video.png" mode="" v-if="item.cardUrlType == 1"></image>
					<view class="official" :style="item.top" v-if="item.indexType == 0||item.indexType == 2">{{item.indexType==0?'#官方':'活动'}}</view>
				</view>
				
			</view>
			<view class="list"  style="margin-left: 14rpx">
				<view class="items" v-for="(item, index) in twoList" :key="index" @tap="linkTo(item.cardUrlType,item.cardId,item.userId,item.cardType,item.indexType)">
					<image :src="item.cardUrl" mode="aspectFill" :style="item.cardUrlSpec" class="masterImg"></image>
					<view class="tit">{{item.cardTitle}}</view>
					<view class="des" v-if="item.indexType != 0">{{item.cardContent}}</view>
					<view class="justify-content-between person" v-if="item.indexType != 0&&item.indexType != 2">
						<view class="flex avator">
							<image :src="item.portrait" mode=""></image>
							<view>{{item.nickname}}</view>
						</view>
						<view class="flex like">
							<image src="../../static/zan2@2x.png" mode="" v-if="item.isPraise == 0"></image>
							<image src="../../static/zan1@2x.png" mode="" v-if="item.isPraise != 0"></image>
							<view>{{item.praiseNum||0}}</view>
						</view>
					</view>
					<image class="video" src="../../static/icon/video.png" mode="" v-if="item.cardUrlType == 1"></image>
					<view class="official" :style="item.top" v-if="item.indexType == 0">#官方</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				oneList:[],
				twoList:[],
			};
		},
		methods:{
			linkTo(cardUrlType,cardId,userId,cardType,indexType){
				if(indexType == 0||indexType==2){
					uni.navigateTo({
						url:'../officialActivity/officialActivity?id='+cardId+'&indexType='+indexType
					})
				}else{
					if(cardUrlType == 0&&(cardType == 2||!cardType)){
						// 心情卡
						uni.navigateTo({
							url:'../mood/mood?id='+cardId+'&userId='+userId+'&cardUrlType='+cardUrlType+'&shop=1'
						})
					}else if(cardUrlType == 1&&(cardType == 2||!cardType)){
						// 视频卡
						uni.navigateTo({
							url:'../video/video?id='+cardId+'&userId='+userId+'&cardUrlType='+cardUrlType+'&shop=1'
						})
					}else if(cardType == 0){
						// 活动卡
						uni.navigateTo({
							url:'../home/home?id='+cardId+'&type=C'+'&shop=1'
						})
					}else if(cardType == 1){
						// 店铺卡
						uni.navigateTo({
							url:'../home/home?id='+cardId+'&type=D'+'&shop=1'
						})
						
					}
				}
				
			},
		}
	}
</script>

<style lang="less" scoped>
.block_i{
		width: 750rpx;
		display: flex;
		padding-top: 21rpx;
		box-sizing: border-box;
		.list {
			// padding: 20rpx rpx;
			box-sizing: border-box;
			overflow: hidden;
			// column-count: 2;
			// 实验
			display: flex;
			// flex: 1;
			flex-direction: column;
			.items {
				padding-bottom: 10rpx;
				border-radius: 12rpx 12rpx 0rpx 0rpx;
				width: 345rpx;
				margin-bottom: 20rpx;
				// break-inside: avoid;
				box-shadow: 0rpx 0rpx 5rpx 0rpx rgba(0, 0, 0, 0.1);
				border-top: 0.5rpx solid rgba(238, 238, 238, 0.1);
				border-left: 0.5rpx solid rgba(238, 238, 238, 0.8);
				border-right: 0.5rpx solid rgba(238, 238, 238, 0.8);
				border-radius: 14rpx;
				position: relative;
				
				// 实验
				overflow: hidden;
		
				.masterImg {
					width: 345rpx;
					border-radius: 12rpx 12rpx 0rpx 0rpx;
				}
		
				.tit {
					// line-height: 1;
					margin: 10rpx 0 0rpx 17rpx;
					width: 305rpx;
					font-size: 26rpx;
					font-family: PingFang SC;
					font-weight: 600;
					color: #000000;
					display: -webkit-box;
					-webkit-line-clamp: 1;
					overflow: hidden;
					text-overflow: ellipsis;
					-webkit-box-orient: vertical;
				}
		
				.des {
					font-size: 22rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #979797;
					margin: 10rpx 0 0 17rpx;
					width: 305rpx;
					display: -webkit-box;
					-webkit-line-clamp: 2;
					overflow: hidden;
					text-overflow: ellipsis;
					-webkit-box-orient: vertical;
				}
		
				.person {
					padding: 10rpx 24rpx 0rpx 17rpx;
					box-sizing: border-box;
					align-items: center;
		
					.avator,
					.like {
						align-items: center;
		
						image {
							width: 40rpx;
							height: 40rpx;
							border-radius: 50%;
							background: #E6E6E6;
						}
		
						view {
							display: -webkit-box;
							-webkit-line-clamp: 1;
							overflow: hidden;
							text-overflow: ellipsis;
							-webkit-box-orient: vertical;
							font-size: 22rpx;
							font-family: PingFang SC;
							font-weight: 400;
							color: #979797;
							margin-left: 12rpx;
						}
					}
		
					.like {
						image {
							width: 30rpx;
							height: 30rpx;
		
						}
					}
				}
		
				.video {
					position: absolute;
					top: 16rpx;
					right: 16rpx;
					width: 40rpx;
					height: 40rpx;
				}
		
				.official {
					padding: 10rpx 15rpx;
					box-sizing: border-box;
					background: #000000;
					border-radius: 10rpx;
					font-size: 20rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #FFFFFF;
					position: absolute;
					right: 17rpx;
				}
			}
		}
	}
</style>

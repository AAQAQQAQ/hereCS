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
				<view class="cow" @tap="toPages('../myAttention/myAttention')">
					<view>453</view>
					<view>关注</view>
				</view>
				<view class="cow" @tap="toPages('../myFans/myFans')">
					<view>1453</view>
					<view>粉丝</view>
				</view>
				<view class="cow" @tap="toPages('../myLike/myLike')">
					<view>0</view>
					<view>喜欢</view>
				</view>
			</view>
		</view>
		<view class="greyBG"></view>
		<view class="bottomCon">
			<view class="tab justify-content-between">
				<view class="cow" v-for="(item, index) in tabList" :key="index" @tap="changeTab(item.id)">
					<view class="tit" :class="item.id == tabId?'selectTit':''">{{item.tit}}</view>
					<view class="border" :class="item.id == tabId?'selectBorder':''"></view>
				</view>
			</view>
			<!-- Card和赞过 -->
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
				tabList:[{
					tit: "Card",
					id: 0
				},{
					tit: "足迹",
					id: 1
				},{
					tit: "赞过",
					id: 2
				}],
				tabId: 0,
				oneList:[],
				twoList:[],
			};
		},
		methods:{
			toPages(url){
				uni.navigateTo({
					url:url
				})
			},
			// 切换card 足迹 赞
			changeTab(id){
				this.tabId = id
			},
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
			},
			onReachBottom() {
				if(this.tabId == 0){
					this.getCardList()
				}else if(this.tabId == 1){
					this.getFootprint()
				}else if(this.tabId == 2){
					this.getZanList()
				}
			},
			getCardList(){
				
			},
			getFootprint(){
				
			},
			getZanList(){
				
			},
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
.con_my{
	width: 750rpx;
	.nav {
		// background: pink;
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
	.bottomCon{
		.tab{
			margin-top: 30rpx;
			padding: 0 114rpx 16rpx 114rpx;
			box-sizing: border-box;
			line-height: 1;
			.cow{
				text-align: center;
				line-height: 1;
				.tit{
					font-size: 30rpx;
					font-family: PingFang SC;
					font-weight: 600;
					color: #979797;
				}
				.selectTit{
					font-size: 42rpx;
					color: #000000;
				}
				.border{
					display: inline-block;
					margin-top: 12rpx;
					width: 38rpx;
					height: 6rpx;
					background: #FFFFFF;
				}
				.selectBorder{
					background: #FDD10A;
				}
			}
			
		}
	}
	.block_i{
		width: 100%;
		display: flex;
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
					// top: 324rpx;
				}
			}
		}
	}
	
}
</style>

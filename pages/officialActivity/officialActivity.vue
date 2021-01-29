<template>
	<view class="con">
		<view class="fixed justify-content-between">
			<view class="flex ava">
				<image :src="topicUrl" mode="aspectFill"></image>
				<view>{{totalNum}}张{{indexType==0?'心情':'活动'}}卡</view>
			</view>
			<!-- <view class="join">参与话题</view> -->
		</view>
		<scroll-view scroll-y :scroll-with-animation="true" :style="{ height: scrollH + 'px' }" class="scrollBox" @scrolltolower="tolower">
			<view class="block_i">
				<view class="list"  style="margin-left: 22rpx">
					<view class="items" v-for="(item, index) in oneList" :key="index" @tap="linkTo(item.cardActivityId||item.cardId)">
						<image :src="item.cardUrl||item.activityUrl" mode="aspectFill" :style="item.cardUrlSpec" class="masterImg"></image>
						<view class="tit" :style="item.indexType != 0?'':'line-height: 1;margin: 10rpx 0 8rpx 17rpx;'">{{item.cardTitle||item.activityTitle}}</view>
						<view class="des" v-if="item.indexType != 0&&indexType==0">{{item.cardContent}}</view>
						<view class="justify-content-between person" v-if="item.indexType != 0&&indexType==0">
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
				<view class="list"  style="margin-left: 14rpx">
					<view class="items" v-for="(item, index) in twoList" :key="index" @tap="linkTo(item.cardActivityId||item.cardId)">
						<image :src="item.cardUrl||item.activityUrl" mode="aspectFill" :style="item.cardUrlSpec" class="masterImg"></image>
						<view class="tit">{{item.cardTitle||item.activityTitle}}</view>
						<view class="des" v-if="item.indexType != 0&&indexType==0">{{item.cardContent}}</view>
						<view class="justify-content-between person" v-if="item.indexType != 0&&indexType==0">
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
			<view class="load">{{loadMore}}</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		onLoad(res) {
			uni.setNavigationBarTitle({
				title: 'Here'
			});
			this.indexType = res.indexType
			this.topicId = res.id
			this.token = uni.getStorageSync('userInfo').token
			this.userId = uni.getStorageSync('userInfo').userId
			this.getList()
		},
		onReady() {
			uni.getSystemInfo({
				success: (res) => {
					this.scrollH = res.windowHeight
				}
			});
		},
		onShareAppMessage() {
			return {
				title: this.title,
				withShareMenu: true,
				imageUrl:this.topicUrl,
			}
			// wx.showShareMenu({
			// 	withShareMenu: true,
			// 	success: (e)=> {
			// 	},
			// 	fail: ()=> {}
			// })
		},
		data() {
			return {
				indexType:'',
				userId:'',
				token:'',
				topicUrl:'../../static/moren.png',
				topicId: '',
				beg: false,
				isloadMore: false,
				loadMore:'',
				pageNumber: 0,
				pageSize: 10,
				scrollH:'',
				oneList:[],
				twoList:[],
				totalNum:0,
				title:''
			};
		},
		methods:{
			linkTo(id){
				console.log(id)
				if(this.indexType == 2){
					uni.navigateTo({
						url:'../homeTwo/homeTwo?id='+id+'&type=C'+'&shop=1'
					})
				}
				
			},
			tolower(){
				this.getList()
			},
			getList() {
				if (this.beg || this.isloadMore) return
				this.beg = true
				let params = {
					topicId:this.topicId,
					userId: this.userId,
					start: this.pageNumber,
					limit: this.pageSize,
					token: this.token
				}
				let params1 = {
					activityTopicId:this.topicId,
					userId: this.userId,
					start: this.pageNumber,
					limit: this.pageSize,
					token: this.token
				}
				uni.showLoading({
					title: '加载中'
				});
				let url = this.indexType == 0?this.$api.officialCardList:this.$api.getActivityList
				this.$http.post(url, {
					data: this.indexType == 0?params:params1,
					header: {
						'content-type': 'application/json;charset=UTF-8',
						'token': this.token
					}
			
				}).then(res => {
					if (res.data.code == 0) {
						uni.hideLoading()
						this.totalNum = this.indexType == 0?res.data.data.cardList.totalNum:res.data.data.activityList.totalNum
						this.topicUrl = this.indexType == 0?res.data.data.topicUrl:res.data.data.resUrl
						this.title = this.indexType == 0?res.data.data.topicTitle:res.data.data.title
						uni.setNavigationBarTitle({
							title: this.title
						});
						let lists = this.indexType == 0?res.data.data.cardList.list:res.data.data.activityList.list
						lists.map((i,index) => {
							if (i.cardUrlSpec&&i.cardUrlSpec>1) {
								i.cardUrlSpec = Number(i.cardUrlSpec) * 345
							} else {
								i.cardUrlSpec = 345
							}
							if(!i.isPraise){
								i.isPraise = 0
							}
			
							i.top = i.cardUrlSpec - 22
							i.cardUrlSpec = 'height:' + i.cardUrlSpec + 'rpx'
							i.top = 'top:' + i.top + 'rpx'
							if(index%2==0){
								this.oneList.push(i)
							}else{
								this.twoList.push(i)
							}
						})
						// this.recommendList = [...this.recommendList, ...res.data.data.list]
						this.pageNumber+=10
						let total = this.pageNumber;
						if (!lists || total >= this.totalNum || this.totalNum <= this.pageSize) {
							this.isloadMore = true;
							this.loadMore = '已经全部加载完毕';
						}
						this.beg = false
						uni.hideLoading();
			
					} else if(res.data.code == 403){
						uni.clearStorageSync();
						uni.reLaunch({
							url:'../login/login'
						})
						let data = {
							type: 'G',
							id: this.topicId,
						}
						uni.setStorageSync('data', data)
						uni.hideLoading()
					}else {
						this.beg = false
						this.toast(res.data.msg)
					}
				})
			},
		}
	}
</script>

<style lang="less" scoped>
	.con{
		width: 750rpx;
		background: #F2F2F2;
		.fixed{
			width: 750rpx;
			position: fixed;
			top: 0;
			background: #FFFFFF;
			z-index: 9999;
			align-items: center;
			padding: 48rpx 41rpx;
			box-sizing: border-box;
			.ava{
				align-items: center;
				image{
					width: 160rpx;
					height: 160rpx;
				}
				view{
					margin-left: 21rpx;
					font-size: 30rpx;
					font-family: PingFang SC;
					font-weight: 600;
					color: #000000;
				}
			}
			.join{
				width: 182rpx;
				height: 64rpx;
				line-height: 64rpx;
				text-align: center;
				border: 2rpx solid #000000;
				border-radius: 12rpx;
				font-size: 24rpx;
				font-family: PingFang SC;
				font-weight: 600;
				color: #000000;
			}
		}
		.scrollBox{
			padding-top: 271rpx;
			box-sizing: border-box;
		}
		.block_i{
			width: 100%;
			display: flex;
		}
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
				background: #FFFFFF;
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
		.load{
			width: 100%;
			text-align: center;
			margin-bottom: 20rpx;
			font-size: 22rpx;
			font-weight: 600;
			color:rgba(0,0,0,0.5)
		}
	}
</style>

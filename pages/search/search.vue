<template>
	<view class="content">
		<view class="fixed">
			<view class="search-box" style="padding-bottom:15rpx;">
				<mSearch :show="false" @search="search($event, 1)" placeholder="搜索" :focus="false" :iconSelct="2" style="width:100%;"></mSearch>
			</view>
			<!-- <view class="flex" v-if="searchList[0]">
				<view v-for="(item, index) in tab" :key="index" @tap="changeTab(item.id)"><span :class="tabId == item.id?'border':''">{{item.name}}</span></view>
			</view> -->
		</view>
		<view class="block_i" v-if="tabId == 0">
			<view class="list" style="margin-left: 22rpx">
				<view class="items" v-for="(item, index) in oneList" :key="index" @tap="linkTo(item.cardUrlType,item.cardId,item.userId)">
					<image :src="item.cardUrl" mode="" class="masterImg" :style="item.cardUrlSpec"></image>
					<view class="tit">{{item.cardTitle}}</view>
					<view class="des">{{item.cardContent}}</view>
					<view class="justify-content-between person">
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
			<view class="list" style="margin-left: 14rpx">
				<view class="items" v-for="(item, index) in twoList" :key="index" @tap="linkTo(item.cardUrlType,item.cardId,item.userId)">
					<image :src="item.cardUrl" mode="" class="masterImg" :style="item.cardUrlSpec"></image>
					<view class="tit">{{item.cardTitle}}</view>
					<view class="des">{{item.cardContent}}</view>
					<view class="justify-content-between person">
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
		
		<view v-if="tabId == 1" class="userList">
			<view class="userItems flex">
				<image src="" mode=""></image>
				<view class="user">
					<view class="name">好机会</view>
					<view class="fans">500粉丝</view>
				</view>
			</view>
			<view class="userItems flex">
				<image src="" mode=""></image>
				<view class="user">
					<view class="name">好机会</view>
					<view class="fans">500粉丝</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import mSearch from '@/components/mehaotian-search/mehaotian-search.vue';
	export default {
		components: {
			mSearch
		},
		onLoad() {
			this.token = uni.getStorageSync('userInfo').token
			this.userId = uni.getStorageSync('userInfo').userId
			// this.getSearchList()
		},
		data() {
			return {
				tab: [{
					name: 'card',
					id: 0
				}, {
					name: '用户',
					id: 1
				}],
				tabId: 0,
				token: '',
				userId: '',
				pageSize: 10,//limit
				pageNumber: 1,//start
				keyword: '' ,
				isloadMore: false,
				// searchList:[],
				oneList:[],
				twoList:[]
			}
		},

		methods: {
			search(e, val) {
				if (e) {
					this.keyword = e;
					this.clern()
				} else {
					this.keyword = ''
				}
			},
			clern(){
				this.isloadMore = false;
				this.pageNumber = 1;
				this.oneList = [],
				this.twoList = []
				this.getSearchList();
			},
			changeTab(id) {
				this.tabId = id
			},
			linkTo(cardUrlType,cardId,userId,cardType){
				if(cardUrlType == 0&&cardType == 2){
					// 心情卡
					uni.navigateTo({
						url:'../mood/mood?cardId='+cardId+'&userId='+userId+'&cardUrlType='+cardUrlType+'&shop=1'
					})
				}else if(cardUrlType == 1&&cardType == 2){
					// 视频卡
					uni.navigateTo({
						url:'../video/video?cardId='+cardId+'&userId='+userId+'&cardUrlType='+cardUrlType+'&shop=1'
					})
				}else if(cardType == 0){
					// 活动卡
				}else if(cardType == 1){
					// 店铺卡
				}
			},
			getSearchList(kewWord){
				uni.showLoading({
					title: '加载中'
				});
				let params = {
					userId: this.userId,
					keyword: this.keyword,
					start: this.pageNumber,
					limit: this.pageSize
				}
				this.$http.post(this.$api.searchCard,{
				data: params,
				header: {
					'content-type': 'application/json;charset=UTF-8',
					'token': this.token
				}
				
				}).then(res=>{
					if(res.data.code == 0){
						if(!res.data.data[0]){
							this.toast('暂无数据')
							return
						}
						res.data.data.map((i,index)=>{
							if(i.cardUrlSpec){
								i.cardUrlSpec = Number(i.cardUrlSpec)*346
							}else{
								i.cardUrlSpec = 346
							}
							
							i.top=i.cardUrlSpec - 22
							i.cardUrlSpec = 'height:'+i.cardUrlSpec+'rpx'
							i.top = 'top:'+i.top+'rpx'
							if(index%2==0){
								this.oneList.push(i)
							}else{
								this.twoList.push(i)
							}
							
						})
						uni.hideLoading()
						// this.searchList = res.data.data
					}else if(res.data.code == 403){
						uni.hideLoading()
						uni.reLaunch({
							url: '/pages/login/login'
						});
						uni.clearStorageSync();
					}else{
						this.toast(res.data.msg)
					}
				})
			}
			
			// linkto(){
			// 	uni.navigateTo({
			// 		// url:'../video/video?url='+'http://192.168.2.118:8080/#/smaple/home/video?userid=590&id=4928&token=61A73423B440191310FC537E72957911'
			// 		url:'../video/video?'+'userid=590&id=4928&token=61A73423B440191310FC537E72957911'
			// 	})
			// }
		}
	}
</script>

<style lang="less" scoped>
	.content {
		padding-top: 125rpx;
		box-sizing: border-box;

		.fixed {
			width: 100%;
			position: fixed;
			top: 0;
			background: #fff;
			z-index: 9999;

			.search-box {
				background: #fff;

				/deep/.search .content .content-box .input {
					color: #333;
				}

				/deep/.button-item {
					color: #333;
				}
			}
			

			.flex {
				align-items: center;
				margin-top: 36rpx;

				>view {
					width: 50%;
					text-align: center;
					font-size: 34rpx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #6E6E6E;
					padding-bottom: 8rpx;
				}

				.border {
					font-size: 34rpx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #000000;

				}
			}
		}
		.block_i{
			width: 100%;
			display: flex;
		}

		.list {
			// padding: 20rpx 22rpx;
			box-sizing: border-box;
			// column-count: 2;
			overflow: hidden;
			display: flex;
			flex-direction: column;

			.items {
				padding-bottom: 10rpx;
				// break-inside: avoid;
				// width: 49%;
				width: 346rpx;
				margin-bottom: 20rpx;
				box-shadow: 0rpx 0rpx 5rpx 0rpx rgba(0, 0, 0, 0.1);
				border-radius: 14rpx;
				position: relative;
				border-radius: 12rpx 12rpx 0rpx 0rpx;

				.masterImg {
					width: 346rpx;
					border-radius: 12rpx 12rpx 0rpx 0rpx;
				}
				.tit{
					margin: 10rpx 0 0 17rpx;
					width: 305rpx;
					font-size: 26rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #000000;
					display: -webkit-box;
					-webkit-line-clamp: 1;
					overflow: hidden;
					text-overflow: ellipsis;
					-webkit-box-orient: vertical;
				}
				.des{
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
				.person{
					padding: 10rpx 24rpx 0rpx 17rpx;
					box-sizing: border-box;
					align-items: center;
					.avator,.like{
						align-items: center;
						image{
							width: 40rpx;
							height: 40rpx;
							border-radius: 50%;
						}
						view{
							
							font-size: 22rpx;
							font-family: PingFang SC;
							font-weight: 400;
							color: #979797;
							margin-left: 12rpx;
						}
					}
					.like{
						image{
							width: 29rpx;
							height: 30rpx;
							
						}
					}
				}
				.video{
					position: absolute;
					top: 16rpx;
					right: 16rpx;
					width: 40rpx;
					height: 40rpx;
				}
				.official{
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
		.userList{
			.userItems{
				width: 728rpx;
				margin-left: 22rpx;
				padding: 32rpx 0;
				box-sizing: border-box;
				align-items: center;
				border-bottom: 1rpx solid #E6E6E6;
				image{
					width: 84rpx;
					height: 84rpx;
					
				}
				.user{
					margin-left: 22rpx;
					.name{
						font-size: 30rpx;
						font-family: PingFang SC;
						font-weight: 400;
						color: #000000;
					}
					.fans{
						font-size: 22rpx;
						font-family: PingFang SC;
						font-weight: 300;
						color: #A1A1A1;
					}
				}
			}
		}
	}
</style>


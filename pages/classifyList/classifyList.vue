<template>
	<view class="classifyList">
		<view class="list">
			<view class="items flex" v-for="(item, index) in List" :key="index" @tap="toPages('../home/home?id='+item.storeId+'&type=D'+'&shop=1')">
				<image :src="item.storeUrl" mode="aspectFill" class="masterImg"></image>
				<view class="des">
					<view class="tit">
						<view class="name">{{item.storeTitle}}</view>
						<view class="distance">{{item.juli}}</view>
					</view>
					<view class="justify-content-between person">
						<view class="introduce">{{item.storeIntroduce||''}}</view>
						<view class="money">¥{{item.storeAvgPrice}}/人</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		onLoad(res) {
			this.token = uni.getStorageSync('userInfo').token
			this.longitude = res.longitude
			this.latitude = res.latitude
			this.tagTitle = res.tagTitle
			this.getList()
		},
		data() {
			return {
				longitude:'',
				latitude:'',
				tagTitle:'',
				List:[],
				start:0,
				limit: 10,
				beg: false, 
				isloadMore: false,
			};
		},
		methods:{
			toPages(url){
				uni.navigateTo({
					url:url
				})
			},
			onReachBottom() {
				this.getList();
			},
			getList(){
				if (this.beg || this.isloadMore) return
				this.beg = true
				let params = {
					lng: this.longitude,
					lat: this.latitude,
					tagTitle: this.tagTitle,
					start: this.start,
					limit: this.limit
				}
				uni.showLoading({
					title: '加载中'
				});
				this.$http.post(this.$api.queryByTagList,{
					data: params,
					header: {
						'content-type': 'application/json;charset=UTF-8',
						token: this.token
					}
				}).then(res=>{
					if(res.data.code == 0){
						res.data.data.list.map(item=>{
							if(item.juli>1000){
								item.juli = (item.juli/1000).toFixed(2)
								item.juli = item.juli+'km'
							}else{
								item.juli = item.juli+'m'
							}
						})
						this.List = [...this.List,...res.data.data.list]
						this.start += 10
						let total = this.start;
						if (!res.data.data.list.length || total >= res.data.data.totalNum || res.data.data.totalNum <= this.limit) {
							this.isloadMore = true;
						}
						this.beg = false
						uni.hideLoading();
					}else if(res.data.code == 403){
						setTimeout(()=>{
							this.toast('请先登录')
							uni.clearStorageSync();
						},800)
						uni.reLaunch({
							url:'../login/login'
						})
					}else{
						this.beg = false
						this.toast(res.data.msg)
					}
				})
			}
		}
	}
</script>

<style lang="less" scoped>
.classifyList{
	.list{
		.items{
			// align-items: center;
			padding: 20rpx 34rpx;
			box-sizing: border-box;
			border-bottom: 1rpx solid #E6E6E6;
			.masterImg{
				width: 280rpx;
				height: 176rpx;
			}
			.des{
				flex: 1;
				margin-left: 20rpx;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				.tit{
					display: flex;
					justify-content: space-between;
					.name{
						width: 286rpx;
						font-size: 32rpx;
						font-family: PingFang SC;
						font-weight: 600;
						color: #000000;
						display: -webkit-box;
						-webkit-line-clamp: 2;
						overflow: hidden;
						text-overflow: ellipsis;
						-webkit-box-orient: vertical;
					}
					.distance{
						font-size: 22rpx;
						font-family: PingFang SC;
						font-weight: 400;
						color: #777777;
						margin-top: 13rpx;
					}
				}
				.person{
					padding-bottom: 20rpx;
					box-sizing: border-box;
					.introduce{
						display: -webkit-box;
						-webkit-line-clamp: 1;
						overflow: hidden;
						text-overflow: ellipsis;
						-webkit-box-orient: vertical;
						flex: 1.6;
						font-size: 26rpx;
						font-family: PingFang SC;
						font-weight: 400;
						color: #777777;
					}
					.money{
						flex: 1;
						text-align: right;
						font-size: 26rpx;
						font-family: PingFang SC;
						font-weight: 400;
						color: #777777;
					}
				}
				
			}
		}
	}
}
</style>

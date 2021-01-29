<template>
	<view class="classify">
		<view @tap="toPages(index)" v-for="(item, index) in List" :key="index">
			<image :src="item.tagUrl" mode=""></image>
			<view>{{item.tagTitle}}</view>
		</view>
		<!-- <view>
			<image src="../../static/classify/lyjd.png" mode=""></image>
			<view>旅游景点</view>
		</view>
		<view>
			<image src="../../static/classify/zyb.png" mode=""></image>
			<view>桌游吧</view>
		</view>
		<view>
			<image src="../../static/classify/mstt.png" mode=""></image>
			<view>密室逃脱</view>
		</view>
		<view>
			<image src="../../static/classify/xwc.png" mode=""></image>
			<view>下午茶</view>
		</view>
		<view>
			<image src="../../static/classify/gzct.png" mode=""></image>
			<view>高赞餐厅</view>
		</view>
		<view>
			<image src="../../static/classify/jgyd.png" mode=""></image>
			<view>酒馆夜店</view>
		</view>
		<view>
			<image src="../../static/classify/ktvyy.png" mode=""></image>
			<view>KTV影院</view>
		</view>
		<view>
			<image src="../../static/classify/djwk.png" mode=""></image>
			<view>电竞网咖</view>
		</view>
		<view>
			<image src="../../static/classify/sjty.png" mode=""></image>
			<view>实景体验</view>
		</view>
		<view>
			<image src="../../static/classify/ydxx.png" mode=""></image>
			<view>运动休闲</view>
		</view>
		<view>
			<image src="../../static/classify/clsh.png" mode=""></image>
			<view>潮流生活</view>
		</view>
		<view>
			<image src="../../static/classify/whzl.png" mode=""></image>
			<view>文化展览</view>
		</view> -->
	</view>
</template>

<script>
	export default {
		onShow() {
			this.token = uni.getStorageSync('userInfo').token
			this.getClassify()
		},
		data() {
			return {
				token:'',
				List: [],
				longitude:'',
				latitude:'',
				index:''
			};
		},
		methods:{
			toPages(index){
				this.index = index
				uni.authorize({
					scope: 'scope.userLocation',
					success:()=> {
						this.refresh();
					},
					//授权失败
					fail:()=> {
						uni.getSetting({
							success:res=> {
								if (!res.authSetting['scope.userLocation']) {
									uni.showModal({
										title: '提示',
										content: '请求获取位置权限',
										success: res=> {
											if (res.confirm) {
												uni.openSetting({
													success(res) {
														if (!res.authSetting['scope.userLocation']) {
														} else {
															this.refresh();
														}
													}
												});
											} else if (res.cancel) {
											}
										}
									});
								}
							}
						});
					}
				});
				
			},
			refresh() {
				uni.getLocation({
					type: 'gcj02',
					success: res => {
						this.longitude = res.longitude;
						this.latitude = res.latitude;
						uni.navigateTo({
							url:'../classifyList/classifyList?longitude='+this.longitude+'&latitude='+this.latitude+'&tagTitle='+this.List[this.index].tagTitle
						})
					}
				});
			},
			getClassify(){
				let params = {
					token: this.token
				}
				uni.showLoading({
					title:"加载中"
				})
				this.$http.post(this.$api.shopClassify,{
					data: params,
					header: {
						'content-type': 'application/json;charset=UTF-8',
						'token': this.token
					}
				}).then(res=>{
					if(res.data.code == 0){
						this.List = res.data.data
						uni.hideLoading()
					}else if(res.data.code == 403){
						setTimeout(()=>{
							this.toast('请先登录')
							uni.clearStorageSync();
						},800)
						uni.reLaunch({
							url:'../login/login'
						})
					}else{
						this.toast(res.data.msg)
					}
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.classify {
		image,view{
			line-height: 1;
		}
		width: 100%;
		padding-top: 50rpx;
		box-sizing: border-box;
		display: flex;
		flex-wrap: wrap;

		>view {
			margin-bottom: 72rpx;
			text-align: center;
			width: 25%;

			image {
				width: 60rpx;
				height: 60rpx;
			}

			view {
				margin-top: 20rpx;
				font-size: 24rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #333333;
			}

		}
	}
</style>

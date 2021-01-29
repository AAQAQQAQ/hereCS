<template>
	<!-- 心情卡 -->
	<view class="state">
		<!-- <view class="toHere">
			<view class="icon">
				<image :src="portrait" mode="aspectFit"></image>
				<view>
					<view class="name">{{nickname}}</view>
				</view>
			</view>
			<view class="downLoad" :class="isAttention==1?'keepEye':''" @tap="keepEye">{{isAttention==1?'已关注':'关注'}}</view>
		</view> -->
		<!-- <view class="image" :style="height"> -->
		<view class="image">
			<swiper :autoplay="false" 
			 class="swiper" :indicator-dots="true">
				<swiper-item v-for="(item,index) in swiperList" :key="index">
					<image :src="item" mode="aspectFit"></image>
				</swiper-item>
			</swiper>
		</view>
		<!-- 头像和关注 -->
		<!-- <view class='justify-content-between headPortrait'>
			<view class="flex">
				<image src="../../static/logo.png" mode=""></image>
				<view>AAAA</view>
			</view>
			<view class="focus">关注</view>
		</view> -->
		<!-- 描述 -->
		<view class="titS">
			{{title}}
		</view>
		<view class="describe">
			{{content}}
		</view>
		<view class="time">{{time}}</view>
		<view class="pinglun">
			<view class="total">评论<text>({{total}})</text></view>
			<view class="listP">
				<view class="itemsP flex" v-for="(item,index) in commentList" :key="index">
					<image :src="item.portrait" mode=""></image>
					<view class="right">
						<view class="justify-content-between name">
							<view class="name1">{{item.nickname}}</view>
							<view class="zan flex">
								<image src="../../static/zan2@2x.png" mode="" ></image>
								<view>
									{{item.praiseNum}}
								</view>
								</view>
						</view>
						<view class="contP">{{item.commentContent}}</view>
						<view class="time2">{{item.createTimeShow}}</view>
					</view>
				</view>
			</view>
		</view>
		<uni-popup ref="login" type="center" :custom="true" :maskClick="false">
			<view class="loginCon" :style="{ height: scrollH+'px' }">
				<view class="con" >
					<view class="top">允许微信授权</view>
					<view class="middle">使用微信登录，发现身边精彩</view>
					<image src="../../static/h.png" mode=""></image>
					<button open-type="getUserInfo" @getuserinfo="getuserinfo" :disabled="isDisabled">授权</button>
				</view>
			</view>
		</uni-popup>
		<!-- <view class="openAPP flex" :style="{ bottom: bottom }">
			<image src="../../static/blackHere.png" mode=""></image>
			<view>APP内打开</view>
		</view> -->
		<button open-type="launchApp" :app-parameter="wechat" @error="launchAppError" class="openAPP flex" :style="{ bottom: bottom }" v-if="isApp">
			<image src="../../static/blackHere.png" mode=""></image>
			<view>APP内打开</view>
		</button>
		<uni-popup ref="popup" type="center" :custom="true" :maskClick="false">
		
			<view class="content">
				<image src="../../static/h.png" mode=""></image>
				<view class="content_">还没拥有Here? {{isIOS?'AppStore':'应用市场'}}搜索“here” 即刻发现身边的精彩吧</view>
		
				<view class="click">
					<view class="cancel" @tap="close">取消</view>
					<view class="comfirm" @tap="know">知道了</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	export default {
		components: {
			uniPopup
		},
		onLoad(res) {
			let bodys = uni.getSystemInfoSync();
			this.scrollH = bodys.windowHeight;
			this.bottom = this.scrollH * 0.15 + 'px';
			this.shop = res.shop||''
			this.cardId = res.id
			// console.log(res)
			// 首页跳转
			if(res.shop==1){
				this.cardUrlType = res.cardUrlType
				if(!uni.getStorageSync('userInfo').token){
					// this.$refs.login.open();
					this.getDetails()
				}else{
					this.token = uni.getStorageSync('userInfo').token
					this.userId = uni.getStorageSync('userInfo').userId
					this.getDetails()
				}
			}else{
				// app跳转
				this.isApp = true
				this.wechat = 'id=' + res.id + '&type=A'+'&isvideo=0'
				this.cardId = res.id
				if(!uni.getStorageSync('userInfo').token){
					this.getDetails()
					// this.$refs.login.open();
					// wx.hideHomeButton()
					// this.userId = uni.getStorageSync('userInfo').userId
				}else{
					this.token = uni.getStorageSync('userInfo').token
					this.userId = uni.getStorageSync('userInfo').userId
					this.getDetails()
				}
				
			}
		},
		onReady() {
			
		},
		onShareAppMessage() {
			return {
				title: this.title,
				path:'/pages/mood/mood?id='+this.cardId +'&shop=1',
				withShareMenu: true,
				imageUrl:this.cardUrl,
			}
			// wx.showShareMenu({
			// 	withShareMenu: true,
			// 	success: (e)=> {
			// 	},
			// 	fail: ()=> {}
			// })
		},
		onReachBottom() {
			this.getCommentList()
		},
		// onReady() {
		// 	let bodys = uni.getSystemInfoSync();
		// 	this.scrollH = bodys.windowHeight;
		// 	this.bottom = this.scrollH * 0.15 + 'px';
		// },
		data() {
			return {
				shop: '',
				scrollH:0,
				bottom: 0,
				swiperList: [],
				dotStyle: false,
				title: "",
				content: "",
				time: '',
				cardId: '',
				userId:'',//登录人ID
				userIdBeLook:'',//被查看人ID
				cardUrlType:'',
				cardUrl:'',
				total: 0,
				pageSize: 10, //limit
				pageNumber: 0, //start
				isloadMore: false,
				commentList:[],
				beg: false ,//请求中不允许点或者重复发请求
				height: 0,
				isDisabled: false,
				isApp: false,
				isAttention:'',
				nickname:'',
				portrait:'',
				topicId:'',//官方活动ID
				wechat:'',
				isIOS:false
			};
		},
		methods:{
			launchAppError(e) {
				if (e.type == "error") {
					if(uni.getSystemInfoSync().system.includes('iOS')){
						this.isIOS = true
					}
					this.$refs.popup.open();
				}
			},
			know(){
				this.$refs.popup.close();
				// if(uni.getSystemInfoSync().system.includes('iOS')){
				
				// 	this.$refs.popup.close();
				// }else{
				// 	uni.navigateTo({
				// 		url: '../webview/webview'
				// 	})
				// }
				
			},
			close() {
				this.$refs.popup.close();
			},
			getDetails(){
				uni.showLoading({
					title: '加载中'
				});
				let data = {
					userId: this.userId,
					cardId: this.cardId
				}
				this.$http.post(this.$api.cardInfo, {
					data: data,
					header: {
						'content-type': 'application/json;charset=UTF-8',
						'token': this.token
					}
				}).then(res => {
					if (res.data.code == 0) {
						uni.hideLoading()
						var list = [];
				
						res.data['data']['resList'].forEach(function(res, index) {
							var imgpath = res.resUrl.replace('http://wykj-here.oss-cn-hangzhou.aliyuncs.com/',
								'https://wykj-here.oss-cn-hangzhou.aliyuncs.com/');
							list[index] = imgpath;
						})
						if (res.data.data.cardUrlSpec) {
							res.data.data.cardUrlSpec = Number(res.data.data.cardUrlSpec) * 750
						} else {
							res.data.data.cardUrlSpec = 750
						}
						this.height = 'height:' + res.data.data.cardUrlSpec + 'rpx'
						this.swiperList = list;
						this.title = res.data['data']['cardTitle'];
						this.content = res.data['data']['cardContent'];
						this.time = res.data.data.createTimeShow
						this.isAttention = res.data.data.isAttention
						this.nickname = res.data.data.nickname
						this.portrait = res.data.data.portrait
						this.userIdBeLook = res.data.data.userId
						this.topicId = res.data.data.topicId||''
						this.cardUrl = res.data.data.cardUrl
						this.getCommentList()
				
					}else if(res.data.code == 403){
						uni.clearStorageSync();
						uni.reLaunch({
							url:'../login/login'
						})
						let data = {
							type: 'A',
							id: this.cardId,
							isvideo: 0,
							shop: this.shop||''
						}
						uni.setStorageSync('data', data)
						uni.hideLoading()
						// this.$refs.login.open();
						// uni.clearStorageSync();
					}else {
						this.toast(res.data.msg)
					}
				
				})
			},
			getCommentList(){
				if(this.isloadMore||this.beg) return
				this.beg = true
				let params ={
					parentId: -1,
					cardId: this.cardId,
					start: this.pageNumber,
					limit: this.pageSize
				}
				this.$http.post(this.$api.getComment,{
					data: params,
					header: {
						'content-type': 'application/json;charset=UTF-8',
						'token': this.token
					}
				}).then(i=>{
					if(i.data.code == 0){
						this.commentList = [...this.commentList,...i.data.data.list]
						// if(i.data.data.list.length == 0){
						// 	this.total = 0
						// }else{
						// 	this.total = i.data.data.totalNum
						// }
						this.pageNumber+=10
						this.total = i.data.data.totalNum
						let total =  this.pageNumber;
						
						if (!i.data.data.list.length || total >= i.data.data.totalNum || i.data.data.totalNum <= this.pageSize) {
							this.isloadMore = true;
							this.loadMore = '没有更多数据了';
						}
						this.beg = false
						uni.hideLoading();
					}else{
						this.beg = false
						this.toast(ii.data.msg)
					}
				})
			},
			// 点击关注
			keepEye(){
				if(this.beg) return
				let url = ''
				if(this.isAttention == 0){
					url = this.$api.addAttention
				}else{
					url = this.$api.removeAttention
				}
				this.beg = true
				uni.showLoading({
					title: '加载中'
				});
				let params = {
					attentionType:0,
					attentionObject: this.cardId,
					fromUserId:this.userId,
					toUserId: this.userIdBeLook,
					token: this.token
				}
				this.$http.post(url, {
					data: params,
					header: {
						'content-type': 'application/json;charset=UTF-8',
						'token': this.token
					}
				}).then(res=>{
					if(res.data.code == 0){
						// uni.hideLoading()
						this.beg = false
						if(this.isAttention == 0){
							this.isAttention = 1
							this.toast('关注成功')
						}else{
							this.isAttention = 0
							this.toast('取消关注成功')
						}
					}else{
						this.toast(res.data.msg)
						this.beg = false
					}
				})
			},
			getuserinfo(e) {
				if(this.isDisabled) return
				this.isDisabled = true
				if (e.detail.userInfo) {
					// console.log(e)
					var obj={
						// iv:e.detail.iv,
						// encryptedData:e.detail.encryptedData
						sex:e.detail.userInfo.gender,
						nickname: e.detail.userInfo.nickName,
						portrait: e.detail.userInfo.avatarUrl
					}
					// return
					this.mixclickLogin(obj)
				} else {
					uni.showToast({
						icon: 'none',
						title: '同意授权后可登录'
					});
					this.isDisabled = false
				}
			},
			//获取用户信息
			mixclickLogin(obj) {
				uni.showLoading({
					title: '登录中，请稍等'
				})
				wx.login({
					success:(res)=> {
						if (res.code) {
							// uni.switchTab({
							// 	url: '../index/index'
							// })
							let params = {
								code: res.code,
								appid: 'wx3cccf63d0819e7b1',
								secret: '5c7ce3acccc34766de79e779082a63a3'
							}
							// params = JSON.stringify(params);
							this.$http.post(this.$api.getOpenid, {
								data: params,
								header: {
									'content-type': 'application/json;charset=UTF-8',
								}
							}).then(e => {
								if (e.data.code == 0) {
									// if(!e.data.data.unionid){
									// 	uni.showToast({
									// 		title: '微信授权失败',
									// 		duration: 2000,
									// 		icon: 'none'
									// 	});
									// 	this.isDisabled = false
									// 	return
									// }
									this.mixsendUnionidLogin(e.data.data.unionid, e.data.data.openid, obj)
								} else {
									this.isDisabled = false
									this.toast(e.data.msg)
								}
							})
						} else {
							this.isDisabled = false
							uni.showToast({
								title: res.errMsg,
								duration: 2000,
								icon: 'none'
							});
						}
					}
				})
			},
			//本地unionid登陆
			mixsendUnionidLogin(unionid, openid, obj) {
				let params = {
					thrAccount: openid,
					// thrAccount: unionid,
					thrType: '3',
					sex: obj.sex,
					nickname: obj.nickname,
					portrait: obj.portrait
				}
				uni.showLoading({
					title: '登录中...'
				});
				this.$http.post(this.$api.loginWechat, {
					data: params,
					header: {
						'content-type': 'application/json;charset=UTF-8',
					}
				}).then(res => {
					if(res.data.code == 0){
						this.token = res.data.data.token
						uni.hideLoading()
						let userInfo = {
							userId: res.data.data.userId,
							mobile: res.data.data.mobile,
							sex: res.data.data.sex,
							token: res.data.data.token,
							nickname: res.data.data.nickname,
							portrait: res.data.data.portrait
							
						}
						this.userId = res.data.data.userId
						this.token = res.data.data.token
						uni.setStorageSync('userInfo', userInfo)
						this.getDetails()
						this.$refs.login.close();
						// this.isDisabled = false
					}else{
						this.toast(e.data.msg);
						this.isDisabled = false
					}
				})
			},
		}
	}
</script>

<style lang="less" scoped>
	.state {

		width: 750rpx;
		// box-sizing: border-box;

		.toHere {
			position: absolute;
			top: 0;
			z-index: 999;
			width: 100%;
			background: rgba(0, 0, 0, 0.4);
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 22rpx 31rpx 23rpx 36rpx;
			box-sizing: border-box;

			.icon {
				display: flex;
				justify-content: space-between;
				align-items: center;

				image {
					height: 84rpx;
					width: 84rpx;
					border-radius: 50%;
					margin-right: 20rpx;
				}

				.name{
					font-size: 30rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: rgba(255,255,255,0.8);
				}
			}

			.downLoad {
				width: 106rpx;
				height: 51rpx;
				line-height: 51rpx;
				text-align: center;
				border: 2rpx solid #FFFFFF;
				border-radius: 12rpx;
				font-size: 24rpx;
				font-family: PingFang SC;
				font-weight: 600;
				color: #FFFFFF;
			}
			.keepEye{
				border: 2rpx solid #8A8A8A;
				color: #8A8A8A;
			}
		}

		.image {
			height: 750rpx;
			width: 750rpx;

			.swiper {
				width: 100%;
				height: 100%;

				image {
					height: 100%;
					width: 100%;
				}
			}
		}

		.headPortrait {
			margin-top: 15rpx;
			padding: 0 34rpx;
			box-sizing: border-box;

			.flex {
				align-items: center;

				image {
					width: 84rpx;
					height: 84rpx;
					border-radius: 50%;
				}

				view {
					font-weight: bold;
					margin-left: 15rpx;

				}
			}

			.focus {
				width: 106rpx;
				height: 51rpx;
				border: 1rpx solid #ff0101;
				border-radius: 10rpx;
				color: #ff0101;
				font-size: 24rpx;
				text-align: center;
				line-height: 51rpx;

			}
		}
		.titS{
			margin-top: 28rpx;
			padding: 0 34rpx;
			box-sizing: border-box;
			box-sizing: border-box;
			font-size: 32rpx;
			font-family: PingFang SC;
			font-weight: 600;
			color: #000000;
		}

		.describe {
			margin-top: 15rpx;
			padding: 0 34rpx;
			box-sizing: border-box;
			font-size: 30rpx;
			font-family: PingFang SC;
			font-weight: 400;
			padding-bottom: 10rpx;
			box-sizing: border-box;
		}
		.time{
			padding: 0 34rpx;
			box-sizing: border-box;
			font-size: 20rpx;
			font-family: PingFang SC;
			font-weight: 600;
			color: #BCBCBC;
		}
		.pinglun{
			margin-top: 60rpx;
			padding: 0 34rpx;
			box-sizing: border-box;
			.total{
				margin-bottom: 20rpx;
				font-size: 32rpx;
				font-family: PingFang SC;
				font-weight: 600;
				color: #000000;
				text{
					font-size: 24rpx;
					color: rgba(188, 188, 188, 1);
				}
			}
			.listP{
				.itemsP{
					margin-bottom: 25rpx;
					image{
						width: 84rpx;
						height: 84rpx;
						border-radius: 50%;
					}
					.right{
						margin-left: 21rpx;
						flex: 1;
						.name{
							.name1{
								
								font-size: 26rpx;
								font-family: PingFang SC;
								font-weight: 500;
								color: #9A9A9A;
							}
							.zan{
								align-items: center;
								font-size: 22rpx;
								font-family: PingFang SC;
								font-weight: 400;
								color: #989898;
								image {
									width: 30rpx;
									height: 30rpx;
									margin-right: 8rpx;
								
								}
								
							}
						}
						.contP{
							margin-top: 10rpx;
							width: 492rpx;
							font-size: 26rpx;
							font-family: PingFang SC;
							font-weight: 500;
							color: #343434;
						}
						.time2{
							margin-top: 10rpx;
							font-size: 18rpx;
							font-family: PingFang SC;
							font-weight: 500;
							color: #9A9A9A;
						}
					}
				}
			}
		}
		uni-popup{
			.loginCon{
				width: 750rpx;
				background: #333333;
				overflow: hidden;
				view{
					line-height: 1;
				}
				.con{
					margin-top: 350rpx;
					margin-left: 85rpx;
					width: 580rpx;
					background: #FFFFFF;
					border-radius: 20rpx;
					overflow: hidden;
					.top{
						text-align: center;
						margin-top: 60rpx;
						font-size: 36rpx;
						font-family: PingFang SC;
						font-weight: 600;
						color: #000000;
					}
					.middle{
						margin-top: 38rpx;
						text-align: center;
						font-size: 24rpx;
						font-family: PingFang SC;
						font-weight: 600;
						color: #999999;
					}
					image{
						width: 155rpx;
						height: 155rpx;
						margin: 83rpx 0 0 214rpx;
					}
					button{
						margin-top: 85rpx;
						width: 100%;
						background: #FDD10A;
						height: 100rpx;
						line-height: 100rpx;
						text-align: center;
						font-size: 34rpx;
						font-family: PingFang SC;
						font-weight: 600;
						color: #343434;
						
						
					}
				}
			}
		}
		uni-popup {
			.content {
				background: rgba(255, 255, 255, 1);
				padding-top: 34rpx;
				width: 480rpx;
				border-radius: 30upx;
				box-sizing: border-box;
				display: flex;
				flex-direction: column;
		
				image {
					width: 120rpx;
					height: 120rpx;
					margin-left: 180rpx;
				}
		
				.content_ {
					margin: 45rpx 0 53rpx 110rpx;
					
					text-align: center;
					width: 285rpx;
					font-size: 26rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #666666;
				}
		
				.click {
					display: flex;
					border-top: 1rpx solid #dedede;
		
					>view {
						font-size: 30upx;
						flex: 1;
						text-align: center;
						padding: 25rpx 0;
					}
		
					.cancel {
						border-right: 1rpx solid #dedede;
					}
		
					.comfirm {
						color: rgba(92, 146, 225, 1);
					}
				}
			}
			.loginCon{
				width: 750rpx;
				background: #333333;
				overflow: hidden;
				view{
					line-height: 1;
				}
				.con{
					margin-top: 350rpx;
					margin-left: 85rpx;
					width: 580rpx;
					background: #FFFFFF;
					border-radius: 20rpx;
					overflow: hidden;
					.top{
						text-align: center;
						margin-top: 60rpx;
						font-size: 36rpx;
						font-family: PingFang SC;
						font-weight: 600;
						color: #000000;
					}
					.middle{
						margin-top: 38rpx;
						text-align: center;
						font-size: 24rpx;
						font-family: PingFang SC;
						font-weight: 600;
						color: #999999;
					}
					image{
						width: 155rpx;
						height: 155rpx;
						margin: 83rpx 0 0 214rpx;
					}
					button{
						margin-top: 85rpx;
						width: 100%;
						background: #FDD10A;
						height: 100rpx;
						line-height: 100rpx;
						text-align: center;
						font-size: 34rpx;
						font-family: PingFang SC;
						font-weight: 600;
						color: #343434;
						
						
					}
				}
			}
		}
		

	}
</style>

<template>
	<!-- 活动卡和有合作的店铺卡 -->
	<view class="card">
		<scroll-view scroll-y class="scrollBox" :scroll-into-view="toView" :scroll-with-animation="true" :style="{ height: scrollH + 'px' }"
		 :show-scrollbar="false">
		<!-- 顶部主图 -->
		<view class="avator">
			<image :src="type=='D'?data.storeUrl:data.resList[0].resUrl" mode="aspectFill" class="master"></image>
			<image src="../../static/collect.png" mode="" class="collect" v-if="data.isCollect == 0"></image>
			<image src="../../static/collect_select.png" mode="" class="collect" v-if="data.isCollect == 1"></image>
			<view style="line-height: 1;" class="type" v-if="type == 'D'&&data.storeTag">{{data.storeTag}}</view>
			<view style="line-height: 1;" class="type" v-if="type == 'C'&&data.tagTitle">{{data.tagTitle}}</view>
		</view>
		<!--  -->
		
		<view class="conten">
			<view class="headline">{{type=='D'?data.storeTitle:data.activityTitle}}</view>
			<view class="here flex" v-if="type=='D'">
				<image src="../../static/logo.png" mode="" class="imgH"></image>
				<view class="by">by here</view>
			</view>
			<view class="here flex" v-if="type=='C'">
				<view class="qian">¥{{activityMinPrice}}</view>
				<image src="../../static/lingquan.png" mode="" class="lq" @tap="toCoupon" v-if="data.isBuy==0&&data.shareNum>0"></image>
			</view>
			<!-- 地址和日期 -->
			<!-- 地址 -->
			<view class="adress flex">
				<image class="img1" src="../../static/ditu_dingwei.png" mode=""></image>
				<view>{{type=='D'?data.storeAddress:data.activityAddress}}</view>
			</view>
			<!-- 日期 -->
			<view class="date flex">
				<image class="img2" src="../../static/riqi.png" mode=""></image>
				<view>{{type=='D'?data.storeStartTime:data.showActivityTime}}</view>
			</view>
			<view class="want justify-content-between">
				<view class="go">
					<view>他们想去</view>
					<view class="avatorGo flex">
						<view v-for="(item,index) in joinUser" :key="index">
							<image :src="type == 'D'?item.url:item.portrait" mode="aspectFill"></image>
						</view>
					</view>

				</view>
			</view>
		</view>
		<view class="activity" v-if="activityData[0]">
			<view class="tab flex">
				<view v-for="(item, index) in tab" :key="index" @tap="changeTab(item.id)" class="item">
					<view class="name">{{item.name}}</view>
					<view class="borderB" v-show="tabF == item.id"></view>
				</view>
			</view>
			<!-- 查看活动 -->
			<view class="look justify-content-between" v-for="(item, index) in activityData" :key="index" id="toView1">
				<view class="left flex">
					<image :src="item.activityUrl" mode="aspectFill"></image>
					<view style="flex:1; display: flex; flex-direction: column;justify-content: space-between;">
						<view class="view1">
							{{item.activityTitle}}
						</view>
						<view class="view5">¥{{item.activityMinPrice}}</view>
					</view>
				</view>
				<view class="right">
					<view class="get" @tap="lookActivity(item.cardActivityId)">查看</view>
				</view>
			</view>
			
		</view>
		<!-- 发现精彩大图 -->
		<!-- <view class="back">
			<rich-text :nodes="infos" class="images"></rich-text>
			<rich-text id="rich" :nodes="infos" style="margin-top: 0rpx;padding-top: 0rpx;" bindtap="tap"></rich-text>
		</view> -->
		<!-- <view class="html">
			<image class="faxian" src="../../static/faxain.png" mode=""></image>
			<rich-text id="rich" :nodes="infos" style="margin-top: 0rpx;padding-top: 0rpx;" bindtap="tap"></rich-text>
		</view> -->
		<view id="toView2" class="html" style="padding-right:33upx;padding-left: 33upx;margin-top: 30rpx;width: auto; height: auto;">
			<view class="position" :style="positionBg"></view>
			<image :style="imgFx" src="../../static/faxian.png" mode="" style="z-idenx:99999"></image>
			<view :style="videoStyle" v-if="videoUrl">
				<video  :src="videoUrl" style="width: 100%;height: 100%; object-fit: fill;"></video>
			</view>
			
			<rich-text id="rich" :nodes="infos" style="margin-top: 0rpx;padding-top: 0rpx;" bindtap="tap"></rich-text>
		</view>
		</scroll-view>
	<!-- 	<view class="html" style="padding-right:22upx;padding-left: 22upx;margin-top: 50rpx; box-sizing: border-box;">
			<rich-text id="rich" :nodes="infos" style="margin-top: 0rpx;padding-top: 0rpx;" bindtap="tap"></rich-text>
		</view> -->
		
		<!-- <view v-for="(src, index) in images" :key="index" v-if="images[0]" class="images">
			<image :src="src" mode=""></image>
			<view></view>
		</view> -->
		<!-- 头像和关注 -->

		<!-- <view class="openAPP flex" :style="{ bottom: bottom }">
			<image src="../../static/blackHere.png" mode=""></image>
			<view>APP内打开</view>
		</view> -->
		<button open-type="launchApp" :app-parameter="wechat" @error="launchAppError" class="openAPP flex" :style="{ bottom: bottom }" v-if="isApp">
			<image src="../../static/blackHere.png" mode=""></image>
			<view>APP内打开</view>
		</button>
		<!-- <button open-type="launchApp" :app-parameter="wechat" @error="launchAppError" class="openAPP flex" :style="{ bottom: bottom }" v-if="isApp">
			<image src="../../static/blackHere.png" mode=""></image>
			<view>APP内打开</view>
		</button> -->
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
		<view class="shareBtn">
			<button data-name="shareBtn" open-type="share" class="left" plain="true">
				<image src="../../static/icon_fenxiang@2x.png" mode=""></image>
			</button>
		</view>
	</view>
</template>

<script>
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	export default {
		components: {
			uniPopup
		},

		onLoad(res) {
			console.log(res)
			this.type = res.type
			// this.userId = res.userId
			this.shop = res.shop||''
			if (res.shop) {
				this.id = res.id
				// 从列表跳转
				if(!uni.getStorageSync('userInfo').token){
					this.getDetails()
					// this.$refs.login.open();
				}else{
					this.token = uni.getStorageSync('userInfo').token
					this.userId = uni.getStorageSync('userInfo').userId
					this.getDetails() 
				}
				
				}else{
					// app跳转
					this.isApp = true
					this.wechat = 'id=' + res.id + '&type=' + res.type
					this.id = res.id
					if(!uni.getStorageSync('userInfo').token){
						this.getDetails()
						// this.$refs.login.open();
						// wx.hideHomeButton()
						// this.userId = uni.getStorageSync('userInfo').userId
					}else{
						this.token = uni.getStorageSync('userInfo').token
						this.userId = uni.getStorageSync('userInfo').userId
						this.getDetails()
						// this.token = uni.getStorageSync('userInfo').token
					}
				}

		},
		onShareAppMessage() {
			return {
				title: this.type=='D'?this.data.storeTitle:this.data.activityTitle,
				path:'/pages/home/home?id='+this.id+'&type='+this.type +'&shop=1',
				withShareMenu: true,
				imageUrl:this.type=='D'?this.data.storeUrl:this.data.activityUrl,
			}
		},
		onReady() {
			let bodys = uni.getSystemInfoSync();
			this.scrollH = bodys.windowHeight;
			this.bottom = this.scrollH * 0.15 + 'px';
			// this.scrollH = this.scrollH*0.8+ 'px';
		},
		data() {
			return {
				shareTit:'',
				shop:'',
				scrollH:0,
				bottom: 0,
				tab: [{
						name: '活动',
						id: 0
					},
					{
						name: '详情',
						id: 1
					}
				],
				tabF: 0,
				type: '', //C是活动卡D是店铺卡
				nodes: [],
				htmls: '',
				imageUrl: '',
				imageBUrl: '',
				imgstyle: 'width:100px;height:200px;',
				joinUser: [],
				data: '',
				images: [],
				wechat: '' ,//带给app的数据
				isApp: false,
				infos:'',
				width:'',
				imgFx: '',
				positionBg:'',
				isDisabled: false,
				activityData:[],
				toView:'',
				videoUrl:'',
				videoStyle:'',
				activityMinPrice:0,
				isIOS: false
			};
		},
		methods: {
			// 去领券页面
			toCoupon(){
				uni.navigateTo({
					url:'../getCoupon/getCoupon?activityUrl='+this.data.activityUrl+'&activityTitle='+this.data.activityTitle+'&showActivityTime='+this.data.showActivityTime+'&cardActivityId='+this.data.cardActivityId+'&userId='+this.userId+'&cutPrice='+this.data.cutPrice+'&shareNum='+this.data.shareNum
				})
			},
			getDetails(){
				uni.showLoading({
					title: '加载中'
				});
				let params ={}
				if(this.type=='C'){
					params = {
						userId: this.userId,
						cardActivityId: this.id,
					}
				}else{
					params = {
						userId: this.userId,
						cardStoreId: this.id,
					}
				}
			
				let url = this.type == 'D' ? this.$api.findCardStoreInfo : this.$api.findCardActivityInfo
				this.$http.post(url, {
					data: params,
					header: {
						'content-type': 'application/json;charset=UTF-8',
						'token': this.token
					}
				}).then(result => {
					if (result.data.code == 0) {
						this.data = result.data.data;
						this.activityMinPrice = result.data.data.activityMinPrice
						let infos = ((this.type == 'D') ? this.data.info : this.data.activityContent)
						if(infos.includes('-->')){
							let num = infos.split('<!--').length -1; 
							for(var  i = 0;i<num;i++){
								let aa = infos.indexOf('<!--')
								let bb = infos.indexOf('-->')
								infos = infos.substr(0,aa)+''+infos.substr(bb+3,infos.length)
							}
						}
						if(infos.includes('video')){
							// this.video = 
							let start = infos.indexOf('<video')
							let end = infos.indexOf('</video>')
							let V= infos.substr(start,end+8)
							let Vs = V.indexOf('src="')
							V = V.substr(Vs+5, V.length)
							let Ve = V.indexOf('"')
							this.videoUrl = V.substr(0, Ve)
							infos = infos.substr(0,start)+''+infos.substr(end+8,infos.length)
						}
						// console.log(infos)
						let width = 0 
						uni.getSystemInfo({
							success: (res)=> {
								width = res.windowWidth
								// 5 320 +4
								// 678plus xr xrm 414 -4
								// 360 +2
								// 411 -4
								// 412 -4
								this.width = 'width:'+(width - 58)+'px'
							}
						});
						
					this.imgstyle = 'width:' + (width - 30) +
						'px;height:auto;margin-left:-22px;margin-right:-22px;margin-top:10px;margin-bottom:10px;box-shadow: #66666666 11px 11px 11px; -webkit-box-shadow: #66666666 0px 0px 11px; -moz-box-shadow: #66666666 0px 0px 11px;';
						this.videoStyle = 'width:' + (width - 30) +
							'px;height:225px;margin-left:0px;margin-right:-22px;margin-top:0px;margin-bottom:0px;box-shadow: #66666666 11px 11px 11px; -webkit-box-shadow: #66666666 0px 0px 11px; -moz-box-shadow: #66666666 0px 0px 11px;';
					infos = infos.replace(/mso-font-kerning:1.0000pt;"="/g, '');
					infos = infos.replace(/max-width: 100%;/g, this.imgstyle);
					infos = infos.replace(/max-width:100%;/g, this.imgstyle);
					infos = infos.replace( /<img/g, '<img style="'+ this.imgstyle + '" ');
					infos = infos.replace( /png" style="font-size: small;/g, 'png" ');
					infos = infos.replace( /<spanyes';/g, '<span style=" ');
					infos = infos.replace( /<span style="font-size: small;/g, '<span style="line-height:22px; ');
					infos = infos.replace( /span style="/g, 'span style="line-height:22px;  ');
					infos = infos.replace( /span face="宋体" style="/g, 'span style="line-height:22px;  ');
					infos = infos.replace( /font face="宋体" style="/g, 'font face="宋体" style="line-height:22px;  ');
					infos = infos.replace( /0,0,255/g, '0,0,0');
					infos = infos.replace( /line-height:150%;/g, ' ');
					infos = infos.replace( /color:blue;/g, '');
					infos = infos.replace(RegExp('http://wykj-here.oss-cn-hangzhou.aliyuncs.com/', 'gm'),
						'https://wykj-here.oss-cn-hangzhou.aliyuncs.com/');
					infos = infos.replace(RegExp('^<spanyes、.*>$', 'gm'), '<spanyes >');
					infos = infos.replace(RegExp('<spanyes', 'gm'), '<p');
					// infos = infos.replace(RegExp('</spanyes', 'gm'), '</p');
					infos = infos.replace(RegExp('<font', 'gm'), '<span');
					infos = infos.replace(RegExp('</font', 'gm'), '</span');
						let shipei = ''
						if(width == 320){
							shipei = 'width:' + (width - 50)
						}else if(width == 414||width == 411||width == 412){
							shipei = 'width:' + (width - 58)
						}else if(width == 360){
							shipei = 'width:' + (width - 52)
						}else if(width == 480){
							shipei = 'width:' + (width - 64)
						}else if(width == 768){
							shipei = 'width:' + (width - 88)
						}else{
							shipei = 'width:' + (width - 54)
						}
						var imgstyle =  shipei+
							'px;height:50px;margin-left: 11px;';
							this.positionBg =  shipei +
							'px;height:6px;margin-left: 11px;';
							// this.videoStyle =  shipei +
							// 'px;margin-left: 11px;height: 225px';
							this.imgFx = imgstyle
							// var imgstyle = 'width:' + (width - 58) +
							// 	'px;height:auto;margin-left:-10px;margin-right:auto;margin-top:0px;margin-bottom:10px;';
							// 	var imgstyle = 'width:' + (width - 58) +
							// 		'px;height:auto;margin-left:-10px;margin-right:auto;margin-top:0px;margin-bottom:10px;';
						// infos =
						// 	'<div style="padding-left:11px;padding-right:11px;padding-top:0px;padding-bottom:11px;margin-top:0px;box-sizing:border-box;"><div style="background-color:#fff;padding:10px;padding-top:15px;margin-top:0px;" box-sizing:border-box;><img src="/static/faxain.png" style="' +
						// 	imgstyle + '" ></img>' + (infos) + '</div></div>';
							infos =
								'<div style="padding-left:11px;padding-right:11px;padding-top:0px;padding-bottom:11px;margin-top:0px; box-sizing: border-box;"><div style="background-color:#fff;padding:10px;padding-top:15px;margin-top:0px; box-sizing: border-box;">' + (infos) + '</div></div>';
							this.infos = infos;
						// var infos = ((this.type == 'D') ? this.data.info : this.data.activityContent);
						// let cc = infos.match(/"(\S*)"/g);
						// cc.forEach(s => {
						// 	s = s.substr(1, s.length - 2)
						// 	this.images.push(s)
						// })
						uni.hideLoading()
						// 谁想去
						let aa = (this.type == 'D') ? {
							cardStoreId: this.id
						} : {
							cardActivityId: this.id
						}
						let urlA = this.type == 'D' ? this.$api.queryUser : this.$api.findActivityJoinUser
						this.$http.post(urlA, {
							data: aa,
							header: {
								'content-type': 'application/json;charset=UTF-8',
								'token': this.token
							}
						}).then(e => {
							var list = [];
							if (e.data.code == 0) {
								if (e.data.data.length > 4) {
									this.joinUser = e.data.data.slice(0, 4)
								} else {
									this.joinUser = e.data.data
								}
							}
							
						})
						if(this.type == 'D'){
							
							let p = {
								cardStoreId: this.id
							}
							this.$http.post(this.$api.findActivity,{
								data: p,
								header: {
									'content-type': 'application/json;charset=UTF-8',
									'token': this.token
								}
							}).then(d=>{
								if(d.data.code == 0){
									if(d.data.data){
										d.data.data.map(i=>{
											i.activityStartTime = i.activityStartTime.slice(0,10)
											i.activityEndTime = i.activityEndTime.slice(0,10)
										})
										this.activityData = d.data.data
										
									}
								}else{
									this.toast(d.data.msg)
								}
							})
						}
					}else if(result.data.code == 403){
						uni.hideLoading()
						uni.reLaunch({
							url:'../login/login'
						})
						// this.$refs.login.open();
						uni.clearStorageSync();
						let data = {
							type: this.type,
							id: this.id,
							shop: this.shop
						}
						uni.setStorageSync('data', data)
					} else {
						this.toast(result.data.msg)
					}
					uni.hideLoading()
				})
			},
			changeTab(id) {
				this.tabF = id
				if(this.tabF == 1){
					this.toView = 'toView2'
				}else{
					this.toView = 'toView1'
				}
			},
			launchAppError(e) {
				// console.log(e)
				if (e.type == "error") {
					if(uni.getSystemInfoSync().system.includes('iOS')){
						this.isIOS = true
					}
					this.$refs.popup.open();
				}
			},
			openLogin(){
				this.$refs.login.open();
			},
			// 关闭弹出层
			close() {
				this.$refs.popup.close();
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
				// uni.navigateTo({
				// 	url: '../webview/webview'
				// })
				// if(uni.getSystemInfoSync().system.includes('iOS')){
				// 	let href = 'ios'
				// 	uni.navigateTo({
				// 		url: '../webview/webview?href='+href
				// 	})
				// }else{
				// 	let href = 'andr'
				// 	uni.navigateTo({
				// 		url: '../webview/webview?href='+href
				// 	})
				// }
				// uni.navigateTo({
				// 	url: '../webview/webview'
				// })
				
			},
			// 查看活动
			lookActivity(id){
				uni.navigateTo({
					url:'../homeTwo/homeTwo?id='+id+'&type=C'+'&shop=1'
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
			// know(){
			// 	window.location.href = "https://sj.qq.com/myapp/detail.htm?apkName=com.wenyi.here"
			// }
		}
	}
</script>

<style lang="less" scoped>
	.card {
		width: 750rpx;
		// padding-bottom: 110rpx;
		box-sizing: border-box;
		background: rgba(0, 0, 0, 0.61);
		overflow: hidden;
		.avator {
			margin-top: 31rpx;
			margin-left: 43rpx;
			width: 664rpx;
			height: 374rpx;
			position: relative;

			.master {
				width: 100%;
				height: 100%;
			}

			.collect {
				position: absolute;
				width: 90rpx;
				height: 90rpx;
				right: -10rpx;
				bottom: -45rpx;

			}

			.type {
				position: absolute;
				top: 22rpx;
				left: 42rpx;
				background: #000000;
				opacity: 0.5;
				border-radius: 12rpx;
				padding: 16rpx 20rpx;
				font-size: 24rpx;
				font-family: PingFang SC;
				font-weight: 600;
				color: #FFFFFF;
			}
		}

		.conten {
			width: 706rpx;
			margin-left: 22rpx;
			background: #FFFFFF;
			padding: 72rpx 93rpx 22rpx 72rpx;
			box-sizing: border-box;

			.headline {
				font-size: 48rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #000000;
			}

			.here {
				margin-top: 35rpx;
				align-items: center;

				.imgH {
					width: 70rpx;
					height: 70rpx;
				}

				.by {
					margin-left: 11rpx;
					font-size: 30rpx;
					font-family: American Typewriter;
					font-weight: 600;
					color: #000000;
				}
				.qian{
					font-size: 36rpx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #FC4E27;
				}
				.lq{
					width: 90rpx;
					height: 48rpx;
					margin-left: 20rpx;
				}
				
			}

			.adress,
			.date {
				align-items: center;

				.img1 {
					width: 26rpx;
					height: 32rpx;
					margin-left: 3rpx;
				}

				.img2 {
					width: 32rpx;
					height: 26rpx;
				}

				view {
					flex:1;
					font-size: 24rpx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #000000;
					margin-left: 23rpx;
				}
			}

			.adress {
				margin-top: 46rpx;
			}

			.date {
				margin-top: 32rpx;
			}

			.want {
				margin-top: 89rpx;
				align-items: center;

				.go {
					width: 65%;

					view {
						font-size: 24rpx;
						font-family: PingFang SC;
						font-weight: 500;
						color: #000000;
					}

					.avatorGo {
						align-items: center;
						margin-top: 38rpx;
						position: relative;

						view {
							background: #FFFFFF;
							width: 70rpx;
							height: 70rpx;
							border: 4rpx solid #FFFFFF;
							border-radius: 35rpx;

							&:nth-child(1) {
								border: none;
							}

							&:nth-child(2n) {
								position: absolute;
								left: 50rpx;
							}

							&:nth-child(3n) {
								position: absolute;
								left: 100rpx;
							}

							&:nth-child(4n) {
								position: absolute;
								left: 150rpx;
							}

							image {
								width: 66rpx;
								height: 66rpx;
								border-radius: 33rpx;
							}
						}

					}
				}

				.byte {
					margin-left: 32rpx;

					.letter {
						font-size: 36rpx;
						font-family: PingFang SC;
						font-weight: 600;
						color: #000000;
					}

					.number {
						margin-top: 41rpx;
						font-size: 30rpx;
						font-family: PingFang SC;
						font-weight: 500;
						color: #000000;
					}
				}
				
			}
		}
		.html{
			position: relative;
		}
		.position{
			position: absolute;
			background: #FFFFFF;
			top: 49px;
		}

		.images {
			width: 706rpx;
			margin-left: 24rpx;
			// position: relative;
			// margin-bottom: 24rpx;


			image {
				width: 100%;
				height: 454rpx;
			}

			// view {
			// 	position: absolute;
			// 	top: 454rpx;
			// 	left: 21rpx;
			// 	width: 664rpx;
			// 	height: 40rpx;
			// 	background: #FFFFFF;
			// }
		}

		.activity {
			margin-top: 48rpx;

			.tab {
				margin-left: 44rpx;
				margin-bottom: 20rpx;

				.item {
					margin-right: 60rpx;

					.name {
						font-size: 36rpx;
						font-family: PingFang SC;
						font-weight: 500;
						color: rgba(255, 255, 255, 0.6);
					}

					.borderB {
						margin: 0rpx 0 0 18rpx;
						width: 32rpx;
						height: 4rpx;
						background: #FDD10A;
					}
				}

			}


			.look {
				background: #FFFFFF;
				width: 682rpx;
				margin: 0rpx 0 0 34rpx;
				padding: 33rpx 28rpx 35rpx 29rpx;
				box-sizing: border-box;
				flex: 1;
				&:nth-child(1){
					margin-top:20rpx;
				}

				.left {
					>image {
						width: 172rpx;
						height: 172rpx;
						background: rgba(0, 0, 0, 0.61);

					}

					>view {
						width: 314rpx;
						margin-left: 22rpx;

						.view1 {
							font-size: 32rpx;
							font-family: PingFang SC;
							font-weight: 500;
							color: #343434;
							display: -webkit-box;
							-webkit-line-clamp: 2;
							overflow: hidden;
							text-overflow: ellipsis;
							-webkit-box-orient: vertical;
							// height: 50rpx;
						}

						.view5{
							font-size: 36rpx;
							font-family: PingFang SC;
							font-weight: 500;
							color: #FC4E27;
							// margin-top: 90rpx;
						}
					}
				}

				.right {
					.get {
						padding: 14rpx 21rpx 15rpx 20rpx;
						box-sizing: border-box;
						background: #000000;
						border-radius: 6rpx;
						font-size: 30rpx;
						font-family: PingFang SC;
						font-weight: 600;
						color: #FFFFFF;
					}
				}
			}
		}
		.back{
			margin-top: 50rpx;
		}
		.faxian {
			// margin-top: 16rpx;
			width: 664rpx;
			height: 118rpx;
			// margin-left: 43rpx;
			z-index: 999;
			line-height: 1;
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
		.shareBtn{
			
			position: fixed;
			z-index: 999;
			bottom:138rpx;
			right:42rpx;
			button{
				border: 0;
				border-radius: 0;
			}
			image{
				width: 126rpx;
				height: 126rpx;
			}
		}

	}
</style>

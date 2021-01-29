<template>
	<view class="con" :style="{ height: scrollH + 'px' }">
		<view class="content">
			<image src="../../static/coupon/hongbao.png" mode="" class="hongbao"></image>
			<view class="details">

				<view class="top justify-content-between">
					<view class="num">邀请<span>{{shareNum}}</span>位好友领券即可获得</view>
					<view class="rule" @tap="openPopup">规则</view>
				</view>
				<view class="middle flex" :class="!isGet?'noGetImg':'getImg'">
					<image :src="activityUrl" mode="aspectFill" class="avator"></image>
					<view class="des">
						<view class="coup">
							<text class="symbol">¥</text>
							<text class="money">{{cutPrice}}</text>
							<text style="margin-left: 10rpx;">无门槛</text>
						</view>
						<view class="tit">{{activityTitle}}</view>
						<view class="time">{{showActivityTime}}</view>
					</view>
				</view>
				<view class="bottom">
					<view class="text" v-if="!numFlag">邀请好友吧</view>
					<view class="text" v-if="numFlag">已有<span> {{joinShareNum}} </span>位好友助力</view>
					<!-- 活动未结束 -->
					<view class="avator_List">
						<view v-for="(item, index) in avatorList" :key="index" :style="width">
							<image :src="item.portrait" mode="aspectFill"></image>
						</view>
						<!-- <view>
							<image src="../../static/coupon/tianjia.png" mode=""></image>
						</view> -->
					</view>
				</view>
				<view class="btn btnImgGrey" v-if="isGet||isOver">{{isOver?'活动结束':'助我领券'}}</view>
				<!-- 本人分享 -->
				<button data-name="shareBtn" open-type="share" :disabled="isDisabled" class="btn" :class="!isDisabled?'btnImgYellow':'btnImgGrey'"
				 v-if="!isGet&&!isOver&&userIdFlag">助我领券</button>
				<!-- 他人登录 -->
				<button open-type="getUserInfo" @getuserinfo="getuserinfo" :disabled="isDisabled" class="btn" :class="!isDisabled?'btnImgYellow':'btnImgGrey'"
				 v-if="!isGet&&!isOver&&!userIdFlag">助我领券</button>
			</view>
		</view>
		<uni-popup ref="popup" type="bottom" :custom="true" :maskClick="true">
			<view class="popUp">
				<view class="ruleL">使用规则</view>
				<view class="cow">{{rulesCon}}</view>
				<!-- <view class="cow">2.使用规则活动活动火火哈哈哈哈哈哈哈哈哈反反复复间距富就斤斤计较斤斤计较。</view> -->
				<view class="btn btns btnImgYellow" @tap="closePopup">关闭</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	export default {
		onLoad(res) {
			console.log(res)
			// let obj = uni.getStorageSync('userInfo')
			// // this.mixclickLogin(obj)
			// console.log(obj)
			// 获取规则
			this.getRules()
			// 获取当前时间
			let date = new Date()
			let year = date.getFullYear()
			let month = date.getMonth() + 1
			let day = date.getDate()
			this.activityUrl = res.activityUrl
			this.activityTitle = res.activityTitle || res.title
			this.cardActivityId = res.cardActivityId
			this.userId = res.userId
			this.cutPrice = res.cutPrice
			this.shareNum = Number(res.shareNum)
			this.showActivityTime = res.showActivityTime
			let str = res.showActivityTime.substr(res.showActivityTime.length - 10, res.showActivityTime.length)
			let arr = str.split('-')
			// 当前年份大于活动的年份
			if (Number(year) > Number(arr[0])) {
				this.toast("活动已结束")
				this.isOver = true
			} else if (Number(year) == Number(arr[0])) {
				// 年分相同当前月大于活动月
				if (Number(month) > Number(arr[1])) {
					this.toast("活动已结束")
					this.isOver = true
				} else if (Number(month) == Number(arr[1])) {
					if (Number(day) > Number(arr[2])) {
						this.toast("活动已结束")
						this.isOver = true
					}
				}
			}
			// this.findShareNum()
			// console.log(this.isGet)
			// if(uni.getStorageSync('userInfo').token){
			// 	this.getActivityJoinUser()

			// }else{

			// }
		},
		onShow() {
			this.findShareNum()
		},
		onShareAppMessage() {
			return {
				title: this.activityTitle,
				path: '/pages/getCoupon/getCoupon?activityUrl=' + this.activityUrl + '&activityTitle=' + this.activityTitle + '&cardActivityId=' + this.cardActivityId + '&userId=' + this.userId + '&cutPrice=' + this.cutPrice + '&shareNum=' + this.shareNum + '&showActivityTime=' + this.showActivityTime ,
				withShareMenu: true,
				imageUrl: this.activityUrl,
			}
			
		},
		components: {
			uniPopup
		},
		onReady() {
			uni.getSystemInfo({
				success: (res) => {
					this.scrollH = res.windowHeight
				}
			});
		},
		data() {
			return {
				token: '',
				userId: '',
				isDisabled: false,
				scrollH: 0,
				getImg: "background: url('../../static/coupon/ylq.png') no-repeat; background-size: 100%;", //已领券背景
				noGetImg: "background: url('../../static/coupon/wlq.png') no-repeat; background-size: 100%;", //未领券背景
				isGet: false, //是否已成功人满领券 false未满 true已满 默认false
				isOver: false, //是否活动结束 false未结束 true结束 默认false
				btnImgYellow: "background: url('../../static/coupon/yellow.png') no-repeat; background-size: 100%;", //黄色按钮
				btnImgGrey: "background: url('../../static/coupon/grey.png') no-repeat; background-size: 100%;",
				cardActivityId: '', //活动id
				isFrist: null, //0老用户 1新用户
				activityUrl: '',
				activityTitle: '',
				showActivityTime: '',
				avatorList: [], // 头像列表（未结束）
				isOverAvatorList: [{
					path: '../../static/coupon/tianjia_grey.png'
				}, {
					path: '../../static/coupon/tianjia_grey.png'
				}, {
					path: '../../static/coupon/tianjia_grey.png'
				}],
				cutPrice: 0,
				shareNum: 0, //需要的总人数
				joinShareNum: 0, // 已参与的人数
				numFlag: false, //false为没人参加 true为有人参加
				userIdFlag: false, //是否本人打开自己的分享false不是 true是
				rulesCon: '',
				disabled: false
			};
		},
		methods: {
			// 获取规则
			getRules() {
				let params = {
					objectType: 11
				}
				this.$http.post(this.$api.getRules, {
					data: params,
					header: {
						'content-type': 'application/json;charset=UTF-8',
						token: this.token || ''
					},
				}).then(res => {
					if (res.data.code == 0) {
						this.rulesCon = res.data.data.objectContent
					} else {
						this.toast(res.data.msg)
					}
				})
			},
			openPopup() {
				this.$refs.popup.open()
			},
			closePopup() {
				this.$refs.popup.close()
			},
			// 获取活动参与用户
			getActivityJoinUser() {
				let params = {
					cardActivityId: this.cardActivityId
				}
				this.$http.post(this.$api.getActivityJoinUser, {
					data: params,
					header: {
						'content-type': 'application/json;charset=UTF-8',
						token: this.token || ''
					},
				}).then(res => {
					if (res.data.code == 0) {
						let aa = res.data.data.some(item => {
							if ((item.userId == this.userId) && (this.userId == uni.getStorageSync('userInfo').userId)) {
								this.userIdFlag = true
								this.toast('您暂不能给自己助力，发送给朋友吧~')
								this.isDisabled = false
								return true
							}
						})
						if (aa) return
						if (this.userId == uni.getStorageSync('userInfo').userId) {
							this.userIdFlag = true
							this.toast('您暂不能给自己助力，发送给朋友吧~')
							this.isDisabled = false
							return true
						} else {
							this.avatorList.some(item => {
								if (item.user_id == uni.getStorageSync('userInfo').userId) {
									this.toast('您已经为好友助力过~')
									this.isDisabled = true
									return true
								}
								let obj = uni.getStorageSync('userInfo')
								let flag = 'flag'
								this.mixclickLogin(obj)
								if (item.portrait == '../../static/coupon/tianjia.png') {
									item.portrait = uni.getStorageSync('userInfo').portrait
									this.toast('助力成功')
									this.isDisabled = true
									this.joinShareNum = this.joinShareNum + 1
									if (this.joinShareNum == this.shareNum) {
										this.isGet = true
									}
									return true
								}
							})

						}

					} else {
						this.toast(res.data.msg)
					}
				})
			},
			// 获取邀请用户
			findShareNum() {
				this.avatorList = []
				let params = {
					cardActivityId: this.cardActivityId,
					userId: this.userId
				}
				uni.showLoading({
					title: '加载中'
				});
				this.$http.post(this.$api.findShareNum, {
					data: params,
					header: {
						'content-type': 'application/json;charset=UTF-8',
						token: this.token || ''
					},
				}).then(res => {
					if (res.data.code == 0) {
						uni.hideLoading()
						// 没人参与
						if (res.data.data.length < 1) {
							for (var i = 0; i < this.shareNum; i++) {
								let avator = {
									user_id: '',
									nickname: "",
									portrait: "../../static/coupon/tianjia.png"
								}
								let avator1 = {
									user_id: '',
									nickname: "",
									portrait: "../../static/coupon/tianjia_grey.png"
								}
								this.avatorList.push(this.isOver ? avator1 : avator)
							}
							if (uni.getStorageSync('userInfo').token) {
								// console.log(this.userId)
								if (this.userId == uni.getStorageSync('userInfo').userId) {
									this.userIdFlag = true
									// this.toast('您暂不能给自己助力，发送给朋友吧~')
									this.isDisabled = false
									return
								}
								let obj = uni.getStorageSync('userInfo')
								// this.getActivityJoinUser()
								this.mixclickLogin(obj)
							} else {

							}

						} else {
							// 有人参与
							this.avatorList = res.data.data
							console.log(this.avatorList)
							// 剩余人数 = 总分享人数shareNum - 已经分享人数joinShareNum
							let number = this.shareNum - res.data.data.length
							this.joinShareNum = res.data.data.length
							if (this.joinShareNum >= this.shareNum) {
								if (!this.isOver) {
									this.toast("助力人数已满")
								}
								this.isGet = true
								this.isDisabled = true
								this.numFlag = true
								return
							}

							if (number > 0) {
								for (var i = 0; i < number; i++) {
									let avator = {
										user_id: '',
										nickname: "",
										portrait: "../../static/coupon/tianjia.png"
									}
									let avator1 = {
										user_id: '',
										nickname: "",
										portrait: "../../static/coupon/tianjia_grey.png"
									}
									this.avatorList.push(this.isOver ? avator1 : avator)
								}

								if (this.isGet || this.isOver) return
								if (uni.getStorageSync('userInfo').token) {
									console.log(this.userId)
									if (this.userId == uni.getStorageSync('userInfo').userId) {
										this.userIdFlag = true
										this.toast('您暂不能给自己助力，发送给朋友吧~')
										this.isDisabled = false
										return
									}
									let obj = uni.getStorageSync('userInfo')
									// this.getActivityJoinUser()
									this.mixclickLogin(obj)
								} else {

								}
							}
							// else{
							// 	// let obj = uni.getStorageSync('userInfo')
							// 	// this.mixclickLogin(obj)
							// 	// // 邀请用户人数和需要邀请人数茶为0时代表已经获得了
							// 	this.isGet = true
							// 	this.isDisabled = true
							// 	this.numFlag = true
							// }

							this.numFlag = true
						}
						uni.hideLoading()
					} else {
						this.toast(res.data.msg)
					}
				})
			},
			getuserinfo(e) {
				if (this.isDisabled) return
				this.isDisabled = true
				if (e.detail.userInfo) {
					console.log(e)
					var obj = {
						// iv:e.detail.iv,
						// encryptedData:e.detail.encryptedData
						sex: e.detail.userInfo.gender,
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
					title: '请稍等'
				})
				wx.login({
					success: (res) => {
						if (res.code) {
							// uni.switchTab({
							// 	url: '../index/index'
							// })
							let params = {
								code: res.code,
								appid: 'wx3cccf63d0819e7b1',
								secret: '5c7ce3acccc34766de79e779082a63a3'
							}
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
			mixsendUnionidLogin(unionid, openid, obj) {
				console.log(obj)
				let params = {
					thrAccount: openid,
					// thrAccount: unionid,
					thrType: '3',
					sex: obj.sex,
					nickname: obj.nickname,
					portrait: obj.portrait,
					cardActivityId: this.cardActivityId,
					fromUserId: this.userId
				}
				uni.showLoading({
					title: '请稍候...'
				});
				this.$http.post(this.$api.loginWechat, {
					data: params,
					header: {
						'content-type': 'application/json;charset=UTF-8',
					}
				}).then(res => {
					if (res.data.code == 0) {

						uni.hideLoading()
						let userInfo = {
							userId: res.data.data.userId,
							// userId: 947,
							mobile: res.data.data.mobile,
							sex: res.data.data.sex,
							token: res.data.data.token,
							nickname: res.data.data.nickname,
							portrait: res.data.data.portrait

						}
						uni.setStorageSync('userInfo', userInfo)
						if (this.userId == uni.getStorageSync('userInfo').userId) {
							this.userIdFlag = true
							this.toast('您暂不能给自己助力，发送给朋友吧~')
							this.isDisabled = false
							return true
						} else {
							this.avatorList.some(item => {
								if (item.user_id == uni.getStorageSync('userInfo').userId) {
									this.toast('您已经为好友助力过~')
									this.isDisabled = true
									return true
								}
								if (item.portrait == '../../static/coupon/tianjia.png') {
									item.portrait = uni.getStorageSync('userInfo').portrait
									this.toast('助力成功')
									this.isDisabled = true
									this.joinShareNum = this.joinShareNum + 1
									if (this.joinShareNum == this.shareNum) {
										this.isGet = true
									}
									return true
								} else {

								}
							})

						}
						// if(flag) return
						// this.getActivityJoinUser()
						// this.isFrist = res.data.data.isFrist//0是老用户1是新用户
						// if(res.data.data.isFrist == 0){
						// 		this.toast('您已是老用户，暂不能助力~')
						// 		this.isDisabled = true


						// }else{
						// 	this.avatorList.some(item=>{
						// 		if(item.path=='../../static/coupon/tianjia.png'){
						// 			item.path=res.data.data.portrait
						// 			return true
						// 		}else{
						// 			return false
						// 		}
						// 	})
						// }
					} else {
						this.toast(e.data.msg);
						this.isDisabled = false
					}
				})
			},
		}
	}
</script>

<style lang="less" scoped>
	.con {
		background-color: #F2F2F2;
		overflow: hidden;
		position: relative;

		view {
			line-height: 1;
		}

		.hongbao {
			position: absolute;
			top: 160rpx;
			left: 60rpx;
			width: 71rpx;
			height: 69rpx;
		}

		.content {
			background: url('data:image/png;base64,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') no-repeat;
			background-size: 100%;
			// height: 509rpx;
			// width: 750rpx;

			overflow: hidden;

			.details {
				margin-top: 193rpx;
				padding-bottom: 70rpx;
				box-sizing: border-box;
				background: url('../../static/coupon/baidi.png') no-repeat;
				background-size: 100%;

				// background: #FFFFFF;
				// box-shadow: 0rpx 0rpx 19rpx 1rpx rgba(253, 209, 10, 0.2);
				// border-radius: 20rpx;
				.top {
					margin-top: 59rpx;
					padding: 66rpx 51rpx 0 51rpx;
					box-sizing: border-box;

					.num {
						font-size: 28rpx;
						font-family: PingFang SC;
						font-weight: 400;
						color: #696969;

						span {
							color: #FF672D;
						}
					}

					.rule {
						width: 82rpx;
						height: 42rpx;
						line-height: 42rpx;
						text-align: center;
						background: #888888;
						border-radius: 21rpx;
						font-size: 28rpx;
						font-family: PingFang SC;
						font-weight: 400;
						color: #FFFFFF;
					}
				}

				.middle {
					width: 676rpx;
					margin: 17rpx 0 0 37rpx;

					.avator {
						background: #FFFFFF;
						width: 142rpx;
						height: 142rpx;
						border-radius: 10rpx;
						margin: 39rpx 20rpx 37rpx 37rpx;
					}

					.des {
						font-size: 24rpx;
						font-family: PingFang SC;
						font-weight: 500;
						color: #FB5D0B;

						.coup {
							// align-items: bottom;
							margin-top: 50rpx;

							.symbol {
								font-size: 26rpx;
							}

							.money {
								font-size: 56rpx;
							}
						}

						.tit {
							font-weight: 400;
							margin-top: 10rpx;
						}

						.time {
							font-weight: 400;
							margin-top: 12rpx;
						}
					}
				}

				// getImg:"background: url('../../static/coupon/ylq.png') no-repeat; background-size: 100%;",//已领券背景
				// noGetImg:"background: url('../../static/coupon/wlq.png') no-repeat; background-size: 100%;",//未领券背景
				.getImg {
					background: url('../../static/coupon/ylq.png') no-repeat;
					background-size: 100%;
				}

				.noGetImg {
					background: url('../../static/coupon/wlq.png') no-repeat;
					background-size: 100%;
				}

				.bottom {
					margin-top: 24rpx;

					.text {
						text-align: center;
						font-size: 28rpx;
						font-family: PingFang SC;
						font-weight: 400;
						color: #888788;

						span {
							color: #FF672D;
						}
					}

					.avator_List {
						display: flex;
						justify-content: center;
						align-items: center;
						margin-top: 34rpx;
						box-sizing: border-box;
						// flex-wrap: wrap;

						view {
							// margin-bottom: 15rpx;
							// align-items: center;
							// width:25%;
							// text-align: center;
							padding-left: 20rpx;
							box-sizing: border-box;

							&:nth-child(1) {
								padding-left: 0rpx;
							}

							// &:nth-child{
							// 	padding-left: 0rpx;
							// }
							image {
								width: 76rpx;
								height: 76rpx;
								border-radius: 50%;
							}
						}
					}
				}

			}

		}

		.btn {
			width: 544rpx;
			height: 92rpx;
			line-height: 92rpx;
			text-align: center;
			margin: 44rpx 103rpx 0 103rpx;
			font-size: 30rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #000000;
			font-weight: 500;
		}

		// btnImgYellow:"background: url('../../static/coupon/yellow.png') no-repeat; background-size: 100%;",//黄色按钮
		// btnImgGrey:"background: url('../../static/coupon/grey.png') no-repeat; background-size: 100%;",
		.btnImgYellow {
			background: url('../../static/coupon/yellow.png') no-repeat;
			background-size: 100%;
		}

		.btnImgGrey {
			background: url('../../static/coupon/grey.png') no-repeat;
			background-size: 100%;
		}

		.popUp {
			// width: 750rpx;
			height: 768rpx;
			background: #FFFFFF;
			border-radius: 30rpx 30rpx 0rpx 0px;
			// position: relative;
			overflow: hidden;

			.ruleL {
				margin: 62rpx 0 40rpx 42rpx;
				font-size: 28rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #010101;
			}

			.cow {
				padding: 0 43rpx 0 42rpx;
				box-sizing: border-box;
				margin-bottom: 10rpx;
				font-size: 26rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #5D5D5D;
				line-height: 49rpx;
			}

			.btns {
				position: fixed;
				bottom: 36rpx;
			}
		}
	}
</style>

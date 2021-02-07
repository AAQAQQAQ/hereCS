<template>
	<view class="content">
		<view class="fixed">
			<view class="search-box">
				<mSearch :show="false" @search="search($event, 1)" placeholder="搜索" :focus="false" :iconSelct="2" style="width:100%;"></mSearch>
			</view>
			<view class="flex" v-if="!isSearch">
				<view v-for="(item, index) in tab" :key="index" @tap="changeTab(item.id)"><span :class="tabId == item.id?'border':''">{{item.name}}</span></view>
			</view>
			<view class="flex" v-if="isSearch">
				<view v-for="(item, index) in tab1" :key="index" @tap="changeTab1(item.id)"><span :class="tabId1 == item.id?'border':''">{{item.name}}</span></view>
			</view>
		</view>
		<scroll-view scroll-y :scroll-with-animation="true" :style="{ height: scrollH + 'px' }" class="scrollBox" @scrolltolower="tolower">
		
		<!-- <eimlFlow :list="recommendList" :columnNum="2" v-if="tabId == 0">
			<view class="items" v-for="(item, index) in recommendList" :key="index" @tap="linkTo(item.cardUrlType,item.cardId,item.userId)">
				<image :src="item.cardUrl" mode="" :style="item.cardUrlSpec" class="masterImg"></image>
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
		</eimlFlow> -->
	<!-- 首页 -->
		<view class="block_i" v-if="tabId == 0&&!isSearch">
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
		<view class="block_i" v-if="tabId == 1&&!isSearch">
			<view class="list" style="margin-left: 22rpx">
				<view class="items" v-for="(item,index) in oneList1" :key="index" @tap="linkTo(item.cardUrlType,item.cardId,item.userId)">
					<image :src="item.cardUrl" mode="aspectFill" class="masterImg" :style="item.cardUrlSpec"></image>
					<view class="tit">{{item.cardTitle}}</view>
					<view class="des" v-if="item.indexType != 0">{{item.cardContent}}</view>
					<view class="justify-content-between person" v-if="item.indexType != 0">
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
				<view class="items" v-for="(item,index) in twoList1" :key="index" @tap="linkTo(item.cardUrlType,item.cardId,item.userId)">
					<image :src="item.cardUrl" mode="aspectFill" class="masterImg" :style="item.cardUrlSpec"></image>
					<view class="tit">{{item.cardTitle}}</view>
					<view class="des" v-if="item.indexType != 0">{{item.cardContent}}</view>
					<view class="justify-content-between person" v-if="item.indexType != 0">
						<view class="flex avator">
							<image :src="item.portrait" mode=""></image>
							<view>{{item.nickname}}</view>
						</view>
						<view class="flex like">
							<!-- 未 -->
							<image src="../../static/zan2@2x.png" mode="" v-if="item.isPraise == 0"></image>
							<!-- 已 -->
							<image src="../../static/zan1@2x.png" mode="" v-if="item.isPraise != 0"></image>
							<view>{{item.praiseNum||0}}</view>
						</view>
					</view>
					<image class="video" src="../../static/icon/video.png" mode="" v-if="item.cardUrlType == 1"></image>
					<view class="official" :style="item.top" v-if="item.indexType == 0">#官方</view>
				</view>
			</view>
		</view>
		<!-- 搜索 -->
		<view class="block_i" v-if="tabId1 == 0&&isSearch&&ishave">
			<view class="list" style="margin-left: 22rpx">
				<view class="items" v-for="(item, index) in oneList11" :key="index" @tap="linkTo(item.cardUrlType,item.cardId,item.userId,item.cardType)">
					<image :src="item.cardUrl" mode="aspectFill" class="masterImg" :style="item.cardUrlSpec"></image>
					<view class="tit">{{item.cardTitle}}</view>
					<view class="des" v-if="item.cardType!=0&&item.cardType!=1&&item.indexType != 0">{{item.cardContent}}</view>
					<view class="justify-content-between person" v-if="item.cardType!=0&&item.cardType!=1&&item.indexType != 0">
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
				<view class="items" v-for="(item, index) in twoList11" :key="index" @tap="linkTo(item.cardUrlType,item.cardId,item.userId,item.cardType)">
					<image :src="item.cardUrl" mode="aspectFill" class="masterImg" :style="item.cardUrlSpec"></image>
					<view class="tit">{{item.cardTitle}}</view>
					<view class="des" v-if="item.cardType!=0&&item.cardType!=1&&item.indexType != 0">{{item.cardContent}}</view>
					<view class="justify-content-between person" v-if="item.cardType!=0&&item.cardType!=1&&item.indexType != 0">
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
		<view v-if="tabId1 == 1&&isSearch&&ishave" class="userList">
			<view class="userItems flex" v-for="(item, index) in nicknameList" :key="index">
				<image :src="item.portrait" mode=""></image>
				<view class="user">
					<view class="name">{{item.nickname}}</view>
					<view class="fans">{{item.fansNum}}粉丝</view>
				</view>
			</view>
		</view>
		<view class="block_i" v-if="(tabId1 == 0||tabId1 == 1)&&isSearch&&!ishave">
			<view class="zanwu">
				<image src="../../static/zanwu.png" mode=""></image>
				<view>{{tabId1==0?'没有找到相关卡片':'暂无好友，快去发现吧'}}</view>
			</view>
		</view>
		<view class="block_i" v-if="tabId == 1&&!isSearch&&!ishave">
			<view class="zanwu">
				<image src="../../static/zanwu.png" mode=""></image>
				<view>你还未关注任何人哦</view>
			</view>
		</view>
		</scroll-view>
		<uni-popup ref="popup" type="center" :custom="true" :maskClick="false">
		
			<view class="redCon">
				<view class="bg">
					<image src="../../static/redBg.png" mode="" class="big"></image>
					<image src="../../static/redGet.png" mode="" class="position" @tap="getRed"></image>
				</view>
				<view class="close" @tap="closeRed">
					<image src="../../static/redClose.png" mode=""></image>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import eimlFlow from "@/components/eiml-flow-layout/eiml-flow-layout.vue"
	import mSearch from '@/components/mehaotian-search/mehaotian-search.vue';
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	export default {
		onLoad() {
			// this.getRed()
			if(uni.getStorageSync('login')) return 
			// this.isSearch = false
			this.token = uni.getStorageSync('userInfo').token
			this.userId = uni.getStorageSync('userInfo').userId
			if(this.token){
				this.openRed()
			}
			this.beg = false
			this.isloadMore = false;
			this.pageNumber = 0;
			this.oneList = []
			this.twoList = []
			this.oneList1 = []
			this.twoList1 = []
			if (this.tabId == 0) {
				// 附近推荐
				this.getRecommendList()
			} else if(this.tabId == 1) {
				// 关注
				this.getAttentionList()
			}
		},
		components: {
			mSearch,
			eimlFlow,
			uniPopup
		},
		onReady() {
			uni.getSystemInfo({
				success: (res) => {
					this.scrollH = res.windowHeight
				}
			});
		},
		
		onShow(res) {
			this.token = uni.getStorageSync('userInfo').token
			this.userId = uni.getStorageSync('userInfo').userId
			   if(!uni.getStorageSync('login')) return
			   this.openRed()
			   this.isSearch = false
			   this.tabId1 = 0
			    this.tabId == 0
				
				this.beg = false
				this.isloadMore = false;
				this.pageNumber = 0;
				this.oneList = []
				this.twoList = []
				this.oneList1 = []
				this.twoList1 = []
				if (this.tabId == 0) {
					// 附近推荐
					this.getRecommendList()
				} else {
					// 关注
					this.getAttentionList()
				}
				uni.removeStorageSync('login');
		},
		// onReachBottom() {
		// 	if (this.tabId == 0&&!this.isSearch) {
		// 		// 附近推荐
		// 		this.getRecommendList()
		// 	} else if(this.tabId == 1&&!this.isSearch) {
		// 		// 关注
		// 		this.getAttentionList()
		// 	}
		// },
		onShareAppMessage() {
			wx.showShareMenu({
				withShareTicket: true,
				// withShareMenu: true,
				success: (e)=> {
					console.log(e)
				},
				fail: ()=> {}
			})
		},
		data() {
			return {
				scrollH: 0,
				isSearch: false,
				tab: [{
					name: '附近',
					id: 0
				}, {
					name: '关注',
					id: 1
				}],
				tabId: 0,
				tab1: [{
					name: 'card',
					id: 0
				}, {
					name: '用户',
					id: 1
				}],
				tabId1: 0,
				oneList11:[],
				twoList11:[],
				keyword: '' ,
				token: '',
				userId: '',
				total: 0,
				pageSize: 10, //limit
				pageNumber: 0, //start
				isloadMore: false,
				recommendList: [], //附近推荐列表
				attentionList: [], //附近推荐列表
				beg: false ,//请求中不允许点或者重复发请求
				oneList:[],
				twoList:[],
				oneList1:[],
				twoList1:[],
				nicknameList:[],//搜索关注用户
				ishave: false// 搜索时没有卡片或者用户//没有关注的时候
			}
		},

		methods: {
			openRed(){
				this.$refs.popup.open();
			},
			closeRed(){
				this.$refs.popup.close();
			},
			getRed(){
				wx.showRedPackage({
					url: 'https://support.weixin.qq.com/cgi-bin/mmsupport-bin/showredpacket?receiveuri=kAoBm531qvH&check_type=2#wechat_redirect',
					
					success:()=>{
						this.$refs.popup.close();
						// this.toast('成功')
					},
					fail:()=>{
						this.$refs.popup.close();
						// this.toast('失败')
					}
				})
			},
			tolower() {
				if (this.tabId == 0&&!this.isSearch) {
					// 附近推荐
					this.getRecommendList()
				} else if(this.tabId == 1&&!this.isSearch) {
					// 关注
					this.getAttentionList()
				}
			},
			// search() {
			// 	uni.navigateTo({
			// 		url: '../search/search'
			// 	})
			// 	return
			// },
			search(e, val) {
				if (e) {
					this.keyword = e;
					this.isSearch = true
					this.tabId1 = 0
					this.clern()
				} else {
					this.keyword = ''
					this.isSearch = false
					this.ishave = false
					this.tabId == 0
					this.beg = false
					this.isloadMore = false;
					this.pageNumber = 0;
					this.oneList = []
					this.twoList = []
					this.oneList1 = []
					this.twoList1 = []
					if (this.tabId == 0) {
						// 附近推荐
						this.getRecommendList()
					} else {
						// 关注
						this.getAttentionList()
					}
				}
			},
			// 搜索的时候切换
			changeTab1(id) {
				this.tabId1 = id
				if(this.tabId1 == 0){
					this.clern()
				}else{
					this.getNicknameList()
				}
			},
			clern(){
				this.beg = false
				this.isloadMore = false;
				this.pageNumber = 0;
				this.oneList11 = [],
				this.twoList11 = []
				this.getSearchList();
			},
			// 搜索列表
			getSearchList(){
				if(this.beg) return
				this.beg = true
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
						if(res.data.data[0]){
							this.ishave = true
						}else{
							this.ishave = false
						}
						res.data.data.map((i,index)=>{
							if(i.cardUrlSpec&&i.cardUrlSpec>1){
								i.cardUrlSpec = Number(i.cardUrlSpec)*345
							}else{
								i.cardUrlSpec = 345
							}
							
							i.top=i.cardUrlSpec - 22
							i.cardUrlSpec = 'height:'+i.cardUrlSpec+'rpx'
							i.top = 'top:'+i.top+'rpx'
							if(index%2==0){
								this.oneList11.push(i)
							}else{
								this.twoList11.push(i)
							}
							
						})
						uni.hideLoading()
						this.beg = false
						// this.searchList = res.data.data
					}else if(res.data.code == 403){
						uni.hideLoading()
						uni.reLaunch({
							url: '/pages/login/login'
						});
						uni.clearStorageSync();
					}else{
						this.toast(res.data.msg)
						this.beg = false
					}
				})
			},
			// 搜索时候的用户
			getNicknameList(){
				if(this.beg) return 
				this.beg = true
				uni.showLoading({
					title: '加载中'
				});
				let params = {
					nickname: this.keyword
				}
				this.$http.post(this.$api.nicknameList,{
					data: params,
					header: {
						'content-type': 'application/json;charset=UTF-8',
						'token': this.token
					}
				}).then(res=>{
					if(res.data.code == 0){
						if(res.data.data[0]){
							this.ishave = true
						}else{
							this.ishave = false
						}
						this.nicknameList = res.data.data
						uni.hideLoading()
						this.beg = false
					}else{
						this.toast(res.data.msg)
						this.beg = false
					}
				})
			},
			changeTab(id) {
				if (this.beg) return
				this.tabId = id
				this.isloadMore = false;
				this.pageNumber = 0;
				// this.recommendList = [];
				// this.attentionList = [];
				this.oneList = []
				this.twoList = []
				this.oneList1 = []
				this.twoList1 = []
				this.ishave = false
				if (this.tabId == 0) {
					// 附近推荐
					this.getRecommendList()
				} else {
					// 关注
					this.getAttentionList()
				}
			},
			// 附近推荐
			getRecommendList() {
				if (this.beg || this.isloadMore) return
				this.beg = true
				let params = {
					start: this.pageNumber,
					limit: this.pageSize,
				}
				uni.showLoading({
					title: '加载中'
				});
				this.$http.post(this.token?this.$api.getRecommend:this.$api.getRecommendNoToken, {
					data: params,
					header: {
						'content-type': 'application/json;charset=UTF-8',
						'token': this.token||''
					}

				}).then(res => {
					if (res.data.code == 0) {
						uni.hideLoading()
						res.data.data.list.map((i,index) => {
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
						if (!res.data.data.list.length || total >= res.data.data.totalNum || res.data.data.totalNum <= this.pageSize) {
							this.isloadMore = true;
							this.loadMore = '没有更多数据了';
						}
						this.beg = false
						uni.hideLoading();

					} else if(res.data.code == 403){
						// uni.reLaunch({
						// 	url: '/pages/login/login'
						// });
						// setTimeout(()=>{
						// 	this.toast('请先登录')
						// 	uni.clearStorageSync();
						// },800)
						// uni.switchTab({
						// 	url:'../mine/mine'
						// })
					}else {
						this.beg = false
						this.toast(res.data.msg)
					}
				})
			},
			getAttentionList() {
				if (this.beg || this.isloadMore) return
				this.beg = true
				uni.showLoading({
					title: '加载中'
				});
				let params = {
					start: this.pageNumber,
					limit: this.pageSize,
					userId: this.userId
				}
				this.$http.post(this.$api.getAttention, {
					data: params,
					header: {
						'content-type': 'application/json;charset=UTF-8',
						'token': this.token
					}

				}).then(res => {
					if (res.data.code == 0) {
						if(res.data.data.list[0]){
							this.ishave = true
						}else{
							this.ishave = false
						}
						res.data.data.list.map((i,index) => {
							if(!i.isPraise){
								i.isPraise = 0
							}
							if (i.cardUrlSpec&&i.cardUrlSpec>1) {
								i.cardUrlSpec = Number(i.cardUrlSpec) * 345
							} else {
								i.cardUrlSpec = 345
							}

							i.top = i.cardUrlSpec - 22
							i.cardUrlSpec = 'height:' + i.cardUrlSpec + 'rpx'
							i.top = 'top:' + i.top + 'rpx'
							if(index%2==0){
								this.oneList1.push(i)
							}else{
								this.twoList1.push(i)
							}
						})
						// this.attentionList = [...this.attentionList, ...res.data.data.list]
						this.pageNumber+=10
						let total = this.pageSize * this.pageNumber;
						if (!res.data.data.list.length || total >= res.data.data.totalNum || res.data.data.totalNum <= this.pageSize) {
							this.isloadMore = true;
							this.loadMore = '没有更多数据了';
						}
						this.beg = false
						// this.pageNumber++;
						uni.hideLoading();

					}else if(res.data.code == 403){
						uni.reLaunch({
							url: '/pages/login/login'
						});
						uni.clearStorageSync();
					} else {
						this.beg = false
						this.toast(res.data.msg)
					}
					uni.hideLoading();
				})
			},
			// linkTo(cardUrlType,cardId,userId){
			// 	if(cardUrlType == 0){
			// 		// 心情卡
			// 		uni.navigateTo({
			// 			url:'../mood/mood?cardId='+cardId+'&userId='+userId+'&cardUrlType='+cardUrlType+'&shop=1'
			// 		})
			// 	}else{
			// 		// 视频卡
			// 		uni.navigateTo({
			// 			url:'../video/video?cardId='+cardId+'&userId='+userId+'&cardUrlType='+cardUrlType+'&shop=1'
			// 		})
			// 	}
			// },
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
		background: #F9F9F9;
		.scrollBox{
			padding-top: 190rpx;
			box-sizing: border-box;
		}
		// background: blue;
		// .fixed {
		// 	width: 100%;
		// 	position: fixed;
		// 	top: 22rpx;
		// 	background: #fff;
		// 	padding-bottom: 20rpx;
		// 	box-sizing: border-box;

		// 	.search-box {
		// 		background: #fff;

		// 		/deep/.search .content .content-box .input {
		// 			color: #333;
		// 		}

		// 		/deep/.button-item {
		// 			color: #333;
		// 		}
		// 	}
		// }

		.fixed {
			z-index: 9999;
			width: 100%;
			position: fixed;
			top: 0;
			background: #fff;
			padding-bottom: 20rpx;

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
				margin-top: 15rpx;

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
					border-bottom: 6rpx solid #FDD10B;
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
					border-radius: 50%;
					
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
						margin-top: 16rpx;
						font-size: 22rpx;
						font-family: PingFang SC;
						font-weight: 300;
						color: #A1A1A1;
					}
				}
			}
		}
		.zanwu{
			text-align: center;
			width: 100%;
			margin-top: 200rpx;
			image{
				width: 318rpx;
				height: 291rpx;
				
			}
			view{
				margin-top: 36rpx;
				font-size: 24rpx;
				font-family: PingFang SC;
				font-weight: 600;
				color: #999999;
			}
		}
		.redCon{
			.bg{
				position: relative;
				width: 580rpx;
				height: 858rpx;
				.big{
					width: 100%;
					height: 100%;
				}
				.position{
					width: 183rpx;
					height: 62rpx;
					position: absolute;
					top: 762rpx;
					left: 198rpx;
				}
			}
			.close{
				width: 68rpx;
				height: 68rpx;
				margin-top: 56rpx;
				margin-left: 256rpx;
				image{
					width: 100%;
					height: 100%;
				}
			}
		}
	}
</style>

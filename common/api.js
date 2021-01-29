// var baseURL = 'http://47.99.125.113:7001'//测试
// var baseURL = 'http://api-debug.here.920life.cn'//测试
var baseURL = 'https://api.here.920life.cn'//正式
export default {
	cardInfo:baseURL +'/gw/here-card/appCard/cardInfo',//视频卡和心情卡2.7
	getOpenid: baseURL +'/gw/here-card/appIndex/queryOpenId',//获取openid7.3
	loginWechat:baseURL +'/gw/here-user/appUser/loginForThr',//微信登录1.8
	getLoginSms: baseURL +'/gw/here-user/appUser/sendCode',//获取验证码1.1
	checkCode: baseURL +'/gw/here-user/appUser/checkCode',//校验验证码1.3
	setPasswords: baseURL +'/gw/here-user/appUser/setPasswords',//设置密码1.4
	loginForPasswords: baseURL +'/gw/here-user/appUser/loginForPasswords',//密码登录1.6
	loginForCode: baseURL +'/gw/here-user/appUser/registerByMobile',//验证码登录1.2
	getRecommend: baseURL +'/gw/here-card/appIndex/queryIndex',//首页附近推荐2.2
	getRecommendNoToken: baseURL +'/gw/here-card/appIndex/queryIndex?noToken',//首页附近推荐2.2不要token
	getAttention: baseURL +'/gw/here-card/appCard/attentionCard',//首页关注2.5
	searchCard: baseURL +'/gw/here-card/appCard/queryCard2',//搜索2.10
	findCardStoreInfo: baseURL +'/gw/here-card/appCardStore/findCardStoreInfo',//查询店铺详情type D 5.1
	findActivity: baseURL +'/gw/here-card/appCardActivity/findByStoreId',//根据店铺查询当前店铺的活动5.8
	findCardActivityInfo: baseURL +'/gw/here-card/appCardActivity/findCardActivityInfo',//查询活动卡详情type C
	queryUser: baseURL +'/gw/here-card/appCardStore/queryUser',//想去用户type D 5.6
	findActivityJoinUser: baseURL +'/gw/here-card/appCardActivityOrder/findActivityJoinUser',//想去用户type C
	getComment: baseURL +'/gw/here-card/appCardComment/queryComment',//心情卡的评论2.8
	shopClassify: baseURL +'/gw/here-card/appCardStore/findStoreTag',//店铺类型5.9
	shopClassifyNotoken: baseURL +'/gw/here-card/appCardStore/findStoreTag?noToken',//店铺类型不要token5.9
	queryByTagList: baseURL +'/gw/here-card/appCardStore/queryByTag',//根据类型查店铺卡活动卡列表5.13
	nicknameList: baseURL +'/gw/here-user/appUser/queryNickname',//根据类型查店铺卡活动卡列表1.35
	officialCardList: baseURL +'/gw/here-card/appTopic/cardList',//查询官方活动的卡片列表2.6
	addAttention: baseURL +'/gw/here-user/appUserAttention/addAttention',//关注1.9
	removeAttention: baseURL +'/gw/here-user/appUserAttention/removeAttention',//取消关注1.10
	getActivityJoinUser: baseURL +'/gw/here-card/appCardActivityOrder/findActivityJoinUser?noToken',//查询活动参与用户5.15
	findShareNum: baseURL +'/gw/here-card/appCardActivityShare/findShareNum?noToken',//查询活动卡已邀请用户5.16
	getRules: baseURL +'/gw/here-card/appOther/queryByType?noToken',//查询配置信息 5.11 objectType 固定传5 活动卡优惠传11
	getActivityList: baseURL +'/gw/here-card/appActivityTopic/activityList',//查询活动卡集合
	getDraw: baseURL +'/gw/here-card/appDraw/inAddress?noToken',//测试抽奖提交中奖信息
	
}

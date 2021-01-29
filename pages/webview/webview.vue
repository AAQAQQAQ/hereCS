<template>
	<view>
		<!-- <web-view src="https://a.app.qq.com/o/simple.jsp?pkgname=com.wenyi.here"></web-view> -->
		<!-- <web-view src="https://img.here.920life.cn/here_2011301033_prod_2.2.3_release_223_jiagu_sign.apk"></web-view> -->
		<web-view src="https://m.here.920life.cn/smaple/download/download?userId=2441&userName=AA&code=aa123"></web-view>
	</view>
</template>

<script>
	export default {
		onLoad(res) {
			// console.log(res)
			// if(res.href == 'ios'){
			// 	this.href = 'https://itunes.apple.com/cn/app/qq/id1492672809?mt=8'
			// }else{
			// 	this.href = 'https://sj.qq.com/myapp/detail.htm?apkName=com.wenyi.here'
			// }
		},
		data() {
			return {
				href:''
			};
		}
	}
</script>

<style lang="less">

</style>

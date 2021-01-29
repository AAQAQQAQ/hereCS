<template>
	<view class="search" :style="{ backgroundColor: backgroundColor }">
		<view class="content" :style="{ 'border-radius': radius + 'px', border: border ,backgroundColor:backgroundColorin}">
			<view class="content-box" :class="{ center: mode === 2 }">
				<view class="icon-img">
					<image src="../../static/icon/find.png" v-if="iconSelct == 1"></image>
					<image src="../../static/icon/sousuo.png" v-else></image>				
				</view>	
				<input class="input2" v-if="colorSelct == 2"  :class="{ center: !active && mode === 2 }" :focus="isFocus" :placeholder="placeholder" :placeholder-style="placeholderStyle" v-model="inputVal" @focus="focus" @blur="blur" />
				<input class="input" v-else  :class="{ center: !active && mode === 2 }" :focus="isFocus" :placeholder="placeholder" :placeholder-style="placeholderStyle" v-model="inputVal" @focus="focus" @blur="blur" @confirm="search" confirm-type="搜索"/>
				<view class="icon-img" v-if="isDelShow" @click="clear">
					<image src="../../static/icon/delete.png" v-if="iconSelct == 1"></image>
					<image src="../../static/icon/delete.png" v-else></image>	
				</view>	
			</view>
			<view v-show="(active && show && button === 'inside') || (isDelShow && button === 'inside')" class="searchBtn" @click="search">搜索</view>
		</view>
		<view v-if="button === 'outside'" class="button" :class="{ active: show || active }" @click="search">
			<view class="button-color" v-if="colorSelct == 2">{{ !show ? searchName : '搜索' }}</view>
			<view class="button-item" v-else>{{ !show ? searchName : '搜索' }}</view>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		mode: {
			type: Number,
			default: 1
		},
		button: {
			type: String,
			default: 'outside'
		},
		show: {
			type: Boolean,
			default: true
		},
		radius: {
			type: String,
			default: '60'
		},
		placeholder: {
			type: String,
			default: '搜索你想要的'
		},
		placeholder2: {
			type: String,
			default: '搜索商品名称硕大的'
		},
		backgroundColor: {
			type: String,
			default: '#fff'
		},
		iconSelct:{
			type: String,
			default: '1'
		},
		colorSelct:{
			type: String,
			default: '1'
		},
		border: { type: String, default: '1px #f5f5f5 solid' },
		backgroundColorin:{
			type: String,
			default: 'rgba(238,238,238,.6)'
		},
		placeholderStyle:{
			type: String,
			default: ''
		}
		
	},
	data() {
		return {
			active: false,
			inputVal: '',
			searchName: '取消',
			isDelShow: false,
			isFocus: false
		};
	},
	methods: {
		focus() {
			this.active = true;
		},
		blur() {
			this.isFocus = false;
			if (!this.inputVal) {
				this.active = false;
			}
		},
		clear() {
			this.inputVal = '';
			this.active = false;
			this.$emit('search', '');
		},
		getFocus() {
			this.isFocus = true;
		},
		search() {
			// if (!this.inputVal) return;
			// console.log(this.inputVal);
			this.$emit('search', this.inputVal);
		}
	},
	watch: {
		inputVal(newVal) {
			if (newVal) {
				this.searchName = '搜索';
				this.isDelShow = true;
			} else {
				this.searchName = '取消';
				this.isDelShow = false;
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.search {
	display: flex;
	width: 100%;
	box-sizing: border-box;
	padding: 10rpx 36rpx;
	font-size: $uni-font-size-base;
	background-color: #eeeeee;
	.content {
		display: flex;
		align-items: center;
		width: 100%;
		height: 72rpx;
		overflow: hidden;
		transition: all 0.2s linear;
		border-radius: 30px;
		.content-box {
			width: 100%;
			display: flex;
			align-items: center;
			.icon-img{
				margin: 0 15rpx 0 20rpx;
				padding-top: 8rpx;
				box-sizing: border-box;
				image{
					width:34rpx;
					height:34rpx;					
				}				
			}
			&.center {
				justify-content: center;
			}
			.icon {
				padding: 0 15rpx;
				&.icon-del {
					font-size: 38rpx;
				}
			}
			.input {
				width: 100%;
				max-width: 100%;				
				transition: all 0.2s linear;
				color:#fff;
				&.center {
					width: 200rpx;
				}
				&.sub {
					// position: absolute;
					width: auto;
					color: grey;
				}
			}
			.input2{
				width: 100%;
				max-width: 100%;				
				transition: all 0.2s linear;
				color:#333;
				&.center {
					width: 200rpx;
				}
				&.sub {
					// position: absolute;
					width: auto;
					color: grey;
				}
			}
		}
		.searchBtn {
			height: 100%;
			flex-shrink: 0;
			padding: 0 30rpx;
			background: $uni-color-success;
			line-height: 60rpx;
			color: #fff;
			border-left: 1px #ccc solid;
			transition: all 0.3s;
		}
	}

	.button {
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;
		flex-shrink: 0;
		width: 0;
		transition: all 0.2s linear;
		white-space: nowrap;
		overflow: hidden;
		&.active {
			padding-left: 15rpx;
			width: 100rpx;
		}
	}
}
// @font-face {
// 	font-family: 'iconfont';
// 	src: url('https://at.alicdn.com/t/font_989023_efq0mtli526.ttf') format('truetype');
// }
// .icon {
// 	font-family: iconfont;
// 	font-size: 32rpx;
// 	font-style: normal;
// 	color: #fff;
// 	margin-left: 30rpx;
// 	margin-top: 5rpx;
// }
// .button-color{
// 	color:#333;
// }
.button-item{
	color:#fff;
}
</style>

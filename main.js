import Vue from 'vue'
import App from './App'
/*每个页面公共css */
import './common/style.less'
// 公用api
import api from './common/api'
import {
	toast,
	loading
} from './common/tools'

Vue.prototype.$api = api
// 请求插件
import request from './common/request.js'
request.setConfig({
	header: {
		'content-type': 'application/x-www-form-urlencoded'
	}
})
// 设置响应拦截器
// request.interceptors.response(res => {
// 	if (res.data.code == 403) {
// 		uni.reLaunch({
// 			url: '/pages/login/login'
// 		});
// 		uni.clearStorageSync();
// 	}
// 	return res;
// })
Vue.prototype.$getBase64Image = img => {
      var canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      var ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, img.width, img.height);
      var ext = img.src.substring(img.src.lastIndexOf(".") + 1).toLowerCase();
      var dataURL = canvas.toDataURL("image/" + ext);
      return dataURL;
    };
Vue.prototype.$http = request;
Vue.prototype.toast = toast;
Vue.prototype.loading = loading;


Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()


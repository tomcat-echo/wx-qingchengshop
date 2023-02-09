<template>
	 <view class="login-container">
	    <!-- 提示登录的图标 -->
	    <uni-icons type="contact-filled" size="100" color="#AFAFAF"></uni-icons>
	    <!-- 登录按钮 -->
	    <button type="primary" class="btn-login" open-type="getUserInfo" @click="getUserProfile">一键登录</button>
	    <!-- 登录提示 -->
	    <view class="tips-text">登录后尽享更多权益</view>
	  </view>
</template>

<script>
	import {mapMutations,mapState} from 'vuex'
	export default {
		name:"my-login",
		data() {
			return {
				
			};
		},
		computed:{
			...mapState('m_user',['redirectInfo'])
		},
		methods:{
			// 2. 调用 mapMutations 辅助方法，把 m_user 模块中的 updateUserInfo 映射到当前组件中使用
			    ...mapMutations('m_user', ['updateUserInfo','updateToken', 'updateRedirectInfo']),
			     // 获取微信用户的基本信息
			      getUserProfile() {
			        uni.getUserProfile({
			          desc: '你的授权信息',
			          success: (res) => {
			            // 将信息存到 vuex 中
			            this.updateUserInfo(res.userInfo)
						
			            this.getToken(res)
			          },
			          fail: (res) => {
			            return uni.$showMsg('您取消了登录授权')
			          }
			        })
					
					},
					// 调用登录接口，换取永久的 token
					async getToken(info) {
					  // 调用微信登录接口
					  const [err, res] = await uni.login().catch(err => err)
					  // 判断是否 uni.login() 调用失败
					  if (err || res.errMsg !== 'login:ok') return uni.$showError('登录失败！')
					
					  // 准备参数对象
					  const query = {
					    code: res.code,
					    encryptedData: info.encryptedData,
					    iv: info.iv,
					    rawData: info.rawData,
					    signature: info.signature
					  }
					
					  // 换取 token,这里接口不能用就写死了
					  
					  const { data: loginResult } = await uni.$http.post('https://api-ugo-web.itheima.net/api/public/v1/users/wxlogin', query)
					  // console.log(loginResult);
					  // if (loginResult.meta.status !== 200) return uni.$showMsg('登录失败！')
					  
					  uni.$showMsg('登录成功')
					  let token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo'
						 // 如果不为 null，则登录成功之后，需要重新导航到对应的页面
						  this.navigateBack()
						this.updateToken(token)
					},
					// 返回登录之前的页面
					navigateBack() {
					  // redirectInfo 不为 null，并且导航方式为 switchTab
					  if (this.redirectInfo && this.redirectInfo.openType === 'switchTab') {
					    // 调用小程序提供的 uni.switchTab() API 进行页面的导航
					    uni.switchTab({
					      // 要导航到的页面地址
					      url: this.redirectInfo.from,
					      // 导航成功之后，把 vuex 中的 redirectInfo 对象重置为 null
					      complete: () => {
					        this.updateRedirectInfo(null)
					      }
					    })
					  }
					}
					

		}
	}
</script>

<style lang="scss">
.login-container {
  // 登录盒子的样式
  height: 750rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #f8f8f8;
  position: relative;
  overflow: hidden;

  // // 绘制登录盒子底部的半椭圆造型
  // &::after {
  //   content: ' ';
  //   display: block;
  //   position: absolute;
  //   width: 100%;
  //   height: 40px;
  //   left: 0;
  //   bottom: 0;
  //   background-color: white;
  //   border-radius: 100%;
  //   transform: translateY(50%);
  // }

  // 登录按钮的样式
  .btn-login {
    width: 90%;
    border-radius: 100px;
    margin: 15px 0;
    background-color: #c00000;
  }

  // 按钮下方提示消息的样式
  .tips-text {
    font-size: 12px;
    color: gray;
  }
}
</style>
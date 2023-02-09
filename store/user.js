export default {
	// 为当前模块开启命名空间
	namespaced: true,
	/// 模块的 state 数据
	state:()=>
	({
		// 收货地址转化为对象
		 address:JSON.parse(uni.getStorageSync('address') || '{}'),
		   // 登录成功之后的 token 字符串
		     token: uni.getStorageSync('token') || '',
			// 用户的基本信息
			userInfo:JSON.parse(uni.getStorageSync('userInfo') || '{}'),
			// 重定向的 object 对象 { openType, from }
			  redirectInfo: null
	}),
	// 模块的 mutations 方法(写函数)
	  mutations: {
		
		  // 更新收货地址
		      updateAddress(state, address) {
		        state.address = address
				// 2. 通过 this.commit() 方法，调用 m_user 模块下的 saveAddressToStorage 方法将 address 对象持久化存储到本地
				      this.commit('m_user/saveAddressToStorage')
		      },
			  saveAddressToStorage(state){
				  // 1. 定义将 address 持久化存储到本地 mutations 方法
				  uni.setStorageSync('address',JSON.stringify(state.address))
			  },
			  updateUserInfo(state,userInfo){
				  state.userInfo = userInfo
				  this.commit('m_user/saveUserInfoToStorage')
			  },
			  saveUserInfoToStorage(state){
			  				  // 1. 定义将 address 持久化存储到本地 mutations 方法
			  	 uni.setStorageSync('userInfo',JSON.stringify(state.userInfo))
			  },
			  updateToken(state,token){
				  state.token = token
				  this.commit('m_user/saveTokenToStorage')
			  },
			  saveTokenToStorage(state){
			  				  // 1. 定义将 address 持久化存储到本地 mutations 方法
			  	 uni.setStorageSync('token',state.token)
			  },
			   // 更新重定向的信息对象
			    updateRedirectInfo(state, info) {
			      state.redirectInfo = info
			    }
	  },
	
	  // 模块的 getters 属性（数据包装器）
	  getters: {
		  addstr(state) {
		  				  // 地址为空
		    if (state.address === {}) return ''
		  			
		    // 拼接 省，市，区，详细地址 的字符串并返回给用户
		    return state.address.provinceName + state.address.cityName + state.address.countyName + state.address.detailInfo
		  }
	  },
}
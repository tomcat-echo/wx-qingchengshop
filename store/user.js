export default {
	// 为当前模块开启命名空间
	namespaced: true,
	/// 模块的 state 数据
	state:()=>
	({
		 address:{}
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
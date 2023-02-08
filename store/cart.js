export default {
	// 为当前模块开启命名空间
	namespaced: true,
	/// 模块的 state 数据
	state:()=>
	({
		 // 购物车的数组，用来存储购物车中每个商品的信息对象
		    // 每个商品的信息对象，都包含如下 6 个属性：
		    // { goods_id, goods_name, goods_price, goods_count, goods_small_logo, goods_state }
		cart: JSON.parse(uni.getStorageSync('cart') || '[]') ,
		
	}),
	// 模块的 mutations 方法(写函数)
	  mutations: {
		  addToCart(state,goods){
			   // 根据提交的商品的Id，判断购物车中是否存在这件商品
			        // 如果不存在，则 findResult 为 undefined；否则，为查找到的商品信息对象
				const findResult = 	state.cart.find(x => x.goods_id === goods.goods_id)
				// 没有的话直接将商品信息填入数组
				if(!findResult){
					state.cart.push(goods)
				}else{
					// 否则让数量增加
					findResult.goods_count++
				}
				// 通过 commit 方法，调用 m_cart 命名空间下的 saveToStorage 方法
				this.commit('m_cart/saveToStorage')
		  },
		  saveToStorage(state){
			  // 存储到本地
			  uni.setStorageSync('cart',JSON.stringify(state.cart))
		  },
		  updateRadioState(state,goods){
			  // 通过商品id寻找到对应商品
			  const findResult = state.cart.find(x => x.goods_id === goods.goods_id)
			  // 更新对应商品的勾选状态
			  if(findResult){
				  findResult.goods_state = goods.goods_state
			  }
			  // 存储到本地
			  this.commit('m_cart/saveToStorage')
		  },
		  updateNumber(state,goods){
			  const findResult = state.cart.find(x => x.goods_id === goods.goods_id)
			  if(findResult){
				  findResult.goods_count = goods.goods_count
				  
			  }

			  this.commit('m_cart/saveToStorage')
		  },
		  // 根据 Id 从购物车中删除对应的商品信息
		  removeGoodsById(state, goods_id) {
		    // 调用数组的 filter 方法进行过滤
		    state.cart = state.cart.filter(x => x.goods_id !== goods_id)
		    // 持久化存储到本地
		    this.commit('m_cart/saveToStorage')
		  }
		  
	  },
	
	  // 模块的 getters 属性（计数）
	  getters: {
		  total(state){
			  let c = 0
			  state.cart.forEach( goods => c +=  goods.goods_count )
			  state.cart.total = c
			  return c
		  }
	  },
}
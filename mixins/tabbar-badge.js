	// 按需导入 mapGetters 这个辅助方法
	import { mapGetters } from 'vuex'
	
	export default {
	  data() {
	    return {}
	  }, 
	  computed: {
	    // 将 m_cart 模块中的 total 映射为当前页面的计算属性
	    ...mapGetters('m_cart', ['total']),
	  },
	  onShow() {
	     // 在页面刚展示的时候，设置数字徽标
	     this.setBadge()
	  },
	 watch:{
		 total:{
			 handler(newVal){
				 // 这里要重新调用赋值否则购物车页面不变
				 this.setBadge()
			 },
			 immediate:true
		 }
	 },
	  methods: {
	     setBadge() {
			 
	        // 调用 uni.setTabBarBadge() 方法，为购物车设置右上角的徽标
	        uni.setTabBarBadge({
	           index: 2, // 索引
	           text: this.total + '' // 注意：text 的值必须是字符串，不能是数字
	        })
	     }
	  }
	}
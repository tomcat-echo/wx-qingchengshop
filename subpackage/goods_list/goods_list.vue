<template>
	<view>
		<view class="goodsList-container">
			<view v-for="(item , gi) in  goodsList" :key="gi" @click="goToDetail(item)">
				<my-goods :goods="item"></my-goods>					
			</view>							
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 商品对象，由于后台数据不是单独一个数组
				queryObj:{
					// kw对应参数
					query:'',
					// 商品Id对应参数
					cid:'',
					// 页码值
					pageNum:1,
					// 每页数据
					pagesize: 10
				},
				// 对应的商品列表
				goodsList:[],
				// 总数量，用来实现分页
				total: 0,
				  // 默认的空图片
				  defaultPic: 'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png'
			};
			// 节流阀
			isLoading:false
		},
		onLoad(options) {
			
			// 将页面传过来的参数赋值给自定义对象
			this.queryObj.cid = options.cid || ''
			this.queryObj.query = options.query || ''
			this.getGoodsList()
		},
		onReachBottom() {
			if(this.queryObj.pageNum * this.queryObj.pagesize >= this.total) return uni.$showToast('数据加载完毕！')
			// 通过上拉触底检测是否加载数据
			if(this.isLoading)return
			// 页数加一并重新获得数据
			this.queryObj.pageNum += 1
			this.getGoodsList()
		}
		,
		onPullDownRefresh() {
			// 重置初始化数据
			this.queryObj.pageNum = 1
			this.goodsList = [],
			this.total = 0
			this.isloading = false
			// 接收数据
			this.getGoodsList(()=>{ uni.stopPullDownRefresh() })
		},
		methods:{
			async getGoodsList(cb){
				this.isLoading = true
				const {data:res} = await uni.$http.get('/api/public/v1/goods/search',this.queryObj)
				// 请求完数据立即关闭下拉刷新
				cb&&cb()
				// this.goodsList = res.message.goods
				  // 为数据赋值：通过展开运算符的形式，进行新旧数据的拼接
				this.goodsList = [...this.goodsList,...res.message.goods]
				this.total= res.message.total
				this.isLoading = false
			},
			goToDetail(item) {
				
			  uni.navigateTo({
			    url: '/subpackage/goods_detail/goods_detail?goods_id=' + item.goods_id
			  })
			}
		}
	}
</script>

<style lang="scss">

</style>

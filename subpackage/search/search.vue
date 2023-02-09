<template>
	<view>
		<view class="search-box">
			<uni-search-bar  :focus="true" v-model="kw" :radius="100"   @input="input" cancelButton="none"></uni-search-bar>
		</view>
		<view class="history-container" v-if="searchList.length === 0">
			<view class="history-title">
				<text>搜索历史</text>
				<uni-icons type="trash" size="17" @click="cleanData"></uni-icons>
			</view>
			<view class="history-list" >
				<uni-tag  v-for="(item,hi) in historys" :key="hi" :text="item"   @click="gotoGoodsList(item)"/>
			</view>
		</view>
		
		<view class="search-list" v-else>
			<view class="search-item" v-for="(item,si) in searchList" :key="si" @click="goToDetail(item.goods_id)">
				<view class="goods-name">
					{{item.goods_name}}
				</view>
				<uni-icons type="arrow-right" size="17"></uni-icons>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 延时器的 timerId
				    timer: null,
				    // 搜索关键词
				    kw: '',
					// 搜索列表
					searchList:[],
					// 搜索历史
					searchHistory:[]
			};
		},
		computed:{
			historys(){
				// 让最近的搜索结果在前面
				 // 注意：由于数组是引用类型，所以不要直接基于原数组调用 reverse 方法，以免修改原数组中元素的顺序
			    // 而是应该新建一个内存无关的数组，再进行 reverse 反转
				return [...this.searchHistory].reverse()
			}
		},
		methods:{
			input(e){
				// 清除 timer 对应的延时器
				      clearTimeout(this.timer)
				      // 重新启动一个延时器，并把 timerId 赋值给 this.timer
				this.timer = setTimeout(() => {
					this.kw = e
					// 调用获得搜索结果列表
					this.getSearchList()
				},500)
				
			},
			// 一定要用async
			async getSearchList(){
				if(this.kw.length === 0){
					this.searchList = []
					return
				}
					// 这里由于要根据结果查询要加上query参数
					
					const {data : res } = await uni.$http.get('https://api-ugo-web.itheima.net/api/public/v1/goods/search', { query: this.kw })
					this.searchList = res.message.goods
					this.saveHistory()
				
			}
			,goToDetail(id){
				uni.navigateTo({
					url: '/subpackage/goods_detail/goods_detail?goods_id='+id
				})
			},
			// 搜索历史
			saveHistory(){
				// this.searchHistory.push(this.kw)
				// 使用set对象去重
				const  set = new Set(this.searchHistory)
				// 去掉重复的数据
				set.delete(this.kw)
				// 添加数据
				set.add(this.kw)
				//  将 Set 对象转化为 Array 数组
				this.searchHistory = Array.from(set)
				//  uni.setStorageSync(key, value)转换成JSON字符串进行存储
				uni.setStorageSync('kw',JSON.stringify(this.searchHistory))
			},
			// 清除历史数据
			cleanData(){
				// 清空数组
				this.searchHistory = []
				// 清除本地存储
				uni.setStorageSync('kw','[]')
			},
			gotoGoodsList(kw) {
			  uni.navigateTo({
			    url: '/subpackage/goods_list/goods_list?query=' + kw
			  })
			}
			
		},
		onLoad() {
			// 加载存储数据到页面上，没有的话加载空数组
			this.searchHistory = JSON.parse(uni.getStorageSync('kw') || '[]')
		}
		
	}
</script>

<style lang="scss">
.search-box{
	position: sticky;
	top: 0;
	z-index: 999;
}
.search-list{
	padding: 0 5px;
	.search-item{
			font-size: 12px;
		    padding: 13px 0;
		    border-bottom: 1px solid #efefef;
		    display: flex;
		    align-items: center;
		    justify-content: space-between;
		.goods-name{
			// 省略展示不了的信息
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
			 margin-right: 3px;
		}
	}
}
.history-container{
	padding: 5px;
	.history-title{
		display: flex;
		justify-content: space-between;
		align-items: center;
		    height: 40px;
		    font-size: 13px;
		    border-bottom: 1px solid #efefef;
	}
	.history-list{
		display: flex;
		flex-wrap: wrap;
		 .uni-tag {
		      margin-top: 5px;
		      margin-right: 5px;
		    }
	}
	
	
}
</style>

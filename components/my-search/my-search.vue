<template>
	<view class="search-container" :style="{'background-color':bgcolor}">
		<view class="search-box" :style="{'border-radius':radius+'px'}" @click="searchHandler">
			<uni-icons type="search" size="17"></uni-icons>
			<text class="placeholder">搜索</text>
		</view>
	</view>
</template>

<script>
	export default {
		name:"my-search",
		data() {
			return {
				
			};
		},
		methods:{
			searchHandler(){
				// 这里直接先给组件加点击事件再在函数中给一个点击事件名称，search就是类似click的
				this.$emit('search')
			}
		},
		props:{
			// 自定义设置搜索部分样式
			bgcolor:{
				// 背景颜色
				type: String,
				default: "#a7e084"
			},
			radius:{
				// 圆角
				type: Number,
				default: 16
			}
			
		}
	}
</script>

<style lang="scss">
.search-container{
	
	height: 50px;
	padding: 0 10px;
	display: flex;
	justify-content: center;
	align-items: center;
	.search-box{
		background-color: #fff;
		height: 36px;
		width: 100%;
		display: flex;
	    align-items: center;
	    justify-content: center;
		
	
		
	}
	.placeholder{
		font-size: 15px;
		margin-left: 5px;
	}
}

</style>
<template>
	<view>
		<my-search @search="goToSearch"></my-search>
		<view class="scroll-view-container">
		
			<!-- 左侧滑动区域 -->
			<scroll-view class="left-scroll" scroll-y="true" :style="{height: wh+ 'px'}">
				<block v-for="(item ,leftIndex) in cateList " :key="leftIndex">
					<view :class="['left-scroll-item',leftIndex === active ? 'active' : '']" @click="changeActive(leftIndex)">
					{{item.cat_name}}
					</view>
				</block>
				
			</scroll-view>
			<!-- 右侧滑动区域 -->
			<scroll-view class="right-scroll" scroll-y="true" :style="{height: wh + 'px'}" :scroll-top="scrollTop">
				<view class="cate-list" v-for="(item1, ri) in  cateTwoList" :key="ri">
					<view class="cate-title">
						/{{item1.cat_name}}/
					</view>
					<view class="cate-two" >
						<view class="cate-two-item" v-for="(item2,subindex) in  item1.children" :key="subindex" @click="getGoodsList(item2)">
							<image :src="item2.img" mode=""></image>
							<text>{{item2.cat_name}}</text>
						</view>
					</view>
						
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import badgeMix from '@/mixins/tabbar-badge.js'
	export default {
		mixins:[badgeMix],
		data() {
			return {
				wh: 0 ,
				cateList:[], //左侧分类信息
				active: 0 ,// 激活状态默认值
				cateTwoList:[], // 二级分类列表（大类标题）
				scrollTop: 0	// 滚动条距离顶部的距离
			};
		},
		methods:{
			async getCateList(){
				const {data : res} = await uni.$http.get('/api/public/v1/categories')
				this.cateList = res.message
			},
			
			
			async getCateTwoList(){
				const {data: res} = await uni.$http.get('/api/public/v1/categories')
				res.message[0].children.forEach(cate => {
					cate.children.forEach(list => {
						// 自定义一个属性url,同时拼接通过split获得后半部分(原链接图片失效)
						list.img = 'https://api-ugo-web.itheima.net/full/'+list.cat_icon.split("/")[4]
	
					})
				})
				
				
				this.cateTwoList = res.message[0].children
			},
			changeActive(index){
				// 切换
				this.active = index
				// 为二级分类列表重新赋值
				this.cateTwoList = this.cateList[index].children
				// 图片重新赋值切换要再次调用
				this.changeUrl()
				// 切换时无法自动定位到顶部
				  // 让 scrollTop 的值在 0 与 1 之间切换
				      this.scrollTop = this.scrollTop === 0 ? 1 : 0
				
				
			},
			changeUrl(){
				this.cateTwoList.forEach( cate =>{
					if(cate.children){
						cate.children.forEach(list => {
						// 自定义一个属性url,同时拼接通过split获得后半部分(原链接图片失效)
						list.img = 'https://api-ugo-web.itheima.net/full/'+list.cat_icon.split("/")[4]
						
					})
					}
					
				})
				
			},
			getGoodsList(item){
				
				uni.navigateTo({
					url:'/subpackage/goods_list/goods_list?cid='+item.cat_id
				})
			},
			goToSearch(){
				uni.navigateTo({
					url: '/subpackage/search/search'
				})
			}
		}
		,
		onLoad() {
			// 获取当前系统的信息
			const sysInfo = uni.getSystemInfoSync()
		    // 为 wh 窗口可用高度动态赋值(顶部组件多占50px)
			this.wh = sysInfo.windowHeight - 50
			
			this.getCateList()
			this.getCateTwoList()
			
		}
	}
</script>

<style lang="scss">
.scroll-view-container{
	display: flex;
	background-color: #fff;
	.left-scroll{
		width: 120px;
		.left-scroll-item{
			background-color: #f7f7f7;
			line-height: 60px;
			text-align: center;
			font-style: 12px;
			// 激活样式
			&.active{
			background-color: #fff;
			position: relative;
			// 左侧
			&::before{
				content: '';
				display: block;
				position: absolute;
				width: 3px;
				// 一半
				height: 30px;
				background-color: #c00000;
				top: 50%;
				left: 0;
				// 会到左下角因此再向上偏移一半
				transform: translateY(-50%);
			}
			}
		}
		
	}
	.right-scroll{
		background-color: #fff;
		.cate-title{
			font-style: 12px;
			font-weight: bold;
			text-align: center;
			padding: 15px 0;
			
			
		}
		.cate-two{
			display: flex;
			flex-wrap: wrap;
			

			.cate-two-item{
				// 图片和文字纵向排列
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				// 一行三个
				width: 33.33%;
				margin-bottom: 10px;
				image {
				      width: 60px;
				      height: 60px;
				    }
			}
				 

			}
	}

}
</style>

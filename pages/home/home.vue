<template>
	<view>
		<view class="search-box">
			<my-search  @search="goToSearch"></my-search>
		</view>
		
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" circular="true" aria-role="">
			<swiper-item v-for="(item,index) in swiperList" :key="index" aria-role="img" :aria-label="`活动推荐${index+1}`">
				<navigator class="swiper-item" :url="`/subpackage/goods_detail/goods_detail?goods_id=`+ item.goods_id">
					<image :src="item.image_src" />
				</navigator>
			</swiper-item>

		</swiper>

		<view class="nav-list" aria-role="">
			<view class="nav-item" @click="navClickHandler(item)" v-for="(item, i1) in navigatorList" :key="i1" aria-role="navigator" :aria-label="`${item.name}+导航`">
				<image :src="item.image_src" class="nav-img"></image>
			</view>
		</view>

		<view class="floor-list">
			<view class="floor-item" v-for="(item,index) in floorList" :key="index">
				<image :src="item.floor_title.image_src" class="floor-title"></image>
				<view class="floor-imglist">
					<navigator class="left-img-box" :url="item.product_list[0].url">

						<image :src="item.product_list[0].image_src"
							:style="{width: item.product_list[0].image_width + 'rpx'}" mode="widthFix"></image>

					</navigator>
					<view class="right-img-box">
						<navigator class="right-item" v-for="(item2,index2) in item.product_list" :key="index2" :url="item2.url">
							<image :src="item2.image_src" :style="{width: item2.image_width + 'rpx'}" mode="widthFix"
								v-if="index2!= 0">
							</image>
						</navigator>
					</view>

				</view>
			</view>



		</view>

	</view>
</template>

<script>
	import badgeMix from '@/mixins/tabbar-badge.js'
	export default {
		mixins:[badgeMix],
		data() {
			return {
				// 1. 轮播图的数据列表，默认为空数组
				swiperList: [],
				navigatorList: [], //导航列表
				floorList: [] //楼层
			};
		},
		onLoad() {
			// 2. 在小程序页面刚加载的时候，调用获取轮播图数据的方法
			this.getSwiperList()
			this.getNavigatorList()
			this.getFloorList()
		},
		methods: {
			// 3. 获取轮播图数据的方法
			async getSwiperList() {
				// 3.1 发起请求 
				const {
					data: res
				} = await uni.$http.get('/api/public/v1/home/swiperdata')
				this.swiperList = res.message
			},
			async getNavigatorList() {
				const {
					data: res
				} = await uni.$http.get('/api/public/v1/home/catitems')
				this.navigatorList = res.message
			},
			async getFloorList() {
				const {
					data: res
				} = await uni.$http.get('/api/public/v1/home/floordata')

				res.message.forEach(floor => {
					floor.product_list.forEach(prod => {
						// 自定义一个属性url,同时拼接通过split获得后半部分
						prod.url =  '/subpackage/goods_list/goods_list?' + prod.navigator_url.split("?")[1]
					})
				})
				this.floorList = res.message
			},

			navClickHandler(item) {
				if (item.name === '分类') {
					uni.switchTab({
						url: '/pages/cate/cate'
					})
				}

			}
			,goToSearch(){
				uni.navigateTo({
					url: '/subpackage/search/search'
				})
			}
		}
	}
</script>

<style lang="scss">
	swiper {
		height: 330rpx;

		.swiper-item,
		image {
			width: 100%;
			height: 100%;
		}
	}

	.nav-list {
		display: flex;
		justify-content: space-around;
		margin: 15px 0;

		.nav-img {
			width: 128rpx;
			height: 140rpx;
		}
	}

	.floor-title {
		height: 60rpx;
		width: 100%;
		display: flex;
	}

	.floor-imglist {
		display: flex;
		padding-left: 10px;

		.right-img-box {
			display: flex;
			flex-wrap: wrap;
			justify-content: space-around;
		}
	}
	.search-box {
	  // 设置定位效果为“吸顶”
	  position: sticky;
	  // 吸顶的“位置”
	  top: 0;
	  // 提高层级，防止被轮播图覆盖
	  z-index: 999;
	}
</style>

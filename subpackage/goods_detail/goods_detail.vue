<template>
	<view v-if="goods_info.goods_name" class="goods-container">
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
			<swiper-item class="swiper-item" v-for="(item,pi) in goods_info.pics" :key="pi" @click="preview(i)">
					<image :src="item.pics_big" mode=""></image>
			</swiper-item>
		</swiper>
		<view class="goods-info">
			<view class="price-info">￥{{goods_info.goods_price+'.00'}}</view>
			<view class="goods-info-text">
				<view class="goods-name">{{goods_info.goods_name}}</view>
				<view class="img">
					      <uni-icons type="star" size="18" color="gray"></uni-icons>

					<text>收藏</text>
				</view>
			</view>
			<!-- 运费 -->
		  <view class="yf">快递：免运费</view>
		</view>
		
		<rich-text :nodes="goods_info.goods_introduce"></rich-text>
		<view class="goods_nav">
			 <!-- fill 控制右侧按钮的样式 -->
			  <!-- options 左侧按钮的配置项 -->
			  <!-- buttonGroup 右侧按钮的配置项 -->
			  <!-- click 左侧按钮的点击事件处理函数 -->
			  <!-- buttonClick 右侧按钮的点击事件处理函数 -->
			<uni-goods-nav :fill="true"  :options="options" :buttonGroup="buttonGroup"  @click="onClick" @buttonClick="buttonClick" />
		</view>
			

	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 商品详情对象
				goods_info:{},
				    options: [ {
							icon: 'shop',
							text: '店铺',
							infoBackgroundColor:'#007aff',
							infoColor:"red"
						}, {
							icon: 'cart',
							text: '购物车',
							info: 2
						}],
					    buttonGroup: [{
					      text: '加入购物车',
					      backgroundColor: '#ff0000',
					      color: '#fff'
					    },
					    {
					      text: '立即购买',
					      backgroundColor: '#ffa200',
					      color: '#fff'
					    }
					    ]
			};
		},
		onLoad(options) {
			// 获取商品 Id
			const goods_id = options.goods_id
			this.getGoodsDetail(goods_id)
		},
		methods:{
			async getGoodsDetail(goods_id){
				// 属性值是goods_id,值也是goods_id因此简写
				const {data:res} = await uni.$http.get('/api/public/v1/goods/detail',{goods_id})
				// if(res.meta.status !== 200)return uni.$showToast()
				res.message.goods_introduce =   res.message.goods_introduce.replace(/<img/g,'<img style="display:block"').replace(/webp/g,'jpg')
				this.goods_info = res.message
			},
			preview(index){
				uni.previewImage({
					// 当前是第index张
					current:index,
					// 遍历的图片地址
					urls:this.goods_info.pics.map(x=> x.pics_big)
				})
			},
			onClick(e){
				// 根据 `e.content.text` 的值
				if (e.content.text === '购物车') {
					uni.switchTab({
						url:'/pages/cart/cart'
					})
				}
				
			}
		
				}
		}
	
</script>

<style lang="scss">
swiper {
  height: 750rpx;

  image {
    width: 100%;
    height: 100%;
  }
}
.goods-info{
	padding: 10px;
	.price-info{
		color: #c00000;
		font-size: 18px;
		margin: 10px 0;
	}
	.goods-info-text{
		display: flex;
		justify-content: space-between;
		.goods-name{
			font-size: 13px;
			padding-right: 10px;
		}
		.img{
			display: flex;
			// 给宽度才能不换行
			width: 120px;
			font-size: 12px;
			flex-direction: column;
			// 水平居中
			align-items: center;
			// 垂直居中
			justify-content: center;
			border-left: 1px solid #efefef;

			
		}
	}
	 // 运费
	  .yf {
	    margin: 10px 0;
	    font-size: 12px;
	    color: gray;
	  }
}
.goods_nav{
	position: fixed;
	left: 0;
	bottom: 0;
	width: 100%;
}
.goods-container{
	padding-bottom: 50px;
}
</style>

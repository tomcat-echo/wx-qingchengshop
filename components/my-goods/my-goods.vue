<template>
	<view class="goods-item">
		<view class="img-box">
			<image class="pic" :src="goods.goods_small_logo || defaultPic " ></image>
		</view>
		<view class="text-box">
			<!-- 商品信息 -->
			 <view class="goods-name">{{goods.goods_name}}</view>
			 <!-- 商品价格 -->
			  <view class="goods-price">￥{{goods.goods_price+'.00'}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"my-goods",
		props:{
			// 和父组件传递键值同名
			goods:{
				type:Object,
				default:{}
			}
		},
		data() {
			return {
				        defaultPic: 'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png',

			};
		}
	}
</script>

<style lang="scss">
.goods-item{
	display: flex;
	padding: 5px 5px;
	border-bottom: 1px solid #f0f0f0;
	.img-box{
		.pic{
			width: 100px;
			height: 100px;
			margin-right: 5px;     
		}
	}
	.text-box{
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		.goods-name {
		      font-size: 13px;
		    }
		
		    .goods-price {
		      font-size: 16px;
		      color: #c00000;
		    }
	}
}
</style>
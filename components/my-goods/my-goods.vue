<template>
	<view class="goods-item">
		<view class="img-box">
			<radio :checked="goods.goods_state" color="#C00000" v-if="showRadio" @click="radioHandler"></radio>
			<image class="pic" :src="goods.goods_small_logo || defaultPic " ></image>
		</view>
		<view class="text-box">
			<!-- 商品信息 -->
			 <view class="goods-name" @click="navigatorHandler">{{goods.goods_name}}</view>
			  <!-- 商品价格 -->
			  <view class="goods-price">￥{{goods.goods_price+'.00'}}</view>
			  <!-- 商品数量 -->
			  <uni-number-box :min="1" :value="goods.goods_count" v-if="showNum" @change="NumberHandler"></uni-number-box>
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
			},
			showRadio:{
				type: Boolean,
				default: false
			},
			showNum:{
				type:Boolean,
				default:false
			}
		},
		data() {
			return {
				        defaultPic: 'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png',

			};
		},
		methods:{
			radioHandler(e){
				
				this.$emit('radio-click',{
					  // 通过 this.$emit() 触发外界通过 @ 绑定的 radio-change 事件，
					        // 同时把商品的 Id 和 勾选状态 作为参数传递给 radio-change 事件处理函数
					goods_id: this.goods.goods_id,
					goods_state: !this.goods.goods_state
				})
			},
			NumberHandler(val){
				
				this.$emit('num-click',{
					goods_id: this.goods.goods_id,
					goods_count: +val,
					
				})
			},
			navigatorHandler(){
				this.$emit('go-click')
			}
		}
	}
</script>

<style lang="scss">
.goods-item{
	display: flex;
	padding: 5px 5px;
	border-bottom: 1px solid #f0f0f0;
	.img-box{
		margin-right: 5px;
		  display: flex;
		  justify-content: space-between;
		  align-items: center;
		.pic{
			width: 100px;
			height: 100px;
			display: block;
			margin-right: 5px;     
		}
	}
	.text-box{
		display: flex;
		flex: 1;
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
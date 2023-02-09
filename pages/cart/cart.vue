<template>
	<view class="cart-container" v-if="cart.length !== 0">
		<!-- 收货地址 -->
		<my-address></my-address>
		<!-- 购物车商品列表的标题区域 -->
		<view class="cart-title">
		  <!-- 左侧的图标 -->
		  <uni-icons type="shop" size="18"></uni-icons>
		  <!-- 描述文本 -->
		  <text class="cart-title-text">购物车</text>
		</view>
		<!-- 商品列表区域 -->
		 <uni-swipe-action >
			 <block v-for="(goods, i) in cart" :key="i" >
				<uni-swipe-action-item :right-options="options"  @click="swipeActionClickHandler(goods.goods_id)" >
					<my-goods :goods="goods" :showRadio="true" :showNum="true" @radio-click="radioChageHandler"
					 @go-click="goToDetail(goods)"
					 @num-click="countChangeHandler"></my-goods>
				</uni-swipe-action-item>
			</block>
		 </uni-swipe-action>
		 
		
		   <!-- 结算区域 -->
		      <my-settle></my-settle>
		
	</view>
	  <!-- 空白购物车区域 -->
	  <view class="empty-cart" v-else>
	    <image src="/static/cart_empty@2x.png" class="empty-img" mode="widthFix"></image>
	    <text class="tip-text">空空如也~</text>
	  </view>
</template>

<script>
	// 徽标对应
	import badgeMix from '@/mixins/tabbar-badge.js'
	    // 将 m_cart 模块中的 cart 数组映射到当前页面中使用
	import {mapState,mapMutations} from 'vuex'

	export default {
	 
	 mixins:[badgeMix],
	 computed:{
		     // 将 m_cart 模块中的 cart 数组映射到当前页面中使用
		 ...mapState('m_cart',['cart']),
		
	 },
	  data() {
	    return {
			  options: [{
			      text: '删除', // 显示的文本内容
			      style: {
			        backgroundColor: '#C00000' // 按钮的背景颜色
			      }
			    }]
		}
	  }, 
	  methods:{
		  ...mapMutations('m_cart',['updateRadioState','updateNumber','removeGoodsById']),
		  
		  radioChageHandler(e){
			  this.updateRadioState(e) 
		  },
		  countChangeHandler(e){
			  this.updateNumber(e)

		  },
		  swipeActionClickHandler(goods_id) {
		    this.removeGoodsById(goods_id)
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
.cart-container{
	// 结算组件高度遮挡部分
	padding-bottom: 50px;
}
.cart-title{
	  height: 40px;
	display: flex;
	justify-content: space-between;
	 align-items: center;
	  font-size: 14px;
	  padding:0 5px;
	  border-bottom: 1px solid #efefef;
	  .cart-title-text {
	    margin-left: 10px;
	  }
}
.goods-item {
  // 让 goods-item 项占满整个屏幕的宽度
  width: 750rpx;
  // 设置盒模型为 border-box,否则会每行字不一样
  box-sizing: border-box;
  display: flex;
  padding: 10px 5px;
  border-bottom: 1px solid #f0f0f0;
}
.empty-cart {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 150px;

  .empty-img {
    width: 100px;
    height: 90px;
  }

  .tip-text {
    font-size: 18px;
    color: gray;
    margin-top: 15px;
  }
}
</style>

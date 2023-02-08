<template>
	<view>
		<!-- 收货地址 -->
		<my-address></my-address>
		<!-- 购物车商品列表的标题区域 -->
		<view class="cart-title">
		  <!-- 左侧的图标 -->
		  <uni-icons type="shop" size="18"></uni-icons>
		  <!-- 描述文本 -->
		  <text class="cart-title-text">购物车</text>
		</view>
		 <uni-swipe-action>
			 <block v-for="(goods, i) in cart" :key="i">
				<uni-swipe-action-item :right-options="options"  @click="swipeActionClickHandler(goods.goods_id)" >
					<my-goods :goods="goods" :showRadio="true" :showNum="true" @radio-click="radioChageHandler" @num-click="countChangeHandler"></my-goods>
				</uni-swipe-action-item>
			</block>
		 </uni-swipe-action>
		
		  
		
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
		  }
	  }
	
	}
		
	
</script>

<style lang="scss">

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
</style>

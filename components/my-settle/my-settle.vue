<template>
	 <!-- 最外层的容器 -->
	  <view class="my-settle-container">
	      <!-- 全选区域 -->
	      <label class="radio" @click="changeState">
	        <radio color="#C00000" :checked="isCheckedAll" /><text>全选</text>
	      </label>
	    
	      <!-- 合计区域 -->
	      <view class="amount-box">
	        合计:<text class="amount">￥{{checkedPrice+'.00'}}</text>
	      </view>
	    
	      <!-- 结算按钮 -->
	      <view class="btn-settle">结算({{checkedCount}})</view>
	  </view>
</template>

<script>
	import {mapGetters,mapMutations} from 'vuex'
	export default {
		name:"my-settle",
		data() {
			return {
				
			};
		},
		methods:{
			...mapMutations('m_cart',['updateAllGoodsState']),
			changeState(){
				// 全选按钮未被选中肯定不是目标，因此取反
				this.updateAllGoodsState(!this.isCheckedAll)
			}
		},
		computed:{
			...mapGetters('m_cart', ['checkedCount','checkedPrice','total']),
			// 商品勾选改变全选
			isCheckedAll(){
				// 购物车总数与页面勾选数量
				return this.total === this.checkedCount
			}
		}
	}
</script>

<style lang="scss">
.my-settle-container {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 50px;
  // 将背景色从 cyan 改为 white
  background-color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 5px;
  font-size: 14px;
  z-index: 99;

  .radio {
    display: flex;
    align-items: center;
  }

  .amount {
    color: #c00000;
  }

  .btn-settle {
    height: 50px;
    min-width: 100px;
    background-color: #c00000;
    color: white;
    line-height: 50px;
    text-align: center;
    padding: 0 10px;
  }
}
</style>
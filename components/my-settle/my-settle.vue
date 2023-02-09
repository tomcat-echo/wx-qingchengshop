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
	      <view class="btn-settle" @click="settlement">结算({{checkedCount}})</view>
	  </view>
</template>

<script>
	import {mapGetters,mapMutations,mapState} from 'vuex'
	export default {
		name:"my-settle",
		data() {
			return {
				// 倒计时的秒数
				    seconds: 3,
					// 定时器的 Id
					    timer: null
			};
		},
		methods:{
			...mapMutations('m_cart',['updateAllGoodsState']),
			...mapMutations('m_user',['updateRedirectInfo']),
			changeState(){
				// 全选按钮未被选中肯定不是目标，因此取反
				this.updateAllGoodsState(!this.isCheckedAll)
			},
			settlement(){
				 // 1. 先判断是否勾选了要结算的商品
				  if (!this.checkedCount) return uni.$showMsg('请选择要结算的商品！')
				
				  // 2. 再判断用户是否选择了收货地址
				  if (!this.addstr) return uni.$showMsg('请选择收货地址！')
				
				  // 3. 最后判断用户是否登录了，如果没有登录，则调用 delayNavigate() 进行倒计时的导航跳转
				    // if (!this.token) return uni.$showMsg('请先登录！')
				    if (!this.token) return this.delayNavigate()
	   
			},
			delayNavigate(){
				this.seconds = 3
				// 显示需要等待时间
				this.showTips(this.seconds)
				// 创建定时器，倒计时并显示
				// 将定时器的 Id 存储到 timer 中
				  this.timer = setInterval(()=>{
					this.seconds--
					  // 2. 判断秒数是否 <= 0
					    if (this.seconds <= 0) {
					      // 2.1 清除定时器
					      clearInterval(this.timer)
					
					      // 2.2 跳转到 my 页面
					      uni.switchTab({
					        url: '/pages/my/my',
							  // 页面跳转成功之后的回调函数
							        success: () => {
							          // 调用 vuex 的 updateRedirectInfo 方法，把跳转信息存储到 Store 中
							          this.updateRedirectInfo({
							            // 跳转的方式
							            openType: 'switchTab',
							            // 从哪个页面跳转过去的
							            from: '/pages/cart/cart'
							          })
							        }
					      })
					
					      // 2.3 终止后续代码的运行（当秒数为 0 时，不再展示 toast 提示消息）
					      return
					    }

					this.showTips(this.seconds)
				},1000)
			}
			,
			// 展示倒计时的提示消息
			showTips(n) {
			  // 调用 uni.showToast() 方法，展示提示消息
			  uni.showToast({
			    // 不展示任何图标
			    icon: 'none',
			    // 提示的消息
			    title: '请登录后再结算！'+n+'秒后将自动跳转到登录页',
			    // 为页面添加透明遮罩，防止点击穿透
			    mask: true,
			    // 1.5 秒后自动消失
			    duration: 1000
			  })
			}
		},
		computed:{
			 // token 是用户登录成功之后的 token 字符串
			    ...mapState('m_user', ['token']),
			...mapGetters('m_cart', ['checkedCount','checkedPrice','total']),
			// addstr 是详细的收货地址
			    ...mapGetters('m_user', ['addstr']),
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
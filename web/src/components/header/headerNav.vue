<template>
	<div id="headerNav">
		<!--<div class="wrap-topbar">
			<div class="wrap-menu-bottom">
		        <div class="wrap-topbar-nav">
		          <div class="nav-all" @click="toggle()">
		            <i class="more-icon"></i>
		            	全部导航
		          </div>
		          <div class="wrap-topvar-nav-list clearfix">
		            <ul class="clearfix fl">
		              <li><router-link to="../newActive">最新活动</router-link></a></li>
		              <li>解决方案</li>
		              <li>云市场</li>
		              <li><router-link to="../help">帮助与支持</router-link></li>
		            </ul>
		            <el-button type="primary wrap-topbar-register-btn">免费注册</el-button>       
		          </div>
		        </div>    	
		    </div>
    	</div>-->
	    <div class="wrap-topbar-all-nav-dropdown" v-show="isActive">
	      	<div class="wrap-topbar-level1-nav">
	      		<div class="level-inner">
	      			<ul id="menuList">
	      				<NavMenu></NavMenu>
	      			</ul>
	      			<div class="under_line"></div>
	      			<div class="Consultation">
	      				<div class="Consultation-mobile">咨询电话：<P>010-67712836</P></div>
	      				<div class="Consultation-online">在线咨询<p><i><img src="../../assets/images/icon/wx.png"></i><i><img src="../../assets/images/icon/QQ.png"></i></p></div>
	      			</div>
	      		</div>
	      	</div>
		</div>
	</div>
</template>
<script>
	import NavMenu from './menuList.vue'
	export default{
		components:{
			NavMenu
		},
		methods:{
			toggle(){
				this.isActive = !this.isActive;
			}
		},
		data(){
			return{
				isActive :false
			}
		}
	}
</script>

<style>
</style>
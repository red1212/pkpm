<template>
	<div id="headerTitle">
		<div class="index_menue">
	     <div class="wrap-topbar">
	       <div class="wrap-topbar-logo">
	       	<router-link to="./indexChild" style="color:#fff;">
	       		<img src="../../assets/images/icon/LOGO.png">
				<span class="product_introduce">集建筑、结构、设备设计于一体的智能云平台</span>
	       	</router-link>
			
		   </div>
		   <div class="demonstration" style="float:right;padding-top:8px;margin-right:20px">
		      <span class="demonstration"><img src="../../assets/images/icon/login.png"></span>
		      <el-dropdown trigger="click">
		        <span class="el-dropdown-link" style="display: block;" v-show="isUser">{{sysUserName}}<i class="el-icon-caret-bottom el-icon--right"></i></span>
		        <span class="el-dropdown-link" style="display: block;" v-show='isLogin'><router-link to="../login">登录</router-link></span>  
		          <el-dropdown-menu slot="dropdown">
		            <el-dropdown-item><router-link to="../userIndex">个人中心</router-link></el-dropdown-item>
		            <el-dropdown-item @click.native="logout">退出登录</el-dropdown-item>
		          </el-dropdown-menu>
		       </el-dropdown>
		    </div>
		   <!-- <span class="demonstration" style="float:right;margin-right:8%;width:100px;">	            			                
		       <el-dropdown trigger="click" class="areaBox">
		         <span class="el-dropdown-link" style="display: block;">北京站<i class="el-icon-caret-bottom el-icon--right"></i></span>
		         <el-dropdown-menu slot="dropdown">
		            <el-dropdown-item>华北站</el-dropdown-item>
		          </el-dropdown-menu>
		       </el-dropdown>
		    </span> 会产生滚动条布局需调整-->                  
	      </div>
	    </div>
	    <div class="wrap-topbar">
			<div class="wrap-menu-bottom">
		        <div class="wrap-topbar-nav">
		          <div class="nav-all">
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
		            <el-button type="primary wrap-topbar-register-btn" v-show="isShow" @click="registerFn">免费注册</el-button>       
		          </div>
		        </div>    	
		    </div>
    	</div>
	</div>
</template>
<script>
	import {getUserName} from '../../api/api'
	export default{
		data(){
			return{
				sysUserName:'',
				isShow:false,
				isUser:false,
				isLogin:false
			}
		},
		methods:{
			logout(){
				var _this = this;
				this.$confirm('确认退出吗?', '提示', {
				}).then(() => {
					sessionStorage.removeItem('userId'); //退出登录清楚uderID
					_this.$router.push('../login');
				}).catch(() => {

				});
			},			
			registerFn:function(){
				this.$router.push({path:'../register'})
			},
			getUserInfo(){
				let userId = sessionStorage.getItem('userId');
				if(userId){
					let userParams = {"userId":userId}
					getUserName(userParams).then(data =>{
						let {userName} = data.data;
						this.sysUserName = userName;
						this.isUser = !this.isUser;
					})
				}else{
					this.isLogin=!this.isLogin;
					this.isShow = !this.isShow;					
				}
			}
		},
		mounted(){
			this.getUserInfo()
		}
	}
</script>

<style lang="scss" rel="stylesheet/scss">
/*	@import '../../assets/scss/header/headerTitle.scss'*/
</style>
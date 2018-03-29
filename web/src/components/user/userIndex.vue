<template>
	<div>
		<Header></Header>
		<el-row class="container userInContainer">			
			<el-col :span="24" class="commonBg"></el-col>
			<el-col :span="24" class="userIndex_main paddingTop">
				<aside class="userIndex">
					<el-col style="width:160px">
					    <el-menu
					      :default-active="defaultActive"
					      class="el-menu-vertical-demo"
					      text-color="#fff"
      					  active-text-color="#fff"
      					  router
					    >
					      <el-submenu index="1">
					        <template slot="title">
					          <i class="userIndex_icon"><img src="../../assets/images/my/my.png"></i>
					          <span>我的设置</span>
					        </template>
					        <el-menu-item-group>
					          <el-menu-item index="perfectInfo">完善信息</el-menu-item>
					          <el-menu-item index="changePass">修改密码</el-menu-item>
					          <el-menu-item index="changeMobile">更换手机号</el-menu-item>
					        </el-menu-item-group>					      					     
					      </el-submenu>
					      <el-submenu index="2">
					        <template slot="title">
					          <i class="userIndex_icon"><img src="../../assets/images/my/product.png"></i>
					          <span>我的产品</span>
					        </template>
					        <el-menu-item-group>
					          <el-menu-item index="buyDetail">已购产品</el-menu-item>
					        </el-menu-item-group>					      					     
					      </el-submenu>
					    </el-menu>
					</el-col>
				</aside>
				<div class="userIndex-content">
					<router-view></router-view>
				</div>
			</el-col>			
		</el-row>
	</div>
</template>
<script>
	import Header from '../header/header';
	export default{
		components:{
			Header
		},
		computed: {
			defaultActive: function(){
				return this.$route.path.replace('/', '');
			}
		},
	}
</script>

<style lang="scss">
	@import "../../assets/common/styles/variable.scss";
		.userIndex-content{
			padding-top:30px;
			.el-input{
				width:240px;
			}
		}
		.userInContainer .commonBg{
			background:$color_2B3046;
		}		
		.userIndex{
			.el-submenu .el-menu-item {
			    height: 50px;
			    line-height: 50px;
			    padding-left: 52px;
			    width: 160px;
			    min-width: 160px;
			}
			.el-submenu__title:hover,.el-menu-item:focus,.el-menu-item:hover{
				background-color: $color_1F95E8;
			}
			.el-submenu__title,.el-menu-item{
				font-size:$font-size-12;
				height: 50px;
				line-height: 50px;
			}
			.el-menu{
				background-color:$color_333;
				border:none;
				.userIndex_icon{
					margin-right: 18px;
				}
				.el-submenu__title i{
					color:$color_white;
				}
			}
			.el-submenu__icon-arrow{
				margin-top:-4px;
			}
			.el-menu-item-group__title{
				display: none;
			}
			.el-menu-item.is-active {
			    background: $color_1F95E8;		
			}
		}
		.submitBtn{width:180px;}
</style>
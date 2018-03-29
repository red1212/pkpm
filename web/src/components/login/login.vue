<template>
	<div class="login">
		<i class="loginBg">
			<img src="../../assets/images/icon/leftIcon.png" class="leftIcon">
			<img src="../../assets/images/icon/rightIcon.png" class="rightIcon">
		</i>
		<div class="wrap">
			<div id="bannerTitle">
				<el-row type="flex" class="row-bg" justify="space-between">
				  <el-col :span="6"><router-link to="/indexChild"><img src="../../assets/images/icon/LOGO.png"></router-link></el-col>
				  <el-col :span="4" class="login-title">
				  	<router-link to="/indexChild" class="UrlTo">首页</router-link>
				  	<router-link to="/indexChild" class="UrlTo">云社区</router-link>
				  </el-col>			
				</el-row>
			</div>
			<div class="registerBox">
				<el-row type="flex" justify="space-between">
					<el-col :span="8">
						<em class="backIcon"><img src="../../assets/images/icon/Icon1.png"></em>
					</el-col>
					<el-col :span="11">						
						<!--登录的表单-->
						<el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" class="demo-ruleForm">
						  <el-form-item  prop="userName">
						    <el-input v-model="ruleForm2.userName" placeholder="会员名称/手机号码/邮箱" auto-complete="off"></el-input>
						  </el-form-item>
						  <el-form-item prop="pass">
						    <el-input type="password" placeholder="请输入您的密码"  v-model="ruleForm2.pass" auto-complete="off"></el-input>
						  </el-form-item>						 
						  <el-form-item>
						    <el-button type="primary" class="submitBtn" @click="submitForm('ruleForm2')" :loading="logining">登录</el-button>					
						  </el-form-item>
						  <el-row>
						  	<el-col class="reisterBox_Btn">
						  		<router-link to="/register" class="UrlTo">免费注册</router-link>
						  		<router-link to="/findPass" class="UrlTo">忘记密码</router-link>
						  	</el-col>						  
						  </el-row>
						</el-form>
					</el-col>
				</el-row>
			</div>
		</div>
	</div>
</template>

<script>
	import { requestLogin } from '../../api/api';
	export default {
    data() {
      return {
      	logining: false,
        ruleForm2: {
          pass: '',
          userName: ''
        },
        rules2: {
          pass: [
            { required: true, message: '请输入密码', trigger: 'blur' }
          ],        
          userName: [
            { required: true, message: '请输入账号', trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
      	var _this = this;
        this.$refs[formName].validate((valid) => {
          if (valid) {
          	this.logining = true;
          	var loginParams = { username: this.ruleForm2.userName, password: this.ruleForm2.pass };		
			requestLogin(loginParams).then(data => {
				this.logining = false;
				let result = data;
				if(result.status=="1"){
					sessionStorage.setItem('userId',JSON.stringify(result.data));
					this.$router.push({path:'/indexChild'})
				}else{
					_this.$message({
					    message: result.message,
					    type: 'error'
				    })
				}
			})
          }else {
            console.log('error submit!!');
            return false;
          }
        });
      }
    }
  }
</script>

<style lang="scss" scoped="scoped">
	@import "../../assets/scss/login.scss";
</style>
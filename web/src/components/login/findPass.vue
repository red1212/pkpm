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
				  <el-col :span="6" class="login-title">				  	
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
						<!--注册的表单-->
						<el-form :model="ruleForm2"  :rules="rules2" ref="ruleForm2" class="demo-ruleForm">						
						  <el-form-item prop="phone">
						    <el-input type="tel" placeholder="请输入手机号"  v-model="ruleForm2.phone" auto-complete="off" style="width:280px"></el-input>
						   	<el-button type="primary" :class="{disable:disable}" style="float:right;width:112px" @click.native="getCode">
						   		<span v-show="show">获取验证码</span>
						   		<span v-show="!show">{{count}} s</span>
						   	</el-button>
						  </el-form-item>
						  <el-form-item prop="code">
						    <el-input placeholder="请输入验证码"  v-model="ruleForm2.code" auto-complete="off"></el-input>
						  </el-form-item>
						  <el-form-item>
						    <el-button type="primary" class="submitBtn" @click.native="registForm">确定</el-button>					
						  </el-form-item>						  
						</el-form>
					</el-col>
				</el-row>
			</div>
		</div>		
	</div>
</template>

<script>
	import { requestCode,findPass } from '../../api/api';
	export default{
		data() {	 			 	
		 	//手机号码的校验
		 	var validatephone = (rule,value,callback) =>{
		 		let regExp = /^1[3|5|8|7][0-9]{9}$/;
		 		if(!value){
		 			callback(new Error('请输入手机号'));
		 		}else if(regExp.test(value) === false){
		 			callback(new Error('请输入正确的手机号码'));
		 		}else{
		 			callback();
		 		}
		 	};
		 	//验证码的校验
		 	var validatecode = (rule,value,callback) =>{
		 		if(!value){
		 			callback(new Error('请输入验证码'));
		 		}else{
		 			callback();
		 		}
		 	}
	      return {	      	
	      	logining: false,
	      	count:'',
	      	show:true,
	      	timer:null,	      
	      	disable:false,
	        ruleForm2: {
	          phone:'',
	          code:''
	        },
	        rules2: {        
	          phone:[
	          	{ validator:validatephone, trigger: 'blur' }
	          ],
	          code:[
	          	{ validator:validatecode, trigger: 'blur' }
	          ]
	        }
	      };
	    },
	    methods:{
	    	//注册
	    	registForm:function (){
		       this.$refs.ruleForm2.validate((valid) => {
					if (valid) {
						this.logining = true;
			          	var findpass = { 
						    "mobileNumber":this.ruleForm2.phone,
						    "checkCode":this.ruleForm2.code
			          	};
						findPass(findpass).then(data => {
							this.logining = false;
							let {status,message} = data; //解构
							if(status=="1"){
								this.$router.push({path:'/login'})
							}else{
								this.$message({
								    message: message,
								    type: 'error'
							    })
							}
						})
					}else{
						console.log('error submit!!');
		            	return false;
					}
				})
	    	},    	
	    	//获取验证码
	    	getCode:function(){
				//校验手机号是否已经注册 
					const TIME_COUNT = 60;
					    if(!this.timer){
					    	this.count = TIME_COUNT;
				            this.show = false;
				            this.timer = setInterval(() => {
					        if (this.count > 0 && this.count <= TIME_COUNT) {
					        	this.disable=true;  //控制只能点击一次
					            this.count--;								
					        } else {
					            this.show = true;
					            clearInterval(this.timer);
					            this.timer = null;
								this.disable=false;
					        }
					        }, 1000)
				                	
					    }
					    requestCode({"userMobileNumber":this.ruleForm2.phone}).then(data =>{
					    	this.$message({
								message: data.message
							})
					    })      			
	    	},	    
	    }
	}
</script>

<style lang="scss" scoped="scoped">
	@import "../../assets/scss/login.scss";	
</style>
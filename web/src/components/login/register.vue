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
				  	<router-link to="/login" class="UrlTo">已有账号，立即<span style="color:red;">登录</span></router-link>
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
						  <el-form-item  prop="userName">
						    <el-input v-model="ruleForm2.userName" placeholder="请输入用户名" auto-complete="off"></el-input>
						  </el-form-item>
						  <el-form-item prop="pass">
						    <el-input type="password" placeholder="请输入密码"  v-model="ruleForm2.pass" auto-complete="off"></el-input>
						  </el-form-item>
						  <el-form-item prop="checkpass">
						    <el-input type="password" placeholder="请再次输入密码"  v-model="ruleForm2.checkpass" auto-complete="off"></el-input>
						  </el-form-item>
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
						  <div style="margin-bottom: 20px;">
						  	<el-checkbox v-model="checked"></el-checkbox><span type="text" @click="showToggle" class="xyText">PKPM云服务条件及法律条款说明</span>
						  </div>
						  <el-form-item>
						    <el-button type="primary" class="submitBtn" @click.native="registForm">同意条件并注册</el-button>					
						  </el-form-item>						  
						</el-form>
					</el-col>
				</el-row>
			</div>
		</div>
		<!--模态框-->
		<div class="dialog" v-show="isshow">
		 <div class="mask"></div>
		 <div class="dialog-content">
		  <h3 class="title">构力云商业产品注册协议<i class="el-icon-close" @click="showToggle"></i></h3>
		  <p class="text" v-html="requestText"></p>		  
		 </div>
		</div>
	</div>
</template>

<script>
	import { requestCode,requestRegist,requestCheckUser,getText } from '../../api/api';
	export default{
		data() {	 	
		 	//校验用户名
		 	var validateName = (rule,value,callback) =>{
		 		if(!value){
		 			return callback(new Error('用户名不能为空'))
		 		}else{
		 			callback()
		 		}
		 	};
		 	//校验密码
		 	var validatePass = (rule,value,callback) =>{
		 		var regExp = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,24}$/,  //不是纯数字或英文
		 			regExp1 = /^[a-zA-Z]/,  //字母开头
		 			pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？%+_]"); //特殊符号
		 		if(!value){
		 			callback(new Error('密码不能为空'))
		 		}else if(regExp1.test(value) === false){
		 			callback(new Error('8-24位以字母开头，包括数字以及特殊符号'))
		 		}else if(value.length < 8){
		 			callback(new Error('8-24位以字母开头，包括数字以及特殊符号'))
		 		}
		 		else if(/\d/.test(value) === false){
		 			callback(new Error('8-24位以字母开头，包括数字以及特殊符号'))
		 		}
		 		else if( /[a-z]/.test(value) === false){
		 			callback(new Error('8-24位以字母开头，包括数字以及特殊符号'))
		 		}else if( pattern.test(value) === false){
		 			callback(new Error('8-24位以字母开头，包括数字以及特殊符号'))
		 		}else{
		 			if(this.ruleForm2.checkpass !==''){
		 				this.$refs.ruleForm2.validateField('checkpass');  //validateField对部分表单字段进行校验
		 			}
		 			callback()
		 		}
		 		
		 	};
		 	//校验两次输入的密码
		 	var validatepass2 = (rule,value,callback) =>{
		 		if(!value){
		 			callback(new Error('请再次输入密码'))
		 		}else if(value !==this.ruleForm2.pass){
		 			callback(new Error('两次输入密码不一致'))
		 		}else{
		 			callback()
		 		}
		 	};
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
	      	checked: true,
	      	logining: false,
	      	show:true,
	      	isshow:false,
	      	count:'',
	      	timer:null,
	      	requestText:'',
	      	disable:false,
	        ruleForm2: {
	          pass: '',
	          userName: '',
	          checkpass:'',
	          phone:'',
	          code:''
	        },
	        rules2: {        
	          userName: [
	            { validator:validateName, trigger: 'blur' }
	          ],
	          pass: [
	            { validator:validatePass, trigger: 'blur' }
	          ],
	          checkpass:[
	           { validator:validatepass2, trigger: 'blur' }
	          ],
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
	    	message (m) {
		      this.$message.error({
		        message: m
		      })
		    },
	    	//注册
	    	registForm:function (){
		       this.$refs.ruleForm2.validate((valid) => {
					if (valid) {
						this.logining = true;
			          	var RegistParams = { 
			          		"userName": this.ruleForm2.userName,
						    "checkCode":this.ruleForm2.code,
						    "userMobileNumber":this.ruleForm2.phone,
						    "userLoginPassword":this.ruleForm2.pass
			          	};
						requestRegist(RegistParams).then(data => {
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
	    		let userPhone =this.ruleForm2.phone;
	    		if(!userPhone){
	    			this.message('请输入手机号');
	    			return false;
	    		}
				//校验手机号是否已经注册
				requestCheckUser({"userName":userPhone,"type":"1"}).then(data => {  
					let {status,message} = data; //解构
					if(status=="0"){
						this.$message({
							message: message,
							type: 'error'
						})
					}else{						
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
					}
				});         			
	    	},
	    	
	    	//法律条款的显示隐藏切换
	    	showToggle(){
	    		this.isshow = !this.isshow;
	    	},
	    	//法律条款
	    	requeseGetText:function(){
	    		getText().then((data) =>{
	    			let result = data.data;
	    			console.log(result)
	    			if(result.status == "1"){
	    				let reg=new RegExp("\n","g"); 
						let str= result.data.replace(reg,"<br>");
	    				this.requestText=str;
	    			}
	    		})
	    	}
	    },
	    mounted(){
	    	this.requeseGetText();
	    }
	}
</script>

<style lang="scss" scoped="scoped">
	@import "../../assets/scss/login.scss";
	.xyText{
		color:$color_white;
		padding-left: 10px;
		font-size:$font-size-14;
	}
	
	/*模态框*/
	.dialog {
	 position: relative;
	 
	.dialog-content {
		position: fixed;
		box-sizing: border-box;
		padding: 20px;
		width: 900px;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		border-radius: 5px;
		background: $color_white;
		z-index: 50002;
		height: 500px;
		overflow: auto;
	  .title {
	    border-bottom: 1px solid #ccc;
		padding-bottom: 20px;
		text-align: center;
		.el-icon-close{float:right;cursor: pointer;}
	  }
	  .text {
	   font-size: 14px;
	   color: $color_666;
    	line-height: 24px;
	  }
	 }
	 .mask {
	  position: fixed;
	  top: 0;
	  left: 0;
	  bottom: 0;
	  right: 0;
	  z-index: 50001;
	  background: rgba(0,0,0,.5);
	 }
}
</style>
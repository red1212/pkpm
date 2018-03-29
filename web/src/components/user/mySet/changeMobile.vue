<template>
<!--	<div>-->
		<el-row type="flex" justify="space-between">
			<el-col :span="24" style="margin:0 auto">
				<el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
				  <el-form-item label="原始手机号" prop="firstmobile">
				    <el-input type="tel" v-model="ruleForm2.firstmobile" placeholder="请输入您的原手机号" auto-complete="off"></el-input>
				  	<el-button type="primary" :class="{disable:disable}" style="float:right;width:112px" @click.native="getCode">
						<span v-show="show">获取验证码</span>
						<span v-show="!show">{{count}} s</span>
				    </el-button>
				  </el-form-item>
				  <el-form-item label="验证码" prop="code">
				    <el-input  v-model="ruleForm2.code" placeholder="请输入您的验证码" auto-complete="off"></el-input>
				  </el-form-item>
				   <el-form-item label="新手机号" prop="NewMobile">
				    <el-input  v-model="ruleForm2.NewMobile" type="tel" placeholder="请输入您的新手机号" auto-complete="off"></el-input>
				  </el-form-item>
				  <el-form-item label="设置密码" prop="checkPass">
				    <el-input type="password" v-model="ruleForm2.checkPass" placeholder="请输入您的密码"></el-input>
				  </el-form-item>
				  <el-form-item>
				    <el-button type="primary" @click="submitForm('ruleForm2')" class="submitBtn">确定</el-button>
				  </el-form-item>
				</el-form>
			</el-col>
		</el-row>
<!--		
	</div>-->
</template>

<script>
 import {requestCode,changMobileNumber} from '../../../api/api';
  export default {
    data() {
     	//手机号码的校验
		var validatefirstmobile = (rule,value,callback) =>{
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
		};
		//新手机号
		var validateNewMobile = (rule,value,callback) =>{
			let regExp = /^1[3|5|8|7][0-9]{9}$/;
		 	if(!value){
		 		callback(new Error('请输入手机号'));
		 	}else if(regExp.test(value) === false){
		 		callback(new Error('请输入正确的手机号码'));
		 	}else{
		 		callback();
		 	}
		};
		//校验密码
		var validatecheckPass = (rule,value,callback) =>{
			if(!value){
		 		callback(new Error('请输入您的登录密码'));
		 	}else{
		 		callback();
		 	}
		};
	    return {
	    	show:true,
	      	isshow:false,
	      	count:'',
	      	timer:null,
	      	disable:false,
	        ruleForm2: {
	          firstmobile: '',
	          code: '',
	          NewMobile:'',
	          checkPass:''
	        },
	        rules2: {        
	          firstmobile: [
	            { validator:validatefirstmobile, trigger: 'blur' }
	          ],
	          code: [
	            { validator:validatecode, trigger: 'blur' }
	          ],
	          NewMobile:[
	           { validator:validateNewMobile, trigger: 'blur' }
	          ],
	          checkPass:[
	           { validator:validatecheckPass, trigger: 'blur' }
	          ]
	        }
	    };
	},
    methods: {
    	message (m) {
	      this.$message.error({
	        message: m
	      })
	    },
      getCode(){
      	let phone = this.ruleForm2.firstmobile;
      	let param ={
      		"userMobileNumber":this.ruleForm2.firstmobile
      	};
      	if(!phone){
      		this.message('手机号不能为空');
        	return false
      	}
      	requestCode(param).then(data =>{
      		let {status,message} = data;
      		this.$message({
				message: message
			})
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
      	})
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let params = {
            	"userID":sessionStorage.getItem('userId'),
		      	"checkCode":this.ruleForm2.code,
		     	"newMobileNumber":this.ruleForm2.NewMobile,
		     	"oldMobileNumber":this.ruleForm2.firstmobile,
		     	"password":this.ruleForm2.checkPass
            };
            changMobileNumber(params).then(res =>{
            	let {status,message} = res;
	        	if(status==1){
	        		this.ruleForm2.NewMobile ="";
	        		this.ruleForm2.firstmobile = "";
	        		this.ruleForm2.checkPass = "";
	        		this.$message({
						message: message,
						type: 'success'
					})
	        	}else{
	        		this.$message({
						message: message,
						type: 'error'
					})
	        	}
            })
          } else {
            return false;
          }
        });
      }
    },
  }

</script>
<style lang="scss" scoped="scoped">
	.demo-ruleForm{
		width: 500px;
		margin: 0 auto;
	}
</style>
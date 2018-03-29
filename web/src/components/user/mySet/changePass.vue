<template>
<!--	<div>-->
		<el-row type="flex" justify="space-between">
			<el-col :span="5" style="margin:0 auto">
				<el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
				  <el-form-item label="原始密码" prop="firstPass">
				    <el-input type="password" v-model="ruleForm2.firstPass" placeholder="请输入您的原始密码" auto-complete="off"></el-input>
				  </el-form-item>
				  <el-form-item label="新密码" prop="NewPass">
				    <el-input type="password" v-model="ruleForm2.NewPass" placeholder="请输入您的新密码" auto-complete="off"></el-input>
				  </el-form-item>
				  <el-form-item label="确认新密码" prop="checkPass">
				    <el-input type="password" v-model="ruleForm2.checkPass" placeholder="请再次输入您的密码"></el-input>
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
 import {changPassword} from '../../../api/api';
  export default {
    data() {
      	//校验用户名
		var validatefirstName = (rule,value,callback) =>{
		 	if(!value){
		 		return callback(new Error('原始密码不能为空'))
		 	}else{
		 		callback()
		 	}
		};
		//校验密码
		var validateNewPass = (rule,value,callback) =>{
		 	var regExp = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,24}$/,  //不是纯数字或英文
		 		regExp1 = /^[a-zA-Z]/,  //字母开头
		 		pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？%+_]"); //特殊符号
		 	if(!value){
		 		callback(new Error('请输入新密码'))
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
		 		if(this.ruleForm2.checkPass !==''){
		 			this.$refs.ruleForm2.validateField('checkPass');  //validateField对部分表单字段进行校验
		 		}
		 		callback()
		 	}
		 		
		};
		//校验两次输入的密码
		var validatecheckPass = (rule,value,callback) =>{
		 	if(!value){
		 		callback(new Error('请输入新密码'))
		 	}else if(value !==this.ruleForm2.NewPass){
		 		callback(new Error('两次输入密码不一致'))
		 	}else{
		 		callback()
		 	}
		};
	    return {
	        ruleForm2: {
	          firstPass: '',
	          NewPass: '',
	          checkPass:''
	        },
	        rules2: {        
	          firstPass: [
	            { validator:validatefirstName, trigger: 'blur' }
	          ],
	          NewPass: [
	            { validator:validateNewPass, trigger: 'blur' }
	          ],
	          checkPass:[
	           { validator:validatecheckPass, trigger: 'blur' }
	          ]
	        }
	    };
	},
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let params = {
            	"userID":sessionStorage.getItem('userId'),
				"oldPassword":this.ruleForm2.firstPass,
				"newPassword":this.ruleForm2.NewPass
            };
            changPassword(params).then(res =>{
            	let {status,message} = res;
	        	if(status==1){
	        		this.ruleForm2.firstPass ="";
	        		this.ruleForm2.NewPass = "";
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
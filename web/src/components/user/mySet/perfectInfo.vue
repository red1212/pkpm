<template>
<!--	<div>-->
		<el-row type="flex" justify="space-between">
			<el-col :span="5" style="margin:0 auto">
				<el-form  ref="ruleForm2" label-width="100px" class="demo-ruleForm">
				  <el-form-item label="会员名称">
				    <el-input v-model="ruleForm2.userName" auto-complete="off" disabled></el-input>
				  </el-form-item>
				  <el-form-item label="联系方式">
				    <el-input type="tel" v-model="ruleForm2.mobile" auto-complete="off" disabled></el-input>
				  </el-form-item>
				  <el-form-item label="公司名称">
				    <el-input v-model="ruleForm2.compony" placeholder="请输入您的公司名称"></el-input>
				  </el-form-item>
				  <el-form-item label="姓名">
				    <el-input v-model="ruleForm2.fullName" placeholder="请输入您的姓名"></el-input>
				  </el-form-item>
				  <el-form-item label="身份证号" prop="IdCode">
				    <el-input v-model="ruleForm2.IdCode" placeholder="请输入您的身份证号"></el-input>
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
 import { getUserInfo,perfectInfo} from '../../../api/api';
  export default {
    data() {
      return {
        ruleForm2: {
          userName: '',
          mobile: '',
          compony: '',
          fullName:'',
          IdCode:''
        }
      }
    },
    methods: {
      submitForm(formName) {
      	let Infoparams = {
      		"userID":sessionStorage.getItem('userId'),
			"userIdentificationCard":this.ruleForm2.IdCode,
			"userIdentificationName":this.ruleForm2.fullName,
			"userOrginazation":this.ruleForm2.compony
      	};
        perfectInfo(Infoparams).then(res =>{
        	let {status,message} = res;
        	if(status==1){
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
      },
      UserInfo:function(){
      	let _this=this;
      	var param={
      		"userID":sessionStorage.getItem('userId')
      	};
      	getUserInfo(param).then(res =>{
      		let{userName,userMobileNumber,userOrganization,userIdentificationName,userIdentificationCard}=res.data;
      		_this.ruleForm2.userName = userName;
      		_this.ruleForm2.mobile = userMobileNumber;
      		_this.ruleForm2.compony = userOrganization;
      		_this.ruleForm2.fullName = userIdentificationName;
      		_this.ruleForm2.IdCode = userIdentificationCard;
      	})
      }
    },
    mounted(){
    	this.UserInfo();
    }
  }
</script>
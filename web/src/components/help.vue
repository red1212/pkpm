<template>
	<div class="help">
		<div class="Homebanner">
			<i class="bg bg-a"></i>
			<div class="bannerText">
				<el-row type="flex" justify="space-between">
					<el-col :span="8">
						<p style="font-size:30px">帮组中心</p>						
					</el-col>
					<el-col :span="12">
						<div class="searchBox">
							<el-input placeholder="请输入你想了解的问题、关键词或云产品名称">
							   <!-- <template slot="prepend"></template>-->
							    <el-button slot="append" icon="el-icon-search">搜索</el-button>
							</el-input>
						</div>
						<p class="key">关键词 : <span>PKPM</span><span>架构方案</span><span>PKPM</span></p>
					</el-col>
				</el-row>				
			</div>					
		</div>
		<div class="contents">
			<div class="helpContent">
				<template>
				  <el-tabs v-model="activeName" @tab-click="handleClick">
				    <el-tab-pane label="文档" name="File">
				    	<div class="listItem">
				    		<el-row>
								<el-col :span="24" class="list-title">新手上路</el-col>
								<el-row class="list-item">
									<el-col :span="4">test.txt</el-col>
									<el-col :span="4">深入了解</el-col>
								</el-row>
							</el-row>
							<el-row>
								<el-col :span="24" class="list-title">存储</el-col>
								<el-row class="list-item">
									<el-col :span="4">test.txt</el-col>
									<el-col :span="4">深入了解</el-col>
								</el-row>
							</el-row>
							<el-row>
								<el-col :span="24" class="list-title">云桌面</el-col>
								<el-row class="list-item">
									<el-col :span="4">test.txt</el-col>
									<el-col :span="4">深入了解</el-col>
								</el-row>
							</el-row>
				    	</div>
				    </el-tab-pane>
				    <el-tab-pane label="自助服务" name="self-service">
				    	<div class="listItem">
				    		<el-row>
								<el-col :span="24" class="list-title">新手上路</el-col>
								<el-row class="list-item">
									<el-col :span="4">test.txt</el-col>
									<el-col :span="4">深入了解</el-col>
								</el-row>
							</el-row>
							<el-row>
								<el-col :span="24" class="list-title">存储</el-col>
								<el-row class="list-item">
									<el-col :span="4">test.txt</el-col>
									<el-col :span="4">深入了解</el-col>
								</el-row>
							</el-row>
							<el-row>
								<el-col :span="24" class="list-title">云桌面</el-col>
								<el-row class="list-item">
									<el-col :span="4">test.txt</el-col>
									<el-col :span="4">深入了解</el-col>
								</el-row>
							</el-row>
				    	</div>
				    </el-tab-pane>
				  </el-tabs>
				</template>
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				activeName:'File'
			}
		},
		methods:{
			handleClick(tab,event){
				/*console.log(tab,event)*/
			}
		}
	}
</script>

<style lang="scss">
@import "../assets/scss/help.scss";
.helpContent .listItem {
	padding-top: 20px;
	.list-item {	
		.el-col{
		    width: 120px;
		    height: 50px;
		    line-height: 50px;
		    font-size:$font-size-14;
		    border-radius: 6px;
		    overflow: hidden;
		    background: $color_F8F8F8;
		    border: 1px solid $color_E9E9E9;
		    padding-left: 30px;
		    margin:20px 40px 30px 0px;
		    color: $color_666;
		}
	}
	.list-title{
		color: $color_1F95E8;
    	font-size: $font-size-16;
	}
}
</style>
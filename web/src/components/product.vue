<template>
	<div>		
		<el-row class="container paddingTop">			
			<el-col :span="24" class="commonBg"></el-col>
			<el-col :span="24">
				<div class="content">
					<p class="title border-a">产品选项</p>
					<div class="box">
						<el-form label-width="100px">
							<el-form-item label="虚拟机类型：">
								<el-select v-model="productStorage.productTypeRegion"
									value-key="index"
									@change="selsectDefault(productStorage.list,'21')">
									<el-option v-for="(item,index) in productName" 
										:key="index" 
										:label="item.productDesc" 
										:value="item.productDesc">
									</el-option>									
								</el-select>
							</el-form-item>
							<el-form-item label="地域：" class="area">
								<ul class="clearfix">
									<li v-for="(item,index) in areaList" :key="index" :data-componentId="item.componentId">{{item.componentName}}</li>									
								</ul>
							</el-form-item>
							<el-form-item label="产品名称：" class="productName ">
								<ul class="clearfix">
									<li v-for="(item,index) in softName" :key="index" :data-componentId="item.componentId">
										<em :data-isdefault="item.isDefault">
											<img src="../assets/images/icon/check.png">
										</em>
										<i>{{item.componentName}}</i>
									</li>									
								</ul>
							</el-form-item>
							<el-form-item label="主机配置：">
								<el-select v-model="setUpStorage.setUpRegion">
									<el-option v-for="(item,index) in setUpName" 										 
										:componentId="item.componentId" 
										:isDefault="item.isDefault" 
										:key="index" 
										:label="item.componentName" 
										:value="item.componentName">
									</el-option>
								</el-select>
							</el-form-item>
							<el-form-item label="云存储：">
								<el-select v-model="CloudStorage.storageRegion">
									<el-option v-for="(item,index) in storageName" 										 
										:componentId="item.componentId" 
										:isDefault="item.isDefault" 
										:key="index" 
										:label="item.componentName" 
										:value="item.componentName">
									</el-option>
								</el-select>
							</el-form-item>
							<el-form-item>
								<el-button type="primary" @click="Buy">立即购买</el-button>
							</el-form-item>							 
						</el-form>
					</div>
				</div>
			</el-col>
		</el-row>
	</div>
</template>

<script>
	import {getProduct} from"../api/api"
	export default{
		data(){
			return{
				lists:[],
				areaList:[],	//地域
				softName:[],	//产品名称
				productName:[], //虚拟机类型
				setUpName:[],  //主机配置
				storageName:[],// 云存储				
				productStorage:{    //虚拟机变量缓存
				  productType:'',
				  productId:'',
				  productTypeRegion:'',
				  list:''
				},
				setUpStorage:{    //主机配置缓存变量
					setUpRegion:'',
					hostConfigId:''
				},
				CloudStorage:{    //云存储
					storageRegion:'',
					cloudStorageTimeId:''
				},			
			}
		},
		methods:{
			getproduct(){
				getProduct().then(data =>{					
					this.productName = data[3];
					let choiceDefault =this.productName[0].isDefault;
					this.setUpName = data[1];
					this.areaList = data[4];
					this.softName = data[0];
					this.storageName = data[2];
					this.productName.forEach(item=>{		//虚拟机类型
						this.productStorage.list = item;
						if(item.isDefault ==1){							
							this.productStorage.productTypeRegion = item.productDesc;
							this.productStorage.productId = item.isDefault;
							this.productStorage.productType = item.productType;
						}						
					});
					this.storageName.forEach(item=>{	//云存储					
						if(item.isDefault ==1){
							this.CloudStorage.storageRegion = item.componentName;
							this.CloudStorage.cloudStorageTimeId = item.componentId;
						}						
					});	
					this.setUpName.forEach(item=>{    //主机配置
						if(item.isDefault ==1){
							this.setUpStorage.setUpRegion = item.componentName;
							this.setUpStorage.hostConfigId = item.componentId;							
						}						
					});	
				})
			},
			selsectDefault(tab,num){
				console.log(this.productName.index)
				console.log(num);
				console.log(this.productName[0].productDesc);
				/*this.productName.find((item) =>{
					console.log(item.productType)
				})*/
			},
			Buy(){				
			}
		},
		mounted(){
			this.getproduct();
		}
	}
</script>

<style lang="scss" scoped="">
	@import "../assets/common/styles/variable.scss";
	.commonBg{
		background:$color_2B3046;
	}
	.border-a {
    border-left: 2px solid $color_1F95E8;
	}
	.title {
	    font-size: $font-size-14;
	    padding-left: 10px;
	}
	.box{
		background-color: $color_F8F8F8;
		padding: 30px 40px;
		border: 1px solid $color_E9E9E9;
		margin-top: 20px;
		margin-bottom: 30px;
		width: 100%;
		
	}
	.el-input__inner{height: 30px;}
	.el-select{width:400px;}
	.area ul li{
		
		padding: 0px 28px;
		border-radius: 6px;
		background-color: #DDDDDD;
	}
	.area li,.productName li{
		float: left;
		margin-right: 10px;
		font-size: 12px;
		color: #666;
		cursor: pointer;
	}
</style>
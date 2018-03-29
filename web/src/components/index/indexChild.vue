<template>
	<div class="indexBox">
		<div class="bannerbox">
		<!--<button @click='next'>下一张</button>
　　		<button @click='last'>上一张</button>-->
			<div class="Homebanner">
				<ul class="ul1">
					<li>
						<transition :name='tr'>				
							<div>
								<i class="bg"></i>
								<div class="Homebannertext">
									<div class="banner-box clearfix">
										<img :src='src' :key='src' class="bannereffect bannertime bigimg">
										<dl class="bannertwo clearfix">
											<dt class="bannereffect bannertime1">
												 <p class='pt_46'>浏览就该如此</p>
												 <p class="pt_18">想看就看</p>
												 <el-button type="primary lay-btn" @click.native="freeTrial">免费试用</el-button>
											</dt>
										</dl>
									</div>		
								</div>
							</div>
						</transition>						
					</li>
				</ul>
				<div class="Homedot">　<!--当num==n（当前显示元素的索引）的时候，圆点变为白色，其他为透明--> 
					<a v-for='num in 3' :style="{backgroundColor:num==n?'#fff':'rgba(255, 255, 255, 0.4)'}" @click='change(num)' class='li' >1</a>			
				</div>			
			</div>　　
		</div>
		<div class="contents">
			<div class="content">
				<el-row class="el-colum">
					<el-col :span="24"><h1 class="all-project-title">了解我们的产品</h1></el-col>
					<el-col :span="24"><p class="all-project-title-en">Understand our Products</p></el-col>				
				</el-row>
				<el-row class="el-colum" type="flex" justify="space-around">
					<el-col :span="8">
						<el-row class="border_line">
							<el-col><img src="../../assets/images/index/style.png"></el-col>
							<el-col class="txt-china">设计</el-col>
							<el-col>Design</el-col>
						</el-row>
						<el-row class="product_del">
							<el-col>PKPM</el-col>
							<el-col>造就建筑力学之美</el-col>
						</el-row>
						<el-row class="product_del">
							<el-col>设计协同</el-col>
							<el-col>一款可以多人协作的设计平台</el-col>
						</el-row>
						<el-row class="product_del">
							<el-col>装配式BIM</el-col>
							<el-col>让积木思维颠覆你的行业</el-col>
						</el-row>
						<el-row class="product_del">
							<el-col>建筑</el-col>
							<el-col>所画即所见的逼真渲染工具</el-col>
						</el-row>
					</el-col>
					<el-col :span="8">
						<el-row class="border_line">
							<el-col><img src="../../assets/images/index/story.png"></el-col>
							<el-col class="txt-china">存储</el-col>
							<el-col>Storage</el-col>
						</el-row>
						<el-row class="product_del">
							<el-col>云存储</el-col>
							<el-col>一个让模型不会走丢的平台,你的模型资产安全地躺在这里</el-col>
						</el-row>
					</el-col>
					<el-col :span="8">
						<el-row class="border_line">
							<el-col><img src="../../assets/images/index/look.png"></el-col>
							<el-col class="txt-china">云浏览</el-col>
							<el-col>Cloud Browse</el-col>
						</el-row>
						<el-row class="product_del">
							<el-col>云浏览</el-col>
							<el-col>模型随时随地可得、可标注、不止于浏览</el-col>
						</el-row>
					</el-col>
				</el-row>
			</div>
		</div>	
	</div>
	
</template>

<script>
	export default{
		name:'index',
		data(){　　　　//如果是普通页，需该为data：{}
		　　return{
		　　　　n:1,　　　　　　　　　//图片的index。
		　　　　tr:'tr1',　　　　　　//trnsition 标签的name值，我写了2套css方案，因为你点下一张，它往左运动，点上一张它往右运动。
		　　　　timeout1:'',　　　　//这是flag定时器的数据
		　　　　timeout2:'',　　　　//这是自动播放（next（））定时器的数据
		　　　　timeout3:'',　　　　//这是打开浏览器时，初始运动定时器的数据
		　　　　flag:true,
		　　}
		},
		methods:{
		　　next(){　　　　　　　　　　　　　　　　　　//下一张
		　　　　if(this.flag){　　　　　　　　　　　　//为了避免连续点击。让flag运动结束后再变为true。
		　　　　　　this.flag=false;　　
		　　　　　　this.clearT();　　　　　　　　　　//运动之前，清除所有定时器。
		　　　　　　this.n=this.n+1==4?1:this.n+1;　//下一张，如果是第8张，就返回第一张。
		　　　　　　this.tr='tr1';　　　　　　　　　　//css方案切换到tr1，就是transition的name属性变为tr1。
		　　　　　　this.timeout()　　　　　　　　　　//调用timeout函数，其作用是等待下一次轮播，调整flag，以便可以点击切换。
		　　　　}
		　　},
		　　last(){　　　　　　　　　　　　　　　　　　　//上一张，跟next方向相反
		　　　　if(this.flag){
		　　　　　　this.flag=false;
		　　　　　　this.clearT();
		　　　　　　this.n=this.n-1==0?3:this.n-1;　//当它变为第1张时，下一张就是第3张。
		　　　　　　this.tr='tr2';　　　　　　　　　　//切换css方案2
		　　　　　　this.timeout()                 
		　　　　}
		　　},
		　　clearT(){　　　　　　　　　　　　　　　　　　//清除所有定时器。
		　　　　clearTimeout(this.timeout1);　　　　　
		　　　　clearTimeout(this.timeout2);
		　　　　clearTimeout(this.timeout3);
		　　},
		　　timeout(){　　　　　　　　　　　　　　　　//运动结束后设置flag为true，并且过3秒调用next，进行下一次运动。
		　　　　this.timeout2=setTimeout(()=>{this.flag=true},1050); //运动时间是1s。
		　　　　this.timeout1=setTimeout(()=>{this.next()},3000);
		　　},
		　　change(num){　　　　　　　　　　　　　　//点击小黑点，切换到那一张，需要将这一个圆点的num传下来。
		　　　　if(this.flag){
		　　　　　　this.flag=false;
		　　　　　　this.clearT();　　　　
		　　　　　　this.tr = num-this.n>0?'tr1':'tr2';　　//看选择css1方案还是css2方案。
		　　　　　　this.n=num;　　　　　　　　　　　　　　　　//将显示那一张变为选中的那一张。　　　　　　
		　　　　　　this.timeout()　　　　　　　　　　　　　　
		　　　　}
		　　},
			freeTrial(){
			 	let userId = sessionStorage.getItem('userId');
			 	if(userId){
			 		this.$router.push({path:'/product'})
			 	}else{
			 		this.$router.push({path:'/login'})
			 	}
			}
		},
		computed:{
		　　src(){　　　　　　　　　　　　　　　　　　　　　　//地址，这儿取巧了，this.n与图片编号对应。
		　　　　return 'src/assets/images/index/'+this.n+'.png'
		　　},
		},
		mounted(){
		　　this.timeout3=setTimeout(this.next,5000);　　//刚挂载dom，就开始等待进行第一次轮播，			
		}
	}
</script>

<style lang="scss" scoped="">
	@import '../../assets/scss/indexChild.scss';
	.color_size{
		color: $color_999;
		font-size: 14px;
	}	
	.is-justify-space-around > .el-col{
		padding: 15px 50px;
	}
	.el-button--primary{
		margin-top: 40px;
	}	
	.border_line {
		padding-bottom: 20px;
		border-bottom: 1px solid $color_E9E9E9;
		.txt-china{
			color: $color_7F84C5;
			font-weight: 600;
			font-size: $font-size-20;
			margin:20px 0px 10px 0px;
		}
		.el-col:nth-child(3){
			@extend .color_size;
		}
	}
	.product_del{
		padding: 16px 0px;
		line-height: 24px;
		text-align: left;
		.el-col:nth-child(1){
			font-size: $font-size-20;
			color: $color_666;
		}
		.el-col:nth-child(2){
			margin-top: 10px;
			@extend .color_size;		/*继承了上面的样式属性属于递归编译*/
		}
	}
</style>
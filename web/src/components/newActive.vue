<template>
	<div class="newActive">
		<div class="Homebanner">
			<i class="bg bg-a"></i>
			<div class="bannerText">
				<el-row type="flex" justify="space-between">
					<el-col :span="8" class="newactive-title">
						<p>构力云存储轻松体验云服务</p>
						<p>0元上云，最长180天免费云存储服务</p>
					</el-col>
					<el-col :span="6">
						<em><img src="../assets/images/newActive/activeIcon.png"></em>
					</el-col>
				</el-row>				
			</div>					
		</div>
		<div class="contents">
			<div class="content">
				<el-row>
					<el-col :span="24" class="list-title">新手上路</el-col>
					<el-row class="list-item">
						<el-col :span="4"><i><img src="../assets/images/newActive/open.png"></i>五分钟开户</el-col>
						<el-col :span="4"><i><img src='../assets/images/newActive/sj.png'></i>随时随地设计</el-col>
					</el-row>
				</el-row>
				<el-row>
					<el-col :span="24" class="list-title">线下沙龙和直播</el-col>
					<el-row class="list-item">
						<el-col :span="4"><i><img src="../assets/images/newActive/BIM.png"></i>BIM联盟成立</el-col>
						<el-col :span="4"><i><img src="../assets/images/newActive/activeIcon2.png"></i>直播公众号</el-col>
					</el-row>
				</el-row>
				<el-row>
					<el-col :span="24" class="list-title">特属专区</el-col>
					<el-row class="list-item">
						<el-col :span="4"><i><img src="../assets/images/newActive/play.png"></i>云计划</el-col>
						<el-col :span="4"><i><img src="../assets/images/newActive/activeIcon1.png"></i>云之上</el-col>
						<el-col :span="4"><i><img src="../assets/images/newActive/chat.png"></i>云社交</el-col>
					</el-row>
				</el-row>
			</div>
		</div>
	</div>
</template>
<script>
	export default{
		name:'Active',
	}
</script>

<style lang="scss" scoped="">
.Homebanner{
	height: 362px;
	.bg{height: 362px;}
	.bg-a {
	    background-image: linear-gradient(45deg, #C23A52 12%, #E97F30 100%);
	}
}
.bannerText{
    top: 143px;
}
.newactive-title{
	font-size:18px;
	p:nth-child(1){
		font-size:30px;
		margin:50px 0px 20px;
	}
}
.list-item {
	.el-col{
		width:180px;
		height: 50px;
	    line-height: 50px;
	    font-size: 14px;
	    border-radius: 6px;
	    overflow: hidden;
	    background: #F8F8F8;
	    border: 1px solid #E9E9E9;
	    padding-left: 30px;
	    margin-top: 20px;
	    margin-right: 40px;
	    color: #666;
	}
	i{
		display: inline-block;
		margin-right: 20px;
	}
}
.content .el-row{margin-bottom: 20px;}
</style>
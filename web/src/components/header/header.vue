<template>
	<div id="header">
	<div class="headerBox">
		<headertitle></headertitle>
		<headernav></headernav>
	</div>
	<div class="commonBg"></div>
	</div>
</template>

<script>
	import Headertitle from './headerTitle'
	import Headernav from './headerNav'
	export default{
		components:{
			Headertitle,
			Headernav
		}
	}
	
</script>

<style lang="scss" rel="stylesheet/scss">
	@import '../../assets/scss/header/header.scss';
	.headerBox:hover{
		background: rgba(37,37,37,0.80);
	}
	.headerBox{
		position: absolute;
	    top: 0;
	    height: 120px;
	    width: 100%;
	    z-index: 999;
	    min-width: 1200px;
	}
</style>
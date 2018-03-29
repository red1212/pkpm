<template>
	<div class="wrap">
		<headers></headers>
		<div class="content-container">
			<router-view></router-view>
		</div>
		<footers></footers>
	</div>
</template>
<script>
	import Headers from '../header/header'
	import Footers from '../footer'
	export default{
		name:'home',
		components:{
			Headers,
			Footers
		}
	}
</script>

<style lang="scss">
	
</style>
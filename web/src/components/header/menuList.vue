<template>
	<div id="NavMenu">
		<li v-for="item in menuList">
			<a>fgfg</a>
			<i class="arrow"><img src="../../assets/images/icon/arrow.png"></i>
		</li>
	</div>
</template>

<script>
	export default {
	  name: 'app',
	  data(){
	  	return{
	  		menuList:[]
	  	}
	  },
	  mounted(){
			/*this.getmessage()*/
		},
		methods:{
			getmessage(){
				var url="http://49.4.8.123:8083/product/subProducts",
				_this=this;
				this.$http.get(url).then(function(res){
					console.log(res.data);
					_this.menuList = res.data;
					console.log(_this.menuList);
				});
			}
		}
		
	}
</script>
<style>
</style>
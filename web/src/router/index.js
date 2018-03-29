import Vue from 'vue';
import VueRouter from "vue-router";
Vue.use(VueRouter);
//引入组件
import home from "../components/index/index";    //公用的头部 第一个打开的页面
import indexChild from "../components/index/indexChild"
import newActive from "../components/newActive";
import product from "../components/product";
import help from "../components/help";
import login from "../components/login/login";
import register from "../components/login/register";
import findPass from "../components/login/findPass";
import userIndex from "../components/user/userIndex";
import perfectInfo from "../components/user/mySet/perfectInfo";
import changePass from "../components/user/mySet/changePass";
import changeMobile from "../components/user/mySet/changeMobile";
import buyDetail from "../components/user/buy/buyDetail";
//告诉vue使用vueRouter

const  router = new VueRouter({
 routes:[

 	{
 		path:'/',
 		component: home,
 		redirect:'/indexChild',
 		children: [
 			{ path: '/indexChild',component: indexChild, name: 'index' }          
        ]
 	},
 	{
 		path:'/newActive',
 		component: home,   //组件都引用第一个打开的页面
 		redirect: '/newActive',
 		children:[
 			{
 				path:'/newActive',
 				name:'Active',
 				component:newActive
 			}
 		]
 	},
 	{
 		path:'/product',
 		component: home,   //组件都引用第一个打开的页面
 		redirect: '/product',
 		children:[
 			{
 				path:'/product',
 				name:'product',
 				component:product
 			}
 		]
 	},
 	{
 		path:'/help',
 		component:home,
 		redirect:'/help',
 		children:[
 			{
 				path:'/help',
 				name:'help',
 				component:help
 			}
 		]
 	}, 
 	{
 		path:'/userIndex',
 		component:userIndex,
 		redirect:'/perfectInfo',
 		children:[
 			{ path: '/perfectInfo', component: perfectInfo, name: 'perfectInfo'},
            { path: '/changePass', component: changePass, name: 'changePass'},
            { path: '/changeMobile', component: changeMobile, name: 'changeMobile'},
            { path: '/buyDetail', component: buyDetail, name: 'buyDetail'}
 		]
 	},
 	{
 		path:'/login',
 		component:login		
 	},
 	{
 		path:'/register',
 		component:register		
 	},
 	{
 		path:'/findPass',
 		component:findPass
 	}
 ]
})
export default router
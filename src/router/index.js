import Vue from 'vue'
import VueRouter from 'vue-router'
import RL from "../components/register&login";
import Pro_index from "../components/pro_index";
import intro from "../components/intro";
import pro_all from "../components/pro_all";
import test from "../components/test";
import test2 from "../components/test2";
import cus_center from "@/components/cus_center";
import cus_info from "@/components/cus_info";
import cus_order from "@/components/cus_order";
import cus_shopcar from "@/components/cus_shopcar";
import upload from "@/components/test/upload";
import all_product from "@/components/all_product";
import pro_info from "@/components/pro_info";

Vue.use(VueRouter);

const routes = [
    //主页，默认路由
  {path: '/', redirect: '/Pro_index'},
  //产品主页
  {path: '/Pro_index', component: Pro_index, name: "Pro_index"},
  //关于
  {path: '/intro', component: intro, name: "intro"},
  //注册&登陆
  {path: '/RL', component: RL, name: "RL"},
  //个人中心
  {
    path: '/cus_center', component: cus_center, name: "cus_center",
    children: [
      // 默认页
      {path: '/cus_center/', redirect: '/cus_info'},
      // 个人信息
      {path: '/cus_info', component: cus_info, name: "cus_info"},
      //购物车
      {path: '/cus_shopcar', component: cus_shopcar, name: "cus_shopcar"},
      //订单
      {path: '/cus_order', component: cus_order, name: "cus_order"},
    ]
  },
  //所有产品页
  {path: '/all_pro', component: all_product, name: "all_pro"},
  //产品详细页
  {path: '/pro_info', component: pro_info, name: "pro_info"},
  //删除产品信息
  {path: '/pro_del', },

  // {path: '/upload', component: upload},
  // {path:'/testmenu', component: elmenu},
];

const router = new VueRouter({
  routes
});

//站前守卫
router.beforeEach((to, from, next) => {

  if (to.path === '/RL') return next();//使用return，不需要写else
  if (to.path === '/Pro_index') return next();
  if (to.path === '/test') return next();

  //判断其他页面是否有token
  const token = localStorage.getItem('token');
  //存在继续往后走
  if (token) {
    return next()
  } else {
    // this.$router.push({name:'RL'})
    router.push('RL')
  }

});

export default router

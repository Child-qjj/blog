import Vue from 'vue'
import VueRouter from 'vue-router'
import $store from "../store";
// import Home from '../views/Home.vue'
import Index from '../views/Index.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import NotFound from '../views/404.vue'
import Blog from "../views/Blog.vue"
import Resume from "../views/Resume.vue"
import Productions from "../views/Productions.vue"
import Pages from "../views/Pages.vue"
import Admin from "../views/Admin.vue";
import Refresh from "../views/Refresh.vue";
Vue.use(VueRouter)

  const routes = [
  // {
  //   // path: '/',
  //   // name: 'Home',
  //   // component: Home
  // },
  // {
  //   // path: '/about',
  //   // name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   // component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // },
  {
    path:'/',
    redirect:'/index'
  },
  {
    path:'/logout',
    redirect:'/login'
  },
  {
    path:'/index',
    name:'index',
    component:Index
  },
  {
    path:'/login',
    name:'login',
    component:Login
  },
  {
    path:'/register',
    name:'register',
    component:Register
  },
  {
    path:'/blog',
    name:'blog',
    component:Blog
  },
  {
    path:'/resume',
    name:'resume',
    component:Resume
  },
  {
    path:'/productions',
    name:'productions',
    component:Productions
  },
  {
    path:'/admin',
    name:'Admin',
    component:Admin
  },
  {
    path:'/pages',
    name:'Pages',
    component:Pages
  },
  {
    path:'/refresh',
    name:'refresh',
    component:Refresh
  },
  {
    path:'*',
    name:'/404',
    component:NotFound
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: 'process.env.BASE_URL',
  routes
})
//路由守卫
  router.beforeEach((to,from,next)=>{
    const isLogin = localStorage.loginToken?true:false;
    const isAdmin = ($store.getters.user.identity=='admin');
    if (to.path=="/login"||to.path=="/register") {
     next(); 
    }
    else{
      isLogin?next():next('/login');
    };
    if (to.path=='/admin'&&from=='/index') {
      if (isAdmin) {
        next();
      }
      else{
        alert("不是管理员身份不能进入管理界面");
        next('/index')
      }
    };
  })

export default router

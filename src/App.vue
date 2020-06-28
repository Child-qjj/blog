<template>
  <div id="app">
     <router-view/>
  </div>
</template>
<script>
import jwt_decode from 'jwt-decode'
export default {
  name:'app',
  components:{},
  created(){
    if (localStorage.loginToken) {
       const decoded=jwt_decode(localStorage.loginToken);
          //   console.log(decoded);
           //token存储到vuex
        this.$store.dispatch("setIsAutnenticated",!this.isEmpty(decoded));
        this.$store.dispatch("setUser",decoded);
    }
  },
  methods:{
     isEmpty(value){
            return 
                value === undefined ||
                value === null ||
                (typeof value === "object"&&Object.keys(value).length===0)||
                (typeof value === "string"&&value.trim().length===0)
        }
  }
}
</script>
<style>
html,body{
  height: 100%;
  margin: 0;
  padding: 0;
    font-size: 14px;
    font-family: "微软雅黑",Arial, Helvetica, sans-serif;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>

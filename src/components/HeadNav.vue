<template>
    <header class="head-nav">
         <h2>Welcome to my Blog!</h2>
            <ul class="nav_list">
                <li><router-link to='/blog'>博客主页</router-link></li>
                <li><router-link to='/resume'>个人简历</router-link></li>
                <li><router-link to='/productions'>个人作品</router-link></li>
                <li><router-link to='/admin'>管理</router-link></li>
                <li @click="logout()"><router-link to='/login'>退出</router-link></li>
            </ul>
    </header>
</template>
<script lang="ts">
export default({
    name:'head-nav',
    components:{
    },
    methods:{
        logout(){
            localStorage.removeItem("loginToken");
            this.$store.dispatch('clearCurrentState');
        }
    }
})
</script>
<style scoped>
    .head-nav{
    position: sticky;
    height:50px;
    background-color: #2c82ca;
    }
    .nav_list{
    float: right;
    padding-right: 5%;
}
li{
    
    list-style: none;
    font-size: 20px;
    padding: 10px;
    display: inline;
}
a:hover{
    border-bottom:3px solid green;
    color: white;
}
a{
    text-decoration: none;
    color: rgb(132, 169, 255);
}
h2{
    float: left;
    color: cyan;
    margin: 13px;
    padding-left: 100px;
}
</style>
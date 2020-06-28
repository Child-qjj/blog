<template>
    <div class="notFound">
        <p>{{seconds}}秒后返回主页面,如果未相应请点击<router-link to="./Index">立即返回</router-link></p>
        <img src="../assets/404.gif" alt="404,找不到该页面">
    </div>
</template>

<script>
export default {
    name:'notFound',
    data(){
        return{
            seconds:3
        }
    
    },
    created(){
        this.back();
        this.timer();
    },
    methods:{
        back(){
            setTimeout(() => {
            this.$router.push('/Index');
        }, 3000);
        },
        timer(){
           let time= setInterval(() => {
               this.seconds--;
               if (this.seconds==0) {
                clearInterval(time);
               } 
            }, 1000);
        }
    }
}
</script>
<style scoped>
    .notFound{
        width: 100%;
        height: 100%;
    }
    .notFound img{
        width: 100%;
        height: 100%;
    }
</style>

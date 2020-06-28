<template>
    <div class="index">
        <HeadNav></HeadNav>
        <Swiper></Swiper>
        <Footer></Footer>
    </div>
</template>
<script>
import HeadNav from "../components/HeadNav";
import  Swiper from "../components/Swiper";
import Footer from "../components/Footer";
export default {
    name:'index',
    components:{
        HeadNav,
        Swiper,
        Footer
    }
};
</script>
<style scoped>
    .index{
        height: 100%;
    }
</style>
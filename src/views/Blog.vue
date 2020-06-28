<template>
    <div class="blog" id="blog">
        <el-container>
            <Left></Left>
            <Pages></Pages>
        </el-container>
    </div>
</template>
<script>
import Avatar from "../components/Avatar";
import Left from "../components/AsideLeft";
import Pages from "../components/Content";
export default {
    name:'blog',
    components:{
        Left,
        Pages
    },
}
</script>
<style scoped>
    .blog{
        height: 100%;
    }
    section.el-container {
    height: 100%;
}
aside.el-aside {
    height: 100%;
}
.el-aside {
    overflow: hidden;
    box-sizing: border-box;
    flex-shrink: 0;
}
.avatar {
    padding: 20px !important;
}
</style>
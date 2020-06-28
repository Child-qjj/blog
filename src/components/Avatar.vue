<template>
  <div class="avatar">
    <el-row class="demo-avatar demo-basic">
      <el-col :span="12">
        <div class="demo-basic--circle">
          <div class="block"><el-avatar :size="50" :src="user.avatar"></el-avatar></div>
              <!-- <div class="block" v-for="size in sizeList" :key="size">
              <el-avatar :size="size" :src="circleUrl"></el-avatar>
            </div> -->
          </div>
        <div class="sub-title">{{user.name}}</div>
      </el-col>  
        <!-- <el-col :span="12">
          <div class="sub-title">square</div>
          <div class="demo-basic--circle">
            <div class="block"><el-avatar shape="square" :size="50" :src="squareUrl"></el-avatar></div>
            <div class="block" v-for="size in sizeList" :key="size">
            <el-avatar shape="square" :size="size" :src="squareUrl"></el-avatar>
          </div>
          </div>
        </el-col>  -->
    </el-row>
  </div>
</template>
<script>
  export default {
      name:'avatar',
    data () {
      return {
        //circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
        // squareUrl: "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png",
        // sizeList: ["large", "medium", "small"]
      }
    },
    computed:{
        user:function () {
            return this.$store.getters.user;
        }
    }
  }
</script>
<style scoped>
  .el-col-12 {
    width:100%
}

</style>
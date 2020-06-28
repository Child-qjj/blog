<template>
    <el-form ref="category" :model="category" label-width="80px" v-if=category.show>
        <el-form-item label="分类名">
          <el-input v-model="category.name"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm()">立即创建</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
</template>
<script>
export default {
    name:'newCreate',
    props:['category'],
    data(){
        return{}
    },
    methods:{
        submitForm(){
                    this.$axios.post('/api/arts/new',this.category)
                                .then(res=>{
                                    this.$message({
                                        message:"添加成功",
                                        type:'success'
                                    });
                                    this.$router.replace({path:'/refresh',query:{t:Date.now()}});
                    })     
                },
    }
}
</script>
<style scoped>

</style>
<template>
    <el-form ref="formArticle" :model="formArticle" label-width="80px" v-if=formArticle.show>
      <el-form-item label="作者">
    <el-input v-model="formArticle.author" disabled ></el-input>
  </el-form-item>
  <el-form-item label="文章标题">
    <el-input v-model="formArticle.title"></el-input>
  </el-form-item>
  <el-form-item label="描述">
    <el-input v-model="formArticle.description"></el-input>
  </el-form-item>
  <el-form-item label="活动性质">
    <el-checkbox-group v-model="formArticle.categories" v-for="(item, index) in items" :key="index">
      <el-checkbox :label="item._id" :name="item._id">{{item.name}}</el-checkbox>
    </el-checkbox-group>
  </el-form-item>
  <el-form-item label="文章内容">
    <el-input type="textarea" v-model="formArticle.body" style="height:300px"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="submitForm()">立即创建</el-button>
    <el-button>取消</el-button>
  </el-form-item>
</el-form>
</template>
<script>
export default {
    name:'formArticle',
    props:['formArticle'],
    created(){
        this.getCategories();
    },
    data(){
        return{
        items:'',
        formLabelWidth: '120px',
        }
    },
    methods:{
        submitForm(){
            this.$axios.post('/api/arts/add/',this.formArticle)
                        .then(res=>{
                            this.$message({
                                message:"添加成功",
                                type:'success'
                            });
                            this.$router.replace({path:'/refresh',query:{t:Date.now()}});
            })     
        },
        async getCategories(){
            try {
                const res = await this.$axios.get('/api/arts/',localStorage.loginToken);
                const{
                  ...rest
                }=res.data;
                this.items=rest;
                this.formArticle.author=this.$store.getters.user.id;
            } catch (error) {
                console.log(error);
            }
        }
    },
}
</script>
<style scoped>
</style>

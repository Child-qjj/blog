<template>
      <el-main>
        <div class="list" v-for="(article,index) in articles" :key="index" @click="linkto(index)">
            <article>
                <h1>{{article.title}}{{article.date}}</h1>
                <p>{{article.description}}</p>
            </article>
            <section>
                <p>{{article.body}}</p>
            </section>
        </div>

          
      </el-main>
</template>

<script>
export default {
    name:'blogcontent',
    components:{},
    data(){
       return{
            articles:[]
       }
    },
    created(){
        this.getArticles();
    }
    ,
     methods:{
    //     load(){
    //       console.log("kjafkjd");
          
    //     }
       async getArticles(){
           try {
           let res = await this.$axios.get('/api/arts/publish',localStorage.loginToken);
        //    console.log(res.data);
        //    console.log(article);
           this.articles=res.data;
           } catch (error) {
               console.log(error);
           }
           
        },
        linkto(index){
            this.$router.push({name:"Pages",params:{id:this.articles[index]._id,key:index}});
        }
     }
}
</script>
<style scoped>
.list {
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    height: 30%;
    cursor: pointer;
    border-radius: 25px;
    transition: transform 0.5s ease;
}
.list:hover{
    box-shadow: 0 2px 12px 0 rgb(9, 176, 241);
    transform: scale(1.026);
    height: 40%;
}
h1{
    padding-top: 15px;
    font-size: 25px;
}
p { word-wrap:break-word; }

</style>
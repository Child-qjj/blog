<template>
 <el-container>
   <el-aside style="width:20%;background-color: #545c64;" >
     <Avatar></Avatar>
    <el-tabs :tab-position="tabPosition" style="height: 100%;" @tab-click="tableShow">
      <el-tab-pane label="用户管理" name="first"></el-tab-pane>
      <el-tab-pane label="文章管理" name='second'></el-tab-pane>
      <el-tab-pane label="角色管理" name='third'></el-tab-pane>
      <el-tab-pane label="新建分类" name='fourth'></el-tab-pane>
    </el-tabs>
   </el-aside>
  <el-container>
    <el-header>
      <h1 @click="logout()">退出</h1>
    </el-header>
    <el-main>
      <el-table
        v-if=dialog.show1
        :data="users"
        style="width: 100%"
        :row-class-name="tableRowClassName">
         <el-table-column
          prop="email"
          label="邮箱">
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          width="180">
        </el-table-column>
        <el-table-column
          prop="_id"
          label="id">
        </el-table-column>
        <el-table-column
          prop="identity"
          label="身份">
        </el-table-column>
          <el-table-column
          prop="date"
          label="创建日期"
          width="180">
        </el-table-column>
        <el-table-column
          v-if=dialog.show1
          fixed="right"
          label="操作"
          width="100">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">编辑</el-button>
            <el-button
              @click.native.prevent="deleteRow(scope.$index,users)"
              type="text"
              size="small">
              移除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
       <el-table
        v-if=showart
        :data="articles"
        style="width: 100%"
        :row-class-name="tableRowClassName">
         <el-table-column
          prop="title"
          label="题目">
        </el-table-column>
        <el-table-column
          prop="AuthorId"
          label="作者">
        </el-table-column>
        <el-table-column
          prop="description"
          label="描述"
          width="180">
        </el-table-column>
        <el-table-column
          prop="_id"
          label="id">
        </el-table-column>
        <el-table-column
          prop="body"
          label="内容">
        </el-table-column>
          <el-table-column
          prop="date"
          label="创建日期"
          width="180">
        </el-table-column>
         <el-table-column
          prop="categories"
          label="分类">
        </el-table-column>
      </el-table>
      <Dialog :form="form" :dialog="dialog"></Dialog>
      <Form :formArticle="formArticle"></Form>
      <newCreate :category="category"></newCreate>
    </el-main>
  </el-container>
</el-container>
</template>
<script>
import Avatar from "../components/Avatar";
import Dialog from "../components/Dialog";
import Form from "../components/FormArticle";
import newCreate from "../components/CategoryNew";
export default {
    name:'admin',
    components:{
      Avatar,
      Dialog,
      Form,
      newCreate
    },
    data(){
      return{
        form: {
          name: '',
          email:'',
          password:'',
          identity:''
        },
        dialog: {
        show: false,
        title: "",
        option: "edit",
        form:'',
        show1:''
      },
       formArticle: {
        show: false,
        title: "",
        date1: "",
        date2:'',
        description:'',
        author:'',
        body:'',
        categories:[],  
      },
        category: {
        show: false,
        name: "",
      },
        showart:'',
        table: true,
        loading: false,
        tabPosition: 'left',
        
      }
    },
    created(){
      this.getUsers();
      this.getArticles();
     // this.getCategory();
    },
    methods: {
       tableRowClassName({row, rowIndex}) {
        if (rowIndex === 1) {
          return 'warning-row';
        } else if (rowIndex === 3) {
          return 'success-row';
        }
        return '';
      },
      async getUsers(){
        try {
          const res =await this.$axios.get('/api/users/',localStorage.loginToken);
          this.users =res.data;
          // console.log(res.data);
        } catch (error) {
          console.log(error);
        };
      },
      async getArticles(){
        try {
          const res =await this.$axios.get('/api/arts/publish',localStorage.loginToken);
          this.articles =res.data;
          // console.log(res.data);
        } catch (error) {
          console.log(error);
        };
      },
      // async getCategory(){
      //   try {
      //     const res =await this.$axios.get('/api/arts/',localStorage.loginToken);
      //     this.category.categories=res.data;
      //   } catch (error) {
      //     console.log(error);
      //   };
      // },
      logout(){
        localStorage.removeItem('loginToken');
        this.$store.dispatch('clearCurrentState');
        this.$router.push('/index');
      },
      tableShow(tab,event){
      //  console.log(tab,event);
        if (tab.name=='first') {
          this.dialog.show1=true;
        }
        else this.dialog.show1=false;

        if (tab.name=='second') {
          this.showart=true;
        }
        else this.showart=false;

        if (tab.name=='third') {
          this.formArticle.show=true;
        }
        else this.formArticle.show=false;

        if (tab.name=='fourth') {
          this.category.show=true;
        }
        else this.category.show=false;
      },
       handleClick(row) {
        //console.log(row);
         this.form=row;
        this.dialog.show=true;
      },
      deleteRow(index, rows) {
          this.$confirm('此操作将永久删除该用户, 是否继续?', '警告', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
        //  console.log(rows[index]._id);
          this.$axios.delete(`/api/users/delete/${rows[index]._id}`)
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          rows.splice(index, 1);
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      },
     
    },
}
</script>
<style scoped>
.el-col-12 {
    width: 20%;
    height: 100%;
}
ul.el-menu-vertical-demo.el-menu,section.el-container {
    height: 100%;
}
header.el-header {
    background-color: #545c64;
}
 .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }
  .el-tabs--left,.el-tabs__header,.is-left {
    float:none !important;
    height: 100%;
    width: 100% !important;
}
.el-aside {
    overflow: hidden;}

</style>
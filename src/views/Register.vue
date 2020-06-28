<template>
    <div class="register">
        <div class="container">
            <div class="form">
                <el-form :model="registerUser" status-icon :rules="rules" ref="registerUser" label-width="80px" class="registerForm">
                    <el-form-item label="用户名" prop="name">
                        <el-input v-model="registerUser.name" placeholder="请输入用户名"></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱" prop="email">
                        <el-input v-model="registerUser.email" placeholder="请输入邮箱地址"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input type="password" v-model="registerUser.password" autocomplete="off" placeholder="请输入密码"></el-input>
                    </el-form-item>
                    <el-form-item label="确认密码" prop="checkPass">
                        <el-input type="password" v-model="registerUser.checkPass" autocomplete="off" placeholder="请确认密码"></el-input>
                    </el-form-item>
                    <el-form-item label="身份" prop="identity">
                        <el-select v-model="registerUser.identity" placeholder="请选择身份">
                            <el-option label="admin" value="admin"></el-option>
                            <el-option label="user" value="users"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item class="submit_btn">
                        <el-button type="primary" @click="submitForm('registerUser')">注册</el-button>
                        <el-button @click="resetForm('registerUser')">重置</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>



<script>
export default {
    name:'register',
    componets:{},
    data(){
         var validatePass2=(rule,value,callback)=>{
                if (value ==='') {
                  callback(new Error('请再次输入密码'));
              } 
                else if (value !==this.registerUser.password){
                    callback(new Error('两次输入密码不一致'));
                  }
                else{
                    callback();
                }
                    
            };
        return{
            registerUser:{
                name:"",
                email:"",
                password:"",
                checkPass:"",
                identity:"",
            },
            rules:{
                name:[
                    { required: true,message:'用户名为空',trigger:'blur'},
                    { min:3,message:'长度不能少于三个字符',trigger:'blur'}
                ],
                email:[
                    {type:'email',message:'邮箱格式不正确',trigger:'blur'},
                    { required: true,message:'邮箱为空',trigger:'blur'}
                ],
                password:[
                   {required:true,message:'密码为空',trigger:'blur'},
                   { min: 6, max: 30, message: "长度在 6 到 30 个字符", trigger: "blur" }
                ],
                checkPass:[
                    {message:'密码为空',trigger:'blur',required:true},
                    { min: 6, max: 30, message: "长度在 6 到 30 个字符", trigger: "blur" },
                    {validator:validatePass2,trigger:'blur'}
                ],
                identity:[
                    { required:true,message:'请选择你的身份',trigger:'change' }
                ]
            },
        };
    },
    methods:{
        submitForm(formName){
            this.$refs[formName].validate((valid)=>{
                if (valid) {
                    this.$axios.post('/api/users/register',this.registerUser)
                        .then(res=>{
                            this.$message({
                                message:"注册成功",
                                type:'success'
                            });
                        })
                        this.$router.push('/login');
                }
                else{
                    console.log("提交失败");
                    return false;
                }
            })
        },
        resetForm(formName){
            this.$refs[formName].resetFields();
        }
    }
};
</script>
<style scoped>
   .register {
  position: relative;
  width: 100%;
  height: 100%;
}
.container {
  width: 370px;
  height: 210px;
  position: absolute;
  top: 10%;
  left: 34%;
  padding: 25px;
  border-radius: 5px;
  text-align: center;
}
/* .form_container .manage_tip .title {
  font-family: "Microsoft YaHei";
  font-weight: bold;
  font-size: 26px;
  color: #fff;
} */
.registerForm {
  margin-top: 20px;
  background-color: #fff;
  padding: 20px 40px 20px 20px;
  border-radius: 5px;
  box-shadow: 0px 5px 10px #cccc;
}
.submit_btn {
  width: 100%;
}
</style>
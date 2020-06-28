<template>
    <el-dialog title="用户信息" :visible.sync="dialog.show">
        <el-form :model="form" :rules="rules"  ref="form" >
            <el-form-item label="用户名" :label-width="formLabelWidth" prop="name">
                <el-input v-model="form.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="密码" :label-width="formLabelWidth" prop="password">
                <el-input v-model="form.password" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" :label-width="formLabelWidth" prop="email">
                <el-input v-model="form.email" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="身份权限" :label-width="formLabelWidth" prop="identity">
                <el-select v-model="form.identity" placeholder="请选择身份">
                    <el-option label="管理员" value="Admin"></el-option>
                    <el-option label="用户" value="User"></el-option>
                </el-select>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialog.show=false">取 消</el-button>
            <el-button type="primary" @click="submitForm('form')">确 定</el-button>
        </div>
    </el-dialog>
</template>
<script>
export default {
    name:'DialogMsg',
    props:['form','dialog'],
    data(){
        return{
        formLabelWidth: '120px',
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
                identity:[
                    { required:true,message:'请选择你的身份',trigger:'change' }
                ]
            },
        }
    },
    methods:{
        submitForm(formName){
            this.$refs[formName].validate((valid)=>{
                if (valid) {
                    this.$axios.post(`/api/users/edit/${this.form._id}`,this.form)
                        .then(res=>{
                            this.$message({
                                message:"修改成功",
                                type:'success'
                            });
                            this.dialog.show=false;
                            this.$router.replace({path:'/refresh',query:{t:Date.now()}});
                        })
                }
                else{
                    console.log("提交失败");
                    return false;
                }
            })
        },
    }
}
</script>
<style scoped>

</style>

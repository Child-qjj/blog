<template>
        <div class="pages" id="container">
            <div class="center">
                <div class="page">
                    <article>
                        <h1>{{article.title}}{{article.date}}</h1>
                        <p>{{article.description}}</p>
                    </article>
                    <section>
                        <p>{{article.body}}</p>
                    </section>
                </div>  
                <div class="right_component">
                    <button @click="closed()">关闭特效</button>
                    <el-calendar v-model="value">
                    </el-calendar>
                </div>
            </div>
            <canvas id="snowy" v-if="show"></canvas>
        </div>
</template>
<script>
export default {
    name:'Pages',
    data(){
        return{
            value: new Date(),
            show:'true',
            close:'',
            article:{title:'H1',body:'Vuex 是一个专为 Vue.js 应用程序开发的状态管理模式。它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化。Vuex 也集成到 Vue 的官方调试工具 devtools extension，提供了诸如零配置的 time-travel 调试、状态快照导入导出等高级调试功能。',description:'mkafmds'}
        }
    },
    created(){
        this.storeId();
        this.getpages();
    },
    mounted(){
        this.init();
    }
    ,
    methods:{
        init(){
        //❄
            let canvas=document.querySelector("#snowy");
            let ctx=canvas.getContext("2d");
            var timer=setInterval(snowy,500);
            this.close=function close() {
                clearInterval(timer);
            }
            function snowy() {
                let content=document.getElementById("container");
                let div=document.createElement("div");
                let opc=Math.random();
                let winWidth = content.offsetWidth;
                // let winHeight = content.offsetHeight;
                let top=-50;
                let size=Math.floor(Math.random()*75+13);
                let left=Math.random()*(winWidth-size)+Math.random();
                div.id="snow";
                div.innerHTML="❄";
                div.className="tag";
                div.style="opacity:"+opc+";"+"left:"+left+"px;"+"top:"+top+"px;"+"font-size:"+size+"px;"+"position:absolute";
                content.appendChild(div);
                move(div);
            };
            function move(el) {
                let timer = setInterval(function() {
                        let top = el.offsetTop;
                        let left = el.offsetLeft;
                        let winHeight = window.innerHeight;
                        let oBox = document.getElementById("container");
                        //清除img 要不会占用内存 增加浏览器的负担 会崩溃的
                        if (top > (winHeight-150)||left<0) {
                            clearInterval(timer);
                            oBox.removeChild(el);
                        }
                        el.style.top = (top + 20) + "px";
                    },100)
            };
        }, 
        closed(){
             this.close();
        },
        storeId(){
            if (!(this.$route.params.id===undefined)) {
                sessionStorage.setItem("id",this.$route.params.id);
            }
        },
        async getpages(){
            try {
                const res = await this.$axios.get(`/api/arts/${sessionStorage.id}`,localStorage.loginToken);
                this.article=res.data;  
            } catch (error) {
                console.log(erro);
            }
        },
    },
}
</script>
<style scoped>
.pages {
    position: relative;
    /* width: 650px; */
   height: 100%;
}
.center{
   margin-top: 2%;
    position: absolute;
    width: 85%;
    padding: 2%;
    left: 5%;
    display: inline-flex;
    border-radius: 15px;
    background-color: antiquewhite;
}
section p{   
    text-align: left;
    text-indent: 30px;  
}
.right_component {
    height: 500px;
    width: 50%;
    background-color: azure;
}

canvas{
    position: fixed;
    z-index: -999;
    width: 100%;
    overflow: hidden;
    height: 100%;
}
#snowy{
    overflow: hidden;
    width: 100%;
    left: 0;
    top: 0;
    height: 100%;
    transition: all 0.7s ease-out;
    color: rgb(181, 181, 181);
}
</style>
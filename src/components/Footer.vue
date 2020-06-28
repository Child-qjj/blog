<template>
    <div id="footer_component">
           <p class="mes">
               Design by Child
               <br>
               QQ:429814031@qq.com
               <br>
               Wechat:ChildrenO-O
           </p>
        </div>
</template>
<script lang="ts">
export default({
    name:'footer_component'
})
</script>
<style scoped>
#footer_component{
    z-index: -999;
    text-align: center;
    position: absolute;
    bottom: 0;
    /* left: 44%; */
    width: 100%;
    background-color:steelblue;
}
.mes{
    padding-top: 2%;
    font-size: 16px;
}
</style>
function init(){
    //❄
    let canvas=document.querySelector("#snowy");
     ctx=canvas.getContext("2d");
    var timer=setInterval(snowy,500);
    setTimeout(function () {
        clearInterval(timer);
    },36000);
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
 }
 }
 
    
window.addEventListener("load",()=>{ menu() })

var active={"newGame":true,"continue":false,"highscores":false}

function menu(){
    for(nodeName in active){
        document.getElementById(nodeName).onclick = ()=>{clicked(event.currentTarget)}
        if(nodeName!="newGame"){
            document.getElementById(nodeName).style.background="#144987"
        }
    }
    highlight("continue")
    highlight("highscores")
}

function clicked(node){
    if(!active[node.id]){
        selectTab(node)
    }
}

function generate(){}

function selectTab(node){
    for(nodeName in active){
        active[nodeName]=false;
        document.getElementById(nodeName).style="background:#144987;border-bottom:2px solid #092647"
        highlight(nodeName)
    };
    active[node.id]=true;
    node.style="background:;border-bottom:0px";
    node.removeEventListener("mouseenter",classAdd)
}

function highlight(nodeName){
    document.getElementById(nodeName).addEventListener("mouseenter",classAdd) 
    document.getElementById(nodeName).addEventListener("mouseleave",classRemove)
}

function classAdd(){event.currentTarget.className+=" hover"}
function classRemove(){event.currentTarget.className = event.currentTarget.id}
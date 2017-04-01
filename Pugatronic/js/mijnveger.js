window.addEventListener("load",()=>{ menu() })

var active={"newGame":true,"continue":false,"highscores":false}

function menu(){
    for(nodeName in active){
        document.getElementById(nodeName).onclick = ()=>{clicked(event.currentTarget)}
        if(nodeName!="newGame"){
            document.getElementById(nodeName).style.background="#144987"
            document.getElementById("horLine" + nodeName).style.background="#092647"
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
        document.getElementById(nodeName).style.background="#144987"
        highlight(nodeName)
        document.getElementById("horLine" + nodeName).style.background="#092647"
        if(node.id=="continue"&&nodeName!="continue"){
            document.getElementById("horLine" + nodeName).style.width="33.5%"
            document.getElementById("horLinecontinue").style.width="33%"
        } else{
            document.getElementById("horLine" + nodeName).style.width="33%"
            document.getElementById("horLinecontinue").style.width="34%"
        }
    };
    active[node.id]=true;
    node.style.background="";
    node.removeEventListener("mouseenter",classAdd)
    document.getElementById("horLine" + node.id).style.background=""
}

function highlight(nodeName){
    document.getElementById(nodeName).addEventListener("mouseenter",classAdd) 
    document.getElementById(nodeName).addEventListener("mouseleave",classRemove)
}

function classAdd(){event.currentTarget.className+=" hover"}
function classRemove(){event.currentTarget.className = event.currentTarget.id}
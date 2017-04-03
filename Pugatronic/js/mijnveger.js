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

function generate(){ 
    var check = checkValues()
    if(check){
        document.getElementById("error").innerHTML = check
        document.getElementById("error").className = ""
    } 
 }

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

function checkValues(){
    var rows=document.getElementById("rows").value
    var cols=document.getElementById("cols").value
    var bombs=document.getElementById("bombs").value

    switch(true){
        case(rows<3||rows>40):return "The amount of rows needs to be between min. 3 and max. 40!";
        case(cols<3||cols>40):return "The amount of columns needs to be between min. 3 and max. 40!";
        case(bombs<1||bombs>1200):return "The amount of bombs needs to be between min. 1 and max. 1200!";
        case(rows*cols<=bombs):return "There are too many bombs for the amount of squares!";
    }   
    document.getElementById("error").className = "hidden"
    document.getElementById("menu").className+=" gone";
    init(rows,cols,bombs)
    return false
}
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
    fillScores()
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
        case(rows<3||rows>30):return "The amount of rows needs to be between min. 3 and max. 40!";
        case(cols<3||cols>30):return "The amount of columns needs to be between min. 3 and max. 40!";
        case(bombs<1||bombs>800):return "The amount of bombs needs to be between min. 1 and max. 1200!";
        case(rows*cols<=bombs):return "There are too many bombs for the amount of squares!";
    }   
    document.getElementById("error").className = "hidden"
    document.getElementById("menu").className+=" gone";
    document.getElementById("menuLeft").className="menuLeft"
    init(rows,cols,bombs)
    return false
}

function backToMenu(){
    document.getElementById("menuLeft").className+=" hidden"
    document.getElementById("container-right").removeChild(document.getElementById("container-right").children[1])
    document.getElementById("menu").className="menu"
    $("#selectConfig").find("option").remove().end().append('<option value="0">-- configuration --</option>')
    fillScores()
    $("#spelerNaam").val("")
    $("#spelerConfig").find("option").remove().end().append('<option value="0">-- select a config --</option>')
}

function fillScores(){
    $.get("http://plumbuster.herokuapp.com/configs/",(data)=>{
        data.forEach((config)=>{
            $("#selectConfig").append(new Option(config.row+" x "+config.col+" - 💣"+config.bombs,config.row+"x"+config.col+"-"+config.bombs))
        })
    })
}

function zoek(val){
    if($("#highscoresTable")){$("#highscoresTable").remove() ; $("#scoresTable").append("<tbody id='highscoresTable'></tbody>")}
    var v= val=="config"?$("#selectConfig").val():$("#spelerConfig").val();
    var r= v.substring(0,v.indexOf("x"))
    var c= v.substring(v.indexOf("x")+1,v.indexOf("-"))
    var b= v.substring(v.indexOf("-")+1)
    var een="/", twee="/", drie="/"
    
    $.get("http://plumbuster.herokuapp.com/top/diff/"+r+"/"+c+"/"+b+"/",(data)=>{
        data.forEach((config)=>{
            if(een!="/"&&twee!="/"&&drie!="/"){
                config.tijd<een.tijd?(drie=twee,twee=een,een=config):config.tijd<twee.tijd?(drie=twee,twee=config):config.tijd<drie.tijd?drie=config:config=config;
            }
            switch(true){
                case(een=="/"):een=config;break;
                case(twee=="/"):config.tijd<een.tijd?(twee=een,een=config):twee=config;break;
                case(drie=="/"):config.tijd<een.tijd?(drie=twee,twee=een,een=config):config.tijd<twee.tijd?(drie=twee,twee=config):drie=config;break;
            }
        })
        if(een!="/"){
            $("#highscoresTable").append("<tr><td>"+een.naam+"</td><td>"+een.row+" x "+een.col+" - 💣"+een.bombs+"</td><td>"+een.tijd+"</td></tr>")
            if(twee!="/"){
                $("#highscoresTable").append("<tr><td>"+twee.naam+"</td><td>"+twee.row+" x "+twee.col+" - 💣"+twee.bombs+"</td><td>"+twee.tijd+"</td></tr>")
                if(drie!="/"){
                    $("#highscoresTable").append("<tr><td>"+drie.naam+"</td><td>"+drie.row+" x "+drie.col+" - 💣"+drie.bombs+"</td><td>"+drie.tijd+"</td></tr>")
                }
            }
        }
    })
}

function nameKeypress(){
    $("#spelerConfig").find("option").remove().end().append('<option value="0">-- select a config --</option>')
    
    $.get("http://plumbuster.herokuapp.com/top/naam/"+event.target.value+"/",(data)=>{
        data=JSON.parse(data)
        data.forEach((playerScore)=>{
            if($('#spelerConfig option[value='+playerScore.row+"x"+playerScore.col+"-"+playerScore.bombs+']').length==0){
                $("#spelerConfig").append(new Option(playerScore.row+" x "+playerScore.col+" - 💣"+playerScore.bombs,playerScore.row+"x"+playerScore.col+"-"+playerScore.bombs))
            }
        })
    })
}

function playerConfigChange(){
    $("#zoekenNaam")[0].disabled = event.target.value!=0?false:true;
}
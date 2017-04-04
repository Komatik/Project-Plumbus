var prevSettings={rows:10,cols:10,bombs:10}
var time

function init(r=prevSettings.rows,c=prevSettings.cols,b=prevSettings.bombs){
    if(document.getElementById("container-right").childNodes[2]){ document.getElementById("container-right").removeChild(document.getElementById("container-right").childNodes[2]) }
    var newGame = new Board(r,c,b)
    prevSettings.rows=newGame.rows
    prevSettings.cols=newGame.cols
    prevSettings.bombs=newGame.bombs
    document.getElementById("bombsAmount").innerHTML = newGame.bombCount
    document.getElementById("time").innerText = "0.0"
    clearInterval(time)
    newGame.create()
    console.log(newGame)
    console.log(newGame.field)
    createTable(newGame)
}

function createTable(boardObj){
    var table = document.createElement("table")
    table.id="mineSweeperTable"
    for(var i = 0;i < boardObj.rows;i++){
        var row = table.insertRow()
        
        for(var j = 0;j < boardObj.cols;j++){
            var cell = row.insertCell()
            cell.id= i + "-" + j
            cell.innerHTML = ""
            cell.oncontextmenu=()=>{return false}
            cell.onmousedown = ()=>{testValues(boardObj)}
        }
    }
    document.getElementById("container-right").appendChild(table)
}

function testValues(boardObj){
    var selObj = boardObj.field[event.target.parentNode.rowIndex][event.target.cellIndex]

    if(event.button==0){
        if(boardObj.time==0){
            clearInterval(time)
            time = setInterval(()=>{
                document.getElementById("time").innerText=Math.round(boardObj.time*10)/10
                if(document.getElementById("time").innerText%Math.floor(document.getElementById("time").innerText)==0){
                    document.getElementById("time").innerText+=".0"
                } 
            },49)
        }
        var val = selObj.clicked(boardObj.field) 

        for(var p = 0;p<val.length;p++){
            if(val[0].count=="💣"){
                document.getElementById(val[p].row + "-" + val[p].column).style="background:url(../img/bom.png) 50% 50% / contain no-repeat #1e5799;border:1px solid #3560a5"
            } else {
                document.getElementById(val[p].row + "-" + val[p].column).innerHTML = boardObj.field[val[p].row][val[p].column].count==0?"":boardObj.field[val[p].row][val[p].column].count;
                document.getElementById(val[p].row + "-" + val[p].column).style = "background:#1e5799;border:1px solid #3560a5"
            }
        }
        winOrLose(boardObj, selObj)
    } else if(event.button == 2){
        selObj.rightclicked()
        switch(selObj.flagged){
            case(""):event.target.innerHTML="";event.target.style.background="#207cca";break;
            case("f"):event.target.style.background="#207cca url(../img/flag.png) 90% 70% / 80% 70% no-repeat";break;
            case("q"):event.target.innerHTML="?";event.target.style.background="#207cca";break;
        }
    }
}

function winOrLose(board, clickedObj){
    if(clickedObj.count=="💣"){ 

    } else {

    }
}

/* ---------------HANDLEIDING---------------------
AANTAL BOMMEN: boardObj.bombCount
RESTART ZONDER REFRESH: init()
*/


/* ==========================TEST FUNCTIE=============================
(function(){
    var cells = document.getElementsByTagName("td")
    for(var i=0;i< cells.length;i++){ cells[i].click() }
})()
*/
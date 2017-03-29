window.onload = init;


function init(){
    if(document.getElementById("content").childNodes[0]){ document.getElementById("content").removeChild(document.getElementById("content").childNodes[0]) }
    var newGame = new Board(10,10,10)
    newGame.create()
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
            cell.onmousedown = ()=>{testValues(boardObj)}
        }
    }
    document.getElementById("content").appendChild(table)
}

function testValues(boardObj){
    var time,
        selObj = boardObj.field[event.target.parentNode.rowIndex][event.target.cellIndex]

    if(boardObj.time==0){
        time = setInterval(()=>{document.getElementById("timer").innerText=Math.round(boardObj.time*10)/10},49)
    }
    if(event.button==0){
        var val = selObj.clicked(boardObj.field) 
        
        for(var p = 0;p<val.length;p++){
            document.getElementById(val[p].row + "-" + val[p].column).innerText = boardObj.field[val[p].row][val[p].column].count
        }
        winOrLose(boardObj, selObj)
    } else if(event.button == 2){
        selObj.rightclicked()
        switch(selObj.flagged){
            case(""):event.target.innerText="";break;
            case("f"):event.target.innerText="⛳";break;
            case("q"):event.target.innerText="?";break;
        }
    }
}

function winOrLose(board, clickedObj){
    if(clickedObj.count=="💣"){ 
        
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
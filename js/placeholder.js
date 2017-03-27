window.onload = init;


function init(){
    var newGame = new Board(10,10,50)
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
            cell.onclick = function(){
                var row = this.parentNode.rowIndex
                var col = this.cellIndex 
         
                    var val = boardObj.field[row][col].clicked(boardObj.field) 
                    if(typeof val == "number" || typeof val == "string"){ 
                        this.innerHTML = val 
                    } else{
                        this.innerHTML = 0                        
                        for(var p = 0;p<val.length;p++){
                            document.getElementById(val[p].row + "-" + val[p].column).innerText = val[p].count
                        }
                    }
                
            }
        }
    }
    document.getElementById("content").appendChild(table)
}
/* ==========================TEST FUNCTIE=============================
(function(){
    var cells = document.getElementsByTagName("td")
    for(var i=0;i< cells.length;i++){ cells[i].click() }
})()
*/
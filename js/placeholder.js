window.onload = init;


function init(){
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
            cell.innerHTML = ""
            cell.onclick = function(){
                var row = this.parentNode.rowIndex
                var col = this.cellIndex 
                if(!boardObj.field[row][col].flipped){
                    this.innerHTML=boardObj.field[row][col].clicked(boardObj.field) 
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
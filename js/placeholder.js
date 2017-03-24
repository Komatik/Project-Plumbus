window.onload = init;

var bombsList = []

function init(){

}

function createTable(rows, cols){
    var table = document.createElement("table")

    for(var i = 0;i < rows;i++){
        var row = table.insertRow()
        
        for(var j = 0;j < cols;j++){
            bombsList[i+""+j] = false
            var cell = row.insertCell()

        }
    }
    document.body.appendChild(table)
}

function placeBombs(bombs){
    var randomArray = []
    for(var i = 0;i < bombs;i++){
        var random = parseInt(Math.random()*bombsList.length)
        if(randomArray.indexOf(random) == -1){ randomArray.push(random) } else {i--}
    }
    var nummer = 0
    for(coord in bombsList){
        if(randomArray.indexOf(nummer) != -1){ bombsList[coord] = true }
        nummer++
    }
}
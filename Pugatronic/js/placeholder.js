var prevSettings={rows:10,cols:10,bombs:10}
var time=0;
var test

function init(r=prevSettings.rows,c=prevSettings.cols,b=prevSettings.bombs){
    if(document.getElementById("container-right").children[1]){ document.getElementById("container-right").removeChild(document.getElementById("container-right").children[1]) }
    var newGame = new Board(r,c,b)
    prevSettings.rows=newGame.rows
    prevSettings.cols=newGame.cols
    prevSettings.bombs=newGame.bombs
    document.getElementById("bombsAmount").innerHTML = newGame.bombCount
    document.getElementById("time").innerText = "0.0"
    clearInterval(time); time=0;
    test=false
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
    } else if(event.button == 2 && time!=0){
        selObj.rightclicked()
        switch(selObj.flagged){
            case(""):event.target.innerHTML="";event.target.style.background="#207cca";break;
            case("f"):event.target.style.background="#207cca url(../img/flag.png) 90% 70% / 80% 70% no-repeat";break;
            case("q"):event.target.innerHTML="?";event.target.style.background="#207cca";break;
        }
        document.getElementById("bombsAmount").innerHTML = boardObj.bombCount
    }
}

function winOrLose(board, clickedObj){
    if(board.won && !test){
        clearInterval(time)
        $("#tableValues").html("You've managed to complete a "+board.rows+"x"+board.cols+" grid with "+board.bombs+" bombs, in an impressive "+ $("#time").html() +" seconds!")        
        $("#dialog").data("board",board).dialog("open")  
        test=!test
    } 
}

$("#dialog").dialog({
    autoOpen: false,
    height: 'auto',
    width: 580,
    modal: true,
    resizable:false,
    title:"Congratulations, you've won!",
    classes: {
        "ui-dialog": "dialogStyle",
        "ui-dialog-titlebar": "trans",
        "ui-dialog-title": "dialogTitle",
        "ui-dialog-buttonpane": "trans"
    },
    buttons: {
        "Submit": function() {
            var board = $(this).data('board');
            $.post("http://plumbuster.herokuapp.com/invoegen/"+$("#playerName").val()+"/"+ $("#time").html() +"/"+board.rows+"/"+board.cols+"/"+board.bombs+"/")
            $("#playerName").val("")
            $("#dialog").dialog("close")
        },
    },
    close: {}
});


/* ==========================TEST FUNCTIE=============================
(function(){
    var cells = document.getElementsByTagName("td")
    for(var i=0;i< cells.length;i++){ cells[i].click() }
})()


$(document).ready( function() {

    $("#alert_button").click( function() {
        jAlert('This is a custom alert box', 'Alert Dialog');
    });

    $("#confirm_button").click( function() {
        jConfirm('Can you confirm this?', 'Confirmation Dialog', function(r) {
            jAlert('Confirmed: ' + r, 'Confirmation Results');
        });
    });

    $("#prompt_button").click( function() {
        jPrompt('Type something:', 'Prefilled value', 'Prompt Dialog', function(r) {
            if( r ) alert('You entered ' + r);
        });
    });

    $("#alert_button_with_html").click( function() {
        jAlert('You can use HTML, such as <strong>bold</strong>, <em>italics</em>, and <u>underline</u>!');
    });

    $(".alert_style_example").click( function() {
        $.alerts.dialogClass = $(this).attr('id'); // set custom style class
        jAlert('This is the custom class called &ldquo;style_1&rdquo;', 'Custom Styles', function() {
            $.alerts.dialogClass = null; // reset to default
        });
    });
});
*/
